package com.marsview.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.marsview.mapper.basic.BasicMapper;
import com.marsview.domain.PagesPublish;

import java.util.List;

/**
 * <p>pages_publish</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @create: 2024-09-27 10:18:29
 */
public interface PagesPublishMapper extends BaseMapper<PagesPublish> {

    /**
     * 分页查询
     *
     * @param publish
     * @return
     */
    List<PagesPublish> dataList(PagesPublish publish);
}
