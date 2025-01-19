import React from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom'
import useCreateDate from "../components/useCreateDate";

function EditNote({notes, setNotes}) {
    const {id} = useParams();
    const note = notes.find((item) => item.id === id);
    const [title, setTitle] = React.useState(note.title);
    const [details, setDetails] = React.useState(note.details);
    const date = useCreateDate();
    const navigate = useNavigate();

    const handleForm = (e) => {
        e.preventDefault();

        if (title && details) {
            const newNote = {...note, title: title, details: details, date: date};
            const newNotes = notes.map(item => {
                if (item.id === id) {
                    item = newNote;
                }
                return item;
            });
            setNotes(newNotes);
        }

        navigate('/');
    }

    const handleDelete = (e) => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            const newNotes = notes.filter(item => item.id !== id);
            setNotes(newNotes);
            navigate('/');
        }
    }

    return (
        <section>
            <header className='create-note__header'>
                <Link to='/' className='btn'>Back</Link>
                <button className='btn lg primary' onClick={handleForm}>Save</button>
                <button className='btn danger' onClick={handleDelete}>Delete</button>
            </header>

            <form className='create-note__form' onSubmit={handleForm}>
                <input type='text' autoComplete placeholder="Title" value={title}
                       onChange={(e) => setTitle(e.target.value)}/>
                <textarea placeholder="Details" rows='28' value={details}
                          onChange={(e) => setDetails(e.target.value)}></textarea>
            </form>
        </section>
    )
}

export default EditNote;