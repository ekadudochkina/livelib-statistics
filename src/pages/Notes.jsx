import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import NoteItem from '../components/NoteItem'

function Notes({notes}) {
    const [showSearch, setShowSearch] = useState(false);
    const [text, setText] = useState('');
    const [filteredNotes, setFilteredNotes] = useState(notes);

    const handleSearch = (e) => {
        setFilteredNotes(notes.filter(note => {
            if (note.title.toLowerCase().match(text.toLowerCase())) {
                return note;
            }
        }))
    }

    useEffect(handleSearch, [text]);

    return (
        <section>
            <header className="notes__header">
                {!showSearch && <h2>Notes</h2>}
                {showSearch && <input type='text' value={text} onChange={(e) => {setText(e.target.value); handleSearch(); }} autoComplete
                                      placeholder="..."/>}
                <button type='submit' className="btn" onClick={() => setShowSearch(prevState => !prevState)}>
                    {showSearch ? "Close" : "Search"}
                </button>
            </header>

            <div className="notes__container">
                {filteredNotes.length === 0 && <p className='empty__notes'>No notes found</p>}
                {
                    filteredNotes.map(note => <NoteItem key={note.id} note={note}/>)
                }
            </div>

            <Link to='/create-note' className='btn add__btn'>+ Add</Link>
        </section>
    );
}

export default Notes;