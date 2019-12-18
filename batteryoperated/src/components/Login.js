import React from 'react'
import {Form,Button } from 'semantic-ui-react'

class Login extends React.Component{
    constructor(){
        super()
        this.state = 
        {username: "",
    password:""}
    }

    username = (e)=>{
        this.setState({
            username: e.target.value
        })
    }
    password = (e) => {
        this.setState({
            password: e.target.value
        
        })
    }
    loginsubmit = () => {
        fetch('http://localhost:3000/login', {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body: JSON.stringify({
        name: this.state.username,
        password: this.state.password
      })
    }).then(res => res.json())
    .then(data => {
      if(!data.authenticated){
        alert("Incorrect credentials")
      }else{
        //save token in local storage
        localStorage.setItem("jwt", data.token)
        this.props.updateUser(data.user) //udate state with currentUser = data.user
      }
    })
    }

    render(){
        return(
    

            <div className="center form">
               
                <h2 className="links">LOGIN</h2>
                <Form onSubmit={this.loginsubmit}>
    <Form.Field >
      <label className="input">Username:</label>
      <input placeholder='Username' onChange={this.username} value={this.state.username}/>
    </Form.Field>
    <Form.Field>
      <label className="input">Password:</label>
      <input placeholder='Password' onChange={this.password} value={this.state.password}/>
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
            </div>
        )
    }
}

export default Login