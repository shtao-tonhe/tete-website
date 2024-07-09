<!--
 * @Author: your name
 * @Date: 2020-11-22 13:15:30
 * @LastEditTime: 2020-11-27 22:10:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/components/zhineng/index.vue
-->
<template>
  <div>
    <a-modal
      title="Select location"
      width="750px"
      v-model="visible"
      @ok="handleOk"
    >
      <googleMap @showMapData="showMapData"></googleMap>
    </a-modal>

    <a-form
      :form="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 19 }"
      @submit="submitForm"
    >
      <a-form-model-item>
        <a-alert
          v-if="activeKey === '4'"
          :message="$t('page.locatuonupload')"
          type="warning"
          closable
        />
        <a-alert
          v-if="activeKey === '5'"
          :message="$t('page.locat_tim')"
          type="warning"
          closable
        />
      </a-form-model-item>
      <a-form-item
        v-if="activeKey === '4'"
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
                  validator: this.ruleListFunc1,
                },
              ],
            },
          ]"
          placeholder="Please enter the number of points available!"
        />
      </a-form-item>

      <a-form-item
        :label="$t('page.push_lon')"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 19 }"
      >
        <a-input
          disabled
          :placeholder="$t('page.pleaseEnter')"
          v-decorator="[
            'push_lon',
            {
              rules: [
                {
                  required: true,
                  message: 'Please enter the number of times to play!',
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item
        :label="$t('page.push_lat')"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 19 }"
      >
        <a-input
          disabled
          :placeholder="$t('page.pleaseEnter')"
          v-decorator="[
            'push_lat',
            {
              rules: [
                {
                  required: true,
                  message: 'Please enter the number of times to play!',
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item
        :label="$t('page.push_position_name')"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 19 }"
      >
        <a-input
          :placeholder="$t('page.pleaseEnter')"
          v-decorator="[
            'push_position_name',
            {
              rules: [
                {
                  required: true,
                  message: 'Please enter the number of times to play!',
                },
              ],
            },
          ]"
        />
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 19, offset: 5 }">
        <a-button @click="showModal" type="primary"> Select location </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import googleMap from "@/components/googleMap/index.vue";
export default {
  components: {
    googleMap,
  },
  props: {
    activeKey: {
      type: String,
      default: "4",
    },
  },
  data() {
    return {
      visible: false,
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
    };
  },
  methods: {
    ruleListFunc1(rule, value, callback) {
      const reg = /^[0-9][0-9]*$/;
      if (!reg.test(value)) {
        callback(this.$t("page.pleaseEnterNumber"));
      } else {
        callback();
      }
    },
    showMapData(obj) {
      this.obj = obj;
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.visible = false;
      this.form.setFieldsValue({
        push_lon: this.obj.lng,
        push_lat: this.obj.lat,
        push_position_name: this.obj.address,
      });
    },

    submitForm(formName) {
      return new Promise((resolve) => {
        let arr = {};
        this.form.validateFields((valid, value) => {
          console.log(value);
          if (!valid) {
            arr = {
              list: [
                {
                  reward_integral: value.reward_integral,
                  mode: this.activeKey,
                },
              ],
              value,
            };
          } else {
            arr = {};
          }
          resolve(arr);
        });
      });
    },
    handleSelectChange(value) {
      console.log(value);
      this.form.setFieldsValue({
        note: `Hi, ${value === "male" ? "man" : "lady"}!`,
      });
    },
  },
};
</script>

<style lang="less">
</style>
