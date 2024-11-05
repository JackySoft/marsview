package com.xintr.lowcode.api.domain;

import com.xintr.lowcode.api.basic.BaseObject;

import javax.persistence.Id;
import java.io.Serializable;
import java.util.Date;

/**
 * <p>lib</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @create: 2024-09-27 10:02:11
 */
public class Lib extends BaseObject implements Serializable {
    /**
     * 组件ID
     */
    @Id
    private Long id;

    /**
     * 组件标识
     */
    private String tag;

    /**
     * 组件中文名称
     */
    private String name;

    /**
     * 组件描述
     */
    private String description;

    /**
     * 组件源码
     */
    private String react_code;

    /**
     * 组件样式
     */
    private String less_code;

    /**
     * 组件配置
     */
    private String config_code;

    /**
     * markdown内容
     */
    private String md_code;

    /**
     * 组件hash
     */
    private String hash;

    /**
     * 通行证ID
     */
    private Long user_id;

    /**
     * 通行证名称
     */
    private String user_name;


    /**
     * 创建时间
     */
    private Date updated_at;

    /**
     * 更新时间
     */
    private Date created_at;

    /**
     * 组件ID
     *
     * @return lib.id, 组件ID
     */
    public Long getId() {
        return id;
    }

    /**
     * 组件ID
     *
     * @param id lib.id, 组件ID
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * 组件标识
     *
     * @return lib.tag, 组件标识
     */
    public String getTag() {
        return tag;
    }

    /**
     * 组件标识
     *
     * @param tag lib.tag, 组件标识
     */
    public void setTag(String tag) {
        this.tag = tag == null ? null : tag.trim();
    }

    /**
     * 组件中文名称
     *
     * @return lib.name, 组件中文名称
     */
    public String getName() {
        return name;
    }

    /**
     * 组件中文名称
     *
     * @param name lib.name, 组件中文名称
     */
    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    /**
     * 组件描述
     *
     * @return lib.description, 组件描述
     */
    public String getDescription() {
        return description;
    }

    /**
     * 组件描述
     *
     * @param description lib.description, 组件描述
     */
    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    /**
     * 组件hash
     *
     * @return lib.hash, 组件hash
     */
    public String getHash() {
        return hash;
    }

    /**
     * 组件hash
     *
     * @param hash lib.hash, 组件hash
     */
    public void setHash(String hash) {
        this.hash = hash == null ? null : hash.trim();
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


    public String getReact_code() {
        return react_code;
    }

    public void setReact_code(String react_code) {
        this.react_code = react_code;
    }

    public String getLess_code() {
        return less_code;
    }

    public void setLess_code(String less_code) {
        this.less_code = less_code;
    }

    public String getConfig_code() {
        return config_code;
    }

    public void setConfig_code(String config_code) {
        this.config_code = config_code;
    }

    public String getMd_code() {
        return md_code;
    }

    public void setMd_code(String md_code) {
        this.md_code = md_code;
    }
}
