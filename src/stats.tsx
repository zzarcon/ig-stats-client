import * as React from 'react';
import {Component} from 'react';
import Textfield from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import {LineChart} from './lineChart';
import { PieChart } from './pieChart';
import { hasToken, setCurrentToken } from './token';
import {LoginWrapper} from './styled';

export interface StatsProps {
  
}

export interface StatsState {
  token?: string;
}

const usernames = ['coffee_report', 'surfinghut', 'burger_dose', 'zzarcon'];

export class Stats extends Component<StatsProps, StatsState> {
  state: StatsState = {

  }

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

  onTokenChange = (e: any) => {
    const token = e.target.value;

    this.setState({token});
  }

  saveToken = () => {
    const {token} = this.state;
    if (!token) return;
    setCurrentToken(token);
    this.forceUpdate();
  }

  renderLogin = () => {
    return (
      <LoginWrapper>
        <Textfield 
          onChange={this.onTokenChange}
          width="medium"
        />
        <Button
          onClick={this.saveToken}
          appearance="primary"
        >
          Log in
        </Button>
      </LoginWrapper>
    )
  }

  render() {
    if (!hasToken()) {
      return this.renderLogin();
    }

    return (
      <div>
        {this.renderCharts()}
        <hr />
        {this.renderPieChart()}
      </div>
    );
  }
}