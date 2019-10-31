import React, { Component } from 'react';
import {setLoading} from '../../actions/searchActions'
import {connect} from 'react-redux';
import axios from 'axios'

class Signup extends Component {
  constructor(props){
    super(props)
    this.state={
        useremail: '',
        userpassword:''
    }
}

onChange= e => {
  if(e.target.name==="email"){
    this.setState({useremail: e.target.value})
  } else {
    this.setState({userpassword: e.target.value});
  }
}

onSubmit= e => {
e.preventDefault();
this.props.setLoading();
axios.post(`http://localhost:3001/signup`, {email:this.state.useremail,
password:this.state.userpassword})
.then(()=> this.props.history.push('/signin'))
.catch(()=>alert("El email ingresado ya existe."))
}

render () {
    return (
  <div className="signup">
  <form id="signup" onSubmit={this.onSubmit}>
  <input 
  className="form-control" 
  onChange={this.onChange} type="email" name="email" placeholder="Email"/>
  <input className="form-control" onChange={this.onChange} type="password" name="password" placeholder="Contraseña"/>
  <button type="submit">
    Registrame!
  </button>
  </form> 
  </div>
  )}
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  setLoading: ()=>dispatch(setLoading())
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup);