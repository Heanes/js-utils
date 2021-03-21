/**
 * @doc 根据form数据获取对象数据
 * @returns {{}}
 * @author Heanes
 * @time 2018-03-24 23:12:53 周六
 */
jQuery.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    jQuery.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};