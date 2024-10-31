package org.mybatis.generator.api;


import io.micrometer.common.util.StringUtils;

import java.util.List;

import static org.mybatis.generator.internal.util.StringUtility.stringHasValue;
import static org.mybatis.generator.internal.util.messages.Messages.getString;

/**
 * <p>类说明</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @createTime: 2019-03-08 16:58
 */
public abstract class AbstractGeneratorPlugin extends PluginAdapter {

  protected IntrospectedTable introspectedTable;


  @Override
  public boolean validate(List<String> warnings) {
    boolean valid = true;

    if (!stringHasValue(properties
      .getProperty("targetProject"))) {
      warnings.add(getString("ValidationError.18",
        "MapperConfigPlugin",
        "targetProject"));
      valid = false;
    }

    if (!stringHasValue(properties
      .getProperty("targetPackage"))) {
      warnings.add(getString("ValidationError.18",
        "MapperConfigPlugin",
        "targetPackage"));
      valid = false;
    }

    return valid;
  }

  /**
   * 获取文件名
   *
   * @return
   */
  protected String getFailName() {
    String keyword = properties.getProperty("keyword");
    if (StringUtils.isNotEmpty(keyword) && keyword.length() > 1) {
      keyword = keyword.substring(0, 1).toUpperCase() + keyword.substring(1);
    } else {
      keyword = "";
    }
    return introspectedTable.getFullyQualifiedTable().getDomainObjectName() + keyword + "Mapper";
  }
}
