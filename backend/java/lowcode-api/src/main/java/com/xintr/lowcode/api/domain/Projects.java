package com.xintr.lowcode.api.domain;

import com.xintr.lowcode.api.basic.BaseObject;

import javax.persistence.Id;
import java.io.Serializable;
import java.util.Date;

/**
 * <p>projects</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @create: 2024-09-27 10:19:24
 */
public class Projects extends BaseObject implements Serializable {
    /**
     * 项目ID
     */
    @Id
    private Long id;

    /**
     * 项目名称
     */
    private String name;

    /**
     * 更新时间
     */
    private Date updated_at;

    /**
     * 创建时间
     */
    private Date created_at;

    /**
     * 项目描述
     */
    private String remark;

    /**
     * appid
     */
    private String appid;

    /**
     * 方法 1-办公网 2-英特网
     */
    private Integer visit_type;

    /**
     * 姓名
     */
    private String user_name;

    /**
     * 通行证id
     */
    private Long user_id;

    /**
     * 是否开放 1-公开 2-私有
     */
    private Integer is_public;

    /**
     * 面包屑 1-有 0 无
     */
    private Boolean breadcrumb;

    /**
     * 布局 1-上下 2-左右 3-上中下
     */
    private Integer layout;

    /**
     * 菜单模式：inline-内嵌 vertical-垂直  horizontal-水平
     */
    private String menu_mode;

    /**
     * 菜单主题色：dark 深色 light-浅色 支持16进制
     */
    private String menu_theme_color;

    /**
     * 多页签 1-显示 0-不显示
     */
    private Boolean tag;

    /**
     * 页脚 1-显示 0-不显示
     */
    private Boolean footer;

    /**
     * 系统主题色
     */
    private String system_theme_color;

    /**
     * logo 地址
     */
    private String logo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getAppid() {
        return appid;
    }

    public void setAppid(String appid) {
        this.appid = appid;
    }

    public Integer getVisit_type() {
        return visit_type;
    }

    public void setVisit_type(Integer visit_type) {
        this.visit_type = visit_type;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public Integer getIs_public() {
        return is_public;
    }

    public void setIs_public(Integer is_public) {
        this.is_public = is_public;
    }

    public Boolean getBreadcrumb() {
        return breadcrumb;
    }

    public void setBreadcrumb(Boolean breadcrumb) {
        this.breadcrumb = breadcrumb;
    }

    public Integer getLayout() {
        return layout;
    }

    public void setLayout(Integer layout) {
        this.layout = layout;
    }

    public String getMenu_mode() {
        return menu_mode;
    }

    public void setMenu_mode(String menu_mode) {
        this.menu_mode = menu_mode;
    }

    public String getMenu_theme_color() {
        return menu_theme_color;
    }

    public void setMenu_theme_color(String menu_theme_color) {
        this.menu_theme_color = menu_theme_color;
    }

    public Boolean getTag() {
        return tag;
    }

    public void setTag(Boolean tag) {
        this.tag = tag;
    }

    public Boolean getFooter() {
        return footer;
    }

    public void setFooter(Boolean footer) {
        this.footer = footer;
    }

    public String getSystem_theme_color() {
        return system_theme_color;
    }

    public void setSystem_theme_color(String system_theme_color) {
        this.system_theme_color = system_theme_color;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }
}