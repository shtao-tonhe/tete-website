/*
 * @Author: your name
 * @Date: 2020-10-15 20:58:30
 * @LastEditTime: 2021-08-01 21:09:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 */
import qs from "qs";
let that = "";
export default {
  name: "searchBox",
  data() {
    return {
      modal1Visible2: false,
      modal1Visible: false,
      title: "",
      mode: "title",
      changevalue: "",
      formLayout: "horizontal",
      searchList: {},
      form: this.$form.createForm(this, { name: "coordinated" })
    };
  },
  mounted() {
    that = this;
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.ctx.$route.name === "foryou") {
            that.ctx.$store.commit("setForyouTitleObj", values);
            that.afterClose();
          } else {
            that.ctx.$store.commit("setForyouTitleObj", values);
            location.href =
              "/foryou" +
              (qs.stringify(values) ? "?" + qs.stringify(values) : "");
          }
        }
      });
    },
    async change(e) {
      let res = await this.ctx.$api.guest_front_video_search({
        title: this.changevalue
      });
      if (res.code === 0) {
        this.searchList = res.data;
      } else {
        this.searchList = {};
      }
    },
    handleItem(item) {
      if (this.ctx.$route.name === "foryou") {
        that.ctx.$store.commit("setForyouTitleObj", { title: item.title });
        that.afterClose();
      } else {
        that.ctx.$store.commit("setForyouTitleObj", { title: item.title });
        location.href =
          "/foryou" +
          (qs.stringify({ title: item.title })
            ? "?" + qs.stringify({ title: item.title })
            : "");
      }
    },
    hideModal() {
      typeof that.cb === "function" && that.cb();
      document.body.removeChild(that.$el);
      document.body.style.overflow = "";
      that.$destroy();
    },
    afterClose() {
      that.modal1Visible = false;
      that.modal1Visible2 = false;
      that.hideModal();
    },
    onSearch() {
      if (this.ctx.$route.name === "foryou") {
        console.log(that.ctx.$route.name === "foryou");

        that.ctx.$store.commit("setForyouTitleObj", {
          mode: that.mode,
          title: that.title
        });
        that.afterClose();
      } else {
        location.href = "/foryou" + qs.stringify(values);
      }
    },
    selectChange(value) {
      this.mode = value;
    },
    show(ctx, cb) {
      that.cb = cb;
      that.ctx = ctx;
      setTimeout(() => {
        that.modal1Visible = true;
        setTimeout(() => {
          that.modal1Visible2 = true;
          that.changevalue = ''
          that.change();
        }, 10);
      }, 20);

      return new Promise((resolve, reject) => {
        that.resolve = resolve;
        that.reject = reject;
      });
    }
  }
};
