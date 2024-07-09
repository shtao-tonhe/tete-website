/*
 * @Author: your name
 * @Date: 2020-10-13 12:30:07
 * @LastEditTime: 2021-01-30 16:33:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nuxt-juejin-project/pages/foryou/index.js
 */
import foryou from "~/components/foryou/index.vue";
export default {
  components: {
    foryou
  },
  layout: "foryou",
  async asyncData({ app, store, route }) {
    let id = "";
    if (route.query && route.query.id) {
      id = route.query.id;
    }
    let res = await app.$api.front_main_recommendVideo({
      id
    });
    let item = {};
    if (res && res.data && res.data.data && res.data.data.length > 0) {
      item = res.data.data[0];
    }
    return {
      item
    };
  },
  // // 设置seo
  head() {
    return this.getHeader();
  },
  methods: {
    getHeader() {
      return {
        meta: [
          {
            property: "og:title",
            content: (this.item && this.item.title) || "TETE"
          },
          {
            property: "og:type",
            content: "website"
          },
          {
            property: "fb:app_id",
            content: "2804752129798185"
          },

          {
            property: "og:description",
            content: (this.item && this.item.describe) || "TETE"
          },
          {
            property: "og:image:width",
            content: (this.item && this.item.width) || "200"
          },
          {
            property: "og:image:type",
            content: "image/jpeg"
          },

          {
            property: "og:image:height",
            content: (this.item && this.item.height) || "200"
          },
          {
            property: "og:image",
            content: this.item.cover && this.item.cover
          },
          {
            property: "og:image:secure_url",
            content: this.item.cover && this.item.cover
          },
          {
            property: "og:site_name",
            content: "TETE"
          },
          {
            property: "og:url",
            content: this.global.domain + "/foryou?id=" + this.item.id
          },
          {
            property: "og:image:alt",
            content: (this.item && this.item.title) || "TETE"
          }
        ]
      };
    }
  }
};
