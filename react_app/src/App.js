import React, {Component} from 'react';
import './App2.css';
import Header from "./Components/Header/Header"
import Footer from "./Components/Footer/Footer";
import Accueil from "./Components/Accueil"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import TwoOptions from "./Components/TwoOptions";
import Liste from "./Components/Liste";
import Presentation from "./Components/Presentation";
import Contact from "./Components/Contact/Contact";
import GridTwo from "./Components/GridTwo";
import Projet from "./Components/Projet";
import ScrollToTop from "./Components/ScrollToTop";
import Recherche from "./Components/Recherche";

class App extends Component {
    constructor() {
        super();
      this.state = {token: [], tokenLoaded: false};
    };

    render() {
        return (
            <div className="App">

                <Router>
                    <ScrollToTop>
                        <header>
                          <Header/>
                        </header>
                        <Switch>
                            <Route exact path="/">
                                <Accueil token={this.state.token}/>
                            </Route>
                            <Route path="/about">
                                <h1 className={"titreSection"}> Présentation des pôles </h1>
                                <GridTwo token={this.state.token}/>
                            </Route>
                            <Route path="/outils">
                                <h1 className={"titreSection"}>Outils numériques et prestations offertes par
                                    l'université</h1>
                              <Liste token={this.state.token} type={'categorie_outils'}/>
                            </Route>
                          <Route path="/presentation">
                            <Presentation/>
                          </Route>
                          <Route path="/categorie">
                            <Liste token={this.state.token} type={'outils'}/>
                          </Route>
                            <Route path="/missions">
                                <h1 className={"titreSection"}> Nos missions</h1>
                            </Route>
                            <Route path="/outilsMissions">
                                <TwoOptions/>
                            </Route>
                            <Route path="/contact">
                                <h1 className={"titreSection"}>Contactez-nous !</h1>
                                <Contact/>
                            </Route>
                            <Route path="/projets">
                                <h1 className={"titreSection"}>Nos projets</h1>
                              <Projet token={this.state.token}/>
                            </Route>
                          <Route path="/news">
                            <Liste token={this.state.token} type={"articles"}/>
                          </Route>
                          <Route path="/recherche">
                            <Recherche/>
                            </Route>
                        </Switch>
                        <Footer/>
                    </ScrollToTop>
                </Router>

            </div>
        );
    }

  /*componentDidMount() {
      if (this.state.token == null) {

      }
      fetch('http://localhost:8900/dsin/web/oauth/token', {
          method: 'POST',
          headers: {
              'Response-Type': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: qs.stringify({
              grant_type: 'password',
              client_id: 'fd9bc24f-9134-491c-a0d5-4700ad76e021',
              client_secret: 'abc123',
              username: 'test',
              password: 'test',
          })
      }).then((response) => response.json()).then((responseData) =>
          this.setState({token: responseData, tokenLoaded: true},
          ))
      fetch('http://localhost:8900/dsin/web/jsonapi/node/conseils', {
          method: 'GET',
          headers: {
              'Autohrization': 'Beaver' + this.state.token.access_token,
            'Accept': 'application/vnd.api+json',
          },
      }).then((response) => response.json()).then((data) => this.setState({articles: data.data,}
      ))
  }
*/


}

export default App;
