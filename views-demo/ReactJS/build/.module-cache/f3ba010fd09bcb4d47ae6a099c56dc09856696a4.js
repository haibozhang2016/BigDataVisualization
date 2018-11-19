class CommentBox extends React.Component{
 	render(){
 		return (
 			React.createElement("div", null, 
 				React.createElement("h1", null, "Comments"), 
		        React.createElement(CommentList, null), 
		        React.createElement(CommentForm, null)
 			)
 		)
 	}
 }
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