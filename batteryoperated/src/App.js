import React from 'react';
import { Route, Redirect, Switch} from 'react-router-dom';
import './App.css';
import Home from './components/Home'
import Links from './components/Links'
import Profile from './components/Profile'
import Register from './components/Register'
import CreateParts from './components/CreateParts'
import Login from './components/Login'
import CreateProject from './components/CreateProject'
import ProjectPage from './containers/ProjectPage'
import Project from './components/Project'
import AddPart from './components/AddPart'
import AddPicture from './components/AddPicture'

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      currentUser: "",
      projects: [],
      project: [],
      search: ""
    }
  }
  componentDidMount(){
    if(localStorage.getItem("jwt")){
      fetch('https://batteryoperated-backend.herokuapp.com/profile', {
        headers: {
          "Authorization" : localStorage.getItem('jwt')
        }
      })
      .then(res => res.json())
      .then(user => {
        this.updateUser(user)
      })
    }
    fetch('https://batteryoperated-backend.herokuapp.com/projects')
    .then(resp => resp.json())
    .then(projects => this.setState({
      projects: projects
    }))
  }
  updateUser = (user) => {
    this.setState({currentUser: user})
  }
  logout= ()=>{
    localStorage.removeItem("jwt")
    this.setState({
      currentUser: ""
    })
    alert("LOGGED OUT")
  }
  search = (event) => {
   
    this.setState({
      search: event.target.value.toLowerCase()
    })
  }
  project=(project)=>{
    this.setState({
      project: project
    },()=>{console.log(this.state.project)})
    return this.state.project
  }
  refreshDelete = (id) => {
let proj = this.state.projects.filter(project => project.id != id)
    console.log(proj)
    this.setState({
      projects: proj
    })
  }
  
  render(){
  return (
    <div >
    <div> 
      <a className="links" href="/">Home</a>
      <a className="links" href="/login">Login</a>
      <a className="links" href="/register">Register</a>
      <a className="links" href="/projects">Projects</a>
      <a className="links" href="/profile">Profile</a>
      <a  className="links" href="/links">Links</a>
      <button className="links" onClick={this.logout}>LogOut</button>
     
    </div>
       <Switch>
        
    <Route  exact path="/" component={Home} />
    <Route exact path="/profile" render={() => {
            return this.state.currentUser ? <Profile user={this.state.currentUser} projects={this.state.projects}/> : <Redirect to="login"/>
          }} />
    <Route exact path="/login" render={() => {
            return this.state.currentUser ? <Redirect to="/profile"/> : <Login updateUser={this.updateUser}/>
          }} />
    <Route exact path="/createparts" render={() => {
            return localStorage.getItem("jwt") ? <CreateParts/> : <Redirect to="/login"/>
          }} />
    <Route exact path="/links" component={Links}/>
    <Route exact path="/register" component={Register}/>
    <Route exact path="/createproject" render={(props)=>{return <CreateProject {...props}user={this.state.currentUser} />}}/>
    <Route exact path="/projects/:id" render={(props)=>{return <Project {...props} refresh={this.refreshDelete} user={this.state.currentUser}project={this.state.project} renderproject={this.project}/>}}/>
    <Route exact path="/projects"  render={()=>{return <ProjectPage projects={this.state.search === "" ? this.state.projects: this.state.projects.filter(project => project.name.toLowerCase().includes(this.state.search))} searchhis={this.state.search} searchmed={this.search}/>} }/>
    <Route exact path="/addparts" render={(props)=>{
     let projId= props.location.state.project
      return <AddPart projId={projId}/>}}/> 
      <Route exact path="/addpicture"render={(props)=>{
        let projectId = props.location.state.project
        return <AddPicture projId={projectId}/>}}/>
      }}   
    
  </Switch>
    </div>
  );
}}

export default App;
