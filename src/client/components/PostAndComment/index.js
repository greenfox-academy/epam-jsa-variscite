'use strict';

import React from 'react';
import Post from '../../components/Post';
import Comment from '../../components/Comment';

class PostAndComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInputBoxDisplay: false,
      t: 1,
    };
  }

  componentWillReceiveProps() {
    this.setState({t: 2});
  }

  showInput() {
    if (this.state.isInputBoxDisplay === true) {
      this.setState({isInputBoxDisplay: false});
    } else {
      this.setState({isInputBoxDisplay: true});
    }
  }
  render() {
    return (
      <div key={this.props.item._id} className="post-comment-container">
        <Post item={this.props.item}
          showInput = {() => this.showInput()}
          shareClick={this.props.onShareClick}
          isSharing={this.props.isSharing}
          myName={this.props.myName}
          deletePost = {this.props.deletePost}
        />
        <Comment postId={this.props.item._id}
          isInputBoxDisplay={this.state.isInputBoxDisplay}
          increaseCommentNum = {() => this.props.increaseCommentNum()}
          userPicURL={this.props.userPicURL} />
      </div>
    );
  }
}

export default PostAndComment;
