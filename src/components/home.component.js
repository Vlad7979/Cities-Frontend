import React, {Component} from "react";

import ReactTable from "react-table";
import 'react-table/react-table.css'
import CityService from "../services/city.service";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: [],
            names: [],
            limit: 1000,
            page: 0,
            name: "",
            message: ""
        };
    }

    componentDidMount() {
        CityService.getAll(this.state.limit, this.state.page).then(res => {
            this.setState({content: res.data})
            let list = []
            this.state.content.map(item => {
                list.push(item.name)
            })
            this.setState({names: list})
        })
    }

    handleChange = event => {
        this.setState({name: event.target.value});
    }

    render() {
        const columns = [{
            Header: 'ID',
            accessor: 'id',
        }
            , {
                Header: 'Name',
                accessor: 'name',
            }

            , {
                Header: 'Photo',
                accessor: 'photo',
                Cell: tableProps => (
                    <img
                        src={tableProps.row.photo}
                        width={100}
                        alt='photo'
                    />
                )
            }
        ]
        return (
            <div className="container">
                <label>
                    City Name:
                    <input type="text" name="name" onChange={this.handleChange}/>
                </label>
                {this.state.message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {this.state.message}
                        </div>
                    </div>
                )}
                <button type="submit" onClick={() => {
                    if (this.state.names.includes(this.state.name)) {
                        localStorage.setItem("city", this.state.name)
                        this.props.history.push("/city");
                        window.location.reload();
                    } else {
                        this.setState({message: "Incorrect city name"})
                    }
                }}>Search
                </button>
                <br/>
                <br/>
                <ReactTable
                    data={this.state.content}
                    columns={columns}/>
            </div>
        );
    }
}
