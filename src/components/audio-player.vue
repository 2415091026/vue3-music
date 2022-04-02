<template>
  <div class="audio-player">
    <audio
      ref="player"
      :src="playUrl"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
    ></audio>
  </div>
</template>
<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { formatMusicTime } from "../utils/format";
export default {
  setup(props) {
    const store = useStore();
    const player = ref();
    const test = ref();
    const play = () => {
      player.value.play();
      console.log("play");
    };
    const pause = () => {
      player.value.pause();
    };
    const playUrl = computed(() => {
      return store.state.music.songUrl;
    });
    const onLoadedmetadata = (res) => {
      // totalTime.value = formatMusicTime(parseInt(res.target.duration));
      store.commit("utils/setMusicTotalTime", parseInt(res.target.duration));
      test.value = parseInt(res.target.duration);
    };

    // const currentTime = ref("00:00");
    const sliderTime = ref(0);
    const onTimeupdate = (res) => {
      // console.log(res.target.currentTime);
      // !当前播放时间
      // currentTime.value = formatMusicTime(res.target.currentTime);
      store.commit(
        "utils/setCurrentTime",
        formatMusicTime(res.target.currentTime)
      );
      store.commit("utils/setCurrentTime", res.target.currentTime);
      store.commit("utils/setDuration", res.target.duration);
    };
    const currentTime = computed(() => {
      return player.value.currentTime;
    });
    return {
      play,
      pause,
      onLoadedmetadata,
      player,
      playUrl,
      currentTime,
      sliderTime,
      onTimeupdate,
    };
  },
};
</script>
