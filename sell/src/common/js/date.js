export function formatDate(date, fmt) {
    if(/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear()+'').substring(4-RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() +1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let key in o) {
        if(new RegExp(`(${key})`).test(fmt)) {
            let str = o[key] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}

// 不足位时补0的方法
function padLeftZero(str) {
    return ('00' + str).substring(str.length);
}