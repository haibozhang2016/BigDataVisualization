class CommentList extends React.Component{
  render() {
    return (
      React.createElement("div", {className: "commentList"}, 
        "Hello, I am a CommentList."
      )
    );
  }
};

class CommentForm extends React.Component{
  render() {
    return (
      React.createElement("div", {className: "commentForm"}, 
        "Hello, I am a CommentForm."
      )
    );
  }
};

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
 
ReactDOM.render(
    React.createElement(CommentBox, null),
    document.getElementById('example')
 );