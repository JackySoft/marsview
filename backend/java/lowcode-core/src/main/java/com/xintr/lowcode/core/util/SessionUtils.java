package com.xintr.lowcode.core.util;

import jakarta.servlet.http.HttpServletRequest;

/**
 * <p>类说明</p>
 *
 * @author 张峰 zfvip_it@163.com
 * createTime: 2018-11-29 12:34
 */
public class SessionUtils {
    public static final String SESSION_USER = "session_user";

    /**
     * 从session中获取用户信息
     *
     * @param request
     * @return SysUser
     */
    public static <T> T getUser(HttpServletRequest request) {
        return (T) request.getSession(true).getAttribute(SESSION_USER);
    }

    /**
     * 设置用户信息 到session
     *
     * @param request
     */
    public static <T> void setUser(HttpServletRequest request, T t) {
        request.getSession(true).setAttribute(SESSION_USER, t);
    }
}
