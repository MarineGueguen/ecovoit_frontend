import { memo, useCallback } from "react";
import { useMutation } from "@apollo/client";

import { UNBOOK_JOURNEY} from "../../constants/bookings";
import { JourneyCardInformations } from "../../types/Journey";

const ModalUnbooking = ({journey, setShowUnbookingModal }: 
  {
    journey : JourneyCardInformations;
    setShowUnbookingModal : (value : boolean) => void;
  }
  ) => {
  const [sendMutation] = useMutation(UNBOOK_JOURNEY);
  
  const handleUnbooking = useCallback(() => {
    sendMutation({
      variables: {
        "journeyId": parseInt(journey.id)
      },
      onCompleted: () => {
        window.location.reload()
      }
    });
    setShowUnbookingModal(false);
  }, [journey.id, sendMutation, setShowUnbookingModal]);

  const onGoBack = useCallback(() => {
    setShowUnbookingModal(false);
  }, [setShowUnbookingModal]);

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
    <div className="relative w-1/2 my-6 mx-auto">
      <div className="border-0 p-6 rounded-lg shadow-lg relative flex flex-col w-full bg-[#FFEEAD] outline-none focus:outline-none">
        <div className="flex items-start justify-center p-5">
          <h3 className="text-3xl font-semibold text-stone-800 text-center">
            Êtes-vous sûr de vouloir annuler votre réservation ?
          </h3>
        </div>
        <div className="flex items-center justify-center p-6">
          <button
            className="text-stone-800 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={onGoBack}
          >
            Retour
          </button>
          <button
            className="bg-custom-green-2 text-white active:bg-custom-green-2 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={handleUnbooking}
          >
            Annuler ma réservation
          </button>
        </div>
      </div>
    </div>
  </div>

  );
};

export default memo(ModalUnbooking);