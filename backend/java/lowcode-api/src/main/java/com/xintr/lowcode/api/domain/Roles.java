package com.xintr.lowcode.api.domain;

import com.xintr.lowcode.api.basic.BaseObject;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Id;

/**
 * <p>roles</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @create: 2024-09-27 10:19:36
 */
public class Roles extends BaseObject implements Serializable {
    /**
     * ID
     */
    @Id
    private Long id;

    /**
     * 项目ID
     */
    private Long project_id;

    /**
     * 角色名称
     */
    private String name;

    /**
     * 全选的菜单ID
     */
    private String half_checked;

    /**
     * 半全选的菜单ID
     */
    private String checked;

    /**
     * 角色备注
     */
    private String remark;

    /**
     * 更新时间
     */
    private Date updated_at;

    /**
     * 创建时间
     */
    private Date created_at;

    /**
     * 通行证id
     */
    private Long user_id;

    /**
     * 姓名
     */
    private String user_name;

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

    public String getHalf_checked() {
        return half_checked;
    }

    public void setHalf_checked(String half_checked) {
        this.half_checked = half_checked;
    }

    public String getChecked() {
        return checked;
    }

    public void setChecked(String checked) {
        this.checked = checked;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
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
}