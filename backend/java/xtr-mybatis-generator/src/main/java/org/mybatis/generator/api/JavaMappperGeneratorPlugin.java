package org.mybatis.generator.api;

import com.xtr.comm.basic.BasicMapper;
import com.xtr.comm.util.DateUtil;
import com.xtr.jdbc.config.datasource.DataBaseType;
import com.xtr.jdbc.config.datasource.UseDataSource;
import org.apache.commons.lang3.StringUtils;
import org.mybatis.generator.api.dom.java.FullyQualifiedJavaType;
import org.mybatis.generator.api.dom.java.Interface;
import org.mybatis.generator.api.dom.java.JavaVisibility;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>类说明</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @createTime: 2018/5/7 13:55
 */
public class JavaMappperGeneratorPlugin extends AbstractGeneratorPlugin {


    @Override
    public List<GeneratedJavaFile> contextGenerateAdditionalJavaFiles(IntrospectedTable introspectedTable) {
        this.introspectedTable = introspectedTable;
        List<GeneratedJavaFile> list = new ArrayList<GeneratedJavaFile>();
        FullyQualifiedJavaType type = new FullyQualifiedJavaType(getFailName());
        //设置包路径
        type.setPackageName(properties.getProperty("targetPackage"));

        Interface interfaze = new Interface(type);
        interfaze.setVisibility(JavaVisibility.PUBLIC);
        interfaze.getFormattedContent();
        //添加属性配置
        addAttribute(interfaze);
        //添加类注释
        addModelClassComment(interfaze);
        //生成文件并添加到list中
        list.add(new GeneratedJavaFile(interfaze, properties.getProperty("targetProject"), getContext().getJavaFormatter()));
        return list;
    }

    /**
     * 添加对应的属性
     *
     * @param interfaze
     */
    private void addAttribute(Interface interfaze) {
        FullyQualifiedJavaType fullyQualifiedJavaType = new FullyQualifiedJavaType(BasicMapper.class.getName());
        fullyQualifiedJavaType.addTypeArgument(new FullyQualifiedJavaType(introspectedTable.getBaseRecordType()));
        interfaze.addImportedType(new FullyQualifiedJavaType(introspectedTable.getBaseRecordType()));
        interfaze.addSuperInterface(fullyQualifiedJavaType);
        interfaze.addImportedType(new FullyQualifiedJavaType(BasicMapper.class.getName()));
        if (StringUtils.equals(DataBaseType.OLD_DATA_SOURCE.getSchemaName(), this.introspectedTable.context.getTableConfigurations().get(0).getSchema())) {
            interfaze.addImportedType(new FullyQualifiedJavaType(DataBaseType.class.getName()));
            interfaze.addImportedType(new FullyQualifiedJavaType(UseDataSource.class.getName()));
        }
        if (StringUtils.equalsAny(this.introspectedTable.context.getTableConfigurations().get(0).getSchema(), DataBaseType.OLD_DATA_SOURCE.getSchemaName(), DataBaseType.SBT_DATA_SOURCE.getSchemaName())) {
            interfaze.addImportedType(new FullyQualifiedJavaType(DataBaseType.class.getName()));
            interfaze.addImportedType(new FullyQualifiedJavaType(UseDataSource.class.getName()));
        }
    }

    /**
     * 添加类注释
     *
     * @param interfaze
     */
    private void addModelClassComment(Interface interfaze) {
        interfaze.addJavaDocLine("/**");
        if (StringUtils.isNotBlank(introspectedTable.getRemarks())) {
            interfaze.addJavaDocLine(" * <p>" + introspectedTable.getRemarks() + "</p>");
        } else {
            interfaze.addJavaDocLine(" * <p>" + introspectedTable.getFullyQualifiedTable() + "</p>");
        }
        interfaze.addJavaDocLine(" *");
        interfaze.addJavaDocLine(" * @author " + getContext().getCommentGeneratorConfiguration().getProperty("author"));
        interfaze.addJavaDocLine(" * @create: " + DateUtil.getCurrDate(DateUtil.YYYY_MM_DD_HH_MM_SS));
        interfaze.addJavaDocLine(" */");
        if (StringUtils.equals(DataBaseType.OLD_DATA_SOURCE.getSchemaName(), this.introspectedTable.context.getTableConfigurations().get(0).getSchema())) {
            interfaze.addJavaDocLine("@UseDataSource(source = DataBaseType.OLD_DATA_SOURCE)");
        } else if (StringUtils.equals(DataBaseType.SBT_DATA_SOURCE.getSchemaName(), this.introspectedTable.context.getTableConfigurations().get(0).getSchema())) {
            interfaze.addJavaDocLine("@UseDataSource(source = DataBaseType.SBT_DATA_SOURCE)");
        }
    }
}
