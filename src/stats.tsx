import * as React from 'react';
import {Component} from 'react';
import {Chart} from './chart';

export interface StatsProps {
  
}

export interface StatsState {
  
}

const usernames = ['coffee_report', 'surfinghut', 'burger_dose', 'zzarcon'];

export class Stats extends Component<StatsProps, StatsState> {
  renderCharts = () => {
    return usernames.map(username => {
      return (
        <Chart key={username} username={username} />
      )
    })
  }

  render() {
    return (
      <div>
        {this.renderCharts()}
      </div>
    );
  }
}