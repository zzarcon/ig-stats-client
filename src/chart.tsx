import * as React from 'react';
import {Component} from 'react';
import {Fetcher} from './fetcher';
import { Line, ChartData } from 'react-chartjs-2';
import * as chartjs from 'chart.js';
import { StatPayload } from './types';
import {ChartWrapper} from './styled';

export interface ChartProps {
  username: string;
} 

export interface ChartState {
  stats?: StatPayload[];
}

const getDataFromStat = (stats: StatPayload[]): ChartData<chartjs.ChartData> => {
  const labels = stats.map(stat => {
    const date = new Date(stat.date as any);
    return date.toDateString();
  })
  const data = stats.map(stat => stat.followers)

  return {
    labels,
    datasets: [
      {
        label: stats[0].username,
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
        <Line 
          data={data}
        />
      </ChartWrapper>
    )
  }
}