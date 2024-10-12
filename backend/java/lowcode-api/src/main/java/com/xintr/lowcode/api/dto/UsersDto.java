package com.xintr.lowcode.api.dto;

import com.xintr.lowcode.api.domain.Users;

/**
 * <p>说明</p>
 *
 * @author 张峰 zfvip_it@163.com
 * createTime: 2024/9/29 07:48
 */
public class UsersDto extends Users {

    /**
     * 用户名
     */
    private String userName;

    /**
     * 密码
     */
    private String userPwd;

    /**
     * 邮箱地址
     */
    private String email;

    /**
     * 验证码
     */
    private String code;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserPwd() {
        return userPwd;
    }

    public void setUserPwd(String userPwd) {
        this.userPwd = userPwd;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
