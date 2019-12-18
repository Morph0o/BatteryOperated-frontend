import React from 'react'
import {Form,Button } from 'semantic-ui-react'

class AddPart extends React.Component{
    constructor(){
        super()
        this.state ={
            parts: [],
            part:[]
        }
    }
    componentDidMount(){
       
        fetch('http://localhost:3000/parts')
        .then(resp => resp.json())
        .then(parts => this.setState({
            parts: parts
        }))
    }
    partsubmit=()=> {
        fetch('http://localhost:3000/project_parts', {
            method: "POST",
            headers: {
              "Content-Type":"application/json",
              "Accept":"application/json"
            },
            body: JSON.stringify({
              part_id: this.state.part,
              project_id: this.props.projId
            })
          }).then(resp => resp.json())
          .then(created => alert("PART ADDED"))
    }
    partchange = (event)=>{
        this.setState({
            part: event.target.value
        })
    }
    render(){
        return(
            <div><Form onSubmit={this.partsubmit}>
                <Form.Field>
                <select onChange={this.partchange}>
                    <option value={null}>PICK A PART:</option>
        {this.state.parts.map(part=><option key={`part${part.id}`} value={part.id}>{part.name}</option>)}
                </select>
                </Form.Field>
                <Button type="submit">ADD PART</Button>
                </Form>
            </div>
        )
    }
}

export default AddPart