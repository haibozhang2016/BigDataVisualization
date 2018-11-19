 var CommentBox = Rect.createClass({displayName: 'CommentBox',
 	render: function(){
 		return (
 			React.createElement('div', {className: 'commmentBox'},
 				"Hello world! I am a CommentBox."
 			)
 		)
 	}
 
 })
 
 
 
 
 ReactDOM.render(
    React.createElement("h1", null, "Hello world!"),
    document.getElementById('example')
 );