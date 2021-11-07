import React from 'react';
import  MediaQuery from 'react-responsive';

const Rank =({name, entries})=>{
    return(
        <div className="container">
            <MediaQuery minWidth={0} and maxWidth={385}>
            <p className="f3" style={{fontSize:"59px",textShadow:"4px 7px 10px #171717",textDecoration:"underline",color:"#682424"}}>
                {"Brain Champ"}
            </p>
            </MediaQuery>
            <MediaQuery minWidth={385} and maxWidth={1536}>
            <p className="f3" style={{fontSize:"67px",textShadow:"4px 7px 10px #171717",textDecoration:"underline",color:"#682424"}}>
                {"Brain Champ"}
            </p> 
            </MediaQuery>

            <div className="container" style={{height:"47px"}}></div>
            <div className="white f3">
                {`${name}, your current entry count is `}
            </div>
            <div className="white f1">
                {entries}
            </div>
        </div>
    );
}

export default Rank;