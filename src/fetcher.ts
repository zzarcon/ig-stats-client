import {StatPayload} from './types'

const statsCache: Map<string, Promise<StatPayload[]>> = new Map();
export class Fetcher {
  host: string;

  constructor() {
    this.host = location.host.indexOf('localhost') > -1 ? 'http://localhost:8000' : 'https://super-ig-stats.herokuapp.com';
  }

  async getStats(username: string): Promise<StatPayload[]> {
    const existingStats = statsCache.get(username);
    if (existingStats) {
      return existingStats;
    }

    const deferredStats = new Promise<StatPayload[]>(async resolve => {
      const url = `${this.host}/stats/${username}`;
      const response = await (await fetch(url)).json();

      resolve(response);
    })

    statsCache.set(username, deferredStats);
    return deferredStats;
  }
}