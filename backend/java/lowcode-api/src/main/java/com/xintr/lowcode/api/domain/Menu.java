package com.xintr.lowcode.api.domain;

import com.xintr.lowcode.api.basic.BaseObject;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Id;

/**
 * <p>menu</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @create: 2024-09-27 10:17:54
 */
public class Menu extends BaseObject implements Serializable {
    /**
     * 菜单ID
     */
    @Id
    private Long id;

    /**
     * 项目ID
     */
    private Long project_id;

    /**
     * 菜单名称
     */
    private String name;

    /**
     * 父级菜单ID
     */
    private Long parent_id;

    /**
     * 方法 1-菜单 2-按钮 3-页面
     */
    private Integer type;

    /**
     * 菜单图标
     */
    private String icon;

    /**
     * 路径
     */
    private String path;

    /**
     * 页面ID
     */
    private Long page_id;

    /**
     * 排序
     */
    private Integer sort_num;

    /**
     * 状态 1-启用 0-禁用
     */
    private Integer status;

    /**
     * 按钮标识
     */
    private String code;

    /**
     * 通行证id
     */
    private Long user_id;

    /**
     * 姓名
     */
    private String user_name;

    /**
     * 更新时间
     */
    private Date updated_at;

    /**
     * 创建时间
     */
    private Date created_at;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProject_id() {
        return project_id;
    }

    public void setProject_id(Long project_id) {
        this.project_id = project_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getParent_id() {
        return parent_id;
    }

    public void setParent_id(Long parent_id) {
        this.parent_id = parent_id;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Long getPage_id() {
        return page_id;
    }

    public void setPage_id(Long page_id) {
        this.page_id = page_id;
    }

    public Integer getSort_num() {
        return sort_num;
    }

    public void setSort_num(Integer sort_num) {
        this.sort_num = sort_num;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
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
}