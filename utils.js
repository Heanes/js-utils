/**
 * @doc 工具
 * @author Heanes
 * @time 2017-06-23 14:48:44 周五
 */
var HE = {

    /**
     * @doc 对日期进行格式化
     */
    dateFormat: dateFormat,

    /**
     * @doc 时间戳转换为指定日期格式
     */
    fromUnixTime: fromUnixTime,

    /**
     * @doc 将日期转换为时间戳
     */
    toUnixTimeStamp: toUnixTimeStamp,

    /**
     * @doc 检测对象是否存在，当对象为null或undefined时为假(注意：空字符串为真）
     */
    isExist: isExist,

    /**
     * @odc 检测对象是否不存在，当对象为null或undefined时为真(注意：空字符串为假）
     */
    isNotExist: isNotExist,

    /**
     * @doc 检测对象是否为空，当对象为null或undefined及空字符串时为真
     */
    isEmpty: isEmpty,

    /**
     * @doc 检测对象是否不为空，当对象为null或undefined及空字符串时为假
     */
    isNotEmpty: isNotEmpty,

    /**
     * @doc 小数位数转换，传入数值，及要保留的小数位数
     */
    convertDecimals: convertDecimals,

    /**
     * @doc 获取url参数
     */
    getUrlRequest: getUrlRequest
};


/**
 * @doc 防重复点击
 * @param $dom 要绑定的dom
 * @param option 参数
 * @author Heanes
 * @time 2017-07-21 18:48:27 周五
 */
function preventRepeatClick($dom, option) {
    ;
}

/**
 * 对日期进行格式化，
 * @param date 要格式化的日期
 * @param format 进行格式化的模式字符串
 *     支持的模式字母有：
 *     y:年,
 *     M:年中的月份(1-12),
 *     d:月份中的天(1-31),
 *     h:小时(0-23),
 *     m:分(0-59),
 *     s:秒(0-59),
 *     S:毫秒(0-999),
 *     q:季度(1-4)
 * @return String
 * @author yanis.wang@gmail.com
 * @from http://yaniswang.com/frontend/2013/02/16/dateformat-performance/
 */
function dateFormat(date, format) {
    if(format === undefined){
        format = date;
        date = new Date();
    }
    var map = {
        "M": date.getMonth() + 1, //月份
        "d": date.getDate(), //日
        "h": date.getHours(), //小时
        "m": date.getMinutes(), //分
        "s": date.getSeconds(), //秒
        "q": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    format = format.replace(/([yMdhmsqS])+/g, function(all, t){
        var v = map[t];
        if(v !== undefined){
            if(all.length > 1){
                v = '0' + v;
                v = v.substr(v.length-2);
            }
            return v;
        }
        else if(t === 'y'){
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format;
}

/**
 * @doc 时间戳转换为指定日期格式
 * @author Heanes
 * @time 2017-03-16 12:51:58 周四
 */
function fromUnixTime(timeStamp, format){
    if(timeStamp === null || timeStamp === 0 || timeStamp === ''){
        return '';
    }
    format = format || 'yyyy-MM-dd hh:mm:ss';
    return dateFormat(new Date(timeStamp * 1000), format);
}

/**
 * @doc 将时间字符转为时间戳 @todo 还未完工，仅可以将yyyy-mm-dd转换为时间戳
 * @param timeStr
 * @param format
 * @returns {number}
 */
function toUnixTimeStamp(timeStr, format) {
    if (timeStr === null || timeStr === '') {
        return 0;
    }
    var date = new Date();
    date.setFullYear(timeStr.substring(0, 4));
    date.setMonth(timeStr.substring(5, 7) - 1);
    date.setDate(timeStr.substring(8, 10));
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return Date.parse(date) / 1000;
}

/**
 * @doc isNotExist取反。检测对象是否存在，当对象为null或undefined时为假(注意：空字符串为真）
 * @param object
 * @returns {boolean}
 * @author Heanes
 * @time 2017-07-03 18:00:08 周一
 */
function isExist(object) {
    return !isNotExist(object);

}

/**
 * @doc 检测对象是否不存在，当对象为null或undefined时为真(注意：空字符串为假）
 * @param object
 * @returns {boolean}
 * @author Heanes
 * @time 2017-07-03 18:00:08 周一
 */
function isNotExist(object) {
    return object === null || object === undefined;

}

/**
 * @doc 检测对象是否为空，当对象为null或undefined及空字符串时为真
 * @param object
 * @returns {boolean}
 * @author Heanes
 * @time 2017-07-03 18:00:18 周一
 */
function isEmpty(object) {
    if(object instanceof Array || object instanceof Object){
        return object.length <= 0;
    }
    return object === null || object === undefined || object === '';

}

/**
 * @doc isEmpty函数取反。检测对象是否不为空，当对象为null或undefined及空字符串时为假
 * @param object
 * @returns {boolean}
 * @author Heanes
 * @time 2017-07-03 18:00:18 周一
 */
function isNotEmpty(object) {
    return !isEmpty(object);
}

/**
 * @doc 小数位数转换，传入数值，及要保留的小数位数
 * @param number 要转换的数值
 * @param decimalPlaces 保留的小数位数
 * @returns {number}
 * @author Heanes
 * @time 2017-07-07 10:11:13 周五
 */
function convertDecimals(number, decimalPlaces) {
    var formatTimes = Math.pow(10, decimalPlaces);
    return parseInt(parseFloat(number) * formatTimes) / formatTimes;
}

/**
 * @doc 解析url参数
 * @returns {Object}
 * @constructor
 */
function getUrlRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = {};
    if (url.indexOf("?") !== -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

/**
 * @doc 解析url相关信息
 * @returns {Object}
 * @constructor
 * @author Heanes
 * @time 2017-08-21 20:14:21 周一
 */
function parseURLInfo(url) {
    var a = document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function () {
            var ret = {},
                seg = a.search.replace(/^\?/, '').split('&'),
                len = seg.length, i = 0, s;
            for (; i < len; i++) {
                if (!seg[i]) {
                    continue;
                }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })
    }
}