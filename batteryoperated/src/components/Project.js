import React from 'react'

class Project extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            project: this.props.project,
            projparts: [],
            parts:[]
        }
    }
    componentDidMount() {
       let id = this.props.match.params.id
       console.log(id)
        fetch(`http://localhost:3000/projects/${id}`)
        .then(resp => resp.json())
        .then(project => {
            console.log(project)
            this.setState({
                project: this.props.renderproject(project)
            })
        })
        // fetch('http://localhost:3000/project_parts')
        // .then(resp => resp.json())
        // .then(projparts => this.setState({
        //     projparts: projparts
        // }))
        // fetch('http://localhost:3000/parts')
        // .then(resp => resp.json())
        // .then(parts => this.setState({
        //     parts: parts
        // }))
    }

    click = () => {
        this.props.history.push({
            pathname: '/addparts',
            state: {project: this.state.project.id }
          })
    }

    render(){
        // let parts = this.state.projparts.filter(part => part.project_id === this.state.project.id)
        // let projectparts = parts.filter(parts => parts.id ===parts.forEach(part=>part))
        return(
             this.state.project ? (
            <div>
                <br/>
                <br/>
                <br/>
                <img className="profilepic" alt="profile pic" src={this.state.project.image}/>
                <h3>{this.state.project.name}</h3>
                <p>{this.state.project.desc}</p>
                {this.state.project.user_id === this.props.user.id?<div className="links right" onClick={this.click}>ADD PARTS</div>: null}
                
               <h3>PARTS USED</h3>

             {this.state.project.parts ?this.state.project.parts.map(part =><img className="pic"alt="part" src={part.image} />):null}
        
             </div> ) : null
        )
    }
}

export default Project