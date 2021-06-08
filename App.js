import React from "react";
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			weaponAttack: '',
			weaponAffinity: '',
			expectedValue: '',
			SAttackBoost: '',
			Sharp: '',
		};
	}
	

//攻撃スキル乗算部分適用
SAttackBoostAppMul(cal){
	if (this.state.SAttackBoost == 4) {
		cal *= 1.05;
	} else if (this.state.SAttackBoost == 5) {
		cal *= 1.06;
	} else if (this.state.SAttackBoost == 6) {
		cal *= 1.08;
	} else if (this.state.SAttackBoost == 7) {
		cal *= 1.1;
	}
	return cal;
}

//攻撃スキル加算部分適用
SAttackBoostAppAdd(cal){
	if (this.state.SAttackBoost == 1) {
		cal += 3;
	} else if (this.state.SAttackBoost == 2) {
		cal += 6;
	} else if (this.state.SAttackBoost == 3) {
		cal += 9;
	} else if (this.state.SAttackBoost == 4) {
		cal += 7;
	} else if (this.state.SAttackBoost == 5) {
		cal += 8;
	} else if (this.state.SAttackBoost == 6) {
		cal += 9;
	} else if (this.state.SAttackBoost == 7) {
		cal += 10;
	}
	return cal;
}

//斬れ味補正適用
SharpApp(cal) {
	if (this.state.Sharp == "red") {
		cal *= 0.5;
	} else if (this.state.Sharp == "orange") {
		cal *= 0.75;
	} else if (this.state.Sharp == "yellow") {
		cal *= 1.0;
	} else if (this.state.Sharp == "green") {
		cal *= 1.05;
	} else if (this.state.Sharp == "blue") {
		cal *= 1.2;
	} else if (this.state.Sharp == "white") {
		cal *= 1.32;
	} else if (this.state.Sharp == "purple") {
		//紫は未実装
		cal *= 1.39;
	}
	return cal;
}

//算出
calculation() {
	let attack = this.state.weaponAttack;
	//数値に変換
	attack = Number(attack);

	//攻撃スキル乗算部分
	if (this.state.SAttackBoost >= 4 ) {
		attack = this.SAttackBoostAppMul(attack);
	}
	//攻撃スキル加算部分
	if (this.state.SAttackBoost != '') {
		attack = this.SAttackBoostAppAdd(attack);
	}

	//八捨九入
	attack = Math.round(attack - 0.4);

	//斬れ味
	if (this.state.Sharp != '') {
		attack = this.SharpApp(attack);
	}

	this.setState({expectedValue: attack});
}


	render() {
		return (
			<div>
      	<h1>期待値： {this.state.expectedValue}</h1>
				武器の攻撃力：
      	<input 
					type="tel"
					value={this.state.weaponAttack} 
					onChange={(e) => {this.setState({weaponAttack: e.target.value})}}
				/>　
				{/* 会心率：
        <input 
        	type="tel"
        	value={this.state.weaponAffinity} 
        	onChange={(e) => {this.setState({weaponAffinity: e.target.value})}}
        /> */}
				<br></br>
				スキル
				<select 
					value={this.state.SAttackBoost} 
					onChange={(e) => {this.setState({SAttackBoost: e.target.value})}}
				>
        	<option value="">攻撃</option>
					<option	value="1">攻撃LV1：+3</option>
					<option	value="2">攻撃LV2：+6</option>
					<option	value="3">攻撃LV3：+9</option>
					<option	value="4">攻撃LV4：×1.05,+7</option>
					<option value="5">攻撃LV5：×1.06,+8</option>
					<option value="6">攻撃LV6：×1.08,+9</option>
					<option value="7">攻撃LV7：×1.1,+10</option>
      	</select>
				<br></br>
				<select 
					value={this.state.Sharp} 
					onChange={(e) => {this.setState({Sharp: e.target.value})}}
				>
        	<option value="">斬れ味</option>
					<option	value="red">赤：×0.5</option>
					<option	value="orange">橙：×0.75</option>
					<option	value="yellow">黄：×1.0</option>
					<option	value="green">緑：×1.05</option>
        	<option value="blue">青：×1.2</option>
					<option value="white">白：×1.32</option>
					{/* <option value="purple">紫：×1.39</option> */}
      	</select>
				<br></br>
				<button onClick={() => {this.calculation()}}>期待値算出</button>

				<br></br>
				<br></br>
				↓stateを表示<br></br>
				weaponAttack:{this.state.weaponAttack}<br></br>
				{/* weaponAffinity:{this.state.weaponAffinity}<br></br> */}
				expectedValue:{this.state.expectedValue}<br></br>
				SAttackBoost:{this.state.SAttackBoost}<br></br>
				Sharp:{this.state.Sharp}
			</div>
		);
	}
}

export default App;