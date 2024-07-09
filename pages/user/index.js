import * as Cookies from "js-cookie";
export default {
  layout: "admin",
  data() {
    return {
      status: true,
      dialogVisible: false,
      showData: false,
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
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [6, 6], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        canMove: true,
        original: true, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        mode: "cover" // cover  图片铺满容器
      },
      userInfo: {},
      plainOptions: [
        { label: "male", value: "1" },
        { label: "female", value: "2" },
        { label: "secrecy", value: "0" }
      ],
      loading: false,
      config: {
        rules: [
          { type: "date", required: true, message: "Please select birthday!" }
        ]
      },
      imageUrl: "",
      confirmDirty: false,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      thisUserId:
        (this.$store.state.auth &&
          this.$store.state.auth.userInfo &&
          this.$store.state.auth.userInfo.info &&
          this.$store.state.auth.userInfo.info.id + "") ||
        "",
      modal1Visible: false,
      changeCheckboxList: [],
      userTagList: [],
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 8
          }
        }
      }
    };
  },
  watch: {
    modal1Visible(val) {
      if (!val) {
        this.afterClose();
      }
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  mounted() {
    this.thisUserId === this.$route.query.userId && this.guest_user_info();
  },
  methods: {
    afterClose() {
      this.$refs.upload.value = "";
    },
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
      let res = await this.$api.front_tag_getlist().catch(err => {});
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
      let res = await this.$api.guest_user_info().catch(err => {
        this.$message.destroy();
        this.showData = true;
      });
      this.showData = true;
      if (res.code === 0) {
        this.$message.destroy();
        this.userInfo = res.data;
        if (this.userInfo.info.head_portrait) {
          this.imageUrl = this.userInfo.info.head_portrait || "";
        }
        this.form.setFieldsValue({
          email: this.userInfo.info.email,
          birthday: this.userInfo.info.birthday,
          desc: this.userInfo.info.desc,
          sex: this.userInfo.info.sex + "",
          nickname:
            this.userInfo && this.userInfo.info && this.userInfo.info.nickname || '',
          phone:
            this.userInfo &&
            this.userInfo.info &&
            this.userInfo.info.phone &&
            this.userInfo.info.phone.replace("+61", "")
        });
      } else {
        this.$message.destroy();
        this.$message.error(res.msg || this.$t("common.systemError"));
      }
    },
    onChange1(val) {
      this.form.setFieldsValue({
        sex: val.target.value
      });
    },
    onChange(val) {
      console.log(val);
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

    // 触发 input：file
    uploadFile() {
      this.$refs.upload.dispatchEvent(new MouseEvent("click"));
    },
    // 点击上传按钮后的事件
    upload(e) {
      let file = e.target.files[0];
      var self = this;
      this.createReader(file, function(w, h) {
        self.file2base64(file);
      });
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
        let res2 = await this.$api.front_user_setHeadPortrait({
          head_portrait: res.data.path
        });
        if (res.code === 0 && res2.code === 0) {
          this.imageUrl = res.data.path;
          this.modal1Visible = false;
          this.$message.success(this.$t("components.tips.headerUpdate"));
          this.userInfo = {
            ...this.userInfo,
            info: {
              ...this.userInfo.info,
              head_portrait: res.data.path
            }
          };
          console.log(this.userInfo);
          this.$utils.setAuthInfo(this, {
            ...this.userInfo,
            token: Cookies.get("token")
          });
          this.afterClose();
        } else {
          this.ctx.$message.error(
            res.msg || res2.msg || this.ctx.$t("common.systemError")
          );
        }
      });
    },

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          this.loading = true;
          this.$message.loading(this.$t("common.loadingData"));

          let res = await this.$api
            .front_user_edit({
              ...this.userInfo,
              head_portrait: this.imageUrl,
              email: values.email,
              sex: values.sex,
              birthday: values.birthday,
              desc: values.desc,
              nickname: values.nickname,
              phone: "+61" + values.phone
            })
            .catch(err => {
              this.loading = false;
              this.$message.destroy();
            });
          this.loading = false;
          if (res.code === 0) {
            this.$message.destroy();
            this.$message.success(this.$t("components.tips.userUpdate"));
            this.$utils.setAuthInfo(this, {
              ...this.userInfo,
              token: Cookies.get("token"),
              info: {
                ...this.userInfo.info,
                head_portrait: this.imageUrl,
                email: values.email,
                birthday: values.birthday,
                desc: values.desc,
                nickname: values.nickname,
                phone: "+61" + values.phone
              }
            });
          } else {
            this.$message.destroy();
            this.$message.error(res.msg || this.$t("common.systemError"));
          }
          console.log("Received values of form: ", values);
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("Two passwords that you enter is inconsistent!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    }
  }
};
