// 商品数据类
class Good {
  constructor(good) {
    this.data = good;
    this.choose = 0;
  }

  // 获取单件商品总价
  getTotalPrice() {
    return this.data.price * this.choose;
  }

  // 获取商品是否选中
  getIsChoose() {
    return this.choose > 0;
  }

  // 商品增加
  increase() {
    this.choose++;
  }

  // 商品减少
  decrease() {
    if (this.choose === 0) {
      return;
    }

    this.choose--;
  }
}

// 页面数据类
class UIData {
  constructor(goods) {
    let goodsList = [];
    for (let i = 0, len = goods.length; i < len; i++) {
      goodsList.push(new Good(goods[i]));
    }

    this.goodsList = goodsList;
    this.deliveryThreshold = 30;
    this.deliveryPrice = 5;
  }

  // 获取本单总价
  getTotalPrice() {
    let price = 0;
    for (let i = 0, len = this.goodsList.length; i < len; i++) {
      price += this.goodsList[i].getTotalPrice();
    }

    return price;
  }

  // 获取商品是否选中
  getIsChoose(index) {
    return this.goodsList[index].getIsChoose();
  }

  // 获取本单总数量
  getChooseNum() {
    let num = 0;
    for (let i = 0, len = this.goodsList.length; i < len; i++) {
      num += this.goodsList[i]["choose"];
    }

    return num;
  }

  // 获取购物车是否为空
  getIsGoodsInCar() {
    return this.getChooseNum() > 0;
  }

  // 达到起送费
  getIsReachDeliveryThreshold() {
    return this.getTotalPrice() > this.deliveryThreshold;
  }

  // 商品增加
  increase(index) {
    this.goodsList[index].increase();
  }

  // 商品减少
  decrease(index) {
    this.goodsList[index].decrease();
  }
}

// 页面UI类型
class UI {
  constructor(goods) {
    this.uiData = new UIData(goods);
    this.doms = {
      goodsContainer: document.querySelector(".goods-list"),
      deliveryPrice: document.querySelector(".footer-car-tip"),
      footerPay: document.querySelector(".footer-pay"),
      footerPayInnerSpan: document.querySelector(".footer-pay span"),
      totalPrice: document.querySelector(".footer-car-total"),
      car: document.querySelector(".footer-car"),
      badge: document.querySelector(".footer-car-badge"),
    };
    let carRect = this.doms.car.getBoundingClientRect();
    let ballTarget = {
      x: carRect.left + carRect.width / 2,
      y: carRect.top + carRect.height / 2,
    };
    this.ballTarget = ballTarget;

    // 初始化商品列表
    this.initGoodsHTML();
    // 初始化底部Footer
    this.updateFooter();
    this.listenEvent();
  }

  // 监听各种事件
  listenEvent() {
    this.doms.car.addEventListener("animationend", function () {
      this.classList.remove("animate");
    });
  }

  //  商品数量状态
  updateGoodsItem(index) {
    let goodsDom = this.doms.goodsContainer.children[index];
    if (this.uiData.getIsChoose(index)) {
      goodsDom.classList.add("active");
    } else {
      goodsDom.classList.remove("active");
    }
    var span = goodsDom.querySelector(".goods-btns span");
    span.textContent = this.uiData.goodsList[index].choose;
  }

  // 底部 Footer
  updateFooter() {
    // 得到总价数据
    let totalPrice = this.uiData.getTotalPrice();
    // 设置配送费
    this.doms.deliveryPrice.textContent = `配送费￥${this.uiData.deliveryPrice}`;
    // 设置起送费还差多少
    if (this.uiData.getIsReachDeliveryThreshold()) {
      // 到达起送点
      this.doms.footerPay.classList.add("active");
    } else {
      this.doms.footerPay.classList.remove("active");
      // 更新还差多少钱
      let dis = this.uiData.deliveryThreshold - totalPrice;
      this.doms.footerPayInnerSpan.textContent = `还差￥${Math.round(
        dis
      )}元起送`;
    }
    // 设置总价
    this.doms.totalPrice.textContent = totalPrice.toFixed(2);
    // 设置购物车的样式状态
    if (this.uiData.getIsGoodsInCar()) {
      this.doms.car.classList.add("active");
    } else {
      this.doms.car.classList.remove("active");
    }
    // 设置购物车中的数量
    this.doms.badge.textContent = this.uiData.getChooseNum();
  }

  // goods 列表
  initGoodsHTML() {
    let template = "";
    for (let i = 0, len = this.uiData.goodsList.length; i < len; i++) {
      let goodIem = this.uiData.goodsList[i];
      let goodData = goodIem.data;
      let choose = goodIem.choose;
      template += `
        <div class="goods-item">
          <img src="${goodData.pic}" alt="" class="goods-pic" />
          <div class="goods-info">
            <h2 class="goods-title">${goodData.title}</h2>
            <p class="goods-desc">${goodData.desc}</p>
            <p class="goods-sell">
              <span>月售 ${goodData.sellNumber}</span>
              <span>好评率${goodData.favorRate}%</span>
            </p>
            <div class="goods-confirm">
              <p class="goods-price">
                <span class="goods-price-unit">￥</span>
                <span>${goodData.price}</span>
              </p>
              <div class="goods-btns">
                <i index="${i}" class="iconfont i-jianhao"></i>
                <span>${choose}</span>
                <i index="${i}" class="iconfont i-jiajianzujianjiahao"></i>
              </div>
            </div>
          </div>
      </div>
      `;

      this.doms.goodsContainer.innerHTML = template;
    }
  }

  // 动画
  handleBallAnimate(index) {
    var btnAdd = this.doms.goodsContainer.children[index].querySelector(
      ".i-jiajianzujianjiahao"
    );
    let startRect = btnAdd.getBoundingClientRect();
    let ballStart = {
      x: startRect.left,
      y: startRect.top,
    };

    let ball = document.createElement("div");
    ball.className = "add-to-car";
    let i = document.createElement("i");
    i.className = "iconfont i-jiajianzujianjiahao";
    ball.style.transform = `translateX(${ballStart.x}px)`;
    i.style.transform = `translateY(${ballStart.y}px)`;
    ball.appendChild(i);
    document.body.appendChild(ball);

    ball.clientWidth;

    // 设置结束位置
    ball.style.transform = `translateX(${this.ballTarget.x}px)`;
    i.style.transform = `translateY(${this.ballTarget.y}px)`;
    ball.addEventListener(
      "transitionend",
      () => {
        ball.remove();
        this.handleCarAnimate();
      },
      {
        once: true, // 事件仅触发一次
      }
    );
  }

  // 购物车动画
  handleCarAnimate() {
    this.doms.car.classList.add("animate");
  }

  // 增加
  increase(index) {
    this.uiData.increase(index);
    this.updateGoodsItem(index);
    this.updateFooter();
    this.handleBallAnimate(index);
  }

  // 减少
  decrease(index) {
    this.uiData.decrease(index);
    this.updateGoodsItem(index);
    this.updateFooter();
  }
}

let ui = new UI(goods);

ui.doms.goodsContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("i-jiajianzujianjiahao")) {
    var index = +e.target.getAttribute("index");
    ui.increase(index);
  } else if (e.target.classList.contains("i-jianhao")) {
    var index = +e.target.getAttribute("index");
    ui.decrease(index);
  }
});
