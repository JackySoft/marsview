package com.marsview.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.marsview.domain.Users;
import com.marsview.service.UsersService;
import com.marsview.mapper.UsersMapper;
import org.springframework.stereotype.Service;

/**
* @author yangshare
* @description 针对表【users(用户列表)】的数据库操作Service实现
* @createDate 2024-11-01 10:35:15
*/
@Service
public class UsersServiceImpl extends ServiceImpl<UsersMapper, Users>
    implements UsersService{

}




