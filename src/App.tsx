import React, { useState } from "react"
import "./App.css"
import RegisterComponent from "./account/RegisterComponent"
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom"
import LoginComponent from "./account/LoginComponent"
import NoMatch from "./userInterface/nomatch"
import HomePage from "./userInterface/HomePageComponent"
import EmployeerComponent from "./users/EmployeerComponent"
import EmployeeComponent from "./users/EmployeeComponent"
import Header from "./commonComponents/Header"
import Footer from "./commonComponents/Footer"
import JobPost from "./jobs/JobPost"
import JobList from "./jobs/JobList"
import ProposalComponent from "./proposals/Proposal"
import JobDetails from "./jobs/JobDetails"
import ProfilePageComponent from "./users/ProfilePage"

function App() {
  const [jwt,setJwt]=useState<string>((localStorage.getItem("jwt")) as string)
  const id=localStorage.getItem("userId")
  const loginData=JSON.parse(localStorage.getItem("loginData")!);
  const role= localStorage.getItem("role");
  console.log(id);
    return (
    <div className="App" >
      <Router>
      <header className="App-header">
        <Route render={props=><Header {...props} jwt={jwt} changeJwt={(jwt:any)=>{setJwt(jwt)}}/>}/>
       </header>
      <section style={{minHeight:'84vh'}}>
      <Switch>
             {
             }
            <Route exact path="/">
                {               
                jwt ? <Redirect to="/home"/> : <Redirect to="login"/>
                }
            </Route>
            <Route path="/login" render={props=><LoginComponent {...props} loginData={loginData} changeJwt={(jwt:any)=>{setJwt(jwt)}}/>}/>
            <Route component={RegisterComponent} path="/register" />
            <Route path="/home" render={props => <HomePage {...props} jwt={jwt} id={id} />} />
            <Route path="/employee/:id" render={props => <EmployeeComponent {...props} jwt={jwt} id={id} />} />
            <Route path="/profile" render={props => <ProfilePageComponent {...props} jwt={jwt} id={id} />} />

            <Route path="/employeer" render={props => <EmployeerComponent {...props} jwt={jwt} id={id}/>} />
            <Route path="/jobPost" render={props => <JobPost {...props} jwt={jwt} id={id} />} />
            <Route path="/jobList" render={props => <JobList {...props} jwt={jwt} id={id} />} />
            <Route path="/job/details/:id" render={props => <JobDetails {...props} jwt={jwt} id={id} />} />
            <Route path="/proposal/:id" render={props => <ProposalComponent {...props} jwt={jwt} id={id} />} />
            <Route component={NoMatch} />
      </Switch> 
      </section>
      <footer>
      <Route component={Footer}/>
      </footer>
        </Router> 
    </div>
  )
}

export default App
