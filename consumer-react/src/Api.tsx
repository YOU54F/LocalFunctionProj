const axios = require('axios').default;
const adapter = require('axios/lib/adapters/http');

axios.defaults.adapter = adapter;
const defaultBaseUrl =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

export class API {
  url: string;
  constructor(url: string) {
    if (url === undefined || url === '') {
      url = defaultBaseUrl;
    }
    if (url.endsWith('/')) {
      url = url.substr(0, url.length - 1);
    }
    this.url = url;
  }

  withPath(path: string) {
    if (!path.startsWith('/')) {
      path = '/' + path;
    }
    return `${this.url}${path}`;
  }

  async getDemo(name: string) {
    const params = new URLSearchParams({
      name
    });
    return axios
      .get(this.withPath('/'), { params })
      .then((r: { data: any }) => r.data);
  }
}

export default new API(defaultBaseUrl);
