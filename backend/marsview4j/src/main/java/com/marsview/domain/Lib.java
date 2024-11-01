package com.marsview.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 自定义组件库表，用来满足自定义业务
 * @TableName lib
 */
@TableName(value ="lib")
@Data
public class Lib implements Serializable {
    /**
     * 组件ID
     */
    @TableId(type = IdType.AUTO)
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
    private String reactCode;

    /**
     * 组件样式
     */
    private String lessCode;

    /**
     * 组件配置
     */
    private String configCode;

    /**
     * markdown内容
     */
    private String mdCode;

    /**
     * 组件hash
     */
    private String hash;

    /**
     * 通行证ID
     */
    private Integer userId;

    /**
     * 通行证名称
     */
    private String userName;

    /**
     * 创建时间
     */
    private Date updatedAt;

    /**
     * 更新时间
     */
    private Date createdAt;

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
        Lib other = (Lib) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getTag() == null ? other.getTag() == null : this.getTag().equals(other.getTag()))
            && (this.getName() == null ? other.getName() == null : this.getName().equals(other.getName()))
            && (this.getDescription() == null ? other.getDescription() == null : this.getDescription().equals(other.getDescription()))
            && (this.getReactCode() == null ? other.getReactCode() == null : this.getReactCode().equals(other.getReactCode()))
            && (this.getLessCode() == null ? other.getLessCode() == null : this.getLessCode().equals(other.getLessCode()))
            && (this.getConfigCode() == null ? other.getConfigCode() == null : this.getConfigCode().equals(other.getConfigCode()))
            && (this.getMdCode() == null ? other.getMdCode() == null : this.getMdCode().equals(other.getMdCode()))
            && (this.getHash() == null ? other.getHash() == null : this.getHash().equals(other.getHash()))
            && (this.getUserId() == null ? other.getUserId() == null : this.getUserId().equals(other.getUserId()))
            && (this.getUserName() == null ? other.getUserName() == null : this.getUserName().equals(other.getUserName()))
            && (this.getUpdatedAt() == null ? other.getUpdatedAt() == null : this.getUpdatedAt().equals(other.getUpdatedAt()))
            && (this.getCreatedAt() == null ? other.getCreatedAt() == null : this.getCreatedAt().equals(other.getCreatedAt()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getTag() == null) ? 0 : getTag().hashCode());
        result = prime * result + ((getName() == null) ? 0 : getName().hashCode());
        result = prime * result + ((getDescription() == null) ? 0 : getDescription().hashCode());
        result = prime * result + ((getReactCode() == null) ? 0 : getReactCode().hashCode());
        result = prime * result + ((getLessCode() == null) ? 0 : getLessCode().hashCode());
        result = prime * result + ((getConfigCode() == null) ? 0 : getConfigCode().hashCode());
        result = prime * result + ((getMdCode() == null) ? 0 : getMdCode().hashCode());
        result = prime * result + ((getHash() == null) ? 0 : getHash().hashCode());
        result = prime * result + ((getUserId() == null) ? 0 : getUserId().hashCode());
        result = prime * result + ((getUserName() == null) ? 0 : getUserName().hashCode());
        result = prime * result + ((getUpdatedAt() == null) ? 0 : getUpdatedAt().hashCode());
        result = prime * result + ((getCreatedAt() == null) ? 0 : getCreatedAt().hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", tag=").append(tag);
        sb.append(", name=").append(name);
        sb.append(", description=").append(description);
        sb.append(", reactCode=").append(reactCode);
        sb.append(", lessCode=").append(lessCode);
        sb.append(", configCode=").append(configCode);
        sb.append(", mdCode=").append(mdCode);
        sb.append(", hash=").append(hash);
        sb.append(", userId=").append(userId);
        sb.append(", userName=").append(userName);
        sb.append(", updatedAt=").append(updatedAt);
        sb.append(", createdAt=").append(createdAt);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}