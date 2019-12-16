import React from 'react'
import {Form,Button } from 'semantic-ui-react' 

class CreateProject extends React.Component{
constructor(){
    super()
    this.state = {
        name: "",
        desc: "",
        image: ""
    }
}
name = (event)=> {
    this.setState({
        name: event.target.value
    })
}
desc = (event)=> {
    this.setState({
        desc: event.target.value
    }) 
}
image= (event) => {
    this.setState({
        image: event.target.value
    })
}
projsubmit = (event)=> {
    event.preventDefault()
        fetch('http://localhost:3000/projects', {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        desc: this.state.desc,
        image: this.state.image,
        user_id: this.props.user.id
      })
    }).then(resp => resp.json())
    .then(created => alert("PROJECT MADE"))
}

    render(){
        return(
            <div>
                <div className="form">
                
                <h1 className="input">Create Project</h1>
                <Form onSubmit={this.projsubmit}>
    <Form.Field >
      <label className="input">Name:   </label>
      <input placeholder='will be used for searches' onChange={this.name} value={this.state.name}/>
    </Form.Field>
    <br/>
    <Form.Field>
      <label className="input">Description:   </label>
      <textarea placeholder='Desc' onChange={this.desc} value={this.state.desc}/>
    </Form.Field>
    <br/>
    <Form.Field>
      <label className="input">ProjPic:     </label>
      <input placeholder='picture' onChange={this.image} value={this.state.image}/>
    </Form.Field> 
    <br/>
    <Button className="center" type='submit'>Submit</Button>
  </Form>
  </div>
  <img alt="Project pic" src={this.state.image}/>
  </div>
        )
    }
}

export default CreateProject