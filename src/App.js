import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    display: false,
    toys: []
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  createToy = (newToy) => {
    const reqMethod = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newToy)
    }

    fetch('http://localhost:3000/toys', reqMethod)
    .then(res => res.json())
    .then(newToy => {
      let toys = [...this.state.toys, newToy]
      this.setState({
        toys: toys,
        display: false
      })
    })
  }

  donateToy = (toyId) => {
    const reqMethod = {
      method: 'DELETE',
    }

    fetch(`http://localhost:3000/toys/${toyId}`, reqMethod)

    this.setState({
      toys: this.state.toys.filter(toy => toy.id !== toyId)
    })
  } 

  handleLikes = (toy) => {
    let toyId = toy.id
    const reqMethod = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(toy)
    }

    fetch(`http://localhost:3000/toys/${toyId}`, reqMethod)
    .then(res => res.json())
    .then(updatedToy => {
      const updatedToys = [...this.state.toys]
      this.setState({
        toys: updatedToys.map(toy => {
          return toy.id === updatedToy.id ? {...toy, ...updatedToy} : toy
        })
      })
    })
  }

  componentDidMount(){
    fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(data => 
      this.setState({
        toys: data
      })
    )
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm newToy={this.createToy} />
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} donateToy={this.donateToy} handleLikes={this.handleLikes} />
      </>
    );
  }

}

export default App;
