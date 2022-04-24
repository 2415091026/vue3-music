<template>
  <div>
    <el-button @click="play">播放</el-button>
    <div
      id="box"
      ref="box"
    >

    </div>

  </div>
</template>
<script>
import { ref, onMounted, nextTick } from "vue";
import { get, userBind } from "../../api/test";
import { useStore } from "vuex";
import { paesrLyric } from "../../utils/parse-lyric";
import Cookies from "js-cookie";
export default {
  components: {},
  setup(props) {
    const player = ref();
    const store = useStore();

    let x = ref(0);
    let y = ref(0);
    let l = ref(0);
    let t = ref(0);
    let nx = ref(0);
    let ny = ref(0);
    //计算移动后的左偏移量和顶部的偏移量
    let nl = ref(0);
    let nt = ref(0);
    let isDown = ref(false);
    const box = ref();
    onMounted(() => {
      console.log(Cookies.get("userCookie"));
      get().then((res) => {
        console.log("test", res);
      });
      player.value = paesrLyric(store.state.music.lyric);
      console.log(box.value);
      box.value.onmousedown = (e) => {
        // console.log(e);
        x.value = e.clientX;
        y.value = e.clientY;
        l.value = box.value.offsetLeft;
        t.value = box.value.offsetTop;
        //开关打开
        isDown.value = true;
        //设置样式
        box.value.style.cursor = "move";
      };
      //鼠标移动
      window.onmousemove = (e) => {
        if (isDown.value == false) {
          return;
        }
        // console.log(e);
        //获取x和y
        nx.value = e.clientX;
        ny.value = e.clientY;
        //计算移动后的左偏移量和顶部的偏移量
        nl.value = nx.value - (x.value - l.value);
        nt.value = ny.value - (y.value - t.value);

        box.value.style.left = nl.value + "px";
        box.value.style.top = nt.value + "px";
      };

      //鼠标抬起事件
      box.value.onmouseup = function () {
        //开关关闭
        isDown.value = false;
        box.value.style.cursor = "default";
      };
      userBind({ uid: "275104067" }).then((res) => {
        console.log(res, "信息");
      });
    });
    return {
      player,
      box,
      x,
      y,
      l,
      t,
      isDown,
      nx,
      ny,
      nl,
      nt,
    };
  },
};
</script>
<style lang="less" scoped>
#box {
  width: 100px;
  height: 100px;
  background-color: blue;
  position: absolute;
  cursor: pointer;
}
</style>
