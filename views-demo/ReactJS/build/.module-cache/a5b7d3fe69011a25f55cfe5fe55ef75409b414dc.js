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

var arr = [
  React.createElement("h1", null, "菜鸟教程"),
  React.createElement("h2", null, "学的不仅是技术，更是梦想！"),
];

class CommentBox extends React.Component{
 	render(){
 		return (
 			React.createElement("div", null, 
 				React.createElement("h1", null, "Comments"), 
		        React.createElement(CommentList, {name: "我是一号"}), 
		        React.createElement(CommentForm, {name: "我是二号"})
 			)
 		)
 	}
 }
 
ReactDOM.render(
    React.createElement(CommentBox, null),
    document.getElementById('example')
 );