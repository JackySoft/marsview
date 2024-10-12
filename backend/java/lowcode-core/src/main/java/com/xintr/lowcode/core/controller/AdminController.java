package com.xintr.lowcode.core.controller;

import com.xintr.lowcode.api.domain.Menu;
import com.xintr.lowcode.api.domain.Users;
import com.xintr.lowcode.api.dto.PagesDto;
import com.xintr.lowcode.api.dto.ProjectsDto;
import com.xintr.lowcode.core.basic.BasicController;
import com.xintr.lowcode.core.basic.Builder;
import com.xintr.lowcode.core.util.HtmlUtil;
import com.xintr.lowcode.core.util.SessionUtils;
import com.xintr.lowcode.mapper.sys.MenuMapper;
import com.xintr.lowcode.mapper.sys.PagesMapper;
import com.xintr.lowcode.mapper.sys.ProjectsMapper;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
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

    @Resource
    private ProjectsMapper projectsMapper;

    @Resource
    private MenuMapper menuMapper;

    @Resource
    private PagesMapper pagesMapper;

    /**
     * 获取项目配置
     *
     * @param response
     * @param project_id
     */
    @GetMapping("getProjectConfig")
    public void getProjectConfig(HttpServletResponse response, Long project_id) {
        HtmlUtil.writerJson(response, getResponse(projectsMapper.selectByPrimaryKey(project_id)));
    }

    /**
     * 获取项目对应的菜单
     *
     * @param response
     * @param project_id
     */
    @GetMapping("menu/list/{project_id}")
    public void menuList(HttpServletResponse response, @PathVariable Long project_id) {
        HtmlUtil.writerJson(response, getResponse(Map.of("list", menuMapper.select(Builder.of(Menu::new)
                .with(Menu::setProject_id, project_id).build()))));
    }

    /**
     * 获取页面详情
     *
     * @param response
     * @param env
     * @param page_id
     */
    @GetMapping("page/detail/{env}/{page_id}")
    public void pageDetail(HttpServletRequest request, HttpServletResponse response, @PathVariable(name = "env") String env, @PathVariable(name = "page_id") Long page_id) {
        LOGGER.info("请求参数env[{}],page_id[{}]", env, page_id);
        Users users = SessionUtils.getUser(request);
        HtmlUtil.writerJson(response, getResponse(pagesMapper.selectOne(Builder.of(PagesDto::new)
                .with(PagesDto::setEnv, env)
                .with(PagesDto::setUser_id, users.getId())
                .with(PagesDto::setId, page_id).build())));
    }

    /**
     * 获取项目列表
     *
     * @param response
     * @param pageNum
     * @param pageSize
     */
    @GetMapping("project/list")
    public void projectList(HttpServletRequest request, HttpServletResponse response, int pageNum, int pageSize) {
        Users users = SessionUtils.getUser(request);
        HtmlUtil.writerJson(response, selectPageList(getPageMapper(projectsMapper)
                .projectList(Builder.of(ProjectsDto::new)
                        .with(ProjectsDto::setUser_id, users.getId())
                        .with(ProjectsDto::setPageIndex, pageNum)
                        .with(ProjectsDto::setPageSize, pageSize).build())));
    }
}
