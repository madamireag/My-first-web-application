import React, { Component } from 'react';
import axios from 'axios';
export class EditClientForm extends Component {
    static displayName = EditClientForm.name;
    constructor(props) {
        super(props);
        this.state = {
            id: 0, name: "", email: "", telefon: "",

        };
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);

        this.onSubmit = this.onSubmit.bind(this);


    }
    onChangeName(e) {
        this.setState({[e.target.name]: e.target.value});
    }  
    onChangeEmail(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    onChangePhone(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    componentDidMount() {
        axios.get('/client/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.fullName,
                    email: response.data.email,
                    telefon: response.data.nrTelefon
                });
            })
            .catch(function (error) {
                console.log(error);
            })  
    }  

    render() {
        return (
            <form>
                <div class="form-group">
                    <label for="name"> Nume Complet:</label>
                    <input type="text" placeholder="Name" value={this.state.name} name="name" onChange={this.onChangeName} />
                  
                </div>
                <div class="form-group">
                    <label for="email"> E-mail: </label>
                    <input type="email" placeholder="E-mail" name="email" value={this.state.email} onChange={this.onChangeEmail} />
                    
                </div>
                <div class="form-group">
                    <label for="nrTelefon">Telefon:</label>
                    <input type="text" placeholder="Telefon" value={this.state.telefon} name="telefon" onChange={this.onChangePhone} />
                    
                </div>
                <button type="submit" onClick={this.handleSubmit} class="btn btn-primary">Submit</button>
            </form>


        );
    }

}
