package com.xintr.lowcode.api.basic;

import io.micrometer.common.util.StringUtils;
import tk.mybatis.mapper.code.Style;
import tk.mybatis.mapper.util.StringUtil;

import javax.persistence.Transient;
import java.io.Serializable;

/**
 * <p>类说明</p>
 *
 * @author 张峰 zfvip_it@163.com
 * createTime: 2018/5/7 14:34
 */
public class BaseObject implements Serializable, Cloneable {

    @Transient
    private int rowNo;
    @Transient
    private Integer pageIndex = 1;
    @Transient
    private Integer pageSize = 10;
    @Transient
    private String order;
    @Transient
    private String keyword;
    @Transient
    private String[] vagueMatch;

    public BaseObject() {

    }

    public Integer getPageIndex() {
        return pageIndex;
    }

    public void setPageIndex(Integer pageIndex) {
        this.pageIndex = pageIndex;
    }

    public Integer getPageSize() {
        return this.pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public int getRowNo() {
        return this.rowNo;
    }

    public void setRowNo(int rowNo) {
        this.rowNo = rowNo;
    }

    public String getOrder() {
        if (StringUtils.isNotBlank(order)) {
            order = StringUtil.convertByStyle(order, Style.camelhumpAndLowercase);
        }
        return order;
    }

    public void setOrder(String order) {
        this.order = order;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public String[] getVagueMatch() {
        return vagueMatch;
    }

    public void setVagueMatch(String[] vagueMatch) {
        this.vagueMatch = vagueMatch;
    }

    @Override
    public Object clone() {
        try {
            return super.clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return this;
    }
}
