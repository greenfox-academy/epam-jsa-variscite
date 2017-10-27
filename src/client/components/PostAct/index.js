import React from 'react';

class PostAct extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="post-act">
        <button className={this.props.likeStatus}
          onClick={this.props.onLikeClick}>Like</button>
        <button className="comment" onClick={function() {
          this.props.showInput();
        }.bind(this)}>Comment</button>
        <button className={this.props.isSharing ? 'sharing' : 'share'}
          onClick={this.props.onShareClick}>
          {this.props.isSharing ? 'Sharing...' : 'Share'}
        </button>
      </div>
    );
  }
}

export default PostAct;
