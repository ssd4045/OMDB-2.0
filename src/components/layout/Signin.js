import React, { Component } from 'react';
import {setLoading, setLogged, signIn} from '../../actions/searchActions'
import {connect} from 'react-redux';
import axios from 'axios'

class Signin extends Component {
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
this.props.signIn(this.state.useremail, this.state.userpassword)
.then(()=>this.props.history.push('/profile'))
.catch(err => console.log(err))
}

render () {
    return (
  <div className="singup">
  <form id="signup" onSubmit={this.onSubmit}>
  <input 
  className="form-control" 
  onChange={this.onChange} type="email" name="email" placeholder="Email"/>
  <input className="form-control" onChange={this.onChange} type="password" name="password" placeholder="Contraseña"/>
  <button type="submit">
    Loggeame!
  </button>
  </form> 
  </div>
  )}
}

const mapStateToProps = state => ({
  userdata: state.userdata
})
const mapDispatchToProps = dispatch => ({
  setLogged: (user)=>dispatch(setLogged(user)),
  setLoading: ()=>dispatch(setLoading()),
  signIn: (email, password)=>dispatch(signIn(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(Signin);