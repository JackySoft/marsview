package com.marsview.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.marsview.mapper.basic.BasicMapper;
import com.marsview.domain.Pages;
import com.marsview.dto.PagesDto;

import java.util.List;

/**
 * <p>pages</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @create: 2024-09-27 17:24:28
 */
public interface PagesMapper extends BaseMapper<Pages> {
    /**
     * 获取页面列表
     *
     * @param dto
     * @return
     */
    List<PagesDto> dataList(PagesDto dto);

    /**
     * 获取页面详情
     *
     * @param dto
     * @return
     */
    PagesDto getPageDetail(PagesDto dto);
}
