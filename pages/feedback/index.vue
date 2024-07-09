<!--
 * @Author: your name
 * @Date: 2020-09-07 15:06:27
 * @LastEditTime: 2021-01-30 16:46:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tete/pages/index.vue
-->
<template>
  <div>
    <div class="jsx-3309473600 main-body page-with-header">
      <div class="jsx-1311605825 _global_container">
        <div class="jsx-1311605825 _base_layout_container">
          <div class="jsx-1311605825 _base_layout_content">
            <div class="jsx-1311605825 _base_layout_main">
              <div class="jsx-2589367843 feedback-main-container">
                <div class="jsx-2589367843 side-container">
                  <div class="jsx-2589367843 feedback-header">
                    <h1 class="jsx-2589367843 title">Feedback</h1>
                  </div>
                  <div
                    class="jsx-2589367843 option-container"
                    @click="toIt('toIt2', 1)"
                  >
                    <h3 class="jsx-2589367843 text">Feedback History</h3>
                    <div
                      v-if="idactive === 1"
                      class="jsx-2589367843 active-bar"
                    ></div>
                  </div>
                  <div
                    class="jsx-2589367843 option-container"
                    @click="toIt('toIt1', 2)"
                  >
                    <h3 class="jsx-2589367843 text">Report a problem</h3>
                    <div
                      v-if="idactive === 2"
                      class="jsx-2589367843 active-bar"
                    ></div>
                  </div>
                </div>
                <div class="jsx-1531115747 detail-board" id="toIt2">
                  <h3 class="jsx-1531115747 main-title">
                    Your support tickets
                  </h3>

                  <div
                    class="jsx-2028358761 history-container visible"
                    v-if="talkList && talkList.length > 0"
                  >
                    <div class="container tips">
                      <div v-if="ajax.loading">
                        <a-spin v-if="ajax.loadText === 'Getting message...'" />
                        {{ ajax.loadText }}
                      </div>
                      <a
                        v-if="!ajax.isend && !ajax.loading"
                        class="red"
                        @click="getHistoryMsg"
                        >LOAD MORE</a
                      >
                      <a v-if="ajax.isend">END!</a>
                    </div>
                    <div
                      v-for="(item, index) in talkList"
                      :key="index"
                      :id="`msg-${item.id}`"
                    >
                      <div class="jsx-2028358761 fragment">
                        <p class="jsx-2028358761 time">{{ item.created_at }}</p>
                        <div class="jsx-2028358761 history-item-wrapper">
                          <img
                            class="jsx-2028358761 avatar"
                            v-if="item.user.head_portrait"
                            :src="
                              item &&
                              item.user &&
                              item.user.head_portrait || ''
                            "
                            alt=""
                          />
                          <img
                            v-else
                            src="~/assets/images/tx.png"
                            class="jsx-2028358761 avatar"
                          />
                          <div
                            class="jsx-2028358761 basic-wrapper content-wrapper"
                          >
                            <p class="jsx-2028358761">{{ item.content }}</p>
                          </div>
                        </div>
                      </div>

                      <div class="jsx-2028358761 fragment" v-if="item.reply">
                        <p class="jsx-2028358761 time">{{ item.updated_at }}</p>
                        <div class="jsx-2028358761 history-item-wrapper left">
                          <img
                            src="~/assets/images/tx.png"
                            class="jsx-2028358761 avatar"
                          />
                          <div
                            class="jsx-2028358761 basic-wrapper content-wrapper"
                          >
                            <p class="jsx-2028358761">{{ item.reply }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="jsx-1531115747 feedback-container" id="toIt1">
                    <p class="jsx-1531115747 tell-us-text">
                      Tell us your feedback
                    </p>
                    <a-form :form="form" @submit="handleSubmit">
                      <a-form-item label="title" v-show="false">
                        <a-input
                          v-decorator="[
                            'title',
                            {
                              rules: [
                                {
                                  required: true,
                                  message: 'Please input your title!',
                                },
                              ],
                            },
                          ]"
                        />
                      </a-form-item>
                      <a-form-item label="content">
                        <a-textarea
                          :rows="4"
                          v-decorator="[
                            'content',
                            {
                              rules: [
                                {
                                  required: true,
                                  message:
                                    'Please provide as much detail as possible',
                                },
                              ],
                            },
                          ]"
                          placeholder="Please provide as much detail as possible"
                        >
                        </a-textarea>
                      </a-form-item>
                      <a-form-item>
                        <a-button
                          :loading="loading"
                          type="danger"
                          class="jsx-1531115747 submit"
                          html-type="submit"
                        >
                          Submit
                        </a-button>
                      </a-form-item>
                    </a-form>
                    <!-- <textarea
                      placeholder="Please provide as much detail as possible"
                      class="jsx-1531115747 fill-in"
                    ></textarea>
                    <button
                      type="submit"
                      class="jsx-1531115747 submit disabled"
                    >
                      Submit
                    </button> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./index.js">
</script>
<style lang="less">
@import url("./index.less");
</style>
