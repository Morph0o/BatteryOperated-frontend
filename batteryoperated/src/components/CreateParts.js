import React from 'react'
import {Form,Button } from 'semantic-ui-react' 

class CreateParts extends React.Component{
    constructor(){
        super()
        this.state = {
            partname:"",
            partdesc: "",
            partimage:""
        }
    }
    partsubmit=(event)=> {
        event.preventDefault()
        fetch('http://localhost:3000/parts', {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body: JSON.stringify({
        name: this.state.partname,
        desc: this.state.partdesc,
        image: this.state.partimage
      })
    }).then(resp => resp.json())
    .then(created => alert("PART MADE"))
    }
    partname = (event)=> {
        this.setState({
            partname: event.target.value
        })
    }
    partdesc =(event)=>{
        this.setState({
            partdesc: event.target.value
        })
    }
    partimage=(event)=>{
        this.setState({
            partimage: event.target.value
        })
    }

    render(){
        return(
            <div >
                <br/>
                <br/>
                <br/>
                <br/>
                <div className="form padding">
                <Form onSubmit={this.partsubmit}>
    <Form.Field >
      <label className="input">PartName:   </label>
      <input placeholder='PartName' onChange={this.partname} value={this.state.partname}/>
    </Form.Field>
    <br/>
    <Form.Field>
      <label className="input">Description:   </label>
      <textarea placeholder='PartDesc' onChange={this.partdesc} value={this.state.partdesc}/>
    </Form.Field>
    <br/>
    <Form.Field>
      <label className="input">PartPic:     </label>
      <input placeholder='picture' onChange={this.partimage} value={this.state.partimage}/>
    </Form.Field> 
    <br/>
    <Button className="center" type='submit'>Submit</Button>
  </Form>
  </div>
  <p>Add a IMAGE url address of a pic already on the web.</p>
  <img alt="part pic" src={this.state.partimage}/>
            </div>
        )
    }
}

export default CreateParts