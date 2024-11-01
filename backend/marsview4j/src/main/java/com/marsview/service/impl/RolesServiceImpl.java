package com.marsview.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.marsview.domain.Roles;
import com.marsview.service.RolesService;
import com.marsview.mapper.RolesMapper;
import org.springframework.stereotype.Service;

/**
* @author yangshare
* @description 针对表【roles(页面权限列表)】的数据库操作Service实现
* @createDate 2024-11-01 10:35:15
*/
@Service
public class RolesServiceImpl extends ServiceImpl<RolesMapper, Roles>
    implements RolesService{

}




