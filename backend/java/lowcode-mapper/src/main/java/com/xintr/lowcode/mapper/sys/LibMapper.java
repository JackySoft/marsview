package com.xintr.lowcode.mapper.sys;

import com.xintr.lowcode.api.basic.BasicMapper;
import com.xintr.lowcode.api.domain.Lib;
import com.xintr.lowcode.api.dto.LibDto;

import java.util.List;

/**
 * <p>lib</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @create: 2024-09-27 10:02:11
 */
public interface LibMapper extends BasicMapper<Lib> {

    /**
     * 分页查询组件库
     *
     * @param dto
     * @return
     */
    List<Lib> dataList(LibDto dto);
}
