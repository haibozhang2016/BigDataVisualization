import React from 'react';
import ReactDom from 'react-dom';

class Son extends React.Component{
    render(){
      return <input onChange={this.props.onChange} />
    }
}

class Father extends React.Component{
  constructor(){
    super();
    this.state = {
      son: ''
    }
  }
  changeHander(e){
    this.setState({
      son: e.target.value
    })
  }
  render(){
    return <div>
      <Son onChange={e => this.changeHandler(e)}></Son>
      <p>这里显示Son组件的内容：{this.state.son}</p>
    </div>
  }
}

ReactDom.render(
  <Father/>,
  document.getElementById("example")
)
