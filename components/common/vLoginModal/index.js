/*
 * @Author: your name
 * @Date: 2020-10-15 20:58:30
 * @LastEditTime: 2021-03-07 22:20:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 */
import md5 from "js-md5";
import * as Cookies from "js-cookie";
import { data } from "jquery";

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

let that = "";
export default {
  name: "vLoginModal",
  data() {
    return {
      fbloading: false,
      modal1Visible: false,
      modal1Visible2: false,
      loginType: "kj",
      lastType: "kj",
      showpwd: false,
      username: "",
      sms: "",
      sendtime: "",
      showCode: true,
      count: "",
      timer: null,
      password: "",
      loading: false,
      disabled: true,
      sendloading: false,
      msg: "Welcome to Your Vue.js App",
      users: [
        { firstname: "Carl", lastname: "Luo" },
        { firstname: "Rachel", lastname: "Kang" },
        { firstname: "Leo", lastname: "Luo" }
      ],
      fbSignInParams: {
        scope: "email,user_likes",
        return_scopes: true
      },
      LNSignInParams: {
        state: "123",
        redirect: "https://teteday.com/",
        appid: "86gyxelb6wsdsz",
        platform: "linkedin"
      },
      username: "",
      googleSignInParams: {
        client_id: this.global.googleAppid,
        scope: "email profile openid",
        response_type: "id_token permission"
      }

      // if (this.ctx.$route.query.state === "abc") {
      //   let url = "https://www.linkedin.com/oauth/v2/accessToken";
      //   let data = {
      //     grant_type: "authorization_code",
      //     redirect_uri: 'https://teteday.com/',
      //     client_id: '86gyxelb6wsdsz',
      //     code: this.ctx.$route.query.code,
      //     client_secret: "VGiVHIZAYaxVcRgK"
      //   };
      //   $.ajax({
      //     url,
      //     data: data,
      //     type: "post",
      //     headers: {
      //       "Content-Type": "application/x-www-form-urlencoded"
      //     },
      //     success: rst => {},
      //     error: (XMLHttpRequest, textStatus, errorThrown) => {}
      //   });
      // }
    };
  },
  // http://localhost:3000/?code=AQRRd1Rww-jB55J1R0NzSU3fJNbJ5iqSRmnDIfyKkF9IT417-zJ_EU9Y0wuBClk4kXq6xsVbWxCQqQ0DzcJdFRsuQiLACL0PJA45kHvsy1e84TMll8bGWfYWBJqId3cG-5I5fdUtDqTk9i4UHwnJuke2on0hMMk30BWjZTglll5pnqy0uiL7Xn8PVJCXTA&state=abc
  mounted() {
    that = this;
  },
  watch: {
    username() {},
    password() {}
  },
  methods: {
    jspCallBack() {
      console.log("11111111111");
    },
    goApple() {
      this.fbloading = true;
      setTimeout(() => {
        this.fbloading = false;
      }, 5000);
      let url =
        "https://appleid.apple.com/auth/authorize?" +
        formateObjToParamStr({
          client_id: "com.teteday.clientid",
          redirect_uri: "https://teteday.com/redirect/apple",
          response_type: "code",
          scope: "name",
          response_mode: "form_post",
          state: "123"
        });
      location.href = url;
    },
    goLinkedin() {
      this.fbloading = true;
      setTimeout(() => {
        this.fbloading = false;
      }, 5000);
      let url =
        "http://teteday.com/api-backend/front/oath/index?" +
        formateObjToParamStr({
          ...this.LNSignInParams
        });
      location.href = url;
    },
    onLNSignInSuccess() {},
    onLNSignInError() {},
    onFBSignInSuccess(response) {
      var fbToken;

      function checkLoginState() {
        FB.getLoginStatus(async response => {
          this.fbloading = false;
          console.log(response);
          // `googleUser` is the GoogleUser object that represents the just-signed-in user.
          // See https://developers.google.com/identity/sign-in/web/reference#users
          let res = await that.ctx.$api
            .guest_front_oath_facebook({
              appid: that.ctx.global.faceBookAppid,
              "auth-type": "web",
              access_token: response.authResponse.accessToken,
              openid: response.authResponse.userID
            })
            .catch(err => {
              console.log(err);
            });
          if (res.code === 0) {
            that.loginSuccess(res);
          } else {
            that.ctx.$message.error(
              res.msg || that.ctx.$t("common.systemError")
            );
          }
        });
      }
      function statusChangeCallback(response) {
        if (response.status === "connected") {
          //登陆状态已连接
          fbToken = response.authResponse.accessToken;
          getUserInfo();
        } else if (response.status === "not_authorized") {
          //未经授权
          console.log("facebook未经授权");
        } else {
          console.log("不是登陆到Facebook;不知道是否授权");
        }
      }
      //获取用户信息
      function getUserInfo() {
        FB.api("/me", function(response) {
          //response.id / response.name
          console.log("Successful login for: " + response.name);
          //把用户token信息交给后台
          self.location = "/home/login.fbLogin.do?accessToken=" + fbToken;
        });
      }

      FB.api("/me", dude => {
        console.log(`Good to see you, ${dude.name}.`);
      });
      checkLoginState();
    },
    fbClick() {
      this.fbloading = true;
      setTimeout(() => {
        this.fbloading = false;
      }, 5000);
    },
    onFBSignInError(error) {
      this.fbloading = false;
      this.$message.error("Login failed");
      console.log("OH NOES", error);
    },
    async onGoogleSignInSuccess(googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getBasicProfile(); // etc etc
      console.log(profile.getId());
      var access_token = googleUser.getAuthResponse().access_token;
      this.fbloading = false;
      let res = await that.ctx.$api
        .guest_front_oath_google({
          appid: that.ctx.global.googleAppid,
          "auth-type": "web",
          access_token: access_token,
          openid: profile.getId()
        })
        .catch(err => {
          console.log(err);
        });
      if (res.code === 0) {
        that.loginSuccess(res);
      } else {
        that.ctx.$message.error(res.msg || that.ctx.$t("common.systemError"));
      }
    },
    async sendlogin() {
      if (!that.username) {
        that.ctx.$message.error(
          that.ctx.$t("components.loginModal.inputUserName")
        );
        return;
      }
      that.sendloading = true;
      let res = await that.ctx.$api
        .guest_front_login_sendCode({
          phone: "+61" + that.username
        })
        .catch(err => {
          that.sendloading = false;
          that.sendtime = 59;
          console.log(err);
        });
      that.sendloading = false;
      if (res.code === 0) {
        that.ctx.$message.success(that.ctx.$t("common.smstip"));
        that.getCode();
        // that.loginSuccess(res);
      } else {
        that.ctx.$message.error(res.msg || that.ctx.$t("common.systemError"));
      }
    },
    getCode() {
      const TIME_COUNT = 60;
      if (!that.timer) {
        that.count = TIME_COUNT;
        that.showCode = false;
        that.timer = setInterval(() => {
          if (that.count > 0 && that.count <= TIME_COUNT) {
            that.count--;
          } else {
            that.showCode = true;
            clearInterval(that.timer);
            that.timer = null;
          }
        }, 1000);
      }
    },
    onGoogleSignInError(error) {
      that.ctx.$message.error("Login failed! " + error.error);
      this.fbloading = false;
      // `error` contains any error occurred.
      console.log("OH NOES", error);
    },
    show(ctx, cb) {
      that.cb = cb;
      that.ctx = ctx;
      setTimeout(() => {
        that.modal1Visible = true;
        setTimeout(() => {
          that.modal1Visible2 = true;
        }, 10);
      }, 20);
      return new Promise((resolve, reject) => {
        that.resolve = resolve;
        that.reject = reject;
      });
    },
    async loginsms() {
      if (!that.username) {
        that.ctx.$message.error(
          that.ctx.$t("components.loginModal.inputUserName")
        );
        return;
      }
      if (!that.sms) {
        that.ctx.$message.error(that.ctx.$t("components.loginModal.inputSms"));
        return;
      }
      that.loading = true;
      let res = await that.ctx.$api
        .guest_front_login_phone({
          phone: that.username,
          "auth-type": "web",
          code: that.sms,
          lon: Cookies.get("lon"),
          lat: Cookies.get("lat")
        })
        .catch(err => {
          that.loading = false;
        });
      that.loading = false;
      if (res.code === 0) {
        that.loginSuccess(res);
      } else {
        that.ctx.$message.error(res.msg || that.ctx.$t("common.systemError"));
      }
    },
    async login() {
      if (!that.username) {
        that.ctx.$message.error(
          that.ctx.$t("components.loginModal.inputUserName")
        );
        return;
      }
      if (!that.password) {
        that.ctx.$message.error(that.ctx.$t("components.loginModal.inputPwd"));
        return;
      }
      that.loading = true;
      let res = await that.ctx.$api
        .guest_front_login_username({
          username: that.username,
          "auth-type": "web",
          password: md5(that.password)
        })
        .catch(err => {
          that.loading = false;
        });
      that.loading = false;
      if (res.code === 0) {
        that.loginSuccess(res);
      } else {
        that.ctx.$message.error(res.msg || that.ctx.$t("common.systemError"));
      }
    },
    async loginSuccess(res) {
      that.ctx.$utils.loginSuccess(res, that.ctx, () => {
        location.reload();
        that.modal1Visible = false;
        that.afterClose();
      });
    },
    setLoginType(type) {
      let a = that.loginType;
      that.loginType = type;
      that.lastType = a;
    },
    saveLastType() {
      that.loginType = "kj";
    },
    afterClose() {
      that.modal1Visible = false;
      that.modal1Visible2 = false;
      that.hideModal();
      that.loginType = "kj";
    },
    hideModal() {
      typeof that.cb === "function" && that.cb();
      document.body.removeChild(that.$el);
      that.$destroy();
    },
    cancel() {
      that.reject();
      that.hideModal();
    },
    setModal1Visible(modal1Visible) {
      that.modal1Visible = modal1Visible;
    }
  }
};
