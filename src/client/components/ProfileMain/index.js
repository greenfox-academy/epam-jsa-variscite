'use strict';

import React from 'react';
import Intro from '../Intro';
import ProfilePost from '../ProfilePost';

function ProfileMain(props) {
  return (
    <div className="profile-main">
      <Intro user={props.user}/>
      <ProfilePost user={props.user} isSelf={props.isSelf}/>
    </div>
  );
}


export default ProfileMain;
