import React, { Component } from 'react';
import { Navbar } from 'reactstrap';
import laptop from './laptop.jpg';
export class ProductList extends Component {
    static displayName = ProductList.name;
    constructor(props) {
        super(props);
        this.state = { products: [], loading: true };


    }
    componentDidMount() {
        this.populateData();
    }
    async populateData() {
        const response = await fetch('api/produs');
        const data = await response.json();
        this.setState({ products: data, loading: false });
    }
    DeleteProduct = (id) => {
        if (window.confirm('Sigur doriti sa stergeti produsul?')) {
            fetch('api/Produs/' + id, { method: 'DELETE', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } });
        }
        
        window.location.reload(false);
        
    }
    renderProducts(products) {
        return (
            <div className="row products-container">
                {
                    products.map(p =>
                        <div className="card" key={p.id}>
                           
                                <img id="product" src={laptop} alt=""/> 
                            
                            <ul className="list-group list-group-flush">
                                <h5 className="card-title">{p.denumire}</h5>
                                <li className="list-group list-group-flush"></li>
                                <li className="list-group list-group-flush">Categorie: {p.categorie}</li>
                                <li className="list-group list-group-flush">Pret: {p.pret}</li>
                            </ul>

                        </div>
                    )}
                </div>
            
            
            
            );
    }
    renderTable(products) {

        return (

            <table className='table ' aria-labelledby="tabelLabel">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Id </th>
                        <th scope="col">Denumire </th>
                        <th scope="col">Categorie </th>
                        <th scope="col">Pret </th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p =>
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.denumire}</td>
                            <td>{p.categorie}</td>
                            <td>{p.pret}
                            </td>
                            <td>
                                <a href={"/product-add-form/" + p.id} class="btn btn-secondary">Edit</a>
                                <button type="button" id="delete-btn"onClick={() => this.DeleteProduct(p.id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
    render() {
        let contents = this.renderTable(this.state.products);

        return (

            <div>
               
                               
                <h1 id="tabelLabel" >Produse</h1>
                <a href="/product-add-form" id="add-btn" class="btn btn-primary">Add Product</a>
                {contents}
            </div>
        );
    }

}