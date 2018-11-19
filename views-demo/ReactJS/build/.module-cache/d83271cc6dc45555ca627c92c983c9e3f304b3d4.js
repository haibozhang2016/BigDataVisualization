class CommentList extends React.Component{
  render() {
    return (
      React.createElement("div", {className: "commentList"}, 
        "Hello, I am a CommentList. ", React.createElement("br", null), 
       	 "大名: ", this.props.name
      )
    );
  }
};

class CommentForm extends React.Component{
  render() {
    return (
      React.createElement("div", {className: "commentForm"}, 
        "Hello, I am a CommentForm.", React.createElement("br", null), 
         "大名: ", this.props.name
      )
    );
  } 
};

const arr = [
  React.createElement("h1", null, "菜鸟教程"),
  React.createElement("h2", null, "学的不仅是技术，更是梦想！"),
];
var myStyle = {color:'red',textAlign:'left'};
class HelloMessage extends React.Component {
    render() {
        return React.createElement("h1", {style: myStyle}, "Hello World！");
    }
}

class CommentBox extends React.Component{
 	render(){
 		return (
 			React.createElement("div", null, 
 				React.createElement("h1", null, "Comments"), 
		        React.createElement(CommentList, {name: "我是一号"}), 
		        React.createElement(CommentForm, {name: "我是二号"}), 
		        React.createElement(HelloMessage, null)
 			)
 		)
 	}
 }
 
ReactDOM.render(
    React.createElement(CommentBox, null),
    document.getElementById('example')
 );