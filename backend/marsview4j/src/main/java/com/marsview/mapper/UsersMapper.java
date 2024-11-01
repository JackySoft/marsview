package com.marsview.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.marsview.domain.Users;

import java.util.List;

/**
* @author yangshare
* @description 针对表【users(用户列表)】的数据库操作Mapper
* @createDate 2024-11-01 10:35:15
* @Entity com.marsview.domain.Users
*/
public interface UsersMapper extends BaseMapper<Users> {
  List<Users> selectList();
}




