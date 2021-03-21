/**
 * @doc 获取格式化的日期
 * @param format
 d：将日显示为不带前导零的数字，如1
 dd：将日显示为带前导零的数字，如01
 ddd：星期
 dddd：星期
 q: 季度(q)
 M：将月份显示为不带前导零的数字，如一月显示为1
 MM：将月份显示为带前导零的数字，如01
 MMM：将月份显示为缩写形式，如二月|Jan
 MMMM：将月份显示为完整月份名，如一月|January
 yy：以两位数字格式显示年份
 yyyy：以四位数字格式显示年份
 h：使用12小时制将小时显示为不带前导零的数字，注意||的用法
 hh：使用12小时制将小时显示为带前导零的数字
 H：使用24小时制将小时显示为不带前导零的数字
 HH：使用24小时制将小时显示为带前导零的数字
 m：将分钟显示为不带前导零的数字
 mm：将分钟显示为带前导零的数字
 s：将秒显示为不带前导零的数字
 ss：将秒显示为带前导零的数字
 l：将毫秒显示为不带前导零的数字
 ll：将毫秒显示为带前导零的数字
 L：将毫秒显示为四舍五入的两位数字且带前导零
 tt：显示am/pm
 TT：显示AM/PM
 * @param date
 * @param language 语言，主要是星期及月会用到
 * @returns {void | string | *}
 * @author Heanes
 * @time 2018-11-13 11:48:38 周二
 */
function getFormatDate(format, date, language) {

    // 自动补零
    let zeroize = function (value, length) {
        if (!length) length = 2;
        value = String(value);
        let zeros = '';
        for (let i = 0; i < (length - value.length); i++) {
            zeros += '0';
        }
        return zeros + value;
    };

    // 补充默认值
    date = date || new Date();
    format = format || 'yyyy-MM-dd HH:mm:ss ddd';
    language = language || 'chinese';

    // 星期字符库
    let week = {
        chinese: {
            short: ['周天', '周一', '周二', '周三', '周四', '周五', '周六'],
            long: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        },
        english: {
            short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'],
            long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        }
    };

    // 月份字符库
    let month = {
        chinese: {
            short: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            long: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        },
        english: {
            short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            long: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        }
    };

    // 语言别名库
    let languageLib = {
        chinese: ['chinese', 'cn', 'zh', 'zh-cn'],
        english: ['english', 'en', 'us', 'en-us']
    };
    for(let field in languageLib){
        let item = languageLib[field];
        if(item.includes(language)){
            language = field;
            break;
        }
    }

    return format.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmstTql])\1?|[lLZ])\b/g, function($0) {
        switch ($0) {
            case 'd': return date.getDate();
            case 'dd': return zeroize(date.getDate());
            case 'ddd': return week[language]['short'][date.getDay()];
            case 'dddd': return week[language]['long'][date.getDay()];
            case 'q': return Math.floor((date.getMonth() + 3) / 3); //季度
            case 'M': return date.getMonth() + 1;
            case 'MM': return zeroize(date.getMonth() + 1);
            case 'MMM': return month[language]['short'][date.getMonth()];
            case 'MMMM': return month[language]['long'][date.getMonth()];
            case 'yy': return String(date.getFullYear()).substr(2);
            case 'yyyy': return date.getFullYear();
            case 'h': return date.getHours() % 12 || 12;
            case 'hh': return zeroize(date.getHours() % 12 || 12);
            case 'H': return date.getHours();
            case 'HH': return zeroize(date.getHours());
            case 'm': return date.getMinutes();
            case 'mm': return zeroize(date.getMinutes());
            case 's': return date.getSeconds();
            case 'ss': return zeroize(date.getSeconds());
            case 'l': return date.getMilliseconds();
            case 'L':
                let m = date.getMilliseconds();
                if (m > 99) m = Math.round(m / 10);
                return zeroize(date.getMilliseconds() > 99 ? Math.round(date.getMilliseconds() / 10) : date.getMilliseconds());
            case 'll': return zeroize(date.getMilliseconds(), 3);
            case 'tt': return date.getHours() < 12 ? 'am' : 'pm';
            case 'TT': return date.getHours() < 12 ? 'AM' : 'PM';
            case 'Z': return d.toUTCString().match(/[A-Z]+$/);
            default: return $0.substr(1, $0.length - 2);
        }
    });
}
