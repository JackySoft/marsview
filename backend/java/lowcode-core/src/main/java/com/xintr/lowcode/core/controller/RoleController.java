package com.xintr.lowcode.core.controller;

import com.xintr.lowcode.api.domain.Roles;
import com.xintr.lowcode.api.domain.Users;
import com.xintr.lowcode.core.basic.BasicController;
import com.xintr.lowcode.core.basic.Builder;
import com.xintr.lowcode.core.util.HtmlUtil;
import com.xintr.lowcode.core.util.SessionUtils;
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
 * @createTime: 2024/9/27 16:52
 */
@RestController
@RequestMapping("api/role")
public class RoleController extends BasicController {

    @Resource
    private RolesMapper rolesMapper;

    /**
     * 创建角色
     *
     * @param request
     * @param response
     * @param roles
     */
    @PostMapping("create")
    public void create(HttpServletRequest request, HttpServletResponse response, @RequestBody Roles roles) {
        Users users = SessionUtils.getUser(request);
        roles.setUser_id(users.getId());
        roles.setUser_name(users.getUser_name());
        roles.setCreated_at(new Date());
        HtmlUtil.writerJson(response, getUpdateResponse(rolesMapper.insertSelective(roles), "新增失败"));
    }

    /**
     * 获取角色列表
     *
     * @param response
     * @param pageNum
     * @param pageSize
     * @param project_id
     */
    @GetMapping("list")
    public void list(HttpServletResponse response, int pageNum, int pageSize, Long project_id) {
        HtmlUtil.writerJson(response, selectPageList(rolesMapper.select(Builder.of(Roles::new)
                .with(Roles::setPageIndex, pageNum)
                .with(Roles::setPageSize, pageSize)
                .with(Roles::setProject_id, project_id).build())));
    }

    /**
     * 获取角色列表
     *
     * @param response
     * @param project_id
     */
    @GetMapping("listAll")
    public void listAll(HttpServletResponse response, Long project_id) {
        HtmlUtil.writerJson(response, getResponse(rolesMapper.select(Builder.of(Roles::new)
                .with(Roles::setProject_id, project_id).build())));
    }

    /**
     * 更新角色信息
     *
     * @param response
     * @param roles
     */
    @PostMapping("updateLimits")
    public void updateLimits(HttpServletResponse response, @RequestBody Roles roles) {
        roles.setUpdated_at(new Date());
        HtmlUtil.writerJson(response, getUpdateResponse(rolesMapper.updateByPrimaryKeySelective(roles), "设置失败"));
    }
}
