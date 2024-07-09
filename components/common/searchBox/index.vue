<!--
 * @Author: your name
 * @Date: 2020-05-30 16:42:24
 * @LastEditTime: 2021-08-01 21:08:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /p2/components/vHeader/index.vue
-->
<template>
  <div v-if="modal1Visible">
    <a-modal
      destroyOnClose
      forceRender
      title="search video"
      v-model="modal1Visible2"
      :footer="null"
      @cancel="afterClose"
      @ok="() => (modal1Visible = false)"
    >
      <a-input-search
        v-model="changevalue"
        placeholder="input search text"
        @change="change"
      />
      <div class="all-box" v-if="searchList&&((searchList.hotList && searchList.hotList.length>0) || (searchList.newestList && searchList.newestList.length>0) || (searchList.list && searchList.list.length>0))">
        <div v-for="item in searchList.hotList" :key="item.id + 'hotList'">
          <div class="item-box2" @click="handleItem(item)">
            <div>{{ item.title }}</div>
            <div class="tag">Hot</div>
          </div>
        </div>
        <div
          v-for="item in searchList.newestList"
          :key="item.id + 'newestList'"
        >
          <div class="item-box2" @click="handleItem(item)">
            <div>{{ item.title }}</div>
            <div class="tag">newest</div>
          </div>
        </div>
        <div v-for="item in searchList.list" :key="item.id + 'list'">
          <div class="item-box2" @click="handleItem(item)">
            <div>{{ item.title }}</div>
          </div>
        </div>
      </div>
      <div class="all-box" v-else>
        <a-empty />
      </div>
      <!-- <a-form
        :form="form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 19 }"
        @submit="handleSubmit"
      >
        <a-form-item label="title">
          <a-input
            :placeholder="ctx.$t('page.videotitleTips')"
            v-decorator="[
              'title',
              {
                rules: [
                  { required: false, message: 'Please input your note!' },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="nickname">
          <a-input
            :placeholder="ctx.$t('page.videoNicknameTips')"
            v-decorator="[
              'nickname',
              {
                rules: [
                  { required: false, message: 'Please input your note!' },
                ],
              },
            ]"
          />
        </a-form-item>

        <a-form-item
          class="btn-box-search"
          :wrapper-col="{ span: 12, offset: 5 }"
        >
          <a-button type="primary" html-type="submit"> search </a-button>
        </a-form-item>
      </a-form> -->
    </a-modal>
  </div>
</template>
<script src="./index.js">
</script>
<style lang="less">
@import "./index.less";
</style>
