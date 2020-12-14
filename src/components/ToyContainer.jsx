import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  const renderToys = (toys) => {
    return toys.map(toy => {
      return <ToyCard key={toy.id} toy={toy} donateToy={props.donateToy} handleLikes={props.handleLikes} />
    })
  }

  return(
    <div id="toy-collection">
      {renderToys(props.toys)}
    </div>
  );
}

export default ToyContainer;
