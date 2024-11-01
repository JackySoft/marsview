package com.marsview;

import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.Environment;
import org.springframework.util.StringUtils;

import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * <p>类说明</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @createTime: 2024/9/26 16:49
 */
@SpringBootApplication
@MapperScan("com.marsview.mapper")
@Slf4j
public class MarsViewApplication {

  public static void main(String[] args) throws UnknownHostException {
    ConfigurableApplicationContext application = SpringApplication.run(MarsViewApplication.class, args);
    Environment env = application.getEnvironment();
    String ip = InetAddress.getLocalHost().getHostAddress();
    String port = env.getProperty("server.port");
    String path = env.getProperty("server.servlet.context-path");
    if (StringUtils.isEmpty(path)) {
      path = "";
    }
    log.info("\n----------------------------------------------------------\n\t" +
      "Application  is running! 官网URL: http://docs.marsview.cc/\n\t" +
      "Local访问网址: \t\thttp://localhost:" + port + path + "\n\t" +
      "External访问网址: \thttp://" + ip + ":" + port + path + "\n\t" +
      "----------------------------------------------------------");
  }
}
