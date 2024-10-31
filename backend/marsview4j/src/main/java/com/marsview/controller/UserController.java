package com.marsview.controller;

import ch.qos.logback.core.testUtil.RandomUtil;
import com.alibaba.druid.util.StringUtils;
import com.marsview.domain.Users;
import com.marsview.dto.UsersDto;
import com.marsview.controller.basic.BasicController;
import com.marsview.controller.basic.Builder;
import com.marsview.util.HtmlUtil;
import com.marsview.util.Md5Utils;
import com.marsview.util.SessionUtils;
import com.marsview.mapper.UsersMapper;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * <p>类说明</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @createTime: 2024/9/27 10:42
 */
@RestController
@RequestMapping("api/user")
public class UserController extends BasicController {

  @Resource
  private UsersMapper usersMapper;

  @Resource
  private JavaMailSender mailSender;

  @Resource
  private RedisTemplate redisTemplate;

  /**
   * 用户注册
   *
   * @param response
   * @param dto
   */
  @PostMapping("regist")
  public void regist(HttpServletRequest request, HttpServletResponse response, @RequestBody UsersDto dto) {
    //从redis获取验证码
    String code = redisTemplate.opsForValue().get("lowcode.register.code" + dto.getUserName()) + "";
    //判断验证码是否正确
    if (StringUtils.equals(dto.getCode(), code)) {
      Users users = Builder.of(Users::new)
        .with(Users::setCreated_at, new Date())
        .with(Users::setUser_name, dto.getUserName())
        .with(Users::setUser_pwd, dto.getUserPwd())
        .build();
      int result = usersMapper.insertUseGeneratedKeys(users);
      if (result > 0) {
        SessionUtils.setUser(request, users);
        HtmlUtil.writerJson(response, getResponse(Map.of("userId", users.getId(), "userName", users.getUser_name(),
          "token", Md5Utils.getMd5(users.getId() + users.getUser_name() + users.getUser_pwd()))));
      } else {
        HtmlUtil.writerJson(response, getErrorResponse("注册失败"));
      }
    } else {
      redisTemplate.delete("lowcode.register.code" + dto.getEmail());
      HtmlUtil.writerJson(response, getErrorResponse("验证码错误"));
    }
  }

  /**
   * 发送邮件
   *
   * @param response
   * @param dto
   */
  @PostMapping("sendEmail")
  public void sendEmail(HttpServletResponse response, @RequestBody UsersDto dto) {
    SimpleMailMessage message = new SimpleMailMessage();
    int code = RandomUtil.getRandomServerPort();
    //放入缓存，保存3分钟
    redisTemplate.opsForValue().set("lowcode.register.code" + dto.getEmail(), code, 60 * 3, TimeUnit.SECONDS);
    message.setFrom("");
    message.setTo(dto.getEmail());
    message.setSubject("lowcode账号注册");
    message.setText("您当前的验证码为：" + code + "，3分钟内有效。感谢您成为lowcode一员。");
    mailSender.send(message);
    HtmlUtil.writerJson(response, getResponse());
  }

  /**
   * 登录
   *
   * @param response
   * @param dto
   */
  @PostMapping("login")
  public void login(HttpServletRequest request, HttpServletResponse response, @RequestBody UsersDto dto) {
    Users users = usersMapper.selectOne(Builder.of(Users::new)
      .with(Users::setUser_name, dto.getUserName())
      .with(Users::setUser_pwd, dto.getUserPwd()).build());
    if (users != null) {
      SessionUtils.setUser(request, users);
      HtmlUtil.writerJson(response, getResponse(Map.of("userId", users.getId(), "userName", users.getUser_name(),
        "token", Md5Utils.getMd5(users.getId() + users.getUser_name() + users.getUser_pwd()))));
    } else {
      HtmlUtil.writerJson(response, getErrorResponse("用户名或密码错误"));
    }
  }

  /**
   * 登录
   *
   * @param response
   */
  @GetMapping("info")
  public void info(HttpServletRequest request, HttpServletResponse response) {
    Users users = SessionUtils.getUser(request);
    HtmlUtil.writerJson(response, getResponse(Map.of("userId", users.getId(), "userName", users.getUser_name(),
      "token", Md5Utils.getMd5(users.getId() + users.getUser_name() + users.getUser_pwd()))));
  }

  /**
   * 登录
   *
   * @param response
   */
  @PostMapping("search")
  public void search(HttpServletResponse response, @RequestBody Users users) {
    users.setVagueMatch(new String[]{"user_name"});
    HtmlUtil.writerJson(response, getResponse(usersMapper.dataList(users)));
  }

  public static void main(String[] args) {
    System.out.println(RandomUtil.getRandomServerPort());
    System.out.println(RandomUtil.getRandomServerPort());
    System.out.println(RandomUtil.getRandomServerPort());
  }
}
