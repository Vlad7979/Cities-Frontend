import React, {Component} from "react";
import CityService from "../services/city.service";

export default class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: []
        };
    }

    componentDidMount() {
        CityService.get(localStorage.getItem("city")).then(res => {
            this.setState({content: [res.data]})
        })
    }

    render() {
        return (
            <div className="container">
                <br/>
                <h1>Edit</h1>
                <br/>
                {this.state.content.map(item => (
                        <div className="container">
                            <label>City name: <input type="text" id="city_name" defaultValue={item.name} /></label>
                            <label>Image link: <input type="text" id="city_photo" defaultValue={item.photo}/></label>
                            <button type="button" onClick={() => {
                                let body = {
                                    id: item.id,
                                    name: document.getElementById("city_name").value,
                                    photo: document.getElementById("city_photo").value
                                }
                                CityService.edit(JSON.parse(JSON.stringify(body)))
                                localStorage.setItem("city", document.getElementById("city_name").value)
                                this.props.history.push("/city")
                                window.location.reload()
                            }}>Submit
                            </button>
                        </div>
                    )
                )}
            </div>
        );
    }
}
