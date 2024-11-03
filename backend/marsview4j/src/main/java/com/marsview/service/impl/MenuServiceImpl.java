package com.marsview.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.marsview.domain.Menu;
import com.marsview.service.MenuService;
import com.marsview.mapper.MenuMapper;
import org.springframework.stereotype.Service;

/**
* @author yangshare
* @description 针对表【menu(菜单列表)】的数据库操作Service实现
* @createDate 2024-11-01 10:35:15
*/
@Service
public class MenuServiceImpl extends ServiceImpl<MenuMapper, Menu>
    implements MenuService{

}




