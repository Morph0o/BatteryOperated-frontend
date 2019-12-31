import React from 'react'
import {Form,Button } from 'semantic-ui-react'

class AddPicture extends React.Component{
    constructor(){
        super()
        this.state = {
            image: ""
        }
    }
    image = (event)=> {
        this.setState({
            image: event.target.value
        })
    }
    picturesubmit =()=>{
        fetch('http://localhost:3000/images', {
            method: "POST",
            headers: {
              "Content-Type":"application/json",
              "Accept":"application/json"
            },
            body: JSON.stringify({
              source: this.state.image,
              project_id: this.props.projId
            })
          }).then(resp => resp.json())
          .then(created => alert("ADDED PICTURE!!!"))
    }

    render(){
        return(
            <div className="center">
            <div>
                <br/>
                <br/>
                <br/>
                <Form onSubmit={this.picturesubmit}>
    <Form.Field>
      <label className="input">ProjPic:</label>
      <input placeholder='picture' onChange={this.image} value={this.state.image}/>
    </Form.Field> 
    <br/>
    <Button className="center" type='submit'>Submit</Button>
  </Form>
            </div>
            <img alt="project" src={this.state.image} />
            <h3>ADD URL ADDRESS OF IMAGE ALREADY ON WEB</h3>
            </div>
        )
    }
}

export default AddPicture