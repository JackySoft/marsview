package com.marsview.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 项目列表
 * @TableName projects
 */
@TableName(value ="projects")
@Data
public class Projects implements Serializable {
    /**
     * 项目ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 项目名称
     */
    private String name;

    /**
     * 更新时间
     */
    private Date updatedAt;

    /**
     * 创建时间
     */
    private Date createdAt;

    /**
     * 项目描述
     */
    private String remark;

    /**
     * appid
     */
    private String appid;

    /**
     * logo 地址
     */
    private String logo;

    /**
     * 方法 1-办公网 2-英特网
     */
    private Integer visitType;

    /**
     * 姓名
     */
    private String userName;

    /**
     * 通行证id
     */
    private Integer userId;

    /**
     * 是否开放 1-公开 2-私有
     */
    private Integer isPublic;

    /**
     * 面包屑 1-有 0 无
     */
    private Integer breadcrumb;

    /**
     * 布局 1-上下 2-左右 3-上中下
     */
    private Integer layout;

    /**
     * 菜单模式：inline-内嵌 vertical-垂直  horizontal-水平
     */
    private String menuMode;

    /**
     * 菜单主题色：dark 深色 light-浅色 支持16进制
     */
    private String menuThemeColor;

    /**
     * 多页签 1-显示 0-不显示
     */
    private Integer tag;

    /**
     * 页脚 1-显示 0-不显示
     */
    private Integer footer;

    /**
     * 系统主题色
     */
    private String systemThemeColor;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;

    @Override
    public boolean equals(Object that) {
        if (this == that) {
            return true;
        }
        if (that == null) {
            return false;
        }
        if (getClass() != that.getClass()) {
            return false;
        }
        Projects other = (Projects) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getName() == null ? other.getName() == null : this.getName().equals(other.getName()))
            && (this.getUpdatedAt() == null ? other.getUpdatedAt() == null : this.getUpdatedAt().equals(other.getUpdatedAt()))
            && (this.getCreatedAt() == null ? other.getCreatedAt() == null : this.getCreatedAt().equals(other.getCreatedAt()))
            && (this.getRemark() == null ? other.getRemark() == null : this.getRemark().equals(other.getRemark()))
            && (this.getAppid() == null ? other.getAppid() == null : this.getAppid().equals(other.getAppid()))
            && (this.getLogo() == null ? other.getLogo() == null : this.getLogo().equals(other.getLogo()))
            && (this.getVisitType() == null ? other.getVisitType() == null : this.getVisitType().equals(other.getVisitType()))
            && (this.getUserName() == null ? other.getUserName() == null : this.getUserName().equals(other.getUserName()))
            && (this.getUserId() == null ? other.getUserId() == null : this.getUserId().equals(other.getUserId()))
            && (this.getIsPublic() == null ? other.getIsPublic() == null : this.getIsPublic().equals(other.getIsPublic()))
            && (this.getBreadcrumb() == null ? other.getBreadcrumb() == null : this.getBreadcrumb().equals(other.getBreadcrumb()))
            && (this.getLayout() == null ? other.getLayout() == null : this.getLayout().equals(other.getLayout()))
            && (this.getMenuMode() == null ? other.getMenuMode() == null : this.getMenuMode().equals(other.getMenuMode()))
            && (this.getMenuThemeColor() == null ? other.getMenuThemeColor() == null : this.getMenuThemeColor().equals(other.getMenuThemeColor()))
            && (this.getTag() == null ? other.getTag() == null : this.getTag().equals(other.getTag()))
            && (this.getFooter() == null ? other.getFooter() == null : this.getFooter().equals(other.getFooter()))
            && (this.getSystemThemeColor() == null ? other.getSystemThemeColor() == null : this.getSystemThemeColor().equals(other.getSystemThemeColor()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getName() == null) ? 0 : getName().hashCode());
        result = prime * result + ((getUpdatedAt() == null) ? 0 : getUpdatedAt().hashCode());
        result = prime * result + ((getCreatedAt() == null) ? 0 : getCreatedAt().hashCode());
        result = prime * result + ((getRemark() == null) ? 0 : getRemark().hashCode());
        result = prime * result + ((getAppid() == null) ? 0 : getAppid().hashCode());
        result = prime * result + ((getLogo() == null) ? 0 : getLogo().hashCode());
        result = prime * result + ((getVisitType() == null) ? 0 : getVisitType().hashCode());
        result = prime * result + ((getUserName() == null) ? 0 : getUserName().hashCode());
        result = prime * result + ((getUserId() == null) ? 0 : getUserId().hashCode());
        result = prime * result + ((getIsPublic() == null) ? 0 : getIsPublic().hashCode());
        result = prime * result + ((getBreadcrumb() == null) ? 0 : getBreadcrumb().hashCode());
        result = prime * result + ((getLayout() == null) ? 0 : getLayout().hashCode());
        result = prime * result + ((getMenuMode() == null) ? 0 : getMenuMode().hashCode());
        result = prime * result + ((getMenuThemeColor() == null) ? 0 : getMenuThemeColor().hashCode());
        result = prime * result + ((getTag() == null) ? 0 : getTag().hashCode());
        result = prime * result + ((getFooter() == null) ? 0 : getFooter().hashCode());
        result = prime * result + ((getSystemThemeColor() == null) ? 0 : getSystemThemeColor().hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", name=").append(name);
        sb.append(", updatedAt=").append(updatedAt);
        sb.append(", createdAt=").append(createdAt);
        sb.append(", remark=").append(remark);
        sb.append(", appid=").append(appid);
        sb.append(", logo=").append(logo);
        sb.append(", visitType=").append(visitType);
        sb.append(", userName=").append(userName);
        sb.append(", userId=").append(userId);
        sb.append(", isPublic=").append(isPublic);
        sb.append(", breadcrumb=").append(breadcrumb);
        sb.append(", layout=").append(layout);
        sb.append(", menuMode=").append(menuMode);
        sb.append(", menuThemeColor=").append(menuThemeColor);
        sb.append(", tag=").append(tag);
        sb.append(", footer=").append(footer);
        sb.append(", systemThemeColor=").append(systemThemeColor);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}