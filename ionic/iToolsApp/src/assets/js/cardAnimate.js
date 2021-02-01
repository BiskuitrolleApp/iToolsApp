var cardAnimate = {
  prex: 0,
  prey: 0,
  speed: 0,
  frondCard: "",
  // backCard: "",
  lon: 0,
  prePos: 0, //帧位移
  fingerTouch: false, //手指是否触摸屏幕
  moveDirect: 0, //1表示正向，-1表示反向
  ani_move: false, //动画是否进行
  transNum: 0,
  init: function(frond) {
    var self = this;
    this.frondCard = document.getElementById(frond);
    // this.backCard = document.getElementById(back);
    document.addEventListener(
      "touchstart",
      this.onDocumentMouseDown.bind(self)
    );
    document.addEventListener("touchmove", this.onDocumentMouseMove.bind(self));
    document.addEventListener("touchend", this.onDocumentMouseUp.bind(self));
  },
  animate: function() {
    let data = (this.lon - this.prePos) * 0.1 + this.prePos;
    if (data >= 0) {
      this.prePos = 0;
    } else if (data <= -70) {
      this.prePos = -70;
    } else {
      this.prePos += (this.lon - this.prePos) * 0.1;
    }
    console.log("this.prePos :>> ", data);
    //判断是否到达了目标位置
    if (
      Math.abs(this.prePos - this.lon) < 0.01 &&
      Math.abs(this.lon) > 0.01 &&
      !this.fingerTouch
    ) {
      this.ani_move = false;

      // this.prePos = 0;
      // this.frondCard.style = "transform: translateX(" + this.prePos + "%)";
      // this.backCard.style = "transform: translateX(" + this.prePos + "%)";
    } else {
      this.frondCard.style = "transform: translateX(" + this.prePos + "%)";
      // this.backCard.style = "transform: translateX(" + -this.prePos + "%)";
      requestAnimationFrame(this.animate.bind(this));

      console.log("prePos :>> ", this.prePos);
    }
  },
  onDocumentMouseDown: function(e) {
    // this.lon = 0;
    // // 若是上次动画未结束不需要再次启动动画和重置目标位移
    e = e.touches[0];
    // //判断是否是移动事件
    // console.log("object :>> ", e.clientX - this.prex);
    if (Math.abs(e.clientX - this.prex) >= 4) {
      this.fingerTouch = true;
      this.prex = e.clientX;
      this.prey = e.clientY;
    }
    this.ani_move = true; //动画开启
  },
  onDocumentMouseMove: function(e) {
    if (!this.fingerTouch) return;
    e = e.touches[0];
    if (this.ani_move && this.fingerTouch == false) {
      // 判断是否不同向
      this.lon = 0;
      if ((e.clientX - this.prex > 0 ? 1 : -1) == -this.moveDirect) {
        this.moveDirect = -this.moveDirect;
      }
    }
    this.speed =
      (e.clientX - this.prex) *
      Math.max(Math.abs(e.clientX - this.prex), 8) *
      0.005;
    this.lon += this.speed;

    console.log("this.lon :>> ", this.lon);

    // if (this.ani_move && this.fingerTouch == false) {
    //   cardAnimate.animate();
    // } else {
    //   cardAnimate.animate();
    // }
  },
  onDocumentMouseUp: function() {
    //如果是点击事件 不设置移动

    // this.moveDirect = this.lon > 0 ? 1 : -1;
    // this.transNum = this.lon / 10 + this.moveDirect;
    // this.lon = Math.round(this.transNum) * 10;
    // this.fingerTouch = false;
    console.log("onDocumentMouseUp :>> ");
  },
};

export { cardAnimate };
