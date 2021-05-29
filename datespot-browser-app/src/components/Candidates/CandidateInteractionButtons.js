function CandidateInteractionButtons(props) {
    return (
        <div className="btn-group" role="group">
        <button
            className= "btn btn-danger"
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
        >
            Yes
        </button>
    </div>        
    )
}

export default CandidateInteractionButtons