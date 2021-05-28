function MatchesViewModeSelect(props){
    return (
        <button
            className="btn btn-outline-success"
            onClick={props.onSetMatchesViewMode} 
        />
    )
}

export default MatchesViewModeSelect;