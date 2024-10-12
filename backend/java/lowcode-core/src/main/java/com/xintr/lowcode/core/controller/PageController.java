package com.xintr.lowcode.core.controller;

import com.alibaba.druid.util.StringUtils;
import com.xintr.lowcode.api.domain.Menu;
import com.xintr.lowcode.api.domain.Pages;
import com.xintr.lowcode.api.domain.Users;
import com.xintr.lowcode.api.dto.PagesDto;
import com.xintr.lowcode.core.basic.BasicController;
import com.xintr.lowcode.core.basic.Builder;
import com.xintr.lowcode.core.util.HtmlUtil;
import com.xintr.lowcode.core.util.SessionUtils;
import com.xintr.lowcode.mapper.sys.MenuMapper;
import com.xintr.lowcode.mapper.sys.PagesMapper;
import com.xintr.lowcode.mapper.sys.RolesMapper;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;

/**
 * <p>类说明</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @createTime: 2024/9/27 16:28
 */
@RestController
@RequestMapping("api/page")
public class PageController extends BasicController {

    @Resource
    private PagesMapper pagesMapper;

    @Resource
    private MenuMapper menuMapper;

    @Resource
    private RolesMapper rolesMapper;

    /**
     * 创建页面
     *
     * @param request
     * @param response
     * @param pages
     */
    @PostMapping("create")
    public void create(HttpServletRequest request, HttpServletResponse response, @RequestBody Pages pages) {
        Users users = SessionUtils.getUser(request);
        pages.setUser_id(users.getId());
        pages.setUser_name(users.getUser_name());
        pages.setCreated_at(new Date());
        HtmlUtil.writerJson(response, getUpdateResponse(pagesMapper.insertSelective(pages), "创建失败"));
    }

    /**
     * 获取页面列表
     *
     * @param request
     * @param response
     * @param pageNum
     * @param pageSize
     * @param type
     */
    @GetMapping("list")
    public void list(HttpServletRequest request, HttpServletResponse response, int pageNum, int pageSize, Integer type) {
        Users users = SessionUtils.getUser(request);
        PagesDto dto = Builder.of(PagesDto::new)
                .with(PagesDto::setPageIndex, pageNum)
                .with(PagesDto::setPageSize, pageSize)
                .with(PagesDto::setType, type)
                .with(PagesDto::setUser_id, users.getId())
                .build();
        HtmlUtil.writerJson(response, selectPageList(getPageMapper(pagesMapper).dataList(dto)));
    }

    /**
     * 获取页面角色列表
     *
     * @param response
     * @param menu
     */
    @PostMapping("/role/list")
    public void list(HttpServletRequest request, HttpServletResponse response, @RequestBody Menu menu) {
        Users users = SessionUtils.getUser(request);
        menu.setUser_id(users.getId());
        HtmlUtil.writerJson(response, getResponse(Map.of("list", menuMapper.select(menu))));
    }

    /**
     * 获取页面角色列表
     *
     * @param response
     * @param page_id
     */
    @GetMapping("/detail/{page_id}")
    public void detail(HttpServletRequest request, HttpServletResponse response,
                       @PathVariable("page_id") Long page_id) {
        Users users = SessionUtils.getUser(request);
        HtmlUtil.writerJson(response, getResponse(pagesMapper.selectOne(Builder.of(Pages::new)
                .with(Pages::setId, page_id)
                .with(Pages::setUser_id, users.getId()).build())));
    }

    /**
     * 更新页面信息
     *
     * @param response
     * @param pages
     */
    @PostMapping("update")
    public void update(HttpServletResponse response, @RequestBody Pages pages) {
        pages.setCreated_at(new Date());
        HtmlUtil.writerJson(response, getUpdateResponse(pagesMapper.updateByPrimaryKeySelective(pages), "保存失败"));
    }

    /**
     * 页面回滚
     *
     * @param response
     * @param dto
     */
    @PostMapping("rollback")
    public void rollback(HttpServletResponse response, @RequestBody PagesDto dto) {
        HtmlUtil.writerJson(response, getUpdateResponse(
                pagesMapper.updateByPrimaryKeySelective(Builder.of(Pages::new)
                        .with(Pages::setId, dto.getPage_id())
                        .with(Pages::setStg_publish_id, StringUtils.equals("stg", dto.getEnv()) ? dto.getLast_publish_id() : null)
                        .with(Pages::setStg_state, StringUtils.equals("stg", dto.getEnv()) ? 3 : null)
                        .with(Pages::setPre_publish_id, StringUtils.equals("pre", dto.getEnv()) ? dto.getLast_publish_id() : null)
                        .with(Pages::setPre_state, StringUtils.equals("pre", dto.getEnv()) ? 3 : null)
                        .with(Pages::setPrd_publish_id, StringUtils.equals("prd", dto.getEnv()) ? dto.getLast_publish_id() : null)
                        .with(Pages::setPrd_state, StringUtils.equals("prd", dto.getEnv()) ? 3 : null).build()), "操作失败"));
    }
}
