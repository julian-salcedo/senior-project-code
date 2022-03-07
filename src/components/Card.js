import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/Card.css'

function Card({title,image,author,page,dueDate}) {
    let isOnTime = dueDate && (dueDate - (new Date()).setHours(0, 0, 0, 0) >= 0);

    return (
        <div className='card-container'>
            <Link className='link' to={page}>
                <div className='image-container'>
                    <img src={image} alt='image of a book' />
                </div>
                <div className='title'>
                    <h3>{title}</h3>
                </div>
                <div className='author'>
                    <p>{author}</p> 
                </div>
                {dueDate &&
                <div className={(isOnTime && 'on-time') || 'late'}>
                    <p>Due by {(dueDate.getMonth()+1) + '/' + (dueDate.getDate()) + '/' + (dueDate.getFullYear())}</p>
                </div>
                }
            </Link>
        </div>
    )
}

export default Card
