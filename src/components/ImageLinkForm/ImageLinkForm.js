import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm =({onInputChange,onButtonSubmit}) =>{
    return(
        <div>
            <div className="center">
                <div className="form center pa4 br3 shadow-5" style={{background: '#4cb28f3b'}}>
                <input className="form-control" type="text" placeholder="enter valid JPG url" style={{margin:"0px 10px 0px -15px"}} onChange={onInputChange}/>
                <button type="button" className="btn btn-primary" onClick={onButtonSubmit}>Detect</button>
            </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;