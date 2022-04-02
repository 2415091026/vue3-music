<template>
  <div class="songs-list">
    <div class="song-list-header">
      <!-- 歌单封面 -->
      <div class="top-image">
        <img
          :src="coverImgUrl"
          alt=""
          v-if="coverImgUrl"
        >
      </div>
      <div v-if="!coverImgUrl">
        <el-skeleton style="width: 2185px">
          <template #template>
            <el-skeleton-item
              variant="image"
              style="width: 185px; height: 190px"
            />
          </template>
        </el-skeleton>
      </div>

      <!-- 歌单描述 -->
      <div class="desc">
        <div class="right-top">
          <span class="tag">歌单</span>
          <span class="name">{{name}}</span>
        </div>
        <div class="right-center">
          <img
            :src="avatarUrl"
            alt=""
          >
          <span class="name">{{userName}}</span>
          <span class="createTime">{{time}}创建</span>
        </div>
        <div class="right-footer">
          <p>标签:<span
              v-for="item in tags"
              :key="item"
            > /{{item}}</span></p>
          <p><span>歌曲:{{songCount}}</span> <span>播放:{{playCount}}</span></p>
          <p class="brief">简介:{{description}}</p>
        </div>
      </div>
    </div>
    <div class="list">
      <music-list
        :musicList="musicList"
        :id="id"
      ></music-list>
    </div>
  </div>
</template>
<script>
import { getSongListParticulars, getAllSongs } from "../../api/main";
import { onMounted, ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { formatTime, formatCount } from "../../utils/format";
import MusicList from "./cpns/music-list";
export default {
  components: {
    MusicList,
  },
  setup(props) {
    const store = useStore();
    const route = useRoute();
    // !歌单id
    const id = route.query.id;
    // !标题
    const name = ref("");
    // !歌单创建者
    const userName = ref("");
    // !作者头像
    const avatarUrl = ref("");
    // !创建的时间
    const time = ref("");
    // !歌单封面
    const coverImgUrl = ref("");
    // !描述
    const description = ref("");
    // !歌曲数量
    const songCount = ref("");
    // !标签
    const tags = ref([]);
    // !播放数量
    const playCount = ref("");
    // !音乐id
    const trackIds = ref([]);
    // !歌曲列表
    const musicList = ref([]);
    onMounted(() => {
      getSongListParticulars({ id: id }).then((res) => {
        console.log("歌单详情", res);
        name.value = res.playlist.name;
        userName.value = res.playlist.creator.nickname;
        avatarUrl.value = res.playlist.creator.avatarUrl;
        coverImgUrl.value = res.playlist.coverImgUrl;
        time.value = formatTime(res.playlist.createTime);
        description.value = res.playlist.description;
        songCount.value = res.playlist.trackIds.length;
        tags.value = res.playlist.tags;
        playCount.value = formatCount(res.playlist.playCount);
        trackIds.value = res.playlist.trackIds;
        console.log(trackIds.value);
        // trackIds.value.map((item) => {
        //   getMusicInfo({ ids: item.id }).then((res) => {
        //     console.log(res);
        //   });
        // });
      });
      getAll();
    });
    const getAll = () => {
      // !获取歌单里全部歌曲
      getAllSongs({ id: id }).then((res) => {
        console.log("全部", res);
        musicList.value = res.songs;
        // if (store.state.music.isPlaying == true) {
        //   store.commit("music/setCurrentPlayingSongs", res.songs);
        // }
        store.commit("music/setAllSongsList", res.songs);
      });
    };
    // watch(
    //   () => store.state.music.isPlaying,
    //   (val) => {
    //     console.log("sdsd", store.state.music.isPlaying);
    //     if (val == false) {
    //       getAll();
    //     }
    //   }
    // );
    return {
      id,
      name,
      userName,
      avatarUrl,
      time,
      coverImgUrl,
      description,
      songCount,
      tags,
      playCount,
      trackIds,
      musicList,
      getAll,
    };
  },
};
</script>
<style lang="less" scoped>
.songs-list {
  padding: 40px;
  .song-list-header {
    display: flex;
    width: 100%;
    height: 190px;
    overflow: hidden;
    .top-image {
      img {
        width: 185px;
        height: 190px;
        background-size: cover;
        border-radius: 5px;
      }
    }
    .desc {
      margin-left: 12px;
      display: flex;
      flex-flow: column;
      justify-content: space-around;
      .right-top {
        height: 31px;
        display: flex;
        align-items: center;
        .tag {
          border: 1px solid #ec4141;
          font-size: 15px;
          padding: 0 6px;
          color: #ec4141;
          border-radius: 2px;
        }
        .name {
          font-size: 24px;
          font-weight: 600;
          margin-left: 12px;
        }
      }
      .right-center {
        display: flex;
        align-items: center;
        height: 31px;
        margin: 10px 0;
        img {
          width: 25px;
          height: 25px;
          border-radius: 50%;
        }
        .name {
          margin-left: 12px;
        }
        .createTime {
          font-size: 12px;
          margin-left: 12px;
          color: #676767;
        }
      }
      .right-footer {
        height: 90px;
        font-size: 13px;
        display: flex;
        flex-flow: column;
        justify-content: space-around;
        color: #676767;
        p.brief {
          width: 1360px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .list {
    margin-top: 40px;
  }
}
</style>
