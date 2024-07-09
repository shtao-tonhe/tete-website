/*
 * @Author: your name
 * @Date: 2020-11-06 11:23:07
 * @LastEditTime: 2020-11-24 16:52:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/assets/lib/fb.js
 */
window.fbAsyncInit = function() {
  console.log('face11111111111')
  FB.init({
    appId: '2804752129798185',
    cookie: true, // enable cookies to allow the server to access the session
    xfbml: true, // parse social plugins on this page
    version: "v8.0" // use graph api version 2.8
  });
};
// (function(d, s, id) {
//   console.log('face')
//   var js,
//     fjs = d.getElementsByTagName(s)[0];
//   if (d.getElementById(id)) return;
//   js = d.createElement(s);
//   js.id = id;
//   js.src = "//connect.facebook.net/en_US/sdk.js";
//   fjs.parentNode.insertBefore(js, fjs);
// })(document, "script", "facebook-jssdk");
