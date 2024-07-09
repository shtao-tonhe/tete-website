<!--
 * @Author: your name
 * @Date: 2020-09-07 15:06:27
 * @LastEditTime: 2021-02-03 14:42:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tete/layouts/default.vue
-->
<template>
  <div>
    <v-header></v-header>
    <div class="jsx-3521819458 main-body page-with-header middle">
      <client-only>
        <div class="jsx-1733799211 side-bar-container not-drawer middle">
          <div
            style="position: fixed"
            class="jsx-3923627211 scroll-container side-bar-wrapper jsx-1473859309 middle"
          >
            <div
              class="jsx-3923627211 scroll-wrapper side-scroll-wrapper jsx-1473859309"
            >
              <div class="jsx-1733799211 side-bar">
                <div class="jsx-1733799211 upper-contents">
                  <div class="jsx-1733799211 nav-wrapper">
                    <nuxt-link
                      class="jsx-1733799211 nav-item"
                      :class="$route.path === '/foryou' ? 'active' : ''"
                      to="/foryou"
                    >
                      <svg
                        v-if="$route.path === '/foryou'"
                        class="jsx-1733799211"
                        width="40"
                        height="40"
                        viewBox="0 0 48 48"
                        fill="#fe2c55"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M24.9505 7.84001C24.3975 7.38666 23.6014 7.38666 23.0485 7.84003L6.94846 21.04C6.45839 21.4418 6.2737 22.1083 6.48706 22.705C6.70041 23.3017 7.26576 23.7 7.89949 23.7H10.2311L11.4232 36.7278C11.5409 38.0149 12.6203 39 13.9128 39H21.5C22.0523 39 22.5 38.5523 22.5 38V28.3153C22.5 27.763 22.9477 27.3153 23.5 27.3153H24.5C25.0523 27.3153 25.5 27.763 25.5 28.3153V38C25.5 38.5523 25.9477 39 26.5 39H34.0874C35.3798 39 36.4592 38.0149 36.577 36.7278L37.7691 23.7H40.1001C40.7338 23.7 41.2992 23.3017 41.5125 22.705C41.7259 22.1082 41.5412 21.4418 41.0511 21.04L24.9505 7.84001Z"
                        ></path>
                      </svg>
                      <svg
                        v-else
                        class="jsx-1733799211"
                        width="40"
                        height="40"
                        viewBox="0 0 48 48"
                        fill="#161823"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M23.0484 7.84003C23.6014 7.38666 24.3975 7.38666 24.9504 7.84001L41.051 21.04C41.5411 21.4418 41.7258 22.1082 41.5125 22.705C41.2991 23.3017 40.7338 23.7 40.1 23.7H37.769L36.5769 36.7278C36.4592 38.0149 35.3798 39 34.0873 39H13.9127C12.6202 39 11.5409 38.0149 11.4231 36.7278L10.231 23.7H7.89943C7.2657 23.7 6.70035 23.3017 6.487 22.705C6.27364 22.1083 6.45833 21.4418 6.9484 21.04L23.0484 7.84003ZM23.9995 10.9397L12.0948 20.7H12.969L14.369 36H22.4994V28.3138C22.4994 27.7616 22.9471 27.3138 23.4994 27.3138H24.4994C25.0517 27.3138 25.4994 27.7616 25.4994 28.3138V36H33.631L35.031 20.7H35.9045L23.9995 10.9397Z"
                        />
                      </svg>
                      <span class="jsx-1733799211">For You</span>
                    </nuxt-link>
                    <nuxt-link
                      v-if="$store.state.auth.token"
                      class="jsx-1733799211 nav-item"
                      :class="$route.path === '/following' ? 'active' : ''"
                      to="/following"
                    >
                      <svg
                        v-if="$route.path === '/following'"
                        class="jsx-542501122"
                        width="40"
                        height="40"
                        viewBox="0 0 48 48"
                        fill="#fe2c55"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M25.5 17C25.5 21.1421 22.1421 24.5 18 24.5C13.8579 24.5 10.5 21.1421 10.5 17C10.5 12.8579 13.8579 9.5 18 9.5C22.1421 9.5 25.5 12.8579 25.5 17Z"
                        ></path>
                        <path
                          d="M7.10396 34.7906C8.78769 30.2189 12.8204 27 18.0009 27C23.1818 27 27.2107 30.2213 28.8958 34.7898C29.3075 35.906 28.6141 37 27.5 37H8.5C7.38629 37 6.69289 35.9067 7.10396 34.7906Z"
                        ></path>
                        <path
                          d="M40.6308 37H32C31.2264 34.1633 30.0098 31.5927 28.144 29.7682C29.5384 28.9406 31.1829 28.5 33 28.5C37.239 28.5 40.536 30.8992 41.9148 35.0108C42.2516 36.0154 41.5423 37 40.6308 37Z"
                        ></path>
                        <path
                          d="M33 26.5C36.0376 26.5 38.5 24.0376 38.5 21C38.5 17.9624 36.0376 15.5 33 15.5C29.9624 15.5 27.5 17.9624 27.5 21C27.5 24.0376 29.9624 26.5 33 26.5Z"
                        ></path>
                      </svg>
                      <svg
                        v-else
                        class="jsx-1733799211"
                        width="40"
                        height="40"
                        viewBox="0 0 48 48"
                        fill="#161823"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M18 12.5C15.5897 12.5 13.5849 14.5018 13.5849 17.0345C13.5849 19.5672 15.5897 21.569 18 21.569C20.4103 21.569 22.4151 19.5672 22.4151 17.0345C22.4151 14.5018 20.4103 12.5 18 12.5ZM10.5849 17.0345C10.5849 12.9017 13.8766 9.5 18 9.5C22.1234 9.5 25.4151 12.9017 25.4151 17.0345C25.4151 21.1673 22.1234 24.569 18 24.569C13.8766 24.569 10.5849 21.1673 10.5849 17.0345ZM18 29.8793C14.0801 29.8793 10.7403 32.5616 9.69697 36.2673C9.5473 36.7989 9.03833 37.1708 8.49337 37.0811L7.50662 36.9189C6.96166 36.8292 6.58837 36.3131 6.72325 35.7776C8.00732 30.6788 12.5509 26.8793 18 26.8793C23.449 26.8793 27.9927 30.6788 29.2767 35.7776C29.4116 36.3131 29.0383 36.8292 28.4934 36.9189L27.5066 37.0811C26.9617 37.1708 26.4527 36.7989 26.303 36.2673C25.2597 32.5616 21.9199 29.8793 18 29.8793Z"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M33 31.5371C32.2445 31.5371 31.5198 31.668 30.8447 31.9093C30.3246 32.0951 29.7189 31.9243 29.4549 31.4392L28.9769 30.5608C28.713 30.0757 28.8907 29.463 29.4009 29.2516C30.513 28.791 31.7285 28.5371 33 28.5371C37.4554 28.5371 41.1594 31.6303 42.2706 35.7812C42.4135 36.3147 42.0386 36.8308 41.4935 36.9196L40.5065 37.0804C39.9614 37.1692 39.4546 36.7956 39.2894 36.2686C38.4217 33.5 35.91 31.5371 33 31.5371Z"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M33 18.5C31.6193 18.5 30.5 19.6193 30.5 21C30.5 22.3807 31.6193 23.5 33 23.5C34.3807 23.5 35.5 22.3807 35.5 21C35.5 19.6193 34.3807 18.5 33 18.5ZM27.5 21C27.5 17.9624 29.9624 15.5 33 15.5C36.0376 15.5 38.5 17.9624 38.5 21C38.5 24.0376 36.0376 26.5 33 26.5C29.9624 26.5 27.5 24.0376 27.5 21Z"
                        />
                      </svg>
                      <span class="jsx-1733799211">Following</span>
                    </nuxt-link>
                    <a v-else @click="gologin" class="jsx-1733799211 nav-item">
                      <svg
                        v-if="$route.path === '/following'"
                        class="jsx-542501122"
                        width="40"
                        height="40"
                        viewBox="0 0 48 48"
                        fill="#fe2c55"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M25.5 17C25.5 21.1421 22.1421 24.5 18 24.5C13.8579 24.5 10.5 21.1421 10.5 17C10.5 12.8579 13.8579 9.5 18 9.5C22.1421 9.5 25.5 12.8579 25.5 17Z"
                        ></path>
                        <path
                          d="M7.10396 34.7906C8.78769 30.2189 12.8204 27 18.0009 27C23.1818 27 27.2107 30.2213 28.8958 34.7898C29.3075 35.906 28.6141 37 27.5 37H8.5C7.38629 37 6.69289 35.9067 7.10396 34.7906Z"
                        ></path>
                        <path
                          d="M40.6308 37H32C31.2264 34.1633 30.0098 31.5927 28.144 29.7682C29.5384 28.9406 31.1829 28.5 33 28.5C37.239 28.5 40.536 30.8992 41.9148 35.0108C42.2516 36.0154 41.5423 37 40.6308 37Z"
                        ></path>
                        <path
                          d="M33 26.5C36.0376 26.5 38.5 24.0376 38.5 21C38.5 17.9624 36.0376 15.5 33 15.5C29.9624 15.5 27.5 17.9624 27.5 21C27.5 24.0376 29.9624 26.5 33 26.5Z"
                        ></path>
                      </svg>
                      <svg
                        v-else
                        class="jsx-1733799211"
                        width="40"
                        height="40"
                        viewBox="0 0 48 48"
                        fill="#161823"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M18 12.5C15.5897 12.5 13.5849 14.5018 13.5849 17.0345C13.5849 19.5672 15.5897 21.569 18 21.569C20.4103 21.569 22.4151 19.5672 22.4151 17.0345C22.4151 14.5018 20.4103 12.5 18 12.5ZM10.5849 17.0345C10.5849 12.9017 13.8766 9.5 18 9.5C22.1234 9.5 25.4151 12.9017 25.4151 17.0345C25.4151 21.1673 22.1234 24.569 18 24.569C13.8766 24.569 10.5849 21.1673 10.5849 17.0345ZM18 29.8793C14.0801 29.8793 10.7403 32.5616 9.69697 36.2673C9.5473 36.7989 9.03833 37.1708 8.49337 37.0811L7.50662 36.9189C6.96166 36.8292 6.58837 36.3131 6.72325 35.7776C8.00732 30.6788 12.5509 26.8793 18 26.8793C23.449 26.8793 27.9927 30.6788 29.2767 35.7776C29.4116 36.3131 29.0383 36.8292 28.4934 36.9189L27.5066 37.0811C26.9617 37.1708 26.4527 36.7989 26.303 36.2673C25.2597 32.5616 21.9199 29.8793 18 29.8793Z"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M33 31.5371C32.2445 31.5371 31.5198 31.668 30.8447 31.9093C30.3246 32.0951 29.7189 31.9243 29.4549 31.4392L28.9769 30.5608C28.713 30.0757 28.8907 29.463 29.4009 29.2516C30.513 28.791 31.7285 28.5371 33 28.5371C37.4554 28.5371 41.1594 31.6303 42.2706 35.7812C42.4135 36.3147 42.0386 36.8308 41.4935 36.9196L40.5065 37.0804C39.9614 37.1692 39.4546 36.7956 39.2894 36.2686C38.4217 33.5 35.91 31.5371 33 31.5371Z"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M33 18.5C31.6193 18.5 30.5 19.6193 30.5 21C30.5 22.3807 31.6193 23.5 33 23.5C34.3807 23.5 35.5 22.3807 35.5 21C35.5 19.6193 34.3807 18.5 33 18.5ZM27.5 21C27.5 17.9624 29.9624 15.5 33 15.5C36.0376 15.5 38.5 17.9624 38.5 21C38.5 24.0376 36.0376 26.5 33 26.5C29.9624 26.5 27.5 24.0376 27.5 21Z"
                        />
                      </svg>
                      <span class="jsx-1733799211">Following</span>
                    </a>
                  </div>
                  <div
                    class="jsx-3866147749 login-wrapper"
                    v-if="!$store.state.auth.token"
                  >
                    <span class="jsx-3866147749"
                      >Log in to follow creators, like videos, and view
                      comments. </span
                    ><button
                      @click="gologin"
                      type="button"
                      class="login-button tete-btn-pc tete-btn-pc-medium tete-btn-pc-line"
                    >
                      Login
                    </button>
                  </div>

                  <div class="jsx-1733799211 user-list">
                    <div class="jsx-1733799211 user-list-header">
                      {{ $t("page.SuggestedAccounts") }}
                    </div>
                    <div class="item-skeleton-box" v-if="!showRecommendUser">
                      <div class="item-skeleton" :key="x" v-for="x in 5">
                        <a-skeleton active avatar :paragraph="{ rows: 1 }" />
                      </div>
                    </div>
                    <div v-else>
                      <nuxt-link
                        v-for="(item, index) in recommendUserList"
                        :key="index"
                        v-show="
                          (!moreRecommendUser && index <= 5) ||
                          moreRecommendUser
                        "
                        class="jsx-1733799211 user-item"
                        :to="`/profile?userId=${item.id}`"
                      >
                        <div class="jsx-1733799211 user-avatar">
                          <span
                            class="tete-avatar tete-avatar-circle"
                            style="width: 48px; height: 48px"
                          >
                            <img
                              v-if="
                                item && item.head_portrait && item.head_portrait
                              "
                              :alt="`${
                                item && item.nickname && item.nickname
                              } TETE`"
                              :src="(item && item.head_portrait) || ''"
                            />
                            <img
                              v-else
                              :alt="`${
                                item && item.nickname && item.nickname
                              } TETE`"
                              src="~/assets/images/tx.png"
                            />
                          </span>
                        </div>
                        <div class="jsx-1733799211 user-infos">
                          <div class="jsx-1733799211 user-title">
                            <h4 class="jsx-1733799211 line1">
                              {{ item && item.nickname && item.nickname }}
                            </h4>
                            <svg
                              v-if="item && item.is_auth && item.is_auth === 4"
                              class="user-verified jsx-1473859309"
                              width="12"
                              height="12"
                              viewBox="0 0 48 48"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx="24" cy="24" r="24" fill="#20D5EC" />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M37.1213 15.8787C38.2929 17.0503 38.2929 18.9497 37.1213 20.1213L23.6213 33.6213C22.4497 34.7929 20.5503 34.7929 19.3787 33.6213L10.8787 25.1213C9.70711 23.9497 9.70711 22.0503 10.8787 20.8787C12.0503 19.7071 13.9497 19.7071 15.1213 20.8787L21.5 27.2574L32.8787 15.8787C34.0503 14.7071 35.9497 14.7071 37.1213 15.8787Z"
                                fill="white"
                              />
                            </svg>
                          </div>
                          <!-- <p class="jsx-1733799211 user-desc line1">
                            @{{ item && item.nickname && item.username }}
                          </p> -->
                        </div>
                      </nuxt-link>
                    </div>

                    <div
                      class="jsx-1733799211 see-all"
                      v-if="!moreRecommendUser"
                      @click="showmoreRecommendUser"
                    >
                      <p class="jsx-1733799211">See all</p>
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 48 48"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon-arrow-down"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M21.8788 33.1213L7.58586 18.8284C7.19534 18.4379 7.19534 17.8047 7.58586 17.4142L10.4143 14.5858C10.8048 14.1953 11.438 14.1953 11.8285 14.5858L24.0001 26.7574L36.1716 14.5858C36.5622 14.1953 37.1953 14.1953 37.5859 14.5858L40.4143 17.4142C40.8048 17.8047 40.8048 18.4379 40.4143 18.8284L26.1214 33.1213C24.9498 34.2929 23.0503 34.2929 21.8788 33.1213Z"
                        />
                      </svg>
                    </div>
                  </div>

                  <div
                    class="jsx-1733799211 user-list"
                    v-if="$store.state.auth.token"
                  >
                    <div
                      class="jsx-1733799211 user-list-header"
                      v-if="FollowListList && FollowListList.length > 0"
                    >
                      {{ $t("page.youTopAccount") }}
                    </div>
                    <div class="item-skeleton-box" v-if="!showTopData">
                      <div class="item-skeleton" :key="x" v-for="x in 5">
                        <a-skeleton active avatar :paragraph="{ rows: 1 }" />
                      </div>
                    </div>
                    <div v-else>
                      <div v-if="FollowListList && FollowListList.length > 0">
                        <nuxt-link
                          v-for="(item, index) in FollowListList"
                          :key="index"
                          v-show="(!moreFollow && index <= 5) || moreFollow"
                          class="jsx-1733799211 user-item"
                          :to="`/profile?userId=${item.user_id}`"
                        >
                          <div class="jsx-1733799211 user-avatar">
                            <span
                              class="tete-avatar tete-avatar-circle"
                              style="width: 48px; height: 48px"
                            >
                              <img
                                v-if="
                                  item && item.user && item.user.head_portrait
                                "
                                :alt="`${item.user.nickname} TETE`"
                                :src="
                                  (item &&
                                    item.user &&
                                    item.user.head_portrait) ||
                                  ''
                                "
                              />
                              <img
                                v-else
                                :alt="`${item.user.nickname} TETE`"
                                src="~/assets/images/tx.png"
                              />
                            </span>
                          </div>
                          <div class="jsx-1733799211 user-infos">
                            <div class="jsx-1733799211 user-title">
                              <h4 class="jsx-1733799211">
                                {{ item && item.user && item.user.nickname }}
                              </h4>
                              <svg
                                v-if="
                                  item && item.user && item.user.is_auth === 4
                                "
                                class="user-verified jsx-1473859309"
                                width="12"
                                height="12"
                                viewBox="0 0 48 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="24" cy="24" r="24" fill="#20D5EC" />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M37.1213 15.8787C38.2929 17.0503 38.2929 18.9497 37.1213 20.1213L23.6213 33.6213C22.4497 34.7929 20.5503 34.7929 19.3787 33.6213L10.8787 25.1213C9.70711 23.9497 9.70711 22.0503 10.8787 20.8787C12.0503 19.7071 13.9497 19.7071 15.1213 20.8787L21.5 27.2574L32.8787 15.8787C34.0503 14.7071 35.9497 14.7071 37.1213 15.8787Z"
                                  fill="white"
                                />
                              </svg>
                            </div>
                            <!-- <p class="jsx-1733799211 user-desc">
                              @{{
                                item &&
                                item.user &&
                                item.user.username
                              }}
                            </p> -->
                          </div>
                        </nuxt-link>
                      </div>
                      <div class="nodata" v-else>
                        Accounts you follow will appear here
                      </div>
                    </div>

                    <div
                      class="jsx-1733799211 see-all"
                      v-if="
                        !moreFollow &&
                        FollowListList &&
                        FollowListList.length > 0
                      "
                      @click="showmore"
                    >
                      <p class="jsx-1733799211">See all</p>
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 48 48"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon-arrow-down"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M21.8788 33.1213L7.58586 18.8284C7.19534 18.4379 7.19534 17.8047 7.58586 17.4142L10.4143 14.5858C10.8048 14.1953 11.438 14.1953 11.8285 14.5858L24.0001 26.7574L36.1716 14.5858C36.5622 14.1953 37.1953 14.1953 37.5859 14.5858L40.4143 17.4142C40.8048 17.8047 40.8048 18.4379 40.4143 18.8284L26.1214 33.1213C24.9498 34.2929 23.0503 34.2929 21.8788 33.1213Z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="jsx-1733799211 bottom-wrapper">
                  <div class="jsx-1733799211 page-link-wrapper">
                    <nuxt-link to="/" class="jsx-1733799211 page-link-item"
                      >Home</nuxt-link
                    >
                    <nuxt-link to="/about" class="jsx-1733799211 page-link-item"
                      >About</nuxt-link
                    >
                    <nuxt-link
                      to="/contact"
                      class="jsx-1733799211 page-link-item"
                      >contact</nuxt-link
                    >
                    <nuxt-link
                      class="jsx-1733799211 page-link-item"
                      to="/forgood"
                      target="_blank"
                    >
                      {{ $t("menu.forGood") }}
                    </nuxt-link>
                    <nuxt-link
                      class="jsx-1733799211 page-link-item"
                      to="/developers"
                      target="_blank"
                    >
                      {{ $t("menu.forDevelopers") }}
                    </nuxt-link>
                  </div>
                  <div class="jsx-1733799211 legal-link-wrapper">
                    <nuxt-link
                      to="/using-tete?name=UsingTETEAddaneffect"
                      class="jsx-1733799211 legal-link-item"
                      >Help</nuxt-link
                    >
                    <nuxt-link
                      to="/privacy-safety?name=Homepage"
                      class="jsx-1733799211 legal-link-item"
                      >Safety</nuxt-link
                    >
                    <nuxt-link
                      to="/community-guidelines"
                      class="jsx-1733799211 legal-link-item"
                      >Community Guidelines</nuxt-link
                    >
                    <nuxt-link
                      to="/transparency"
                      class="jsx-1733799211 legal-link-item"
                      >{{ $t("menu.Transparency") }}</nuxt-link
                    >

                    <nuxt-link
                      to="/privacy-policy?name=TermsofService"
                      class="jsx-1733799211 legal-link-item"
                      >Terms</nuxt-link
                    >
                    <nuxt-link
                      to="/privacy-policy?name=PrivacyPolicy"
                      class="jsx-1733799211 legal-link-item"
                      >Privacy</nuxt-link
                    >
                  </div>
                  <span class="jsx-1733799211 copyright">
                    &copy; 2020 TeTe
                  </span>
                  <span class="jsx-1733799211 copyright">
                    ©copyright PA Technology Pty Ltd
                  </span>
                </div>
              </div>
            </div>
            <div
              style="
                height: 168.127px;
                transform: matrix3d(
                    1,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0,
                    0,
                    0,
                    0,
                    -1
                  )
                  scale(2.62896) translateZ(-1.62896px) translateZ(-2px);
              "
              class="jsx-3923627211 scroll-bar"
            >
              <div class="jsx-3923627211 scroll-bar-thumb"></div>
            </div>
          </div>
        </div>
      </client-only>
      <div class="jsx-3773517666 share-layout compact compact_v2">
        <nuxt />
      </div>
    </div>
    <backTop></backTop>
  </div>
</template>
<script src="./foryou.js">
</script>
<style lang="less">
@import url("./foryou.less");
</style>
