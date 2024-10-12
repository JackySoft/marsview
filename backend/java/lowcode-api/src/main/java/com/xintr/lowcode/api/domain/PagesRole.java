package com.xintr.lowcode.api.domain;

import com.xintr.lowcode.api.basic.BaseObject;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Id;

/**
 * <p>pages_role</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @create: 2024-09-27 10:18:58
 */
public class PagesRole extends BaseObject implements Serializable {
    /**
     * ID
     */
    @Id
    private Long id;

    /**
     * 页面ID
     */
    private Long pageId;

    /**
     * 角色权限 1-developer 2-visitor
     */
    private Long role;

    /**
     * 项目类型 1-项目 2-页面
     */
    private Integer type;

    /**
     * 通行证id
     */
    private Integer userId;

    /**
     * 姓名
     */
    private String userName;

    /**
     * 更新时间
     */
    private Date updatedAt;

    /**
     * 创建时间
     */
    private Date createdAt;

    /**
     * ID
     *
     * @return pages_role.id, ID
     */
    public Long getId() {
        return id;
    }

    /**
     * ID
     *
     * @param id pages_role.id, ID
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * 页面ID
     *
     * @return pages_role.page_id, 页面ID
     */
    public Long getPageId() {
        return pageId;
    }

    /**
     * 页面ID
     *
     * @param pageId pages_role.page_id, 页面ID
     */
    public void setPageId(Long pageId) {
        this.pageId = pageId;
    }

    /**
     * 角色权限 1-developer 2-visitor
     *
     * @return pages_role.role, 角色权限 1-developer 2-visitor
     */
    public Long getRole() {
        return role;
    }

    /**
     * 角色权限 1-developer 2-visitor
     *
     * @param role pages_role.role, 角色权限 1-developer 2-visitor
     */
    public void setRole(Long role) {
        this.role = role;
    }

    /**
     * 项目类型 1-项目 2-页面
     *
     * @return pages_role.type, 项目类型 1-项目 2-页面
     */
    public Integer getType() {
        return type;
    }

    /**
     * 项目类型 1-项目 2-页面
     *
     * @param type pages_role.type, 项目类型 1-项目 2-页面
     */
    public void setType(Integer type) {
        this.type = type;
    }

    /**
     * 通行证id
     *
     * @return pages_role.user_id, 通行证id
     */
    public Integer getUserId() {
        return userId;
    }

    /**
     * 通行证id
     *
     * @param userId pages_role.user_id, 通行证id
     */
    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    /**
     * 姓名
     *
     * @return pages_role.user_name, 姓名
     */
    public String getUserName() {
        return userName;
    }

    /**
     * 姓名
     *
     * @param userName pages_role.user_name, 姓名
     */
    public void setUserName(String userName) {
        this.userName = userName == null ? null : userName.trim();
    }

    /**
     * 更新时间
     *
     * @return pages_role.updated_at, 更新时间
     */
    public Date getUpdatedAt() {
        return updatedAt;
    }

    /**
     * 更新时间
     *
     * @param updatedAt pages_role.updated_at, 更新时间
     */
    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    /**
     * 创建时间
     *
     * @return pages_role.created_at, 创建时间
     */
    public Date getCreatedAt() {
        return createdAt;
    }

    /**
     * 创建时间
     *
     * @param createdAt pages_role.created_at, 创建时间
     */
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}