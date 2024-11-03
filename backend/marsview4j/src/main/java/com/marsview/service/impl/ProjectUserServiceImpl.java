package com.marsview.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.marsview.domain.ProjectUser;
import com.marsview.service.ProjectUserService;
import com.marsview.mapper.ProjectUserMapper;
import org.springframework.stereotype.Service;

/**
* @author yangshare
* @description 针对表【project_user(用户列表)】的数据库操作Service实现
* @createDate 2024-11-01 10:35:15
*/
@Service
public class ProjectUserServiceImpl extends ServiceImpl<ProjectUserMapper, ProjectUser>
    implements ProjectUserService{

}




