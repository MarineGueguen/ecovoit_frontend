import { useNavigate } from "react-router-dom";


const Modal = ({ setShowModal }: {setShowModal : (value:boolean) => void }) => {
    const navigate = useNavigate();
  
    const onClick = () => {
      setShowModal(false);
      navigate('/profil/trajets')
    };
  
    return (
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 p-6 rounded-lg shadow-lg relative flex flex-col w-full bg-[#FFEEAD] outline-none focus:outline-none">
            <div className="flex items-start justify-center p-5">
              <h3 className="text-3xl font-semibold text-stone-800">
                Réservation confirmée !
              </h3>
            </div>
            <div className="flex items-center justify-center p-6">
              <button
                className="bg-[#96CEB4] text-white background-transparent rounded font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={onClick}
              >
               OK
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  };

  export { Modal };