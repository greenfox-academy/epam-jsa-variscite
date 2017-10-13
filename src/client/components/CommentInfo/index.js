import React from 'react';

class CommentInfo extends React.Component {
  render() {
    return (
      <div>
        <p className='text'><span className='name'>Hilary Clinton </span> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliqt, sed diam vtua. At accusam et.</p>
        <button className='likeButton'>Like</button><span> · </span>
        <button>Reply</button><span> · </span>
        <p className='time'>10th Oct at 11:48PM</p>
      </div>
    );
  }
}

export default CommentInfo;
