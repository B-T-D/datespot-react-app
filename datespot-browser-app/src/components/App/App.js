import userEvent from '@testing-library/user-event';
import React from 'react';

import { apiUrlRoot, axiosInstance } from '../../axiosUtil';


import { Nav } from '../Nav/Nav';
import { AuthModal } from '../Auth/MockAuthModal';
import { Candidates } from '../Candidates/Candidates';
import { Matches } from '../Matches/Matches';

import Container from 'react-bootstrap/Container';

const MAX_LATLON_COORD_DECIMAL_PLACES = 8;

// API URLs
const apiUrlCandidates = apiUrlRoot + 'candidates/'; // TODO add an API key such that only approved clients can call the API
const apiUrlUsers = apiUrlRoot + 'users/'
const apiUrlLogin = apiUrlUsers + 'login/';
const apiUrlSignup = apiUrlUsers + 'signup/';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: 'candidates',
            user: null, // Serves as simple mock auth token
            location: {
                latitude: 0,
                longitude: 0
            },
            candidate: null
        };

        // Method binds
        this.setCandidatesViewMode = this.setCandidatesViewMode.bind(this);
        this.setMatchesViewMode = this.setMatchesViewMode.bind(this);
        this.getCurrentLocation = this.getCurrentLocation.bind(this);
        this.setDisplayLocation = this.setDisplayLocation.bind(this);
        
        this.getNextCandidate = this.getNextCandidate.bind(this);
        this.postDecision = this.postDecision.bind(this);

        this.getLogin = this.getLogin.bind(this);
        this.postNewUser = this.postNewUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

    }

    // viewMode selector methods

    setCandidatesViewMode() {
        this.setState(
            {viewMode: 'candidates'}
        )
    }

    setMatchesViewMode() {
        this.setState(
            {viewMode: 'matches'}
        )
    }

    getCurrentLocation() { // TODO get it from the location API and update it in state
        if (navigator.geolocation) {
            return navigator.geolocation.getCurrentPosition(
                (positionObj) => {
                    this.setState(
                        {location: { // TODO if this is really the only way to fix the number of decimal places, then make a separate utility func
                            // TODO rework the logic, it rounds to 6 for a two-integer-digit lat, even if adding two to the MAX DECIMALS constant
                            latitude: Math.round(positionObj.coords.latitude * Math.pow(10, MAX_LATLON_COORD_DECIMAL_PLACES)) / Math.pow(10, MAX_LATLON_COORD_DECIMAL_PLACES),
                            longitude: Math.round(positionObj.coords.longitude * Math.pow(10, MAX_LATLON_COORD_DECIMAL_PLACES)) / Math.pow(10, MAX_LATLON_COORD_DECIMAL_PLACES)
                        }}
                    )
                    // TODO coords also has altitude attribute
                }
            );
            
        } else {
            alert("Geolocation not supported on this browser or protocol (HTTP vs HTTPS).")
        }
    }

    /**
     * Sets main displayed location to the user's "predominant location" if available.
     */

    setDisplayLocation() {
        if (this.state.user.predominant_location) {
            this.setState(
                {location: {
                    latitude: this.state.user.predominant_location[0],
                    longitude: this.state.user.predominant_location[1]
                }}
            )
        }
    }

    /*
    TODO see also Geolocation.watchPosition() to update automatically each time device's position 
    changes. https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
    */

    // API data CRUD methods

    getNextCandidate() {
        let queryUrl = apiUrlCandidates + `next/?userId=${this.state.user.id}`
        alert(`query url = ${queryUrl}`);
        axiosInstance
        .get(queryUrl)
        .then(response => {
            alert(`response.data = ${JSON.stringify(response.data)}`)
            this.setState({
                candidate: response.data
            });
        })
        .catch(error => {
            alert(`caught error ${JSON.stringify(error)}`);
            console.log(`getNextCandidate HTTP request caught an error: ${JSON.stringify(error)}`);
        })
    }

    setUser(userData) {
        localStorage.setItem('userId', userData['id'])
        this.setState({
            user: userData
        })
        alert(`state.user is now ${JSON.stringify(this.state.user)}`);
    }

    /**
     * Make a GET request to the API's mock user authentication endpoint
     * 
     * @param {userId}: String matching a user id hex string stored in the active mock database.
     */

    getLogin(userId) {
        var queryUrl = apiUrlLogin + `${userId}`;
        axiosInstance
        .get(queryUrl)
        .then(response => {
            this.handleLogin(response.data)
        })
    }

    handleLogin(userData) {
        const userId = userData.id;
        localStorage.setItem('userId', userId);
        this.setState({
            user: userData
        });
        this.setDisplayLocation();

    }

    /** Makes a POST request to the API to create a new user and sets the active user to that ID
     * 
     * @param {name}: String to use as the user's name.
     */

    postNewUser(name) {
        this.getCurrentLocation(); // User model requires a location
        const queryUrl = apiUrlSignup + `?name=${name}&latitude=${this.state.currentLocation.latitude}&longitude=${this.state.currentLocation.longitude}`
        alert(`postNewUser query url is ${queryUrl}`);
        axiosInstance
        .post(queryUrl)
        .then(response => {
            this.getLogin(response.data.id)
        })
    }

    postDecision(outcome) {
        const queryUrl = apiUrlCandidates + `decision/?userId=${this.state.user.id}&candidateId=${this.state.candidate.id}&outcome=${outcome}`
        alert(`queryUrl = ${queryUrl}`);
        axiosInstance
        .post(queryUrl)
        .then(response => {
            let matchCreated = response.data.match_created
            alert(`response data = ${response.data}`)
            if (matchCreated) {
                alert("It's a match!")
            }
            this.getNextCandidate();
        })
    }

    mockAuthModal = () => {
        return (
            <AuthModal
                onSubmitLogin={this.getLogin}
                onCreateNewUser={this.postNewUser}
            />
        )
    }

    mainApp = () => {
        return (
                <div>
                    {this.state.viewMode === 'candidates' ?
                        <Candidates
                            candidate={this.state.candidate}
                            onGetNextCandidate={this.getNextCandidate}
                            onDecision={this.postDecision}
                        />
                        :
                        <Matches
                        />    
                    }
                </div>
        )
    }

    render() {
        return (
            <Container fluid>
                <div>
                    <Nav
                        onSetCandidatesViewMode={this.setCandidatesViewMode}
                        onSetMatchesViewMode={this.setMatchesViewMode}
                        onRefreshLocation={this.getCurrentLocation}
                        location={this.state.location}
                        user={this.state.user}
                    />
                </div>
                <div>
                    {this.state.user ?
                        <this.mainApp />
                        :
                        <this.mockAuthModal />
                    }
                </div>
                
            </Container>
        )
    }

}

export default App;