import React, { useEffect, useState } from 'react';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import Axios from 'axios';
import { navigate, Link } from '@reach/router';

export default () => {
    const [product, setProduct] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:8000/api/products')
            .then(res=>{
                setProduct(res.data);
                setLoaded(true);
            });
    }, onclick)

    const removeFromDom = productId => {
        setProduct(product.filter(product => product._id != productId));
    }

    const createProduct = producttemp => {
        Axios.post('http://localhost:8000/api/product', producttemp)
            .then(res=> {
                setProduct([...product, res.data]);
            })
            .catch(err => {
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            })
    }

    return (
        <div>
            <h1>Project Manager</h1>
           {loaded && <ProductList product = {product} removeFromDom={removeFromDom}/>}
           <p><Link to="/projects/new">Add New Project</Link></p>
        </div>
    )
}
