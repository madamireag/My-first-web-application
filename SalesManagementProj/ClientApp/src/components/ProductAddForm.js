import React, { Component } from 'react';
import axios from 'axios';
export class ProductAddForm extends Component {
    static displayName = ProductAddForm.name;
    constructor(props) {
        super(props);
        this.state = {
            id: 0, denumire: "", categorie: "", pret: 0,empty:true

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    async componentDidMount() {
        const id = this.props.match.params.Id;
        console.log(id);
        if (id) {
            const resp = await fetch("api/Produs/" + id);
            const data = await resp.json();
            console.log(data);
            this.setState({ id: data.id, denumire: data.denumire, categorie: data.categorie, pret: parseFloat(data.pret) });
        }
        console.log(this.state);
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        if (this.state.categorie.length >= 2 && this.state.denumire.length >= 3 && this.pret > 0) {
            this.setState({ empty: false });
        }
        console.log(this.state);
    }
    
    handleSubmit(event) {
        event.preventDefault();
        
        const id = this.props.match.params.Id;
        console.log(id);
        
            if (id) {
                axios.put("api/Produs/" + id, { id: this.state.id, denumire: this.state.denumire, categorie: this.state.categorie, pret: parseFloat(this.state.pret) }).then(response => {
                    console.log(response);
                }).catch(error => { console.log(error); });
                window.location.href = '/produs';
            }
            else {
                axios.post("api/Produs", { denumire: this.state.denumire, categorie: this.state.categorie, pret: parseFloat(this.state.pret) }).then(response => {
                    console.log(response);
                });
                console.log(`-Sending: den: ${this.state.denumire}, categorie: ${this.state.categorie}, pret: ${this.state.pret} `);
                window.location.href = '/produs';
            }
        
       
          
    }
    render() {
       
        return (
            <form >
                <div class="form-group">
                    <label for="denumire">Denumire:</label>
                    <input type="text" placeholder="Denumire" value={this.state.denumire} name="denumire" onChange={this.handleChange} class="form-control" required />

                </div>
                <div class="form-group">
                    <label for="categorie">Categorie</label>
                    <input type="text" placeholder="Categorie" name="categorie" value={this.state.categorie} class="form-control" onChange={this.handleChange} required />

                </div>
                <div class="form-group">
                    <label for="pret">Pret:</label>
                    <input type="number" value={this.state.pret} name="pret" onChange={this.handleChange} class="form-control" required />

                </div>
                <button type="submit" onClick={this.handleSubmit} class="btn btn-primary">Submit</button>
            </form>


        );
    }
    
}
