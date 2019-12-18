import React from 'react'

class Profile extends React.Component{
    

    render(){
        let projects = this.props.projects.filter(projects=> projects.user_id = this.props.user.id )
        return(
            <div>
                {console.log(this.props.user)}
                <div>
                <br/>
                <br/>
                <br/>
                <img  alt="profile pic" src={this.props.user.image}/>
                <h3>{this.props.user.name}</h3>
                <p>{this.props.user.desc}</p>
                </div>
                <div>
                <a className="right links" href="/createproject">New Project</a>
                <a className="right links" href="/createparts">Create Part</a>
                </div>
                <div>
                    <ul>
                        {projects.map(project => <li><img className="pic" alt="project pic" src={project.image}/><a className="links" href={`/projects/${project.id}`} >{project.name}/{project.desc.slice(0,30)}</a></li>)}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Profile