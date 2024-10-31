package com.marsview.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.marsview.mapper.basic.BasicMapper;
import com.marsview.domain.Users;

import java.util.List;

/**
 * <p>users</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @create: 2024-09-27 10:19:47
 */
public interface UsersMapper extends BaseMapper<Users> {

    /**
     * 查询用户列表
     *
     * @param users
     * @return
     */
    List<Users> dataList(Users users);
}
