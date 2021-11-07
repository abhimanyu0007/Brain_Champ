import React,{Component} from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
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

  calculateFaceLocation= (apiData)=>{
    const regions= apiData.outputs[0].data.regions;
    const image= document.getElementById("inputimage");
    const width= Number(image.width);
    const height= Number(image.height);

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
  }
  displayFaceBox= (boxes)=>{
    this.setState({boxes: boxes});
  }
  onInputChange =(event)=>{
    this.setState({input: event.target.value});
  }
  
  onButtonSubmit =()=>{
    this.setState({imageUrl: this.state.input});
      fetch('http://localhost:3000/imageurl',{
        method: 'post',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            input: this.state.input
        })
      }).then(response => response.json())
    
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
        this.setState(Object.assign(this.state.user,{entries: count_value }))
      })
      .catch(console.log)
    }
    this.displayFaceBox(this.calculateFaceLocation(response))
    })
  .catch(err=>console.log(err));
  }
  
  onRouteChange =(route) =>{
    if(route === 'signin'){
      this.setState(initialState);
    }
    else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }
    render(){

    return (
      <div className="App">
        <Particles className="particles"
              params={particlesOptions}
            />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
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
