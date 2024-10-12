package com.xintr.lowcode.core.controller;

import com.alibaba.fastjson2.JSON;
import com.xintr.lowcode.api.domain.Lib;
import com.xintr.lowcode.api.domain.Users;
import com.xintr.lowcode.api.dto.LibDto;
import com.xintr.lowcode.core.basic.BasicController;
import com.xintr.lowcode.core.basic.Builder;
import com.xintr.lowcode.core.util.HtmlUtil;
import com.xintr.lowcode.core.util.SessionUtils;
import com.xintr.lowcode.mapper.sys.LibMapper;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

/**
 * <p>说明</p>
 *
 * @author 张峰 zfvip_it@163.com
 * createTime: 2024/10/1 13:55
 */
@RestController
@RequestMapping("api/lib")
public class LibController extends BasicController {

    private static final Logger LOGGER = LogManager.getLogger(LibController.class);

    @Resource
    private LibMapper libMapper;

    /**
     * 创建组件库
     *
     * @param request
     * @param response
     * @param lib
     */
    @PostMapping("create")
    public void create(HttpServletRequest request, HttpServletResponse response, @RequestBody Lib lib) {
        Users users = SessionUtils.getUser(request);
        lib.setCreated_at(new Date());
        lib.setUser_id(users.getId());
        lib.setUser_name(users.getUser_name());
        HtmlUtil.writerJson(response, getUpdateResponse(libMapper.insertSelective(lib), "创建失败"));
    }

    /**
     * 组件库列表
     *
     * @param request
     * @param response
     * @param pageNum
     * @param pageSize
     * @param type
     */
    @GetMapping("list")
    public void list(HttpServletRequest request, HttpServletResponse response, int pageNum, int pageSize, int type) {
        Users users = SessionUtils.getUser(request);
        HtmlUtil.writerJson(response, selectPageList(getPageMapper(libMapper).dataList(Builder.of(LibDto::new)
                .with(LibDto::setPageIndex, pageNum)
                .with(LibDto::setPageSize, pageSize)
                .with(LibDto::setType, type)
                .with(LibDto::setUser_id, users.getId())
                .build())));
    }

    /**
     * 获取组件库详情
     *
     * @param response
     * @param lib_id
     */
    @GetMapping("detail/{lib_id}")
    public void libDetail(HttpServletResponse response, @PathVariable("lib_id") Long lib_id) {
        HtmlUtil.writerJson(response, getResponse(libMapper.selectByPrimaryKey(lib_id)));
    }

    /**
     * 更新组件库
     *
     * @param response
     * @param lib
     */
    @PostMapping("update")
    public void update(HttpServletResponse response, @RequestBody Lib lib) {
        HtmlUtil.writerJson(response, getUpdateResponse(libMapper.updateByPrimaryKeySelective(lib), "处理失败"));
    }

    /**
     * 发布组件库
     *
     * @param response
     * @param lib
     */
    @PostMapping("publish")
    public void publish(HttpServletResponse response, @RequestBody Lib lib) {
        HtmlUtil.writerJson(response, getUpdateResponse(libMapper.updateByPrimaryKeySelective(lib), "发布失败"));
    }
}
