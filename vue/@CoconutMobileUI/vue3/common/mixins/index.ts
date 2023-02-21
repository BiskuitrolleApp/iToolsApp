const mixin = {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    // 每个组件都有的父组件传递的样式，可以为字符串或者对象形式
    customStyle: {
      type: [Object, String],
      default: () => ({}),
    },
    customClass: {
      type: String,
      default: "",
    },
  },
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //方法集合
  methods: {
    // 阻止事件冒泡
    preventEvent(e: any) {
      e && typeof e.stopPropagation === "function" && e.stopPropagation();
    },
  },
};

export default mixin;
