import React from 'react'


class Profile extends React.Component{
    

    render(){
        let projects = this.props.projects.filter(project=> project.user_id === this.props.user.id )
        console.log(this.props.user.id)
        projects.map(project => console.log(project.user_id))

        return(
            <div className="padding">
                <div>
                <br/>
                <br/>
                <br/>
                <img className="profilepic border"  alt="profile pic" src={this.props.user.image}/>
                <h3>{this.props.user.name}</h3>
                <p>{this.props.user.desc}</p>
                </div>
                <div>
                <a className="right links" href="/createproject">New Project</a>
                <a className="right links" href="/createparts">Create Part</a>
                </div>
                <div>
                    <ul>
                        {projects.map(project => <li><img className="pic" alt="project pic" src={project.image}/><a className="links" href={`/projects/${project.id}`} >{project.name}/{project.desc.slice(0,93)}</a></li>)}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Profile