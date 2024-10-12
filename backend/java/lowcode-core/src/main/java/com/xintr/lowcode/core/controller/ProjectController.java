package com.xintr.lowcode.core.controller;

import com.xintr.lowcode.api.domain.Projects;
import com.xintr.lowcode.api.domain.Users;
import com.xintr.lowcode.api.dto.ProjectsDto;
import com.xintr.lowcode.core.basic.BasicController;
import com.xintr.lowcode.core.basic.Builder;
import com.xintr.lowcode.core.util.HtmlUtil;
import com.xintr.lowcode.core.util.SessionUtils;
import com.xintr.lowcode.mapper.sys.ProjectsMapper;
import com.xintr.lowcode.mapper.sys.RolesMapper;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

/**
 * <p>类说明</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @createTime: 2024/9/27 15:11
 */
@RestController
@RequestMapping("api/project")
public class ProjectController extends BasicController {

    @Resource
    private ProjectsMapper projectsMapper;

    @Resource
    private RolesMapper rolesMapper;

    /**
     * 分页获取项目列表
     *
     * @param response
     * @param type
     * @param pageNum
     * @param pageSize
     * @param keyword
     */
    @GetMapping("list")
    public void list(HttpServletRequest request, HttpServletResponse response, int type, int pageNum, int pageSize, String keyword) {
        Users users = SessionUtils.getUser(request);
        HtmlUtil.writerJson(response, selectPageList(getPageMapper(projectsMapper)
                .dataList(Builder.of(ProjectsDto::new)
                        .with(ProjectsDto::setPageSize, pageSize)
                        .with(ProjectsDto::setPageIndex, pageNum)
                        .with(ProjectsDto::setUser_id, users.getId())
                        .with(ProjectsDto::setType, type)
                        .with(ProjectsDto::setKeyword, keyword)
                        .with(ProjectsDto::setVagueMatch, new String[]{"name"}).build())
                .stream().peek(a -> a.setIs_edit(a.getUser_id().longValue() == users.getId().longValue())).toList()));
    }

    /**
     * 创建项目
     *
     * @param request
     * @param response
     * @param projects
     */
    @PostMapping("create")
    public void create(HttpServletRequest request, HttpServletResponse response, @RequestBody Projects projects) {
        Users users = SessionUtils.getUser(request);
        projects.setCreated_at(new Date());
        projects.setUser_id(users.getId());
        projects.setUser_name(users.getUser_name());
        HtmlUtil.writerJson(response, getUpdateResponse(projectsMapper.insertSelective(projects), "项目创建失败"));
    }

    /**
     * 获取页面列表
     *
     * @param response
     * @param page_id
     */
    @GetMapping("/detail/{page_id}")
    public void detail(HttpServletRequest request, HttpServletResponse response, @PathVariable("page_id") Long page_id) {
        Users users = SessionUtils.getUser(request);
        HtmlUtil.writerJson(response, getResponse(projectsMapper.selectOne(Builder.of(Projects::new)
                .with(Projects::setUser_id, users.getId())
                .with(Projects::setId, page_id).build())));
    }

    /**
     * 更新项目
     *
     * @param response
     * @param projects
     */
    @PostMapping("update")
    public void update(HttpServletResponse response, @RequestBody Projects projects) {
        projects.setUpdated_at(new Date());
        HtmlUtil.writerJson(response, getUpdateResponse(projectsMapper.updateByPrimaryKeySelective(projects), "保存失败"));
    }
}
