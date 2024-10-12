package com.xintr.lowcode.core.controller;

import com.xintr.lowcode.api.domain.ProjectUser;
import com.xintr.lowcode.core.basic.BasicController;
import com.xintr.lowcode.core.basic.Builder;
import com.xintr.lowcode.core.util.HtmlUtil;
import com.xintr.lowcode.mapper.sys.ProjectUserMapper;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

/**
 * <p>说明</p>
 *
 * @author 张峰 zfvip_it@163.com
 * createTime: 2024/9/29 07:59
 */
@RestController
@RequestMapping("api/project/user")
public class ProjectUserController extends BasicController {

    @Resource
    private ProjectUserMapper projectUserMapper;

    /**
     * 创建项目用户
     *
     * @param response
     * @param projectUser
     */
    @PostMapping("create")
    public void create(HttpServletResponse response, @RequestBody ProjectUser projectUser) {
        if (projectUserMapper.selectCount(Builder.of(ProjectUser::new)
                .with(ProjectUser::setProject_id, projectUser.getProject_id())
                .with(ProjectUser::setUser_id, projectUser.getUser_id()).build()) > 0) {
            HtmlUtil.writerJson(response, getErrorResponse("该用户已存在"));
        } else {
            projectUser.setCreated_at(new Date());
            HtmlUtil.writerJson(response, getUpdateResponse(projectUserMapper.insertSelective(projectUser), "新增失败"));
        }
    }

    /**
     * 获取用户列表
     *
     * @param response
     * @param project_id
     * @param pageNum
     * @param pageSize
     */
    @GetMapping("list")
    public void detail(HttpServletResponse response, Long project_id, int pageNum, int pageSize) {
        HtmlUtil.writerJson(response, selectPageList(projectUserMapper.select(Builder.of(ProjectUser::new)
                .with(ProjectUser::setProject_id, project_id)
                .with(ProjectUser::setPageIndex, pageNum)
                .with(ProjectUser::setPageSize, pageSize).build())));
    }
}
