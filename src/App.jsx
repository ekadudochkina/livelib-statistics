import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Notes from "./pages/Notes";
import Books from "./pages/Books";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";
import {createContext, useEffect, useState} from "react";

export const NotesContext = createContext({
    notes: [],
    setNotes: () =>{},
});
function App() {
    const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || []);

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    return (
        <main id='app'>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Books/>} />
                    <Route path="/notes" element={<Notes notes={notes}/>} />
                    <Route path="/create-note" element={
                        <NotesContext.Provider value={{notes,setNotes}}>
                            <CreateNote/>
                        </NotesContext.Provider>
                    } />
                    <Route path="/edit-note/:id" element={<EditNote notes={notes}  setNotes={setNotes}  />}  />
                </Routes>
            </BrowserRouter>
        </main>
    )
}

export default App;