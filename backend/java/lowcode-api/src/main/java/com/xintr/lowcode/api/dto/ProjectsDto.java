package com.xintr.lowcode.api.dto;

import com.xintr.lowcode.api.domain.Projects;

/**
 * <p>类说明</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @createTime: 2024/9/27 16:23
 */
public class ProjectsDto extends Projects {

    /**
     * 是否可以编辑
     */
    private Boolean is_edit;

    /**
     * 1、我的 2、市场
     */
    private Integer type;

    public Boolean getIs_edit() {
        return is_edit;
    }

    public void setIs_edit(Boolean is_edit) {
        this.is_edit = is_edit;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }
}
