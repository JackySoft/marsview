package com.xintr.lowcode.api.basic;

import tk.mybatis.mapper.common.Mapper;
import tk.mybatis.mapper.common.MySqlMapper;

/**
 * <p>继承自己的MyMapper</p>
 *
 * @author 张峰 zfvip_it@163.com
 * createTime: 2018/5/7 14:03
 */
public interface BasicMapper<T> extends Mapper<T>, MySqlMapper<T> {
    //FIXME 特别注意，该接口不能被扫描到，否则会出错
}
