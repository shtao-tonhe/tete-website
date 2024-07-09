<!--
 * @Author: your name
 * @Date: 2020-10-26 16:38:50
 * @LastEditTime: 2020-11-27 14:35:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/components/profileBox/index.vue
-->
<template>
  <div>
    <modalVideo
      @closeModal="closeModal"
      @nextVideo="nextVideo"
      @preVideo="preVideo"
      :item="videoList[index2]"
      :lastIndex="videoList.length - 1"
      v-if="showVideoModal"
      :volume="volume"
      :typeRouter="getA() ? '1' : ''"
      :currentIndex="index2"
      @setVolume="setVolume"
    ></modalVideo>
    <div class="loading-data">
      <div v-if="!showData">
        <div
          v-for="(x, index) in 9"
          :key="index"
          class="jsx-2261688415 video-feed-item video-feed-item-box"
        >
          <div class="jsx-2261688415 _ratio_">
            <div class="jsx-2261688415" style="padding-top: 132.653%">
              <div class="jsx-2261688415 _ratio_wrapper">
                <a class="jsx-256221443 video-feed-item-wrapper"
                  ><div
                    class="jsx-828470630 image-card"
                    style="background-size: 100%; background-position: center"
                  >
                    <div class="jsx-1778455663 video-card default">
                      <div class="jsx-1778455663 video-card-mask">
                        <div
                          class="jsx-1036923518 card-footer normal no-avatar"
                        >
                          <div class="jsx-1036923518 video-bottom-info">
                            <svg
                              class="like-icon"
                              width="18"
                              height="18"
                              viewBox="0 0 48 48"
                              fill="#fff"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M24 9.01703C19.0025 3.74266 11.4674 3.736 6.67302 8.56049C1.77566 13.4886 1.77566 21.4735 6.67302 26.4016L22.5814 42.4098C22.9568 42.7876 23.4674 43 24 43C24.5326 43 25.0432 42.7876 25.4186 42.4098L41.327 26.4016C46.2243 21.4735 46.2243 13.4886 41.327 8.56049C36.5326 3.736 28.9975 3.74266 24 9.01703ZM21.4938 12.2118C17.9849 8.07195 12.7825 8.08727 9.51028 11.3801C6.16324 14.7481 6.16324 20.214 9.51028 23.582L24 38.1627L38.4897 23.582C41.8368 20.214 41.8368 14.7481 38.4897 11.3801C35.2175 8.08727 30.0151 8.07195 26.5062 12.2118L26.455 12.2722L25.4186 13.3151C25.0432 13.6929 24.5326 13.9053 24 13.9053C23.4674 13.9053 22.9568 13.6929 22.5814 13.3151L21.545 12.2722L21.4938 12.2118Z"
                              ></path></svg
                            ><strong class="jsx-1036923518 video-count">
                              0
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div></a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="noData" class="loading-data2">
        <a-empty :description="$t('common.noData')" />
      </div>
    </div>
    <div v-if="showData">
      <div style="display: inline-block">
        <profileVideo
          @mouseOver="mouseOver"
          @mouseLeave="mouseLeave"
          :key="index"
          v-for="(item, index) in videoList"
          :showVideoModal="showVideoModal"
          :ref="'videoItem' + index"
          @setVolume="setVolume"
          @showItemModal="showItemModal"
          :item="item"
          :volume="volume"
          :index="index"
          :currentIndex="index2"
          :lastIndex="videoList.length - 1"
        ></profileVideo>
      </div>
      <div v-if="loadEnd" class="end">end</div>
      <div v-if="showLoading" class="list-loading">
        <videoLoading></videoLoading>
      </div>
    </div>
  </div>
</template>

<script src="./index.js">
</script>

<style>
.loading-data2 {
  margin-top: 60px;
}
.item-box {
  height: 300px;
  width: 300px;
}
</style>
