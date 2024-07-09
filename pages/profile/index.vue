<!--
 * @Author: your name
 * @Date: 2020-09-07 15:06:27
 * @LastEditTime: 2021-01-30 16:47:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tete/pages/index.vue
-->
<template>
  <div style="width: 100%">
    <div class="share-layout-content jsx-683523640">
      <div class="loading-data" v-show="!showData">
        <a-skeleton v-show="!showData" active :paragraph="{ rows: 4 }" />
      </div>
      <header
        v-if="showData"
        class="jsx-4037782421 share-layout-header share-header share-layout-header_v2"
      >
        <div class="share-info">
          <span
            class="tete-avatar tete-avatar-circle tete-avatar-circle-box"
            style="width: 120px; height: 120px"
          >
            <img
              v-if="userInfo && userInfo.info && userInfo.info.head_portrait"
              :alt="`${
                userInfo && userInfo.info && userInfo.info.username
              } TETE`"
              :src="
                (userInfo && userInfo.info && userInfo.info.head_portrait) || ''
              "
            />
            <img
              v-else
              :alt="`${
                userInfo && userInfo.info && userInfo.info.username
              } TETE`"
              src="~/assets/images/tx.png"
            />
          </span>
          <img
            class="icon-user"
            v-if="userInfo && userInfo.info && userInfo.info.is_auth === 4"
            src="~/assets/images/user-auth.svg"
          />
        </div>
        <div>
          <div class="share-title-container">
            <h2 class="jsx-683523640 share-title verified">
              <span @click="copyUrl">
                <a-tooltip placement="top">
                  <template slot="title">
                    <span class="copyBtn">
                      copy
                      {{ userInfo && userInfo.info && userInfo.info.nickname }}
                    </span>
                  </template>
                  {{ userInfo && userInfo.info && userInfo.info.nickname }}
                </a-tooltip>
              </span>
              <span v-if="userInfo && userInfo.info && userInfo.info.sex">
                <a-icon
                  v-if="userInfo.info.sex === 1"
                  type="man"
                  :style="{
                    color: '#47d5ec',
                    fontSize: '20px',
                  }"
                />
                <a-icon
                  v-else
                  type="woman"
                  :style="{
                    color: '#47d5ec',
                    fontSize: '20px',
                  }"
                />
              </span>
              <!-- <span class="share-sub-title">
                @{{ userInfo && userInfo.info && userInfo.info.username }}
              </span> -->
              <nuxt-link
                :to="`/user?userId=${userInfo.info.id}`"
                v-if="
                  userInfo.token &&
                  thisUserId &&
                  userInfo &&
                  userInfo.info &&
                  userInfo.info.id &&
                  thisUserId + '' === userInfo.info.id + ''
                "
              >
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>setting</span>
                  </template>
                  <a-icon type="setting" />
                </a-tooltip>
              </nuxt-link>
            </h2>
          </div>
        </div>
        <div class="button-box">
          <h5
            class="share-sub-money"
            v-if="
              userInfo.token &&
              (!thisUserId ||
                (userInfo &&
                  userInfo.info &&
                  userInfo.info.id &&
                  thisUserId + '' === userInfo.info.id + ''))
            "
          >
            <a-icon
              type="property-safety"
              :style="{
                fontSize: '26px',
                marginRight: '5px',
              }"
            />
            <a-statistic
              class="statistic"
              :value="userInfo && userInfo.info && userInfo.info.integral"
            >
              <template #suffix> TB </template>
            </a-statistic>
            <a-tooltip placement="top">
              <template slot="title">
                <span class="copyBtn"> detailed </span>
              </template>
              <a-icon
                type="eye"
                @click="showModalFunc('4')"
                :style="{
                  cursor: 'pointer',
                  fontSize: '18px',
                  marginTop: '5px',
                  marginLeft: '5px',
                }"
              />
            </a-tooltip>
          </h5>
          <a-button
            v-if="
              userInfo.token &&
              userInfo &&
              userInfo.info &&
              userInfo.info.id &&
              thisUserId + '' === userInfo.info.id + '' &&
              userInfo.info.is_auth !== 4
            "
            @click="go"
            type="danger"
            class="follow-button follow-button-item jsx-2790469629 jsx-683523640 share-follow tete-btn-pc tete-btn-pc-medium tete-btn-pc-primary"
          >
            {{ getBtnStatus() }}
          </a-button>
          <a-button
            v-if="
              !userInfo.token ||
              (userInfo &&
                userInfo.info &&
                userInfo.info.id &&
                userInfo.info.id &&
                thisUserId &&
                userInfo.info.id + '' !== thisUserId + '')
            "
            @click="guanzhu"
            :loading="guanzhuloading"
            type="danger"
            class="follow-button follow-button-item btn-item jsx-2790469629 jsx-683523640 share-follow tete-btn-pc tete-btn-pc-medium tete-btn-pc-primary"
          >
            {{ is_following ? $t("page.following") : $t("page.follow") }}
          </a-button>
          <a-button
            v-if="
              !userInfo.token ||
              (userInfo &&
                userInfo.info &&
                userInfo.info.id &&
                userInfo.info.id &&
                thisUserId &&
                userInfo.info.id + '' !== thisUserId + '')
            "
            @click="goShop"
            type="danger"
            class="follow-button follow-button-item btn-item jsx-2790469629 jsx-683523640 share-follow tete-btn-pc tete-btn-pc-medium tete-btn-pc-primary"
          >
            {{ $t("page.myshop") }}
          </a-button>
        </div>

        <h2 class="count-infos">
          <div class="number">
            <strong title="Following" @click="showModalFunc('2')">{{
              userInfo && userInfo.follow_num | Formats
            }}</strong>
            <span class="unit">Following</span>
          </div>
          <div class="number">
            <strong title="Followers" @click="showModalFunc('1')">{{
              fans_num | Formats
            }}</strong>
            <span class="unit">Followers</span>
          </div>
          <div class="number">
            <strong title="Likes" @click="showModalFunc('3')">{{
              userInfo && userInfo.point_num | Formats
            }}</strong>
            <span class="unit">Likes</span>
          </div>
          <div
            class="number"
            v-if="
              userInfo.token &&
              (!thisUserId ||
                (userInfo &&
                  userInfo.info &&
                  userInfo.info.id &&
                  thisUserId + '' === userInfo.info.id + ''))
            "
          >
            <strong title="Likes">
              <a-statistic
                style="font-size: 18px"
                :value="
                  userInfo &&
                  userInfo.frozen_integral &&
                  Number(userInfo.frozen_integral)
                "
              >
                <template #suffix> TB </template>
              </a-statistic>
            </strong>
            <span class="unit">Frozen</span>
          </div>
        </h2>
        <h2 class="share-desc">
          {{
            (userInfo && userInfo.info && userInfo.info.desc) ||
            $t("page.noDesc")
          }}
        </h2>
      </header>
      <main class="share-layout-main share-layout-main_v2 profile">
        <div class="jsx-1681171502 video-feed-tab">
          <p
            @click="selectItem('1')"
            @mouseover="selectItemOver('1')"
            @mouseleave="selectItemLeave('1')"
            class="jsx-1681171502"
            :class="videoType === '1' ? 'active' : ''"
          >
            <span class="jsx-1681171502">{{ $t("page.profileVideo") }}</span>
          </p>
          <p
            @mouseover="selectItemOver('2')"
            @mouseleave="selectItemLeave('2')"
            :class="videoType === '2' ? 'active' : ''"
            @click="selectItem('2')"
            class="jsx-1681171502 like"
          >
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
                d="M24 3C17.9249 3 13 7.92487 13 14V21H8C6.89543 21 6 21.8954 6 23V41C6 42.1046 6.89543 43 8 43H40C41.1046 43 42 42.1046 42 41V23C42 21.8954 41.1046 21 40 21H35V14C35 7.92487 30.0751 3 24 3ZM31 21V14C31 10.134 27.866 7 24 7C20.134 7 17 10.134 17 14V21H31Z"
              ></path></svg
            ><span class="jsx-1681171502">{{ $t("page.profileLikes") }}</span>
          </p>
          <div
            class="jsx-1681171502 bottom-line"
            :style="{
              transform:
                bottomline === '1' ? 'translateX(0px)' : 'translateX(100%)',
            }"
          ></div>
        </div>

        <div class="tt-feed profile">
          <div class="jsx-256221443 video-feed compact compact_v2">
            <profileBox :videoType="videoType"></profileBox>
          </div>
        </div>
      </main>
    </div>
    <a-modal :footer="null" v-model="showmodal1" title="Followers">
      <a-table
        :loading="loading"
        :pagination="pagination"
        @change="changepage"
        :columns="columns1"
        :data-source="columnsData1"
        size="small"
      >
        <span slot="nickname" slot-scope="item" @click="showmodal1 = false">
          <nuxt-link
            replace
            :to="`/profile?userId=${item.id}`"
            class="link-user"
          >
            {{ item.nickname }}
          </nuxt-link>
        </span>
        <span slot="head_portrait" slot-scope="head_portrait">
          <a-avatar
            :size="30"
            :src="
              (head_portrait && head_portrait) ||
              require('~/assets/images/tx.png')
            "
          />
        </span>
      </a-table>
    </a-modal>
    <a-modal :footer="null" v-model="showmodal2" title="Following">
      <a-table
        :loading="loading"
        :pagination="pagination"
        @change="changepage"
        :columns="columns2"
        :data-source="columnsData2"
        size="small"
      >
        <span slot="nickname" slot-scope="item" @click="showmodal2 = false">
          <nuxt-link
            replace
            :to="`/profile?userId=${item.id}`"
            class="link-user"
          >
            {{ item.nickname }}
          </nuxt-link>
        </span>
        <span slot="head_portrait" slot-scope="head_portrait">
          <a-avatar
            :size="30"
            :src="
              (head_portrait && head_portrait) ||
              require('~/assets/images/tx.png')
            "
          />
        </span>
      </a-table>
    </a-modal>

    <a-modal :footer="null" v-model="showmodal3" title="Likes">
      <a-table
        :scroll="{ x: 1300 }"
        :loading="loading"
        :pagination="pagination"
        @change="changepage"
        :columns="columns3"
        :data-source="columnsData3"
        size="small"
      >
        <span slot="nickname" slot-scope="item" @click="showmodal3 = false">
          <nuxt-link
            replace
            :to="`/profile?userId=${item.id}`"
            class="link-user"
          >
            {{ item.nickname }}
          </nuxt-link>
        </span>
        <span slot="cover" slot-scope="cover">
          <a-avatar
            :size="30"
            shape="square"
            :src="(cover && cover) || require('~/assets/images/tx.png')"
          />
        </span>
        <span slot="head_portrait" slot-scope="head_portrait">
          <a-avatar
            :size="30"
            :src="
              (head_portrait && head_portrait) ||
              require('~/assets/images/tx.png')
            "
          />
        </span>
        <a
          slot="action"
          slot-scope="text, record, index"
          href="javascript:;"
          class="links"
          @click="showVideo(index)"
          >View video</a
        >
      </a-table>
    </a-modal>

    <a-modal :footer="null" v-model="showVideoModal" title="view video">
      <videoModalPlay :item="item"></videoModalPlay>
    </a-modal>

    <a-modal :footer="null" v-model="showmodal4" title="detailed">
      <a-table
        :loading="loading"
        :scroll="{ x: 800 }"
        :pagination="pagination"
        @change="changepage"
        :columns="columns4"
        :data-source="columnsData4"
        size="small"
      >
        <span slot="created_at" slot-scope="created_at">
          {{ filters.formatDate(new Date(created_at), "yyyy-MM-dd hh:mm:ss") }}
        </span>
        <span slot="head_portrait" slot-scope="head_portrait">
          <a-avatar
            :size="30"
            :src="
              (head_portrait && head_portrait) ||
              require('~/assets/images/tx.png')
            "
          />
        </span>
      </a-table>
    </a-modal>
  </div>
</template>

<script src="./index.js">
</script>

<style lang="less">
@import "./index.less";
</style>
