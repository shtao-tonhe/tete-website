/*
 * @Author: your name
 * @Date: 2020-11-06 14:01:49
 * @LastEditTime: 2020-11-06 14:01:56
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/static/lib/twttr.js
 */
window.twttr = (function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };

  return t;
})(document, "script", "twitter-wjs");
