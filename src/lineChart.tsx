import * as React from 'react';
import {Component, SyntheticEvent} from 'react';
import { Line, Bar, ChartData } from 'react-chartjs-2';
import * as chartjs from 'chart.js';
import Spinner from '@atlaskit/spinner'
import { RadioGroup } from '@atlaskit/radio';
import {Fetcher} from './fetcher';
import { StatPayload } from './types';
import {ChartWrapper, LineWrapper, LineChartPlaceholder} from './styled';

export interface LineChartProps {
  username: string;
} 

export interface LineChartState {
  chartType: 'line' | 'daily';
  status: 'loading' | 'loaded' | 'error';
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

const chartTypeOptions = [
  { name: 'color', value: 'line', label: 'Historic' },
  { name: 'color', value: 'daily', label: 'Daily' },
]

export class LineChart extends Component<LineChartProps, LineChartState>{
  state: LineChartState = {
    chartType: 'line',
    status: 'loading'
  }

  async componentDidMount() {
    const {username} = this.props;
    const fetcher = new Fetcher();
    try {
      const stats = await fetcher.getStats(username);
      this.setState({status:'loaded', stats})
    } catch (e) {
      this.setState({status: 'error'})
    }
  }

  renderLine = (stats: StatPayload[]) => {
    const data = getDataFromStat(stats);

    return (
      <LineWrapper>
        <Line 
          data={data}
        />
      </LineWrapper>
    )
  }

  renderDaily = (stats: StatPayload[]) => {
    const uniqueStats = stats.filter((currentStat, index) => {
      const currentHumanDate = getHumanDate(currentStat.date);
      const firstStat = (stats as any).find((s: StatPayload) => getHumanDate(s.date) === currentHumanDate)
      const firstIndex = stats.indexOf(firstStat);

      return firstIndex === index;
    });
    const labels = uniqueStats.map(stat => {
      return getHumanDate(stat.date)
    })
    const data = uniqueStats.map((stat, index, all) => {
      if (index === 0) return 0;

      return stat.followers - all[index - 1].followers;
    });
    const barData = {
      labels,
      datasets: [
        {
          label: 'Daily followers',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data
        }
      ]
    };

    return (
      <Bar
        data={barData}
        width={100}
        height={50}
        options={{
          maintainAspectRatio: false
        }}
      />
    )
  }

  onChartTypeChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const chartType: any = event.currentTarget.value;

    this.setState({chartType});
  }

  renderLoading = () => {
    return (
      <LineChartPlaceholder>
        <Spinner />
        Loading stats...
      </LineChartPlaceholder>
    );
  }

  renderError = () => {
    const {username} = this.props;
    return (
      <div>
        Error loading stats for {username}
      </div>
    )
  }

  render() {
    const {status, stats, chartType} = this.state;
    if (status === 'loading') {
      return this.renderLoading();
    }
    if (status === 'error' || !stats) {
      return this.renderError();
    }

    const {username} = this.props;
    const content = chartType === 'line' ? this.renderLine(stats) : this.renderDaily(stats);

    return (
      <ChartWrapper>
        <h1>{username}</h1>
        <RadioGroup
          options={chartTypeOptions}
          onChange={this.onChartTypeChange}
          defaultValue={chartTypeOptions[0].value}
        />
        {content}
      </ChartWrapper>
    )
  }
}