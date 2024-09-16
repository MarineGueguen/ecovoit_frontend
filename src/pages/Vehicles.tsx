import { useState } from "react";
import { useMutation } from "@apollo/client";
import VehiculesList from "../components/Profil/VehiculesList";
import NewVehiculeForm from "../components/Profil/NewVehiculeForm";
import { ADD_VEHICLES } from "../constants/journeys";
import { createCarInput } from "../types/Car";

export type creationVehiculeMessage = {
    message: string,
    className: string,
}

const Vehicles = () => {
  const [isVehiculesList, setIsVehiculesList] = useState<boolean>(true);
  const [creationVehiculeMessage, setCreationVehiculeMessage] = useState<creationVehiculeMessage>({
    message: "",
    className: "",
  });

  const [addVehicleMutation] = useMutation(ADD_VEHICLES);

  const handleSubmitNewVehicle = (values: createCarInput, reset: () => void) => {
    addVehicleMutation({
      variables: {
        createCarInput: {
          brand: values.brand,
          energy: values.energy,
          model: values.model,
          registration_number: values.registration_number,
          registration_year: values.registration_year,
          seats_number: Number(values.seats_number),
          sticker: values.sticker ? Number(values.sticker) : null,
          color: values.color && values.color.length > 0 ? values.color : null,
        }
      },
      onError: (errors) => {
        if (errors.graphQLErrors) {
          errors.graphQLErrors.map((error) => error.message.includes("duplicate") && setCreationVehiculeMessage({
            message: "Vous avez déjà ajouté ce véhicule",
            className: "text-custom-red text-xl text-center",
          }))
        }
        if (errors.networkError) {
          setCreationVehiculeMessage({
            message: "Une erreur s'est produite, veuillez réessayer",
            className: "text-custom-red text-xl text-center",
          })
        }
      },
      onCompleted: (response) => {
        if (response.createCar) {
          setCreationVehiculeMessage({
            message: "Votre véhicule a été ajouté avec succès !",
            className: "text-custom-green-2 text-xl text-center",
          })
          reset();
        }
      },
    })
  }

  return (
    <div className="grow">
      {
        isVehiculesList ?
          <VehiculesList setIsVehiculesList={setIsVehiculesList} />
          :
          <NewVehiculeForm 
            setIsVehiculesList={setIsVehiculesList} 
            handleSubmitNewVehicle={handleSubmitNewVehicle} 
            creationVehiculeMessage={creationVehiculeMessage} 
            setCreationVehiculeMessage={setCreationVehiculeMessage}
          />
      }
    </div>
  )
}

export default Vehicles;