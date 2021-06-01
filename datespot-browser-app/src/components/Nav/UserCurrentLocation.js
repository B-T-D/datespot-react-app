function UserCurrentLocation(props) {
    return (
        <div>
            <div className="btn-toolbar" role="toolbar">
                <div className="btn-group mr-2" role="group">
                    <button className = "btn btn-secondary">
                        {props.location.latitude}
                    </button> 
                    <button className ="btn btn-secondary">
                        ,
                    </button>
                    <button className = "btn btn-secondary">
                        {props.location.longitude}
                    </button> 
                </div>
                <div className="btn-group mr-2" role="group">
                    <button
                        className="btn btn-primary"
                        onClick={props.onRefreshLocation}
                    >
                        Refresh location
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserCurrentLocation