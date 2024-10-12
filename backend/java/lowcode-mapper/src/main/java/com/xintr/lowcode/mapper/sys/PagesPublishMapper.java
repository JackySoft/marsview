package com.xintr.lowcode.mapper.sys;

import com.xintr.lowcode.api.basic.BasicMapper;
import com.xintr.lowcode.api.domain.PagesPublish;

import java.util.List;

/**
 * <p>pages_publish</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @create: 2024-09-27 10:18:29
 */
public interface PagesPublishMapper extends BasicMapper<PagesPublish> {

    /**
     * 分页查询
     *
     * @param publish
     * @return
     */
    List<PagesPublish> dataList(PagesPublish publish);
}
