<!--
 * @Author: your name
 * @Date: 2020-11-19 14:03:03
 * @LastEditTime: 2020-12-23 23:17:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/pages/user/index.vue
-->
<template>
  <div class="">
    <div data-v-05334a82="" class="account-settings-info-title">
      <span data-v-05334a82=""
        >{{ $t("page.personalData") }}
        <a-button @click="$router.go(-1)" class="btn-white fr">
          Back
        </a-button>
        <a-button
          @click="handleSubmit"
          :loading="loading"
          :disabled="!showData"
          class="btn-danger fr"
          type="danger"
        >
          Save
        </a-button>
      </span>
    </div>
    <div v-show="showData">
      <a-row class="" type="flex" justify="center">
        <input
          id="uploadFileInput"
          type="file"
          ref="upload"
          v-show="false"
          value=""
          @change="upload"
          accept="image/png,image/jpeg"
        />

        <a-modal
          title="upload avatar"
          v-model="modal1Visible"
          @ok="finish"
          :confirmLoading="loading"
        >
          <div class="cropper-content">
            <div class="cropper" style="text-align: center">
              <vueCropper
                ref="cropper"
                :img="option.img"
                :outputSize="option.size"
                :outputType="option.outputType"
                :info="true"
                :full="option.full"
                :autoCropWidth="option.autoCropWidth"
                :autoCropHeight="option.autoCropHeight"
                :canMove="option.canMove"
                :canMoveBox="option.canMoveBox"
                :original="option.original"
                :autoCrop="option.autoCrop"
                :fixed="option.fixed"
                :fixedNumber="option.fixedNumber"
                :centerBox="option.centerBox"
                :infoTrue="option.infoTrue"
                :fixedBox="option.fixedBox"
                :mode="option.mode"
              >
              </vueCropper>
            </div>
          </div>
        </a-modal>
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" :xll="12">
          <a-form labelAlign="right" :form="form">
            <div class="upload-avatar">
              <div class="avatar-uploader" @click="uploadFile">
                <a-avatar icon="user" :size="120" :src="imageUrl"> </a-avatar>
                <a-icon
                  class="icon-avatar"
                  type="plus"
                />
              </div>
            </div>
            <a-form-item v-bind="formItemLayout" label="E-mail">
              <a-input
                v-decorator="[
                  'email',
                  {
                    rules: [
                      {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                      },
                      {
                        required: true,
                        message: 'Please input your E-mail!',
                      },
                    ],
                  },
                ]"
              />
            </a-form-item>
            <a-form-item v-bind="formItemLayout">
              <span slot="label">
                Nickname&nbsp;
                <a-tooltip title="What do you want others to call you?">
                  <a-icon type="question-circle-o" />
                </a-tooltip>
              </span>
              <a-input
                v-decorator="[
                  'nickname',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your nickname!',
                        whitespace: true,
                      },
                    ],
                  },
                ]"
              />
            </a-form-item>
            <a-form-item v-bind="formItemLayout">
              <span slot="label"> gender </span>
              <a-radio-group
                @change="onChange1"
                :options="plainOptions"
                v-decorator="[
                  'sex',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Please select your sex!',
                        whitespace: true,
                      },
                    ],
                  },
                ]"
              ></a-radio-group>
            </a-form-item>

            <a-form-item v-bind="formItemLayout">
              <span slot="label"> birthday </span>
              <a-date-picker
                style="width: 100%"
                v-decorator="['birthday', config]"
              />
            </a-form-item>

            <a-form-item v-bind="formItemLayout" label="Phone Number">
              <a-input
                v-decorator="[
                  'phone',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your phone number!',
                      },
                    ],
                  },
                ]"
                style="width: 100%"
              >
                <a-select
                  slot="addonBefore"
                  v-decorator="['prefix', { initialValue: '61' }]"
                  style="width: 70px"
                >
                  <a-select-option value="61"> +61 </a-select-option>
                </a-select>
              </a-input>
            </a-form-item>

            <a-form-item v-bind="formItemLayout">
              <span slot="label"> {{$t('page.userDesc')}} </span>
              <a-textarea
                @change="onChange"
                v-decorator="[
                  'desc',
                  {
                    rules: [
                      {
                        required: false,
                        message: 'Please input your desc!',
                        whitespace: true,
                      },
                    ],
                  },
                ]"
              />
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
    </div>
    <a-skeleton v-show="!showData" active :paragraph="{ rows: 4 }" />
  </div>
</template>

<script src="./index.js">
</script>
<style lang="less">
@import "./index.less";
</style>
