'use strict';

import './style.scss';
import ReactDOM from 'react-dom'; // eslint-disable-line no-unused-vars
import React from 'react';
import Header from '../../components/Header';
import SearchNav from '../../components/SearchNav';
import SearchPeople from '../../components/SearchPeople';
import SearchPost from '../../components/SearchPost';
import HTTP_STATUSES from '../../httpStatuses';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'userInfo': {username: ''},
      'isLoggedIn': true,
      'searchType': 'people',
      'searchInfo': [
        // {username: 'Obama', userPicURL: 'https://pixel.nymag.com/imgs/daily/vulture/2016/08/11/11-obama-sex-playlist.w190.h190.2x.jpg'},
        // {username: 'Hillary', userPicURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk9HKJuqE3ZmpAWaWHEbFAvsCsktkwEFZ-aNKy9eo1VGvTh_hE'},
      ],
      'errorMessage': null,
    };
  }
  handleGetUserInfoError(status) {
    let errorMessage = null;
    let pass = true;

    if (status === HTTP_STATUSES.UNAUTHORIZED) {
      window.location.href = '/login';
      pass = false;
      errorMessage = 'You are not authorized! Please log in first!';
    } else if (status === HTTP_STATUSES.SERVER_ERROR) {
      pass = false;
      errorMessage = 'Cannot connect to the database, please try again later!';
    }
    this.setState({'errorMessage': errorMessage});
    return pass;
  }

  getUserInfo() {
    let xhr = new XMLHttpRequest();
    let token = window.localStorage.getItem('token');

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (this.handleGetUserInfoError(xhr.status)) {
          let userInfo = JSON.parse(xhr.response).info;

          this.setState({userInfo: userInfo});
        }
      }
    }.bind(this));
    xhr.open('GET', '/api/user');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', token);
    xhr.send();
  }

  // ///////////////////////////////////////
  handleSearchError(status) {
    let errorMessage = null;

    if (status === HTTP_STATUSES.BAD_REQUEST) {
      errorMessage = 'Something went wrong, please try later!';
    } else if (status === HTTP_STATUSES.UNAUTHORIZED) {
      window.location.href = '/login';
      errorMessage = 'You are not authorized! Please log in first!';
    } else if (status === HTTP_STATUSES.SERVER_ERROR) {
      errorMessage = 'Cannot connect to the database, please try again later!';
    } else if (status === HTTP_STATUSES.OK) {
      return true;
    }
    this.setState({'errorMessage': errorMessage});
    return false;
  }

  sendSearchRequest() {
    let xhr = new XMLHttpRequest();

    let searchText = window.location.search.replace('?q=', '');

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (this.handleSearchError(xhr.status)) {
          let searchInfo = [];

          if (this.state.searchType === 'people') {
            searchInfo = JSON.parse(xhr.response).people;
          } else if (this.state.searchType === 'posts') {
            searchInfo = JSON.parse(xhr.response).post;
            console.log(searchInfo);
          }

          this.setState({'searchInfo': searchInfo});
          console.log(this.state.searchInfo);
        }
      }
    }.bind(this));
    xhr.open('GET', '/api/search/' + this.state.searchType + '/' + searchText);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(searchText));
  }

  searchPeople() {
    this.setState({'searchType': 'people'});
    this.sendSearchRequest();
  }

  searchPosts() {
    this.setState({'searchType': 'posts'});
    this.sendSearchRequest();
  }

  // search(event) {
  //   event.preventDefault();

  //   let searchText = event.target.elements.namedItem('input').value;

  //   if (searchText !== null) {
  //     this.sendSearchRequest(searchText);
  //     event.target.elements.namedItem('input').value = '';
  //   } else {
  //     this.setState({'errorMessage': 'Please fill out thi field!'});
  //   }
  // }

  componentDidMount() {
    this.getUserInfo();
    this.sendSearchRequest();
  }

  // /////////////////////////////////////////////////////////////
  render() {
    let main = null;

    if (this.state.searchType === 'posts') {
      main = <SearchPost postsInfo={this.state.searchInfo} />;
    } else if (this.state.searchType === 'people') {
      main = <SearchPeople peopleInfo={this.state.searchInfo} />;
    }
    return (
      <div>
        <Header isLoggedIn={true}
          user={this.state.userInfo.username}
          searchType={this.state.searchType} />
        <SearchNav />
        {main}
      </div>
    );
  }
}

export default SearchPage;

// onSubmit={this.search.bind(this)}
