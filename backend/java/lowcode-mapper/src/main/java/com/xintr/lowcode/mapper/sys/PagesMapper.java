package com.xintr.lowcode.mapper.sys;

import com.xintr.lowcode.api.basic.BasicMapper;
import com.xintr.lowcode.api.domain.Pages;
import com.xintr.lowcode.api.dto.PagesDto;

import java.util.List;

/**
 * <p>pages</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @create: 2024-09-27 17:24:28
 */
public interface PagesMapper extends BasicMapper<Pages> {
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
