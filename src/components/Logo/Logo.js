import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css'
import brain from './brain.png'

const Logo =()=>{
    return(
        <div className="ma4 mt0" style={{margin: "0px 0px 32px 21px"}}>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 94, width: 96 }} >
                <div className="Tilt-inner pa3" style={{margin: "-58px 0px 0px 0px"}}>  <img style={{paddingTop: '0px'}} alt='logo' src={brain}/>  </div>
            </Tilt>
        </div>
    );
}

export default Logo;