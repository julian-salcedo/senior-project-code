import React from 'react'
import '../styles/Footer.css'
import InstagramIcon from '@material-ui/icons/Instagram'
import TwitterIcon from '@material-ui/icons/Twitter'
import FacebookIcon from '@material-ui/icons/Facebook'
import YouTubeIcon from '@material-ui/icons/YouTube'

function Footer() {
  return (
    <div className='footer'>
      <h3>McFatter Technical High School</h3>
      <p>6500 Nova Drive</p>
      <p>Davie,FL 33317</p>
      <p>754.321.5700</p>
      <div className='socialMedia'>
        <a href='https://www.facebook.com/McFatterTechnicalHighSchool/'>
          <FacebookIcon />
        </a>
        <a href='https://www.instagram.com/mcfattertech'>
          <InstagramIcon /> 
        </a>
        <a href='https://twitter.com/mcfatter_tech'>
          <TwitterIcon />
        </a>
        <a href='https://www.youtube.com/mcfattertechcollege'>
          <YouTubeIcon />
        </a>
      </div>
      <p>&copy; 2022 mcfatterlibrary.com</p>
    </div>
  )
}

export default Footer