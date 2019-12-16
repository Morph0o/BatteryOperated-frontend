import React from 'react'

class Profile extends React.Component{

    render(){
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

            </div>
        )
    }
}

export default Profile