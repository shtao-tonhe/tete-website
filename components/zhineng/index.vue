<!--
 * @Author: your name
 * @Date: 2020-11-22 13:15:30
 * @LastEditTime: 2020-11-23 09:43:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/components/zhineng/index.vue
-->
<template>
  <div>
    <a-form
      :form="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 19 }"
      @submit="handleSubmit"
    >
      <a-form-model-item>
        <a-alert
          :message="$t('page.zhineng')"
          type="warning"
          closable
        />
      </a-form-model-item>
      <a-form-item
        label="playback times"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 19 }"
      >
        <a-input
          placeholder="Please enter the number of times to play!"
          v-decorator="[
            'number_player',
            {
              rules: [
                {
                  required: true,
                  message: 'Please enter the number of times to play!',
                  validator: this.ruleListFunc1,
                },
                {},
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item
        label="point"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 19 }"
      >
        <a-input
          v-decorator="[
            'reward_integral',
            {
              rules: [
                {
                  required: true,
                  message: 'Please enter the number of points available!',
                  validator: this.ruleListFunc2,
                },
              ],
            },
          ]"
          placeholder="Please enter the number of points available!"
        />
      </a-form-item>
      <!-- <a-form-item :wrapper-col="{ span: 19, offset: 5 }">
        <a-button type="primary" html-type="submit"> Submit </a-button>
      </a-form-item> -->
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
    };
  },
  props: {
    activeKey: {
      type: String,
      default: "1",
    },
  },
  methods: {
    ruleListFunc1(rule, value, callback) {
      console.log(value);
      const reg = /^[1-9][0-9]*$/;
      if (!reg.test(value)) {
        callback(this.$t("page.pleaseEnterNumber"));
      } else {
        callback();
      }
    },
    ruleListFunc2(rule, value, callback) {
      console.log(value);
      const reg = /^[1-9][0-9]*$/;
      if (!reg.test(value)) {
        callback(this.$t("page.pleaseEnterNumber"));
      } else {
        callback();
      }
    },
    handleSubmit() {
      return new Promise((resolve) => {
        let arr = [];
        this.form.validateFields((valid, values) => {
          if (!valid) {
            arr = [{ ...values, mode: this.activeKey }];
          } else {
            arr == [];
          }
          resolve(arr);
        });
      });
    },
  },
};
</script>

<style lang="less">
</style>
