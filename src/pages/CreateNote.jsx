import React, {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {v4 as uuid} from 'uuid';
import useCreateDate from '../components/useCreateDate';
import {NotesContext} from "../App";

function CreateNote() {
    const [title, setTitle] = React.useState('');
    const [details, setDetails] = React.useState('');
    const date = useCreateDate();
    const navigate = useNavigate();
    const context = useContext(NotesContext);
    const handleSubmit = (e) => {
        e.preventDefault();

        if (title && details) {
            const note = {id: uuid(), title: title, details: details, date: date};
            context.setNotes([note, ...context.notes]);
            navigate('/notes')
        }
    }

    return (
        <section>
            <header className='create-note__header'>
                <Link to='/' className='btn'>Back</Link>
                <button className='btn lg primary' onClick={handleSubmit}>Save</button>
            </header>

            <form className='create-note__form' onSubmit={handleSubmit}>
                <input type='text' autoComplete placeholder="..." value={title}
                       onChange={(e) => setTitle(e.target.value)}/>
                <textarea rows='10' value={details} onChange={(e) => setDetails(e.target.value)}>...</textarea>
            </form>
        </section>
    )
}

export default CreateNote;