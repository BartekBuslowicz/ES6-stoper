class Stopwatch extends React.Component {
  	constructor(display) {
    	super();
   		this.state = {
      		running: false,
     		display: display,
      		minutes: 0,
      		seconds: 0,
      		miliseconds: 0
    	}
  	}

  	reset() {
    	this.setState({
      		minutes: 0,
      		seconds: 0,
      		miliseconds: 0
    	})
    	this.state.running = false;
    	clearInterval(this.watch)
  }

  	format(times) {
    	return `${pad0(this.state.minutes)}:${pad0(this.state.seconds)}:${pad0(Math.floor(this.state.miliseconds))}`;
  	}

  	start() {
    	if (!this.state.running) {
      		this.state.running = true,
      		this.watch = setInterval(() => this.step(),10)
    	}
  	}

  	step() {
    	if (!this.state.running) return;
    	this.calculate()
  	}

  	calculate() {
    	let {
     		miliseconds,
      		seconds,
      		minutes
    	} = this.state;

    	miliseconds += 1;
    	if (miliseconds >= 100) {
      		seconds += 1;
      		miliseconds = 0;
    	}
    	if (seconds >= 60) {
     		minutes += 1;
      		seconds = 0;
    	}
    	this.setState ({
      		miliseconds: miliseconds,
      		seconds: seconds,
      		minutes: minutes
    	});
  	}

  	stop() {
    	this.state.running = false;
    	clearInterval(this.watch);
  	}

  	render(){
    	return (
      		<div>
        		<div className={'stopwatch'}>{this.format()}</div>
        		<span  onClick={ ()=> this.start() }>  Start </span>
        		<span  onClick={ ()=> this.stop() }>   Stop  </span>
        		<span  onClick={ ()=> this.reset() }>  Reset </span>
      		</div>
    	);
  	}

};

const stopwatch = new Stopwatch (
  	document.querySelector('.stopwatch')
);


const pad0 = (value) => {
  	let result = value.toString();
  		if (result.length < 2) {
      	result = '0' + result;
  	}
  	return result;
};

const app = document.getElementById('app');
ReactDOM.render(<Stopwatch/>, app);