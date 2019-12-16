import React from 'react'


class ProjectPage extends React.Component{

    render(){
        return(
            <div>
                <ul>
        {this.props.projects.forEach(project => <li><a  href="/profile" >{project.name}</a></li>)}
                </ul>
            </div>
        )
    }
}

export default ProjectPage