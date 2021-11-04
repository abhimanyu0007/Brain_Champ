import React from 'react';
import './FaceRecognition.css'

const FaceRecognition =({imageUrl, boxes})=>{
    // return(
    //     <div className="center ma">
    //         <div className="absolute mt2">
    //             <img id="inputimage" alt={imageUrl} src={imageUrl} width="500px" height="auto"/>
    //             <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
    //         </div>
    //     </div>
    // );

    const boundingBoxes = boxes.map((box, i) => {
        return (
            <div  className='bounding-box' key={i}
                style={{
                    top: box.topRow,
                    right: box.rightCol,
                    bottom: box.bottomRow,
                    left: box.leftCol
                    }}
            ></div>
        );
    });
    return (
        <div className='flex justify-center ma3'>
          <div className='relative'>
            <img id='inputimage' className='db' src={imageUrl} alt='' width='700px' heigh='auto'/>
            {boundingBoxes}
          </div>
        </div>
      );
}

export default FaceRecognition;