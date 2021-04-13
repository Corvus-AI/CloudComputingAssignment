import React, { Component } from 'react';
import './App.css';
import Dashboard from './Dashboard.js';
import GoogleLogin from 'react-google-login';

const clientId='705300019964-18i40pqvj6feqn1amqiuh2ic2msfbhqb.apps.googleusercontent.com'

class App extends Component {
  // state = {
  //   isLoggedIn: false,
  //   username: ''
  // };

  constructor(props)
  {
    super(props);
    var username=localStorage.getItem('username');
    if(username)
    {
      this.state={isLoggedIn: true, username: username};
    }
    else
    {
      this.state={isLoggedIn: false, username: null};
    }
  }

  loginSuccess=(res) => {
      console.log('Login Success: ',res.profileObj);
      this.setState({isLoggedIn:true, username:res.profileObj.givenName, email: res.profileObj.email });
  }

  loginFailure=(res) => {
    console.log('Login Failed: ',res);
    alert("Login Failed");
  }

  render() 
  {
    if(this.state.isLoggedIn)
    {
      return(
        <Dashboard username={this.state.username} email={this.state.email}/>
      );
    }
    else
    {
      return(
        <div className="w3-display-middle">
          <GoogleLogin
            clientId={clientId}
            buttonText="Login using google"
            onSuccess={(res)=>this.loginSuccess(res)}
            onFailure={(res)=>this.loginFailure(res)}
            cookiePolicy={'single_host_origin'}
            style={{marginTop:'100px'}}
            isSignedIn={true}

          />
        </div>
      );
    }
     
  }
}

export default App;