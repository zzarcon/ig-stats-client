import * as React from 'react';
import {Component} from 'react';
import { Pie } from 'react-chartjs-2';
import {PieWrapper, PieChartWrapper} from './styled';
import { StatPayload } from './types';
import { Fetcher } from './fetcher';

interface PieChartProps {
  usernames: string[];
}

interface PieChartState {
  stats: StatPayload[];
}

const getDataFromStats = (stats: StatPayload[]) => {  
  const data = stats.map(stat => stat.followers)
  const labels = stats.map((stat, index) => `${stat.username} (${data[index]})`)
  
  return {
    labels,
    datasets: [{
      data,
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
      ]
    }]
  };
}

export class PieChart extends Component<PieChartProps, PieChartState> {
  state: PieChartState = {
    stats: []
  }

  componentDidMount() {
    const {usernames} = this.props;
    const fetcher = new Fetcher();

    for (let username of usernames) {
      fetcher.getStats(username).then(stats => {
        const {stats: existingStats} = this.state;

        existingStats.push(stats[stats.length - 1]);
        this.setState({
          stats: existingStats
        })
      })
    }
  }

  render() {
    const {stats} = this.state;
    if (!stats.length) {return null}

    return (
      <PieChartWrapper>
        <h1>Total followers</h1>
        <PieWrapper>
          <Pie data={getDataFromStats(stats)} />
        </PieWrapper>
      </PieChartWrapper>
    );
  }
}