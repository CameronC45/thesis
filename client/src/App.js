import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import Navbar from './components/Navbar/Navbar';
import Adverts from './components/Root/Adverts/Adverts';
import Advert from './components/Root/Adverts/Advert';
import Profile from './components/Root/Profile';
import AddAdvert from './components/Root/Adverts/AddAdvert/AddAdvert';
import AddImage from './components/Root/Adverts/AddAdvert/AddImage';
import User from './components/Root/User';
import Search from './components/Root/Search/Search';

var profilePath="/profile/"
var addAdvert="/create/"
var addImage="/image/:id"
var advert="/advert/:id"
var user="/user/:id"
var search ="/search/:title"





class App extends Component {


    render() {
        return (
            <Router>
                <Navbar/>
                <Switch>
               <Route exact path="/" component={Adverts} />
               <Route path={profilePath} component={Profile}/>
               <Route path={addAdvert} component={AddAdvert}/>
               <Route path={addImage} component={AddImage}/>
               <Route path={advert} component={Advert}/>
               <Route path={user} component={User}/>
               <Route path={search} component={Search}/>
               </Switch>
            </Router>
        );
    }
}

export default App;