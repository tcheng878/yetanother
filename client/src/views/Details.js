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
    }, [])

    const removeFromDom = productId => {
        setProduct(product.filter(product => product._id != productId));
    }

    const createProduct = producttemp => {
        var flag = false;
        for(var i = 0; i < product.length; i++){
            if(product[i].project == producttemp.project){
                flag = true;
                const errorArr = [];
                errorArr.push("This project already exists!")
                setErrors(errorArr);
                break;
            }
        }
        if(flag == false){
            Axios.post('http://localhost:8000/api/product', producttemp)
                .then(res=> {
                    setProduct([...product, res.data]);
                    navigate("/");
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
    }

    return (
        <div>
            <h1>Project Manager</h1>
            <hr></hr>
            <p><Link to="/">Back to Dashboard</Link></p>
            <h3>Plan a new Project</h3>
            {errors.map((err,index) => {
                return(
                    <p key={index}>{err}</p>
                )
            })}
           <ProductForm onSubmitProp = {createProduct} initialproject="" initialdate=""/>
        </div>
    )
}
