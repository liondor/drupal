import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import logo from '../Logo.png';
import ResponsiveMenu from "react-responsive-navbar";
import {MdMenu} from 'react-icons/md'

export default class Header extends React.Component {

    render() {
        return (
            <Router>
                <div className={"header"}>
                    <div className={"logo_container"}>
                        <Link to="/"><img className={"logo"} src={logo}/></Link>
                    </div>
                    <div className={"searchbar_container"}>
                        <input type={"text"} placeholder={"Rechercher..."}/>
                        <input type={"submit"}/>
                    </div>
                    <div className={"menu_disposition"}>
                        <ResponsiveMenu largeMenuClassName={""} smallMenuClassName={""} menu={<div className={"grid"}>
                            <div className={"golden_text menu"}>
                                <Link className={"golden_text menu"} to="/Outils">
                                    Outils numériques & nos missions
                                </Link>
                            </div>
                            <div>
                                <Link className={"golden_text menu"} to="/about">Qui sommes-nous</Link>
                            </div>
                            <div>
                                <Link className={"golden_text menu"} to="/projets">Nos projets</Link>
                            </div>
                        </div>} changeMenuOn={"768px"} menuOpenButton={<MdMenu/>} menuCloseButton={<MdMenu/>}/>
                    </div>
                </div>
                <hr/>

                {/*
              A <Switch> looks through all its children <Route>
              elements and renders the first one whose path
              matches the current URL. Use a <Switch> any time
              you have multiple routes, but you want only one
              of them to render at a time
            */}
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route path="/about">
                        <About/>
                    </Route>
                    <Route path="/outils">
                        <Outils/>
                    </Route>
                    <Route path="/projets">
                        <Projets/>
                    </Route>
                </Switch>

            </Router>

        );
        // You can think of these components as "pages"
// in your app.

        function Home() {
            return (
                <div>
                    <h2>Home</h2>
                </div>
            );
        }

        function About() {
            return (
                <div>
                    <h2>About</h2>
                </div>
            );
        }

        function Outils() {
            return (
                <div>
                    <h2>Outils numériques & nos missions</h2>
                </div>
            );
        }

        function Projets() {
            return (
                <div>
                    <h2>Nos projets</h2>
                </div>
            );
        }

    }

}