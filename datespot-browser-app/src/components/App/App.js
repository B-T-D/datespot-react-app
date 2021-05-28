import userEvent from '@testing-library/user-event';
import React from 'react';

import { Nav } from '../Nav/Nav';
import { Candidates } from '../Candidates/Candidates';
import { Matches } from '../Matches/Matches';

import Container from 'react-bootstrap/Container';

const MAX_LATLON_COORD_DECIMAL_PLACES = 8;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: 'candidates',
            user: '',
            currentLocation: [0.0, 0.0]
        };

        // Method binds
        this.setCandidatesViewMode = this.setCandidatesViewMode.bind(this);
        this.setMatchesViewMode = this.setMatchesViewMode.bind(this);
        this.setCurrentLocation = this.setCurrentLocation.bind(this);
        // this.refreshLocation = this.refreshLocation.bind(this);

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

    // setCurrentLocation() {
    //     this.setState(
    //         {currentLocation: this.refreshLocation()}
    //     )
    //     console.log(`in set current location: state is now ${JSON.stringify(this.state)}`)
    // }

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