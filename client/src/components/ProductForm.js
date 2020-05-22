import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default props => {
    //keep track of what is being typed via useState hook

    const {initialproject, initialdate, onSubmitProp} = props;
    const [project, setProject] = useState(initialproject); 
    const [date, setDate] = useState(initialdate);
    const state = 0;
    const onSubmitHandler = e => {
        e.preventDefault();
        onSubmitProp({project, date, state});
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <p>
                <label>project</label><br/>
                <input type="text" name="project" value={project} onChange = {(e)=>setProject(e.target.value)}/>
            </p>
            <p>
                <label>date</label><br/>
                <input type="date" name="date" value={date} onChange = {(e)=>setDate(e.target.value)}/>
            </p>
            <input type="submit" value="Plan Project"/>
        </form>
    )
}
