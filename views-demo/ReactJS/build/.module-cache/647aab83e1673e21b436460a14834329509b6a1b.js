 var CommentBox = React.createClass({displayName: 'CommentBox',
 	render: function(){
 		return (
 			React.createElement('div', {className: 'commmentBox'},
 				"Hello world! I am a CommentBox~~~~"
 			)
 		)
 	}
 })
 var CommentList = React.createClass({displayName: "CommentList",
  render: function() {
    return (
      React.createElement("div", {className: "commentList"}, 
        "Hello, world! I am a CommentList."
      )
    );
  }
});

var CommentForm = React.createClass({displayName: "CommentForm",
  render: function() {
    return (
      React.createElement("div", {className: "commentForm"}, 
        "Hello, world! I am a CommentForm."
      )
    );
  }
});
 
 ReactDOM.render(
    React.createElement(CommentBox, null),
    document.getElementById('example')
 );