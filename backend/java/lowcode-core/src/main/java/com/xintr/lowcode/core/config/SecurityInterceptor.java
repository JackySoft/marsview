package com.xintr.lowcode.core.config;

import com.xintr.lowcode.core.basic.Builder;
import com.xintr.lowcode.core.basic.ResultResponse;
import com.xintr.lowcode.core.util.HtmlUtil;
import com.xintr.lowcode.core.util.SessionUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

/**
 * <p>类说明</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @create: 2018－08－28 下午7:45
 */
@Component
@EnableAutoConfiguration(exclude = {org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class})
public class SecurityInterceptor implements HandlerInterceptor {

    private static final Logger LOGGER = LogManager.getLogger(SecurityInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Object user = SessionUtils.getUser(request);
        if (user == null) {
            HtmlUtil.writerJson(response, Builder.of(ResultResponse::new)
                    .with(ResultResponse::setCode, 10018)
                    .with(ResultResponse::setMessage, "登录已过期，请重新登录").build());
        }
        return user != null;
    }
}
