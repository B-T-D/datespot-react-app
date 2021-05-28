function UserCurrentLocation(props) {
    return (
        <div>
            <div>{props.currentLocation[0]}, {props.currentLocation[1]}</div>
            <button
                className="btn btn-outline-primary"
                onClick={props.onRefreshLocation}
            >
                Refresh location
            </button>
            
        </div>
    )
}

export default UserCurrentLocation