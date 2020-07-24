import React, { Component } from 'react';
import { Navbar } from 'reactstrap';

export class Client extends Component {
    static displayName = Client.name;
    constructor(props) {
        super(props);
        this.state = { clients: [], loading: true };
         

    }
   
    DeleteClient = (id) => {
        if (window.confirm('Sigur doriti sa stergeti clientul?')) {
            fetch('/api/client/' + id, { method: 'DELETE', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } });
        }
        window.location.reload(false);
    }
              
     
    componentDidMount() {
        this.populateData();  
           }
    renderTable(clients) {
       
        return (
         
            <table className='table ' aria-labelledby="tabelLabel">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Id </th>
                        <th scope="col">Nume complet </th>
                        <th scope="col">E-mail </th>
                        <th scope="col">Telefon </th>
                        <th id="tC" scope="col">Optiuni posibile</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(cl =>
                        <tr key={cl.id}>
                            <td>{cl.id}</td>
                            <td>{cl.fullName}</td>
                            <td>{cl.email}</td>
                            <td>{cl.nrTelefon}
                            </td>
                            <td id="tD">
                               
                                <a href={"/client-add-form/"+cl.id} class="btn btn-secondary">Edit</a>
                               <button type="button" onClick={() => this.DeleteClient(cl.id)}  id="delete-btn" className="btn btn-danger">Delete</button>  
                            </td>
                        </tr>
                    )}
                </tbody>
                </table>
        );
    }
   
    render() {
        let contents = this.renderTable(this.state.clients);

        return (
            
            <div>
              
                <h1 id="tabelLabel" >Clienti</h1>
                <a href="/client-add-form" id="add-btn"class="btn btn-primary">Add Client</a>
                {contents}
            </div>
        );
    }
    async populateData() {
        const response = await fetch('api/client');
        const data = await response.json();
        this.setState({ clients: data, loading: false });
    }
}
