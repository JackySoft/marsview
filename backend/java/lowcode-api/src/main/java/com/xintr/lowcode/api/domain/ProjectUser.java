package com.xintr.lowcode.api.domain;

import com.xintr.lowcode.api.basic.BaseObject;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Id;

/**
 * <p>project_user</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @create: 2024-09-27 10:19:12
 */
public class ProjectUser extends BaseObject implements Serializable {
    /**
     * id
     */
    @Id
    private Long id;

    /**
     * 系统角色：1：管理员 2：普通用户
     */
    private Integer system_role;

    /**
     * 项目ID
     */
    private Long project_id;

    /**
     * 项目角色ID
     */
    private Integer role_id;

    /**
     * 通行证id
     */
    private Integer user_id;

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

    public Integer getSystem_role() {
        return system_role;
    }

    public void setSystem_role(Integer system_role) {
        this.system_role = system_role;
    }

    public Long getProject_id() {
        return project_id;
    }

    public void setProject_id(Long project_id) {
        this.project_id = project_id;
    }

    public Integer getRole_id() {
        return role_id;
    }

    public void setRole_id(Integer role_id) {
        this.role_id = role_id;
    }

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
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
