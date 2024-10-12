package com.xintr.lowcode.mapper.sys;

import com.xintr.lowcode.api.basic.BasicMapper;
import com.xintr.lowcode.api.domain.Users;

import java.util.List;

/**
 * <p>users</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @create: 2024-09-27 10:19:47
 */
public interface UsersMapper extends BasicMapper<Users> {

    /**
     * 查询用户列表
     *
     * @param users
     * @return
     */
    List<Users> dataList(Users users);
}
