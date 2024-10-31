package com.xintr.lowcode.api.util;


import com.alibaba.fastjson2.JSON;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.apache.commons.lang3.time.StopWatch;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * <p>类说明</p>
 *
 * @author 张峰 zfvip_it@163.com
 * createTime: 2018/5/2 16:26
 */
public class DateUtil {

  private static final ZoneId ZONEID = ZoneId.systemDefault();

  public static final String YYYY_MM_DD_HH_MM_SS_S = "yyyy-MM-dd HH:mm:ss S";
  public static final String YYYY_MM_DD_HH_MM_SS = "yyyy-MM-dd HH:mm:ss";
  public static final String YYYYMMDDHHMMSS = "yyyyMMddHHmmss";
  public static final String YYYYMMDDHHMMSSSSS = "yyyyMMddhhmmssSSS";
  public static final String YYYYMMDD_T_HHMMSS = "yyyyMMdd'T'HHmmss";
  public static final String YYYYMMDD = "yyyyMMdd";
  public static final String YYYY_MM_DD = "yyyy-MM-dd";
  public static final String YYYYMM = "yyyyMM";
  public static final String HHMMSS = "HHmmss";
  public static final String YYYY_MM = "yyyy-MM";
  public static final String YYYY_MM_DD_T_HH_MM_SS_XXX = "yyyy-MM-dd'T'HH:mm:ssXXX";


  /**
   * 日期转换到字符串
   *
   * @param paramDate 要转换的日期
   * @param pattern   转换格式：例：yyyy-MM-dd
   * @return String 日期字符串
   */
  public static String dateToString(Date paramDate, String pattern) {
    return DateFormatUtils.format(paramDate, pattern);
  }

  /**
   * 字符串转换到日期
   *
   * @param dateStr 日期字符串
   * @param pattern 转换格式：例：yyyy-MM-dd
   * @return Date 转换后的日期
   */
  public static Date stringToDate(String dateStr, String pattern) {
    //获得最后一个点的位置
    int index = dateStr.lastIndexOf(".");
    if (index >= 0) {
      //根据点的位置，截取 字符串。得到结果 result
      dateStr = dateStr.substring(0, index);
    }
    DateTimeFormatter dtf = DateTimeFormatter.ofPattern(pattern);
    LocalDate ldt = LocalDate.parse(dateStr, dtf);
    ZonedDateTime zdt = ldt.atStartOfDay().atZone(ZONEID);
    return Date.from(zdt.toInstant());
  }

  /**
   * 月份加减
   *
   * @param dateStr
   * @param pattern
   * @return
   */
  public static String addYearMonth(String dateStr, String pattern, long monthsToAdd) {
    YearMonth yearMonth = YearMonth.parse(dateStr, DateTimeFormatter.ofPattern(pattern));
    return yearMonth.plusMonths(monthsToAdd).format(DateTimeFormatter.ofPattern(pattern));
  }

  /**
   * 字符串转换到时间
   *
   * @param dateStr 日期字符串
   * @param pattern 转换格式：例：yyyy-MM-dd HH:mm:ss
   * @return Date 转换后的日期
   */
  public static Date stringToTime(String dateStr, String pattern) {
    DateTimeFormatter dtf = DateTimeFormatter.ofPattern(pattern);
    LocalDateTime ldt = LocalDateTime.parse(dateStr, dtf);
    ZonedDateTime zdt = ldt.atZone(ZONEID);
    return Date.from(zdt.toInstant());
  }

  /**
   * 获取当前日期(字符串格式)
   *
   * @param pattern 转换格式：例：yyyy-MM-dd
   * @return String 日期字符串
   */
  public static String getCurrDate(String pattern) {
    return dateToString(new Date(), pattern);
  }

  /**
   * 获取当前日期(字符串格式)
   *
   * @return String 日期字符串
   */
  public static String getCurrDateTime() {
    return dateToString(new Date(), YYYY_MM_DD_HH_MM_SS);
  }

  /**
   * 获取当前日期(日期格式)
   *
   * @param pattern 转换格式：例：yyyy-MM-dd
   * @return Date 日期
   */
  public static Date getCurrDateOfDate(String pattern) {
    return stringToDate(dateToString(new Date(), pattern), pattern);
  }

  /**
   * 指定日期几天后或者几天前的日期
   *
   * @param paramDate 指定日期
   * @param days      天数
   * @return Date 几天后或者几天前的日期
   */
  public static Date addDays(Date paramDate, int days) {
    return DateUtils.addDays(paramDate, days);
  }

  /**
   * 指定日期几分钟后或者几分钟前的日期
   *
   * @param paramDate 指定日期
   * @param minutes   分钟数
   * @return Date 几分钟后或者几分钟前的日期
   */
  public static Date addMinutes(Date paramDate, int minutes) {
    return DateUtils.addMinutes(paramDate, minutes);
  }

  /**
   * 指定日期几秒钟后或者几秒钟前的日期
   *
   * @param paramDate 指定日期
   * @param seconds   秒钟数
   * @return Date 秒分钟后或者秒分钟前的日期
   */
  public static Date addSeconds(Date paramDate, int seconds) {
    return DateUtils.addSeconds(paramDate, seconds);
  }

  /**
   * 指定日期几月后或者几月前的日期
   *
   * @param paramDate 指定日期
   * @param months    月数
   * @return Date 几月后或者几月前的日期
   */
  public static Date addMonths(Date paramDate, int months) {
    return DateUtils.addMonths(paramDate, months);
  }

  /**
   * 根据指定日期获取指定日期所在月的第一天和最后一天
   *
   * @param paramDate 指定日期
   * @return String[] 第一天和最后一天数组
   */
  public static String[] getMonthStartAndEndDate(Date paramDate, String pattern) {
    String[] retAry = new String[2];

    Calendar calendar = Calendar.getInstance();
    calendar.setTime(paramDate);
    calendar.set(Calendar.DAY_OF_MONTH, 1);
    retAry[0] = dateToString(calendar.getTime(), pattern);
    calendar.add(Calendar.MONTH, 1);
    calendar.set(Calendar.DAY_OF_MONTH, 0);
    retAry[1] = dateToString(calendar.getTime(), pattern);

    return retAry;
  }

  /**
   * 根据指定日期获取指定日期所在月的第一天和最后一天
   *
   * @param paramDate 指定日期
   * @return String[] 第一天和最后一天数组
   */
  public static String[] getMonthStartAndEndDate(Date paramDate) {
    return getMonthStartAndEndDate(paramDate, YYYY_MM_DD);
  }

  /**
   * 据指定日期获取指定日期所在周的第一天和最后一天
   *
   * @param paramDate
   * @return
   */
  public static String[] getWeekStartAndEndDate(Date paramDate) {
    String[] retAry = new String[2];
    Calendar calendar = Calendar.getInstance();
    calendar.setTime(paramDate);
    calendar.setFirstDayOfWeek(2);
    calendar.set(7, 2);
    retAry[0] = dateToString(calendar.getTime(), "yyyy-MM-dd");
    calendar.set(7, 1);
    retAry[1] = dateToString(calendar.getTime(), "yyyy-MM-dd");
    return retAry;
  }

  /**
   * 根据指定日期获取指定日期所在年的第一天和最后一天
   *
   * @param paramDate 指定日期
   * @return String[] 第一天和最后一天数组
   */
  public static String[] getYearStartAndEndDate(Date paramDate) {
    String[] retAry = new String[2];

    Calendar calendar = Calendar.getInstance();
    calendar.setTime(paramDate);
    calendar.set(Calendar.DAY_OF_YEAR, 1);
    retAry[0] = dateToString(calendar.getTime(), "yyyy-MM-dd");
    calendar.add(Calendar.YEAR, 1);
    calendar.set(Calendar.DAY_OF_YEAR, 0);
    retAry[1] = dateToString(calendar.getTime(), "yyyy-MM-dd");

    return retAry;
  }

  /**
   * 获取 获取某年某月 所有日期（yyyy-mm-dd格式字符串）
   *
   * @param year
   * @param month
   * @return
   */
  public static List<String> getMonthFullDay(int year, int month) {
    return getMonthFullDay(year, month, YYYY_MM_DD);
  }

  /**
   * 获取 获取某年某月 所有日期（yyyy-mm-dd格式字符串）
   *
   * @param year
   * @param month
   * @return
   */
  public static List<String> getMonthFullDay(int year, int month, String pattern) {
    List<String> fullDayList = new ArrayList<>(32);
    // 获得当前日期对象
    Calendar cal = Calendar.getInstance();
    cal.clear();// 清除信息
    cal.set(Calendar.YEAR, year);
    // 1月从0开始
    cal.set(Calendar.MONTH, month - 1);
    // 当月1号
    cal.set(Calendar.DAY_OF_MONTH, 1);
    int count = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
    for (int j = 1; j <= count; j++) {
      fullDayList.add(DateFormatUtils.format(cal.getTime(), pattern));
      cal.add(Calendar.DAY_OF_MONTH, 1);
    }
    return fullDayList;
  }

  /**
   * 获取近七天的日期
   *
   * @return
   */
  public static List<String> getSevenDate() {
    List<String> dateList = new ArrayList<>();
    for (int i = 0; i < 7; i++) {
      Date date = DateUtils.addDays(new Date(), -i);
      String formatDate = dateToString(date, YYYY_MM_DD);
      dateList.add(formatDate);
    }
    return dateList;
  }

  /**
   * 获取指定两个日期相差的天数
   *
   * @param paramDate1 指定日期1
   * @param paramDate2 指定日期2
   * @return int 相差天数
   */
  public static int getDiffDaysOfTwoDate(String paramDate1, String paramDate2) {
    return Math.abs(getDiffDays(paramDate1, paramDate2));
  }

  /**
   * 获取指定两个日期相差的天数
   *
   * @param date1 指定日期1
   * @param date2 指定日期2
   * @return int 相差天数
   */
  public static int getDiffDaysOfTwoDate(Date date1, Date date2) {
    return Math.abs(getDiffDays(date1, date2));
  }

  /**
   * 获取指定两个日期相差的天数(固定顺序,可以取负值)
   *
   * @param paramDate1 指定日期1
   * @param paramDate2 指定日期2
   * @return int 相差天数
   */
  public static int getDiffDaysOfTwoDateByNegative(String paramDate1, String paramDate2) {
    return getDiffDays(paramDate1, paramDate2);
  }

  /**
   * 获取指定两个日期相差的天数(固定顺序,可以取负值)
   *
   * @param paramDate1
   * @param paramDate2
   * @return
   */
  public static int getDiffDays(String paramDate1, String paramDate2) {
    Date date1 = stringToDate(paramDate1, "yyyy-MM-dd");
    Date date2 = stringToDate(paramDate2, "yyyy-MM-dd");
    return getDiffDays(date1, date2);
  }

  /**
   * 获取指定两个日期相差的天数(固定顺序,可以取负值)
   *
   * @param date1
   * @param date2
   * @return
   */
  public static int getDiffDays(Date date1, Date date2) {
    Long diffTimes = date1.getTime() - date2.getTime();
    Long diffDays = diffTimes / (3600 * 1000 * 24);
    return diffDays.intValue();
  }

  /**
   * 获取日期是星期几
   *
   * @param paramDate 参数日期
   * @param retFormat 返回格式：0、表示返回数字格式 1、表示返回中文格式
   * @return String 星期几
   */
  public static String getDayOfWeek(Date paramDate, int retFormat) {
    Calendar c = Calendar.getInstance();
    c.setTime(paramDate);
    int dayOfWeek = (c.get(Calendar.DAY_OF_WEEK) == 1) ? 7 : c.get(Calendar.DAY_OF_WEEK) - 1;
    String dayOfWeekStr = null;
    switch (dayOfWeek) {
      case 1:
        dayOfWeekStr = (0 == retFormat) ? "1" : "一";
        break;
      case 2:
        dayOfWeekStr = (0 == retFormat) ? "2" : "二";
        break;
      case 3:
        dayOfWeekStr = (0 == retFormat) ? "3" : "三";
        break;
      case 4:
        dayOfWeekStr = (0 == retFormat) ? "4" : "四";
        break;
      case 5:
        dayOfWeekStr = (0 == retFormat) ? "5" : "五";
        break;
      case 6:
        dayOfWeekStr = (0 == retFormat) ? "6" : "六";
        break;
      case 7:
        dayOfWeekStr = (0 == retFormat) ? "7" : "日";
        break;
    }
    return dayOfWeekStr;
  }


  /**
   * 计算两个日期间隔是时间
   *
   * @param startTime
   * @param endTime
   * @return
   */
  public static String dateDiff(Long startTime, Long endTime) {
    //按照传入的格式生成一个simpledateformate对象
    //一天的毫秒数
    long nd = 1000 * 24 * 60 * 60;
    //一小时的毫秒数
    long nh = 1000 * 60 * 60;
    //一分钟的毫秒数
    long nm = 1000 * 60;
    //一秒钟的毫秒数long diff;try {
    long ns = 1000;
    long diff = endTime - startTime;
    //计算差多少天
    long day = Math.abs(diff / nd);
    //计算差多少小时
    long hour = Math.abs(diff % nd / nh);
    //计算差多少分钟
    long min = Math.abs(diff % nd % nh / nm);
    //计算差多少秒//输出结果
    long sec = Math.abs(diff % nd % nh % nm / ns);
    long mill = Math.abs(diff % ns);
    return day + "天" + hour + "时" + min + "分" + sec + "秒" + mill + "毫秒";
  }

  /**
   * 获取耗时
   *
   * @param sw
   * @return
   */
  public static String getTakeUpTime(StopWatch sw) {
    if (sw != null) {
      sw.stop();
      long milliseconds = sw.getTime();
      long hours = TimeUnit.MILLISECONDS.toHours(milliseconds);
      long minutes = TimeUnit.MILLISECONDS.toMinutes(milliseconds) % 60;
      long seconds = TimeUnit.MILLISECONDS.toSeconds(milliseconds) % 60;
      long millis = TimeUnit.MILLISECONDS.toMillis(milliseconds) % 1000;
      return hours + "时" + minutes + "分" + seconds + "秒" + millis + "毫秒";
    }
    return "";
  }

  public static void main(String[] args) throws InterruptedException {
    Long dateTime1 = System.currentTimeMillis();
    Thread.sleep(1000);
    Long dateTime2 = System.currentTimeMillis();
    System.out.println(DateUtil.dateDiff(dateTime1, dateTime2));
    System.out.println(dateTime1);
    System.out.println(dateTime2);
    System.out.println(DateUtil.getCurrDate(DateUtil.YYYYMMDD));
    System.out.println(DateUtil.getCurrDate(DateUtil.YYYYMMDD_T_HHMMSS));
    System.out.println(DateUtil.stringToTime("2019-03-15 01:01:12", DateUtil.YYYY_MM_DD_HH_MM_SS));
    System.out.println(DateUtil.stringToDate("2019-03-15", DateUtil.YYYY_MM_DD));
    System.out.println(JSON.toJSONString(getMonthStartAndEndDate(stringToDate("20200501", YYYYMMDD))));
  }
}
