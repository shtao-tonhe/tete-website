<!--
 * @Author: your name
 * @Date: 2020-12-11 20:56:02
 * @LastEditTime: 2021-01-30 16:45:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/pages/qrcodeMng/index.vue
-->
<template>
  <div class="min-height400">
    <div data-v-05334a82="" class="account-settings-info-title">
      <span data-v-05334a82=""
        >{{ $t("page.goods") }}
        <a-button @click="$router.go(-1)" class="btn-white fr">
          Back
        </a-button>
        <a-button
          @click="showVisible('add')"
          class="btn-danger fr"
          type="danger"
        >
          Add
        </a-button>
        <a-button
          :disabled="!selectOne"
          @click="front_order_create"
          :loading="loadingBuy"
          class="btn-danger fr"
          type="danger"
        >
          Buy
        </a-button>
      </span>
    </div>
    <a-table
      :pagination="pagination"
      @change="changepage"
      size="small"
      :columns="columns"
      :data-source="dataList"
      :scroll="{ x: 1000, y: 500 }"
    >
      <span slot="action" slot-scope="text, record" :key="record.id">
        <a class="deltips" @click="showVisible('edit', record)">Edit</a>
        <a-popconfirm
          title="Are you sure delete this?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="front_goods_del(record.id)"
        >
          <a class="deltips">Delete</a>
        </a-popconfirm>
      </span>
      <a-tooltip slot="thumbnail" slot-scope="text, record">
        <template slot="title"> {{ $t("page.lookGoods") }} </template>
        <span @click="showQrcode(record)">
          <a-avatar
            shape="square"
            :src="
              record &&
              record.thumbnail || ''
            "
          />
        </span>
      </a-tooltip>
    </a-table>
    <div v-if="showData">
      <div class="gutter-example">
        <a-row :gutter="16">
          <a-col
            v-for="(item, index) in dataList"
            :key="'goods' + index"
            class="gutter-row active"
            :xs="24"
            :sm="24"
            :md="8"
            :lg="8"
            :xl="6"
            :xll="8"
          >
            <a-card
              @click="selectOneFunc(item)"
              hoverable
              style="width: 100%"
              class="one"
              :class="selectOne === item.id ? 'active' : ''"
            >
              <div slot="cover" class="imgCover">
                <div class="img" v-lazy:background-image="item.thumbnail"></div>
              </div>
              <a-card-meta :title="item.title">
                <template slot="description">${{ item.integral }}TB </template>
              </a-card-meta>
            </a-card>
          </a-col>
        </a-row>
      </div>
      <div class="pageBox">
        <a-pagination
          @change="onChange"
          :defaultPageSize="perPage"
          :total="pagination.total"
        />
      </div>
    </div>
    <a-skeleton active :paragraph="{ rows: 4 }" />
    <a-modal v-model="showQr" :title="$t('page.lookGoods')" :footer="null">
      <div class="text-center">
        <a-avatar
          shape="square"
          class="avatar-img"
          :src="
            qrItem &&
            qrItem.thumbnail || ''
          "
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
      :title="AddType === 'edit' ? $t('page.editGoods') : $t('page.addGoods')"
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
        <a-form-item :label="$t('page.goodsThumbnail')">
          <div class="">
            <div class="avatar-uploader" @click="uploadFile">
              <a-avatar icon="plus" shape="square" :size="60" :src="imageUrl">
              </a-avatar>
            </div>
          </div>
        </a-form-item>
        <a-form-item :label="$t('page.goodstitle')">
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
        <a-form-item :label="$t('page.goodsStatus')">
          <a-select
            @change="handleChange2"
            v-decorator="[
              'status',
              {
                rules: [{ required: true, message: $t('page.pleaseSelect') }],
              },
            ]"
          >
            <a-select-option value="1"> on shelf </a-select-option>
            <a-select-option value="2"> off shelf </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="$t('page.goodsPrice')">
          <a-input
            :placeholder="$t('page.pleaseEnter')"
            v-decorator="[
              'integral',
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
.gutter-row {
  margin-top: 20px;
  .one {
    border: 1px solid #e8e8e8;
  }
  .active {
    border: 1px solid #1890ff;
  }
}
.gutter-example {
  padding-bottom: 20px;
}
.imgCover {
  width: 100%;
  height: 200px;
  background-color: #e5e5e5;
  overflow: hidden;
  background-size: 100% 100%;
  .img {
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
  }
}
.pageBox {
  text-align: center;
}
</style>
