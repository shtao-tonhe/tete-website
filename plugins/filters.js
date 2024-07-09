/*
 * @Author: your name
 * @Date: 2020-06-26 19:54:15
 * @LastEditTime: 2021-01-10 15:09:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /thg-pc/plugins/filters.js
 */
import i18n from "~/plugins/i18n.js";

import Vue from "vue";
//将毫秒的时间转换成美式英语的时间格式,eg:3rd May 2018
const formatDateMonth = millinSeconds => {
  var date = new Date(millinSeconds * 1000);
  var monthArr = new Array(
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Spt",
    "Oct",
    "Nov",
    "Dec"
  );
  var suffix = new Array("st", "nd", "rd", "th");

  var year = date.getFullYear(); //年
  var month = monthArr[date.getMonth()]; //月
  var ddate = date.getDate(); //日

  if (ddate % 10 < 1 || ddate % 10 > 3) {
    ddate = ddate + suffix[3];
  } else if (ddate % 10 == 1) {
    ddate = ddate + suffix[0];
  } else if (ddate % 10 == 2) {
    ddate = ddate + suffix[1];
  } else {
    ddate = ddate + suffix[2];
  }
  return month;
};

const orderStatus = key => {
  switch (key) {
    case 1:
      return 'To be delivered';
    case 2:
      return "delivered";

    default:
      break;
  }
};
const goodsStatus = key => {
  switch (key) {
    case 1:
      return 'on shelf';
    case 2:
      return "off shelf";

    default:
      break;
  }
};
const formatDateDay = millinSeconds => {
  var date = new Date(millinSeconds * 1000);
  var monthArr = new Array(
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Spt",
    "Oct",
    "Nov",
    "Dec"
  );
  var ddate = date.getDate(); //日
  return ddate;
};

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}
function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}
// f
//isarr
function Formats(value, f) {
  try {
    f = f || 1;
    var v = value;
    if (v >= 10000000) {
      v = (v / 10000000).toFixed(f) + "M";
      return v;
    } else if (v >= 1000) {
      v = (v / 1000).toFixed(f) + "K";
      return v;
    } else {
      return v + "";
    }
  } catch (e) {
    console.error(error);
    return 0;
  }
}

let filters = {
  formatDateMonth,
  formatDateDay,
  formatDate,
  goodsStatus,
  Formats,
  orderStatus
};

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.prototype.filters = filters;
export default filters;
