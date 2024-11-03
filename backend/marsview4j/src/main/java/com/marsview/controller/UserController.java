package com.marsview.controller;

import ch.qos.logback.core.testUtil.RandomUtil;
import com.alibaba.druid.util.StringUtils;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.marsview.controller.basic.BasicController;
import com.marsview.controller.basic.Builder;
import com.marsview.controller.basic.ResultResponse;
import com.marsview.domain.Users;
import com.marsview.dto.UsersDto;
import com.marsview.service.UsersService;
import com.marsview.util.HtmlUtil;
import com.marsview.util.Md5Utils;
import com.marsview.util.SessionUtils;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
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
  private JavaMailSender mailSender;

  @Resource
  private RedisTemplate redisTemplate;

  @Autowired
  private UsersService userService;

  /**
   * 用户注册
   *
   * @param response
   * @param dto
   */
  @PostMapping("regist")
  public ResultResponse regist(HttpServletRequest request, HttpServletResponse response, @RequestBody UsersDto dto) {
    //从redis获取验证码
    String code = redisTemplate.opsForValue().get("lowcode.register.code" + dto.getUserName()) + "";
    //判断验证码是否正确
    if (StringUtils.equals(dto.getCode(), code)) {
      Users users = new Users();
      users.setUserPwd(dto.getUserPwd());
      users.setUserName(dto.getUserName());
      users.setCreatedAt(new Date());

      boolean result = userService.save(users);
      if (result) {
        SessionUtils.setUser(request, users);
        return getResponse(
          Map.of("userId", users.getId(),
            "userName", users.getUserName(),
            "token", Md5Utils.getMd5(users.getId() + users.getUserName() + users.getUserPwd())
          ));
      } else {
        return getErrorResponse("注册失败");
      }
    } else {
      redisTemplate.delete("lowcode.register.code" + dto.getEmail());
      return getErrorResponse("验证码错误");
    }
  }

  /**
   * 发送邮件
   *
   * @param response
   * @param dto
   */
  @PostMapping("sendEmail")
  public ResultResponse sendEmail(HttpServletResponse response, @RequestBody UsersDto dto) {
    SimpleMailMessage message = new SimpleMailMessage();
    int code = RandomUtil.getRandomServerPort();
    //放入缓存，保存3分钟
    redisTemplate.opsForValue().set("lowcode.register.code" + dto.getEmail(), code, 60 * 3, TimeUnit.SECONDS);
    message.setFrom("");
    message.setTo(dto.getEmail());
    message.setSubject("lowcode账号注册");
    message.setText("您当前的验证码为：" + code + "，3分钟内有效。感谢您成为lowcode一员。");
    mailSender.send(message);
    return getResponse();
  }

  /**
   * 登录
   *
   * @param response
   * @param dto
   */
  @PostMapping("login")
  public ResultResponse login(HttpServletRequest request, HttpServletResponse response, @RequestBody UsersDto dto) {
    QueryWrapper<Users> wrapper = new QueryWrapper<>();
    wrapper.eq("user_name", dto.getUserName());
    wrapper.eq("user_pwd", dto.getUserPwd());
    Users users = userService.getOne(wrapper);
    if (users != null) {
      SessionUtils.setUser(request, users);
      SessionUtils.setUser(request, users);
      return getResponse(
        Map.of("userId", users.getId(),
          "userName", users.getUserName(),
          "token", Md5Utils.getMd5(users.getId() + users.getUserName() + users.getUserPwd())
        ));
    } else {
      return getErrorResponse("用户名或密码错误");
    }
  }

  /**
   * 登录
   *
   * @param response
   */
  @GetMapping("info")
  public ResultResponse info(HttpServletRequest request, HttpServletResponse response) {
    Users users = SessionUtils.getUser(request);
    return getResponse(
      Map.of("userId", users.getId(),
        "userName", users.getUserName(),
        "token", Md5Utils.getMd5(users.getId() + users.getUserName() + users.getUserPwd())
      ));
  }

  /**
   * 登录
   *
   * @param response
   */
  @PostMapping("search")
  public ResultResponse search(HttpServletResponse response, @RequestBody Users users) {
    QueryWrapper<Users> wrapper = new QueryWrapper<>();
    if (users.getId() != null) {
      wrapper.eq("id", users.getId());
    }
    if (users.getUserName() != null) {
      wrapper.eq("user_name", users.getUserName());
    }
    return getResponse(userService.list(wrapper));
  }

  public static void main(String[] args) {
    System.out.println(RandomUtil.getRandomServerPort());
    System.out.println(RandomUtil.getRandomServerPort());
    System.out.println(RandomUtil.getRandomServerPort());
  }
}
