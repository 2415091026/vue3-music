<template>
  <div class="like">
    <div class="like-songer">
      <img
        src="https://p2.music.126.net/rYYhHXZHwCfizE0N46F37Q==/109951166115911716.jpg"
        alt=""
      >
      <div class="desc">
        <p class="name">歌手:陈奕迅</p>
        <p class="fans">粉丝:737万 歌曲:1730</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.like {
  margin-top: 200px;
  display: flex;
  .like-songer {
    display: flex;
    align-items: center;
    margin-top: 16px;
    margin-right: 16px;
    width: 290px;
    height: 65px;
    background-color: #f4f4f4;
    border-radius: 5px;
    img {
      margin: 0 10px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .name {
      font-size: 14px;
      color: #000;
    }
    .desc {
      font-size: 12px;
      color: #676767;
    }
  }
}
</style>
