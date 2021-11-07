import React from 'react'

const Navigation = ({onRouteChange, isSignedIn}) =>{
    if(isSignedIn){
        return(
            <div>
            <nav style={{display: 'flex', justifyContent:'flex-end'}}>
                <p onClick={() => onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">Sign Out</p>
                
            </nav>
            <nav style={{display: 'flex', justifyContent:'flex-end',margin:"-25px 4px 12px 0px",color:"#72722b"}}>
            <a  target="_blank" rel="noreferrer" href="https://docs.google.com/document/d/1MuvHRtHVq6WMvGC7FkMSPn40Wwk-zh0m/edit?usp=sharing&ouid=112941190821371349563&rtpof=true&sd=true">Reference JPG url</a>
            </nav>
            </div>
        );
    }
    else{
        return(
            <nav style={{display: 'flex', justifyContent:'flex-end'}}>
                <br></br>
                <br></br>
                <br></br>
            </nav>
        );       
    }
}
export default Navigation;