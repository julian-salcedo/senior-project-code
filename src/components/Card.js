import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/Card.css'

function Card({title,image,author,page}) {
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
            </Link>
        </div>
    )
}

export default Card
