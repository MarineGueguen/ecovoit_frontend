import * as Yup from "yup";

export const DEFAULT_BOOKING_VALUES = {
  journeyId: null,
  seats: 1,
  comment: "",
};

export const SCHEMA_FROM_BOOKING = Yup.object().shape({
  seats: Yup.number().min(1,'Merci de renseigner le nombre de passager.')
    .required('Merci de renseigner le nombre de passager.'),
});