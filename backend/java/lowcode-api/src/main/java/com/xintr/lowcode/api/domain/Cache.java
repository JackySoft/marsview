package com.xintr.lowcode.api.domain;

import com.xintr.lowcode.api.basic.BaseObject;

import javax.persistence.Id;
import java.io.Serializable;
import java.util.Date;

/**
 * <p>cache</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @create: 2024-09-27 09:59:58
 */
public class Cache extends BaseObject implements Serializable {
    /**
     * id
     */
    @Id
    private Long id;

    /**
     * 更新时间
     */
    private Date updatedAt;

    /**
     * 创建时间
     */
    private Date createdAt;

    /**
     * id
     *
     * @return cache.id, id
     */
    public Long getId() {
        return id;
    }

    /**
     * id
     *
     * @param id cache.id, id
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * 更新时间
     *
     * @return cache.updated_at, 更新时间
     */
    public Date getUpdatedAt() {
        return updatedAt;
    }

    /**
     * 更新时间
     *
     * @param updatedAt cache.updated_at, 更新时间
     */
    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    /**
     * 创建时间
     *
     * @return cache.created_at, 创建时间
     */
    public Date getCreatedAt() {
        return createdAt;
    }

    /**
     * 创建时间
     *
     * @param createdAt cache.created_at, 创建时间
     */
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}