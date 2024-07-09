<!--
 * @Author: your name
 * @Date: 2020-11-19 14:03:03
 * @LastEditTime: 2020-12-23 23:09:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/pages/user/index.vue
-->
<template>
  <div class="">
    <div data-v-05334a82="" class="account-settings-info-title">
      <span data-v-05334a82=""
        >{{ $t("page.likesetting") }}
        <a-button @click="$router.go(-1)" class="btn-white fr">
          Back
        </a-button>
        <a-button @click="handleSubmit" class="btn-danger fr" :loading="loading" :disabled="!showData" type="danger">
          Save
        </a-button>
      </span>
    </div>
    <div v-if="showData">
      <a-row class="" type="flex">
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" :xll="12">
          <a-form labelAlign="right" :form="form" @submit="handleSubmit">
            <div :key="index" v-for="(item, index) in userTagList">
              <a-form-item
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
                v-if="item.children && item.children.length > 0"
                :label="item.name"
              >
                <a-row>
                  <a-col
                    :span="8"
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
                </a-row>
              </a-form-item>
            </div>
          </a-form>
        </a-col>
      </a-row>
    </div>
    <a-skeleton v-else active :paragraph="{ rows: 4 }" />
  </div>
</template>

<script src="./index.js">
</script>
<style lang="less">
@import "./index.less";
</style>
