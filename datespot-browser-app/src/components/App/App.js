import userEvent from '@testing-library/user-event';
import React from 'react';

import { apiUrlRoot, axiosInstance } from '../../axiosUtil';


import { Nav } from '../Nav/Nav';
import { Candidates } from '../Candidates/Candidates';
import { Matches } from '../Matches/Matches';

import Container from 'react-bootstrap/Container';

const MAX_LATLON_COORD_DECIMAL_PLACES = 8;

const apiUrlCandidates = apiUrlRoot + 'candidates/';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: 'candidates',
            user: '',
            currentLocation: [0.0, 0.0],
            candidate: "no candidate"
        };

        // Method binds
        this.setCandidatesViewMode = this.setCandidatesViewMode.bind(this);
        this.setMatchesViewMode = this.setMatchesViewMode.bind(this);
        this.setCurrentLocation = this.setCurrentLocation.bind(this);
        
        this.getNextCandidate = this.getNextCandidate.bind(this);

        //  TODO placeholder
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

    setCurrentLocation() { // TODO get it from the location API and update it in state
        if (navigator.geolocation) {
            return navigator.geolocation.getCurrentPosition(
                (positionObj) => {
                    this.setState(
                        {currentLocation: [ // TODO if this is really the only way to fix the number of decimal places, then make a separate utility func
                            // TODO rework the logic, it rounds to 6 for a two-integer-digit lat, even if adding two to the MAX DECIMALS constant
                            Math.round(positionObj.coords.latitude * Math.pow(10, MAX_LATLON_COORD_DECIMAL_PLACES)) / Math.pow(10, MAX_LATLON_COORD_DECIMAL_PLACES),
                            Math.round(positionObj.coords.longitude * Math.pow(10, MAX_LATLON_COORD_DECIMAL_PLACES)) / Math.pow(10, MAX_LATLON_COORD_DECIMAL_PLACES)
                        ]}
                    )
                    // TODO coords also has altitude attribute
                }
            );
            
        } else {
            alert("Geolocation not supported on this browser or protocol (HTTP vs HTTPS).")
        }
    }

    /*
    TODO see also Geolocation.watchPosition() to update automatically each time device's position 
    changes. https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
    */

    // API data CRUD methods

    getNextCandidate() {
        alert(`getNextCandidate() called.\napiUrlCandidates = ${apiUrlCandidates}`)
        axiosInstance
        .get(apiUrlCandidates)
        .then(response => {
            alert(`response.data = ${JSON.stringify(response.data)}`)
            this.setState({
                candidate: response.data
            });
        })
        .catch(error => {
            alert(`caught error`);
            console.log(`getNextCandidate HTTP request caught an error: ${JSON.stringify(error)}`);
        })
    }

    render() {
        return (
            <Container fluid>
                <div>
                <Nav
                    onSetCandidatesViewMode={this.setCandidatesViewMode}
                    onSetMatchesViewMode={this.setMatchesViewMode}
                    onRefreshLocation={this.setCurrentLocation}
                    currentLocation={this.state.currentLocation}
                />
                </div>
                <div>
                    {this.state.viewMode === 'candidates' ?
                        <Candidates
                            candidate={this.state.candidate}
                            onGetNextCandidate={this.getNextCandidate}
                        />
                        :
                        <Matches
                        />    
                }

                </div>
            </Container>
        )
    }

}

export default App;