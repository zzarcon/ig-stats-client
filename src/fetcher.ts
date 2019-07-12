import {StatPayload} from './types'
import { getCurrentToken } from './token';

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

    const deferredStats = new Promise<StatPayload[]>(async (resolve, reject) => {
      const token = getCurrentToken();
      const url = `${this.host}/stats/${username}?token=${token}`;
      try {
        const response = await (await fetch(url)).json();
        resolve(response);
      } catch (e) {
        reject(e)
      }
    })

    statsCache.set(username, deferredStats);
    return deferredStats;
  }
}