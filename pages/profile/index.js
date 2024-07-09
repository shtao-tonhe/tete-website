/*
 * @Author: your name
 * @Date: 2020-10-13 12:30:07
 * @LastEditTime: 2021-03-02 17:47:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nuxt-juejin-project/pages/foryou/index.js
 */
import profileBox from "~/components/profileBox/index.vue";
import videoModalPlay from "~/components/videoModalPlay/index.vue";

import * as Cookies from "js-cookie";
let that = "";
export default {
  components: {
    profileBox,
    videoModalPlay
  },
  data() {
    return {
      item: {},
      type: "",
      showVideoModal: false,
      loading: false,
      pagination: {
        current: 1,
        pageSize: 10,
        total: 1
      },
      columnsData2: [],
      showmodal4: false,
      columns2: [
        {
          title: "nickname",
          width: 200,
          dataIndex: "user",
          scopedSlots: { customRender: "nickname" }
        },
        {
          title: "head portrait",
          dataIndex: "user.head_portrait",
          scopedSlots: { customRender: "head_portrait" }
        }
      ],
      columnsData4: [],
      columns4: [
        {
          title: "integral(TB)",
          width: 100,
          dataIndex: "integral"
        },
        {
          title: "operator",
          width: 100,
          dataIndex: "operator"
        },
        {
          title: "fee(TB)",
          width: 100,
          dataIndex: "fee"
        },
        {
          title: "created at",
          width: 180,
          dataIndex: "created_at",
          scopedSlots: { customRender: "created_at" }
        }
      ],
      showmodal3: false,
      columnsData3: [],
      columns3: [
        {
          title: "nickname",
          width: 200,
          dataIndex: "video.user",
          scopedSlots: { customRender: "nickname" }
        },
        {
          title: "head portrait",
          width: 180,
          dataIndex: "video.user.head_portrait",
          scopedSlots: { customRender: "head_portrait" }
        },
        {
          title: "title",
          width: 200,
          dataIndex: "video.title"
        },
        {
          title: "describe",
          width: 300,
          dataIndex: "video.describe"
        },

        {
          title: "cover",
          dataIndex: "video.cover",
          width: 160,
          scopedSlots: { customRender: "cover" }
        }

        // {
        //   title: "Action",
        //   key: "operation",
        //   fixed: "right",
        //   width: 100,
        //   scopedSlots: { customRender: "action" }
        // }
      ],

      columnsData1: [],
      columns1: [
        {
          title: "nickname",
          width: 200,
          dataIndex: "user",
          scopedSlots: { customRender: "nickname" }
        },
        {
          title: "head portrait",
          dataIndex: "user.head_portrait",
          scopedSlots: { customRender: "head_portrait" }
        }
      ],
      thisUserId:
        (this.$store.state.auth &&
          this.$store.state.auth.userInfo &&
          this.$store.state.auth.userInfo.info &&
          this.$store.state.auth.userInfo.info.id + "") ||
        "",
      userInfo: {},
      videoType: "1",
      bottomline: "1",
      editModal: true,
      guanzhuloading: false,
      isFollow: false,
      showData: false,
      fans_num: 0,
      is_following: false,
      perPage: 10,
      page: 1,
      showmodal1: false,
      showmodal2: false
    };
  },
  watch: {
    "$route.query": () => {
      that.init();
    }
  },
  layout: "foryou",
  mounted() {
    that = this;
    this.init();
  },

  methods: {
    front_integral_getlist() {},
    showVideo(index) {
      this.item = this.columnsData3[index].video;
      this.showVideoModal = true;
    },
    goShop() {
      // if (!this.$store.state.auth.token) {
      //   this.$loginModal(this);
      //   return;
      // }
      this.userInfo &&
        this.userInfo.info &&
        this.userInfo.info.id &&
        this.$router.push(
          `/goods?userId=${(this.userInfo &&
            this.userInfo.info &&
            this.userInfo.info.id) ||
            ""}`
        );
    },
    changepage(pagination) {
      this.pagination = pagination;
      this.page = pagination.current;
      this[`columnsData${this.type}`] = [];
      this.getFollowList(this.type);
    },
    showModalFunc(type) {
      this.type = type;
      this.page = 1;
      this.pagination = {
        current: 1,
        pageSize: 10,
        total: 1
      };
      this.columnsData1 = [];
      this.columnsData2 = [];
      this.columnsData3 = [];
      this[`showmodal${type}`] = true;
      this.getFollowList(type);
    },
    async getFollowList(type) {
      let url = "";
      switch (type) {
        case "1":
        case "2":
          url = "front_user_getFollowList";
          break;
        case "3":
          url = "front_video_pointList";
          break;
        case "4":
          url = "front_integral_getlist";
          break;

        default:
          break;
      }

      this.loading = true;
      let obj = {
        perPage: this.perPage,
        page: this.page
      };
      if (type !== "4") {
        obj.followsType = type;
        obj.user_id = this.$route.query.userId;
      }
      let followList = await this.$api[url](obj).catch(err => {
        this.loading = false;
      });
      this.pagination.total = (followList.data && followList.data.total) || 0;
      this.pagination.pageSize = this.perPage;

      this.loading = false;
      this.total = this[`columnsData${type}`] =
        (followList.data && followList.data.data) || [];
    },
    init() {
      this.showData = false;
      this.guest_user_info();
    },
    async guanzhu() {
      if (!this.$store.state.auth.token) {
        this.$loginModal(this);
        return;
      }
      if (this.is_following) {
        this.guanzhuloading = true;
        let res = await this.$api
          .front_user_cancelFollow({
            user_id: this.$route.query.userId
          })
          .catch(() => {
            this.guanzhuloading = false;
          });
        this.guanzhuloading = false;
        if (res.code === 0) {
          this.is_following = false;
          this.fans_num--;
          this.$message.success(this.$t("components.tips.cancelFollow"));
        } else {
          this.$message.error(res.msg || this.$t("common.systemError"));
        }
      } else {
        this.guanzhuloading = true;
        let res = await this.$api
          .front_user_follow({
            user_id: this.$route.query.userId
          })
          .catch(() => {
            this.guanzhuloading = false;
          });
        this.guanzhuloading = false;
        if (res.code === 0) {
          this.fans_num++;
          this.is_following = true;
          this.$message.success(this.$t("components.tips.FollowSuccess"));
        } else {
          this.$message.error(res.msg || this.$t("common.systemError"));
        }
      }
    },
    go() {
      switch (this.userInfo.info.is_auth) {
        case 1:
          this.$router.push("/vip");
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          break;

        default:
          break;
      }
    },

    getBtnStatus() {
      let str = this.$t("page.auth1");
      switch (this.userInfo.info.is_auth) {
        case 1:
          str = this.$t("page.auth1");
          break;
        case 2:
          str = this.$t("page.auth2");
          break;
        case 3:
          str = this.$t("page.auth3");
          break;
        case 4:
          str = this.$t("page.auth4");
          break;

        default:
          break;
      }
      return str;
    },
    async copyUrl() {
      let name =
        this.userInfo && this.userInfo.info && this.userInfo.info.username;
      try {
        await this.$copyText(name);
        this.$message.success(this.$t("common.copySuccess"));
      } catch (e) {
        console.error(e);
      }
    },
    selectItemLeave() {
      this.bottomline = this.videoType;
    },
    selectItemOver(type) {
      this.bottomline = type;
    },
    selectItem(type) {
      this.videoType = type;
    },
    showConfirm() {},
    async guest_user_info() {
      // if (!this.$route.query.userId && !this.thisUserId) {
      //   // this.$router.replace("/foryou");
      //   return;
      // }
      let res = await this.$api.guest_user_info({
        user_id: this.$route.query.userId || this.thisUserId
      });
      if (res) {
        this.showData = true;
        this.userInfo = { ...res.data, token: Cookies.get("token") };
        this.is_following = res.data && res.data.is_following;
        this.fans_num = res.data.fans_num;
        if (
          this.$route.query.userId === this.thisUserId ||
          !this.$route.query.userId
        ) {
          this.$utils.setAuthInfo(this, {
            ...this.userInfo,
            token: Cookies.get("token")
          });
        }
      }
    }
  }
};
