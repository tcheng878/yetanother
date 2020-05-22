import React from 'react'
import axios from 'axios';

export default props => {
    const { productId, successCallback } = props;
    const deleteProduct = e => {
        axios.delete('http://localhost:8000/api/product/' + productId)
            .then(res=>{
                successCallback();
            })
    }
    return (
        <button style = {{background: "red"}} onClick={deleteProduct}>
            Remove Project
        </button>
    )
}
