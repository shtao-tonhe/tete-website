/*
 * @Author: your name
 * @Date: 2020-11-12 18:31:00
 * @LastEditTime: 2021-03-03 21:22:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/pages/feedback/index.js
 */
export default {
  components: {},
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      OtherExtZH2: [],
      idactive: 1,
      loading: false,
      talkList: [],
      userInfo: {},
      ajax: {
        rows: 5,
        page: 1,
        flag: true,
        isend: false,
        loading: true,
        loadText: "Getting message..."
      },
      content: ""
    };
  },
  mounted() {
    this.getHistoryMsg();
    this.front_live_getPushUrl();
    this.front_live_getPullUrl();
    this.form.setFieldsValue({
      title: "pc_title"
    });
  },

  methods: {
    front_live_getPushUrl() {
      this.$api.front_live_getPushUrl();
    },
    front_live_getPullUrl() {
      this.$api.front_live_getPullUrl({
        user_id: 3
      });
    },

    // 隐藏加载提示
    hideLoadTips(flag) {
      if (flag) {
        this.ajax.loadText = "Message obtained successfully";
        setTimeout(() => {
          this.ajax.loading = false;
        }, 1500);
      } else {
        this.ajax.loading = true;
        this.ajax.loadText = "Getting message...";
      }
    },
    // 获取历史消息
    getHistoryMsg() {
      if (!this.ajax.flag) {
        return; //
      }

      let get = async () => {
        this.hideLoadTips();
        this.ajax.flag = false;
        let data = await this.joinHistoryMsg();
        console.log(data);

        let selector = "";

        if (this.ajax.page > 1) {
          selector = `#msg-${this.talkList[0].id}`;
        } else {
          selector = `#msg-${data[data.length - 1].id}`;
        }

        this.talkList = [...data, ...this.talkList];

        this.$nextTick(() => {
          this.hideLoadTips(true);

          if (data.length < this.ajax.rows) {
            setTimeout(() => {
              this.ajax.isend = true;
            }, 1500);
          } else {
            this.ajax.page++;
            setTimeout(() => {
              // this.ajax.isend = false;
              this.ajax.flag = true;
            }, 500);
          }
        });
      };
      get();
    },

    joinHistoryMsg() {
      let join = async () => {
        let arr = [];

        //通过当前页码及页数，模拟数据内容
        let startIndex = (this.ajax.page - 1) * this.ajax.rows;
        let endIndex = startIndex + this.ajax.rows;
        let res = await this.$api
          .front_feedback_getlist({
            page: this.ajax.page,
            perPage: this.ajax.rows
          })
          .catch(() => {
            this.ajax.loadText = "Message obtained successfully";
            setTimeout(() => {
              this.ajax.loading = false;
            }, 300);
          });
        if (res && res.data && res.data.data.length === 0) {
          this.ajax.loadText = "Message obtained successfully";
          setTimeout(() => {
            this.ajax.loading = false;
          }, 300);
          return;
        }
        arr = res.data.data;

        arr.reverse();

        return arr;
      };

      return new Promise((done, fail) => {
        setTimeout(() => {
          let data = join();
          done(data);
        }, 1500);
      });
    },
    handleSubmit(e) {
      e.preventDefault();

      this.form.validateFields(async (err, values) => {
        if (!err) {
          this.loading = true;
          let res = await this.$api
            .front_feedback_add({
              title: values.title,
              content: values.content
            })
            .catch(() => {
              this.loading = false;
            });
          this.loading = false;
          if (res.code === 0) {
            this.form.setFieldsValue({
              content: ""
            });
            this.ajax = {
              rows: 5,
              page: 1,
              flag: true,
              isend: false,
              loading: true,
              loadText: "Getting message..."
            };
            this.talkList = [];
            this.getHistoryMsg();
          } else {
            this.$message.error(res.msg || this.$t("common.systemError"));
          }
        }
      });
    },
    toIt(id, num) {
      this.idactive = num;
      var timer = null;
      var element = document.getElementById(id).offsetTop;
      var pageTop = document.documentElement;
      pageTop.scrollTop = element;
    }
  }
};
