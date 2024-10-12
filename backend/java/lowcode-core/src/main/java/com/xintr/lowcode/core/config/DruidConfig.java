package com.xintr.lowcode.core.config;

import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.support.jakarta.WebStatFilter;
import com.github.pagehelper.PageHelper;
import jakarta.annotation.Resource;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.transaction.SpringManagedTransactionFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import tk.mybatis.spring.annotation.MapperScan;

import javax.sql.DataSource;
import java.sql.SQLException;
import java.util.Properties;

/**
 * <p>类说明</p>
 *
 * @author 张峰 zfvip_it@163.com
 * createTime: 2018-12-06 14:51
 */
@Configuration
@EnableTransactionManagement
@MapperScan(basePackages = DruidConfig.PACKAGE)
public class DruidConfig {

    static final String PACKAGE = "com.**.mapper";

    @Resource
    private Environment environment;

    @Bean(name = "dataSource")
    @Primary
    public DruidDataSource dataSource() {
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setDriverClassName(environment.getProperty("mybatis.jdbc.driverClassName"));
        dataSource.setUrl(environment.getProperty("mybatis.jdbc.url"));
        dataSource.setUsername(environment.getProperty("mybatis.jdbc.username"));
        dataSource.setPassword(environment.getProperty("mybatis.jdbc.password"));
        //打开PSCache，并且指定每个连接上PSCache的大小
        dataSource.setPoolPreparedStatements(false);
        //初始大小
        dataSource.setInitialSize(5);
        //最大连接池数量
        dataSource.setMaxActive(30);
        //最小连接池数量
        dataSource.setMinIdle(5);
        //获取连接等待超时的时间
        dataSource.setMaxWait(60000);
        //间隔多久才进行一次检测，检测需要关闭的空闲连接，单位是毫秒
        dataSource.setTimeBetweenEvictionRunsMillis(60000);
        //配置一个连接在池中最小生存的时间，单位是毫秒
        dataSource.setMinEvictableIdleTimeMillis(600000);
        //超过时间限制是否回收
        dataSource.setRemoveAbandoned(true);
//            //超时时间；单位为秒。180秒=3分钟
//            dataSource.setRemoveAbandonedTimeout(180);
//            dataSource.setLogAbandoned(true);
        //建议配置为true，不影响性能，并且保证安全性。申请连接的时候检测，如果空闲时间大于timeBetweenEvictionRunsMillis，执行validationQuery检测连接是否有效。
        dataSource.setTestWhileIdle(true);
        //用来检测连接是否有效的sql，要求是一个查询语句。如果validationQuery为null，testOnBorrow、testOnReturn、testWhileIdle都不会其作用。
        dataSource.setValidationQuery("SELECT 1");
        //测试有效的超时时间
//            dataSource.setValidationQueryTimeout(30);
        //从池中取出连接前进行检验
//            dataSource.setTestOnBorrow(true);
        dataSource.setConnectTimeout(10000);
        dataSource.setSocketTimeout(87000);
        //配置监控统计拦截的filters，去掉后监控界面sql无法统计
        try {
            dataSource.setFilters("log4j2");
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        Properties properties = new Properties();
//        properties.setProperty("config.decrypt", "true");
        properties.setProperty("log4j2.enabled", "true");
        dataSource.setConnectProperties(properties);
        return dataSource;
    }

    /**
     * 注册一个：filterRegistrationBean
     *
     * @return
     */
    @Bean
    public FilterRegistrationBean druidStatFilter() {

        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean(new WebStatFilter());

        //添加过滤规则.
        filterRegistrationBean.addUrlPatterns("/*");
        //添加不需要忽略的格式信息.
        filterRegistrationBean.addInitParameter("exclusions", "*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*");
        return filterRegistrationBean;
    }

    /**
     * 分页配置
     *
     * @return
     */
    @Bean
    public PageHelper pageHelper() {
        PageHelper pageHelper = new PageHelper();
        Properties p = new Properties();
        p.setProperty("offsetAsPageNum", "true");
        p.setProperty("rowBoundsWithCount", "false");
        p.setProperty("reasonable", "true");
        pageHelper.setProperties(p);
        return pageHelper;
    }

    /**
     * 事务管理器
     *
     * @param dataSource
     * @return
     */
    @Bean(name = "transactionManager")
    public DataSourceTransactionManager transactionManager(DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }

    /**
     * 配置sqlSessionFactory
     *
     * @return SqlSessionFactory对象
     * @throws Exception
     */
    @Bean(name = "sqlSessionFactory")
    public SqlSessionFactory sqlSessionFactorys(@Qualifier("dataSource") DataSource dataSource) throws Exception {
        SqlSessionFactoryBean sessionFactoryBean = new SqlSessionFactoryBean();
        sessionFactoryBean.setDataSource(dataSource);
        sessionFactoryBean.setTransactionFactory(new SpringManagedTransactionFactory());
        // 读取配置
        sessionFactoryBean.setTypeAliasesPackage("com.**.mapper");

        //设置mapper.xml文件所在位置
        org.springframework.core.io.Resource[] resources = new PathMatchingResourcePatternResolver().getResources("classpath:com/**/mapper/**/*.xml");
        sessionFactoryBean.setMapperLocations(resources);
        return sessionFactoryBean.getObject();
    }
}
