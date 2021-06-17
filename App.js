import React from "react";
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			weaponAttack: '',
			weaponAffinity: '',
			expectedValue: '', //逆襲とフルチャージが未実装
			SAttackBoost: '', SCounterstrike: '', SPeakPerformance: '', SResentment: '', SResuscitate: '',
			SDragonheart: '1',
			SCriticalEye: '', SWeaknessExploit: '', SMaximumMight: '', SLatentPower: '', SCriticalBoost: '',
			SAgitator: '',
			PowerCharm: '', Powertalon: '', Demondrug: '', MightSeed: '', DemonPowder: '', Spiribird: '',
			Sharp: '1',
		};
	}
	

//攻撃スキル加算部分適用
SAttackBoostAppAdd(cal){
	if (this.state.SAttackBoost === 'LV1') {
		cal += 3;
	} else if (this.state.SAttackBoost === 'LV2') {
		cal += 6;
	} else if (this.state.SAttackBoost === 'LV3') {
		cal += 9;
	} else if (this.state.SAttackBoost === 'LV4') {
		cal += 7;
	} else if (this.state.SAttackBoost === 'LV5') {
		cal += 8;
	} else if (this.state.SAttackBoost === 'LV6') {
		cal += 9;
	} else if (this.state.SAttackBoost === 'LV7') {
		cal += 10;
	}
	return cal;
}

//攻撃スキル乗算部分適用
SAttackBoostAppMul(cal){
	if (this.state.SAttackBoost === 'LV4') {
		cal *= 1.05;
	} else if (this.state.SAttackBoost === 'LV5') {
		cal *= 1.06;
	} else if (this.state.SAttackBoost === 'LV6') {
		cal *= 1.08;
	} else if (this.state.SAttackBoost === 'LV7') {
		cal *= 1.1;
	}
	return cal;
}

//挑戦者攻撃部分適用
SAgitatorAtt(cal) {
	if (this.state.SAgitator === 'LV1') {
		cal += 4;
	} else if (this.state.SAgitator === 'LV2') {
		cal += 8;
	} else if (this.state.SAgitator === 'LV3') {
		cal += 12;
	} else if (this.state.SAgitator === 'LV4') {
		cal += 16;
	} else if (this.state.SAgitator === 'LV5') {
		cal += 20;
	} 
	return cal;
}

//会心率適用
AffinityApp(cal) {
	let Affinity = Number(this.state.weaponAffinity);
	//挑戦者会心部分算出
	let AgitatorAff = 0;
	if (this.state.SAgitator === 'LV1') {
		AgitatorAff += 3;
	} else if (this.state.SAgitator === 'LV2') {
		AgitatorAff += 5;
	} else if (this.state.SAgitator === 'LV3') {
		AgitatorAff += 7;
	} else if (this.state.SAgitator === 'LV4') {
		AgitatorAff += 10;
	} else if (this.state.SAgitator === 'LV5') {
		AgitatorAff += 15;
	}
	//会心率増加スキル等加算
	Affinity += Number(this.state.SCriticalEye) + Number(this.state.SWeaknessExploit)
	          + Number(this.state.SMaximumMight) + Number(this.state.SLatentPower) + AgitatorAff;
	//超会心適用 マイナス会心時は適用しない
	let scaling = 0.25;
	if (Affinity > 0) {
		scaling = Number(this.state.SCriticalBoost);
	}
	//会心率が100を超える場合修正
	if (Affinity > 100) {
		cal *= 1 + scaling;
	} else if (Affinity < -100) {
		cal *= 0.75;
	} else {
		cal *= 1 + scaling * Affinity / 100;
	}
	return cal;
}



//算出
calculation() {
	//数値に変換
	let attack = Number(this.state.weaponAttack);

	//会心率の入力値が100を越える場合修正(表示部分)
	if (this.state.weaponAffinity > 100) {
		this.setState({weaponAffinity: 100});
	} else if (this.state.weaponAffinity < -100) {
		this.setState({weaponAffinity: -100});
	}

	//攻撃スキル乗算部分
	attack = this.SAttackBoostAppMul(attack);
	//龍気活性適用
	attack *= this.state.SDragonheart;

	//攻撃スキル加算部分
	attack = this.SAttackBoostAppAdd(attack);
	//挑戦者スキル攻撃部分
	attack = this.SAgitatorAtt(attack);
	//逆恨み適用
	attack += Number(this.state.SResentment);
	//死中に活適用
	attack += Number(this.state.SResuscitate);
	//力の護符爪等アイテム適用
	attack += Number(this.state.Demondrug) + Number(this.state.MightSeed) + Number(this.state.Spiribird);
	attack += this.state.PowerCharm + this.state.Powertalon + this.state.DemonPowder;

	//八捨九入
	attack = Math.round(attack - 0.4);

	//会心
	attack = this.AffinityApp(attack);

	//斬れ味補正適用
	attack *= this.state.Sharp;

	//小数点4桁以下四捨五入
	attack = Math.round(attack * 1000);
	attack /= 1000;

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
					onChange={(e) => {this.setState({weaponAttack: e.target.value})}}/>
				　武器の会心率：
				<input 
					type="tel"
					value={this.state.weaponAffinity} 
					onChange={(e) => {this.setState({weaponAffinity: e.target.value})}}/>%
				<br></br>
				スキル：
				<select 
					value={this.state.SAttackBoost} 
					onChange={(e) => {this.setState({SAttackBoost: e.target.value})}}>
					<option value="">攻撃</option>
					<option	value="LV1">攻撃LV1：+3</option>
					<option	value="LV2">攻撃LV2：+6</option>
					<option	value="LV3">攻撃LV3：+9</option>
					<option	value="LV4">攻撃LV4：×1.05,+7</option>
					<option value="LV5">攻撃LV5：×1.06,+8</option>
					<option value="LV6">攻撃LV6：×1.08,+9</option>
					<option value="LV7">攻撃LV7：×1.1,+10</option>
				</select>　
				<select 
					value={this.state.SResentment} 
					onChange={(e) => {this.setState({SResentment: e.target.value})}}>
					<option value="">逆恨み</option>
					<option	value="5">逆恨みLV1：+5</option>
					<option	value="10">逆恨みLV2：+10</option>
					<option	value="15">逆恨みLV3：+15</option>
					<option	value="20">逆恨みLV4：+20</option>
					<option value="25">逆恨みLV5：+25</option>
				</select>　
				<select 
					value={this.state.SResuscitate} 
					onChange={(e) => {this.setState({SResuscitate: e.target.value})}}>
					<option value="">死中に活</option>
					<option	value="5">死中に活LV1：+5</option>
					<option	value="10">死中に活LV2：+10</option>
					<option	value="20">死中に活LV3：+20</option>
				</select>　
				<select 
					value={this.state.SDragonheart} 
					onChange={(e) => {this.setState({SDragonheart: e.target.value})}}>
					<option value="1">龍気活性</option>
					<option	value="1.05">龍気活性LV4：×1.05</option>
					<option	value="1.1">龍気活性LV5：×1.1</option>
				</select>　
				<br></br>
				<select 
					value={this.state.SCriticalEye} 
					onChange={(e) => {this.setState({SCriticalEye: e.target.value})}}>
					<option value="">見切り</option>
					<option	value="5">見切りLV1：+5%</option>
					<option	value="10">見切りLV2：+10%</option>
					<option	value="15">見切りLV3：+15%</option>
					<option	value="20">見切りLV4：+20%</option>
					<option value="25">見切りLV5：+25%</option>
					<option value="30">見切りLV6：+30%</option>
					<option value="40">見切りLV7：+40%</option>
				</select>　
				<select 
					value={this.state.SWeaknessExploit} 
					onChange={(e) => {this.setState({SWeaknessExploit: e.target.value})}}>
					<option value="">弱点特効</option>
					<option	value="15">弱点特効LV1：+15%</option>
					<option	value="30">弱点特効LV2：+30%</option>
					<option	value="50">弱点特効LV3：+50%</option>
				</select>　
				<select 
					value={this.state.SMaximumMight} 
					onChange={(e) => {this.setState({SMaximumMight: e.target.value})}}>
					<option value="">渾身</option>
					<option	value="10">渾身LV1：+10%</option>
					<option	value="20">渾身LV2：+20%</option>
					<option	value="30">渾身LV3：+30%</option>
				</select>　
				<select 
					value={this.state.SLatentPower} 
					onChange={(e) => {this.setState({SLatentPower: e.target.value})}}>
					<option value="">力の開放</option>
					<option	value="10">力の開放LV1：+10%</option>
					<option	value="20">力の開放LV2：+20%</option>
					<option	value="30">力の開放LV3：+30%</option>
					<option	value="40">力の開放LV4：+40%</option>
					<option	value="50">力の開放LV5：+50%</option>
				</select>　
				<select 
					value={this.state.SCriticalBoost} 
					onChange={(e) => {this.setState({SCriticalBoost: e.target.value})}}>
					<option value="0.25">超会心</option>
					<option	value="0.3">超会心LV1：会心補正1.3</option>
					<option	value="0.35">超会心LV2：会心補正1.35</option>
					<option	value="0.4">超会心LV3：会心補正1.4</option>
				</select>
				<br></br>
				<select 
					value={this.state.SAgitator} 
					onChange={(e) => {this.setState({SAgitator: e.target.value})}}>
					<option value="">挑戦者</option>
					<option	value="LV1">挑戦者LV1：攻撃+4,会心+3%</option>
					<option	value="LV2">挑戦者LV2：攻撃+8,会心+5%</option>
					<option	value="LV3">挑戦者LV3：攻撃+12,会心+7%</option>
					<option	value="LV4">挑戦者LV4：攻撃+16,会心+10%</option>
					<option	value="LV5">挑戦者LV5：攻撃+20,会心+15%</option>
				</select>
				<br></br>
				アイテム等：
				<input
					type="checkbox"
					value={this.state.PowerCharm}
					onChange={() => {this.state.PowerCharm ? this.setState({PowerCharm: ''}) : this.setState({PowerCharm: 6})}}
					checked={this.state.PowerCharm === 6}
				/>力の護符(攻撃+6) 
				<input
					type="checkbox"
					value={this.state.Powertalon}
					onChange={() => {this.state.Powertalon ? this.setState({Powertalon: ''}) : this.setState({Powertalon: 9})}}
					checked={this.state.Powertalon === 9}
				/>力の爪(攻撃+9)　
				<select 
					value={this.state.Demondrug} 
					onChange={(e) => {this.setState({Demondrug: e.target.value})}}>
					<option value="0">鬼人薬</option>
					<option	value="5">鬼人薬：+5</option>
					<option	value="7">鬼人薬グレート：+7</option>
				</select>　
				<select 
					value={this.state.MightSeed} 
					onChange={(e) => {this.setState({MightSeed: e.target.value})}}>
					<option value="0">怪力の種等</option>
					<option	value="10">怪力の種：+10</option>
					<option	value="15">おだんごビルドアップ：+15</option>
					<option	value="25">ホムラチョウ：+25</option>
				</select>
				<input
					type="checkbox"
					value={this.state.DemonPowder}
					onChange={() => {this.state.DemonPowder ? this.setState({DemonPowder: ''}) : this.setState({DemonPowder: 10})}}
					checked={this.state.DemonPowder === 10}
				/>鬼人の粉塵(攻撃+10)　
				<select 
					value={this.state.Spiribird} 
					onChange={(e) => {this.setState({Spiribird: e.target.value})}}>
					<option value="0">赤ﾋﾄﾀﾞﾏﾄﾞﾘ</option>
					<option	value="1">ﾋﾄﾀﾞﾏﾄﾞﾘ+1</option><option	value="2">ﾋﾄﾀﾞﾏﾄﾞﾘ+2</option><option	value="3">ﾋﾄﾀﾞﾏﾄﾞﾘ+3</option><option	value="4">ﾋﾄﾀﾞﾏﾄﾞﾘ+4</option>
					<option	value="5">ﾋﾄﾀﾞﾏﾄﾞﾘ+5</option><option	value="6">ﾋﾄﾀﾞﾏﾄﾞﾘ+6</option><option	value="7">ﾋﾄﾀﾞﾏﾄﾞﾘ+7</option><option	value="8">ﾋﾄﾀﾞﾏﾄﾞﾘ+8</option>
					<option	value="9">ﾋﾄﾀﾞﾏﾄﾞﾘ+9</option><option	value="10">ﾋﾄﾀﾞﾏﾄﾞﾘ+10</option><option	value="11">ﾋﾄﾀﾞﾏﾄﾞﾘ+11</option><option	value="12">ﾋﾄﾀﾞﾏﾄﾞﾘ+12</option>
					<option	value="13">ﾋﾄﾀﾞﾏﾄﾞﾘ+13</option><option	value="14">ﾋﾄﾀﾞﾏﾄﾞﾘ+14</option><option	value="15">ﾋﾄﾀﾞﾏﾄﾞﾘ+15</option><option	value="16">ﾋﾄﾀﾞﾏﾄﾞﾘ+16</option>
					<option	value="17">ﾋﾄﾀﾞﾏﾄﾞﾘ+17</option><option	value="18">ﾋﾄﾀﾞﾏﾄﾞﾘ+18</option><option	value="19">ﾋﾄﾀﾞﾏﾄﾞﾘ+19</option><option	value="20">ﾋﾄﾀﾞﾏﾄﾞﾘ+20</option>
				</select>
				<br></br>
				<select 
					value={this.state.Sharp} 
					onChange={(e) => {this.setState({Sharp: e.target.value})}}>
					<option value="1">斬れ味</option>
					<option	value="0.5">赤：×0.5</option>
					<option	value="0.75">橙：×0.75</option>
					<option	value="1.0">黄：×1.0</option>
					<option	value="1.05">緑：×1.05</option>
					<option value="1.2">青：×1.2</option>
					<option value="1.32">白：×1.32</option>
					{/* <option value="1.39">紫：×1.39</option> */}
				</select>
				<br></br>
				<button onClick={() => {this.calculation()}}>期待値算出</button>

				<br></br>
				<br></br>
				↓stateを表示<br></br>
				weaponAttack:{this.state.weaponAttack}<br></br>
				weaponAffinity:{this.state.weaponAffinity}<br></br>
				expectedValue:{this.state.expectedValue}<br></br>
				SAttackBoost:{this.state.SAttackBoost} PowerCharm:{this.state.PowerCharm}<br></br>
				Sharp:{this.state.Sharp}
			</div>
		);
	}
}

export default App;