package com.xintr.lowcode.core.config;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import jakarta.annotation.Resource;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.text.SimpleDateFormat;
import java.util.List;

/**
 * <p>@Configuration</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @create: 2018－08－28 下午7:56
 */
@Component
public class MvcConfig implements WebMvcConfigurer {

    private static boolean isInit = true;

    @Resource
    private SecurityInterceptor securityInterceptor;

    private static final String[] CLASSPATH_RESOURCE_LOCATIONS = {"classpath:/META-INF/resources/", "classpath:/resources/", "classpath:/static/", "classpath:/public/"};

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        if (!registry.hasMappingForPattern("/**")) {
            registry.addResourceHandler("/**").addResourceLocations(CLASSPATH_RESOURCE_LOCATIONS);
        }

    }

    /**
     * 添加拦截器配置
     *
     * @param registry
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        if (MvcConfig.isInit) {
            MvcConfig.isInit = false;
            registry.addInterceptor(securityInterceptor)
                    //添加拦截规则
                    .addPathPatterns("/**/api/**")
                    //排除拦截
                    .excludePathPatterns(getExcludedUrls());
        }
    }

    /**
     * 添加排除拦截
     *
     * @return
     */
    public String[] getExcludedUrls() {
        return new String[]{"/**/regist", "/**/login", "/**/sendEmail"};
    }

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        // 将定义的时间格式转换器添加到转换器列表中,这样jackson格式化时候但凡遇到Date类型就会转换成定义的格式
        converters.add(jackson2HttpMessageConverter());
        // 添加字符串序列化器
        converters.add(new StringHttpMessageConverter());
    }

    public MappingJackson2HttpMessageConverter jackson2HttpMessageConverter() {
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
        ObjectMapper mapper = new ObjectMapper();
        // 包含空字段
        // mapper.setSerializationInclusion(JsonInclude.Include.ALWAYS);
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        // 输出时间格式
        mapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
        // 输出Long格式为String
        SimpleModule simpleModule = new SimpleModule();
        simpleModule.addSerializer(Long.class, ToStringSerializer.instance);
        simpleModule.addSerializer(Long.TYPE, ToStringSerializer.instance);
        mapper.registerModule(simpleModule);
        converter.setObjectMapper(mapper);
        // converter.setSupportedMediaTypes(getSupportedMediaTypes());
        return converter;
    }
}
