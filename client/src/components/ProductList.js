import React, { useEffect, useState } from 'react'
import { Link } from '@reach/router';
import axios from 'axios';
import DeleteButton from './DeleteButton';

export default props => {
    const {product, removeFromDom} = props;

    const startproject = (e) => {
        e.state = 1;
        axios.put('http://localhost:8000/api/product/' + e._id, e)
            .then(res => console.log(res))
    }

    const movetocompleted = (e) => {
        e.state = 2;
        axios.put('http://localhost:8000/api/product/' + e._id, e)
            .then(res => console.log(res))
    }

    return (
        <div>
            <table>
                <tr>
                    <th style = {{background: "blue"}}>Backlog</th>
                    <th style = {{background: "yellow"}}>In Progress</th>
                    <th style = {{background: "green"}}>Completed</th>
                </tr>
            {product.map((prod, idx) => {
                var curdate = new Date(prod.date)
                var delta_time = curdate - Date.now();
                var overdue = false;
                if(delta_time < 0){
                    overdue = true;
                }
                return (
                    <>
                    {prod.state == 0 &&
                        <tr>
                            <td>
                                <p>{prod.project} state is {prod.state}</p>
                                {overdue == 0 &&
                                    <p>Due: {prod.date}</p>
                                }
                                {overdue == 1 &&
                                    <p style = {{background: "red"}}>Due: {prod.date}</p>
                                }
                                <p><button style = {{background: "yellow"}} onClick = {e => startproject(prod)} >Start Project</button></p>
                            </td>
                        </tr>
                    }
                    {prod.state == 1 &&
                        <tr>
                            <td></td>
                            <td>
                                <p>{prod.project} state is {prod.state}</p>
                                {overdue == 0 &&
                                    <p>Due: {prod.date}</p>
                                }
                                {overdue == 1 &&
                                    <p style = {{background: "red"}}>Due: {prod.date}</p>
                                }
                                <p><button style = {{background: "green"}} onClick = {e => movetocompleted(prod)} >Move to Completed</button></p>
                            </td>
                        </tr>
                    }
                    {prod.state == 2 &&
                        <tr>
                            <td/>
                            <td/>
                            <td>
                                <p>{prod.project} state is {prod.state}</p>
                                {overdue == 0 &&
                                    <p>Due: {prod.date}</p>
                                }
                                {overdue == 1 &&
                                    <p style = {{background: "red"}}>Due: {prod.date}</p>
                                }
                                <p><DeleteButton  productId={prod._id} successCallback={()=>removeFromDom(prod._id)}/></p>
                            </td>
                        </tr>
                    }
                    </>
                    // <p key={idx}>
                    //     <Link to={"/product/" + prod._id}>
                    //         {prod.project}, {prod.date}
                    //     </Link>
                    //     |
                    //     <Link to={"/product/update/" + prod._id}>
                    //         Edit
                    //     </Link> 
                    //     |
                    //    <DeleteButton productId={prod._id} successCallback={()=>removeFromDom(prod._id)}/>
                    // </p>
                )
            })}
            </table>
        </div>
    )
}
