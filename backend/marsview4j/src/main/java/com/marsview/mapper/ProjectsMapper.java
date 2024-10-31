package com.marsview.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.marsview.domain.Projects;
import com.marsview.dto.ProjectsDto;
import com.marsview.mapper.basic.BasicMapper;

import java.util.List;

/**
 * <p>projects</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @create: 2024-09-27 10:19:24
 */
public interface ProjectsMapper extends BaseMapper<Projects> {

    /**
     * 分页查询项目信息
     *
     * @param projects
     * @return
     */
    List<ProjectsDto> dataList(ProjectsDto projects);

    /**
     * 分页查询项目信息
     *
     * @param projects
     * @return
     */
    List<ProjectsDto> projectList(ProjectsDto projects);
}
