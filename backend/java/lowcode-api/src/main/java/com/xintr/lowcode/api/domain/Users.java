package com.xintr.lowcode.api.domain;

import com.xintr.lowcode.api.basic.BaseObject;
import jdk.jfr.DataAmount;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Id;
import java.io.Serializable;
import java.util.Date;

/**
 * <p>users</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @create: 2024-09-27 10:19:47
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Users extends BaseObject implements Serializable {
    /**
     * id
     */
    @Id
    private Long id;

    /**
     * 邮箱
     */
    private String user_name;

    /**
     * 密码
     */
    private String user_pwd;

    /**
     * 团队ID
     */
    private Integer team_id;

    /**
     * 更新时间
     */
    private Date updated_at;

    /**
     * 创建时间
     */
    private Date created_at;
}
