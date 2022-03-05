import React from 'react'
import Card from './Card';
import DefaultCover from '../assets/random-book-cover.jpg';

function TempFlexBooks() {
  return (
    <div className='wrapper'>
        <Card image={DefaultCover} title='Test Book' author='person' />
        <Card image={DefaultCover} title='Test Book' author='person' />
        <Card image={DefaultCover} title='Test Book' author='person' />
        <Card image={DefaultCover} title='Test Book' author='person' />
        <Card image={DefaultCover} title='Test Book' author='person' />
    </div>
  )
}

export default TempFlexBooks