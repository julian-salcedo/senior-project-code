import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/Card.css'

function Card({title,image,author,page}) {
    return (
        <div className='card-container'>
            <Link to={page}>
                <div className='image-container'>
                    <img src={image} alt='image of a book' />
                </div>
            </Link>
            <div className='card-title'>
                <h3>{title}</h3>
            </div>
            <div className='card-body'>
                <p>{author}</p> 
            </div>
        </div>
    )
}

export default Card
