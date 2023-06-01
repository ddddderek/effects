/**
 * 格式化歌词
 * @param {String} lyricStr 歌词字符串
 * @returns { List } 歌词数组
 */
function lyricFormat(lyricStr) {
  let tempList = lyricStr.split("\n");
  let lyricList = [];
  for (let i = 0, len = tempList.length; i < len; i++) {
    let lyricItem = tempList[i];
    let parts = lyricItem.split("]");
    let timeStr = parts[0].substring(1);
    lyricList.push({
      time: timeFormat(timeStr),
      words: parts[1],
    });
  }

  return lyricList;
}

/**
 * 格式化时间
 * @param {String} timeStr 时间串
 * @returns {String} 秒
 */
function timeFormat(timeStr) {
  let parts = timeStr.split(":");
  return parseInt(parts[0], 10) * 60 + parseFloat(parts[1], 10);
}

let lyricList = lyricFormat(lrc);

/**
 *
 * @param {String} playTime 当前歌曲播放的时间
 * @returns {Number} 当前播放歌词的索引
 */
function findIndexByTime(playTime) {
  for (let i = 0, len = lyricList.length; i < len; i++) {
    if (playTime < lyricList[i]["time"]) {
      return i - 1;
    }
  }

  return lyricList.length - 1;
}

// UI dom
var doms = {
  audio: document.querySelector("audio"),
  ul: document.querySelector(".container ul"),
  container: document.querySelector(".container"),
};

// UI 初始化歌词
function initLiDoms() {
  let fragment = document.createDocumentFragment();
  for (let i = 0, len = lyricList.length; i < len; i++) {
    let li = document.createElement("li");
    li.textContent = lyricList[i]["words"];
    fragment.appendChild(li);
  }

  doms.ul.appendChild(fragment);
}

initLiDoms();

// 格式化样式和动画
function handleAnimate() {
  let currentTime = doms.audio.currentTime;
  let currentIndex = findIndexByTime(currentTime);
  liStyle(currentIndex);
  ulStyle(currentIndex);
}

// 容器高度
let containerHeight = doms.container.clientHeight;
// li 高度
let lineHeight = doms.ul.children[0].clientHeight;
// 最大偏移量
let maxOffset = doms.ul.clientHeight - containerHeight;

// 格式化 ul 样式
function ulStyle(currentIndex) {
  let offset = lineHeight * currentIndex + lineHeight / 2 - containerHeight / 2;

  if (offset < 0) {
    offset = 0;
  }

  if (offset > maxOffset) {
    offset = maxOffset;
  }

  doms.ul.style.transform = `translate3d(0,-${offset}px,0)`;
}

// 格式化li样式
function liStyle(currentIndex) {
  // 去掉高亮样式
  let activeDom = doms.ul.querySelector(".active");
  activeDom && activeDom.classList.remove("active");

  // 高亮样式(因为索引可能不存在)
  let targetDom = doms.ul.children[currentIndex];
  targetDom && targetDom.classList.add("active");
}

doms.audio.addEventListener("timeupdate", handleAnimate);
