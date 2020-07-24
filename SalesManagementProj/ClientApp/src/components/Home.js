import React, { Component } from 'react';
import welcome from './welcome.jpg';
export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <div>
            
            < img alt="" src={welcome} width="600" height="500" class="center"/>
       
      </div>
    );
  }
}
