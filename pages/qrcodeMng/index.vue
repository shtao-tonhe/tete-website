<!--
 * @Author: your name
 * @Date: 2020-12-11 20:56:02
 * @LastEditTime: 2021-02-03 14:40:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/pages/qrcodeMng/index.vue
-->
<template>
  <div class="min-height400">
    <div data-v-05334a82="" class="account-settings-info-title">
      <span data-v-05334a82=""
        >{{ $t("page.qrCodeMng") }}
        <a-button @click="$router.go(-1)" class="btn-white fr"> Back </a-button>
        <a-button @click="showVisible" class="btn-danger fr" type="danger">
          Add
        </a-button>
      </span>
    </div>
    <a-table
      size="small"
      :columns="columns"
      v-if="showData"
      :data-source="dataList"
      :scroll="{ x: 1500, y: 500 }"
    >
      <span slot="action" slot-scope="text, record" :key="record.id">
        <a-popconfirm
          title="Are you sure delete this?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="front_qrcode_del(record.id)"
        >
          <a class="deltips">Delete</a>
        </a-popconfirm>
        <a
          class="deltips"
          :href="record.path"
          download="teteQrCode.png"
          >Download</a
        >
      </span>
      <!-- <a-popconfirm
        slot="action"
        title="Are you sure download this?"
        ok-text="Yes"
        cancel-text="No"
        slot-scope="text, record"
        @confirm="download(record.path)"
      >
        <a class="deltips">download</a>
      </a-popconfirm> -->
      <a-tooltip slot="path" slot-scope="text, record">
        <template slot="title"> {{ $t("page.lookQrcode") }} </template>
        <span @click="showQrcode(record)">
          <a-avatar shape="square" :src="record.path" />
        </span>
      </a-tooltip>
    </a-table>
    <a-skeleton v-else active :paragraph="{ rows: 4 }" />
    <a-modal v-model="showQr" :title="$t('page.lookQrcode')" :footer="null">
      <div class="text-center">
        <a-avatar
          shape="square"
          :size="250"
          :src="qrItem.path"
        />
      </div>
    </a-modal>
    <a-modal
      :title="$t('page.addQrCode')"
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
        <a-form-item label="title">
          <a-input
            :placeholder="$t('page.pleaseEnter')"
            v-decorator="[
              'title',
              {
                rules: [{ required: true, message: $t('page.pleaseEnter') }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item :label="$t('page.adsqrpoint')">
          <a-input
            :placeholder="$t('page.pleaseEnter')"
            v-decorator="[
              'total_integral',
              {
                rules: [
                  {
                    required: true,
                    message: $t('page.pleaseEnter'),
                  },
                  { validator: this.ruleListFunc1 },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item :label="$t('page.adsqrOne')">
          <a-input
            :placeholder="$t('page.pleaseEnter')"
            v-decorator="[
              'integral',
              {
                rules: [
                  {
                    required: true,
                    message: $t('page.pleaseEnter'),
                    validator: this.ruleListFunc2,
                  },
                ],
              },
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js">
export default {};
</script>

<style lang="less" scoped>
.deltips {
  color: #fe2c55;
  margin-right: 10px;
}
.min-height400 {
  min-height: 500px;
  min-width: 600px;
}
</style>
