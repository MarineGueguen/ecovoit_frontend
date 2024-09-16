import { AiOutlinePlus } from "react-icons/ai";

type Props = {
  setIsVehiculesList: (val: boolean) => void;
}

const VehiculesList = ({ setIsVehiculesList }: Props) => {
  return (
    <div>
      <button
        type="button"
        className=" hover:nav-active nav-link transition-all text-lg font-medium flex flex-row gap-2 items-center"
        onClick={() => setIsVehiculesList(false)}
      >
        <AiOutlinePlus /><span>Ajouter un nouveau véhicule</span>
      </button>
      <h2 className="mb-10">Bientôt une liste de véhicules !</h2>
    </div>
  )
}

export default VehiculesList;