package com.xintr.lowcode.api.domain;

import com.xintr.lowcode.api.basic.BaseObject;

import javax.persistence.Id;
import java.io.Serializable;
import java.util.Date;

/**
 * <p>pages_publish</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @create: 2024-09-27 10:18:29
 */
public class PagesPublish extends BaseObject implements Serializable {
    /**
     * 页面发布ID
     */
    @Id
    private Long id;

    /**
     * 页面ID
     */
    private Long page_id;

    /**
     * 页面名称
     */
    private String page_name;

    /**
     * 通行证id
     */
    private Long user_id;

    /**
     * 姓名
     */
    private String user_name;

    /**
     * 版本号
     */
    private String version;

    /**
     * 状态：stg、pre、 prd
     */
    private String env;

    /**
     * 更新时间
     */
    private Date updated_at;

    /**
     * 创建时间
     */
    private Date created_at;

    /**
     * 页面数据
     */
    private String page_data;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPage_id() {
        return page_id;
    }

    public void setPage_id(Long page_id) {
        this.page_id = page_id;
    }

    public String getPage_name() {
        return page_name;
    }

    public void setPage_name(String page_name) {
        this.page_name = page_name;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getEnv() {
        return env;
    }

    public void setEnv(String env) {
        this.env = env;
    }

    public Date getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(Date updated_at) {
        this.updated_at = updated_at;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }

    public String getPage_data() {
        return page_data;
    }

    public void setPage_data(String page_data) {
        this.page_data = page_data;
    }
}
