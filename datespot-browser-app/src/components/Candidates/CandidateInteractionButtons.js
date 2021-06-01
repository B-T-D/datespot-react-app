function CandidateInteractionButtons(props) {
    return (
        <div className="btn-group" role="group">
        <button
            className= "btn btn-danger"
            onClick={() => {props.onDecision(false)}}
        >
            No
        </button>
        <button
            className="btn btn-secondary"
            onClick={props.onGetNextCandidate}
        >
            Pass
        </button>
        <button
            className="btn btn-success"
            onClick={ () => {props.onDecision(true)}}
        >
            Yes
        </button>
    </div>        
    )
}

export default CandidateInteractionButtons