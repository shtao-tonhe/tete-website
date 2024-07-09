<template>
  <div class="jsx-2454030768 video-card-big browse-mode video-card-one-modal">
    <div class="jsx-2454030768 video-card-container">
      <div class="jsx-2454030768 video-card-container-warn"></div>
      <div class="jsx-1169024735 background-image">
        <img v-lazy="item && item.cover && item.cover" class="jsx-1169024735" />
      </div>

      <div
        class="jsx-1283372866 video-card-browse"
        v-lazy:background-image="item && item.cover && item.cover"
      >
        <div
          class="m3u8Video"
          :class="isHorizontal ? 'horizontal' : ''"
          id="msemodal"
          v-show="showVideo"
        ></div>

        <div
          class="play-circle-box"
          @click.stop="togglePlay"
          v-if="!playStatus && !showLoading"
        >
          <a-icon
            type="play-circle"
            :style="{
              fontSize: '30px',
              color: '#fff',
            }"
          />
        </div>
        <videoLoading v-if="showLoading && playStatus"></videoLoading>
        <span
          class="jsx-1283372866 event-delegate-mask"
          @click.stop="togglePlay"
        ></span>
        <div
          class="reload-box"
          @click.stop="reload(true)"
          v-if="showError && time === 5"
        >
          <a-icon
            type="sync"
            :style="{
              fontSize: '30px',
              color: '#fff',
            }"
          />
        </div>
      </div>
      <img
        v-if="currentIndex != 0"
        @click="preVideo"
        src="~/assets/images/arrow-left.svg"
        class="jsx-1169024735 control-icon arrow-left"
      />
      <img
        v-if="lastIndex != currentIndex"
        @click="nextVideo"
        src="~/assets/images/arrow-left.svg"
        class="jsx-1169024735 control-icon arrow-right"
      /><img
        @click="closeModal"
        src="~/assets/images/close-video.svg"
        class="jsx-1169024735 control-icon close"
      /><img
        src="~/assets/images/IMG_1402.JPG"
        alt="TETE"
        class="jsx-1169024735 control-icon logo"
      />
      <div class="jsx-1860515201 mute-icon browse-mode" @click.stop="setVolume">
        <svg
          v-if="volumeStatus === 0"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          style="fill: rgb(84, 84, 84); fill-opacity: 0.92"
        >
          <circle cx="24" cy="24" r="24" fill="000" fill-opacity="1"></circle>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M21 16.9118C21 15.2513 20.8942 15.0909 20.709 15.0221C20.5238 14.9763 20.3122 14.9992 20.1799 15.1138L15.0741 19.5258H11.4762C11.2116 19.5258 11 19.7092 11 19.9384V28.084C11 28.3132 11.2116 28.4965 11.4762 28.4965H15.0741L20.1799 32.8862C20.3122 33.0008 20.5238 33.0237 20.709 32.9779C20.8942 32.9091 21 32.7487 21 32.5882V16.9118Z"
            fill="white"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M35.098 18.9489C34.5998 18.4508 33.7921 18.4508 33.2939 18.949L30.1368 22.1061L26.9797 18.949C26.4815 18.4508 25.6738 18.4508 25.1756 18.9489C24.6775 19.4471 24.6775 20.2548 25.1756 20.753L28.3327 23.9101L25.1757 27.0672C24.6775 27.5654 24.6775 28.3731 25.1757 28.8713C25.6738 29.3694 26.4815 29.3694 26.9797 28.8713L30.1368 25.7142L33.2939 28.8713C33.7921 29.3694 34.5998 29.3694 35.0979 28.8713C35.5961 28.3731 35.5961 27.5654 35.0979 27.0672L31.9409 23.9101L35.098 20.753C35.5962 20.2548 35.5962 19.4471 35.098 18.9489Z"
            fill="white"
          ></path>
        </svg>
        <svg
          v-else
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          style="fill: rgb(84, 84, 84); fill-opacity: 0.92"
        >
          <circle cx="24" cy="24" r="24"></circle>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M21 16.9118C21 15.2513 20.8942 15.0909 20.709 15.0221C20.5238 14.9763 20.3122 14.9992 20.1799 15.1138L15.0741 19.5258H11.4762C11.2116 19.5258 11 19.7092 11 19.9384V28.084C11 28.3132 11.2116 28.4965 11.4762 28.4965H15.0741L20.1799 32.8862C20.3122 33.0008 20.5238 33.0237 20.709 32.9779C20.8942 32.9091 21 32.7487 21 32.5882V16.9118Z"
            fill="white"
          ></path>
          <path
            d="M30.6653 15C32.7348 17.2304 34.0001 20.2174 34.0001 23.5C34.0001 26.7826 32.7348 29.7696 30.6653 32"
            stroke="white"
            stroke-width="2.5"
            stroke-linecap="round"
          ></path>
          <path
            d="M26.8799 17.8833C28.1994 19.381 28.9999 21.347 28.9999 23.5C28.9999 25.653 28.1994 27.6191 26.8799 29.1168"
            stroke="white"
            stroke-width="2.5"
            stroke-linecap="round"
          ></path>
        </svg>
      </div>
      <div class="jsx-1285478177 modal">
        <div class="jsx-1285478177 modal-wrapper">
          <div class="jsx-1285478177 modal-mask">
            <div class="jsx-1285478177 close"></div>
          </div>
          <div class="jsx-1285478177 modal-content">
            <div
              class="tete-ui-loading-container is-center"
              style="width: 32px; height: 32px"
            >
              <div class="tete-ui-loading" style="transform: scale(0.16)">
                <svg
                  preserveAspectRatio="none"
                  viewBox="0 0 160 90"
                  width="160"
                  height="90"
                >
                  <defs>
                    <mask id="redhole">
                      <rect width="100%" height="100%" fill="white"></rect>
                      <circle
                        fill="black"
                        class="tete-ui-loading-red tete-ui-loading-black"
                      ></circle>
                    </mask>
                    <mask id="greenhole">
                      <rect width="100%" height="100%" fill="white"></rect>
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
      <div class="jsx-895047106 report-text" @click="report">
        <svg
          class="report-icon"
          width="16"
          height="15"
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
          <div class="jsx-1285478177 modal-content">
            <div
              class="tete-ui-loading-container"
              style="width: 48px; height: 48px"
            >
              <div class="tete-ui-loading" style="transform: scale(0.24)">
                <svg
                  preserveAspectRatio="none"
                  viewBox="0 0 160 90"
                  width="160"
                  height="90"
                >
                  <defs>
                    <mask id="redhole">
                      <rect width="100%" height="100%" fill="white"></rect>
                      <circle
                        fill="black"
                        class="tete-ui-loading-red tete-ui-loading-black"
                      ></circle>
                    </mask>
                    <mask id="greenhole">
                      <rect width="100%" height="100%" fill="white"></rect>
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
    <div class="jsx-2454030768 content-container">
      <div class="jsx-2454030768 user-info-container">
        <div class="jsx-3166634257 jsx-932449746 user-info">
          <nuxt-link
            :to="`/profile?userId=${item && item.user && item.user.id}`"
            class="user-avatar jsx-1040045378"
            rel="noopener"
            ><span
              class="tete-avatar tete-avatar-circle"
              style="
                border-color: rgba(22, 24, 35, 0.12);
                border-width: 0.5px;
                width: 40px;
                height: 40px;
              "
              ><img
                v-if="item && item.user && item.user.head_portrait"
                :src="(item && item.user && item.user.head_portrait) || ''" />
              <img v-else src="~/assets/images/tx.png" /></span
          ></nuxt-link>
          <div class="jsx-3166634257 jsx-932449746 user-info-link-container">
            <nuxt-link
              :to="`/profile?userId=${item && item.user && item.user.id}`"
              class="user-info-link jsx-1040045378"
              rel="noopener"
              ><h2 class="jsx-3166634257 jsx-932449746 user-username">
                {{ item && item.user && item.user.nickname }}
              </h2></nuxt-link
            ><nuxt-link
              :to="`/profile?userId=${item && item.user && item.user.id}`"
              class="user-info-link jsx-1040045378"
              rel="noopener"
            >
              <!-- <h2 class="jsx-3166634257 jsx-932449746 user-nickname">
                @{{ item && item.user && item.user.username }}
              </h2> -->
            </nuxt-link>
          </div>
          <!-- <button
            type="button"
            class="follow-button jsx-2790469629 tete-btn-pc tete-btn-pc-medium tete-btn-pc-line"
          >
            關注
          </button> -->
          <a-popover placement="bottomRight" v-if="typeRouter">
            <template slot="content">
              <div class="jsx-3371939883 action-container">
                <p class="jsx-3371939883 action-item" @click="settings">
                  Privacy settings
                </p>
                <p class="jsx-3371939883 action-item" @click="showConfirm">
                  Delete
                </p>
              </div>
            </template>
            <div
              class="jsx-3371939883 more-actions"
              style="position: absolute; top: 26px; right: 26px"
            >
              <div class="jsx-3371939883 more-icon">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 48 48"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4 24C4 21.7909 5.79086 20 8 20C10.2091 20 12 21.7909 12 24C12 26.2091 10.2091 28 8 28C5.79086 28 4 26.2091 4 24ZM20 24C20 21.7909 21.7909 20 24 20C26.2091 20 28 21.7909 28 24C28 26.2091 26.2091 28 24 28C21.7909 28 20 26.2091 20 24ZM36 24C36 21.7909 37.7909 20 40 20C42.2091 20 44 21.7909 44 24C44 26.2091 42.2091 28 40 28C37.7909 28 36 26.2091 36 24Z"
                  ></path>
                </svg>
              </div>
            </div>
          </a-popover>
        </div>
      </div>
      <div class="jsx-2454030768 video-infos-container">
        <h1 class="jsx-935353440 music-title">
          {{ item.title }}
        </h1>
        <h2 class="jsx-935353440 music-info">
          {{ item.describe }}
        </h2>
        <div class="jsx-1182361573 action-container">
          <div class="jsx-1182361573 action-left">
            <span class="jsx-1182361573 action-wrapper-v2"
              ><span
                @click="point"
                :class="isPoint ? 'like' : 'unlike'"
                class="jsx-1182361573 icons"
              ></span
              ><strong class="jsx-1182361573 like-text"
                >{{ point_praise_num | Formats }}
              </strong></span
            ><span class="jsx-1182361573 action-wrapper-v2"
              ><span class="jsx-1182361573 icons comment"></span
              ><strong class="jsx-1182361573 comment-text">
                {{ item.commentNum || 0 | Formats }}
              </strong></span
            >
          </div>

          <div class="jsx-1182361573 action-right">
            <div class="jsx-3885976599 share-container">
              <!-- <p class="jsx-3885976599 share-word">Share to</p> -->
              <div class="jsx-3885976599 share-group">
                <!-- <a-tooltip placement="top">
                  <template slot="title">
                    <span>Copy link</span>
                  </template>
                  <a
                    @click="shareFunc('copyUrl')"
                    class="jsx-3885976599 jsx-2968923418 jsx-4149806874"
                    style="cursor: pointer"
                    ><div
                      class="jsx-3885976599 copy-link"
                      style="width: 24px; height: 24px"
                    ></div
                  ></a>
                </a-tooltip> -->
                <!-- <a
                  @click="shareFunc('facebook')"
                  :href="`https://www.facebook.com/sharer/sharer.php?app_id=2804752129798185&u=https://teteday.com/foryou?id=${item.id}`"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="jsx-3885976599 jsx-2968923418 jsx-4149806874"
                  ><div class="jsx-3885976599">
                    <svg
                      width="24"
                      height="24"
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
                    </svg></div
                ></a> -->

                <!--
                  <a
                  href="https://twitter.com/intent/tweet?refer_source=https%3A%2F%2Fwww.tete.com%2F%40user048160024%2Fvideo%2F6888568519407979781%3Fsender_device%3Dpc%26sender_web_id%3D6887806512443328001%26is_from_webapp%3D1&amp;text=https%3A%2F%2Fwww.tete.com%2F%40user048160024%2Fvideo%2F6888568519407979781%3Fsender_device%3Dpc%26sender_web_id%3D6887806512443328001%26is_from_webapp%3D1"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="jsx-3885976599 jsx-2968923418 jsx-4149806874"
                  ><div class="jsx-3885976599">
                    <svg
                      width="24"
                      height="24"
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
                    </svg></div
                ></a>
                <a
                  href="https://wa.me/?text=https%3A%2F%2Fwww.tete.com%2F%40user048160024%2Fvideo%2F6888568519407979781%3Fsender_device%3Dpc%26sender_web_id%3D6887806512443328001%26is_from_webapp%3D1"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="jsx-3885976599 jsx-2968923418 jsx-4149806874"
                  ><div class="jsx-3885976599">
                    <svg
                      width="24"
                      height="24"
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
                    </svg></div></a
                ><a
                  href="#"
                  class="jsx-3885976599 jsx-2968923418 jsx-4149806874"
                  ><div class="jsx-3885976599">
                    <svg
                      width="24"
                      height="24"
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
                    </svg></div
                ></a> -->
              </div>
            </div>
          </div>
        </div>
        <div class="jsx-2454030768 comment-container">
          <a-list
            class="comment-list"
            item-layout="horizontal"
            :loading="listloading"
            :data-source="commentData"
          >
            <div v-if="loadEnd" class="seemore-box dis">end！</div>
            <div
              v-if="
                commentData &&
                commentData.length > 0 &&
                !listloading &&
                !loadEnd
              "
              class="seemore-box"
            >
              <a-button
                :loading="listloading"
                type="link"
                @click="onPageScroll"
              >
                see more
              </a-button>
            </div>
            <a-list-item slot="renderItem" slot-scope="item">
              <a-comment
                :author="item && item.user && item.user.nickname"
                :avatar="
                  (item &&
                    item.user &&
                    item.user.head_portrait &&
                    item.user.head_portrait) ||
                  require('~/assets/images/tx.png')
                "
              >
                <p slot="content">{{ item.content }}</p>
                <span>{{ item.created_at }}</span>
              </a-comment>
            </a-list-item>
          </a-list>

          <!-- <div class="loadingbox">
            <a-skeleton
              v-if="listloading && (!commentData || commentData.length === 0)"
              avatar
              :paragraph="{ rows: 4 }"
            />
          </div> -->
        </div>
        <div class="add-comment">
          <a-comment>
            <a-avatar
              slot="avatar"
              :src="
                ($store.state.auth &&
                  $store.state.auth.userInfo &&
                  $store.state.auth.userInfo.info &&
                  $store.state.auth.userInfo.info.head_portrait) ||
                require('~/assets/images/tx.png')
              "
              :alt="
                $store.state.auth &&
                $store.state.auth.userInfo &&
                $store.state.auth.userInfo.info &&
                $store.state.auth.userInfo.info.nickname
              "
            />
            <div slot="content">
              <a-form-item>
                <a-textarea
                  :rows="4"
                  :value="commentcontent"
                  @change="handleChange"
                />
              </a-form-item>
              <a-form-item>
                <a-button
                  html-type="submit"
                  :loading="submitting"
                  type="primary"
                  @click="handleSubmit"
                >
                  Add Comment
                </a-button>
              </a-form-item>
            </div>
          </a-comment>
        </div>
      </div>
    </div>

    <a-modal
      :confirm-loading="confirmLoading"
      v-model="editModal"
      title="Privacy settings"
      @ok="handleOk"
    >
      <a-form :layout="formLayout" :form="form">
        <a-form-item label="Who can view this video">
          <a-select
            v-decorator="[
              'state',
              {
                rules: [{ required: true, message: $t('page.pleaseSelect') }],
              },
            ]"
            :placeholder="$t('page.pleaseSelect')"
            @change="handleSelectChange"
          >
            <a-select-option value="1">
              {{ $t("page.public") }}
            </a-select-option>
            <a-select-option value="2">
              {{ $t("page.private") }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
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

<script src="./index.js">
export default {};
</script>

<style>
@import url("./index.less");
</style>
