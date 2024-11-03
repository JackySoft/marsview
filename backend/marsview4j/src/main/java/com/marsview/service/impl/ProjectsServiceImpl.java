package com.marsview.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.marsview.domain.Projects;
import com.marsview.mapper.ProjectsMapper;
import com.marsview.service.ProjectsService;
import org.springframework.stereotype.Service;

/**
 * @author yangshare
 * @description 针对表【projects(项目列表)】的数据库操作Service实现
 * @createDate 2024-11-01 10:35:15
 */
@Service
public class ProjectsServiceImpl extends ServiceImpl<ProjectsMapper, Projects>
  implements ProjectsService {

}




