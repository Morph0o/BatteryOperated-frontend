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
        fetch(`http://localhost:3000/projects/${id}`)
        .then(resp => resp.json())
        .then(project => {
            console.log(project.id)
            this.setState({
                project: this.props.renderproject(project)
            })
        })
    }
    destroy = () => {
        let id = this.props.match.params.id
        fetch(`http://localhost:3000/projects/${id}`,
        {method: 'delete'})
        .then(resp => resp.json())
        .then(project => {
            alert("DELETED!!!!!!!")
            this.props.refresh(id)
            this.props.history.push({
            pathname: '/profile'
            })
            
        })
    }

    click = () => {
        this.props.history.push({
            pathname: '/addparts',
            state: {project: this.state.project.id }
          })
    }
    picture = ()=>{
        this.props.history.push({
            pathname: '/addpicture',
            state: {project: this.state.project.id }
          })
    }

    render(){
        return(
             this.state.project ? (
            <div className="padding">
                <br/>
                <br/>
                <br/>
                <img className="profilepic" alt="project pic" src={this.state.project.image}/>
                <h3>{this.state.project.name}</h3>
                <p>{this.state.project.desc}</p>
                {this.state.project.user_id === this.props.user.id?<div className="links right" onClick={this.picture}>ADD PICTURE</div>: null}
                {this.state.project.user_id === this.props.user.id?<div className="links right" onClick={this.click}>ADD PARTS</div>: null}
                {this.state.project.user_id === this.props.user.id?<div className="links right" onClick={this.destroy}>DELETE PROJECT</div>: null}
                
               <h3>PARTS USED</h3>
                
             {this.state.project.parts ?this.state.project.parts.map(part =><div className="part padding"><img  className="pic"alt="part" src={part.image} /><h3>{part.name}</h3></div>):null}
            <h3>Pictures</h3>
            {this.state.project.images?this.state.project.images.map(image => <img alt="project" src={image.source}/>):null}
             </div> ) : null
        )
    }
}

export default Project