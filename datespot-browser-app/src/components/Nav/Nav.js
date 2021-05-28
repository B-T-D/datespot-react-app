import React from 'react';

import MatchesViewModeSelect from './MatchesViewModeSelect';

export class Nav extends React.Component{
    render() {
        return(
            <div>
                <p>I am Nav</p>
                <MatchesViewModeSelect
                    onSetMatchesViewMode={this.props.onSetMatchesViewMode}
                />
            </div>
        )
    }
}