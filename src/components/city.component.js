import React, { Component } from "react";
import CityService from "../services/city.service";
import AuthService from "../services/auth.service";

export default class City extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEditPage: false,
            currentUser: undefined,
            content: []
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showEditPage: user.roles.includes("ROLE_ALLOW_EDIT"),
            });
        }

        CityService.get(localStorage.getItem("city")).then(res => {
            this.setState({content: [res.data]})
        })
    }

    render() {
        return (
            <div className="container">
                <br/>
                {this.state.content.map(item => (
                    <div className="container">
                        <h1>{item.name}</h1>
                     <img src={item.photo} width={500}/>
                    </div>
                    )
                )}
                <br/>
                {this.state.showEditPage && (
                    <button type="submit" onClick={() => {
                        this.props.history.push("/edit");
                        window.location.reload();
                    }}>Edit</button>
                )}
            </div>
        );
    }
}
