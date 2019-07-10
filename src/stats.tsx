import * as React from 'react';
import {Component} from 'react';
import {LineChart} from './lineChart';
import { PieChart } from './pieChart';

export interface StatsProps {
  
}

export interface StatsState {
  
}

const usernames = ['coffee_report', 'surfinghut', 'burger_dose', 'zzarcon'];

export class Stats extends Component<StatsProps, StatsState> {
  renderCharts = () => {
    return usernames.map(username => {
      return (
        <LineChart key={username} username={username} />
      )
    })
  }

  renderPieChart = () => {
    return (
      <PieChart usernames={usernames} />
    )
  }

  render() {
    return (
      <div>
        {this.renderCharts()}
        <hr />
        {this.renderPieChart()}
      </div>
    );
  }
}