import React from 'react'
import {Form,Button } from 'semantic-ui-react'
class Register extends React.Component{
    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            desc: "",
            profilepic: ""
        }
    }

    username=(event)=> {
        this.setState({
            username: event.target.value
        })
    }
    password=(event)=> {
        this.setState({
            password: event.target.value
        })
    }
desc = (event)=> {
    this.setState({
        desc: event.target.value
    })
}
profilepic = (event) => {
    this.setState({
        profilepic: event.target.value
    })
}
registersubmit=(e)=>{
    console.log('we hit the submit callback')
    e.preventDefault()
    fetch('https://batteryoperated-backend.herokuapp.com/users', {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
          "Accept":"application/json"
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
          desc: this.state.desc,
          profilepic: this.state.profilepic
        })
}).then(resp => resp.json())
.then( created => alert("REGISTERED!!!!"))

}
    render(){
        return(<div>
            <div className="center pad">
                <br/>
                <br/>
                <br/>
                <br/>
                      <Form onSubmit={this.registersubmit}>
    <Form.Field >
      <label className="white" >Username:</label>
      <input placeholder='Username' onChange={this.username} value={this.state.username}/>
    </Form.Field>
    <br/>
    <Form.Field>
      <label className="links">Password:</label>
      <input placeholder='Password' onChange={this.password} value={this.state.password}/>
    </Form.Field>
    <br/>
    <Form.Field>
      <label className="links">Desc:</label>
      <textarea placeholder='Desc' onChange={this.desc} value={this.state.desc}/>
    </Form.Field>
    <br/>
    <Form.Field>
      <label className="links">Profile Pic:</label>
      <input placeholder='Profile Pic' onChange={this.profilepic} value={this.state.profilepic}/>
    </Form.Field>
    <br/>
    <Button className="center" type='submit'>Submit</Button>
  </Form>
  <h3>USE A IMAGE URL FROM A PIC ALREADY ON WEB</h3>
  <img className="profilepic" alt="profile pic" src={this.state.profilepic}/>
            </div>
            
            </div>
        )
    }
}

export default Register