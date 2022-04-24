<template>
  <div
    class="songer"
    ref="songerRef"
  >
    <div
      class="container"
      :style="{'width': clientWidth == '2560' ? '50%' : '70%' }"
    >
      <!-- {{songerList}}--- -->
      <div class="fiflter">
        <div class="language">
          <div class="title">语种:</div>
          <div class="language-list">
            <ul>
              <li
                v-for="(item,index) in languageList"
                :key="item.id"
                @click="languageClick(index, item)"
              >
                <p :class="{'active': activeFiflterIndex == index}">{{item.name}}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="classify">
          <div class="title">分类:</div>
          <div class="language-list">
            <ul>
              <li
                v-for="(item,index) in classifyList"
                :key="item.id"
                @click="classifyClick(index, item)"
              >
                <p :class="{'active': activeClassifyIndex == index}">{{item.name}}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="letter">
          <div class="title">筛选:</div>
          <div class="letter-list">
            <ul>
              <li
                v-for="(item,index) in letterList"
                :key="item.id"
                @click="letterClick(index, item)"
              >
                <p :class="{'active': activeLetterIndex == index}">{{item.name}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="songer-list">
        <ul>
          <li
            class="songer-info"
            v-for="item in songerList"
            :key="item.id"
            @click="toSongerInfo(item)"
          ><img
              v-lazy="item.img1v1Url"
              alt=""
            >
            <p>{{item.name}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, ref, reactive, watch, nextTick } from "vue";
import { getSonger } from "../../api/main";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const clientWidth = ref();
    const clientHeight = ref();
    const activeFiflterIndex = ref("0");
    const activeClassifyIndex = ref("0");
    const activeLetterIndex = ref("0");
    const languageList = reactive([
      { id: "-1", name: "全部" },
      { id: "7", name: "华语" },
      { id: "96", name: "欧美" },
      { id: "8", name: "日本" },
      { id: "16", name: "韩国" },
      { id: "0", name: "其他" },
    ]);
    const classifyList = reactive([
      { id: "-1", name: "全部" },
      { id: "1", name: "男歌手" },
      { id: "2", name: "女歌手" },
      { id: "3", name: "乐队组合" },
    ]);
    const letterList = reactive([
      {
        id: "00",
        name: "热门",
      },
      {
        id: "01",
        name: "A",
      },
      {
        id: "02",
        name: "B",
      },
      {
        id: "03",
        name: "C",
      },
      {
        id: "04",
        name: "D",
      },
      {
        id: "05",
        name: "E",
      },
      {
        id: "06",
        name: "F",
      },
      {
        id: "07",
        name: "G",
      },
      {
        id: "08",
        name: "H",
      },
      {
        id: "09",
        name: "I",
      },
      {
        id: "10",
        name: "J",
      },
      {
        id: "11",
        name: "K",
      },
      {
        id: "12",
        name: "L",
      },
      {
        id: "13",
        name: "M",
      },
      {
        id: "14",
        name: "N",
      },
      {
        id: "14",
        name: "O",
      },
      {
        id: "15",
        name: "P",
      },
      {
        id: "16",
        name: "Q",
      },
      {
        id: "17",
        name: "R",
      },
      {
        id: "18",
        name: "S",
      },
      {
        id: "19",
        name: "T",
      },
      {
        id: "20",
        name: "U",
      },
      {
        id: "22",
        name: "V",
      },
      {
        id: "23",
        name: "W",
      },
      {
        id: "24",
        name: "X",
      },
      {
        id: "25",
        name: "Y",
      },
      {
        id: "26",
        name: "Z",
      },
      {
        id: "27",
        name: "#",
      },
    ]);
    const languageClick = (index, item) => {
      activeFiflterIndex.value = index;
      console.log(index, item.name);
      area.value = item.id;
      getSongerList();
    };
    const classifyClick = (index, item) => {
      activeClassifyIndex.value = index;
      type.value = item.id;
      getSongerList();
    };
    const letterClick = (index, item) => {
      activeLetterIndex.value = index;
      if (item.name == "热门") {
        initial.value = -1;
        getSongerList();
      } else {
        initial.value = item.name;
        getSongerList();
      }
    };
    const bheight = ref();
    onMounted(() => {
      let screenWidth = document.documentElement.clientWidth;
      clientWidth.value = screenWidth;
      // let screenHight = document.documentElement.scrollTop;
      // clientHeight.value = 245;
      console.log(
        document.documentElement.clientHeight,
        document.documentElement.scrollTop,
        document.documentElement.scrollHeight
      );
      window.addEventListener("scroll", load);
      // 获取文档内容实际高度
      // 获取歌手列表
      getSongerList();
    });
    // 按首字母索引查找参数
    const initial = ref("-1");
    const type = ref("-1");
    const area = ref("-1");
    const songerList = ref([]);
    const pageNo = ref(1);
    const limit = ref("36");
    const songerRef = ref();
    // offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
    const getSongerList = () => {
      getSonger({
        limit: limit.value,
        initial: initial.value,
        type: type.value,
        area: area.value,
        offset: (pageNo.value - 1) * limit.value,
      }).then((res) => {
        console.log(res, "歌手");
        songerList.value = res.artists;
      });
    };
    const load = () => {
      // console.log(window.pageYOffset, "window.pageYOffset");
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      let clientHeight = document.documentElement.clientHeight;
      let scrollHeight = document.documentElement.scrollHeight;
      if (scrollTop + clientHeight >= scrollHeight) {
        console.log("到底le");
        pageNo.value += 1;
        songerRef.value.scrollIntoView(true);
      }
    };
    const toSongerInfo = (item) => {
      console.log(item);
      router.push({ path: "/main/songerInfo", query: { id: item.id } });
      store.commit("user/setSongInfo", item.alias);
    };
    watch(
      () => pageNo.value,
      (val) => {
        console.log(val);
        getSongerList();
      }
    );
    return {
      clientWidth,
      languageList,
      activeFiflterIndex,
      classifyList,
      activeClassifyIndex,
      letterList,
      activeLetterIndex,
      songerList,
      limit,
      pageNo,
      songerRef,
      languageClick,
      classifyClick,
      letterClick,
      getSongerList,
      load,
      toSongerInfo,
    };
  },
};
</script>
<style lang="less" scoped>
.songer {
  margin-bottom: 150px;
  .container {
    margin: 0 auto;
    .fiflter {
      .language,
      .classify {
        display: flex;
        align-items: center;
        .language-list {
          margin-left: 12px;
          ul {
            display: flex;
            li {
              padding: 5px;
              cursor: pointer;
              p {
                padding: 2px 8px;
                border-radius: 10px;
                font-size: 15px;
              }
              .active {
                background-color: #fdf5f5;
                color: #ec4141;
              }
            }
          }
        }
      }
      .letter {
        display: flex;
        align-items: center;
        width: 1360px;
        .letter-list {
          ul {
            display: flex;
            li {
              padding: 10px;
              cursor: pointer;

              p {
                padding: 2px 8px;
                border-radius: 10px;
                font-size: 15px;
              }
              .active {
                background-color: #fdf5f5;
                color: #ec4141;
              }
            }
          }
        }
      }
    }
    .songer-list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      overflow: auto;
      height: 100%;
      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        height: 100%;
        // width: 66%;
        .songer-info {
          margin: 10px;
          cursor: pointer;
          &:nth-child(1) {
            margin-left: 0;
          }
          &:nth-child(n + 6) {
            margin-left: 0;
          }
          img {
            width: 165px;
            height: 165px;
            border-radius: 5px;
          }
        }
      }
    }
  }
}
</style>
