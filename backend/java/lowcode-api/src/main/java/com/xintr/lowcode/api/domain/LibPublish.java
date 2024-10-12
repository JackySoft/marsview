package com.xintr.lowcode.api.domain;

import com.xintr.lowcode.api.basic.BaseObject;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Id;

/**
 * <p>lib_publish</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @create: 2024-09-27 10:17:32
 */
public class LibPublish extends BaseObject implements Serializable {
    /**
     * 索引
     */
    @Id
    private Long id;

    /**
     * 发布ID
     */
    private String releaseId;

    /**
     * 组件库关联ID
     */
    private String libId;

    /**
     * React远程地址
     */
    private String reactUrl;

    /**
     * css远程地址
     */
    private String cssUrl;

    /**
     * config远程地址
     */
    private String configUrl;

    /**
     * 版本hash
     */
    private String releaseHash;

    /**
     * 通行证ID
     */
    private Integer userId;

    /**
     * 通行证名称
     */
    private String userName;

    /**
     * 记录更新次数
     */
    private Integer count;

    /**
     * 创建时间
     */
    private Date updatedAt;

    /**
     * 更新时间
     */
    private Date createdAt;

    /**
     * 索引
     *
     * @return lib_publish.id, 索引
     */
    public Long getId() {
        return id;
    }

    /**
     * 索引
     *
     * @param id lib_publish.id, 索引
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * 发布ID
     *
     * @return lib_publish.release_id, 发布ID
     */
    public String getReleaseId() {
        return releaseId;
    }

    /**
     * 发布ID
     *
     * @param releaseId lib_publish.release_id, 发布ID
     */
    public void setReleaseId(String releaseId) {
        this.releaseId = releaseId == null ? null : releaseId.trim();
    }

    /**
     * 组件库关联ID
     *
     * @return lib_publish.lib_id, 组件库关联ID
     */
    public String getLibId() {
        return libId;
    }

    /**
     * 组件库关联ID
     *
     * @param libId lib_publish.lib_id, 组件库关联ID
     */
    public void setLibId(String libId) {
        this.libId = libId == null ? null : libId.trim();
    }

    /**
     * React远程地址
     *
     * @return lib_publish.react_url, React远程地址
     */
    public String getReactUrl() {
        return reactUrl;
    }

    /**
     * React远程地址
     *
     * @param reactUrl lib_publish.react_url, React远程地址
     */
    public void setReactUrl(String reactUrl) {
        this.reactUrl = reactUrl == null ? null : reactUrl.trim();
    }

    /**
     * css远程地址
     *
     * @return lib_publish.css_url, css远程地址
     */
    public String getCssUrl() {
        return cssUrl;
    }

    /**
     * css远程地址
     *
     * @param cssUrl lib_publish.css_url, css远程地址
     */
    public void setCssUrl(String cssUrl) {
        this.cssUrl = cssUrl == null ? null : cssUrl.trim();
    }

    /**
     * config远程地址
     *
     * @return lib_publish.config_url, config远程地址
     */
    public String getConfigUrl() {
        return configUrl;
    }

    /**
     * config远程地址
     *
     * @param configUrl lib_publish.config_url, config远程地址
     */
    public void setConfigUrl(String configUrl) {
        this.configUrl = configUrl == null ? null : configUrl.trim();
    }

    /**
     * 版本hash
     *
     * @return lib_publish.release_hash, 版本hash
     */
    public String getReleaseHash() {
        return releaseHash;
    }

    /**
     * 版本hash
     *
     * @param releaseHash lib_publish.release_hash, 版本hash
     */
    public void setReleaseHash(String releaseHash) {
        this.releaseHash = releaseHash == null ? null : releaseHash.trim();
    }

    /**
     * 通行证ID
     *
     * @return lib_publish.user_id, 通行证ID
     */
    public Integer getUserId() {
        return userId;
    }

    /**
     * 通行证ID
     *
     * @param userId lib_publish.user_id, 通行证ID
     */
    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    /**
     * 通行证名称
     *
     * @return lib_publish.user_name, 通行证名称
     */
    public String getUserName() {
        return userName;
    }

    /**
     * 通行证名称
     *
     * @param userName lib_publish.user_name, 通行证名称
     */
    public void setUserName(String userName) {
        this.userName = userName == null ? null : userName.trim();
    }

    /**
     * 记录更新次数
     *
     * @return lib_publish.count, 记录更新次数
     */
    public Integer getCount() {
        return count;
    }

    /**
     * 记录更新次数
     *
     * @param count lib_publish.count, 记录更新次数
     */
    public void setCount(Integer count) {
        this.count = count;
    }

    /**
     * 创建时间
     *
     * @return lib_publish.updated_at, 创建时间
     */
    public Date getUpdatedAt() {
        return updatedAt;
    }

    /**
     * 创建时间
     *
     * @param updatedAt lib_publish.updated_at, 创建时间
     */
    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    /**
     * 更新时间
     *
     * @return lib_publish.created_at, 更新时间
     */
    public Date getCreatedAt() {
        return createdAt;
    }

    /**
     * 更新时间
     *
     * @param createdAt lib_publish.created_at, 更新时间
     */
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}