import React, { Component } from 'react';
import './App.css';
import DestinationList from "./Components/Destination/DestinationList";
const LIST_URL = 'http://localhost:8900/dsin/web/jsonapi/node/destination';
var token= '';
class App extends Component {
 constructor() {
    super();
    this.state = { data: null };
    this.loadDestinations = this.loadDestinations.bind(this);
    this.updateData = this.updateData.bind(this);
  }
  render() {
    return (
      <div className="App">
        <DestinationList
          data={this.state.data}
        />

	<br/>
      {token}
      </div>
    );
  }
 loadDestinations() {
    // Fetch Destinations.
    fetch(LIST_URL, {mode:'cors'})
      .then(function (response) {
        return response.json();
      })
      .then((data) => this.updateData(data))
      .catch(err => console.log('Fetching Destinations Failed', err));
  } updateData(responseData) {
   this.setState({data: responseData.data});
 }componentWillMount() {
   this.loadDestinations();
 }

componentDidMount()
{
fetch('http://localhost:80/dsin/web/oauth/token', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    grant_type: 'password',
    client_id: 'fd9bc24f-9134-491c-a0d5-4700ad76e021',
    client_secret: 'jojojojo',
    username:'',
    password:'',
  })
}).then(function (response) {
	token =response;
})


}

}

export default App;
