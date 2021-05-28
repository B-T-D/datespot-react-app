function CandidatesViewModeSelect(props) {
    return (
        <button
            className="btn btn-outline-dark"
            onClick={props.onSetCandidatesViewMode}
        >
            Candidates
        </button>
    )
}

export default CandidatesViewModeSelect