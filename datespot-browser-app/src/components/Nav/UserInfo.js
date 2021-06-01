import React from 'react';
import UserCurrentLocation from './UserCurrentLocation';

export class UserInfo extends React.Component{
    render() {
        return (
            <div>
                <div>
                    {this.props.user ?
                        <div>
                        <p>Logged in as {this.props.user.name} ( {this.props.user.id} ) </p>
                        </div>
                        :
                        null
                    }   
                </div>
                <UserCurrentLocation
                    location={this.props.location}
                    onRefreshLocation={this.props.onRefreshLocation}
                />
            </div>
        )
    }
}