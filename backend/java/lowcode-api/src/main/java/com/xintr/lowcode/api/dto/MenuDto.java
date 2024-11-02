package com.xintr.lowcode.api.dto;

import com.xintr.lowcode.api.domain.Menu;

/**
 * <p>说明</p>
 *
 * @author 张峰 zfvip_it@163.com
 * createTime: 2024/9/29 10:28
 */
public class MenuDto extends Menu {

  /**
   * 是否创建页面
   */
  private String is_create;

  public String getIs_create() {
    return is_create;
  }

  public void setIs_create(String is_create) {
    this.is_create = is_create;
  }
}
