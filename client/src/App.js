import React, { Component } from 'react';
import './App.css';
import Dashboard from './Dashboard.js';
import GoogleLogin from 'react-google-login';

const clientId='705300019964-18i40pqvj6feqn1amqiuh2ic2msfbhqb.apps.googleusercontent.com'

const refreshTokenSetup = (res) => {
  let refreshTiming=(res.tokenObj.expires_in || 3600-5*60) * 1000;
  const refreshToken=async() => {
    const newAuthRes=await res.reloadAuthResponse();
    refreshTiming=(newAuthRes.expires_in || 3600-5*60)*1000;
    console.log('newAuthRes: ',newAuthRes);
    console.log('new auth token', newAuthRes.id_token);
    setTimeout(refreshToken, refreshTiming);
  };
  setTimeout(refreshToken,refreshTiming);
};

class App extends Component {
  // state = {
  //   isLoggedIn: false,
  //   username: ''
  // };

  constructor(props)
  {
    super(props);
    //var username=localStorage.getItem('username');
    // if(username)
    // {
    //   this.state={isLoggedIn: true, username: username};
    // }
    // else
    // {
    //   this.state={isLoggedIn: false, username: null};
    // }

    this.state={isLoggedIn: false, username: null}
  }

  loginSuccess=(res) => {
      console.log('Login Success: ',res.profileObj);
      console.log('Token info: ',res.tokenObj);
      this.setState({isLoggedIn:true, username:res.profileObj.givenName, email: res.profileObj.email, token: res.tokenObj.id_token });
      refreshTokenSetup(res);
    }

  loginFailure=(res) => {
    console.log('Login Failed: ',res);
    alert("Login Failed");
  }

  logoutHandler=()=>{
    console.log('Logout success');
    this.setState({isLoggedIn:false,username:null});
  }

  render() 
  {
    if(this.state.isLoggedIn)
    {
      return(
        <Dashboard username={this.state.username} email={this.state.email} handler={this.logoutHandler} token={this.state.token}/>
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