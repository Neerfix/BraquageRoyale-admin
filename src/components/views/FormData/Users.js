import React, {Component} from "react";
import {Form} from "react-bootstrap";
import routeAPI from "../../../tools/routeAPI";
import FieldText from "./FieldText";
import FooterForm from "./FooterForm";
// import getToken from "../../../functions/getToken";
// const token = getToken();

export default class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tokenACP: "",
            dataType: this.props.dataType,
            create: "POST",
            edit: "PATCH",
            data: {
                "email": "", "firstname": "", "lastname": "",
                "player": {
                    "username": "",
                    "rank": "",
                },
                "date": {
                    "date_of_birth": "",
                }
            },
            deactivate: false,
        };
    }

    async componentDidMount() {
        if(this.props.action === 'edit'){
            await fetch(routeAPI + this.state.dataType + "/" + this.props.id, {
                headers: { 'Authorization': this.state.tokenACP },
            }).then(response => response.json())
                .then(json => {
                    if(json){
                        this.setState({
                            data: json,
                            apiLoaded: true,
                            email: json.email,
                            firstname: json.firstname,
                            lastname: json.lastname,
                            player: {
                                username: json.username,
                                rank: json.rank,
                            },
                            date: {
                                date_of_birth: json.date_of_birth,
                            }
                        });
                    }
                }).catch(e => {
                    console.log(e.code)
                    console.log(e.message)
                })
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        let id = this.props.id;
        let route = routeAPI + 'users/';
        if (id) {
            route = routeAPI + 'users/' + id
        }
        fetch(route, {
                method: this.state[this.props.action],
                headers: {
                    'Authorization': this.state.tokenACP,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.state.email,
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    player: {
                        username: this.state.username,
                        rank: this.state.rank,
                    },
                    date: {
                        date_of_birth: this.state.date_of_birth,
                    }
                })
            })
            .then(r => {
                if(r.ok){
                    this.setState({
                        toastMessage: 'The action was successfully completed',
                        toastType: 'success'
                    })
                }else{
                    this.setState({
                        toastMessage: 'An error occurred while creating the user: ' + r.statusText,
                        toastType: 'error'
                    });
                }
            })
            .catch(e => {
                this.setState({
                    toastMessage: 'An error occurred while creating the user: ' + e.message,
                    toastType: 'error'
                });
            });
        this.props.showToasts();
        this.props.delayToHide();
    };

    handleChange = (e) => {
        e.preventDefault();
            this.setState({
                [e.target.name]: e.target.value
            });
    };

    render() {
        return <Form onSubmit={this.handleSubmit}>
            <Form.Row>
                <FieldText defaultValue={this.state.data.email} title={"Email"} name={"email"} id={"email"} placeholder={""} type={'email'} handleChange={this.handleChange}/>
                <FieldText defaultValue={this.state.data.date.date_of_birth} title={"Date of birth"} name={"date_of_birth"} id={"date_of_birth"} placeholder={""} type={'text'} handleChange={this.handleChange}/>
            </Form.Row>

            <Form.Row>
                <FieldText defaultValue={this.state.data.firstname} title={"First name"} name={"firstname"} id={"firstname"} placeholder={""} type={'text'} handleChange={this.handleChange}/>
                <FieldText defaultValue={this.state.data.lastname} title={"Last name"} name={"lastname"} id={"lastname"} placeholder={""} type={'text'} handleChange={this.handleChange}/>
                <FieldText defaultValue={this.state.data.player.username} title={"Username"} name={"username"} id={"username"} placeholder={""} type={'text'} handleChange={this.handleChange}/>
            </Form.Row>



            <Form.Row>
                <select className={"form-control"}   name={"rank"}  onChange={this.handleChange}>
                    <option value={"newbie"}> Newbie</option>
                    <option value={"admin"}> Admin</option>
                    <option value={"super_admin"}> Super-Admin</option>
                </select>
            </Form.Row>

            <FooterForm showT={this.props.showT} toastMessage={this.state.toastMessage} toastType={this.state.toastType}/>
        </Form>;
    }
}
