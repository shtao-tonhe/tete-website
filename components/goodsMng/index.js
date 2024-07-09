/*
 * @Author: your name
 * @Date: 2020-12-11 20:56:08
 * @LastEditTime: 2021-02-03 14:42:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /az-pc/pages/qrcodeMng/index.js
 */

export default {
  data() {
    return {
      imageUrl: "",
      AddType: "add",
      selectOne: "",
      loading: false,
      loadingBuy: false,
      total: 0,
      option: {
        img: "", // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 0.5, // 裁剪生成图片的质量
        outputType: "jpeg", // 裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: false, // 是否开启截图框宽高固定比例
        fixedNumber: [6, 6], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        canMove: true,
        original: true, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        mode: "cover" // cover  图片铺满容器
      },
      perPage: 1,
      page: 1,
      modal1Visible: false,
      showData: false,
      pagination: {
        current: 1,
        pageSize: 1,
        total: 1
      },
      showQr: false,
      form: {},
      qrItem: {},
      visible: false,
      confirmLoading: false,
      dataList: [],
      columns: [
        {
          title: "ID",
          width: 60,
          dataIndex: "id",
          key: "id"
        },
        {
          title: this.$t("page.goodstitle"),
          dataIndex: "title",
          key: "title",
          width: 130
        },
        {
          title: this.$t("page.goodsThumbnail"),
          key: "thumbnail",
          width: 100,
          scopedSlots: { customRender: "thumbnail" }
        },
        {
          title: this.$t("page.goodsStatus"),
          dataIndex: "status",
          key: "status",
          width: 100,
          customRender: (value, item) => {
            console.log(item);
            return `${this.filters.goodsStatus(item.status)}`;
          }
        },
        {
          title: this.$t("page.goodsPrice"),
          dataIndex: "integral",
          key: "integral",
          width: 100
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
    this.front_goods_getlist();
  },
  watch: {
    pageSize(val) {
      console.log("pageSize", val);
    },
    current(val) {
      console.log("current", val);
    },
    modal1Visible(val) {
      if (!val) {
        this.afterClose();
      }
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  methods: {
    selectOneFunc(item) {
      this.selectOne = item.id;
    },

    // file类型文件 转base64文件类型
    file2base64(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      var self = this;
      reader.onload = function(e) {
        // 图片base64化
        let newUrl = this.result; //图片路径
        self.$nextTick(() => {
          self.pageImage = newUrl;
          self.option.img = newUrl;
          self.modal1Visible = true;
        });
      };
    },
    handleChange2(value) {
      this.form.setFieldsValue({
        status: value
      });
    },
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        this.loading = false;
        let res = info.file.response;
        if (res.code === 0) {
          this.imageUrl = res.data.path;
        }
      }
    },
    // 获取图片宽高
    createReader(file, whenReady) {
      var reader = new FileReader();
      reader.onload = function(evt) {
        var image = new Image();
        image.onload = function() {
          var width = this.width;
          var height = this.height;
          if (whenReady) whenReady(width, height);
        };
        image.src = evt.target.result;
      };
      reader.readAsDataURL(file);
    },
    // 点击上传按钮后的事件
    upload(e) {
      let file = e.target.files[0];
      var self = this;
      this.createReader(file, function(w, h) {
        self.file2base64(file);
      });
    },
    // 触发 input：file
    uploadFile() {
      this.$refs.upload.dispatchEvent(new MouseEvent("click"));
    },
    finish() {
      this.loading = true;
      this.$refs.cropper.getCropBlob(async data => {
        let file = new File([data], "proFileCover.jpg", {
          type: data.type,
          lastModified: Date.now()
        });
        let params = new FormData();
        params.append("file", file);
        let res = await this.$api.upload_file(params).catch(() => {
          this.loading = false;
        });
        this.loading = false;

        if (res.code === 0) {
          this.imageUrl = res.data.path;
          this.modal1Visible = false;
          this.afterClose();
        } else {
          this.$message.error(res.msg || this.$t("common.systemError"));
        }
      });
    },
    afterClose() {
      this.$refs.upload.value = "";
    },

    download() {},
    showQrcode(item) {
      this.showQr = true;
      this.qrItem = item;
    },
    showVisible(type, item) {
      this.AddType = type;
      this.visible = true;

      setTimeout(() => {
        if (type === "edit") {
          this.imageUrl = item.thumbnail;
          this.form.setFieldsValue({
            id: item.id,
            status: item.status + "",
            integral: item.integral,
            title: item.title
          });
        } else {
          this.imageUrl = "";
          this.form.setFieldsValue({
            status: "",
            id: "",
            integral: "",
            title: ""
          });
        }
      }, 100);
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          if (!this.imageUrl) {
            this.$message.error(this.$t("page.uploadGoodsPic"));
            return;
          }
          this.confirmLoading = true;
          if (this.AddType === "add") {
            await this.$api
              .front_goods_add({
                thumbnail: this.imageUrl,
                title: values.title,
                status: values.status,
                integral: values.integral
              })
              .catch(err => {
                this.confirmLoading = false;
              });
          }
          if (this.AddType === "edit") {
            await this.$api
              .front_goods_edit({
                id: values.id,
                thumbnail: this.imageUrl,
                title: values.title,
                status: values.status,
                integral: values.integral
              })
              .catch(err => {
                this.confirmLoading = false;
              });
          }
          this.visible = false;
          this.front_goods_getlist();
          this.confirmLoading = false;
          console.log("Received values of form: ", values);
        }
      });
    },
    async front_goods_del(id) {
      let res = await this.$api.front_goods_del({ id });
      if (res.code === 0) {
        this.page = 1;
        this.front_goods_getlist();
      }
    },
    onChange(current, pageSize) {
      this.page = current;
      this.front_goods_getlist();
    },
    async front_order_create() {
      if (!this.selectOne) {
        this.$message.info(this.$t("page.selectGoods"));
        return;
      }
      this.loadingBuy = true;
      let res = await this.$api
        .front_order_create({
          goods_id: this.selectOne
        })
        .catch(err => {
          this.loadingBuy = false;
        });
      this.loadingBuy = false;

      if (res.code === 0) {
        this.$message.success(this.$t("page.goodSuccess"));
      } else {
        this.$message.error(res.msg);
      }
    },
    changepage(pagination) {
      this.pagination = pagination;
      this.page = pagination.current;
      this.front_goods_getlist();
    },
    async front_goods_getlist() {
      let res = await this.$api
        .front_goods_getlist({
          searchParam: [
            {
              searchValue: "3",
              searchColumn: "user_id",
              searchOperator: "="
            }
          ],
          perPage: 1,
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
