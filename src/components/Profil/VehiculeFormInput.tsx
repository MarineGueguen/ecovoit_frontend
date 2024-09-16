import { ErrorMessage } from 'formik';
import { creationVehiculeMessage } from '../../pages/Vehicles';

type Props = {
  inputName: string;
  inputType: string;
  label: string;
  placeholder?: string;
  optionnal?: boolean;
  options?: string[] | number[] | any[];
  values: string | number;
  setCreationVehiculeMessage: (val: creationVehiculeMessage) => void;
  handleChange: (e: React.ChangeEvent<any>) => void;
}

const VehiculeFormInput = ({ 
  inputName, 
  inputType, 
  label,
  placeholder,
  optionnal,
  options, 
  values, 
  setCreationVehiculeMessage, 
  handleChange 
}: Props) => {

  const handleChangeInputAndResetFormMessages = (e: React.ChangeEvent<any>) => {
    setCreationVehiculeMessage({
      message: "",
      className: "",
    });
    if(inputName === "registration_number") {
      if(e.target.value.length === 2 || e.target.value.length === 6) {
        e.target.value += "-"
      }
    }
    handleChange(e)
  }
  return (
    <div className='w-full flex flex-col'>
      <label htmlFor={inputName}>{label} {optionnal && <span className="italic text-sm">(optionnel)</span>}</label>
      {
        inputType === "select" ?
          <select
            id={inputName}
            name={inputName}
            value={values}
            className="py-2 border-b-2 border-custom-orange focus:border-custom-green-1 outline-none"
            onChange={handleChangeInputAndResetFormMessages}
          >
            <option hidden>{placeholder}</option>
            {
              options?.map(element => (
                typeof element === "object" ?
                <option value={element[0]} key={element[0]}>{element[1]}</option>
                :
                <option value={element} key={inputName + element}>{element}</option>
              ))
            }
          </select>
          :
          <input
            id={inputName}
            name={inputName}
            type={inputType}
            value={values}
            placeholder={placeholder}
            onChange={handleChangeInputAndResetFormMessages}
            className="py-2 border-b-2 border-custom-orange focus:border-custom-green-1 outline-none"
          />
      }
      {!optionnal && <ErrorMessage name={inputName} component={"p"} className='text-custom-red' />}
    </div>
  )
}

export default VehiculeFormInput;