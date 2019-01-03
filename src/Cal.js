import React, { Component } from 'react';
import './Cal.css';
import Transition from './Components/Transition';
import {connect} from 'react-redux';
import {updateUser} from './Actions/user-action'
import { Calculation } from './Actions/calculate-action'
import { Input } from './Actions/input-action'
import {bindActionCreators} from 'redux';

class Cal extends Component {
  constructor(props){
  super(props);
  this.state = { value:null,isWait: false, operator:null, listHistory:[], newList:[] };
  }

  componentDidMount(){
        document.onkeydown = (e)=>{
          let keyb = String(e.keyCode);
          const filter_key = ['191','88','189','187','13','190','48','49','50','51','52','53','54','55','56','57'];
          const keyb_operator = { 191: '/', 88: '*', 189: '-', 187: '+', 13: '='};

          if(filter_key.includes(keyb)){
                if (Object.keys(keyb_operator).includes(keyb)) {
                    this.Calculate(keyb_operator[keyb]);
                    e.preventDefault()
                }else if(keyb === "190"){
                    this.inputDot();
                    e.preventDefault()
                }else{
                    keyb = String.fromCharCode(e.keyCode);
                    this.inpuntNumber(keyb);
                    e.preventDefault()
                }
          }
      }
  }

  Calculate(next_operator){
    const { operator, value, isWait} = this.state;
    const {displayValue} = this.props;
    const nextValue = parseFloat(displayValue);

    if(value==null){
      this.setState({ value: nextValue })
    }else if(operator){
      const currentValue = value;
      if(operator && currentValue && nextValue && !isWait){
        this.props.dispatch(Calculation(operator,currentValue, nextValue));
        }
      const newList = [currentValue,operator,nextValue];
      this.setState({
        value: this.props.displayValue,
        listHistory: [...this.state.listHistory, newList]
      })
    }
    this.setState({
      isWait:true,
      operator:next_operator,
    })
  }

  inpuntNumber(Num){
    const {isWait} = this.state;
    const {displayValue} = this.props;
    if(isWait){
      this.props.dispatch(Input("single", Num));
      this.setState({
        isWait:false
      })
      }
    else{
      if(displayValue === "0"){
      this.props.dispatch(Input("single", Num));
      }else{
      this.props.dispatch(Input("double",Num, displayValue));
      }

    }
  }

  inputDot(){
    const {isWait} = this.state;
    const {displayValue} = this.props;
        if(isWait){
          this.props.dispatch(Input("single", "."));
          this.setState({
            isWait:false
          })
        }else if(displayValue.indexOf(".") === -1){
          this.props.dispatch(Input("double", ".", displayValue));
        }
  }

  Clear() {
      this.props.dispatch(Input("single", "0"));
  }

  render() {
    console.log(this.state);
    console.log(this.props.displayValue);
    const { listHistory } = this.state;
    const { displayValue } = this.props;
    return (
      <div>
      <div className="app"  >
      {/*<pre>{JSON.stringify(this.state,null,2)}</pre>*/}
          <div className="calc-wrapper">
            <div className="input" id="input">{displayValue}</div>
            <div className="row">
              <button className="button-wrapper clear-btn" onClick ={() => this.Clear()} >Clear</button>
              <button className="button-wrapper operator" onClick ={() =>this.Calculate("/")} >÷</button>
            </div>
            <div className="row">
              <button className="button-wrapper" onClick={() => this.inpuntNumber(7)} >7</button>
              <button className="button-wrapper" onClick={() => this.inpuntNumber(8)} >8</button>
              <button className="button-wrapper" onClick={() => this.inpuntNumber(9)} >9</button>
              <button className="button-wrapper operator" onClick ={() =>this.Calculate("*")}>x</button>
            </div>
            <div className="row">
              <button className="button-wrapper" onClick={() => this.inpuntNumber(4)} >4</button>
              <button className="button-wrapper" onClick={() => this.inpuntNumber(5)} >5</button>
              <button className="button-wrapper" onClick={() => this.inpuntNumber(6)} >6</button>
              <button className="button-wrapper operator" onClick ={() =>this.Calculate("+")}>+</button>
            </div>
            <div className="row">
              <button className="button-wrapper" onClick={() => this.inpuntNumber(1)} >1</button>
              <button className="button-wrapper" onClick={() => this.inpuntNumber(2)} >2</button>
              <button className="button-wrapper" onClick={() => this.inpuntNumber(3)} >3</button>
              <button className="button-wrapper operator" onClick ={() =>this.Calculate("-")}>-</button>
            </div>
            <div className="row">
              <button className="button-wrapper duo" onClick={() => this.inpuntNumber(0)} >0</button>
              <button className="button-wrapper" onClick={() => this.inputDot()} >.</button>
              <button className="button-wrapper operator" onClick ={() =>this.Calculate("=")}>=</button>
            </div>
          </div>
        </div>
        <div className="app1">
            <ul><li><h3><u>List of Calculation :</u></h3></li>
                <Transition list={listHistory} /></ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state,props) => {
  return{
    displayValue : state.theValue
  }
}

export default connect(mapStateToProps)(Cal);
