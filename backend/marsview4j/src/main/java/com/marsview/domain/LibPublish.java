package com.marsview.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 组件库发布表
 * @TableName lib_publish
 */
@TableName(value ="lib_publish")
@Data
public class LibPublish implements Serializable {
    /**
     * 索引
     */
    @TableId(type = IdType.AUTO)
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
        LibPublish other = (LibPublish) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getReleaseId() == null ? other.getReleaseId() == null : this.getReleaseId().equals(other.getReleaseId()))
            && (this.getLibId() == null ? other.getLibId() == null : this.getLibId().equals(other.getLibId()))
            && (this.getReactUrl() == null ? other.getReactUrl() == null : this.getReactUrl().equals(other.getReactUrl()))
            && (this.getCssUrl() == null ? other.getCssUrl() == null : this.getCssUrl().equals(other.getCssUrl()))
            && (this.getConfigUrl() == null ? other.getConfigUrl() == null : this.getConfigUrl().equals(other.getConfigUrl()))
            && (this.getReleaseHash() == null ? other.getReleaseHash() == null : this.getReleaseHash().equals(other.getReleaseHash()))
            && (this.getUserId() == null ? other.getUserId() == null : this.getUserId().equals(other.getUserId()))
            && (this.getUserName() == null ? other.getUserName() == null : this.getUserName().equals(other.getUserName()))
            && (this.getCount() == null ? other.getCount() == null : this.getCount().equals(other.getCount()))
            && (this.getUpdatedAt() == null ? other.getUpdatedAt() == null : this.getUpdatedAt().equals(other.getUpdatedAt()))
            && (this.getCreatedAt() == null ? other.getCreatedAt() == null : this.getCreatedAt().equals(other.getCreatedAt()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getReleaseId() == null) ? 0 : getReleaseId().hashCode());
        result = prime * result + ((getLibId() == null) ? 0 : getLibId().hashCode());
        result = prime * result + ((getReactUrl() == null) ? 0 : getReactUrl().hashCode());
        result = prime * result + ((getCssUrl() == null) ? 0 : getCssUrl().hashCode());
        result = prime * result + ((getConfigUrl() == null) ? 0 : getConfigUrl().hashCode());
        result = prime * result + ((getReleaseHash() == null) ? 0 : getReleaseHash().hashCode());
        result = prime * result + ((getUserId() == null) ? 0 : getUserId().hashCode());
        result = prime * result + ((getUserName() == null) ? 0 : getUserName().hashCode());
        result = prime * result + ((getCount() == null) ? 0 : getCount().hashCode());
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
        sb.append(", releaseId=").append(releaseId);
        sb.append(", libId=").append(libId);
        sb.append(", reactUrl=").append(reactUrl);
        sb.append(", cssUrl=").append(cssUrl);
        sb.append(", configUrl=").append(configUrl);
        sb.append(", releaseHash=").append(releaseHash);
        sb.append(", userId=").append(userId);
        sb.append(", userName=").append(userName);
        sb.append(", count=").append(count);
        sb.append(", updatedAt=").append(updatedAt);
        sb.append(", createdAt=").append(createdAt);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}