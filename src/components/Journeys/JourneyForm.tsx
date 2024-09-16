import { FC, memo, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import * as Yup from "yup";

import {
  AddJourneyOnCompleted,
  AddJourneyValues,
  CheckboxProps,
  LabelProps,
  ModalProps,
  OnCheckedProps,
  Option,
  SelectProps,
  StartDateProps,
  TargetProps,
  Vehicle
} from "../../types/Journey";

import { FIND_USER } from "../../constants/shared/users.constants";
import { ADD_JOURNEY, PLACE_NB } from "../../constants/journeys";

const AddJourneyForm: React.FC = () => {
  const [sendMutation] = useMutation(ADD_JOURNEY);

  const { data } = useQuery(FIND_USER);
  const vehicles = data?.findUser?.vehicles.map((v: Vehicle) => ({ value: v.id, label: v.model }));

  const [modalOpen, setModalOpen] = useState(false);

  const [options, setOptions] = useState({
    isInstantBookable: true,
    isSmoker: true,
    isTalkative: true,
    isMusicLover: true
  });

  const initialValues: AddJourneyValues = {
    isInstantBookable: options.isInstantBookable,
    isSmoker: options.isSmoker,
    isTalkative: options.isTalkative,
    isMusicLover: options.isMusicLover,
    startDate: '2023-04-21',
    startTime: '23:05',
    startCity: '',
    endCity: '',
    seatsAvailable: '',
    carId: '',
    comment: '',
  };

  const SCHEMA_FORM_JOURNEY = Yup.object().shape({
    startCity: Yup.string()
      .required('Merci de renseigner la ville de départ.'),
    endCity: Yup.string()
      .required('Merci de renseigner la ville d\'arrivée.'),
    carId: Yup.string()
      .required('Merci de choisir une voiture.'),
  });

  const startDateTime = ({ date, time }: StartDateProps) => {
    return `${date} ${time}`;
  };

  const onAddingJourney = (values: AddJourneyValues) => {
    sendMutation({
      variables: {
        "createJourneyInput": {
          "start_date_time": startDateTime({ date: values.startDate, time: values.startTime }),
          "is_instant_bookable": options.isInstantBookable,
          "is_smoking_allowed": options.isSmoker,
          "is_talkative": options.isTalkative,
          "is_music_lover": options.isMusicLover,
          "seats_available": parseInt(values.seatsAvailable),
          "carId": parseInt(values.carId),
          "comment": values.comment,
          "startPoint": {
            "city": values.startCity,
          },
          "endPoint": {
            "city": values.endCity,
          },
        },
      },
      onCompleted: (data: AddJourneyOnCompleted) => {
        if (data.createJourney) {
          setModalOpen(true)
        }
      },
    });
  };

  const onChecked = useCallback(({ id, checked }: OnCheckedProps) => setOptions(i => ({
    ...i,
    [id]: checked,
  })), []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SCHEMA_FORM_JOURNEY}
      onSubmit={onAddingJourney}
    >
      <Form className="p-8 mx-auto">
        <h1 className="text-4xl mb-6 flex justify-center">
          Je crée mon trajet
        </h1>
        <div className="mb-2 w-full flex flex-col mt-5">
          <Label id="departure" label="D'où partez vous ?" />
          <Field component={JourneyField} name="startCity" placeholder="Ville de départ" type="text" required />
          <ErrorMessage name="startCity" render={msg => <div className="text-xs text-custom-red pl-1">{msg}</div>} />
        </div>

        <div className="mb-2 w-full flex flex-col mt-5">
          <Label id="destination" label="Où allez vous ?" />
          <Field component={JourneyField} name="endCity" placeholder="Ville d'arrivée" type="text" required />
          <ErrorMessage name="endCity" render={msg => <div className="text-xs text-custom-red pl-1">{msg}</div>} />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-2 mt-5">
          <div className="w-full flex flex-col">
            <Label id="start_date" label="Date de départ :" />
            <Field component={JourneyField} name="startDate" type="date" required />
          </div>

          <div className="w-full flex flex-col">
            <Label id="start_time" label="Heure de départ :" />
            <Field component={JourneyField} name="startTime" type="time" required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-2 mt-5">
          <div className="w-full flex flex-col">
            <Label id="vehicle" label="Quel véhicule souhaitez-vous utiliser ?" />
            <Field component={Select} name="carId" options={vehicles} required />
            <Link to="/profil/vehicules" className="mt-1 text-sm hover:text-custom-green-1 underline text-custom-orange">
              Ajouter un nouveau véhicule
            </Link>
          </div>

          <div className="w-full flex flex-col">
            <Label id="seats_available" label="Combien de sièges seront disponibles ?" />
            <Field component={Select} name="seatsAvailable" options={PLACE_NB} required />
          </div>
        </div>

        <div className="mb-2 mt-5">
          <Label id="options" label="Les options :" />
          <Checkbox
            label="Réservation automatique"
            tooltip="Valide automatiquement les réservations sur ce trajet."
            checked={options.isInstantBookable}
            id="isInstantBookable"
            onChecked={onChecked}
          />
          <Checkbox
            label="Fumeur"
            tooltip="Autorise les voyageurs à fumer à bord."
            checked={options.isSmoker}
            id="isSmoker"
            onChecked={onChecked}
          />
          <Checkbox
            label="Discuter pour passer le temps"
            tooltip="A cocher si vous aimeriez discuter pendant votre trajet."
            checked={options.isTalkative}
            id="isTalkative"
            onChecked={onChecked}
          />
          <Checkbox
            label="Écouter de la musique"
            tooltip="A cocher si vous souhaitez écouter de la musique."
            checked={options.isMusicLover}
            id="isMusicLover"
            onChecked={onChecked}
          />
        </div>

        <div className="mb-4 w-full flex flex-col mt-5">
          <Label id="comment" label="Un commentaire concernant le trajet ?" />
          <Field
            id="comment"
            name="comment"
            component="textarea"
            className="h-24 w-full px-3 py-2 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-custom-green-1 focus:ring-custom-green-1 invalid:border-custom-red focus:invalid:border-custom-red focus:invalid:ring-custom-red"
          />
        </div>

        <button
          type="submit"
          className="bg-custom-orange text-black px-10 py-2 rounded-xl hover:bg-custom-green-1 flex justify-center mx-auto"
        >
          En route !
        </button>
        {modalOpen && <Modal setModalOpen={setModalOpen} />}
      </Form>
    </Formik>

  );
};

const Checkbox = memo(({ label, tooltip, checked, id, onChecked }: CheckboxProps) => {
  const _onChange = useCallback(({ target: { checked } }: TargetProps) => onChecked({ id, checked }), [onChecked, id]);

  return (
    <div className="flex items-center justify-between mt-2 ml-4">
      <div className="flex items-center">
        <label htmlFor="option" className="mr-2">
          {label} :
        </label>
        <div className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-custom-orange hover:border-transparent hover:bg-custom-orange hover:text-[#FFEEAD] transition-colors duration-300 tooltip">
          <span className="text-custom-orange font-bold">?</span>
          <span className="tooltip-text bg-custom-orange text-[#FFEEAD] p-1 rounded-lg absolute -mt-8 ml-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
            {tooltip}
          </span>
        </div>
      </div>
      <div className="ml-auto">
        <div>
          <label className="relative inline-flex cursor-pointer">
            <input
              id={id}
              type="checkbox"
              checked={checked}
              onChange={_onChange}
              className="sr-only peer"
            />
            <div className="w-9 h-5 rounded-full peer dark:bg-custom-red peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-[#96CEB4]"></div>
          </label>
        </div>
      </div>
    </div>
  )
});

const Label = memo(({ id, label }: LabelProps) => {
  return (
    <label htmlFor={id}>{label}</label>
  )
})

const JourneyField: FC<FieldProps> = memo(({ field, form, ...props }) => {
  return (
    <input className="input-form" {...field} {...props} />
  );
});

const Select: FC<SelectProps & FieldProps> = memo(({ field, form: { touched, errors }, options, ...props }) => {
  return (
    <>
      <select className="input-form" {...field} {...props}
      >
        {field.name === 'carId' && <option value="" selected disabled hidden>Choisir une voiture</option>}
        {(options || []).map((o: Option) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {
        touched[field.name] &&
        errors[field.name] && <ErrorMessage name={field.name} render={msg => <div className="text-xs text-custom-red">{msg}</div>} />
      }
    </>
  );
});

const Modal = memo(({ setModalOpen }: ModalProps) => {
  const navigate = useNavigate();

  const onClick = () => {
    setModalOpen(false);
    navigate('/connexion')
  };

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 p-6 rounded-lg shadow-lg relative flex flex-col w-full bg-[#FFEEAD] outline-none focus:outline-none">
          <div className="flex items-start justify-center p-5">
            <h3 className="text-3xl font-semibold text-stone-800">
              Votre trajet a été sauvegardé !
            </h3>
          </div>
          <div className="flex items-center justify-center p-6">
            <button
              className="text-stone-800 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={onClick}
            >
              Retour à la page principale
            </button>
            <button
              className="bg-custom-green-2 text-white active:bg-custom-green-2 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
            >
              Voir mon trajet
            </button>
          </div>
        </div>
      </div>
    </div>
  )
});

export default AddJourneyForm;