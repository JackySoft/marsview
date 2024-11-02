package com.xintr.lowcode.api.domain;

import com.xintr.lowcode.api.basic.BaseObject;

import javax.persistence.Id;
import java.io.Serializable;
import java.util.Date;

/**
 * <p>pages</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @create: 2024-09-27 17:24:28
 */
public class Pages extends BaseObject implements Serializable {
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
   * 用户ID
   */
  private Long user_id;

  /**
   * 用户名
   */
  private String user_name;

  /**
   * 页面描述
   */
  private String remark;

  /**
   * 是否开放 1-公开 2-私有
   */
  private String is_public;

  /**
   * 是否可编辑 1-编辑 2-只读
   */
  private String is_edit;

  /**
   * 页面预览图
   */
  private String preview_img;

  /**
   * stg 页面发布ID
   */
  private Long stg_publish_id;

  /**
   * pre 页面发布ID
   */
  private Long pre_publish_id;

  /**
   * prd 页面发布ID
   */
  private Long prd_publish_id;

  /**
   * 发布状态：1未保存 2已保存 3已发布
   */
  private Integer stg_state;

  /**
   * 发布状态：1未保存 2已保存 3已发布
   */
  private Integer pre_state;

  /**
   * 发布状态：1未保存 2已保存 3已发布
   */
  private Integer prd_state;

  /**
   * 更新时间
   */
  private Date updated_at;

  /**
   * 创建时间
   */
  private Date created_at;

  /**
   * 页面数据
   */
  private String page_data;

  /**
   * 项目id
   */
  private Long project_id;

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

  public String getRemark() {
    return remark;
  }

  public void setRemark(String remark) {
    this.remark = remark;
  }

  public String getIs_public() {
    return is_public;
  }

  public void setIs_public(String is_public) {
    this.is_public = is_public;
  }

  public String getIs_edit() {
    return is_edit;
  }

  public void setIs_edit(String is_edit) {
    this.is_edit = is_edit;
  }

  public String getPreview_img() {
    return preview_img;
  }

  public void setPreview_img(String preview_img) {
    this.preview_img = preview_img;
  }

  public Long getStg_publish_id() {
    return stg_publish_id;
  }

  public void setStg_publish_id(Long stg_publish_id) {
    this.stg_publish_id = stg_publish_id;
  }

  public Long getPre_publish_id() {
    return pre_publish_id;
  }

  public void setPre_publish_id(Long pre_publish_id) {
    this.pre_publish_id = pre_publish_id;
  }

  public Long getPrd_publish_id() {
    return prd_publish_id;
  }

  public void setPrd_publish_id(Long prd_publish_id) {
    this.prd_publish_id = prd_publish_id;
  }

  public Integer getStg_state() {
    return stg_state;
  }

  public void setStg_state(Integer stg_state) {
    this.stg_state = stg_state;
  }

  public Integer getPre_state() {
    return pre_state;
  }

  public void setPre_state(Integer pre_state) {
    this.pre_state = pre_state;
  }

  public Integer getPrd_state() {
    return prd_state;
  }

  public void setPrd_state(Integer prd_state) {
    this.prd_state = prd_state;
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

  public String getPage_data() {
    return page_data;
  }

  public void setPage_data(String page_data) {
    this.page_data = page_data;
  }

  public Long getProject_id() {
    return project_id;
  }

  public void setProject_id(Long project_id) {
    this.project_id = project_id;
  }
}
