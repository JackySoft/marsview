package com.xintr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * <p>类说明</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @createTime: 2024/9/26 16:49
 */
@SpringBootApplication
public class LowcodeApplication {

    public static void main(String[] args) {
        SpringApplication.run(LowcodeApplication.class, args);
        System.out.println("lowcode服务启动成功 ...");
    }
}
