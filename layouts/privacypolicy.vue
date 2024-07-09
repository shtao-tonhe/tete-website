<!--
 * @Author: your name
 * @Date: 2020-09-07 15:06:27
 * @LastEditTime: 2020-11-12 18:39:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tete/pages/index.vue
-->
<template>
  <div>
    <v-header></v-header>
    <div class="jsx-179283987 main-body2 page-with-header">
      <div class="jsx-3312377701 base-layout-container">
        <h3 class="jsx-1312845100 article-title">Legal</h3>
        <main class="jsx-3312377701 main-container">
          <aside class="jsx-2295492808 side-list-container">
            <ul class="jsx-2295492808 side-list-wrapper">
              <li
                v-for="(item, index) in OtherExtZH2"
                :key="index"
                :class="
                  $route.query && $route.query.name === item.query
                    ? 'active'
                    : ''
                "
              >
                <p>
                  <nuxt-link
                    replace
                    :to="`/privacy-policy?name=${item.query}`"
                    >{{ item.title }}</nuxt-link
                  >
                </p>
              </li>
            </ul>
          </aside>
          <nuxt />
        </main>
      </div>
    </div>
    <v-footer></v-footer>
    <backTop></backTop>
  </div>
</template>

<script>
import vHeader from "~/components/vHeader/index.vue";
import vFooter from "~/components/vFooter/index.vue";
import backTop from "~/components/backTop/index.vue";

export default {
  components: {
    vHeader,
    vFooter,
    backTop,
  },

  data() {
    return {
      OtherExtZH2: [],
    };
  },
  mounted() {
    this.getData();
  },

  methods: {
    async getData() {
      // 获奖案例
      let OtherExtZH2 = await this.$api.guest_OtherExt_getList({
        name: "LegalList",
      });

      if (
        OtherExtZH2 &&
        OtherExtZH2.data &&
        OtherExtZH2.data[0] &&
        OtherExtZH2.data[0].val
      ) {
        let val2 = JSON.parse(OtherExtZH2.data[0].val);
        OtherExtZH2 = val2;
        this.OtherExtZH2 = OtherExtZH2.sort((a, b) => {
          return a.sort - b.sort;
        });
      }
    },
  },
};
</script>
