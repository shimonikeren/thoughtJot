import React from "react";
import "./Login.css";
import Background from '../../images/background.png';
import axios from 'axios';

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };

  //FUNCTION: api call, check db for user 

  componentDidMount(){
    document.body.style.backgroundImage=`url(${Background})`;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
  }

  handleChange = (event) => {
		const state = this.state;
		state[event.target.name] = event.target.value;
		this.setState(state, () => console.log(this.state));
	}

  handleSubmit = (event) => {
    event.preventDefault();
    const {email, password} = this.state;
    axios.post("/login", {
      email, password
    }).then(function(data){
        window.location.href = "/entry"
    }).catch(function(error){
      console.log("we got error");
      console.log(error);
    })
  }

  render() {
    return (
    <div className="container">
           <div className="card text-center">
                <div className="card-body">
                    <h5 className="card-title">Login</h5>
                </div>
            </div>
      <form className="centered">

  
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email</label>
          <input type="text" 
          className="form-control" id="exampleInputEmail1" 
          onChange = {this.handleChange} 
          value = {this.state.email}
          name = "email"/>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1"
          onChange = {this.handleChange}
          value = {this.state.password}
          name = "password" />
        </div>

        <button type="submit" 
        className="btn btn-light submitStyle"
        onClick={(event)=>this.handleSubmit(event, this.state.searchTerm)}
        >Submit</button>

        <p className="already">Not yet a thoughtJotter? 
        <a href="/signup">Sign Up Here</a>
        </p> 
    </form>
</div>




       )
    }
}
export default Login;
