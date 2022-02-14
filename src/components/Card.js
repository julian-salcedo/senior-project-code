import React from 'react'
import '../styles/Card.css'

function Card({title,imageUrl,body}) {
    return (
        <div className='card-container'>
            <div className='image-container'>
                <img src={imageUrl} alt='' />
            </div>
            <div className='card-title'>
                <h3>{title}</h3>
            </div>
            <div className='card-body'>
                <p>{body}</p> 
            </div>
            <button className='btn'>
                <a>
                    View More
                </a>
            </button>
        </div>
    )
}

export default Card
