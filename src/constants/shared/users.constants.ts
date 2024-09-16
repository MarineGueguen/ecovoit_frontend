import { gql } from "@apollo/client";
import * as Yup from "yup";

export const FIND_USER = gql`
  query Query {
    findUser {
      id
      biography
      created_at
      date_of_birth
      first_name
      email
      is_admin
      last_name
      phone_number
      vehicles {
        id
        model
      }
    }
  }
`;
export const CHECK_TOKEN = gql`
  query Query {
    checkToken {
      id
      email
      is_admin
    }
  }
`;

export const DEFAULT_VALUES_REGISTER = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirmPassword: "",
  date_of_birth: "",
};

export const SCHEMA_FORM_REGISTER = Yup.object().shape({
  last_name: Yup.string()
    .required("Le nom est obligatoire.")
    .matches(/^[\p{L}\s]{2,}$/u, "Le nom n'est pas au bon format."),
  first_name: Yup.string()
    .required("Le prénom est obligatoire.")
    .matches(/^[\p{L}\s]{2,}$/u, "Le prénom n'est pas au bon format."),
  date_of_birth: Yup.string().required(
    "Veuillez entrer votre date de naissance."
  ),
  email: Yup.string()
    .required("L'adresse email est obligatoire.")
    .email("Veuillez entrer un email valide. "),
  password: Yup.string()
    .required("Le mot de passe est obligatoire.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Votre mot de passe doit contenir au minimum 8 caratères dont une majuscule, une minuscule, un chiffre et un caractère spécial."
    ),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "Les mots de passe ne correspondent pas."
    )
    .required("La confirmation du mot de passe est obligatoire."),
});


export const DEFAULT_VALUES_LOGIN = {
  email: '',
  password: '',
};

export const SCHEMA_FORM_LOGIN = Yup.object().shape({
  email: Yup.string()
    .email('Email invalide')
    .required('Merci de renseigner votre email.'),
  password: Yup.string()
    .required('Merci de renseigner votre mot de passe.'),
});
