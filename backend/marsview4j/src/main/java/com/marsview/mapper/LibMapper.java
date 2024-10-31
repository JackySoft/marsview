package com.marsview.mapper;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.marsview.domain.Lib;
import com.marsview.dto.LibDto;

import java.util.List;

/**
 * <p>lib</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @create: 2024-09-27 10:02:11
 */
public interface LibMapper extends BaseMapper<Lib> {

    /**
     * 分页查询组件库
     *
     * @param dto
     * @return
     */
    List<Lib> dataList(LibDto dto);
}
