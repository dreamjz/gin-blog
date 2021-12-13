<template>
  <div class="sysinfo-page">
    <el-row :gutter="20" class="system_state">
      <el-col :span="12">
        <el-card v-if="state.os" class="card_item">
          <div slot="header">Runtime</div>
          <div>
            <el-row :gutter="10">
              <el-col :span="12">OS</el-col>
              <el-col :span="12" v-text="state.os.goos" />
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">CPU Number</el-col>
              <el-col :span="12" v-text="state.os.numCpu" />
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">Compiler</el-col>
              <el-col :span="12" v-text="state.os.compiler" />
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">Go Version</el-col>
              <el-col :span="12" v-text="state.os.goVersion" />
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">Goroutine Number</el-col>
              <el-col :span="12" v-text="state.os.numGoroutine" />
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card v-if="state.disk" class="card_item">
          <div slot="header">Disk</div>
          <div>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-row :gutter="10">
                  <el-col :span="12">Total</el-col>
                  <el-col :span="12" v-text="state.disk.totalMiB+' MiB'" />
                  <el-col :span="12" push="12" v-text="state.disk.totalGiB+' GiB'" />
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">Used</el-col>
                  <el-col :span="12" v-text="state.disk.usedMiB+' MiB'" />
                  <el-col :span="12" push="12" v-text="state.disk.usedGiB+' GiB'" />
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-progress
                  type="dashboard"
                  :percentage="Number(state.disk.usedPercent.toFixed(0))"
                  :color="colors"
                />
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="system_state">
      <el-col :span="12">
        <el-card
          v-if="state.cpu"
          class="card_item"
          :body-style="{ height: '180px', 'overflow-y': 'scroll' }"
        >
          <div slot="header">CPU</div>
          <div>
            <el-row :gutter="10">
              <el-col :span="12">Physical cores</el-col>
              <el-col :span="12" v-text="state.cpu.cores" />
            </el-row>
            <template v-for="(item, index) in state.cpu.usedCpus">
              <el-row :key="index" :gutter="10">
                <el-col :span="12">core {{ index }}</el-col>
                <el-col
                  :span="12"
                ><el-progress
                  type="line"
                  :percentage="+Number(item.toFixed(0))"
                  :color="colors"
                /></el-col>
              </el-row>
            </template>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card v-if="state.ram" class="card_item">
          <div slot="header">Ram</div>
          <div>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-row :gutter="10">
                  <el-col :span="12">Total</el-col>
                  <el-col :span="12" v-text="state.ram.totalMiB+' MiB'" />
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">Used</el-col>
                  <el-col :span="12" v-text="state.ram.usedMiB+' MiB'" />
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-progress
                  type="dashboard"
                  :percentage="Number(state.ram.usedPercent.toFixed(0))"
                  :color="colors"
                />
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getSystemState } from '@/api/system'
export default {
  name: 'State',
  data() {
    return {
      timer: null,
      state: {

      },
      colors: [
        { color: '#5cb87a', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#f56c6c', percentage: 80 }
      ]
    }
  },
  created() {
    this.reload()
    this.timer = setInterval(() => {
      this.reload()
    }, 1000 * 10)
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  },
  methods: {
    async reload() {
      await getSystemState().then(response => {
        this.state = response.data
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>
.sysinfo-page {
  margin: 30px;
}
.system_state {
  padding: 10px;
}

.card_item {
  height: 280px;
}
</style>
