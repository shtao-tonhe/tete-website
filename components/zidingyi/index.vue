<!--
 * @Author: your name
 * @Date: 2020-11-03 15:11:34
 * @LastEditTime: 2020-11-23 14:14:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/components/videoOne/index.vue
-->
<template>
  <div>
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
      <a-form-model-item>
        <a-alert :message="$t('page.userTagData')" type="warning" closable />
      </a-form-model-item>
      <a-form-item
        label="point"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 19 }"
      >
        <a-input
          placeholder="Please enter the number of points available!"
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
        />
      </a-form-item>
      <a-divider orientation="left">
        {{ $t("page.userTaguserTag") }}
      </a-divider>
      <a-form-item
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
        :label="$t('page.age')"
      >
        <a-col :span="24">
          <a-select
            mode="multiple"
            :placeholder="$t('page.pleaseSelect')"
            :value="changeCheckboxList2"
            style="width: 100%"
            @change="changeCheckbox2"
          >
            <a-select-option :key="index2" v-for="(item2, index2) in 100">
              {{ item2 }}
            </a-select-option>
          </a-select>
        </a-col>
      </a-form-item>
      <div v-if="userTagList && userTagList.length > 0">
        <div :key="index" v-for="(item, index) in userTagList">
          <a-form-item
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 20 }"
            v-if="item.children && item.children.length > 0"
            :label="item.name"
          >
            <a-col
              :span="6"
              :key="index2"
              v-for="(item2, index2) in item.children"
            >
              <a-checkbox
                :defaultChecked="item2.checked"
                name="1xxx"
                @change="changeCheckbox"
                :value="item2.id + ''"
              >
                {{ item2.name }}
              </a-checkbox>
            </a-col>
          </a-form-item>
        </div>
      </div>
      <a-skeleton v-else active />
    </a-form>
  </div>
</template>

<script>
export default {
  props: {
    activeKey: {
      type: String,
      default: "6",
    },
  },
  data() {
    return {
      userTagList: [],
      changeCheckboxList: [],
      changeCheckboxList2: [],
      form: this.$form.createForm(this, { name: "coordinated" }),
    };
  },
  mounted() {
    this.front_tag_getlist();
  },
  methods: {
    ruleListFunc2(rule, value, callback) {
      console.log(value);
      const reg = /^[1-9][0-9]*$/;
      if (!reg.test(value)) {
        callback(this.$t("page.pleaseEnterNumber"));
      } else {
        callback();
      }
    },
    changeCheckbox2(changeCheckboxList2) {
      this.changeCheckboxList2 = changeCheckboxList2;
    },
    changeCheckbox(e) {
      if (e.target.checked) {
        this.changeCheckboxList = [...this.changeCheckboxList, e.target.value];
      } else {
        this.changeCheckboxList = this.changeCheckboxList.filter((item) => {
          return item !== e.target.value;
        });
      }
    },
    submitForm(formName) {
      return new Promise((resolve) => {
        let arr = [];

        this.form.validateFields((valid, values) => {
          console.log(values);
          if (!valid) {
            if (
              this.changeCheckboxList.length > 0 ||
              this.changeCheckboxList2.length > 0
            ) {
              for (
                let index = 0;
                index < this.changeCheckboxList.length;
                index++
              ) {
                const element = this.changeCheckboxList[index];
                arr.push({
                  mode: this.activeKey,
                  reward_integral: values.reward_integral,
                  val: element,
                });
              }

              for (
                let index = 0;
                index < this.changeCheckboxList2.length;
                index++
              ) {
                const element = this.changeCheckboxList2[index];
                arr.push({
                  mode: this.activeKey,
                  reward_integral: values.reward_integral,
                  age: element,
                });
              }
              resolve(arr);
            } else {
              this.$message.error(this.$t("page.selectuserTag"));
              resolve(arr);
            }
          } else {
            resolve(arr);
          }
        });
      });
    },

    async front_tag_getlist() {
      let res = await this.$api.front_tag_getlist().catch((err) => {});
      if (res.code === 0) {
        this.userTagList = res.data;
      } else {
        this.$message.error(res.msg || this.$t("common.systemError"));
      }
    },
  },
};
</script>

<style  scoped>
.ant-form-item {
  margin-bottom: 0;
}
</style>
