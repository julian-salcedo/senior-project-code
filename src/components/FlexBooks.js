import React from 'react'
import Card from './Card.js';
import DefaultCover from '../assets/random-book-cover.jpg';
import '../styles/FlexBooks.css';

function FlexBooks() {
  return (
    <div className='wrapper'>
        <Card className='card' image={DefaultCover} title='Test Book' author='person' />
        <Card className='card' image={DefaultCover} title='Test Book' author='person' />
        <Card className='card' image={DefaultCover} title='Test Book' author='person' />
        <Card className='card' image={DefaultCover} title='Test Book' author='person' />
        <Card className='card' image={DefaultCover} title='Test Book' author='person' />
    </div>
  )
}

export default FlexBooks