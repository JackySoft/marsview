package com.xintr.lowcode.api.domain;

import java.io.Serializable;

/**
 * <p>lib</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @create: 2024-09-27 10:02:11
 */
public class LibWithBLOBs extends Lib implements Serializable {
    /**
     * 组件源码
     */
    private String react_code;

    /**
     * 组件样式
     */
    private String less_code;

    /**
     * 组件配置
     */
    private String config_code;

    /**
     * markdown内容
     */
    private String md_code;

    public String getReact_code() {
        return react_code;
    }

    public void setReact_code(String react_code) {
        this.react_code = react_code;
    }

    public String getLess_code() {
        return less_code;
    }

    public void setLess_code(String less_code) {
        this.less_code = less_code;
    }

    public String getConfig_code() {
        return config_code;
    }

    public void setConfig_code(String config_code) {
        this.config_code = config_code;
    }

    public String getMd_code() {
        return md_code;
    }

    public void setMd_code(String md_code) {
        this.md_code = md_code;
    }
}
