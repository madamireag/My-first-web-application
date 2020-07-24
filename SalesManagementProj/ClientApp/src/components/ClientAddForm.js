import React, { Component } from 'react';
import axios from 'axios';
export class ClientAddForm extends Component {
    static displayName = ClientAddForm.name;
    constructor(props) {
        super(props);
        this.state = {
            id: 0, name: "", email: "", telefon: "",
        errors: {
            fullName: '',
            email: '',
            phone: '',
            }};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }
    async componentDidMount() {
        const id = this.props.match.params.Id;
            if (id) {
            const resp = await fetch("api/client/" + id);
            const data = await resp.json();
            console.log(data);
            this.setState({ id: data.id, name: data.fullName, email: data.email, telefon: data.nrTelefon });
        }
        console.log(this.state);
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });

        const { name, value } = event.target;
        const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        const phoneRegex = RegExp(/^[0-9]*$/);
        console.log(this.state);
        let errors = this.state.errors;

        switch (name) {
            case 'fullName': errors.fullName =value.length < 5? 'Full Name must be 5 characters long!': '';
                break;
            case 'email':
                errors.email =emailRegex.test(value)? '': 'Email is not valid!';
                break;
            case 'nrTelefon': errors.phone =phoneRegex.test(value)? 'Phone number should only contain numbers': '';
                break;
            default:
                break;
        }
        this.setState({ errors, [name]: value }); 
       
    }
   
    handleSubmit(event) {
        event.preventDefault();
        const id = this.props.match.params.Id;
        console.log(id);
        if (this.state.name.length >= 2 && this.state.email.length >= 2 && this.state.telefon.length >= 2) {
            if (id) {
                
                //fetch('api/client/' + id, {
                //    method: 'PUT', headers: { 'Content-Type': 'application/json' },
                //    body: JSON.stringify({ id: this.state.id, fullName: this.state.name, email: this.state.email, nrTelefon: this.state.telefon })
                //}).then(response=>console.log(response.json()));
               // console.log(this.state);
                axios.put("api/client/"+id, { id:this.state.id,fullName: this.state.name, email: this.state.email, nrTelefon: this.state.telefon }).then(response => {
                    console.log(response);
                }).catch(error => { console.log(error); });
                window.location.href = '/client';
            }
            else {
                
                axios.post("/api/client", { fullName: this.state.name, email: this.state.email, nrTelefon: this.state.telefon }).then(response => {
                    console.log(response);
                }).catch(error => { console.log(error); });
                console.log(`-Sending: full name: ${this.state.name}, email: ${this.state.email}, phone: ${this.state.telefon} `);
                window.location.href = '/client';  
            }
        }
        else {
            alert("Completati toate campurile!");
        }
        
    }

    render() {
        
        return (
            <form class="needs-validation" noValidate>
                <div class="form-group">
                <label for="name"> Nume Complet:</label>
                    <input type="text" placeholder="Name" value={this.state.name} name="name" onChange={this.handleChange} class="form-control is-invalid" required/>
                    <div class="invalid-feedback">
                        Please provide a name
                    </div>
                </div>
                <div class="form-group">
                <label for="email"> E-mail: </label>
                    <input type="email" class="form-control is-invalid" placeholder="E-mail" name="email" value={this.state.email} onChange={this.handleChange} required />
                    <div class="invalid-feedback">
                        Please provide your e-mail! 
                      </div>
                </div>
                <div class="form-group">
                <label for="nrTelefon">Telefon:</label>
                    <input type="text" class="form-control is-invalid" placeholder="Telefon" value={this.state.telefon} name="telefon" onChange={this.handleChange} pattern="\d+" required />
                    <div class="invalid-feedback">
                        Please provide your phone number
                      </div>
                </div>
                <button type="submit" onClick={this.handleSubmit} class="btn btn-primary">Submit</button>
            </form>


        );
    }
}
