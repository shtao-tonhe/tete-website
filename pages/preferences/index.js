/*
 * @Author: your name
 * @Date: 2020-12-15 07:42:03
 * @LastEditTime: 2020-12-23 23:10:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/pages/preferences/index.js
 */
import * as Cookies from "js-cookie";
export default {
  layout: "admin",
  data() {
    return {
      userInfo: {},
      loading: false,
      changeCheckboxList: [],
      userTagList: [],
      showData: false
    };
  },

  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  mounted() {
    this.guest_user_info();
  },
  methods: {
    getTagFunc() {
      this.form.validateFieldsAndScroll((err, values) => {});
    },
    changeCheckbox(e) {
      if (e.target.checked) {
        this.changeCheckboxList = [...this.changeCheckboxList, e.target.value];
      } else {
        this.changeCheckboxList = this.changeCheckboxList.filter(item => {
          return item !== e.target.value;
        });
      }
    },
    async front_tag_getlist(data) {
      let res = await this.$api.front_tag_getlist().catch(err => {
        this.showData = true;
      });
      this.showData = true;
      if (res.code === 0) {
        if (data.tag) {
          for (const key2 in res.data) {
            const element = res.data[key2];
            if (element.children) {
              for (let index2 = 0; index2 < element.children.length; index2++) {
                const element2 = element.children[index2];
                for (const key in data.tag) {
                  const element3 = data.tag[key];
                  if (element3.tag_id + "" == element2.id + "") {
                    this.changeCheckboxList.push(element2.id + "");
                    element2.checked = true;
                  }
                }
              }
            }
          }
        }
        this.userTagList = res.data;
      } else {
        this.$message.error(res.msg || this.$t("common.systemError"));
      }
    },
    async guest_user_info() {
      this.$message.loading(this.$t("common.loadingData"));
      let res = await this.$api
        .guest_user_info()
        .catch(err => {
          this.$message.destroy();
        })
        .catch(() => {
          this.showData = true;
        });
      if (res.code === 0) {
        this.userInfo = res.data;
        this.front_tag_getlist(res.data);
      } else {
        this.$message.destroy();
        this.$message.error(res.msg || this.$t("common.systemError"));
      }
    },

    async handleSubmit(e) {
      if (!this.showData) {
        return;
      }
      this.loading = true;
      e.preventDefault();

      this.$message.loading(this.$t("common.loadingData"));
      let res2 = await this.$api
        .front_tag_editUser({
          id: this.changeCheckboxList
        })
        .catch(() => {
          this.loading = false;
        });
      this.loading = false;
      if (res2.code === 0) {
        this.$message.destroy();
        this.$message.success(this.$t("components.tips.tagSuccess"));
      } else {
        this.$message.destroy();
        this.$message.error(res.msg || this.$t("common.systemError"));
      }
    }
  }
};
