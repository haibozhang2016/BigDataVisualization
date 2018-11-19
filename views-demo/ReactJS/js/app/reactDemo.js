function FormattedDate(props){
	return <h2>现在是{props.date.toLocaleTimeString()}</h2>
}

const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((numbers) =>
  <li key={numbers.toString()}>{numbers}</li>
);

class Clock extends React.Component {
	constructor(props){
		super(props);
		this.state = {date: new Date()};
//		this.handclick = this.handclick.bind(this);
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
			<div>
				<h1>hello world!</h1>
				<FormattedDate date={this.state.date} />
				<button onClick={this.handclick} href="#">点击事件</button>
				<ul>{listItems}</ul>
			</div>
		);
	}
}

ReactDOM.render(
	<Clock />,
	document.getElementById("example")
)
