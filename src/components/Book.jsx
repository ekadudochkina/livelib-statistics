import React from 'react';
import {Link} from "react-router-dom";

const Book = ({book}) => {
    return (
        <Link to={`/edit-note/${book.id}`} className='note'>
            <h4>{book.title}</h4>
            <div>{book.authors[0].name}</div>

            <div>
                <span className="rating">
                    <span className='numbers'>({book.rating.overall})</span>
                    <label className={book.rating.overall >= 5 ? 'active' : ''} htmlFor="star5">&#9733;</label>
                    <label className={book.rating.overall >= 4 ? 'active' : ''} htmlFor="star4">&#9733;</label>
                    <label className={book.rating.overall >= 3 ? 'active' : ''} htmlFor="star3">&#9733;</label>
                    <label className={book.rating.overall >= 2 ? 'active' : ''} htmlFor="star2">&#9733;</label>
                    <label className={book.rating.overall >= 1 ? 'active' : ''} htmlFor="star1">&#9733;</label>
                </span>

                <span className={book.rating.user ? '' : 'hidden'}>
                    <div className="rating">
                        <span className='numbers'>({book.rating.user})</span>
                        <label className={book.rating.user >= 5 ? 'active' : ''} htmlFor="star5">&#9733;</label>
                        <label className={book.rating.user >= 4 ? 'active' : ''} htmlFor="star4">&#9733;</label>
                        <label className={book.rating.user >= 3 ? 'active' : ''} htmlFor="star3">&#9733;</label>
                        <label className={book.rating.user >= 2 ? 'active' : ''} htmlFor="star2">&#9733;</label>
                        <label className={book.rating.user >= 1 ? 'active' : ''} htmlFor="star1">&#9733;</label>
                    </div>
                </span>
            </div>


            <p>
                {book.annotation}
            </p>
        </Link>
    )
}

export default Book;