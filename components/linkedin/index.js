/*
 * @Author: your name
 * @Date: 2020-12-01 07:22:57
 * @LastEditTime: 2020-12-01 14:32:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/components/linkedin/index.js
 */
(function() {
  function err(msg) {
    typeof console !== "undefined" && console.error(`[g-signin-button] ${msg}`);
  }

  function filter(str) {
    // 特殊字符转义
    str += ""; // 隐式转换
    str = str.replace(/%/g, "%25");
    str = str.replace(/\+/g, "%2B");
    str = str.replace(/ /g, "%20");
    str = str.replace(/\//g, "%2F");
    str = str.replace(/\?/g, "%3F");
    str = str.replace(/&/g, "%26");
    str = str.replace(/\=/g, "%3D");
    str = str.replace(/#/g, "%23");
    return str;
  }

  function formateObjToParamStr(paramObj) {
    const sdata = [];
    for (let attr in paramObj) {
      sdata.push(`${attr}=${filter(paramObj[attr])}`);
    }
    return sdata.join("&");
  }

  function install(Vue) {
    Vue.component("linkedin-signin-button", {
      name: "linkedin-signin-button",
      render(createElement) {
        return createElement(
          "div",
          {
            attrs: {
              class: "linkedin-signin-button"
            },
            ref: "signinBtn"
          },
          this.$slots.default
        );
      },
      props: {
        params: {
          type: Object,
          required: true,
          default() {
            return {};
          }
        }
      },
      mounted() {
        let url =
          "https://www.linkedin.com/oauth/v2/authorization?" +
          formateObjToParamStr(this.params);

        // url =  'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id={your_client_id}&redirect_uri=https%3A%2F%2Fdev.example.com%2Fauth%2Flinkedin%2Fcallback&scope=r_liteprofile%20r_emailaddress%20w_member_social'
        $.ajax({
          url: url,
          type: "get",
          dataType: "json",
          success: rst => {},
          error: (XMLHttpRequest, textStatus, errorThrown) => {}
        });

        // if (!this.params.client_id) {
        //   err("params.client_id must be specified.");
        //   return;
        // }
        // GET https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id={your_client_id}&redirect_uri=https%3A%2F%2Fdev.example.com%2Fauth%2Flinkedin%2Fcallback&state=fooobar&scope=r_liteprofile%20r_emailaddress%20w_member_social

        // window.gapi.load("auth2", () => {
        //   const auth2 = window.gapi.auth2.init(this.params);
        //   auth2.attachClickHandler(
        //     this.$refs.signinBtn,
        //     {},
        //     googleUser => {
        //       this.$emit("success", googleUser);
        //     },
        //     error => {
        //       this.$emit("error", error);
        //       this.$emit("failure", error); // an alias
        //     }
        //   );
        // });
      },
      methods:{
        login(){

        }
      }
    });
  }

  if (typeof exports === "object") {
    module.exports = install;
  } else if (typeof define === "function" && define.amd) {
    /*global define*/
    define([], function() {
      return install;
    });
  } else if (window.Vue) {
    window.Vue.use(install);
  }
})();
