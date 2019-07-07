import {StatPayload} from './types'

export class Fetcher {
  host: string;

  constructor() {
    this.host = location.host.indexOf('localhost') > -1 ? 'http://localhost:8000' : 'https://super-ig-stats.herokuapp.com';
  }

  async getStats(username: string): Promise<StatPayload[]> {
    const url = `${this.host}/stats/${username}`;
    const response = await (await fetch(url)).json();

    return response;
  }
}