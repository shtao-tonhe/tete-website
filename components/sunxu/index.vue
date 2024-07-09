<template>
  <a-form-model
    ref="dynamicValidateForm"
    :model="dynamicValidateForm"
    v-bind="formItemLayout"
  >
    <a-form-model-item v-bind="formItemLayoutWithOutLabel">
      <a-alert :message="$t('page.sunxu')" type="warning" closable />
    </a-form-model-item>
    <div
      v-for="(domain, index) in dynamicValidateForm.domains"
      :key="domain.key"
    >
      <a-form-model-item
        v-bind="formItemLayoutWithOutLabel"
        :prop="'domains.' + index + '.min_num'"
        label="起始人数"
        :label-col="{ span: 5 }"
        :style="{ display: 'inline-block', width: '30%' }"
        :rules="{
          required: true,
          message: 'The input box cannot be empty',
          trigger: 'blur',
        }"
      >
        <a-input
          disabled
          style="width: calc(100% - 25.5px)"
          v-model="domain.min_num"
          placeholder="Minimum number of people"
        />
        <span
          :style="{
            display: 'inline-block',
            width: '25.5px',
            textAlign: 'center',
          }"
        >
          ~
        </span>
      </a-form-model-item>

      <a-form-model-item
        :label-col="{ span: 5 }"
        label="结束人数"
        :style="{ display: 'inline-block', width: 'calc(30%)' }"
        v-bind="formItemLayoutWithOutLabel"
        :prop="'domains.' + index + '.max_num'"
        :rules="ruleList1"
      >
        <a-input
          style="width: calc(100% - 30px)"
          :disabled="
            dynamicValidateForm.domains.length > 1 &&
            index !== dynamicValidateForm.domains.length - 1
          "
          v-model="domain.max_num"
          placeholder="Maximum number of people"
        />
        <span
          :style="{
            display: 'inline-block',
            width: '25.5px',
            textAlign: 'center',
          }"
        >
          =>
        </span>
      </a-form-model-item>

      <a-form-model-item
        :label-col="{ span: 5 }"
        :style="{
          display: 'inline-block',
          width: '30%',
        }"
        label="点数"
        v-bind="formItemLayoutWithOutLabel"
        :prop="'domains.' + index + '.reward_integral'"
        :rules="ruleList2"
      >
        <a-input
          style="width: calc(100% - 40px)"
          v-model="domain.reward_integral"
          placeholder="Reward Points"
        />
        <a-icon
          v-if="
            dynamicValidateForm.domains.length > 1 &&
            index === dynamicValidateForm.domains.length - 1
          "
          class="dynamic-delete-button"
          type="minus-circle-o"
          :disabled="dynamicValidateForm.domains.length === 1"
          @click="removeDomain(domain)"
        />
      </a-form-model-item>
    </div>

    <a-form-model-item v-bind="formItemLayoutWithOutLabel">
      <a-button type="dashed" style="width: 20%" @click="addDomain">
        <a-icon type="plus" /> Add
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
export default {
  props: {
    activeKey: {
      type: String,
      default: "2",
    },
  },
  data() {
    return {
      ruleList1: [
        {
          required: true,
          message: "The input box cannot be empty",
          trigger: "blur",
        },
        {
          trigger: "blur",
          validator: this.ruleListFunc1,
        },
      ],
      ruleList2: [
        {
          required: true,
          message: "The input box cannot be empty",
          trigger: "blur",
        },
        {
          trigger: "blur",
          validator: this.ruleListFunc2,
        },
      ],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 24, offset: 0 },
        },
      },
      dynamicValidateForm: {
        domains: [
          {
            min_num: 1,
            max_num: "",
            reward_integral: "",
          },
        ],
      },
    };
  },
  methods: {
    ruleListFunc1(rule, value, callback) {
      console.log(rule.field.split(".")[1], value);
      const reg = /^[1-9][0-9]*$/;
      if (!reg.test(value)) {
        callback("illegal value");
      } else if (
        Number(
          this.dynamicValidateForm.domains[rule.field.split(".")[1]].min_num
        ) >= Number(value)
      ) {
        callback(this.$t("page.pleaseEnterNumber"));
      } else {
        callback();
      }
    },
    ruleListFunc2(rule, value, callback) {
      const reg = /^[0-9][0-9]*$/;
      if (!reg.test(value)) {
        callback(this.$t("page.pleaseEnterNumber"));
      } else {
        callback();
      }
    },
    submitForm(formName) {
      return new Promise((resolve) => {
        let arr = [];
        this.$refs[formName].validate((valid) => {
          if (valid) {
            arr = this.dynamicValidateForm.domains.map((item) => {
              item.mode = this.activeKey;
              return item;
            });
          } else {
            arr == [];
          }
          resolve(arr);
        });
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dynamicValidateForm.domains = [
        {
          min_num: 1,
          max_num: "",
          reward_integral: "",
        },
      ];
    },
    removeDomain(item) {
      let index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.$refs.dynamicValidateForm.validate((valid) => {
        if (valid) {
          this.dynamicValidateForm.domains.push({
            min_num:
              Number(
                this.dynamicValidateForm.domains[
                  this.dynamicValidateForm.domains.length - 1
                ].max_num
              ) + 1,
            max_num:
              Number(
                this.dynamicValidateForm.domains[
                  this.dynamicValidateForm.domains.length - 1
                ].max_num
              ) + 2,
            reward_integral: "",
          });
        }
      });
    },
  },
};
</script>
<style>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  margin-left: 10px;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
