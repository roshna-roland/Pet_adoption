import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import { useContext, useState } from "react";
import Modal from "./Modal";
import AdoptedPetContext from "./AdoptedPetContext";

const Details = () => {
  const [showModel,setShowModel]=useState(false);
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [_,setAdoptedPet]= useContext(AdoptedPetContext);
  const { id } = useParams();
  const results = useQuery(["details", id],fetchPet);

  if(results.isLoading){
    return(
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="details">
      <Carousel images={pet.images}></Carousel>
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {`${pet.animal} - ${pet.breed} - ${pet.city}, ${pet.state}`}
          <button onClick={()=> setShowModel(true)}> Adopt {pet.name}</button>
          <p>{pet.description} </p>
          {
            showModel ?
            (
              <Modal>
                <div>
                  <h1>would you like to adopt {pet.name}?</h1>
                  <div className="buttons">
                    <buttons onClick={() => {
                      setAdoptedPet(pet);
                      navigate("/");
                    }}>yes</buttons>
                    <button onClick={() => setShowModel(false)}>No</button>
                  </div>
                </div>
              </Modal>
            ):null
          }
        </h2>
      </div>
    </div>
  );
};

function DetailsErrorBoundary(props){
  return (
    <ErrorBoundary >
      <Details {...props} />
    </ErrorBoundary>
  )
}

export default DetailsErrorBoundary;