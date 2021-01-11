/**
 * 如何配置本地 API_URL?
 *
 * 在项目根目录添加 .env.local 文件, 并写入
 *
 * VUE_APP_API_URL=http://localhost:3000
 *
 * 其中 3000 是后端的默认端口
 * 参见 https://cli.vuejs.org/guide/mode-and-env.html#modes
 */
export const { NODE_ENV, BASE_URL } = process.env;
export const API_URL = 'http://localhost:3000';
console.log(NODE_ENV, API_URL, BASE_URL);