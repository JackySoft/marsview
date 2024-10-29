/******************************************/
/*   DatabaseName = mars   */
/*   TableName = firefly   */
/******************************************/
CREATE TABLE `firefly` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '增长ID',
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '名称',
  `type` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '种类',
  `avatar` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '头像',
  `time` smallint NOT NULL COMMENT '繁殖周期',
  `skill` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '技能',
  `sales` float NOT NULL COMMENT '售价',
  `area` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '分布区域',
  `status` tinyint(1) NOT NULL COMMENT '状态：1 在售 2 停售 3 下架',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间戳',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '时间戳',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=174 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC COMMENT='数据测试表'
;

/******************************************/
/*   DatabaseName = mars   */
/*   TableName = imgcloud   */
/******************************************/
CREATE TABLE `imgcloud` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `user_id` int NOT NULL COMMENT '用户ID',
  `user_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `origin_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文件原名称',
  `file_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文件hash名称',
  `type` varchar(30) NOT NULL COMMENT '文件类型',
  `size` int NOT NULL COMMENT '文件大小，单位byte',
  `url` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '图片cdn地址',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb3 COMMENT='图片云服务'
;

/******************************************/
/*   DatabaseName = mars   */
/*   TableName = lib   */
/******************************************/
CREATE TABLE `lib` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '组件ID',
  `tag` varchar(50) NOT NULL COMMENT '组件标识',
  `name` varchar(50) NOT NULL COMMENT '组件中文名称',
  `description` varchar(200) DEFAULT NULL COMMENT '组件描述',
  `react_code` text CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '组件源码',
  `less_code` text COMMENT '组件样式',
  `config_code` text COMMENT '组件配置',
  `md_code` text CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT 'markdown内容',
  `hash` varchar(100) DEFAULT NULL COMMENT '组件hash',
  `user_id` int NOT NULL COMMENT '通行证ID',
  `user_name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '通行证名称',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `ix_user_id` (`user_id`),
  KEY `ix_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=437 DEFAULT CHARSET=utf8mb3 COMMENT='自定义组件库表，用来满足自定义业务'
;

/******************************************/
/*   DatabaseName = mars   */
/*   TableName = lib_publish   */
/******************************************/
CREATE TABLE `lib_publish` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '索引',
  `release_id` varchar(100) NOT NULL COMMENT '发布ID',
  `lib_id` varchar(100) NOT NULL COMMENT '组件库关联ID',
  `react_url` varchar(100) NOT NULL COMMENT 'React远程地址',
  `css_url` varchar(100) DEFAULT NULL COMMENT 'css远程地址',
  `config_url` varchar(100) DEFAULT NULL COMMENT 'config远程地址',
  `release_hash` varchar(50) DEFAULT NULL COMMENT '版本hash',
  `user_id` int NOT NULL COMMENT '通行证ID',
  `user_name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '通行证名称',
  `count` int NOT NULL DEFAULT '0' COMMENT '记录更新次数',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `ix_release_id` (`release_id`),
  KEY `ix_lib_id` (`lib_id`),
  KEY `ix_updated_at` (`updated_at`),
  KEY `ix_created_at` (`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb3 COMMENT='组件库发布表'
;

/******************************************/
/*   DatabaseName = mars   */
/*   TableName = menu   */
/******************************************/
CREATE TABLE `menu` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '菜单ID',
  `project_id` bigint NOT NULL COMMENT '项目ID',
  `name` varchar(20) NOT NULL COMMENT '菜单名称',
  `parent_id` bigint DEFAULT NULL COMMENT '父级菜单ID',
  `type` int NOT NULL COMMENT '方法 1-菜单 2-按钮 3-页面',
  `icon` varchar(100) DEFAULT NULL COMMENT '菜单图标',
  `path` varchar(100) DEFAULT NULL COMMENT '路径',
  `page_id` bigint DEFAULT NULL COMMENT '页面ID',
  `sort_num` int NOT NULL COMMENT '排序',
  `status` int NOT NULL DEFAULT '1' COMMENT '状态 1-启用 0-禁用',
  `code` varchar(30) DEFAULT NULL COMMENT '按钮标识',
  `user_id` int NOT NULL COMMENT '通行证id',
  `user_name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '姓名',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_project_id` (`project_id`),
  KEY `idx_user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2873 DEFAULT CHARSET=utf8mb3 COMMENT='菜单列表'
;

/******************************************/
/*   DatabaseName = mars   */
/*   TableName = pages   */
/******************************************/
CREATE TABLE `pages` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '项目ID',
  `name` varchar(20) NOT NULL COMMENT '项目名称',
  `user_id` int NOT NULL COMMENT '用户ID',
  `user_name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `page_data` text CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '页面数据',
  `remark` varchar(80) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '页面描述',
  `is_public` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否开放 1-公开 2-私有',
  `is_edit` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否可编辑 1-编辑 2-只读',
  `preview_img` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '页面预览图',
  `stg_publish_id` bigint NOT NULL DEFAULT '0' COMMENT 'stg 页面发布ID',
  `pre_publish_id` bigint NOT NULL DEFAULT '0' COMMENT 'pre 页面发布ID',
  `prd_publish_id` bigint NOT NULL DEFAULT '0' COMMENT 'prd 页面发布ID',
  `stg_state` tinyint(1) NOT NULL DEFAULT '1' COMMENT '发布状态：1未保存 2已保存 3已发布',
  `pre_state` tinyint(1) NOT NULL DEFAULT '1' COMMENT '发布状态：1未保存 2已保存 3已发布',
  `prd_state` tinyint(1) NOT NULL DEFAULT '1' COMMENT '发布状态：1未保存 2已保存 3已发布',
  `project_id` int DEFAULT '0' COMMENT '所属项目ID',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2886 DEFAULT CHARSET=utf8mb3 COMMENT='项目列表'
;

/******************************************/
/*   DatabaseName = mars   */
/*   TableName = pages_publish   */
/******************************************/
CREATE TABLE `pages_publish` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '页面发布ID',
  `page_id` bigint NOT NULL COMMENT '页面ID',
  `page_name` varchar(20) NOT NULL COMMENT '页面名称',
  `page_data` text COMMENT '页面数据',
  `user_id` int NOT NULL COMMENT '通行证id',
  `user_name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '姓名',
  `version` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '版本号',
  `env` enum('stg','pre','prd') NOT NULL DEFAULT 'stg' COMMENT '状态：stg、pre、 prd',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `ix_updated_at` (`updated_at`),
  KEY `ix_created_at` (`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=3075 DEFAULT CHARSET=utf8mb3 COMMENT='页面发布列表'
;

/******************************************/
/*   DatabaseName = mars   */
/*   TableName = pages_role   */
/******************************************/
CREATE TABLE `pages_role` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `page_id` bigint NOT NULL COMMENT '页面ID',
  `role` bigint DEFAULT NULL COMMENT '角色权限 1-developer 2-visitor',
  `type` int NOT NULL DEFAULT '1' COMMENT '项目类型 1-项目 2-页面',
  `user_id` int NOT NULL COMMENT '通行证id',
  `user_name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '姓名',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `ix_updated_at` (`updated_at`),
  KEY `ix_created_at` (`created_at`),
  KEY `ix_page_id` (`page_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=138 DEFAULT CHARSET=utf8mb3 COMMENT='页面权限列表'
;

/******************************************/
/*   DatabaseName = mars   */
/*   TableName = project_user   */
/******************************************/
CREATE TABLE `project_user` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'id',
  `system_role` int NOT NULL DEFAULT '1' COMMENT '系统角色：1：管理员 2：普通用户',
  `project_id` bigint NOT NULL DEFAULT '0' COMMENT '项目ID',
  `role_id` int NOT NULL DEFAULT '0' COMMENT '项目角色ID',
  `user_id` int NOT NULL COMMENT '通行证id',
  `user_name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '姓名',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_project_id` (`project_id`)
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8mb3 AVG_ROW_LENGTH=4096 COMMENT='用户列表'
;

/******************************************/
/*   DatabaseName = mars   */
/*   TableName = projects   */
/******************************************/
CREATE TABLE `projects` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '项目ID',
  `name` varchar(20) NOT NULL COMMENT '项目名称',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `remark` varchar(100) DEFAULT NULL COMMENT '项目描述',
  `appid` varchar(50) DEFAULT NULL COMMENT 'appid',
  `logo` text COMMENT 'logo 地址',
  `visit_type` int DEFAULT '1' COMMENT '方法 1-办公网 2-英特网',
  `user_name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '姓名',
  `user_id` int NOT NULL COMMENT '通行证id',
  `is_public` int NOT NULL DEFAULT '2' COMMENT '是否开放 1-公开 2-私有',
  `breadcrumb` int NOT NULL DEFAULT '1' COMMENT '面包屑 1-有 0 无',
  `layout` int NOT NULL DEFAULT '1' COMMENT '布局 1-上下 2-左右 3-上中下',
  `menu_mode` varchar(10) NOT NULL DEFAULT 'inline' COMMENT '菜单模式：inline-内嵌 vertical-垂直  horizontal-水平',
  `menu_theme_color` varchar(20) NOT NULL DEFAULT 'dark' COMMENT '菜单主题色：dark 深色 light-浅色 支持16进制',
  `tag` int NOT NULL DEFAULT '1' COMMENT '多页签 1-显示 0-不显示',
  `footer` int NOT NULL DEFAULT '0' COMMENT '页脚 1-显示 0-不显示',
  `system_theme_color` varchar(10) NOT NULL DEFAULT '#F16622' COMMENT '系统主题色',
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2164 DEFAULT CHARSET=utf8mb3 AVG_ROW_LENGTH=2048 COMMENT='项目列表'
;

/******************************************/
/*   DatabaseName = mars   */
/*   TableName = roles   */
/******************************************/
CREATE TABLE `roles` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `project_id` bigint DEFAULT NULL COMMENT '项目ID',
  `name` varchar(20) NOT NULL DEFAULT '' COMMENT '角色名称',
  `half_checked` varchar(4000) DEFAULT NULL COMMENT '全选的菜单ID',
  `checked` varchar(4000) DEFAULT NULL COMMENT '半全选的菜单ID',
  `remark` varchar(50) DEFAULT '' COMMENT '角色备注',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `user_id` int NOT NULL COMMENT '通行证id',
  `user_name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '姓名',
  PRIMARY KEY (`id`),
  KEY `ix_updated_at` (`updated_at`) USING BTREE,
  KEY `ix_created_at` (`created_at`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=593 DEFAULT CHARSET=utf8mb3 AVG_ROW_LENGTH=4096 COMMENT='页面权限列表'
;

/******************************************/
/*   DatabaseName = mars   */
/*   TableName = users   */
/******************************************/
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'id',
  `user_name` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '通行证id',
  `user_pwd` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '姓名',
  `team_id` int DEFAULT '1' COMMENT '团队ID',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `ix_updated_at` (`updated_at`) USING BTREE,
  KEY `ix_created_at` (`created_at`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=547 DEFAULT CHARSET=utf8mb3 AVG_ROW_LENGTH=4096 ROW_FORMAT=DYNAMIC COMMENT='用户列表'
;

/******************************************/
/*   DatabaseName = mars   */
/*   TableName = workflows   */
/******************************************/
CREATE TABLE `workflows` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `form_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '表单名称',
  `form_desc` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '表单描述',
  `page_id` int DEFAULT '0' COMMENT '配置页面ID',
  `template_data` text CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '工作流配置数据',
  `user_id` int NOT NULL COMMENT '用户ID',
  `user_name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb3 COMMENT='工作流模板配置'
;
