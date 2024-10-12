package com.xintr.lowcode.core.basic;

import java.io.Serializable;

/**
 * <p>类说明</p>
 *
 * @author 张峰 zfvip_it@163.com
 * createTime: 2018-11-29 10:52
 */
public class ResultResponse<T> implements Serializable {

    private int code;
    private T data;
    private String message;

    public ResultResponse() {

    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
