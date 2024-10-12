package com.xintr.lowcode.core.controller;

import com.alibaba.druid.util.StringUtils;
import com.xintr.lowcode.api.domain.Pages;
import com.xintr.lowcode.api.domain.PagesPublish;
import com.xintr.lowcode.api.domain.Users;
import com.xintr.lowcode.core.basic.BasicController;
import com.xintr.lowcode.core.basic.Builder;
import com.xintr.lowcode.core.util.HtmlUtil;
import com.xintr.lowcode.core.util.SessionUtils;
import com.xintr.lowcode.mapper.sys.PagesMapper;
import com.xintr.lowcode.mapper.sys.PagesPublishMapper;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

/**
 * <p>说明</p>
 *
 * @author 张峰 zfvip_it@163.com
 * createTime: 2024/9/28 18:59
 */
@RestController
@RequestMapping("api/publish")
public class PublishController extends BasicController {

    @Resource
    private PagesPublishMapper pagesPublishMapper;

    @Resource
    private PagesMapper pagesMapper;

    /**
     * 创建发布
     *
     * @param request
     * @param response
     * @param publish
     */
    @PostMapping("create")
    public void create(HttpServletRequest request, HttpServletResponse response, @RequestBody PagesPublish publish) {
        Users users = SessionUtils.getUser(request);
        Pages pages = pagesMapper.selectByPrimaryKey(publish.getPage_id());
        if (pages == null) {
            HtmlUtil.writerJson(response, getErrorResponse("页面不存在"));
        } else {
            int count = pagesPublishMapper.selectCount(Builder.of(PagesPublish::new).with(PagesPublish::setPage_id, publish.getPage_id()).build());
            publish.setPage_name(pages.getName());
            publish.setUser_id(users.getId());
            publish.setUser_name(users.getUser_name());
            publish.setCreated_at(new Date());
            publish.setUpdated_at(new Date());
            publish.setVersion((count + 1) + "");
            publish.setPage_data(pages.getPage_data());
            int result = pagesPublishMapper.insertUseGeneratedKeys(publish);
            if (result > 0) {
                //更新页面信息
                pagesMapper.updateByPrimaryKeySelective(Builder.of(Pages::new)
                        .with(Pages::setId, pages.getId())
                        .with(Pages::setStg_publish_id, StringUtils.equals("stg", publish.getEnv()) ? publish.getId() : null)
                        .with(Pages::setStg_state, StringUtils.equals("stg", publish.getEnv()) ? 3 : null)
                        .with(Pages::setPre_publish_id, StringUtils.equals("pre", publish.getEnv()) ? publish.getId() : null)
                        .with(Pages::setPre_state, StringUtils.equals("pre", publish.getEnv()) ? 3 : null)
                        .with(Pages::setPrd_publish_id, StringUtils.equals("prd", publish.getEnv()) ? publish.getId() : null)
                        .with(Pages::setPrd_state, StringUtils.equals("prd", publish.getEnv()) ? 3 : null).build());
            }
            HtmlUtil.writerJson(response, getUpdateResponse(result, "发布失败"));
        }
    }

    /**
     * 分页获取发布记录
     *
     * @param response
     * @param publish
     */
    @PostMapping("list")
    public void list(HttpServletResponse response, @RequestBody PagesPublish publish) {
        HtmlUtil.writerJson(response, selectPageList(getPageMapper(pagesPublishMapper).dataList(publish)));
    }
}
