import React from 'react';

import MatchesViewModeSelect from './MatchesViewModeSelect';
import CandidatesViewModeSelect from './CandidatesViewModeSelect';
import UserCurrentLocation from './UserCurrentLocation';

export class Nav extends React.Component{
    render() {
        return(
            <div>
                <CandidatesViewModeSelect
                    onSetCandidatesViewMode={this.props.onSetCandidatesViewMode}
                />
                <MatchesViewModeSelect
                    onSetMatchesViewMode={this.props.onSetMatchesViewMode}
                />
                <UserCurrentLocation 
                    currentLocation = {this.props.currentLocation}
                    onRefreshLocation={this.props.onRefreshLocation}
                />
            </div>
        )
    }
}