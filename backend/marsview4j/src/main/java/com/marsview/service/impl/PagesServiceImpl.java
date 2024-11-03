package com.marsview.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.marsview.domain.Pages;
import com.marsview.service.PagesService;
import com.marsview.mapper.PagesMapper;
import org.springframework.stereotype.Service;

/**
* @author yangshare
* @description 针对表【pages(项目列表)】的数据库操作Service实现
* @createDate 2024-11-01 10:35:15
*/
@Service
public class PagesServiceImpl extends ServiceImpl<PagesMapper, Pages>
    implements PagesService{

}




