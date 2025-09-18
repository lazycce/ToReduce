import ApiUtils from '@/utils/apiUtils';

/**
 * 登录
 * @param data
 */
export const login = async (data = {}) => {
  return await ApiUtils.post("/users/signIn", data);
};

/**
 * 获取传感器报警数据
 * @returns {Promise<{
 *   code: number,
 *   data: Array<{
 *     componentId: number,
 *     componentName: string,
 *     equipmentId: number,
 *     equipmentName: string,
 *     locationId: string,
 *     locationName: string,
 *     queryTs: number,
 *     warningCount: number,
 *     warningDesc: string,
 *     warningTs: number
 *   }>,
 *   message: string,
 *   timestamp: number
 * }>}
 */
export const getSensorWarningData = async ({ startTs, endTs }) => {
  // /external_data/point_data
  return await ApiUtils.get(`http://10.1.235.70:30926/external_data/warning_data?startTs=${startTs}&endTs=${endTs}`);
};