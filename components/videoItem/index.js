/*
 * @Author: your name
 * @Date: 2020-09-24 16:21:42
 * @LastEditTime: 2020-11-07 10:58:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tete/components/videoPlay/index.js
 */
import VideoOneItem from "~/components/VideoOneItem/index.vue";
let t = {};
export default {
  name: "videoItem",
  components: {
    VideoOneItem
  },
  props: {
    istype: {
      default: 5,
      type: Number
    }
  },
  data() {
    return {
      videoControllers: [],
      currentPointer: 0,
      updateId: -1,
      isCanvasInWindow: true,
      ctx: {},
      canvas: {},
      currentList: [],
      lastIndex: 0,
      screenWidth: 0,
      span: 5,
      pixelRatio: 1,
      columns: 5,
      videoList: [],
      data: {
        columns: 5,
        pixelRatio: 1
      }
    };
  },
  created() {},
  mounted() {

  },

  methods: {
    initSpan() {
      switch (Number(this.istype)) {
        case 1:
          this.span = 24;
          break;
        case 2:
          this.span = 12;
          break;
        case 3:
          this.span = 8;
          break;
        case 5:
          this.span = 5;
          break;

        default:
          break;
      }
    },
    init(videoList) {
      this.initSpan();
      this.videoList = videoList;
      this.pages();
    },
    pages() {
      let pages = [];
      for (let index = 0; index < this.istype; index++) {
        pages[index] = [];
      }
      for (var i = 0; i < this.videoList.length; i++) {
        pages.forEach((element, index) => {
          if (i % this.istype === index) {
            pages[index].push(this.videoList[i]);
          }
        });
      }
      this.currentList = pages;
    },
    // var arr = pages(list);
    // console.log(arr);
    callback(index) {
      console.log(index, "999");
      if (this.lastIndex + 1 === this.videoList.length) {
        this.lastIndex = 0;
      } else {
        this.lastIndex++;
      }
      this.currentList[index] = this.videoList[this.lastIndex];
      this.$nextTick(() => {
        this.currentList = [...this.currentList];
      });
    },

    update() {
      var t = this;
      this.updateId = requestAnimationFrame(this.update);
      if (this.isCanvasInWindow) {
        var n = this.videoList,
          i = this.pixelRatio,
          o = this.videoControllers;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        o.forEach(function(e, o) {
          var a = e.count % 2,
            r = 1 - (e.count % 2),
            s = e.el[a],
            c = e.el[r];
          t.ctx.drawImage(
            s.controlData.playing || !s.posterEl.renderAble ? s : s.posterEl,
            360 * o * i,
            e.animationPosition,
            360 * i,
            640 * i
          );
          if (e.animating) {
            var l = Date.now() - e.animateStart;
            t.ctx.drawImage(
              c,
              360 * o * i,
              e.animationPosition + 640 * i,
              360 * i,
              640 * i
            );
            e.animationPosition = Math.max(-640 * i, (-l / 300) * 640 * i);
            if (e.animationPosition === -640 * i) {
              e.animating = false;
            }
            e.count++;
            e.animationPosition = 0;
            s.src = n[t.currentPointer % n.length].src;
            s.poster = n[t.currentPointer % n.length].poster;
            s.controlData.canplay = !1;
            s.controlData.playing = !1;
            t.currentPointer++;
          } else if (c.controlData.playing) {
            c.pause();
            c.controlData.playing = !1;
            c.controlData.canplay = !0;
          } else if (
            s.duration - s.currentTime < 0.5 &&
            !e.animating &&
            c.controlData.canplay
          ) {
            e.animating = true;
            e.animateStart = Date.now();
            c.play();
          }
        });
      }
    },

    handleScroll() {
      var t = this.canvas;
      if (this.isCanvasInWindow !== t) {
        this.isCanvasInWindow = t;
      }
    }
  }
};
