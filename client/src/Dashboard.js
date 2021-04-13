import React, { Component } from 'react';
import {Fragment} from 'react';
import axios from 'axios'

class Dashboard extends Component {
//   state = {
//     addFunds:0,
//     isBalanceLoaded:false,
//     balance:null
//   };

  constructor(props)
  {
      super(props);
      this.state={
        addFunds:0,
        isBalanceLoaded:false,
        balance:null,
        name:this.props.username,
        email:this.props.email
      }
  }

  addFunds()
  {
    //var oldFunds=this.state.addFunds;
    //alert("Funds added: "+ this.state.addFunds);
    axios.get('/addFunds',{params:{amount : this.state.addFunds}}).then((res) => {
      this.setState({addFunds : 0, balance: res.data.balance});
    });
  }
  
  componentDidMount() {
    axios.get('/getBalance',{params:{email : this.state.email}}).then((res) => {
      const response = res.data;
      //console.log("test "+response);
      this.setState({balance : response.balance, isBalanceLoaded : true});
    });
  }

  render() {
      if (!this.state.isBalanceLoaded)
      {
        return(<h1>Loading...</h1>);
      }
      
      return(
        <Fragment>
        <header className="w3-container w3-theme w3-padding" id="myHeader">
        <button className="w3-button w3-theme w3-display-topright"> Logout</button>
        <div className="w3-center">
        <h1 className="w3-xxxlarge w3-animate-bottom">Welcome, {this.state.username}</h1>
        </div>
        </header>
        <br />
        <div className="w3-center w3-display-top">
        <h1 className="w3-xxlarge">Your current account balance is {this.state.balance}</h1>
        </div>
        
        <div className="w3-center w3-display-middle">
        <form class="w3-container w3-card-4">
        <h2>Add Funds</h2>
        <div class="w3-section">      
          <input class="w3-input" type="text" onChange={(e)=>this.setState({addFunds : e.target.value})}/>
        </div>
        <button className="w3-button w3-theme" onClick={()=>this.addFunds()}>Add</button>
        </form>
        </div>
        

        <br /><br />
        </Fragment>
      )
    
  }  
}

export default Dashboard;