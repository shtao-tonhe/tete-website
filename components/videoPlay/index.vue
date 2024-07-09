<template>
  <div class="tt-feed" :class="'tt-feed' + index">
    <div class="jsx-1253605775 video-feed-container">
      <span class="lazyload-wrapper"
        ><div class="jsx-2890527616 jsx-2715883145 video-feed-item">
          <nuxt-link
            :to="`/profile?userId=${item && item.user && item.user.id}`"
            class="feed-item-avatar jsx-3783556929"
            rel="noopener"
            :title="`${item && item.user && item.user.nickname}  | TeTe`"
            ><span class="tete-avatar tete-avatar-circle tete-avatar-sm">
              <img
                v-if="item && item.user && item.user.head_portrait"
                :src="
                  item &&
                  item.user &&
                  item.user.head_portrait || ''
                "
              />
              <img v-else src="~/assets/images/tx.png" /> </span
          ></nuxt-link>
          <div class="jsx-2890527616 jsx-2715883145 feed-item-content">
            <div
              class="jsx-442964640 author-info-content tt-author-info jsx-3783556929 jsx-242381890 horizontal"
            >
              <nuxt-link
                :to="`/profile?userId=${item && item.user && item.user.id}`"
                rel="noopener"
                ><h3
                  class="author-uniqueId jsx-242381890 line1"
                  style="text-decoration: none"
                >
                  {{ item && item.user && item.user.nickname }}
                  <svg
                    v-if="item && item.user && item.user.is_auth === 4"
                    class="verified jsx-242381890"
                    width="14"
                    height="14"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="24" cy="24" r="24" fill="#20D5EC"></circle>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M37.1213 15.8787C38.2929 17.0503 38.2929 18.9497 37.1213 20.1213L23.6213 33.6213C22.4497 34.7929 20.5503 34.7929 19.3787 33.6213L10.8787 25.1213C9.70711 23.9497 9.70711 22.0503 10.8787 20.8787C12.0503 19.7071 13.9497 19.7071 15.1213 20.8787L21.5 27.2574L32.8787 15.8787C34.0503 14.7071 35.9497 14.7071 37.1213 15.8787Z"
                      fill="white"
                    ></path>
                  </svg>
                </h3>
              </nuxt-link>
            </div>
            <div
              class="jsx-698935136 tt-video-music item-music-info-V4 jsx-2204354762 black"
            >
              <h4>
                <div
                  class="jsx-698935136 video-music-content pause music-title-decoration"
                >
                  <strong>{{ item.title }}</strong>
                  <a-tag color="pink" v-if="item.is_ad == 2">
                    {{ $t("common.guanggao") }}
                  </a-tag>
                </div>
              </h4>
            </div>
            <div class="tt-video-meta-caption jsx-3783556929 jsx-1761782793">
              <strong>{{ item.describe }}</strong>
            </div>
            <div class="jsx-2890527616 jsx-2715883145 item-follow-wrapper">
              <button
                v-if="thisUserId + '' !== item.user.id + ''"
                type="button"
                @click="front_user_follow"
                class="follow-button jsx-2790469629 tete-btn-pc tete-btn-pc-medium tete-btn-pc-line"
              >
                {{ item.follows ? $t("page.following") : $t("page.follow") }}
              </button>
            </div>

            <div
              class="jsx-2890527616 jsx-2715883145 item-video-container"
              :class="'item-video-container' + index"
            >
              <div
                class="jsx-2890527616 jsx-2715883145"
                :style="{
                  width: imgWidth + 'px',
                  height: imgHeight2 + 'px',
                  position: 'relative',
                }"
              >
                <a class="jsx-2890527616 jsx-2715883145 item-video-card-wrapper"
                  ><div
                    class="jsx-828470630 image-card"
                    :class="'image-card' + index"
                    :style="{
                      width: imgWidth + 'px',
                      height: imgHeight2 + 'px',
                      borderRadius: '4px',
                      backgroundColor: 'black',
                    }"
                    v-lazy:background-image="item.cover && item.cover"
                  >
                    <div
                      class="jsx-2055372491 jsx-1951515143 video-card-one-column default"
                    >
                      <div
                        v-if="
                          index === currentIndex &&
                          showVideo &&
                          !showVideoModal &&
                          item.file
                        "
                        class="inherit"
                      >
                        <videoOne
                          ref="videoOne"
                          @setloading="setloading"
                          :item="item"
                          :index="index"
                          :currentIndex="currentIndex"
                        ></videoOne>
                      </div>
                      <!-- <span class="jsx-2055372491 style-layer-mask"></span> -->
                      <div
                        v-if="
                          index == currentIndex && showVideo && !showLoading
                        "
                        @click.stop="setVolume"
                        class="jsx-2447892524 one_column jsx-1951515143 mute-icon"
                        :class="volumeStatus === 0 ? 'show-mute' : ''"
                      >
                        <svg
                          v-if="index == currentIndex && volumeStatus === 0"
                          width="24"
                          height="24"
                          viewBox="0 0 48 48"
                          fill="#fff"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M25 10.8685C25 8.47242 22.3296 7.04325 20.3359 8.37236L10.3944 15H6C4.34315 15 3 16.3431 3 18V30C3 31.6568 4.34314 33 6 33H10.3944L20.3359 39.6276C22.3296 40.9567 25 39.5276 25 37.1315V10.8685ZM29.2929 18.1213L35.1716 24L29.2929 29.8787C28.9024 30.2692 28.9024 30.9024 29.2929 31.2929L30.7071 32.7071C31.0976 33.0976 31.7308 33.0976 32.1213 32.7071L38 26.8284L43.8787 32.7071C44.2692 33.0976 44.9024 33.0976 45.2929 32.7071L46.7071 31.2929C47.0976 30.9024 47.0976 30.2692 46.7071 29.8787L40.8284 24L46.7071 18.1213C47.0976 17.7308 47.0976 17.0976 46.7071 16.7071L45.2929 15.2929C44.9024 14.9024 44.2692 14.9024 43.8787 15.2929L38 21.1716L32.1213 15.2929C31.7308 14.9024 31.0976 14.9024 30.7071 15.2929L29.2929 16.7071C28.9024 17.0976 28.9024 17.7308 29.2929 18.1213Z"
                          ></path>
                        </svg>
                        <svg
                          v-else
                          width="24"
                          height="24"
                          viewBox="0 0 48 48"
                          fill="#fff"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M20.3359 8.37236C22.3296 7.04325 25 8.47242 25 10.8685V37.1315C25 39.5276 22.3296 40.9567 20.3359 39.6276L10.3944 33H6C4.34314 33 3 31.6568 3 30V18C3 16.3431 4.34315 15 6 15H10.3944L20.3359 8.37236ZM21 12.737L12.1094 18.6641C11.7809 18.8831 11.3948 19 11 19H7V29H11C11.3948 29 11.7809 29.1169 12.1094 29.3359L21 35.263V12.737ZM32.9998 24C32.9998 21.5583 32.0293 19.3445 30.4479 17.7211C30.0625 17.3255 29.9964 16.6989 30.3472 16.2724L31.6177 14.7277C31.9685 14.3011 32.6017 14.2371 33.0001 14.6195C35.4628 16.9832 36.9998 20.3128 36.9998 24C36.9998 27.6872 35.4628 31.0168 33.0001 33.3805C32.6017 33.7629 31.9685 33.6989 31.6177 33.2724L30.3472 31.7277C29.9964 31.3011 30.0625 30.6745 30.4479 30.2789C32.0293 28.6556 32.9998 26.4418 32.9998 24ZM37.0144 11.05C36.6563 11.4705 36.7094 12.0995 37.1069 12.4829C40.1263 15.3951 42.0002 19.4778 42.0002 23.9999C42.0002 28.522 40.1263 32.6047 37.1069 35.5169C36.7094 35.9003 36.6563 36.5293 37.0144 36.9498L38.3109 38.4727C38.6689 38.8932 39.302 38.9456 39.7041 38.5671C43.5774 34.9219 46.0002 29.7429 46.0002 23.9999C46.0002 18.2569 43.5774 13.078 39.7041 9.43271C39.302 9.05421 38.6689 9.10664 38.3109 9.52716L37.0144 11.05Z"
                          ></path>
                        </svg>
                      </div>
                      <div
                        v-if="
                          index == currentIndex && showVideo && !showLoading
                        "
                        @click.stop="togglePlay"
                        class="jsx-2055372491 toggle-icon toggle-icon-v4"
                      >
                        <svg
                          v-if="playStatus"
                          class="toggle-inner"
                          width="20"
                          height="20"
                          viewBox="0 0 48 48"
                          fill="#fff"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 6C8 5.44771 8.44772 5 9 5H17C17.5523 5 18 5.44772 18 6V42C18 42.5523 17.5523 43 17 43H9C8.44772 43 8 42.5523 8 42V6Z"
                          ></path>
                          <path
                            d="M30 6C30 5.44771 30.4477 5 31 5H39C39.5523 5 40 5.44772 40 6V42C40 42.5523 39.5523 43 39 43H31C30.4477 43 30 42.5523 30 42V6Z"
                          ></path>
                        </svg>

                        <svg
                          v-else
                          class="toggle-inner"
                          width="20"
                          height="20"
                          viewBox="0 0 48 48"
                          fill="#fff"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12 8.77702C12 6.43812 14.5577 4.99881 16.5569 6.21266L41.6301 21.4356C43.5542 22.6038 43.5542 25.3962 41.6301 26.5644L16.5569 41.7873C14.5577 43.0012 12 41.5619 12 39.223V8.77702Z"
                          ></path>
                        </svg>
                      </div>
                      <span
                        class="jsx-2055372491 event-delegate-mask"
                        @click.stop="showItemModal"
                      ></span>
                    </div></div
                ></a>
                <div
                  class="jsx-2826320419 report-modal-wrapper item-card-report"
                >
                  <div
                    v-if="showVideo"
                    @click="report"
                    class="jsx-2826320419 report-text"
                  >
                    <svg
                      class="report-icon"
                      width="16"
                      height="14"
                      viewBox="0 0 48 48"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9 9.31286V27.0626C9.98685 26.7378 11.184 26.4042 12.5108 26.1585C16.1115 25.4917 21.0181 25.4123 25.1625 28.3726C28.0181 30.4123 31.6115 30.4917 34.7608 29.9085C36.306 29.6223 37.6602 29.1908 38.6289 28.8293C38.7603 28.7803 38.8841 28.7328 39 28.6872V10.9374C38.0131 11.2623 36.816 11.5959 35.4892 11.8416C31.8885 12.5084 26.9819 12.5878 22.8375 9.62751C19.9819 7.58781 16.3885 7.5084 13.2392 8.09161C11.694 8.37776 10.3398 8.80927 9.37105 9.17072C9.23971 9.21973 9.11586 9.2673 9 9.31286ZM40.1067 6.21064C40.7264 5.90123 41.4622 5.93453 42.0515 6.29874C42.6411 6.66315 43 7.30688 43 8.00004V30C43 30.7576 42.572 31.4501 41.8944 31.7889L41 30C41.8944 31.7889 41.8931 31.7895 41.8931 31.7895L41.8916 31.7903L41.8878 31.7922L41.8775 31.7973L41.846 31.8127C41.831 31.82 41.8128 31.8288 41.7915 31.839C41.7761 31.8464 41.7589 31.8545 41.7401 31.8634C41.651 31.9055 41.525 31.9637 41.3654 32.0343C41.0466 32.1753 40.5919 32.3663 40.0273 32.577C38.9023 32.9967 37.319 33.5027 35.4892 33.8416C31.8885 34.5084 26.9819 34.5878 22.8375 31.6275C19.9819 29.5878 16.3885 29.5084 13.2392 30.0916C11.694 30.3778 10.3398 30.8093 9.37105 31.1707C9.23971 31.2197 9.11586 31.2673 9 31.3129V44.0001C9 44.5524 8.55228 45.0001 8 45.0001H6C5.44772 45.0001 5 44.5524 5 44.0001V8.00004C5 7.24249 5.42801 6.54996 6.10558 6.21118L7 8.00004C6.10558 6.21118 6.10688 6.21053 6.10688 6.21053L6.10842 6.20976L6.11219 6.20789L6.12249 6.20279L6.15404 6.18734C6.17988 6.17477 6.21529 6.15773 6.25987 6.13667C6.34902 6.09457 6.47498 6.03636 6.63455 5.9658C6.95342 5.8248 7.4081 5.63378 7.9727 5.42311C9.09774 5.00332 10.681 4.49734 12.5108 4.15849C16.1115 3.49171 21.0181 3.4123 25.1625 6.37257C28.0181 8.41227 31.6115 8.49167 34.7608 7.90846C36.306 7.62231 37.6602 7.1908 38.6289 6.82935C39.1112 6.6494 39.4925 6.48886 39.7478 6.37595C39.8754 6.31956 39.9711 6.27523 40.0318 6.24653C40.0622 6.23219 40.0838 6.22177 40.0962 6.21572L40.1056 6.21118L40.1067 6.21064Z"
                      ></path></svg
                    >{{ $t("page.report") }}
                  </div>
                  <div class="jsx-1285478177 modal">
                    <div class="jsx-1285478177 modal-wrapper">
                      <div
                        class="jsx-1285478177 modal-mask"
                        style="background: rgba(0, 0, 0, 0.5)"
                      ></div>
                      <div
                        class="jsx-1285478177 modal-content card-report-modal"
                      >
                        <div
                          class="tete-ui-loading-container"
                          style="width: 48px; height: 48px"
                        >
                          <div
                            class="tete-ui-loading"
                            style="transform: scale(0.24)"
                          >
                            <svg
                              preserveAspectRatio="none"
                              viewBox="0 0 160 90"
                              width="160"
                              height="90"
                            >
                              <defs>
                                <mask id="redhole">
                                  <rect
                                    width="100%"
                                    height="100%"
                                    fill="white"
                                  ></rect>
                                  <circle
                                    fill="black"
                                    class="tete-ui-loading-red tete-ui-loading-black"
                                  ></circle>
                                </mask>
                                <mask id="greenhole">
                                  <rect
                                    width="100%"
                                    height="100%"
                                    fill="white"
                                  ></rect>
                                  <circle
                                    fill="black"
                                    class="tete-ui-loading-green tete-ui-loading-black"
                                  ></circle>
                                </mask>
                              </defs>
                              <circle
                                stroke-width="2"
                                stroke="#3AF2FF"
                                class="tete-ui-loading-black-circle"
                              ></circle>
                              <circle
                                class="tete-ui-loading-green"
                                mask="url(#redhole)"
                              ></circle>
                              <circle
                                class="tete-ui-loading-red"
                                mask="url(#greenhole)"
                              ></circle>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="jsx-1045706868 pc-action-bar item-action-bar-v4 horizontal"
              >
                <div
                  @click="point"
                  class="jsx-1045706868 bar-item-wrapper engagement-button-wrapper"
                >
                  <div class="jsx-1045706868 bar-item-img engagement-icon">
                    <svg
                      v-if="!isPoint"
                      width="32"
                      height="32"
                      viewBox="0 0 48 48"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M24 9.01703C19.0025 3.74266 11.4674 3.736 6.67302 8.56049C1.77566 13.4886 1.77566 21.4735 6.67302 26.4016L22.5814 42.4098C22.9568 42.7876 23.4674 43 24 43C24.5326 43 25.0432 42.7876 25.4186 42.4098L41.327 26.4016C46.2243 21.4735 46.2243 13.4886 41.327 8.56049C36.5326 3.736 28.9975 3.74266 24 9.01703ZM21.4938 12.2118C17.9849 8.07195 12.7825 8.08727 9.51028 11.3801C6.16324 14.7481 6.16324 20.214 9.51028 23.582L24 38.1627L38.4897 23.582C41.8368 20.214 41.8368 14.7481 38.4897 11.3801C35.2175 8.08727 30.0151 8.07195 26.5062 12.2118L26.455 12.2722L25.4186 13.3151C25.0432 13.6929 24.5326 13.9053 24 13.9053C23.4674 13.9053 22.9568 13.6929 22.5814 13.3151L21.545 12.2722L21.4938 12.2118Z"
                      ></path>
                    </svg>

                    <svg
                      v-else
                      width="32"
                      height="32"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#LikeRedShadowColor_filter0_d)">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M15 4.5C21 4.5 24 8.5 24 8.5C24 8.5 27 4.5 33 4.5C40 4.5 45 9.99998 45 17C45 25 38.4622 32.1314 32.5 37.5C28.8191 40.8144 26 43 24 43C22 43 19.101 40.7978 15.5 37.5C9.63898 32.1325 3 25 3 17C3 9.99998 8 4.5 15 4.5Z"
                          fill="#FE2C55"
                        ></path>
                      </g>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.80371 24.3995C7.17815 29.3932 11.5185 33.8538 15.4999 37.4999C19.1009 40.7978 21.9999 42.9999 23.9999 42.9999C25.9999 42.9999 28.819 40.8144 32.4999 37.4999C38.4621 32.1314 44.9999 24.9999 44.9999 16.9999C44.9999 16.8252 44.9968 16.6513 44.9906 16.4785C41.1344 27.3238 27.3575 37 23.5001 37C20.6255 37 11.2219 31.6262 4.80371 24.3995Z"
                        fill="black"
                        fill-opacity="0.03"
                      ></path>
                      <defs>
                        <filter
                          id="LikeRedShadowColor_filter0_d"
                          x="0.6"
                          y="3.3"
                          width="46.8"
                          height="43.3"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          ></feFlood>
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          ></feColorMatrix>
                          <feOffset dy="1.2"></feOffset>
                          <feGaussianBlur stdDeviation="1.2"></feGaussianBlur>
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                          ></feColorMatrix>
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow"
                          ></feBlend>
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow"
                            result="shape"
                          ></feBlend>
                        </filter>
                      </defs>
                    </svg>
                  </div>
                  <strong
                    title="like"
                    class="jsx-1045706868 bar-item-text engagement-text"
                    >{{ point_praise_num | Formats }}</strong
                  >
                </div>
                <div
                  @click.stop="showItemModal"
                  class="jsx-1045706868 bar-item-wrapper engagement-button-wrapper"
                >
                  <div
                    class="jsx-1045706868 bar-item-img engagement-icon"
                    style="background-image: url('')"
                  >
                    <svg
                      width="33"
                      height="33"
                      viewBox="0 0 48 48"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8 22C8 15.1462 14.8065 9 24 9C33.1935 9 40 15.1462 40 22C40 26.2956 37.8555 30.0744 34.8094 33.2377C32.7121 35.4156 30.2606 37.2216 28 38.6036V35H24C14.8065 35 8 28.8538 8 22ZM24 5C13.3112 5 4 12.2852 4 22C4 31.7148 13.3112 39 24 39V42C24 42.6932 24.3589 43.3369 24.9485 43.7013C25.5382 44.0657 26.2745 44.0988 26.8944 43.7889C30.0249 42.2236 34.2346 39.6013 37.6906 36.0123C41.1445 32.4256 44 27.7044 44 22C44 12.2852 34.6888 5 24 5ZM18 22.5C18 23.8807 16.8807 25 15.5 25C14.1193 25 13 23.8807 13 22.5C13 21.1193 14.1193 20 15.5 20C16.8807 20 18 21.1193 18 22.5ZM26.5 22.5C26.5 23.8807 25.3807 25 24 25C22.6193 25 21.5 23.8807 21.5 22.5C21.5 21.1193 22.6193 20 24 20C25.3807 20 26.5 21.1193 26.5 22.5ZM32.5 25C33.8807 25 35 23.8807 35 22.5C35 21.1193 33.8807 20 32.5 20C31.1193 20 30 21.1193 30 22.5C30 23.8807 31.1193 25 32.5 25Z"
                      ></path>
                    </svg>
                  </div>
                  <strong
                    title="comment"
                    class="jsx-1045706868 bar-item-text engagement-text"
                    >{{ item.commentNum | Formats }}</strong
                  >
                </div>
                <!-- trigger="click" -->
                <a-popover>
                  <template slot="content">
                    <div class="jsx-3606761601">
                      <div
                        class="jsx-3606761601 share-pc-card action-share-modal entry-mode"
                      >
                        <!-- <a class="jsx-3606761601 share-item-wrapper">
                          <div class="jsx-3606761601 plat-icon i-embed">
                            <svg
                              width="26"
                              height="26"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
                                fill="#161823"
                                fill-opacity="0.75"
                              ></path>
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M12.313 7.96568C12.3665 7.65966 12.658 7.45498 12.964 7.50851C13.27 7.56203 13.4747 7.8535 13.4211 8.15951L12.0506 15.9952C11.997 16.3012 11.7056 16.5059 11.3996 16.4523C11.0936 16.3988 10.8889 16.1073 10.9424 15.8013L12.313 7.96568ZM16.2402 8.77448C15.96 8.48453 15.5058 8.48453 15.2256 8.77448C14.9454 9.06443 14.9454 9.53454 15.2256 9.82449L17.454 12.1307L15.2262 14.4364C14.946 14.7263 14.946 15.1964 15.2262 15.4864C15.5063 15.7763 15.9606 15.7763 16.2407 15.4864L19.4551 12.1598C19.4704 12.1439 19.4704 12.1182 19.4551 12.1023L19.2233 11.8623L19.2201 11.8586L19.2158 11.854L16.2402 8.77448ZM8.88972 15.4867C8.59977 15.7766 8.12966 15.7766 7.83971 15.4867L5.4207 13.0677L4.76017 12.4071L4.51191 12.1589C4.49603 12.143 4.49603 12.1173 4.51191 12.1014L7.83853 8.77477C8.12848 8.48482 8.59859 8.48482 8.88854 8.77477C9.17849 9.06472 9.17849 9.53482 8.88854 9.82478L6.58318 12.1301L8.88972 14.4367C9.17967 14.7266 9.17967 15.1967 8.88972 15.4867Z"
                                fill="white"
                              ></path>
                            </svg>
                          </div>
                          <span class="jsx-3606761601 plat-text">內嵌</span>
                        </a> -->
                        <!-- <a
                          href="https://wa.me/?text=https%3A%2F%2Fwww.tete.com%2F%40shufflesjr%2Fvideo%2F6895126904592928006%3Fsender_device%3Dpc%26sender_web_id%3D6887806512443328001%26is_from_webapp%3D1"
                          target="_blank"
                          class="jsx-3606761601 share-item-wrapper"
                        >
                          <div class="jsx-3606761601 plat-icon i-whatsapp">
                            <svg
                              width="26"
                              height="26"
                              viewBox="0 0 48 48"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M24 47C36.7025 47 47 36.7025 47 24C47 11.2975 36.7025 1 24 1C11.2975 1 1 11.2975 1 24C1 36.7025 11.2975 47 24 47Z"
                                fill="#25D366"
                              ></path>
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M30.9028 25.6129C30.5802 25.4515 28.9944 24.6713 28.6988 24.5635C28.4031 24.4559 28.1881 24.4021 27.9731 24.7249C27.758 25.0478 27.1399 25.7744 26.9517 25.9897C26.7636 26.2049 26.5754 26.2319 26.2529 26.0704C25.9303 25.909 24.891 25.5684 23.659 24.4694C22.7002 23.6141 22.0528 22.5579 21.8647 22.235C21.6765 21.9121 21.8446 21.7375 22.0061 21.5767C22.1512 21.4321 22.3287 21.2 22.4899 21.0116C22.6512 20.8233 22.705 20.6887 22.8125 20.4735C22.92 20.2582 22.8663 20.0699 22.7855 19.9085C22.7049 19.747 22.0599 18.1593 21.7911 17.5134C21.5293 16.8845 21.2634 16.9697 21.0654 16.9598C20.8774 16.9504 20.6622 16.9484 20.4472 16.9484C20.2322 16.9484 19.8827 17.0291 19.587 17.352C19.2914 17.6749 18.4581 18.4553 18.4581 20.0428C18.4581 21.6306 19.6139 23.1643 19.7752 23.3795C19.9365 23.5949 22.0496 26.8528 25.2853 28.2499C26.0548 28.5823 26.6557 28.7807 27.1241 28.9293C27.8968 29.1749 28.5999 29.1402 29.1557 29.0572C29.7754 28.9646 31.064 28.277 31.3328 27.5235C31.6016 26.7699 31.6016 26.1242 31.521 25.9897C31.4404 25.8551 31.2253 25.7744 30.9028 25.6129ZM25.0178 33.6472H25.0134C23.0881 33.6465 21.1998 33.1292 19.5524 32.1517L19.1606 31.9191L15.0998 32.9844L16.1837 29.0251L15.9286 28.6191C14.8546 26.9109 14.2873 24.9365 14.2881 22.9091C14.2905 16.9934 19.1037 12.1805 25.022 12.1805C27.8879 12.1815 30.5817 13.299 32.6076 15.3271C34.6333 17.3551 35.7482 20.0509 35.7471 22.9178C35.7447 28.8339 30.9315 33.6472 25.0178 33.6472ZM34.1489 13.7858C31.7117 11.3458 28.4706 10.0014 25.0173 10C17.902 10 12.111 15.7906 12.1082 22.908C12.1073 25.1832 12.7017 27.4039 13.8313 29.3617L12 36.0509L18.8432 34.2559C20.7287 35.2843 22.8516 35.8264 25.0121 35.827H25.0174H25.0174C32.132 35.827 37.9234 30.0359 37.9263 22.9184C37.9276 19.4691 36.5861 16.2258 34.1489 13.7858Z"
                                fill="white"
                              ></path>
                            </svg>
                          </div>
                          <span
                            class="jsx-3606761601 plat-text"
                            style="
                              margin-left: 12px;
                              line-height: 26px;
                              font-size: 16px;
                            "
                            >分享到 Whatsapp</span
                          > </a> -->
                        <!-- <a
                          href="https://twitter.com/intent/tweet?refer_source=https%3A%2F%2Fwww.tete.com%2F%40shufflesjr%2Fvideo%2F6895126904592928006%3Fsender_device%3Dpc%26sender_web_id%3D6887806512443328001%26is_from_webapp%3D1&amp;text=https%3A%2F%2Fwww.tete.com%2F%40shufflesjr%2Fvideo%2F6895126904592928006%3Fsender_device%3Dpc%26sender_web_id%3D6887806512443328001%26is_from_webapp%3D1"
                          target="_blank"
                          class="jsx-3606761601 share-item-wrapper"
                        >
                          <div class="jsx-3606761601 plat-icon i-twitter">
                            <svg
                              width="26"
                              height="26"
                              viewBox="0 0 48 48"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M24.0002 47.001C36.7028 47.001 47.0002 36.7035 47.0002 24.001C47.0002 11.2984 36.7028 1.00098 24.0002 1.00098C11.2977 1.00098 1.00024 11.2984 1.00024 24.001C1.00024 36.7035 11.2977 47.001 24.0002 47.001Z"
                                fill="#1DA1F2"
                              ></path>
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M38.2029 13.5327C37.3894 14.0824 35.5215 14.8813 34.6003 14.8813V14.8829C33.5484 13.7237 32.0675 13 30.4252 13C27.2353 13 24.6488 15.7287 24.6488 19.0925C24.6488 19.5598 24.7001 20.0157 24.795 20.4529H24.794C20.4671 20.3331 15.7348 18.0452 12.886 14.1294C11.1344 17.3277 12.6501 20.8848 14.6378 22.1809C13.9574 22.235 12.7049 22.0982 12.1153 21.4913C12.0758 23.6142 13.0434 26.4269 16.5714 27.4473C15.8919 27.8329 14.6892 27.7223 14.1662 27.6402C14.3497 29.4322 16.7285 31.775 19.3297 31.775C18.4026 32.9063 14.9144 34.9582 11 34.3054C13.6584 36.0118 16.7568 37 20.0362 37C29.3556 37 36.5929 29.0322 36.2034 19.2027C36.2019 19.1919 36.2019 19.1811 36.2009 19.1693C36.2019 19.144 36.2034 19.1187 36.2034 19.0925C36.2034 19.0619 36.2009 19.0331 36.2 19.0035C37.0484 18.3914 38.1868 17.3087 39 15.8836C38.5284 16.1577 37.1134 16.7064 35.7968 16.8426C36.6418 16.3615 37.8937 14.7858 38.2029 13.5327Z"
                                fill="white"
                              ></path>
                            </svg>
                          </div>
                          <span class="jsx-3606761601 plat-text"
                            >分享到 Twitter</span
                          > </a> -->
                        <!-- <a
                          href="https://pinterest.com/pin/create/button/?url=https%3A%2F%2Fwww.tete.com%2F%40shufflesjr%2Fvideo%2F6895126904592928006%3Fsender_device%3Dpc%26sender_web_id%3D6887806512443328001%26is_from_webapp%3D1&amp;media=https%3A%2F%2Fs16.tetecdn.com%2Fmusical%2Fresource%2Fmtact%2Fstatic%2Fimages%2Fshare_img.png&amp;desc=https%3A%2F%2Fwww.tete.com%2F%40shufflesjr%2Fvideo%2F6895126904592928006%3Fsender_device%3Dpc%26sender_web_id%3D6887806512443328001%26is_from_webapp%3D1"
                          target="_blank"
                          class="jsx-3606761601 share-item-wrapper"
                        >
                          <div class="jsx-3606761601 plat-icon i-pinterest">
                            <svg
                              width="26"
                              height="26"
                              viewBox="0 0 48 48"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M24.0173 3C12.4102 3 3 12.3947 3 23.9827C3 32.8766 8.53541 40.4753 16.3542 43.5321C16.1639 41.8742 16.0082 39.3183 16.4234 37.5049C16.8039 35.8643 18.8797 27.074 18.8797 27.074C18.8797 27.074 18.257 25.8133 18.257 23.9655C18.257 21.0469 19.9522 18.8709 22.0626 18.8709C23.8616 18.8709 24.7265 20.2179 24.7265 21.824C24.7265 23.6201 23.5848 26.3141 22.9794 28.8183C22.4777 30.9079 24.0345 32.6176 26.093 32.6176C29.8294 32.6176 32.7009 28.6801 32.7009 23.0156C32.7009 17.9901 29.0856 14.4844 23.9135 14.4844C17.9283 14.4844 14.4168 18.9572 14.4168 23.5855C14.4168 25.3816 15.1087 27.3158 15.9736 28.3692C16.1466 28.5765 16.1639 28.7664 16.112 28.9737C15.9563 29.6299 15.5931 31.0633 15.5239 31.3569C15.4374 31.7368 15.2125 31.8232 14.8146 31.6332C12.1853 30.4071 10.542 26.5905 10.542 23.4992C10.542 16.8849 15.3509 10.8059 24.4324 10.8059C31.7149 10.8059 37.3887 15.9868 37.3887 22.9293C37.3887 30.1653 32.822 35.9852 26.4909 35.9852C24.3632 35.9852 22.3566 34.8799 21.682 33.5674C21.682 33.5674 20.6268 37.574 20.3673 38.5584C19.9003 40.389 18.6202 42.6686 17.7553 44.0674C19.7273 44.6719 21.8031 45 23.9827 45C35.5897 45 44.9999 35.6053 44.9999 24.0173C45.0345 12.3947 35.6243 3 24.0173 3Z"
                                fill="#E60019"
                              ></path>
                            </svg>
                          </div>
                          <span class="jsx-3606761601 plat-text"
                            >分享到 Pinterest</span
                          > </a> -->
                        <!-- <a
                          href="http://www.reddit.com/submit?url=https%3A%2F%2Fwww.tete.com%2F%40shufflesjr%2Fvideo%2F6895126904592928006%3Fsender_device%3Dpc%26sender_web_id%3D6887806512443328001%26is_from_webapp%3D1"
                          target="_blank"
                          class="jsx-3606761601 share-item-wrapper"
                        >
                          <div class="jsx-3606761601 plat-icon i-reddit">
                            <svg
                              width="26"
                              height="26"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 24C5.3736 24 0 18.6264 0 12C0 5.3736 5.3736 0 12 0C18.6264 0 24 5.3736 24 12C24 18.6264 18.6264 24 12 24Z"
                                fill="#FF4500"
                              ></path>
                              <path
                                d="M14.5765 14.4872C13.9304 14.4872 13.4036 13.9552 13.4036 13.3027C13.4036 12.6502 13.9304 12.1182 14.5765 12.1182C15.2226 12.1182 15.7494 12.6502 15.7494 13.3027C15.7494 13.9552 15.2226 14.4872 14.5765 14.4872ZM14.7837 16.431C13.9822 17.2381 12.4491 17.3018 11.9989 17.3018C11.5486 17.3018 10.0133 17.2381 9.21409 16.431C9.09478 16.3105 9.09478 16.1173 9.21409 15.9968C9.33341 15.8763 9.52476 15.8763 9.64408 15.9968C10.1484 16.5061 11.2267 16.6879 11.9989 16.6879C12.7688 16.6879 13.8494 16.5061 14.3537 15.9968C14.473 15.8763 14.6643 15.8763 14.7837 15.9968C14.9007 16.1173 14.9007 16.3105 14.7837 16.431ZM8.24381 13.3027C8.24381 12.6502 8.7706 12.1182 9.4167 12.1182C10.0628 12.1182 10.5896 12.6502 10.5896 13.3027C10.5896 13.9552 10.0628 14.4872 9.4167 14.4872C8.7706 14.4872 8.24381 13.9552 8.24381 13.3027ZM19.5 12.1182C19.5 11.202 18.7661 10.4608 17.8588 10.4608C17.4154 10.4608 17.0146 10.6382 16.7197 10.9269C15.5986 10.1085 14.052 9.581 12.3298 9.51962L13.0772 5.96615L15.5198 6.49133C15.5491 7.11881 16.0579 7.61898 16.686 7.61898C17.3343 7.61898 17.8588 7.08926 17.8588 6.43449C17.8588 5.77972 17.3343 5.25 16.686 5.25C16.2244 5.25 15.8305 5.52055 15.6391 5.91159L12.9106 5.32503C12.8341 5.30911 12.7553 5.32275 12.69 5.36595C12.6247 5.40914 12.5797 5.47508 12.5639 5.55237L11.7445 9.45141C11.74 9.47415 11.7445 9.49461 11.7445 9.51735C9.99077 9.56282 8.4149 10.0925 7.27578 10.9224C6.98086 10.6359 6.5824 10.4608 6.14115 10.4608C5.2339 10.4608 4.5 11.2043 4.5 12.1182C4.5 12.7912 4.89847 13.3709 5.47028 13.6301C5.44552 13.7938 5.43201 13.962 5.43201 14.1325C5.43201 16.6834 8.37213 18.75 11.9989 18.75C15.6256 18.75 18.5657 16.6834 18.5657 14.1325C18.5657 13.9643 18.5522 13.7983 18.5275 13.6346C19.097 13.3755 19.5 12.7957 19.5 12.1182Z"
                                fill="white"
                              ></path>
                            </svg>
                          </div>
                          <span class="jsx-3606761601 plat-text"
                            >分享到 Reddit</span
                          > </a> -->
                        <!-- href="https://www.facebook.com/sharer/sharer.php?app_id=2804752129798185&amp;u=https%3A%2F%2Fwww.tete.com%2F%40shufflesjr%2Fvideo%2F6895126904592928006%3Fsender_device%3Dpc%26sender_web_id%3D6887806512443328001%26is_from_webapp%3D1&amp;display=popup&amp;sdk=joey" -->

                        <a
                          :href="`https://www.linkedin.com/shareArticle?mini=true&source=str&title=${item.title}&url=https://teteday.com/foryou?id=${item.id}`"
                          @click="shareFunc('linkedin')"
                          class="jsx-3606761601 share-item-wrapper"
                        >
                          <div class="jsx-3606761601 plat-icon i-facebook">
                            <img
                              class="linkedin-icon"
                              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjA2NzgwNzI2ODgwIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjUzMTQiIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+QGZvbnQtZmFjZSB7IGZvbnQtZmFtaWx5OiBlbGVtZW50LWljb25zOyBzcmM6IHVybCgiY2hyb21lLWV4dGVuc2lvbjovL21vb21iZW9kZm9tZHBqbnBvY29iZW1vaWFlbWVkbmtnL2ZvbnRzL2VsZW1lbnQtaWNvbnMud29mZiIpIGZvcm1hdCgid29mZiIpLCB1cmwoImNocm9tZS1leHRlbnNpb246Ly9tb29tYmVvZGZvbWRwam5wb2NvYmVtb2lhZW1lZG5rZy9mb250cy9lbGVtZW50LWljb25zLnR0ZiAiKSBmb3JtYXQoInRydWV0eXBlIik7IH0KPC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTUxMi4yNjcyMzQgOTU5LjU2OTk2OGMyNDcuMjIzMjU1IDAgNDQ3LjU3MjAxNi0yMDAuNDAwOTc5IDQ0Ny41NzIwMTYtNDQ3LjU4MjI1NSAwLTI0Ny4xNzEwMzctMjAwLjM0NzczNy00NDcuNTU4NzA1LTQ0Ny41NzIwMTYtNDQ3LjU1ODcwNS0yNDcuMTk0NTg2IDAtNDQ3LjU2ODk0NCAyMDAuMzg3NjY5LTQ0Ny41Njg5NDQgNDQ3LjU1ODcwNSAwIDI0Ny4xODIzIDIwMC4zNzMzMzQgNDQ3LjU4MjI1NSA0NDcuNTY4OTQ0IDQ0Ny41ODIyNTUiIGZpbGw9IiMxMjg0QzciIHAtaWQ9IjUzMTUiPjwvcGF0aD48cGF0aCBkPSJNMzg3LjAxMzI5NSA2OTkuMTg4NzYzaC04Ny4yNDkzNjVWNDE5Ljk5OTgwOGg4Ny4yNDkzNjV2Mjc5LjE4ODk1NXogbS00NS44NjA4NDgtMzE0LjExNDcwN2gtMC42Mjg2NjZjLTMxLjU3MDQ4IDAtNTIuMDQyMDQzLTIxLjM0MTg2Ni01Mi4wNDIwNDMtNDguMzc4NTgyIDAtMjcuNTczMjMyIDIxLjA4NjkxOC00OC40Nzg5MjIgNTMuMjg2MDY0LTQ4LjQ3ODkyMiAzMi4xNzU1OTYgMCA1MS45NzU0OTEgMjAuODUyNDQ5IDUyLjYwNzIyOCA0OC40MDIxMzEgMC4wMDEwMjQgMjcuMDQ2OTU1LTIwLjQzMDYwOCA0OC40NTUzNzMtNTMuMjIyNTgzIDQ4LjQ1NTM3M3ogbTM5NC44OTkyNTkgMzE0LjExNDcwN0g2MzcuMTI1OTU0VjU1NC43MTEzNzZjMC0zNy44MTUxNTctMTUuNDU3NTk3LTYzLjYxODA5MS00OS40OTY2NjQtNjMuNjE4MDktMjYuMDMxMjYgMC00MC40ODg1MjEgMTcuNDEwMTQ2LTQ3LjIzMzg3OCAzNC4yMDQ5MzctMi41MTg3NTggNi4wMTMyNzktMi4xMzM3NzcgMTQuNDA1MDQzLTIuMTMzNzc3IDIyLjgyMDM1NnYxNTEuMDY5MTZoLTk4LjAwMTE4NHMxLjI3MzcxMy0yNTUuOTIxMTYxIDAtMjc5LjE4ODk1NWg5OC4wMDExODR2NDMuODE1MTI1YzUuNzk0MTY3LTE5LjE1NzkxOCAzNy4wOTc0MTMtNDYuNTAxOCA4Ny4wOTM3MzMtNDYuNTAxOCA2MS45ODYwMTggMCAxMTAuNjk2MzM4IDQwLjE2ODA0NSAxMTAuNjk2MzM4IDEyNi42MzAwNDF2MTU1LjI0NjYxM3oiIGZpbGw9IiNGRkZGRkYiIHAtaWQ9IjUzMTYiPjwvcGF0aD48L3N2Zz4="
                              alt=""
                            />
                          </div>
                          <span class="jsx-3606761601 plat-text"
                            >Share to LinkedIn</span
                          >
                        </a>
                        <a
                          @click="shareFunc('facebook')"
                          :href="`https://www.facebook.com/sharer/sharer.php?app_id=2804752129798185&u=https://teteday.com/foryou?id=${item.id}`"
                          target="_blank"
                          class="jsx-3606761601 share-item-wrapper"
                        >
                          <div class="jsx-3606761601 plat-icon i-facebook">
                            <svg
                              width="26"
                              height="26"
                              viewBox="0 0 48 48"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M24 47C36.7025 47 47 36.7025 47 24C47 11.2975 36.7025 1 24 1C11.2975 1 1 11.2975 1 24C1 36.7025 11.2975 47 24 47Z"
                                fill="white"
                              ></path>
                              <path
                                d="M24 1C11.2964 1 1 11.2964 1 24C1 35.4775 9.40298 44.9804 20.3846 46.7205L20.3936 30.6629H14.5151V24.009H20.3936C20.3936 24.009 20.3665 20.2223 20.3936 18.5363C20.4206 16.8503 20.7542 15.2274 21.6288 13.7487C22.9722 11.4586 25.0639 10.3407 27.6335 10.0251C29.7432 9.76362 31.826 10.0521 33.9087 10.3407C34.0529 10.3587 34.125 10.3767 34.2693 10.4038C34.2693 10.4038 34.2783 10.6472 34.2693 10.8005C34.2603 12.4053 34.2693 16.0839 34.2693 16.0839C33.2685 16.0659 31.6096 15.9667 30.5096 16.138C28.6884 16.4175 27.6425 17.5806 27.6064 19.4108C27.5704 20.8354 27.5884 24.009 27.5884 24.009H33.9988L32.962 30.6629H27.5974V46.7205C38.597 44.9984 47.009 35.4775 47.009 24C47 11.2964 36.7036 1 24 1Z"
                                fill="#0075FA"
                              ></path>
                            </svg>
                          </div>
                          <span class="jsx-3606761601 plat-text"
                            >Share to Facebook</span
                          >
                        </a>
                        <a
                          class="jsx-3606761601 share-item-wrapper"
                          @click="shareFunc('copyUrl')"
                        >
                          <div class="jsx-3606761601 plat-icon i-copy link">
                            <svg
                              width="26"
                              height="26"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
                                fill="#FE2C55"
                              ></path>
                              <path
                                d="M11.3028 15.2151C10.4934 16.0245 9.30444 16.016 8.6442 15.3557C7.98397 14.6955 7.97544 13.5065 8.78485 12.6971C9.06049 12.4215 9.06049 11.9745 8.78485 11.6989C8.5092 11.4232 8.06229 11.4232 7.78665 11.6989C6.49952 12.9861 6.36369 15.0716 7.646 16.354C8.92832 17.6363 11.0138 17.5005 12.301 16.2133L13.3248 15.1895C14.4068 14.1075 14.6713 12.4803 13.9787 11.2183C13.7911 10.8765 13.3621 10.7515 13.0203 10.9391C12.6786 11.1267 12.5536 11.5557 12.7412 11.8975C13.1094 12.5685 12.9986 13.5192 12.3266 14.1913L11.3028 15.2151ZM12.6972 8.7849C13.5066 7.97548 14.6956 7.984 15.3558 8.64425C16.016 9.30451 16.0246 10.4935 15.2152 11.3029C14.9395 11.5785 14.9395 12.0255 15.2152 12.3011C15.4908 12.5768 15.9377 12.5768 16.2134 12.3011C17.5005 11.0139 17.6363 8.92838 16.354 7.64603C15.0717 6.36368 12.9862 6.49951 11.699 7.78668L10.6752 8.8105C9.59325 9.89253 9.3287 11.5197 10.0213 12.7817C10.2089 13.1235 10.6379 13.2485 10.9797 13.0609C11.3214 12.8733 11.4464 12.4442 11.2588 12.1025C10.8906 11.4315 11.0014 10.4808 11.6734 9.80873L12.6972 8.7849ZM13.0336 12.6277C13.0186 12.3531 12.9459 12.0887 12.8178 11.8554C12.7737 11.7749 12.7493 11.6889 12.743 11.6029C12.7493 11.6889 12.7736 11.7749 12.8178 11.8554C12.9459 12.0888 13.0186 12.3531 13.0336 12.6277ZM13.2629 15.1276L12.2391 16.1514C10.9813 17.4093 8.95136 17.5356 7.70785 16.2921C7.11888 15.7031 6.83721 14.9377 6.8375 14.1615C6.8372 14.9377 7.11887 15.7031 7.70785 16.2921C8.95136 17.5357 10.9813 17.4093 12.2391 16.1515L13.2629 15.1277C13.8201 14.5704 14.1544 13.8662 14.2473 13.1452C14.1544 13.8661 13.8201 14.5704 13.2629 15.1276ZM8.90341 12.2276C8.89633 12.3759 8.8362 12.522 8.723 12.6352C8.28443 13.0738 8.07511 13.623 8.07481 14.147C8.07512 13.623 8.28444 13.0739 8.723 12.6353C8.83621 12.5221 8.89635 12.3759 8.90341 12.2276ZM12.6354 8.72306C13.4748 7.88361 14.7193 7.88401 15.4176 8.58241C15.6813 8.84604 15.8454 9.18748 15.9025 9.55557C15.8454 9.18746 15.6813 8.846 15.4176 8.58236C14.7193 7.88396 13.4748 7.88356 12.6354 8.72301L11.6116 9.74684C11.1715 10.1869 10.9613 10.7444 10.9635 11.2737C10.9613 10.7445 11.1715 10.187 11.6116 9.74689L12.6354 8.72306ZM11.2573 12.4817C11.244 12.6856 11.13 12.8786 10.9376 12.9842C10.6382 13.1485 10.2623 13.039 10.098 12.7396C9.88489 12.3514 9.76492 11.927 9.73407 11.4947C9.76493 11.9269 9.8849 12.3513 10.098 12.7396C10.2623 13.039 10.6382 13.1485 10.9376 12.9842C11.13 12.8786 11.244 12.6856 11.2573 12.4817ZM15.1103 11.9351C15.1348 12.0466 15.1903 12.1526 15.277 12.2393C15.5185 12.4808 15.91 12.4808 16.1515 12.2393C16.7 11.6908 17.0333 10.9955 17.1317 10.2827C17.0333 10.9955 16.6999 11.6908 16.1515 12.2392C15.91 12.4807 15.5185 12.4807 15.277 12.2392C15.1903 12.1526 15.1348 12.0466 15.1103 11.9351Z"
                                fill="white"
                              ></path>
                            </svg>
                          </div>
                          <span class="jsx-3606761601 plat-text"
                            >Copy link</span
                          >
                        </a>
                      </div>
                    </div>
                  </template>
                  <div
                    class="jsx-1045706868 bar-item-wrapper engagement-button-wrapper"
                  >
                    <div
                      class="jsx-1045706868 bar-item-img bar-item-share engagement-icon"
                      style="background-image: url('')"
                    >
                      <svg
                        width="33"
                        height="33"
                        viewBox="0 0 48 48"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M26.2627 5.14086C27.0249 4.83858 27.8944 5.03217 28.4564 5.62927L44.4564 22.6293C45.1812 23.3994 45.1812 24.6006 44.4564 25.3707L28.4564 42.3707C27.8944 42.9678 27.0249 43.1614 26.2627 42.8591C25.5005 42.5569 25 41.82 25 41V32.5621C19.365 32.9136 14.8898 34.7029 11.736 36.49C9.97604 37.4874 8.63311 38.4812 7.73929 39.2164C7.29282 39.5837 6.95983 39.8853 6.74434 40.0888C6.63664 40.1905 6.55845 40.2676 6.51025 40.316C6.48616 40.3402 6.46958 40.3572 6.46058 40.3665L6.4564 40.3707C6.45604 40.3711 6.45568 40.3715 6.45532 40.3719C6.45502 40.3722 6.45472 40.3725 6.45442 40.3728C6.454 40.3733 6.45358 40.3737 6.45316 40.3742C6.45305 40.3743 6.45326 40.3741 6.45316 40.3742C5.89108 40.9683 5.02332 41.1608 4.26271 40.8591C3.50049 40.5569 3 39.82 3 39C3 37.3105 3.71048 34.991 4.78949 32.6236C5.90132 30.1843 7.51673 27.4503 9.55935 24.8805C13.2198 20.2754 18.5168 15.8846 25 15.1179V7.00061C25 6.18065 25.5005 5.44313 26.2627 5.14086ZM29 12.0432V17C29 18.1046 28.1046 19 27 19C21.3967 19 16.4105 22.6897 12.6906 27.3695C11.0464 29.4381 9.71235 31.626 8.74629 33.6101C9.07093 33.411 9.41022 33.2104 9.76397 33.01C13.7457 30.7537 19.5829 28.5 27 28.5C28.1046 28.5 29 29.3954 29 30.5V35.9563L40.2535 24L29 12.0432Z"
                        ></path>
                      </svg>
                    </div>
                    <strong
                      title="share"
                      class="jsx-1045706868 bar-item-text engagement-text"
                      >{{ share_num | Formats }}</strong
                    >
                  </div>
                </a-popover>
              </div>
            </div>
          </div>
        </div></span
      >
    </div>
    <a-modal
      v-model="visible"
      title="Report"
      :confirmLoading="reportLoading"
      @ok="hideModal"
    >
      <a-textarea
        placeholder="Please enter the report content"
        :rows="4"
        v-model="reportContent"
      />
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>

<style lang="less">
@import url("./index.less");
</style>
