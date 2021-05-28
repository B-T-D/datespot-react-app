import userEvent from '@testing-library/user-event';
import React from 'react';

import { Nav } from '../Nav/Nav';
import { Candidates } from '../Candidates/Candidates';
import { Matches } from '../Matches/Matches';

import Container from 'react-bootstrap/Container';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: 'candidates',
            user: ''
        };

        // Method binds
        this.setCandidatesViewMode = this.setCandidatesViewMode.bind(this);
        this.setMatchesViewMode = this.setMatchesViewMode.bind(this);

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

    render() {
        return (
            <Container fluid>
                <div>
                <Nav
                    onSetCandidatesViewMode={this.setCandidatesViewMode}
                    onSetMatchesViewMode={this.setMatchesViewMode}
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