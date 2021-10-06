import "./App.css";
import Navbar from "./components/Navbar";
import NewsComponent from "./components/NewsComponent";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

import React, { Component } from "react";

export class App extends Component {
  state = {
    progress: 0,
  }

  setProgress = (progress)=>{
    this.setState({progress: progress})
  }
  
  render() {
    // let chooseCat = (msg)=>{
    //   this.setState({
    //     category: `${msg}`,
    //   })
    // }

   
    return (
      <Router>
        <div>
          <Navbar/>
          <LoadingBar
          color='#f11946'
          progress={this.state.progress}
          />
          <Switch>
            <Route  key="business" exact path="/business">
              <NewsComponent category="business" progress = {this.setProgress}/>
            </Route>
            <Route  key="entertainment" exact path="/entertainment" >
              <NewsComponent category="entertainment" progress = {this.setProgress}/>
            </Route>
            <Route  key="general" exact path="/">
              <NewsComponent category="general" progress = {this.setProgress} />
            </Route>
            <Route  key="health" exact path="/health">
              <NewsComponent category="health" progress = {this.setProgress} />
            </Route>
            <Route  key="science" exact path="/science">
              <NewsComponent category="science" progress = {this.setProgress}/>
            </Route>
            <Route  key="sports" exact path="/sports">
              <NewsComponent category="sports" progress = {this.setProgress}/>
            </Route>
            <Route  key="technology" exact path="/technology">
              <NewsComponent category="technology" progress = {this.setProgress}/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
