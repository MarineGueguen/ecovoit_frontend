import * as Yup from "yup";

export const DEFAULT_SEARCH_JOURNEY_VALUES = {
  start_point: "",
  end_point: "",
  date: "",
  seats: 1,
};

export const SCHEMA_FROM_SEARCH_JOURNEY = Yup.object().shape({
  start_point: Yup.string().required(),
  end_point: Yup.string().required(),
  date: Yup.string().required(),
  seats: Yup.number().required()
}).required();