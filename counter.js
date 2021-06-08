import React from 'react';

class Counter extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value : 0
    }
  }
  //インクリメントする関数
  onIncrement = () => {
    //setStateでstateの値を更新します
    this.setState({ value : this.state.value + 1});
  }

  //デクリメントする関数
  onDecrement = () => {
    //setStateでstateの値を更新します
    this.setState({ value : this.state.value - 1});
  }

  render(){
    return (
      <div>
				<p>↓メモ帳</p>
				<textarea></textarea>
				<p>↓あんまり関係ないカウンターのコンポーネント</p>
        <div>
          カウント値：{this.state.value}
        </div>
        <div>
          <button type="button" onClick={this.onIncrement}>+</button>
          <button type="button" onClick={this.onDecrement}>-</button>
        </div>
      </div>
    );
  }
}
export default Counter;