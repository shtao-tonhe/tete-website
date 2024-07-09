/*
 * @Author: your name
 * @Date: 2020-10-13 12:30:07
 * @LastEditTime: 2021-03-06 22:27:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/pages/upload/index.js
 */
var video, output;
let isShow = false;
let imgNum = 7;
var xhrOnProgress = function (fun) {
  xhrOnProgress.onprogress = fun;
  return function () {
    var xhr = $.ajaxSettings.xhr();
    if (typeof xhrOnProgress.onprogress !== "function") {
      return xhr;
    }
    if (xhrOnProgress.onprogress && xhr.upload) {
      xhr.upload.onprogress = xhrOnProgress.onprogress;
    }
    return xhr;
  };
};
import timeUpload from "~/components/timeUpload/index.vue";
import locationUpload from "~/components/locationUpload/index.vue";
import zhineng from "~/components/zhineng/index.vue";
import * as Cookies from "js-cookie";
import sunxu from "~/components/sunxu/index.vue";
import zidingyi from "~/components/zidingyi/index.vue";

import SparkMD5 from "spark-md5";
import config from "~/utils/config";
import { mapState } from "vuex";

export default {
  components: {
    sunxu,
    zhineng,
    timeUpload,
    locationUpload,
    zidingyi
  },
  data() {
    return {
      activeKey: "1",
      hasErrors: this.hasErrorsFunc,
      formItem: {
        is_ad: "1"
      },
      loading: false,
      imgList: [],
      isClose: false,
      spinning: false,
      fileName: "",
      videoSize: "",
      duration: 0,
      Allduration: 0,
      currentTime: 0,
      percentage: 0,
      percent: 0,
      isPlay: false,
      isMuted: false,
      isQuanping: false,
      precent2: 0,
      currentImgUrl: "",
      i: 1,
      imgWidth: "",
      imgHeight: "",
      form: this.$form.createForm(this, { name: "horizontal_login" }),
      formItemLayout: {
        // labelCol: {
        //   xs: { span: 24 },
        //   sm: { span: 5 }
        // },
        // wrapperCol: {
        //   xs: { span: 24 },
        //   sm: { span: 19 }
        // }
      }
    };
  },
  mounted() {
    console.log(this.userInfo);
    this.fullscreenchange(document, isFull => {
      this.isQuanping = isFull;
    });
  },
  computed: {
    ...mapState("auth", ["userInfo"])
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  methods: {
    ruleListFunc1(rule, value, callback) {
      const reg = /^[1-9][0-9]*$/;
      if (
        !this.userInfo ||
        !this.userInfo.info ||
        !this.userInfo.info.integral ||
        (this.userInfo &&
          this.userInfo.info &&
          this.userInfo.info.integral &&
          Number(this.userInfo.info.integral) === 0)
      ) {
        callback(this.$t("page.pleaseEnterNumber2"));
      } else if (!reg.test(value)) {
        callback(this.$t("page.pleaseEnterNumber"));
      } else if (
        Number(value) +
        Math.ceil(
          (Number(value) * Number(this.userInfo.info.fee_ratio)) / 100
        ) >
        Number(this.userInfo.info.integral)
      ) {
        callback(this.$t("page.pleaseEnterNumber2"));
      } else {
        callback();
      }
    },
    changeShou(val) {
      if (val.target.value && !isNaN(val.target.value)) {
        this.form.setFieldsValue({
          shou: Math.ceil(
            (Number(val.target.value) * Number(this.userInfo.info.fee_ratio)) /
            100
          ),
          zong:
            Math.ceil(
              (Number(val.target.value) *
                Number(this.userInfo.info.fee_ratio)) /
              100
            ) + Number(val.target.value)
        });
      }
      // this.userInfo.fee_ratio*
    },
    onChangeText() {
    },
    async handleSubmit(e) {
      try {
        let video_file = document.getElementById("upload-video").files[0];
        if (!video_file || !this.video_id) {
          this.clearVideo()
          this.$message.error("Please upload the file first");
          return;
        }

        if (!this.currentImgUrl) {
          this.clearVideo()
          this.$message.error("Please select the video cover");
          return;
        }
        this.form.validateFieldsAndScroll(async (err, values) => {
          if (!err) {
            let reward = [];
            let reward2 = {};
            if (this.formItem.is_ad === "2") {
              switch (this.activeKey) {
                case "1":
                  reward = await this.$refs[
                  "formItem" + this.activeKey
                    ].handleSubmit();

                  break;
                case "2":
                  reward = await this.$refs[
                  "formItem" + this.activeKey
                    ].submitForm("dynamicValidateForm");
                  break;
                case "3":
                  reward = await this.$refs[
                  "formItem" + this.activeKey
                    ].submitForm("dynamicValidateForm");
                  break;
                case "4":
                  reward2 = await this.$refs[
                  "formItem" + this.activeKey
                    ].submitForm();
                  reward = (reward2 && reward2.list) || [];
                  break;

                case "5":
                  reward2 = await this.$refs[
                  "formItem" + this.activeKey + "1"
                    ].submitForm();
                  reward = await this.$refs[
                  "formItem" + this.activeKey + "2"
                    ].submitForm("dynamicValidateForm");
                  if (reward && reward.length > 0 && reward2 && reward2.value) {
                  } else {
                    reward = [];
                  }
                  break;
                case "6":
                  reward = await this.$refs[
                  "formItem" + this.activeKey
                    ].submitForm();
                  break;
                default:
                  break;
              }
              if (!reward || reward.length === 0) {
                return;
              }
              console.log(reward, "00000000");
              let tips = "";
              for (const key in reward) {
                const element = reward[key];
                if (
                  Number(values.reward_integral) <
                  Number(element.reward_integral)
                ) {
                  tips = "s";
                  break;
                }
              }
              if (tips) {
                this.$message.error(this.$t("page.errorPointsTips"));
                return;
              }
            }
            if (
              !this.userInfo ||
              !this.userInfo.info ||
              !this.userInfo.info.integral ||
              Number(this.userInfo.info.integral) - Number(values.zong) < 0
            ) {
              this.$message.error(this.$t("page.pleaseEnterNumber2"));
              return;
            }
            let resUpload = await this.showConfirmUpload().catch(() => {
            });
            if (!resUpload) {
              return;
            }
            this.loading = true;
            let res2 = await this.$api.front_video_add({
              title: values.title,
              describe: values.describe,
              cover: this.currentImgUrl,
              video_id: this.video_id,
              reward_integral: values.reward_integral,
              position_name: Cookies.get("addressInfo"),
              lon: Cookies.get("lon"),
              lat: Cookies.get("lat"),
              height: this.imgHeight,
              width: this.imgWidth,
              is_ad: this.formItem.is_ad,
              reward: reward || [],
              push_lon: (reward2.value && reward2.value.push_lon) || "",
              push_lat: (reward2.value && reward2.value.push_lat) || "",
              push_position_name:
                (reward2.value && reward2.value.push_position_name) || ""
            });
            this.loading = false;
            if (res2.code === 0) {
              this.$message.success("Upload successful", 3);
              if (this.formItem.is_ad === "2") {
                this.$utils.setAuthInfo(this, {
                  ...this.userInfo,
                  info: {
                    ...this.userInfo.info,
                    integral:
                      Number(this.userInfo.info.integral) - Number(values.zong)
                  },
                  token: Cookies.get("token")
                });
              }
              this.Abandon();
            } else {
              this.$message.error(res2.msg);
            }
          }
        });
      } catch (error) {
        console.error(error);
      }
    },
    showConfirmUpload() {
      return new Promise((resolve, reject) => {
        if (this.formItem.is_ad === "1") {
          resolve(true);
          return;
        }
        this.form.validateFieldsAndScroll(async (err, values) => {
          this.$confirm({
            title: `You are sure to spend ${values.zong} points to publish this advertising video`,
            onOk() {
              resolve(true);
            },
            onCancel() {
              reject(false);
            },
            class: "test"
          });
        });
      });
    },
    hasErrorsFunc(fieldsError) {
      console.log(fieldsError, "fieldsError");
      if (this.formItem.is_ad === "1") {
        delete fieldsError.reward_integral;
      }
      return Object.keys(fieldsError).some(field => fieldsError[field]);
    },
    /**
     * @description:Calculate hash
     * @param {type}
     * @return {type}
     */
    calculateHash() {
      this.clientChunkSize = 450000000;
      this.currentChunk = 0;
      var _this = this,
        chunks = Math.ceil(_this.resource.size / this.clientChunkSize),
        spark = new SparkMD5.ArrayBuffer();
      this.fileReader = new FileReader();

      this.fileReader.onload = e => {
        console.log(this.resource.name);
        if (!this.checkSeq(["mp4"], this.resource.name)) {
          return;
        }
        spark.append(e.target.result);
        ++this.currentChunk;
        if (this.currentChunk < chunks) {
          this.loadNext();
        } else {
          _this.resourceHash = spark.end();
          console.log("preprocess2");
          _this.preprocess(e);
        }
      };

      this.fileReader.onerror = function () {
        console.log("preprocess1");
        _this.preprocess();
      };

      this.loadNext();
    },
    /**
     * @description: Check format
     * @param {type}
     * @return {type}
     */
    checkSeq(suffix, name) {
      let a = true;
      var index = name.lastIndexOf(".");
      name = name.substring(index + 1);
      console.log(suffix, name);
      if (!suffix.includes(name)) {
        a = false;
        this.clearVideo()
        this.$message.error("File upload format error");
        return;
      }
      return a;
    },
    /**
     * @description: Load next
     * @param {type}
     * @return {type}
     */
    loadNext() {
      var start = this.currentChunk * this.clientChunkSize,
        end =
          start + this.clientChunkSize >= this.resource.size
            ? this.resource.size
            : start + this.clientChunkSize;

      this.fileReader.readAsArrayBuffer(
        this.blobSlice.call(this.resource, start, end)
      );
    },
    /**
     * @description: Window state changes
     * @param {type}
     * @return {type}
     */
    fullscreenchange(el, callback) {
      el.addEventListener("fullscreenchange", function () {
        callback && callback(document.fullscreen);
      });
      el.addEventListener("webkitfullscreenchange", function () {
        callback && callback(document.webkitIsFullScreen);
      });
      el.addEventListener("mozfullscreenchange", function () {
        callback && callback(document.mozFullScreen);
      });
      el.addEventListener("msfullscreenchange", function () {
        callback && callback(document.msFullscreenElement);
      });
    },
    /**
     * @description: Split time function
     * @param {type}
     * @return {type}
     */
    timeStamp(second_time) {
      var time1 = (parseInt(second_time) / 100).toString();
      var time2 = time1.split(".")[1]
        ? time1.split(".")[1].length == 1
          ? time1.split(".")[1] + "0"
          : time1.split(".")[1]
        : "00";
      var time = "00" + ":" + time2;
      if (parseInt(second_time) >= 60) {
        var second = ((parseInt(second_time) % 60) / 100).toString();
        var min = (parseInt(second_time / 60) / 100).toString();
        var time3 = second.split(".")[1]
          ? second.split(".")[1].length == 1
            ? second.split(".")[1] + "0"
            : second.split(".")[1]
          : "00";
        var time4 = min.split(".")[1]
          ? min.split(".")[1].length == 1
            ? min.split(".")[1] + "0"
            : min.split(".")[1]
          : "00";
        time = time4 + ":" + time3;
      }
      return time;
    },
    /**
     * File size byte conversion unit
     * @param size
     * @returns {string|*}
     */
    filterSize(size) {
      if (!size) {
        return "";
      }
      if (size < this.pow1024(1)) {
        return size + " B";
      }
      if (size < this.pow1024(2)) {
        return (size / this.pow1024(1)).toFixed(2) + " KB";
      }
      if (size < this.pow1024(3)) {
        return (size / this.pow1024(2)).toFixed(2) + " MB";
      }
      if (size < this.pow1024(4)) {
        return (size / this.pow1024(3)).toFixed(2) + " GB";
      }
      return (size / this.pow1024(4)).toFixed(2) + " TB";
    },

    /**
     * @description: Find the power
     * @param {type}
     * @return {type}
     */
    pow1024(num) {
      return Math.pow(1024, num);
    },
    /**
     * @description: Select Picture
     * @param {type}
     * @return {type}
     */
    choiceImg() {
      if (this.spinning) {
        return;
      }
      this.$refs.filElem.dispatchEvent(new MouseEvent("click"));
    },
    /**
     * @description: Get pictures
     * @param {type}
     * @return {type}
     */
    initialize(resolve) {
      let video = document.getElementById("video");
      let imgUrl = this.captureImage(video, resolve).imgUrl;
      if (imgUrl) {
        this.imgList.push(imgUrl);

        this.imgList = [...this.imgList];
        if (this.imgList.length === 8) {
          this.change2(0);
          this.aetherupload().then(async () => {
          });
        }
      }
    },
    /**
     * @description: screenshot
     * @param {type}
     * @return {type}
     */
    captureImage(video, resolve) {
      var scale = 1;
      var canvas = document.createElement("canvas");
      canvas.width = video.videoWidth * scale;
      canvas.height = video.videoHeight * scale;
      canvas
        .getContext("2d")
        .drawImage(video, 0, 0, canvas.width, canvas.height);
      resolve && resolve(canvas.toDataURL("image/jpeg", 0.4));
      return {
        imgUrl: canvas.toDataURL("image/jpeg", 0.4),
        width: video.videoWidth,
        height: video.videoHeight
      };
    },
    /**
     * @description: initialization
     * @param {type}
     * @return {type}
     */
    uploadVideoinit() {
      let index5 = -1;
      this.initVideoPlay(index5);
    },
    /**
     * @description: Initialize video at screenshot
     * @param {type}
     * @return {type}
     */
    initVideoPlay2() {
      let video_file = document.getElementById("upload-video").files[0];
      if (!video_file) {
        return;
      }
      let reader = new FileReader();
      reader.onload = () => {
        let videoDom2 = document.getElementById("videoplay2");
        videoDom2.src = reader.result;
      };
      reader.readAsDataURL(video_file);
    },

    /**
     * @description: Turn on / off sound
     * @param {type}
     * @return {type}
     */
    changeMute() {
      let videoDom2 = document.getElementById("videoplay");
      if (videoDom2) {
        if (this.isMuted) {
          videoDom2.muted = true;
        } else {
          videoDom2.muted = false;
        }
        this.isMuted = !this.isMuted;
      }
    },
    /**
     * @description: Toggle full screen
     * @param {type}
     * @return {type}
     */
    quanping() {
      if (!this.isQuanping) {
        this.requestFullScreen(document.documentElement);
      } else {
        this.exitFull();
      }
      this.isQuanping = !this.isQuanping;
    },
    /**
     * @description: Exit full screen
     * @param {type}
     * @return {type}
     */
    exitFull() {
      var exitMethod =
        document.exitFullscreen || //W3C
        document.mozCancelFullScreen || //Chrome
        document.webkitExitFullscreen || //FireFox
        document.webkitExitFullscreen; //IE11
      if (exitMethod) {
        exitMethod.call(document);
      } else if (typeof window.ActiveXObject !== "undefined") {
        //for Internet Explorer
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
          wscript.SendKeys("{F11}");
        }
      }
    },
    /**
     * @description: Full screen
     * @param {type}
     * @return {type}
     */
    requestFullScreen(element) {
      var requestMethod =
        element.requestFullScreen || //W3C
        element.webkitRequestFullScreen || //Chrome
        element.mozRequestFullScreen || //FireFox
        element.msRequestFullScreen; //IE11
      if (requestMethod) {
        requestMethod.call(element);
      } else if (typeof window.ActiveXObject !== "undefined") {
        //for Internet Explorer
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
          wscript.SendKeys("{F11}");
        }
      }
    },

    success(callback) {
      this.callback = callback;
    },

    setPreprocessRoute(route) {
      this.preprocessRoute = route;
    },

    setUploadingRoute(route) {
      this.uploadingRoute = route;
    },

    setGroup(group) {
      this.group = group;
    },

    setSavedPathField(selector) {
      this.savedPathDom = $(selector);
    },
    setLaxMode(isLax) {
      this.laxMode = isLax;
    },
    handleSuccess(res, file, fileList) {
    },
    upload() {
      this.resourceDom = this.$refs.filElem;
      this.resource = this.resourceDom.files[0];
      this.resourceName = this.resource.name;
      this.resourceSize = this.resource.size;
      this.resourceTempBaseName = "";
      this.resourceExt = "";
      this.chunkSize = 0;
      this.chunkCount = 0;
      this.groupSubDir = "";
      this.savedPath = "";
      this.resourceHash = "";
      this.blobSlice =
        File.prototype.slice ||
        File.prototype.mozSlice ||
        File.prototype.webkitSlice;
      this.i = 0;
      this.storageHost = "";
      if (!this.blobSlice) {
        this.$message.error(
          "Error: the upload component is not supported by this browser"
        );
        return;
      }

      if (this.resourceSize === 0) {
        this.clearVideo()
        this.$message.error("Error: Invalid file size");
        return;
      }

      if (
        this.resourceName.substring(
          this.resourceName.lastIndexOf(".") + 1,
          this.resourceName.length
        ) === ""
      ) {
        this.clearVideo()
        this.$message.error("Error: Invalid file type");
        return;
      }
      if (
        !("FileReader" in window) ||
        !("File" in window) ||
        typeof SparkMD5 === "undefined"
      ) {
        console.log("preprocess4");
        this.preprocess();
      } else if (this.laxMode === true) {
        console.log("preprocess3");

        this.preprocess();
      } else {
        this.calculateHash();
      }
    },
    getprogress2(event) {
      this.totalSize = this.resourceSize;
      var nowTime = new Date().getTime();
      var nowLoad = event.loaded;
      var timeDelay = (nowTime - this.preTime) / 1000;
      var loadedDelay = nowLoad - this.preLoad;
      //b/s
      var speed = parseInt(loadedDelay / timeDelay);
      // var preTime = Math.round((event.total - event.loaded) / speed);
      this.count += 1;
      console.log(this.count);
      if (this.count > 2) {
        this.count = 0;
        this.setSpeed(speed);
        // this.setPredict(preTime);
      }
      this.preTime = nowTime;
      this.preLoad = nowLoad;

      this.percent = parseInt((this.i / this.chunkCount) * 100);
    },
    uploadChunk: function () {
      const _this = this;
      const start = this.i * this.chunkSize;
      const end = Math.min(this.resourceSize, start + this.chunkSize);
      const form = new FormData();
      form.append("resource_chunk", this.resource.slice(start, end));

      form.append("resource_ext", this.resourceExt);

      form.append("chunk_total", this.chunkCount);

      form.append("chunk_index", this.i + 1);

      form.append("resource_temp_basename", this.resourceTempBaseName);

      form.append("group", this.group);

      form.append("group_subdir", this.groupSubDir);

      form.append("id", this.videoIdData);

      form.append("resource_hash", this.resourceHash);

      $.ajax({
        url: config.apiUrl + "uploadbingfile/saveChunk",
        type: "POST",
        data: form,
        dataType: "json",
        cache: false,
        crossDomain: true,
        processData: false,
        contentType: false,
        beforeSend: function (request) {
          _this.previousRequest = request;
          _this.startTime = new Date().getTime();
          _this.preTime = new Date().getTime();
          _this.preLoad = 0;
        },
        xhr: xhrOnProgress(function (e) {
          _this.getprogress2(e);
        }),
        success: rst => {
          if (rst.code === 0) {
            if (
              rst.data.savedPath !== "undefined" &&
              rst.data.savedPath !== ""
            ) {
              _this.video_id = rst.data.id;
              this.percent = 100;
              typeof _this.callback !== "undefined"
                ? _this.callback(rst)
                : null;
            } else {
              _this.i = 1 + _this.i;
              _this.uploadChunk();
            }
          } else {
            this.loadingStatus = false;
            this.clearVideo()
            this.$message.error(rst.msg);
          }
        },
        error: (XMLHttpRequest, textStatus, errorThrown) => {
          this.$refs.filElem.value = "";
          if (XMLHttpRequest.status === 0) {
            this.loading = false;
            this.clearVideo()
            !this.cancleUploadStatus &&
            this.$message.error(this.$t("page.uploadError"));
            this.loadingStatus = false;
            this.percent = 100;
          } else {
            this.loading = false;
            this.loadingStatus = false;
            this.clearVideo()
            !this.cancleUploadStatus &&
            this.$message.error(this.$t("page.uploadError"));
          }
        }
      });
    },
    preprocess() {
      const _this = this;
      this.loadingStatus = true;
      this.percent = 0;
      const form = new FormData();
      form.append("resource_name", this.resourceName);
      form.append("resource_size", this.resourceSize);
      form.append("resource_hash", this.resourceHash);
      form.append("group", this.group);
      form.append("duration", this.Allduration);
      form.append("size", this.fileSize);
      $.ajax({
        contentType: false,
        processData: false,
        url: config.apiUrl + "/uploadbingfile/preprocess",
        type: "POST",
        dataType: "json",
        crossDomain: true,
        data: form,
        success: rst => {
          if (rst.code === 0) {
            this.resourceTempBaseName = rst.data.resourceTempBaseName;
            this.resourceExt = rst.data.resourceExt;
            this.chunkSize = rst.data.chunkSize;
            this.chunkCount = Math.ceil(this.resourceSize / this.chunkSize);
            this.groupSubDir = rst.data.groupSubDir;
            if (rst.data.savedPath.length === 0) {
              this.videoIdData = rst.data.id;
              this.uploadChunk();
            } else {
              this.percent = 100;
              this.savedPath = rst.savedPath;
              typeof this.callback !== "undefined" ? this.callback(rst) : null;
            }
          } else {
            this.loadingStatus = false;
            this.loading = false;
            this.clearVideo()
            this.$message.error(rst.msg);
          }
        },
        error: (XMLHttpRequest, textStatus, errorThrown) => {
          this.loading = false;
          this.clearVideo();
          this.$message.error("Error: upload failed");
        }
      });
    },
    aetherupload() {
      return new Promise((resove, reject) => {
        this.setGroup("file");
        this.setPreprocessRoute("/uploadbingfile/preprocess");
        this.setUploadingRoute("/aetherupload/uploading");
        this.setLaxMode(false);
        this.success(res => {
          resove(res);
        });
        this.upload();
      });
    },
    change2(num) {
      let videoDom2 = document.getElementById("videoplay2");
      videoDom2.currentTime = Math.floor(this.Allduration * (num / 100));
      let obj = this.captureImage(videoDom2);
      this.imgWidth = obj.width;
      this.imgHeight = obj.height;
      this.currentImgUrl = obj.imgUrl;
      this.spinning = false;
      // upload
    },
    change(num) {
      let videoDom2 = document.getElementById("videoplay");
      videoDom2.currentTime = Math.floor(this.Allduration * (num / 100));
      videoDom2.play();
    },
    /**
     * @description: Switch playback
     * @param {type}
     * @return {type}
     */
    playChange() {
      let videoDom2 = document.getElementById("videoplay");
      if (videoDom2) {
        if (this.isPlay) {
          videoDom2.pause();
        } else {
          videoDom2.play();
        }
        this.isPlay = !this.isPlay;
      }
    },
    /**
     * @description: Initialize player
     * @param {type}
     * @return {type}
     */
    initVideoPlay(index5) {
      this.spinning = true;
      let video_file = document.getElementById("upload-video").files[0];
      this.fileName = video_file.name;
      if (!video_file) {
        return;
      }

      let reader = new FileReader();

      reader.onload = () => {
        this.fileSize = video_file.size;
        this.videoSize = this.filterSize(video_file.size);
        let videoDom2 = document.getElementById("videoplay");
        videoDom2.src = reader.result;
        videoDom2.onloadeddata = () => {
          this.isPlay = true;
          this.duration = this.timeStamp(videoDom2.duration);
          this.Allduration = videoDom2.duration;
          if (this.Allduration > 61) {
            this.$message.error("The video is longer than 60 seconds");
            this.clearVideo();
            return;
          }
          this.initVideoPlay2();
          this.uploadVideo(index5);
        };
        videoDom2.ontimeupdate = () => {
          var time = videoDom2.currentTime,
            alltime = videoDom2.duration;
          this.percentage = Math.floor(100 * (time / alltime));
          this.currentTime = this.timeStamp(time);
        };
        videoDom2.oncanplay = false;
      };
      reader.readAsDataURL(video_file);
    },
    handleFormLayoutChange(e) {
      this.formItem.is_ad = e.target.value;
      this.hasErrorsFunc(this.form.getFieldsError());
    },
    showConfirm() {
      this.$confirm({
        title: this.$t("page.confirmTitle"),
        content: this.$t("page.confirmDesc"),
        onOk: () => {
          this.Abandon();
        },
        onCancel() {
        }
      });
    },
    cancleUpload() {
      this.cancleUploadStatus = true;
      this.currentImgUrl = "";
      this.imgList = [];
      this.precent = 0;
      this.clearVideo();
      this.previousRequest && this.previousRequest.abort();
      this.cancleUploadStatus = false;
    },
    Abandon() {
      this.formItem.is_ad = "1";
      this.form.resetFields();
      this.precent = 0;
      this.activeKey = "1";
      this.currentImgUrl = "";
      this.clearVideo();
    },
    /**
     * @description: Loop to get screenshots
     * @param {type}
     * @return {type}
     */
    uploadVideo(index5) {
      index5++;
      this.setjj(index5).then(res => {
        if (index5 < 7 && !this.isClose) {
          this.uploadVideo(index5);
        }
      });
    },
    clearVideo() {
      this.isClose = true;
      let videoDom2 = document.getElementById("videoplay");
      this.currentImgUrl = "";
      videoDom2.pause();
      setTimeout(() => {
        document.getElementById("upload-video").value = "";
        this.imgList = [];
        this.precent = 0;
        this.isClose = false;
      }, 300);
    },
    setjj(index5) {
      return new Promise((resolve, reject) => {
        var video_file = document.getElementById("upload-video").files[0];
        if (!video_file) {
          return;
        }
        var reader = new FileReader();
        reader.onload = () => {
          var videoDom = document.getElementById("video");
          videoDom.onloadeddata = () => {
            if (index5 === 7) {
              videoDom.currentTime = videoDom.duration;
            } else {
              videoDom.currentTime =
                Math.floor(videoDom.duration / imgNum) * (index5 || 0);
            }
            setTimeout(() => {
              this.initialize(resolve);
            }, 300);
          };
          videoDom.src = reader.result;
        };
        reader.readAsDataURL(video_file);
      });
    }
  }
};
