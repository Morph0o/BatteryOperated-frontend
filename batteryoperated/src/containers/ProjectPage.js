import React from 'react'


class ProjectPage extends React.Component{
    

    render(){
        return(
            <div>
                <label className="form links">Search</label>
                <input type="text" onChange={this.props.searchmed}value={this.props.searchis}/>
                <ul>
                    
        {this.props.projects.map(project => <li key={`li_id${project.id}`}><img className="pic" alt="project pic" src={project.image}/><a className="links" href={`/projects/${project.id}`} >{project.name}/{project.desc.slice(0,93)}</a></li>)}
                </ul>
            </div>
        )
    }
}

export default ProjectPage