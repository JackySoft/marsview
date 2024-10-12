package com.xintr.lowcode.mapper.sys;

import com.xintr.lowcode.api.basic.BasicMapper;
import com.xintr.lowcode.api.domain.Projects;
import com.xintr.lowcode.api.dto.ProjectsDto;

import java.util.List;

/**
 * <p>projects</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @create: 2024-09-27 10:19:24
 */
public interface ProjectsMapper extends BasicMapper<Projects> {

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
