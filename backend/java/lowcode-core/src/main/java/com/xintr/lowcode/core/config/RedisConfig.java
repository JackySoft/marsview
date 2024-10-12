package com.xintr.lowcode.core.config;

import jakarta.annotation.Resource;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;

/**
 * <p>说明</p>
 *
 * @author 张峰 zfvip_it@163.com
 * createTime: 2020/10/12 下午2:26
 */
@Configuration
public class RedisConfig {

    @Resource
    private RedisConnectionFactory factory;

    @Bean
    @ConditionalOnMissingBean(name = "redisTemplate")
    public RedisTemplate<Object, Object> redisTemplate() {
        RedisTemplate<Object, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);
        GenericJackson2JsonRedisSerializer serializer = new GenericJackson2JsonRedisSerializer();
        template.setKeySerializer(serializer);
        template.setValueSerializer(serializer);
        template.setDefaultSerializer(serializer);
        return template;
    }
}
