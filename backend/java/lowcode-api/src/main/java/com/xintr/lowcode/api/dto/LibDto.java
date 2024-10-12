package com.xintr.lowcode.api.dto;

import com.xintr.lowcode.api.domain.Lib;

/**
 * <p>说明</p>
 *
 * @author 张峰 zfvip_it@163.com
 * createTime: 2024/10/1 13:58
 */
public class LibDto extends Lib {

    /**
     * 1、我的，2、市场
     */
    private int type;

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }
}
