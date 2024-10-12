package com.xintr.lowcode.core.controller;

import com.xintr.lowcode.api.domain.Menu;
import com.xintr.lowcode.api.domain.Users;
import com.xintr.lowcode.core.basic.BasicController;
import com.xintr.lowcode.core.util.HtmlUtil;
import com.xintr.lowcode.core.util.SessionUtils;
import com.xintr.lowcode.mapper.sys.MenuMapper;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.Map;

/**
 * <p>类说明</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @createTime: 2024/9/27 16:51
 */
@RestController
@RequestMapping("api/menu")
public class MenuController extends BasicController {

    @Resource
    private MenuMapper menuMapper;

    /**
     * 创建菜单
     *
     * @param request
     * @param response
     * @param menu
     */
    @PostMapping("create")
    public void create(HttpServletRequest request, HttpServletResponse response, @RequestBody Menu menu) {
        Users user = SessionUtils.getUser(request);
        menu.setUser_id(user.getId());
        menu.setUser_name(user.getUser_name());
        menu.setCreated_at(new Date());
        HtmlUtil.writerJson(response, getUpdateResponse(menuMapper.insertSelective(menu), "新增失败"));
    }

    /**
     * 更新菜单
     *
     * @param response
     * @param menu
     */
    @PostMapping("update")
    public void update(HttpServletResponse response, @RequestBody Menu menu) {
        menu.setUpdated_at(new Date());
        HtmlUtil.writerJson(response, getUpdateResponse(menuMapper.updateByPrimaryKeySelective(menu), "保存失败"));
    }

    /**
     * 获取菜单列表
     *
     * @param response
     * @param menu
     */
    @PostMapping("list")
    public void list(HttpServletResponse response, @RequestBody Menu menu) {
        menu.setStatus(menu.getStatus() == null || menu.getStatus() == -1 ? 1 : menu.getStatus());
        HtmlUtil.writerJson(response, getResponse(Map.of("list", menuMapper.select(menu))));
    }

    /**
     * 复制
     *
     * @param response
     * @param menu
     */
    @PostMapping("copy")
    public void copy(HttpServletRequest request, HttpServletResponse response, @RequestBody Menu menu) {
        Users user = SessionUtils.getUser(request);
        menu = menuMapper.selectByPrimaryKey(menu.getId());
        menu.setId(null);
        menu.setPage_id(null);
        menu.setName(menu.getName() + "-副本");
        menu.setCreated_at(new Date());
        menu.setUser_id(user.getId());
        menu.setUser_name(user.getUser_name());
        HtmlUtil.writerJson(response, getUpdateResponse(menuMapper.insertSelective(menu), "复制失败"));
    }
}
