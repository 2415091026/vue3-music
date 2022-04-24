<template>
  <div class="modi">
    <h3>编辑个人信息</h3>
    <el-form :model="form">
      <el-form-item label="昵称:">
        <el-input v-model="form.name" />
      </el-form-item>

      <el-form-item label="介绍:">
        <el-input
          v-model="form.introduce"
          type="textarea"
        />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.resource">
          <el-radio label="保密" />
          <el-radio label="男" />
          <el-radio label="女" />
        </el-radio-group>
      </el-form-item>

    </el-form>
    生日:
    <el-cascader
      v-model="value"
      :options="year"
      placeholder="年"
    />
    <el-cascader
      v-model="value"
      :options="month"
      placeholder="月"
    />
    <el-cascader
      v-model="value"
      :options="day"
      placeholder="日"
    />
  </div>
</template>
<script>
import { ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";
export default {
  setup(props) {
    const store = useStore();
    const form = reactive({
      name: store.state.user.nickname,
      introduce: "",
      resource: "保密",
    });
    // 计算1920-2022的所有年份
    const startYears = 1920;
    let yearsToNow = ref([]);
    let year = reactive([]);
    let date = new Date();
    let nowYear = date.getFullYear();
    let years = nowYear - startYears;
    let arrYear = [];
    for (let i = 0; i <= years; i++) {
      arrYear.push(nowYear--);
    }
    arrYear.forEach((item) => {
      yearsToNow.value.push({ name: item });
    });
    yearsToNow.value.forEach((item) => {
      year.push({ value: item.name, label: item.name + "年" });
    });
    // 计算月份
    let month = reactive([]);
    for (let m = 1; m <= 12; m++) {
      month.push({ value: m, label: m + "月" });
    }
    // 加计算天
    let day = reactive([]);
    for (let m = 1; m <= 31; m++) {
      day.push({ value: m, label: m + "日" });
    }
    onMounted(() => {
      console.log(new Date().getMonth());
    });

    return {
      form,
      year,
      yearsToNow,
      month,
      day,
    };
  },
};
</script>
<style lang="less" scoped>
.modi {
  padding: 20px;
  width: 32%;
  h3 {
    margin-bottom: 28px;
  }
}
</style>
