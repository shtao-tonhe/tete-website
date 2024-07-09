<template>
  <a-form-model
    ref="dynamicValidateForm"
    :model="dynamicValidateForm"
    v-bind="formItemLayout"
  >
    <a-form-model-item
      v-if="activeKey === '3'"
      v-bind="formItemLayoutWithOutLabel"
    >
      <a-alert :message="$t('page.timeupload')" type="warning" closable />
    </a-form-model-item>
    <div
      v-for="(domain, index) in dynamicValidateForm.domains"
      :key="domain.key"
    >
      <a-form-model-item
        v-bind="formItemLayoutWithOutLabel"
        :prop="'domains.' + index + '.start_time'"
        :label="$t('page.start_time')"
        :label-col="{ span: 5 }"
        :style="{ display: 'inline-block', width: '30%' }"
        :rules="ruleList1"
      >
        <a-select
          v-model="domain.start_time"
          placeholder="Minimum number of people"
          style="width: calc(100% - 25.5px)"
          :disabled="
            dynamicValidateForm.domains.length > 1 &&
            index !== dynamicValidateForm.domains.length - 1
          "
          @change="handleChange"
        >
          <a-select-option
            :key="index + 'h'"
            :value="item"
            v-for="(item, index) in getHour('start_time', index)"
          >
            {{ item }}
          </a-select-option>
        </a-select>
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
         :label="$t('page.end_time')"
        :style="{ display: 'inline-block', width: 'calc(30%)' }"
        v-bind="formItemLayoutWithOutLabel"
        :prop="'domains.' + index + '.end_time'"
        :rules="ruleList2"
      >
        <a-select
          @change="handleChange"
          :disabled="
            dynamicValidateForm.domains.length > 1 &&
            index !== dynamicValidateForm.domains.length - 1
          "
          v-model="domain.end_time"
          placeholder="Minimum number of people"
          style="width: calc(100% - 25.5px)"
        >
          <a-select-option
            :key="index + 'h'"
            :value="item"
            v-for="(item, index) in getHour('start_time', index)"
          >
            {{ item }}
          </a-select-option>
        </a-select>
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
        label="points"
        v-bind="formItemLayoutWithOutLabel"
        :prop="'domains.' + index + '.reward_integral'"
        :rules="ruleList3"
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

    <a-form-model-item
      v-if="
        dynamicValidateForm.domains[dynamicValidateForm.domains.length - 1]
          .end_time !== 23
      "
      v-bind="formItemLayoutWithOutLabel"
    >
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
      default: "3",
    },
  },
  data() {
    return {
      start: 0,
      ruleList1: [
        {
          required: true,
          message: "The input box cannot be empty",
          trigger: "change",
        },
        {
          trigger: "change",
          validator: this.ruleListFunc1,
        },
      ],
      ruleList2: [
        {
          required: true,
          message: "The input box cannot be empty",
          trigger: "change",
        },
        {
          trigger: "change",
          validator: this.ruleListFunc2,
        },
      ],
      ruleList3: [
        {
          required: true,
          message: "The input box cannot be empty",
          trigger: "blur",
        },
        {
          trigger: "blur",
          validator: this.ruleListFunc3,
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
            start_time: 0,
            end_time: 1,
            reward_integral: "",
          },
        ],
      },
    };
  },
  methods: {
    handleChange(start) {
      this.start = start;
    },
    getlength(start) {
      let arr = [];
      for (let index = 0; index < 24 - start; index++) {
        if (start === 0) {
          arr.push(index);
        } else {
          arr.unshift(23 - index);
        }
      }
      return arr;
    },
    getHour(type, index) {
      if (index === 0) {
        return this.getlength(0);
      } else {
        console.log(this.dynamicValidateForm.domains[index - 1].end_time);
        return this.getlength(
          this.dynamicValidateForm.domains[index - 1].end_time
        );
      }
    },
    ruleListFunc1(rule, value, callback) {
      this.$refs.dynamicValidateForm.clearValidate();
      const reg = /^[1-9][0-9]*$/;
      if (
        Number(
          this.dynamicValidateForm.domains[rule.field.split(".")[1]].end_time
        ) <= Number(value)
      ) {
        callback("Input error!");
      } else {
        callback();
      }
    },
    ruleListFunc2(rule, value, callback) {
      this.$refs.dynamicValidateForm.clearValidate();

      const reg = /^[1-9][0-9]*$/;
      if (
        Number(
          this.dynamicValidateForm.domains[rule.field.split(".")[1]].start_time
        ) >= Number(value)
      ) {
        callback("Input error!");
      } else {
        callback();
      }
    },
    ruleListFunc3(rule, value, callback) {
      const reg = /^[0-9][0-9]*$/;
      if (!reg.test(value)) {
        callback("illegal value");
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
          start_time: 1,
          end_time: "",
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
            start_time:
              Number(
                this.dynamicValidateForm.domains[
                  this.dynamicValidateForm.domains.length - 1
                ].end_time
              ) + 1,
            end_time:
              Number(
                this.dynamicValidateForm.domains[
                  this.dynamicValidateForm.domains.length - 1
                ].end_time
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
