package com.xintr.lowcode.core.util;

import io.micrometer.common.util.StringUtils;
import org.springframework.util.DigestUtils;

import java.security.MessageDigest;

/**
 * <p>加密工具类</p>
 *
 * @author 张峰 zfvip_it@163.com
 * createTime: 2018/7/16 17:31
 */
public class Md5Utils {

    private static final String[] HEX_DIGITS = new String[]{"0", "1", "2", "3", "4", "5",
            "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"};

    /**
     * MD5 加密
     */
    public static String md5(String origin) {
        String resultString = md5Encode(origin, "UTF-8");
        if (StringUtils.isNotBlank(resultString)) {
            return resultString.toUpperCase();
        }
        return resultString;
    }

    /**
     * md5加密
     *
     * @param str
     * @return
     */
    public static String getMd5(String str) {
        return DigestUtils.md5DigestAsHex(str.getBytes());
    }

    /**
     * MD5 比较 匹配origin 加密后是否等于md5
     *
     * @param origin 密码， 未加密
     * @param md5    已加密字符串
     * @return
     */
    public static boolean ecompareMD5(String origin, String md5) {
        String result = md5(origin);
        return md5.equals(result);
    }


    /**
     * MD5 加密
     *
     * @param origin
     * @param charsetname
     * @return
     */
    public static String md5Encode(String origin, String charsetname) {
        String resultString = null;
        resultString = new String(origin);
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            if (charsetname == null || "".equals(charsetname)) {
                resultString = byteArrayToHexString(md.digest(resultString
                        .getBytes()));
            } else {
                resultString = byteArrayToHexString(md.digest(resultString
                        .getBytes(charsetname)));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return resultString;
    }

    private static String byteArrayToHexString(byte[] bytes) {
        StringBuffer resultSb = new StringBuffer();
        for (int i = 0; i < bytes.length; i++) {
            resultSb.append(byteToHexString(bytes[i]));
        }

        return resultSb.toString();
    }

    private static String byteToHexString(byte b) {
        int n = b;
        if (n < 0) {
            n += 256;
        }
        int d1 = n / 16;
        int d2 = n % 16;
        return HEX_DIGITS[d1] + HEX_DIGITS[d2];
    }

//    public static void main(String[] args) {
//        System.out.println(Md5Utils.md5("123456"));
//    }
}
