/*
 * @Author: your name
 * @Date: 2020-09-24 16:21:42
 * @LastEditTime: 2020-09-25 07:28:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tete/components/videoPlay/index.js
 */
export default {
  name: "BannerVideo",
  data() {
    return {
      animating: false,
      videos: [],
      stateMachine: [],
      nextStateInfo: {}
    };
  },
  created() {
    this.init(t, true);
  },
  mounted() {},
  methods: {
    init(t, e) {
      this.counter = t.columns;
      this.animating = !1;
      this.videos = [];
      this.stateMachine = [];
      this.nextStateInfo = {
        pos: 0,
        value: t.columns
      };
      for (var n = 0; n < t.columns; n++) {
        this.stateMachine.push(n);
        if (e) {
          this.animating = !1;
          this.videoInfos = t.videoList.slice(0, t.columns + 1);
          this.counter = t.columns;
          this.stateMachine = this.stateMachine;
          this.nextStateInfo = this.nextStateInfo;
        }
      }
    },
    nextVideo() {
      this.animating = !0;

      this.videos[this.animatingIndex].addEventListener(
        "transitionend",
        this.nextVideoDone
      );
    },
    nextVideoDone() {
      var t = this.videoInfos;
      this.videos[this.animatingIndex].removeEventListener(
        "transitionend",
        this.nextVideoDone
      );
        this.videos[this.animatingIndex].dataCanplay = !1
        this.videos[this.animatingIndex].hasLooped = !1
      var n = Object(i.a)(this.stateMachine);
      (n[this.nextStateInfo.pos] = this.nextStateInfo.value),
        (this.nextStateInfo = {
          pos:
            this.nextStateInfo.pos === this.props.columns - 1
              ? 0
              : this.nextStateInfo.pos + 1,
          value: this.stateMachine[this.nextStateInfo.pos]
        }),
        (this.stateMachine = n),
        (this.counter += 1),
        (this.animating = !1),
        (e[this.preparingIndex] = this.props.videoList[this.nextVideoPointer]),
        this.setState({
          animating: this.animating,
          counter: this.counter,
          videoInfos: e,
          nextStateInfo: this.nextStateInfo,
          stateMachine: n
        });
    },
    videoCanplay() {
      this.videos[t].dataCanplay = !0;
    },
    videoTimeUpdate() {
      var e = this.animatingIndex === t,
        n = this.videos[t];
      if (
        (n.duration - n.currentTime < 0.2 && (n.hasLooped = !0),
        e && !this.animating)
      ) {
        var i = this.videos[this.preparingIndex];
        n.hasLooped && i.dataCanplay && this.nextVideo();
      }
    }
  }
};
