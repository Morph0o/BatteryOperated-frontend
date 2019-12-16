import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import Home from './components/Home'
import Links from './components/Links'
import Profile from './components/Profile'
import Register from './components/Register'
import CreateParts from './components/CreateParts'
import Search from './components/Search'
import Login from './components/Login'
import CreateProject from './components/CreateProject'
import ProjectPage from './containers/ProjectPage'


class App extends React.Component{
  constructor(){
    super()
    this.state = {
      currentUser: "",
      projects: []
    }
  }
  componentDidMount(){
    if(localStorage.getItem("jwt")){
      fetch('http://localhost:3000/profile', {
        headers: {
          "Authorization" : localStorage.getItem('jwt')
        }
      })
      .then(res => res.json())
      .then(user => {
        this.updateUser(user)
      })
    }
    fetch('http://localhost:3000/projects')
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
      <a className="links" href="/search">Search</a>
      <a  className="links" href="/links">Links</a>
      <button className="links" onClick={this.logout}>LogOut</button>
    </div>
       <Router>
         <div>
    <Route  exact path="/" component={Home} />
    <Route exact path="/profile" render={() => {
            return this.state.currentUser ? <Profile user={this.state.currentUser}/> : <Redirect to="login"/>
          }} />
    <Route exact path="/login" render={() => {
            return this.state.currentUser ? <Redirect to="/profile"/> : <Login updateUser={this.updateUser}/>
          }} />
    <Route exact path="/createparts" render={() => {
            return localStorage.getItem("jwt") ? <CreateParts/> : <Redirect to="/login"/>
          }} />
    <Route exact path="/search" component={Search}/>
    <Route exact path="/links" component={Links}/>
    <Route exact path="/register" component={Register}/>
    <Route exact path="/createproject" render={()=>{return <CreateProject user={this.state.currentUser}/>}}/>
    <Route exact path="/projects"  render={()=>{return <ProjectPage projects={this.state.projects}/>}}/>
    
    </div>
  </Router>
    </div>
  );
}}

export default App;
