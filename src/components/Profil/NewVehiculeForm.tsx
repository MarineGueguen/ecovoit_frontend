import { Form, Formik } from 'formik';
import { BiArrowBack } from 'react-icons/bi';
import VehiculeFormInput from './VehiculeFormInput';
import { CarBrand, CarColor, Fuel } from "../../types/car.enums";
import { creationVehiculeMessage } from '../../pages/Vehicles';
import { createCarInput } from '../../types/Car';
import { SCHEMA_ADD_VEHICLE, initialVehiclesFormValues } from '../../constants/shared/vehicles.constants';

type Props = {
  setIsVehiculesList: (val: boolean) => void;
  handleSubmitNewVehicle: (values: createCarInput, reset: () => void) => void;
  creationVehiculeMessage: creationVehiculeMessage;
  setCreationVehiculeMessage: (val: creationVehiculeMessage) => void;
}

const NewVehiculeForm = ({ 
  setIsVehiculesList, 
  handleSubmitNewVehicle, 
  creationVehiculeMessage, 
  setCreationVehiculeMessage 
}: Props) => {

  const brandList = Object.values(CarBrand).filter(value => typeof value === "string");
  const fuelList = Object.values(Fuel).filter(value => typeof value === "string");
  const colorList = Object.entries(CarColor);

  return (
    <>
      <button
        type="button"
        className=" hover:nav-active nav-link transition-all text-lg font-medium flex flex-row gap-2 items-center"
        onClick={() => setIsVehiculesList(true)}
      >
        <BiArrowBack /><span>Revenir à la liste de véhicules</span>
      </button>
      <Formik
        initialValues={initialVehiclesFormValues}
        onSubmit={(values, actions) => handleSubmitNewVehicle(values, actions.resetForm)}
        validationSchema={SCHEMA_ADD_VEHICLE}
      >
        {({ handleChange, values }) => (
          <Form className='flex flex-col gap-8 py-4 sm:py-8'>
            <div className='flex flex-col sm:flex-row grow gap-8'>
              <VehiculeFormInput
                inputName="brand"
                inputType="select"
                label="Marque"
                values={values.brand}
                options={brandList}
                handleChange={handleChange}
                setCreationVehiculeMessage={setCreationVehiculeMessage}
                placeholder='Choisissez une marque'
              />
              <VehiculeFormInput
                inputName="model"
                inputType="text"
                label="Modèle du véhicule"
                values={values.model}
                handleChange={handleChange}
                setCreationVehiculeMessage={setCreationVehiculeMessage}
                placeholder='Entrez le nom de votre modèle'
              />
            </div>
            <div className='flex flex-col sm:flex-row grow gap-8'>
              <VehiculeFormInput
                inputName="registration_number"
                inputType="text"
                label="Numéro d'immatriculation"
                values={values.registration_number}
                handleChange={handleChange}
                setCreationVehiculeMessage={setCreationVehiculeMessage}
                placeholder='AA-123-AA'
              />
              <VehiculeFormInput
                inputName="registration_year"
                inputType="date"
                label="Date d'immatriculation"
                values={values.registration_year}
                handleChange={handleChange}
                setCreationVehiculeMessage={setCreationVehiculeMessage}
              />
            </div>
            <VehiculeFormInput
              inputName="seats_number"
              inputType="select"
              label="Nombre de places"
              values={values.seats_number}
              options={[1, 2, 3, 4, 5, 6]}
              handleChange={handleChange}
              setCreationVehiculeMessage={setCreationVehiculeMessage}
              placeholder='Combien de places ?'
            />
            <div className='flex flex-col sm:flex-row grow gap-8'>
              <VehiculeFormInput
                inputName="energy"
                inputType="select"
                label="Type de carburant"
                values={values.energy}
                options={fuelList}
                handleChange={handleChange}
                setCreationVehiculeMessage={setCreationVehiculeMessage}
                placeholder="Choisissez le type de carburant"
              />
              <VehiculeFormInput
                inputName="sticker"
                inputType="select"
                label="Indice Crit'Air"
                values={values.sticker}
                options={[1, 2, 3, 4, 5, 6]}
                handleChange={handleChange}
                setCreationVehiculeMessage={setCreationVehiculeMessage}
                placeholder="Numéro d'indice"
                optionnal
              />
            </div>
            <VehiculeFormInput
              inputName="color"
              inputType="select"
              label="Couleur"
              values={values.color}
              options={colorList}
              handleChange={handleChange}
              setCreationVehiculeMessage={setCreationVehiculeMessage}
              placeholder="Choisissez une couleur"
              optionnal
            />
            <button
              type='submit'
              className="bg-custom-green-1 hover:bg-custom-green-2 transition-all rounded-full py-2 px-4 text-xl font-medium w-fit mx-auto"
            >Ajouter mon véhicule</button>
          </Form>
        )}
      </Formik>
      {creationVehiculeMessage && <p className={creationVehiculeMessage.className}>{creationVehiculeMessage.message}</p>}
    </>
  )
}

export default NewVehiculeForm;