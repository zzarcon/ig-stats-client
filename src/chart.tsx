import * as React from 'react';
import {Component} from 'react';
import {Fetcher} from './fetcher';
import { Line, ChartData } from 'react-chartjs-2';
import * as chartjs from 'chart.js';
import { StatPayload } from './types';
import {ChartWrapper, LineWrapper} from './styled';

export interface ChartProps {
  username: string;
} 

export interface ChartState {
  stats?: StatPayload[];
}

const pad = (num: number): string => (`${num}` as any).padStart(2, '0')
const getHumanDate = (dateText: Date): string => {
  const date = new Date(dateText as any);

  return `${pad(date.getDate())}-${pad(date.getMonth() + 1)}`;
}
const getDataFromStat = (stats: StatPayload[]): ChartData<chartjs.ChartData> => {
  const uniqueStats = stats.filter(stat => {
    return !!stat;
  });
  const labels = uniqueStats.map(stat => {
    return getHumanDate(stat.date)
  })
  const data = uniqueStats.map(stat => stat.followers)

  return {
    labels,
    datasets: [
      {
        label: 'followers',
        fill: false,
        lineTension: 0.1,
        // backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        // borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        // pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data
      }
    ]
  };
}

export class Chart extends Component<ChartProps, ChartState>{
  state: ChartState = {

  }

  async componentDidMount() {
    const {username} = this.props;
    const fetcher = new Fetcher();
    const stats = await fetcher.getStats(username);

    this.setState({stats})
  }

  render() {
    const {stats} = this.state;
    if (!stats) {
      return (
        <div>
          Loading stats...
        </div>
      )
    }

    const {username} = this.props;
    const data = getDataFromStat(stats);

    return (
      <ChartWrapper>
        <h1>{username}</h1>
        <LineWrapper>
          <Line 
            data={data}
          />
        </LineWrapper>
      </ChartWrapper>
    )
  }
}