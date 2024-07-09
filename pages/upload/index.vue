<!--
 * @Author: your name
 * @Date: 2020-09-07 15:06:27
 * @LastEditTime: 2021-03-06 20:44:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tete/pages/index.vue
-->
<template>
  <div class="container--3edUT">
    <video
      id="video"
      v-show="false"
      webkit-playsinline
      playsinline
      controls="controls"
      autoplay="autoplay"
      muted
    />

    <div class="contents--3gY1F">
      <div class="router-back" @click="$router.go(-1)">
        <a-icon type="left" />
        <span>Back</span>
      </div>
      <div class="title--329uH">
        {{ $t("page.uploadMovie") }}
      </div>
      <a-row class="ant-row-box">
        <a-col
          :xs="24"
          :sm="24"
          :md="8"
          :lg="8"
          :xl="8"
          :xll="8"
          class="video-box2"
        >
          <div class="operation">
            <div
              class="upload--RMkTQ"
              @click="choiceImg"
              v-show="!imgList || imgList.length !== 8"
            >
              <a-spin :spinning="spinning">
                <div class="upload-btn--3w4JZ upload-area--WlBXl">
                  <div class="card--xyu_N stage-1--1ILL2">
                    <svg
                      viewBox="0 0 49 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style="
                        display: inline;
                        line-height: 0;
                        color: rgb(22, 24, 35);
                        opacity: 0.12;
                        width: 49px;
                        height: 36px;
                      "
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M34.8955 4.29545C32.0286 1.42335 28.2592 0 24.5 0C20.7408 0 16.9866 1.42497 14.1215 4.29545C11.1029 7.31969 9.74283 11.3547 9.90208 15.3239C4.39933 15.5606 0 20.0653 0 25.6364C0 31.3589 4.63246 36 10.3444 36H23.78C23.779 35.9769 23.7786 35.9537 23.7786 35.9304V20.0971L20.2795 23.2099C19.7096 23.7658 18.7372 23.6954 18.1919 23.1118C17.6266 22.5069 17.7322 21.4321 18.3066 20.8814L24.2603 15.3912C24.5835 15.0757 24.8571 14.9977 25.2467 14.999C25.6394 15.0069 26.0234 15.1859 26.2332 15.3912L32.1868 20.8814C32.7902 21.4425 32.8195 22.5005 32.3015 23.1118C31.7835 23.723 30.7839 23.7658 30.2139 23.2099L26.7149 20.0971V35.9304C26.7149 35.9537 26.7144 35.9769 26.7135 36H37.0222C43.6244 36 49 30.6145 49 24C49 18.0445 44.6375 13.1309 38.9448 12.2045C38.4457 9.31312 37.1202 6.52435 34.8955 4.29545Z"
                        fill="currentColor"
                      />
                    </svg>
                    <div class="text-main--2WqVE">
                      {{ $t("page.SelectUpload") }}
                    </div>
                    <br />
                    <ul class="text-sub--27tQU">
                      <li>MP4</li>
                      <li>720x1280 Resolution or higher</li>
                      <li>Up to 60 seconds</li>
                    </ul>
                  </div>
                  <input
                    ref="filElem"
                    id="upload-video"
                    @change="uploadVideoinit"
                    class="upload-btn-input--36XER"
                    type="file"
                    name="upload-btn"
                    accept="video/mp4"
                  />
                </div>
              </a-spin>
            </div>

            <div
              class="preview--2KzCt"
              :class="isQuanping ? 'quanping' : ''"
              v-show="imgList && imgList.length === 8"
            >
              <div v-if="percent < 100" class="bg-box">
                <div class="percent-boxs">
                  <a-popconfirm
                    title="Are you sure delete this task?"
                    ok-text="Yes"
                    cancel-text="No"
                    @confirm="cancleUpload"
                  >
                    <a-progress
                      class="percent-box"
                      type="circle"
                      :percent="percent"
                      :width="80"
                    >
                      <template #format="percent">
                        <a-icon
                          class="percent-icon"
                          :style="{ fontSize: '14px' }"
                          type="close"
                        />
                      </template>
                    </a-progress>
                  </a-popconfirm>
                  <div class="percentS">{{ percent }}%</div>
                </div>
              </div>
              <div
                v-show="!loading && percent === 100"
                class="close-icon--3Qa8r"
                @click="clearVideo"
              >
                <svg width="27" height="27" fill="none">
                  <circle cx="13.5" cy="13.5" r="13.5" fill="#FF4C3A"></circle>
                  <path
                    d="M10.354 9.792L13.5 12.94l3.146-3.147a.5.5 0 01.707 0l.354.354a.5.5 0 010 .707L14.561 14l3.146 3.146a.5.5 0 010 .707l-.353.354a.5.5 0 01-.707 0L13.5 15.06l-3.146 3.147a.5.5 0 01-.707 0l-.354-.354a.5.5 0 010-.707L12.44 14l-3.146-3.147a.5.5 0 010-.707l.353-.354a.5.5 0 01.707 0z"
                    fill="#fff"
                  ></path>
                </svg>
              </div>
              <video
                v-show="percent === 100"
                class="video--2yEr0"
                loop=""
                muted
                webkit-playsinline
                playsinline
                id="videoplay"
                autoplay=""
                preload="auto"
              ></video>
              <div class="video-controls--1al_4">
                <div class="video-controls-bottom--2VqhD new-video">
                  <a-slider
                    @change="change"
                    :tooltip-visible="false"
                    v-model="percentage"
                  />
                  <div class="details--E2CVZ">
                    <div class="left--29l0k">
                      <span class="play-btn--1k-S8" @click="playChange">
                        <svg
                          v-if="!isPlay"
                          class="icon--2KoKz"
                          width="200"
                          height="200"
                          viewBox="0 0 1024 1024"
                        >
                          <path
                            fill="#fff"
                            d="M512 981.358a469.285 469.285 0 110-938.643 469.285 469.285 0 010 938.643zM512 128a384 384 0 100 768 384 384 0 000-768zM375.077 329.362a24.357 24.357 0 0121.723 0l298.642 166.4a17.042 17.042 0 010 31.16L396.8 693.393a24.283 24.283 0 01-21.723 0 18.286 18.286 0 01-11.118-16.164V345.527a18.286 18.286 0 0111.118-16.238z"
                          ></path>
                        </svg>
                        <svg
                          v-else
                          class="icon--2KoKz"
                          width="200"
                          height="200"
                          viewBox="0 0 1024 1024"
                        >
                          <path
                            fill="#fff"
                            d="M348.262 170.65h20.276c21.862 0 32.972 3.481 43.161 10.035 10.24 6.553 18.227 16.179 23.655 28.416 5.478 12.237 8.396 25.6 8.396 51.814v502.17c0 26.265-2.918 39.577-8.396 51.814a63.744 63.744 0 01-23.655 28.416c-10.189 6.554-21.299 10.035-43.161 10.035h-20.276c-21.862 0-32.972-3.481-43.161-10.035a63.744 63.744 0 01-23.655-28.416c-5.478-12.237-8.396-25.6-8.396-51.814v-502.17c0-26.265 2.918-39.577 8.396-51.814 5.428-12.288 13.415-21.863 23.655-28.416 10.189-6.554 21.299-10.035 43.161-10.035zm307.2 0h20.276c21.862 0 32.972 3.481 43.161 10.035 10.24 6.553 18.227 16.179 23.706 28.416 5.427 12.237 8.345 25.6 8.345 51.814v502.17c0 26.265-2.918 39.577-8.345 51.814a63.795 63.795 0 01-23.706 28.416c-10.189 6.554-21.299 10.035-43.161 10.035h-20.276c-21.862 0-32.972-3.481-43.161-10.035a63.795 63.795 0 01-23.655-28.416c-5.478-12.237-8.396-25.6-8.396-51.814v-502.17c0-26.265 2.918-39.577 8.396-51.814 5.428-12.288 13.415-21.863 23.655-28.416 10.189-6.554 21.299-10.035 43.161-10.035z"
                          ></path>
                        </svg> </span
                      ><span class="time--21Thk"
                        >{{ currentTime }}/{{ duration }}</span
                      >
                    </div>
                    <div class="right--3Em2i">
                      <span class="volume--1iRdI" @click="changeMute">
                        <svg
                          v-if="!isMuted"
                          class="icon--2KoKz"
                          width="200"
                          height="200"
                          viewBox="0 0 1024 1024"
                        >
                          <path
                            fill="#fff"
                            d="M503.296 186.573a38.195 38.195 0 00-21.146-34.15 36.762 36.762 0 00-39.424 4.607l-62.822 50.944 123.392 86.938v-108.34zM265.984 345.907H131.43a36.966 36.966 0 00-26.316 11.06 38.042 38.042 0 00-10.906 26.675v227.584c0 9.984 3.891 19.61 10.906 26.675a36.966 36.966 0 0026.316 11.11h134.554l176.742 143.36a36.966 36.966 0 0054.836-9.42 38.195 38.195 0 005.683-20.173V506.522L269.107 342.22l-3.123 3.686zm475.392 392.755a37.99 37.99 0 00-10.906 26.83 38.451 38.451 0 0010.957 26.88 37.376 37.376 0 0026.47 11.11 36.915 36.915 0 0026.471-11.11c15.36-15.873 29.44-32.871 42.138-50.996l-61.44-43.213c-10.138 14.336-21.402 27.904-33.639 40.448zm-13.414-286.72a230.451 230.451 0 00-16.896-87.193 227.84 227.84 0 00-48.59-73.933 37.427 37.427 0 00-26.47-11.11 36.966 36.966 0 00-26.47 11.11 38.042 38.042 0 00-8.09 41.37c1.895 4.608 4.608 8.806 8.09 12.288 13.158 13.107 23.808 28.57 31.437 45.568l86.528 65.024.512-3.124zM609.126 604.365a38.246 38.246 0 0012.135 61.952 36.966 36.966 0 0040.755-8.192 229.13 229.13 0 0020.634-25.498l-61.44-40.96a157.322 157.322 0 01-12.084 12.698zm305.408-152.423A420.454 420.454 0 00793.907 157.03a37.376 37.376 0 00-26.47-11.161 36.966 36.966 0 00-26.47 11.161 38.042 38.042 0 00-10.957 26.83 38.502 38.502 0 0010.956 26.88 340.173 340.173 0 0184.992 145.92 343.86 343.86 0 014.71 169.471l65.537 45.466a422.4 422.4 0 0018.33-119.655zm48.026 212.02l-768.154-506.83c-13.721-9.01-32.665-4.095-42.393 11.06-9.728 15.104-6.451 34.714 7.27 43.776L927.54 718.746c13.722 9.062 32.666 4.096 42.394-11.008 9.728-15.156 6.451-34.714-7.27-43.776z"
                          ></path>
                        </svg>

                        <svg
                          v-else
                          class="icon--2KoKz"
                          width="200"
                          height="200"
                          viewBox="0 0 1024 1024"
                        >
                          <path
                            fill="#fff"
                            d="M487.834 174.9C502.579 181.964 512 196.914 512 213.3v597.35a42.65 42.65 0 01-69.325 33.33L241.05 682.7H85.35a42.65 42.65 0 01-42.7-42.7V384c0-23.552 19.097-42.65 42.7-42.65h155.648l201.728-161.33c12.8-10.24 30.31-12.289 45.056-5.12zm295.68 5.273a42.65 42.65 0 0160.313 0 469.35 469.35 0 010 663.654 42.65 42.65 0 11-60.365-60.365 384 384 0 000-542.924 42.65 42.65 0 010-60.365zm-150.682 150.63a42.65 42.65 0 0160.314 0 256 256 0 010 361.984 42.65 42.65 0 01-60.314-60.365 170.65 170.65 0 000-241.305 42.65 42.65 0 010-60.314z"
                          ></path>
                        </svg> </span
                      ><span class="maxinmze--ruJt2" @click="quanping"
                        ><svg
                          class="icon--2KoKz"
                          width="200"
                          height="200"
                          viewBox="0 0 1024 1024"
                        >
                          <path
                            fill="#fff"
                            d="M122.829 122.829A128 128 0 01213.35 85.35h128a42.65 42.65 0 010 85.3h-128a42.65 42.65 0 00-42.7 42.7v128a42.65 42.65 0 01-85.3 0v-128a128 128 0 0137.479-90.521zM640 128c0-23.552 19.098-42.65 42.65-42.65h128a128 128 0 01128 128v128a42.65 42.65 0 01-85.3 0v-128a42.65 42.65 0 00-42.7-42.7h-128A42.65 42.65 0 01640 128zM128 640c23.552 0 42.65 19.098 42.65 42.65v128a42.65 42.65 0 0042.7 42.7h128a42.65 42.65 0 010 85.3h-128a128 128 0 01-128-128v-128c0-23.552 19.098-42.65 42.65-42.65zm768 0c23.552 0 42.65 19.098 42.65 42.65v128a128 128 0 01-128 128h-128a42.65 42.65 0 010-85.3h128a42.65 42.65 0 0042.7-42.7v-128c0-23.552 19.098-42.65 42.65-42.65z"
                          ></path></svg
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="videoSize" class="size-text--3va6i">
              {{ videoSize }}
            </div>
          </div>
        </a-col>
        <a-col
          class="input-box"
          :xs="24"
          :sm="24"
          :md="16"
          :lg="16"
          :xl="16"
          :xll="16"
        >
          <div class="form--1tYZG">
            <a-form :form="form">
              <a-form-item
                v-bind="formItemLayout"
                :label="$t('page.videoType')"
                v-show="
                  userInfo &&
                  userInfo.info &&
                  userInfo.info.is_auth &&
                  userInfo.info.is_auth === 4
                "
              >
                <a-radio-group
                  v-model="formItem.is_ad"
                  @change="handleFormLayoutChange"
                  button-style="solid"
                >
                  <a-radio-button value="1">
                    {{ $t("page.video") }}
                  </a-radio-button>
                  <a-radio-button value="2">
                    {{ $t("page.adv") }}
                  </a-radio-button>
                </a-radio-group>
              </a-form-item>
              <a-form-item
                class="col-item"
                v-bind="formItemLayout"
                :label="$t('page.title')"
              >
                <a-input
                  :placeholder="$t('page.pleaseEnter')"
                  v-decorator="[
                    'title',
                    {
                      rules: [
                        {
                          required: true,
                          message: $t('page.pleaseEnter'),
                        },
                      ],
                    },
                  ]"
                />
              </a-form-item>
              <a-form-item
                class="col-item"
                v-bind="formItemLayout"
                :label="$t('page.desc')"
              >
                <a-textarea
                  v-decorator="[
                    'describe',
                    {
                      rules: [
                        {
                          required: true,
                          message: $t('page.pleaseEnter'),
                        },
                      ],
                    },
                  ]"
                  :placeholder="$t('page.pleaseEnter')"
                  allow-clear
                  @change="onChangeText"
                />
              </a-form-item>
              <a-form-item class="col-item" v-bind="formItemLayout">
                <span slot="label">
                  {{ $t("page.cover") }}&nbsp;
                  <a-tooltip :title="$t('page.coverYouLike')">
                    <a-icon type="question-circle-o" />
                  </a-tooltip>
                </span>
                <div class="form-item--2sD2y">
                  <div
                    class="container--Y2-po"
                    :class="
                      !imgList || imgList.length === 0 ? 'empty--2DktI' : ''
                    "
                  >
                    <div class="bg-container--1gsr5 new-video2">
                      <a-slider
                        @change="change2"
                        ref="slider2"
                        v-show="imgList && imgList.length === 8"
                        v-model="precent2"
                        :tooltip-visible="false"
                      >
                      </a-slider>
                      <div
                        class="candidate--3FAIv empty--2DktI"
                        v-show="!imgList || imgList.length === 0"
                      ></div>
                      <div
                        class="bg-container--1gsr5"
                        v-show="imgList && imgList.length > 0"
                      >
                        <div class="img-box">
                          <img
                            v-for="(x, index) in imgList"
                            :key="index"
                            :src="x"
                            draggable="false"
                            class="candidate--3FAIv bg--1a1RP"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      class="chosen--2lT58"
                      id="videoBtn"
                      v-show="imgList && imgList.length === 8"
                      :style="{
                        transform: `translate3d(${
                          (462.5 * precent2) / 100
                        }px, 0px, 0px)`,
                      }"
                    >
                      <video
                        draggable="false"
                        width="96"
                        muted
                        height="172"
                        webkit-playsinline
                        playsinline
                        id="videoplay2"
                        class="candidate--3FAIv candidate-video--30IH9"
                        preload="auto"
                      ></video>
                    </div>
                  </div>
                </div>
              </a-form-item>
              <a-form-item
                v-if="formItem.is_ad === '2'"
                class="col-item"
                v-bind="formItemLayout"
              >
                <span slot="label">
                  {{ $t("page.adspoint") }}&nbsp;
                  <a-tooltip :title="$t('page.adspointdesc')">
                    <a-icon type="question-circle-o" />
                  </a-tooltip>
                </span>
                <a-input
                  @change="changeShou"
                  :placeholder="$t('page.pleaseEnter')"
                  v-decorator="[
                    'reward_integral',
                    {
                      rules: [
                        {
                          required: true,
                          trigger: 'blur',
                          validator: this.ruleListFunc1,
                        },
                      ],
                    },
                  ]"
                />
                <span
                  :style="{
                    display: 'inline-block',
                    width: '25.5px',
                    textAlign: 'center',
                    position: 'absolute',
                    left: '-20px',
                    top: '100%',
                  }"
                >
                  +
                </span>
              </a-form-item>
              <a-form-item
                v-if="formItem.is_ad === '2'"
                class="col-item"
                v-bind="formItemLayout"
              >
                <span slot="label">
                  {{ $t("page.sxf") }}&nbsp;
                  <a-tooltip
                    :title="
                      ($t('page.sxfdesc') +
                        (userInfo.info && userInfo.info.fee_ratio) || 0) + '%'
                    "
                  >
                    <a-icon type="question-circle-o" />
                  </a-tooltip>
                </span>
                <a-input
                  disabled
                  :placeholder="$t('page.pleaseEnter')"
                  v-decorator="[
                    'shou',
                    {
                      rules: [
                        {
                          required: false,
                          message: $t('page.pleaseEnter'),
                        },
                      ],
                    },
                  ]"
                />
                <span
                  :style="{
                    display: 'inline-block',
                    width: '25.5px',
                    textAlign: 'center',
                    position: 'absolute',
                    left: '-20px',
                    top: '100%',
                  }"
                >
                  =
                </span>
              </a-form-item>

              <a-form-item
                v-if="formItem.is_ad === '2'"
                class="col-item"
                v-bind="formItemLayout"
              >
                <span slot="label">
                  {{ $t("page.zongxfi") }}&nbsp;
                  <a-tooltip
                    :title="
                      ($t('page.zongxfidesc') +
                        (userInfo.info && userInfo.info.integral) || 0) + 'TB'
                    "
                  >
                    <a-icon type="question-circle-o" />
                  </a-tooltip>
                </span>
                <a-input
                  disabled
                  :placeholder="$t('page.pleaseEnter')"
                  v-decorator="[
                    'zong',
                    {
                      rules: [
                        {
                          required: false,
                          message: $t('page.pleaseEnter'),
                        },
                      ],
                    },
                  ]"
                />
              </a-form-item>

              <a-form-item
                class="col-item"
                v-if="formItem.is_ad === '2'"
                v-bind="formItemLayout"
              >
                <span slot="label">
                  {{ $t("page.admode") }}&nbsp;
                  <a-tooltip :title="$t('page.coverYouLike')">
                    <a-icon type="question-circle-o" />
                  </a-tooltip>
                </span>
                <a-tabs type="card" v-model="activeKey">
                  <a-tab-pane key="1" :tab="$t('page.zntf1')">
                    <zhineng
                      :activeKey="activeKey"
                      ref="formItem1"
                      v-if="activeKey === '1'"
                    ></zhineng>
                  </a-tab-pane>
                  <a-tab-pane key="2" :tab="$t('page.zntf2')">
                    <sunxu v-if="activeKey === '2'" ref="formItem2"></sunxu>
                  </a-tab-pane>
                  <a-tab-pane key="3" :tab="$t('page.zntf3')">
                    <timeUpload
                      v-if="activeKey === '3'"
                      ref="formItem3"
                    ></timeUpload>
                  </a-tab-pane>
                  <a-tab-pane key="4" :tab="$t('page.zntf4')">
                    <locationUpload v-if="activeKey === '4'" ref="formItem4">
                    </locationUpload>
                  </a-tab-pane>
                  <a-tab-pane key="5" :tab="$t('page.zntf5')">
                    <locationUpload
                      activeKey="5"
                      v-if="activeKey === '5'"
                      ref="formItem51"
                    >
                    </locationUpload>
                    <timeUpload
                      activeKey="5"
                      v-if="activeKey === '5'"
                      ref="formItem52"
                    ></timeUpload>
                  </a-tab-pane>
                  <a-tab-pane key="6" :tab="$t('page.zntf6')">
                    <zidingyi
                      v-if="activeKey === '6'"
                      ref="formItem6"
                    ></zidingyi>
                  </a-tab-pane>
                </a-tabs>
              </a-form-item>
            </a-form>
            <div class="col-item">
              <div class="op-part--2f5d_">
                <button
                  @click="showConfirm"
                  class="button--1SZwR btn-cancel--3PEgA"
                  type="button"
                >
                  {{ $t("page.Abandon") }}
                </button>
                  <!-- :disabbled="!currentImgUrl || percent < 100" -->

                <a-button
                  :loading="loading"
                  :class="
                    !currentImgUrl || percent < 100 ? 'disabled--37yta' : ''
                  "
                  class="button--1SZwR btn-post--1ewsz primary--1AMXd"
                  type="button"
                  @click="handleSubmit"
                >
                  {{ $t("page.Upload") }}
                </a-button>
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script src="./index.js">
</script>

<style lang="less">
@import "./index.less";
</style>
