/*
 * @Author: your name
 * @Date: 2020-12-11 20:56:08
 * @LastEditTime: 2021-01-10 14:04:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/pages/qrcodeMng/index.js
 */
import { mapState } from "vuex";
import * as Cookies from "js-cookie";

export default {
  layout: "admin",
  data() {
    return {
      perPage: 10,
      page: 1,
      showData: false,
      pagination: {
        current: 1,
        pageSize: 10,
        total: 1
      },
      showQr: false,
      qrItem: {},
      visible: false,
      confirmLoading: false,
      dataList: [],
      columns: [
        {
          title: "ID",
          width: 100,
          dataIndex: "id",
          key: "id"
        },

        {
          title: "path",
          key: "path",
          width: 100,
          scopedSlots: { customRender: "path" }
        },

        { title: "title", dataIndex: "title", key: "title", width: 130 },
        {
          title: "Integral",
          dataIndex: "integral",
          key: "integral",
          width: 100
        },
        {
          title: "Total Integral",
          dataIndex: "total_integral",
          key: "3",
          width: 100
        },
        {
          title: "Created At",
          dataIndex: "created_at",
          key: "created_at",
          width: 150,
          customRender: (value, item) => {
            console.log(item);
            return `${this.filters.formatDate(
              new Date(item.created_at),
              "yyyy-MM-dd hh:mm:ss"
            )}`;
          }
        },
        {
          title: "Update At",
          dataIndex: "updated_at",
          key: "updated_at",
          width: 150,
          customRender: (value, item) => {
            console.log(item);
            return `${this.filters.formatDate(
              new Date(item.updated_at),
              "yyyy-MM-dd hh:mm:ss"
            )}`;
          }
        },
        {
          title: "Action",
          key: "operation",
          fixed: "right",
          width: 150,
          scopedSlots: { customRender: "action" }
        }
      ],
      visible: false,
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" })
    };
  },
  mounted() {
    this.front_qrcode_getlist();
  },
  computed: {
    ...mapState("auth", ["userInfo"])
  },
  methods: {
    ruleListFunc1(rule, value, callback) {
      console.log(this.userInfo);
      const reg = /^[0-9][0-9]*$/;
      if (!reg.test(value)) {
        callback("illegal value");
      } else if (
        !this.userInfo ||
        !this.userInfo.info ||
        !this.userInfo.info.integral ||
        this.userInfo.info.integral === 0
      ) {
        callback(this.$t("page.tblow"));
      } else if (value && Number(value) > this.userInfo.info.integral) {
        callback(this.$t("page.tblow"));
      } else {
        callback();
      }
    },
    ruleListFunc2(rule, value, callback) {
      const reg = /^[0-9][0-9]*$/;
      if (!reg.test(value)) {
        callback("illegal value");
      } else {
        callback();
      }
    },
    download() {},
    showQrcode(item) {
      this.showQr = true;
      this.qrItem = item;
    },
    showVisible() {
      this.visible = true;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          this.form.validateFieldsAndScroll((err, values) => {
            this.$confirm({
              title: `Are you sure you want to spend ${values.total_integral}tb to release the QR code`,
              onOk: async () => {
                this.confirmLoading = true;
                await this.$api
                  .front_qrcode_add({
                    title: values.title,
                    content: "-",
                    total_integral: values.total_integral,
                    integral: values.integral,
                    type: 1
                  })
                  .catch(err => {
                    this.confirmLoading = false;
                  });

                this.$utils.setAuthInfo(this, {
                  ...this.userInfo,
                  info: {
                    ...this.userInfo.info,
                    integral:
                      Number(this.userInfo.info.integral) -
                      Number(values.total_integral)
                  },
                  token: Cookies.get("token")
                });

                this.visible = false;
                this.front_qrcode_getlist();

                this.confirmLoading = false;
                console.log("Received values of form: ", values);
              },
              onCancel() {},
              class: "test"
            });
          });
        }
      });
    },
    async front_qrcode_del(id) {
      let res = await this.$api.front_qrcode_del({ id });
      if (res.code === 0) {
        this.page = 1;
        this.front_qrcode_getlist();
      }
    },
    changepage(pagination) {
      this.pagination = pagination;
      this.page = pagination.current;
      this[`columnsData${this.type}`] = [];
      this.getFollowList(this.type);
    },
    async front_qrcode_getlist() {
      let res = await this.$api
        .front_qrcode_getlist({
          perPage: this.perPage,
          page: this.page
        })
        .catch(err => {
          this.showData = true;
        });
      this.showData = true;
      if (res.code === 0) {
        this.dataList = res.data.data;
        this.pagination.total = (res.data && res.data.total) || 0;
        this.pagination.pageSize = this.perPage;
      }
    }
  }
};
