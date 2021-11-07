import React from 'react';
import './Signin.css';
import  MediaQuery from 'react-responsive';

class Signin extends React.Component {
    constructor(props){
        super(props);
        this.state={
            signInEmail:' ',
            signInPassword:' '
        }
    }
    onEmailChange= (event) =>{
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange= (event) =>{
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn =() =>{
        fetch('http://localhost:3000/signin',{
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user =>{
                if(user.id){
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            })
    }
    render(){
        const {onRouteChange} = this.props;
        return (
            <div className="container-fluid" style={{margin: "51px 0px"}}>
                <MediaQuery minWidth={0} and maxWidth={385}>
                <h1 className="container" id="signinH1" style={{fontSize:"43px",margin:"-11px 0px 0p"}}>
                    {"Brain Champ"}
                </h1>
                </MediaQuery>
                <MediaQuery minWidth={385} and maxWidth={1536}>
                <h1 className="container" id="signinH1" style={{fontSize:"64px",margin:"-11px 0px 0p"}}>
                    {"Brain Champ"}
                </h1>
                </MediaQuery>

            
            <article className="br3 ba b--black-10 mv4 w-80 w-50-m w-25-l mw6 shadow-5 center" >
                <main className="pa4 black-80 container">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <input type="email" className="form-control" id="email-address" aria-describedby="emailHelp"
                                 onChange={this.onEmailChange} style={{border:"1px solid black", background:"#c0e0ff"}} placeholder="email"/>
                            </div>
                            <div className="mv3">
                                <input type="password" className="form-control" id="password" aria-describedby="emailHelp" 
                                onChange={this.onPasswordChange} style={{background:"#c0e0ff",border:"1px solid black"}} placeholder="password"/>
                            </div>
                        </fieldset>
                        <div className="">
                            <input onClick={this.onSubmitSignIn} className="btn btn-primary" type="submit" value="Sign in"/>
                        </div>
                        <div className="container" style={{height:"17px"}}></div>
                        <p id="signinP">{"Don't have an account?"}
                        <span onClick={() => onRouteChange('register')} className="f3 link dim black underline pa3 pointer" 
                            style={{padding:"0px 2px", fontSize:"16px" ,color:"#003d93"}}>Register</span>
                        </p>
                    </div>
                </main>
            </article>
            <p className="f3" style={{fontSize:"26px",fontWeight:"bold",color:"#1c3d6c"}}>
                {"Brain Champ detects faces in your picture"}
            </p>
            </div>
        );
    }   
}

export default Signin;