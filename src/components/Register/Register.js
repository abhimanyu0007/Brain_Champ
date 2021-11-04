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

    onSubmitSignIn =() =>{
        console.log(this.state);
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
            // .then(response =>{ 
            //     console.log('response',response.json());
            //     response.json()})
            .then(user =>{
                //for below line '!==0' is also correct, but don't write '===true' cond
                //wrote user.id so that it doesn't go directly on home page without registering, to understand it uncomment console.log
                //(response()) and without filling anything click register, you'll see object in promise will be blank and hence below
                //user.id will also get false as it is blank.

                //you can't write only user bcouz if user is blank then it returns blank object and user will become through bcouz
                //someting is getting returned, so use user.id.
                if(user.id){
                    //instead of user.id, user.name or user.password is also correct.
                    //you can't console.log(user.id) bcouz you are using synchronous way and promises are asynchronous.
                    this.props.loadUser(user)
                    this.props.onRouteChange('home');
                }
            })
        }
    render(){
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" name="name" id="name" onChange={this.onNameChange}/>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" name="email-address" id="email-address" onChange={this.onEmailChange}/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" name="password" id="password" onChange={this.onPasswordChange}/>
                            </div>
                        </fieldset>
                        <div className="">
                            {/* below home is used to run else statement used in app.js in Signin component, or you can take anything
                            instead of home except Signin to make if statement false. */}
                            <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" value="Register"/>
                        </div>
                    </div>
                </main>
            </article>
        );
    }   
}

export default Register;