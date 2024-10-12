package com.xintr.lowcode.core.config;

import com.github.pagehelper.PageHelper;
import com.xintr.lowcode.api.basic.BaseObject;

import java.lang.reflect.Proxy;
import java.util.HashMap;
import java.util.Map;

/**
 * <p>类说明</p>
 *
 * @author 张峰 zfvip_it@163.com
 * createTime: 2019/11/14 下午1:28
 */
public class MapperProxy {

    protected static Map<Object, Object> pageMapperCacheMap = new HashMap();
    protected static Map<Object, Object> mapperCacheMap = new HashMap();

    public static <T> T getMapperProxy(T t) {
        if (!mapperCacheMap.containsKey(t)) {
            mapperCacheMap.put(t, Proxy.newProxyInstance(t.getClass().getClassLoader(), t.getClass().getInterfaces(), (proxy, method, args) -> method.invoke(t, args)));
        }
        return (T) pageMapperCacheMap.get(t);
    }

    public static <T> T getPageMapperProxy(T t) {
        if (!pageMapperCacheMap.containsKey(t)) {
            pageMapperCacheMap.put(t, Proxy.newProxyInstance(t.getClass().getClassLoader(), t.getClass().getInterfaces(), (proxy, method, args) -> {
                int index = ((BaseObject) args[0]).getPageIndex() == 0 ? 1 : ((BaseObject) args[0]).getPageIndex();
                PageHelper.startPage(index, ((BaseObject) args[0]).getPageSize());
                return method.invoke(t, args);
            }));
        }
        return (T) pageMapperCacheMap.get(t);
    }
}
