import React,{Component} from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
//import Celebrity from './components/Celebrity/Celebrity';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import FacesDetected from './components/FacesDetected/FacesDetected';
import 'tachyons';




const particlesOptions={
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState={
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  } 
}
class App extends Component{
  constructor(){
    super();
    this.state= initialState;
    
  }

  loadUser =(data) =>{
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  // componentDidMount(){
  //   fetch('http://localhost:3000/')
  //     .then(response=> response.json())
  //     .then(console.log)
  // }

  calculateFaceLocation= (apiData)=>{
    //console.log(i);
    const regions= apiData.outputs[0].data.regions;
    // if(regions === undefined){
    //   return [];
    // }

    const image= document.getElementById("inputimage");
    const width= Number(image.width);
    const height= Number(image.height);
    console.log(apiData);

    const faceLocations = regions.map(region =>{
      const box = region.region_info.bounding_box;
      return{
        leftCol: box.left_col * width,
        topRow: box.top_row * height,
        rightCol: width - (box.right_col * width),
        bottomRow: height - (box.bottom_row * height)
      };
    });
    return faceLocations;
    /////////////////////////////////*****//////////////////////////////
    // console.log(data.outputs[0].data.regions.length);
    // const clarifaiFace =  data.outputs[0].data.regions[k].region_info.bounding_box;
    // const image= document.getElementById("inputimage");
    // const width= Number(image.width);
    // const height= Number(image.height);
    // //console.log(width,height);
    // //console.log(k);
    // return{
    //   leftCol: clarifaiFace.left_col * width,
    //   topRow: clarifaiFace.top_row * height,
    //   rightCol: width - (clarifaiFace.right_col * width),
    //   bottomRow: height - (clarifaiFace.bottom_row * height) 
    // }
  }
  displayFaceBox= (boxes)=>{
    //console.log('box');
    this.setState({boxes: boxes});
  }
  onInputChange =(event)=>{
    this.setState({input: event.target.value});
  }

  // onCelebrityChange=(event)=>{
  //   this.setState({celebrityInput: event.target.value});
  // }
  // onCelebritySubmit=()=>{
  //   this.setState({celebrityImage: this.state.celebrityInput});
  //   app.models.predict(Clarifai.CELEBRITY_MODEL,this.state.input)
  //   .then(
  //     function(respons){
  //       console.log(respons);
  //     }
  //   ) 
  // }

//onPictureSubmit name looks better then onButtonSubmit
  onButtonSubmit =()=>{
    this.setState({imageUrl: this.state.input});
      fetch('http://localhost:3000/imageurl',{
        method: 'post',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({

            input: this.state.input
        })
      }).then(response => response.json())
    
    // app.models.predict(Clarifai.CELEBRITY_MODEL, this.state.input)
    // .then(
    //   function(response){
    //     console.log(response); 475328
    //   }
    // )
  //   app.models.predict(
  //   {
  //     id: "f76196b43bbd45c99b4f3cd8e8b40a8a",
  //     version: "5e026c5fae004ed4a83263ebaabec49e",
  //   },this.state.input
  // )
  .then((response)=>{
    if(response){
      fetch('http://localhost:3000/image',{
        method: 'put',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({

            id: this.state.user.id
        })
      })
      .then(response =>response.json())
      .then(count_value =>{
        //refer video 301, just after 7:32
        //count is just like reference, means entries: 0 at starting, then that 0 is just like count
        //in server.js, user.entries++ means entires object's value is incremented
        //refer .then ss in javascript folder
        this.setState(Object.assign(this.state.user,{entries: count_value }))
      })
      .catch(console.log)
    }
    // for(var i=0;i<response.outputs[0].data.regions.length;i++){
    //   this.displayFaceBox(this.calculateFaceLocation(response, i))
    // }
    this.displayFaceBox(this.calculateFaceLocation(response))
    })
  .catch(err=>console.log(err));
  }
  
  onRouteChange =(route) =>{
    if(route === 'signout'){
      this.setState(initialState);
    }
    else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }
 
  

  // componentDidMount(){
  //   if(this.state.isSignedIn){
  //     this.onRouteChange('home');
  //   }
  // }
  // UNSAFE_componentWillMount(){
  //   localStorage.getItem('route') && this.setState({
  //     route: JSON.parse(localStorage.getItem("route"))
  //   })
  // }

  // componentDidMount(){
  //   let route =localStorage.getItem('route');
  //   localStorage.setItem('route',JSON.stringify(route));

  // }

  // UNSAFE_componentWillUpdate(nextProps,nextState){
  //   localStorage.setItem('route',JSON.stringify(nextState.route));
  // }


  //for understanding .then func syntax google: .then method in javascript.
        //console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        //console.log(response);

    render(){
      // use of destructuring
      // const {isSignedIn,imageUrl, etc} = this.state;
      // "this.state.isSignedIn" can be written as only "isSignedIn"
      
    return (
      <div className="App">
        <Particles className="particles"
              params={particlesOptions}
            />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        {/* {this.state.route === 'home'
          ? 
            <div> 
              <Logo/>
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition boxes={this.state.boxes} imageUrl={this.state.imageUrl}/>
            </div>     */}
            {this.state.route === 'home'
            ? 
                <div> 
                  <Logo/>
                  <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                  <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                  <FacesDetected numFaces={this.state.boxes.length}/>
                  <FaceRecognition boxes={this.state.boxes} imageUrl={this.state.imageUrl}/>
                </div> 
            
                
          : (
            this.state.route === 'signin' ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;
