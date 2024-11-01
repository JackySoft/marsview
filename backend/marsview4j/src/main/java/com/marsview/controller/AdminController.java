package com.marsview.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.marsview.controller.basic.BasicController;
import com.marsview.controller.basic.Builder;
import com.marsview.controller.basic.ResultResponse;
import com.marsview.domain.*;
import com.marsview.service.MenuService;
import com.marsview.service.PagesPublishService;
import com.marsview.service.PagesService;
import com.marsview.service.ProjectsService;
import com.marsview.util.SessionUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * <p>说明</p>
 *
 * @author 张峰 zfvip_it@163.com
 * createTime: 2024/9/29 11:01
 */
@RestController
@RequestMapping("api/admin")
public class AdminController extends BasicController {

  private static final Logger LOGGER = LogManager.getLogger(AdminController.class);

  @Autowired
  private ProjectsService projectsService;

  @Autowired
  private MenuService menuService;

  @Autowired
  private PagesService pagesService;

  @Autowired
  private PagesPublishService pagesPublishService;


  /**
   * 获取项目配置
   *
   * @param response
   * @param project_id
   */
  @GetMapping("getProjectConfig")
  public ResultResponse getProjectConfig(HttpServletResponse response, Long project_id) {
    return getResponse(projectsService.getById(project_id));
  }

  /**
   * 获取项目对应的菜单
   *
   * @param response
   * @param project_id
   */
  @GetMapping("menu/list/{project_id}")
  public ResultResponse menuList(HttpServletResponse response, @PathVariable Long project_id) {

    QueryWrapper<Menu> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("project_id", project_id);
    return getResponse(Map.of("list", menuService.list(queryWrapper)));
  }

  /**
   * 获取页面详情
   *
   * @param response
   * @param env
   * @param page_id
   */
  @GetMapping("page/detail/{env}/{page_id}")
  public ResultResponse pageDetail(HttpServletRequest request, HttpServletResponse response, @PathVariable(name = "env") String env, @PathVariable(name = "page_id") Long page_id) {
    LOGGER.info("请求参数env[{}],page_id[{}]", env, page_id);
    Users users = SessionUtils.getUser(request);

    Pages pages = pagesService.getById(page_id);
    if (pages == null) {
      return getErrorResponse("页面不存在");
    }
    Long last_publish_id = null;
    switch (env) {
      case "pre":
        last_publish_id = pages.getPrePublishId();
        break;
      case "stg":
        last_publish_id = pages.getStgPublishId();
        break;
      case "prd":
        last_publish_id = pages.getPrdPublishId();
        break;
      default:
        return getErrorResponse("环境参数错误");

    }

    QueryWrapper<PagesPublish> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("env", env);
    queryWrapper.eq("user_id", users.getId());
    queryWrapper.eq("id", last_publish_id);
    queryWrapper.eq("page_id", page_id);
    return getResponse(pagesPublishService.getOne(queryWrapper));
  }

  /**
   * 获取项目列表
   *
   * @param response
   * @param pageNum
   * @param pageSize
   */
  @GetMapping("project/list")
  public ResultResponse projectList(HttpServletRequest request, HttpServletResponse response, int pageNum, int pageSize) {
    Users users = SessionUtils.getUser(request);
    QueryWrapper<Projects> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("user_id", users.getId());

    Page<Projects> page = new Page<>(pageNum, pageSize);
    IPage<Projects> pageInfo = projectsService.page(page, queryWrapper);
    return Builder.of(ResultResponse::new).with(ResultResponse::setData,
      Map.of("list", pageInfo.getRecords(),
        "pageNum", pageInfo.getCurrent(),
        "pageSize", pageInfo.getSize(), // 注意这里应该是 getSize() 而不是 getPages()
        "total", pageInfo.getTotal())
    ).build();
  }
}
