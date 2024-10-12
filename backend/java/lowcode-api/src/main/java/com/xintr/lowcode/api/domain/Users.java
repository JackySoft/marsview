package com.xintr.lowcode.api.domain;

import com.xintr.lowcode.api.basic.BaseObject;

import javax.persistence.Id;
import java.io.Serializable;
import java.util.Date;

/**
 * <p>users</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @create: 2024-09-27 10:19:47
 */
public class Users extends BaseObject implements Serializable {
    /**
     * id
     */
    @Id
    private Long id;

    /**
     * 邮箱
     */
    private String user_name;

    /**
     * 密码
     */
    private String user_pwd;

    /**
     * 团队ID
     */
    private Integer team_id;

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

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getUser_pwd() {
        return user_pwd;
    }

    public void setUser_pwd(String user_pwd) {
        this.user_pwd = user_pwd;
    }

    public Integer getTeam_id() {
        return team_id;
    }

    public void setTeam_id(Integer team_id) {
        this.team_id = team_id;
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
