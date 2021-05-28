function CandidatesViewModeSelect(props) {
    return (
        <button
            className="btn btn-outline-secondary"
            onClick={props.onSetCandidatesViewMode}
        >
            Candidates
        </button>
    )
}

export default CandidatesViewModeSelect