import React, {useEffect, useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import axios from 'axios'
import Book from "../components/Book";


function Books() {
    let books = [];
    const [userName, setUserName] = React.useState('kate13');
    const [pageName, setPageName] = React.useState('read');
    const [show, setShow] = useState(false);
    const [booksArray, setBooksArray] = useState(books);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (userName && pageName) {
            setShow(true);

            axios.get('http://localhost:8080/api/live-lib', {
                params: {
                    userName: userName,
                    pageName: pageName
                }
            }).then((data) => {
                console.log(data);
                setShow(false);
                setBooksArray(data.data);
            }).catch(
                function (error) {
                    console.log('Show error notification!')
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            )


        }

    }

    const handleClose = () => setShow(false);


    return (
        <section>
            <form className="" onSubmit={handleSubmit}>
                <header className="notes__header">
                    <input value={userName} className="form-control" type="text"
                           onChange={(e) => setUserName(e.target.value)} placeholder="Имя пользователя" required/>

                    <select className="form-control form-control" id="name-root" value={pageName}
                            onChange={(e) => setPageName(e.target.value)}>
                        <option value="read">Прочитал</option>
                        <option value="unread">Не дочитал</option>
                        <option value="reading">Читаю сейчас</option>
                        <option value="wish">Хочу прочитать</option>
                    </select>

                    <button onClick={handleSubmit} className="btn btn-primary" value="">&#10153;</button>
                </header>
            </form>

            <div className="notes__container">
                {
                    booksArray.map(book => <Book key={book.title} book={book}/>)
                }
            </div>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Waiting.....
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


        </section>
    );
}

export default Books;