function MatchesViewModeSelect(props){
    return (
        <button
            className="btn btn-outline-success"
            onClick={props.onSetMatchesViewMode} 
        >
            Matches
        </button>
    )
}

export default MatchesViewModeSelect;