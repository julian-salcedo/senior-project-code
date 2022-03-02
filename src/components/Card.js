import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/Card.css'

function Card({title,image,author,page}) {
    return (
        <div className='card-container'>
            <div className='image-container'>
                <img src={image} alt='image of a book' />
            </div>
            <div className='card-title'>
                <h3>{title}</h3>
            </div>
            <div className='card-body'>
                <p>{author}</p> 
            </div>
            <Link to={page}> View More</Link>
        </div>
    )
}

export default Card
