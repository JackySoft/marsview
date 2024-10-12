package com.xintr.lowcode.api.dto;

import com.xintr.lowcode.api.domain.Pages;

/**
 * <p>类说明</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @createTime: 2024/9/27 17:11
 */
public class PagesDto extends Pages {

    /**
     * 1、我的 2、市场
     */
    private Integer type;

    /**
     * 环境
     */
    private String env;

    /**
     * push_id
     */
    private Long last_publish_id;

    /**
     * 页面id
     */
    private Long page_id;

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getEnv() {
        return env;
    }

    public void setEnv(String env) {
        this.env = env;
    }

    public Long getLast_publish_id() {
        return last_publish_id;
    }

    public void setLast_publish_id(Long last_publish_id) {
        this.last_publish_id = last_publish_id;
    }

    public Long getPage_id() {
        return page_id;
    }

    public void setPage_id(Long page_id) {
        this.page_id = page_id;
    }
}
