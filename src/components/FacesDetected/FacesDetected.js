import React from 'react';

const FacesDetected=({numFaces})=>{
    return(
        <div className='white f3' style={{margin: "20px", color:"black"}}>
            {`Faces Detected `}
            <div className='white f1' style={{color:"black"}}>
            {numFaces}
            </div>
            
        </div>
    );
}

export default FacesDetected;