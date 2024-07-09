
<template>
  <div class="home-box">
    <div class="bg">
      <div
        class="bdm"
        :key="index"
        v-for="(item, index) in commentData"
        :style="getStyle(index)"
      >
        {{ item.content }}
      </div>
    </div>
    <div data-v-1291ecaa="" class="web-home-wrapper">
      <div class="home-logo">
        <a-icon
          type="menu"
          @click="showDrawer"
          :style="{
            fontSize: '26px',
            color: '#25377d',
            marginRight: '25px',
            marginTop: '5px',
          }"
        />
        <img src="~/assets/images/home-logo.png" alt="" />
      </div>
      <div data-v-1291ecaa="" class="web-home-header pos-a pos-horizon-center">
        <h1 class="slogan2">PEOPLE.VIDEOS.LIFE</h1>
        <h2 class="sub-slogan">
          <strong>Safely</strong>
        </h2>
      </div>
      <div data-v-4279d5d2="" data-v-1291ecaa="" id="w_link" class="w-link">
        <a data-v-4279d5d2="" v-show="!userInfo || !userInfo.token">
          <a-icon
            type="search"
            @click="search"
            :style="{
              fontSize: '26px',
              color: '#25377d',
              marginRight: '15px',
            }"
          />
          <span @click="setModal1Visible">
            <a-icon
              type="user"
              :style="{
                fontSize: '26px',
                marginRight: '10px',
              }"
            />{{ $t("common.login") }}</span
          ></a
        >
        <a-icon
          type="search"
          @click="search"
          v-show="userInfo && userInfo.token"
          :style="{
            fontSize: '26px',
            color: '#25377d',
            marginRight: '15px',
            marginTop: '10px',
          }"
        />

        <a-popover
          trigger="hover"
          placement="bottomRight"
          v-show="userInfo && userInfo.token"
        >
          <template slot="content">
            <div
              class="ivu-select-dropdown ivu-dropdown-transfer"
              data-transfer="true"
              x-placement="bottom"
            >
              <div class="ivu-dropdown-menu">
                <nuxt-link to="/profile">
                  <div class="ivu-dropdown-item">
                    {{ $t("header.viewProfile") }}
                  </div>
                </nuxt-link>
                <div
                  v-show="userInfo && userInfo.token"
                  @click="logout"
                  class="ivu-dropdown-item"
                >
                  {{ $t("common.logout") }}
                </div>
              </div>
            </div>
          </template>
          <div class="jsx-2505920267 profile-home">
            <span
              class="tete-avatar tete-avatar-circle"
              style="width: 40px; height: 40px"
            >
              <img
                v-show="
                  userInfo && userInfo.info && userInfo.info.head_portrait
                "
                :src="
                  userInfo &&
                  userInfo.info &&
                  userInfo.info.head_portrait || ''
                "
              />
              <img
                v-show="
                  !userInfo || !userInfo.info || !userInfo.info.head_portrait
                "
                src="~/assets/images/tx.png"
              />
            </span>
            <span
              v-show="userInfo && userInfo.info && userInfo.info.head_portrait"
              class="profile-name-text"
            >
              {{ userInfo && userInfo.info && userInfo.info.nickname }}
            </span>
          </div>
        </a-popover>
      </div>
      <div
        data-v-3dcb0607=""
        data-v-1291ecaa=""
        class="store-carousel-wrapper pos-r"
      >
        <div
          data-v-3dcb0607=""
          class="swiper-container swiper-container-initialized swiper-container-horizontal"
        >
          <client-only>
            <div v-if="currentList && currentList.length > 0">
              <carousel-3d
                @after-slide-change="onSlideChange"
                :perspective="0"
                :display="5"
                :inverseScaling="300"
                :animationSpeed="800"
                :width="230"
                :space="350"
                :minSwipeDistance="100"
                ref="carousels"
                :height="360"
              >
                <slide
                  :index="index"
                  :ref="'isItem' + index"
                  v-for="(item, index) in currentList"
                  :key="index"
                >
                  <template>
                    <VideoOneItem2
                      @update="update"
                      :currentVideo="currentVideo"
                      :index="index"
                      :list="[item]"
                    ></VideoOneItem2>
                  </template>
                </slide>
              </carousel-3d>
            </div>
          </client-only>
          <span
            class="swiper-notification"
            aria-live="assertive"
            aria-atomic="true"
          ></span>
        </div>
      </div>
      <div data-v-1291ecaa="" class="btn-box">
        <button class="btn-home" @click="go('/foryou', true)">Watch now</button>
      </div>
    </div>
    <img class="bottom-bg" src="~/assets/images/bottom-img.png" alt="" />
    <vDrawerLeft ref="vDrawerLeft" />
  </div>
</template>

<script src="./index.js">
</script>

<style lang="less">
@import "./index.less";
</style>
