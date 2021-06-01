import React from 'react';

import MatchesViewModeSelect from './MatchesViewModeSelect';
import CandidatesViewModeSelect from './CandidatesViewModeSelect';
import { UserInfo } from './UserInfo';

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
                <UserInfo
                    user={this.props.user}
                    location = {this.props.location}
                    onRefreshLocation={this.props.onRefreshLocation}
                />
            </div>
        )
    }
}