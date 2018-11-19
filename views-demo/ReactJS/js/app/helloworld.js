class CommentList extends React.Component{
  render() {
    return (
      <div className="commentList">
        Hello, I am a CommentList. <br/>
       	 大名: {this.props.name}
      </div>
    );
  }
};

class CommentForm extends React.Component{
  render() {
    return (
      <div className="commentForm">
        Hello, I am a CommentForm.<br/>
         大名: {this.props.name}
      </div>
    );
  } 
};

const arr = [
  <h1>菜鸟教程</h1>,
  <h2>学的不仅是技术，更是梦想！</h2>,
];
var myStyle = {color:'red',textAlign:'left'};
class HelloMessage extends React.Component {
    render() {
        return <h1 style={myStyle}>Hello World！</h1>;
    }
}

class CommentBox extends React.Component{
 	render(){
 		return (
 			<div>
 				<h1>Comments</h1>
		        <CommentList name="我是一号"/>
		        <CommentForm name="我是二号"/>
		        <HelloMessage />
 			</div>
 		)
 	}
 }
 
ReactDOM.render(
    React.createElement(CommentBox, null),
    document.getElementById('example')
 );
 