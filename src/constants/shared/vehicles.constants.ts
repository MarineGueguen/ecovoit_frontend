import * as Yup from "yup";

export const initialVehiclesFormValues = {
  brand: "",
  energy: "",
  model: "",
  registration_number: "",
  registration_year: "",
  seats_number: 0,
  sticker: 0,
  color: ""
};

export const SCHEMA_ADD_VEHICLE = Yup.object().shape({
  brand: Yup.string().required("Veuillez entrer la marque de votre véhicule"),
  energy: Yup.string().required("Veuillez entrer le type de carburant de votre véhicule"),
  model: Yup.string().required("Veuillez entrer le modèle de votre véhicule"),
  registration_number: Yup.string().matches(/^(?!ss|ww|.[iou]|[iou].)([a-z]{2})[-\s]?(\d{3})[-\s]?(?!ss|ww|.[iou]|[iou].)([a-z]{2})$/i, "Le format AA-123-AA n'est pas respecté.").required("Veuillez entrer le numéro d'immatriculation de votre véhicule"),
  registration_year: Yup.date().required("Veuillez entrer la date d'immatriculation de votre véhicule"),
  seats_number: Yup.number().min(1, "Veuillez entrer le nombre de place que comporte votre véhicule").required(),
  sticker: Yup.number(),
  color: Yup.string(),
}).required();