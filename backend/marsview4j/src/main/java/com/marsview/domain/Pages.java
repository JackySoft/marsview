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
 * @TableName pages
 */
@TableName(value ="pages")
@Data
public class Pages implements Serializable {
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
     * 用户ID
     */
    private Integer userId;

    /**
     * 用户名
     */
    private String userName;

    /**
     * 页面数据
     */
    private String pageData;

    /**
     * 页面描述
     */
    private String remark;

    /**
     * 是否开放 1-公开 2-私有
     */
    private Integer isPublic;

    /**
     * 是否可编辑 1-编辑 2-只读
     */
    private Integer isEdit;

    /**
     * 页面预览图
     */
    private String previewImg;

    /**
     * stg 页面发布ID
     */
    private Long stgPublishId;

    /**
     * pre 页面发布ID
     */
    private Long prePublishId;

    /**
     * prd 页面发布ID
     */
    private Long prdPublishId;

    /**
     * 发布状态：1未保存 2已保存 3已发布
     */
    private Integer stgState;

    /**
     * 发布状态：1未保存 2已保存 3已发布
     */
    private Integer preState;

    /**
     * 发布状态：1未保存 2已保存 3已发布
     */
    private Integer prdState;

    /**
     * 更新时间
     */
    private Date updatedAt;

    /**
     * 创建时间
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
        Pages other = (Pages) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getName() == null ? other.getName() == null : this.getName().equals(other.getName()))
            && (this.getUserId() == null ? other.getUserId() == null : this.getUserId().equals(other.getUserId()))
            && (this.getUserName() == null ? other.getUserName() == null : this.getUserName().equals(other.getUserName()))
            && (this.getPageData() == null ? other.getPageData() == null : this.getPageData().equals(other.getPageData()))
            && (this.getRemark() == null ? other.getRemark() == null : this.getRemark().equals(other.getRemark()))
            && (this.getIsPublic() == null ? other.getIsPublic() == null : this.getIsPublic().equals(other.getIsPublic()))
            && (this.getIsEdit() == null ? other.getIsEdit() == null : this.getIsEdit().equals(other.getIsEdit()))
            && (this.getPreviewImg() == null ? other.getPreviewImg() == null : this.getPreviewImg().equals(other.getPreviewImg()))
            && (this.getStgPublishId() == null ? other.getStgPublishId() == null : this.getStgPublishId().equals(other.getStgPublishId()))
            && (this.getPrePublishId() == null ? other.getPrePublishId() == null : this.getPrePublishId().equals(other.getPrePublishId()))
            && (this.getPrdPublishId() == null ? other.getPrdPublishId() == null : this.getPrdPublishId().equals(other.getPrdPublishId()))
            && (this.getStgState() == null ? other.getStgState() == null : this.getStgState().equals(other.getStgState()))
            && (this.getPreState() == null ? other.getPreState() == null : this.getPreState().equals(other.getPreState()))
            && (this.getPrdState() == null ? other.getPrdState() == null : this.getPrdState().equals(other.getPrdState()))
            && (this.getUpdatedAt() == null ? other.getUpdatedAt() == null : this.getUpdatedAt().equals(other.getUpdatedAt()))
            && (this.getCreatedAt() == null ? other.getCreatedAt() == null : this.getCreatedAt().equals(other.getCreatedAt()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getName() == null) ? 0 : getName().hashCode());
        result = prime * result + ((getUserId() == null) ? 0 : getUserId().hashCode());
        result = prime * result + ((getUserName() == null) ? 0 : getUserName().hashCode());
        result = prime * result + ((getPageData() == null) ? 0 : getPageData().hashCode());
        result = prime * result + ((getRemark() == null) ? 0 : getRemark().hashCode());
        result = prime * result + ((getIsPublic() == null) ? 0 : getIsPublic().hashCode());
        result = prime * result + ((getIsEdit() == null) ? 0 : getIsEdit().hashCode());
        result = prime * result + ((getPreviewImg() == null) ? 0 : getPreviewImg().hashCode());
        result = prime * result + ((getStgPublishId() == null) ? 0 : getStgPublishId().hashCode());
        result = prime * result + ((getPrePublishId() == null) ? 0 : getPrePublishId().hashCode());
        result = prime * result + ((getPrdPublishId() == null) ? 0 : getPrdPublishId().hashCode());
        result = prime * result + ((getStgState() == null) ? 0 : getStgState().hashCode());
        result = prime * result + ((getPreState() == null) ? 0 : getPreState().hashCode());
        result = prime * result + ((getPrdState() == null) ? 0 : getPrdState().hashCode());
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
        sb.append(", name=").append(name);
        sb.append(", userId=").append(userId);
        sb.append(", userName=").append(userName);
        sb.append(", pageData=").append(pageData);
        sb.append(", remark=").append(remark);
        sb.append(", isPublic=").append(isPublic);
        sb.append(", isEdit=").append(isEdit);
        sb.append(", previewImg=").append(previewImg);
        sb.append(", stgPublishId=").append(stgPublishId);
        sb.append(", prePublishId=").append(prePublishId);
        sb.append(", prdPublishId=").append(prdPublishId);
        sb.append(", stgState=").append(stgState);
        sb.append(", preState=").append(preState);
        sb.append(", prdState=").append(prdState);
        sb.append(", updatedAt=").append(updatedAt);
        sb.append(", createdAt=").append(createdAt);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}