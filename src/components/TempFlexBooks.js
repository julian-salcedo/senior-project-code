import React from 'react'
import Card from './Card';
import DefaultCover from '../assets/random-book-cover.jpg';

function TempFlexBooks() {
  return (
    <div className='wrapper'>
        <Card image={DefaultCover} title='Test Book' author='person' dueDate={new Date()} />
        <Card image={DefaultCover} title='Test Book' author='person' dueDate={new Date(2022, 2, 4)}/>
        <Card image={DefaultCover} title='Test Book' author='person' dueDate={new Date(2022, 2, 6)}/>
        <Card image={DefaultCover} title='Test Book' author='person' dueDate={new Date(2022, 10, 6)}/>
        <Card image={DefaultCover} title='Test Book' author='person' dueDate={new Date(2020, 6, 4)}/>
    </div>
  )
}

export default TempFlexBooks