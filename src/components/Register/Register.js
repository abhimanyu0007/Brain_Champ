import React from 'react';

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state={
            email:' ',
            password:' ',
            name:' '
        }
    }
    onNameChange= (event) =>{
        this.setState({name: event.target.value})
    }

    onEmailChange= (event) =>{
        this.setState({email: event.target.value})
    }

    onPasswordChange= (event) =>{
        this.setState({password: event.target.value})
    }

    validate=()=>{
        if((!this.state.email.includes("@"))){
            console.error("invalid email");
        }
        return true;
    }

    onSubmitSignIn =() =>{
        const isValid = this.validate();
        if(isValid){
            fetch('http://localhost:3000/register',{
                method: 'post',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                    name: this.state.name
                })
            })
                .then(response => response.json())
                .then(user =>{
                    if(user.id){
                        this.props.loadUser(user)
                        this.props.onRouteChange('home');
                    }
                })
        }
    }
    render(){
        const {onRouteChange} = this.props;
        return (
            <div className="container-fluid" style={{margin: "51px 0px"}}>
                <h1 className="container" style={{fontSize:"36px",margin:"-11px 0px 0p"}}>
                    {"Create your account"}
                </h1>
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="form-label" htmlFor="exampleInputEmail1" style={{margin:"0px 215px 0px 0px"}}>Name</label>
                                <input className="form-control" style={{border:"1px solid black", background:"#c0e0ff"}} placeholder="name"
                                type="text" name="name" id="name" onChange={this.onNameChange}/>
                            </div>
                            <div className="mt3">
                                <label className="form-label" htmlFor="email-address" style={{margin:"0px 220px 0px 0px"}}>Email</label>
                                <input className="form-control" style={{border:"1px solid black", background:"#c0e0ff"}} 
                                placeholder="email" name="email-address" id="email-address" onChange={this.onEmailChange}/>
                            </div>
                            <div className="mv3">
                                <label className="form-label" htmlFor="password" style={{margin:"0px 190px 0px 0px"}}>Password</label>
                                <input className="form-control" style={{border:"1px solid black", background:"#c0e0ff"}} placeholder="password" 
                                type="password" name="password" id="password" onChange={this.onPasswordChange}/>
                            </div>
                        </fieldset>
                        <div className="">
                            <input onClick={this.onSubmitSignIn} className="btn btn-primary" 
                            type="submit" value="Register"/>
                        </div>
                        <div className="container" style={{height:"17px"}}></div>
                        <p>{"Already have an account?"}
                            <span onClick={() => onRouteChange('signin')} className="f3 link dim black underline pa3 pointer" 
                            style={{padding:"0px 2px", fontSize:"16px" ,color:"#003d93"}}>Sign In</span>
                        </p>
                    </div>
                </main>
            </article>
            </div>
        );
    }   
}

export default Register;