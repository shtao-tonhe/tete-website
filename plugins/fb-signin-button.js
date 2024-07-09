/*
 * @Author: your name
 * @Date: 2021-03-07 21:50:36
 * @LastEditTime: 2021-03-07 22:06:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/plugins/fb-signin-button.js
 */
(function() {
  function install(Vue) {
    Vue.component("fb-signin-button", {
      name: "fb-signin-button",
      render(createElement) {
        return createElement(
          "div",
          {
            attrs: {
              class: "fb-signin-button"
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
        this.$refs.signinBtn.addEventListener("click", e => {
          if (window.FB && window.FB.login) {
            window.FB.login(response => {
              this.$emit(response.authResponse ? "success" : "error", response);
            }, this.params);
          }else{
            this.$message.error('Login failed, refresh page and try again')
          }
        });
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
