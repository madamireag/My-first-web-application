import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';

import './custom.css'
import { Client } from './components/Client';
import { ClientAddForm } from './components/ClientAddForm';
import { ProductList } from './components/ProductList';
import { ProductAddForm } from './components/ProductAddForm';
export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
            <Route path='/fetch-data' component={FetchData} />
            <Route path='/client/:Id?' component={Client} />
            <Route path='/client-add-form/:Id?' component={ClientAddForm}/>
            <Route path='/produs/:Id?' component={ProductList}/>
            <Route path='/product-add-form/:Id?' component={ProductAddForm} />
            
      </Layout>
    );
  }
}
