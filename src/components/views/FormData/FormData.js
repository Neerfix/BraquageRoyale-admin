import React, {Component} from 'react';
import {Badge, Card} from "react-bootstrap";
import Users from "./Users";
import Maps from "./Maps";
import Characters from "./Characters";
import Lists from "./Lists";
import getToken from "../../../functions/getToken";
const token = getToken();

export default class FormData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tokenACP: token,
            action: this.props.match.params.do,
            dataType: this.props.match.params.data,
            id: this.props.match.params.id,
            showToast: false,
        };
    }

    showToasts = () => {this.setState({showToast: true})};
    closeToast = () => {this.setState({showToast: false})};
    delayToHide = () => {setTimeout(this.closeToast, 10000)};

    render() {
        const listData = {
            users: <Users id={this.state.id} action={this.state.action} dataType={this.state.dataType} showToasts={this.showToasts} delayToHide={this.delayToHide} showT={this.state.showToast}/>,
            maps: <Maps id={this.state.id} action={this.state.action} dataType={this.state.dataType} showToasts={this.showToasts} delayToHide={this.delayToHide} showT={this.state.showToast}/>,
            characters: <Characters id={this.state.id} action={this.state.action} dataType={this.state.dataType} showToasts={this.showToasts} delayToHide={this.delayToHide} showT={this.state.showToast}/>,
            lists: <Lists id={this.state.id} action={this.state.action} dataType={this.state.dataType} showToasts={this.showToasts} delayToHide={this.delayToHide} showT={this.state.showToast}/>,
        };

        return (
            <div className="content col-10 mt-3">
                <Card>
                    <Card.Header>
                        <span><Badge variant={"warning"}>{this.state.action}</Badge> Form Data : {this.state.dataType}</span>
                    </Card.Header>
                    <Card.Body className="d-flex justify-content-center">
                        {listData[this.state.dataType]}
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
