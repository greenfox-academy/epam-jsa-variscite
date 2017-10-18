'use strict';

import ReactDOM from 'react-dom'; // eslint-disable-line no-unused-vars
import React from 'react';
import Header from '../../components/Header';
import NavigationBar from '../../components/NavigationBar';

class FeedPage extends React.Component {
  render() {
    return (
      <div>
        <Header isLoggedIn={true}/>
        <NavigationBar />
      </div>
    );
  }
}

export default FeedPage;
