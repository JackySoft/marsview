package com.xtr;

import org.mybatis.generator.api.MyBatisGenerator;
import org.mybatis.generator.api.VerboseProgressCallback;
import org.mybatis.generator.config.Configuration;
import org.mybatis.generator.config.xml.ConfigurationParser;
import org.mybatis.generator.internal.DefaultShellCallback;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 * <p>类说明</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @createTime: 2018/7/12 12:22
 */
public class MybatisGenerator {

  public static void main(String[] args) {
    try {
      List<String> warnings = new ArrayList<>();
      boolean overwrite = true;
      //这个路径要注意
      String path = "D:\\IdeaProjects\\xtr-mybatis-generator\\src\\main\\resources\\mybatis-generator.xml";
      System.out.println(path);
      File configFile = new File(path);
      ConfigurationParser cp = new ConfigurationParser(warnings);
      Configuration config = cp.parseConfiguration(configFile);
      DefaultShellCallback callback = new DefaultShellCallback(overwrite);
      MyBatisGenerator myBatisGenerator = new MyBatisGenerator(config, callback, warnings);
      myBatisGenerator.generate(new VerboseProgressCallback());
      warnings.forEach(System.out::println);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
