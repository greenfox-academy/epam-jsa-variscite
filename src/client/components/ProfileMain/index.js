'use strict';

import React from 'react';
import Intro from '../Intro';
import ProfilePost from '../ProfilePost';

class ProfileMain extends React.Component {
  render() {
    return (
      <div className="profile-main">
        <Intro user={this.props.user}/>
        <ProfilePost user={this.props.user} isSelf={this.props.isSelf}/>
      </div>
    );
  }
}

export default ProfileMain;
