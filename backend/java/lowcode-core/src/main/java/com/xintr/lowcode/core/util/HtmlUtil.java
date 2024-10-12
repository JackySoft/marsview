package com.xintr.lowcode.core.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONException;
import com.alibaba.fastjson.serializer.SerializerFeature;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

/**
 * <p>类说明</p>
 *
 * @author 张峰 zfvip_it@163.com
 * createTime: 2018/5/10 10:36
 */
public class HtmlUtil {

    private HtmlUtil() {
    }


    public static void writerString(HttpServletResponse response, Object object) {
        response.setContentType("application/json");
        response.setHeader("Access-Control-Allow-Origin", "*");
        writer(response, object == null ? "" : object.toString());
    }

    public static void writerString(HttpServletResponse response, Object object, String contentType) {
        response.setContentType(contentType);
        response.setHeader("Access-Control-Allow-Origin", "*");
        writer(response, object == null ? "" : object.toString());
    }

    public static void writerJson(HttpServletResponse response, Object object) {
        try {
            response.setContentType("application/json");
            response.setHeader("Access-Control-Allow-Origin", "*");
            writer(response, toJSONString(object));
        } catch (JSONException var3) {
            var3.printStackTrace();
        }

    }

    public static void writerHtml(HttpServletResponse response, String htmlStr) {
        writer(response, htmlStr);
    }

    private static void writer(HttpServletResponse response, String str) {
        try {
            response.setContentLength(-1);
            response.setHeader("Pragma", "No-cache");
            response.setHeader("Cache-Control", "no-cache");
            response.setCharacterEncoding("UTF-8");
            PrintWriter out = response.getWriter();
            out.write(str);
            out.flush();
            out.close();
        } catch (IOException var4) {
            var4.printStackTrace();
        }
    }

    /**
     * 对象转json
     *
     * @param obj
     * @return
     */
    private static String toJSONString(Object obj) {
        return JSON.toJSONString(obj, SerializerFeature.WriteDateUseDateFormat, SerializerFeature.DisableCircularReferenceDetect);
    }

    public static void main(String[] args) {
        String aa = "success";
        System.out.println(aa);
    }
}
