import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/Card.css'
import DefaultCover from '../assets/default-book-cover.jpg';

function Card({title,image,author,page,dueDate}) {
    dueDate = dueDate && dueDate.toDate(dueDate)
    let isOnTime = dueDate && (dueDate - (new Date()).setHours(0, 0, 0, 0) >= 0);

    return (
        <div className='card-container'>
            <Link className='link' to={page}>
                <button>
                    <div className='card-image'>
                        <img src={(image != "" && image) || DefaultCover} alt='image of a book' />
                    </div>
                    <div className='card-text'>
                        <div className='card-title'>
                            <strong>{title}</strong>
                        </div>
                        <div className='card-author'>
                            {author}
                        </div>
                        {dueDate &&
                        <div className={(isOnTime && 'on-time') || 'late'}>
                            <p>Due by {(dueDate.getMonth()+1) + '/' + (dueDate.getDate()) + '/' + (dueDate.getFullYear())}</p>
                        </div>
                        }
                    </div>
                </button>
            </Link>
        </div>
    )
}

export default Card
