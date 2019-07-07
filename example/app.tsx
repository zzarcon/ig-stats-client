import * as React from 'react';
import {Component} from 'react';
import {AppWrapper} from './styled';
import {Stats} from '../src/stats'

export interface AppState {
  
}

export default class App extends Component <{}, AppState> {
  state: AppState = {
    
  }

  render() {
    return (
      <AppWrapper>
        <Stats />
      </AppWrapper>
    )
  }
}