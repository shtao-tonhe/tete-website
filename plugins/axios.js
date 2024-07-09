/*
 * @Author: your name
 * @Date: 2020-10-18 11:33:43
 * @LastEditTime: 2021-01-10 08:37:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nuxt-juejin-project/plugins/axios.js
 */
export default function({ app: { $axios, $cookies, context } }) {
  $axios.defaults.baseURL = process.env.baseUrl;
  $axios.defaults.timeout = 30000;
  $axios.interceptors.request.use(config => {
    config.headers["auth-type"] = "web";
    config.headers["token"] = $cookies.get("token") || "";
    config.headers["lon"] = $cookies.get("lon") || "";
    config.headers["lat"] = $cookies.get("lat") || "";
    config.headers["X-Uid"] = $cookies.get("userId") || "";
    if (
      config.params &&
      config.params.searchParam &&
      config.params.searchParam.length > 0
    ) {
      let params = config.url + "?";
      if (
        Object.prototype.toString.call(config.params.searchParam) ===
        "[object Array]"
      ) {
        for (let i = 0; i < config.params.searchParam.length; i++) {
          for (const key in config.params.searchParam[i]) {
            if (
              Object.prototype.toString.call(config.params.searchParam[key]) ===
              "[object Array]"
            ) {
              for (let j = 0; j < config.params.searchParam[key].length; j++) {
                params =
                  params +
                  `searchParam[${i}][${key}]=${encodeURIComponent(
                    config.params.searchParam[key][j]
                  )}&`;
              }
            } else {
              params =
                params +
                `searchParam[${i}][${key}]=${encodeURIComponent(
                  config.params.searchParam[i][key]
                )}&`;
            }
          }
        }
      }
      delete config.params.searchParam;
      config.url = params;
      return config;
    }

    return config;
  });
  $axios.interceptors.response.use(response => {
    if (response.data.code === 403) {
      context.$utils.removeAuthInfo(context, true);
      context.$router.push("/foryou");
      return;
    }
    if (/^[4|5]/.test(response.status)) {
      return Promise.reject(response.statusText);
    }
    return response.data;
  });
}
