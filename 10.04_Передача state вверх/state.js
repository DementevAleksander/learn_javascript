import React from 'react';
import ReactDOM from 'react-dom';

const UNITS = {
	KPH: { um: 'Км/ч'  , convert: function(mph){ return mph * 1.61; }},
	MPH: { um: 'Миль/ч', convert: function(kph){ return kph / 1.61; }},
};

function SpeedDetector(props) {
	let value = props.speed.unit === props.unit ? props.speed.value : Math.round(100*UNITS[props.unit].convert(props.speed.value))/100;

	return <div>Скорость в {UNITS[props.unit].um} {(value <= props.maxSpeed)?'не':''} превышена.</div>;
}

class SpeedSetter extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) { 
		let value = e.target.value;
		
		if(value !== null && value !== '' && value !== undefined){
			let intValue = parseInt(value);
			if (!(isNaN(intValue) || !isFinite(intValue)))
					this.props.onSpeedChange({ speed: {unit: this.props.unit, value: intValue}});
		}
	}

	render() {
		let unit = this.props.unit;
		let speed = Object.assign({}, this.props.speed); // copy object
				
		if(speed.unit !== this.props.unit){ 
			let converted = UNITS[unit].convert(speed.value);
			speed.value = Math.round(converted * 100) / 100; 
		}

		return (
			<p>
				<span>Введите скорость в "{UNITS[unit].um}": </span>
				<input value={speed.value} onChange={this.onChange}/>
			</p>
		);
	}
}

class SpeedRadar extends React.Component {
	MAX_SPEED = 60;
	MAX_SPEED_UNIT = "MPH";

	constructor(props){
		super(props);
		this.onSpeedChange = this.onSpeedChange.bind(this);
		this.state = {speed: { value: 0, unit: 'KPH'}};
	}
	 
	onSpeedChange(speed) {
		this.setState(speed);
	}
	
	render() {
		const speed = this.state.speed;

		return ( 
			<div>
				<SpeedSetter unit="KPH" speed={speed} onSpeedChange={this.onSpeedChange}/>  {/*  onSpeedChange for uplevel notify */}
				<SpeedSetter unit="MPH" speed={speed} onSpeedChange={this.onSpeedChange}/>  {/*  onSpeedChange for uplevel notify */}
				<SpeedDetector unit={this.MAX_SPEED_UNIT} speed={speed} maxSpeed={this.MAX_SPEED}/>
			</div>
		);
	}
}

ReactDOM.render(<SpeedRadar />, document.getElementById('root'));