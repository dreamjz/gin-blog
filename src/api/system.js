import request from '@/utils/request'

// @Tags system
// @Summary 获取服务器运行状态
// @Security ApiKeyAuth
// @Produce  application/json
// @Success 200 {string} string "{"success":true,"data":{},"msg":"返回成功"}"
// @Router /system/getServerInfo [post]
export const getSystemState = () => {
  return request({
    url: '/sysinfo/get',
    method: 'get',
    donNotShowLoading: true
  })
}
