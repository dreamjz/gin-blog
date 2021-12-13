const Mock = require('mockjs')

const data = Mock.mock({
  server: {
    os: {
      goos: 'linux',
      numCpu: 2,
      compiler: 'gc',
      goVersion: '1.17',
      numGoroutine: 16
    },
    cpu: {
      cpus: [10.0, 11.2],
      cores: 2
    },
    ram: {
      usedMB: 100,
      totalMB: 512,
      usedPercent: 10
    },
    disk: {
      usedMB: 1024,
      usedGB: 1,
      totalMB: 4096,
      totalGB: 4,
      usedPercent: 40
    }
  }
})

module.exports = [
  {
    url: '/sysinfo',
    type: 'get',
    response: (config) => {
      const server = data.server
      return {
        code: 2000,
        data: {
          server: server
        }
      }
    }
  }
]
