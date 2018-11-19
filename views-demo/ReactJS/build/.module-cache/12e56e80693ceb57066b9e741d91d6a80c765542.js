function FormattedDate(props){
	return React.createElement("h2", null, "现在是", props.date.toLocaleTimeString())
}

class Clock extends React.Component {
	constructor(props){
		super(props);
		this.state = {date: new Date()};
	}
	
	componentDidMount() {
		this.timerID = setInterval(
			() => this.tick(),
			1000
		);
	}
	
	componentWillUnmount(){
		clearInterval(this.timerID);
	}
	
	tick(){
		this.setState({
			date: new Date()
		});
	}
	
	handclick(e){
	e.preventDefault();
	alert("点击事件: " + e);
}
	
	render(){
		return(
			React.createElement("div", null, 
				React.createElement("h1", null, "hello world!"), 
				React.createElement(FormattedDate, {date: this.state.date}), 
				React.createElement("a", {onclick: handclick, href: "#"})
			)
		);
	}
}

ReactDOM.render(
	React.createElement(Clock, null),
	document.getElementById("example")
)
