import React from 'react';

import CandidateInfo from './CandidateInfo';
import CandidateInteractionButtons from './CandidateInteractionButtons';


export class Candidates extends React.Component{
    render() {
        return(
            <div>
                <CandidateInfo
                    candidate={this.props.candidate}
                />
                <CandidateInteractionButtons
                    onGetNextCandidate={this.props.onGetNextCandidate}
                />
            </div>
        )
    }
}