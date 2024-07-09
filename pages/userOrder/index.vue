<!--
 * @Author: your name
 * @Date: 2020-12-11 20:56:02
 * @LastEditTime: 2021-01-30 16:43:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/pages/qrcodeMng/index.vue
-->
<template>
  <div class="min-height400">
    <div data-v-05334a82="" class="account-settings-info-title">
      <span data-v-05334a82=""
        >{{ $t("page.orderMng") }}
        <a-button @click="$router.go(-1)" class="btn-white fr"> Back </a-button>
        <!-- <a-button
          @click="showVisible('add')"
          class="btn-danger fr"
          type="danger"
        >
          Add
        </a-button> -->
      </span>
    </div>
    <a-table
      size="small"
      :columns="columns"
      v-if="showData"
      :data-source="dataList"
      :scroll="{ x: 1000, y: 500 }"
    >

      <span slot="action" slot-scope="text, record" :key="record.id">
        <a
          v-if="record.status === 1"
          class="deltips"
          @click="visibleShow(record.id)"
          >deliver goods</a
        >
      </span>

      <a-tooltip slot="thumbnail" slot-scope="text, record">
        <template slot="title"> {{ $t("page.lookGoods") }} </template>
        <span @click="showQrcode(record)">
          <a-avatar shape="square" :src="(record && record.thumbnail) || ''" />
        </span>
      </a-tooltip>
    </a-table>
    <a-skeleton v-else active :paragraph="{ rows: 4 }" />
    <a-modal v-model="showQr" :title="$t('page.lookGoods')" :footer="null">
      <div class="text-center">
        <a-avatar
          shape="square"
          class="avatar-img"
          :src="(qrItem && qrItem.thumbnail) || ''"
        />
      </div>
    </a-modal>
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
      :title="$t('page.goodsDrive')"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleSubmit"
      @cancel="visible = false"
    >
      <a-form
        :form="form"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 17 }"
        @submit="handleSubmit"
      >
        <a-form-item :label="$t('page.goodsDesc')">
          <a-input
            type="textarea"
            :rows="5"
            :placeholder="$t('page.pleaseEnter')"
            v-decorator="[
              'remarks',
              {
                rules: [{ required: true, message: $t('page.pleaseEnter') }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item v-show="false">
          <a-input :placeholder="$t('page.pleaseEnter')" v-decorator="['id']" />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      title="upload"
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
  </div>
</template>

<script src="./index.js">
export default {};
</script>

<style lang="less" scoped>
.avatar-img {
  width: 100%;
  height: 250px;
}
.deltips {
  color: #fe2c55;
  margin-right: 10px;
}
.min-height400 {
  min-height: 500px;
  min-width: 600px;
}
</style>
