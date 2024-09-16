import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaEyeSlash, FaEye } from "react-icons/fa";

import { RegisterValues } from "../types/User";
import { DEFAULT_VALUES_REGISTER, SCHEMA_FORM_REGISTER } from "../constants/shared/users.constants";


interface RegisterFormType {
  submit: (value: RegisterValues) => void;
  viewPassword: boolean;
  setViewPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterForm = ({ submit, viewPassword, setViewPassword }: RegisterFormType) => {
  return (
    <Formik
      initialValues={DEFAULT_VALUES_REGISTER}
      validationSchema={SCHEMA_FORM_REGISTER}
      onSubmit={submit}
    >
      <Form className="flex flex-col flex-wrap p-4 sm:p-8 w-full">
        <h2 className="text-center text-2xl mb-4">
          Rejoignez la communauté EcoVoit !
        </h2>

        <div className="flex flex-col sm:flex-row justify-between">
          <div className="flex flex-col my-2 sm:w-[48%]">
            <label>Nom</label>
            <Field
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Doe"
              className="block input-form"
              required
            />
            <ErrorMessage
              name="last_name"
              className="text-xs text-custom-red pl-1"
              component="div"
            />
          </div>
          <div className="flex flex-col my-2 sm:w-[48%]">
            <label>Prénom</label>
            <Field
              type="text"
              id="first_name"
              name="first_name"
              placeholder="John"
              className="block input-form"
              required
            />
            <ErrorMessage
              name="first_name"
              className="text-xs text-custom-red pl-1"
              component="div"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between">
          <div className="flex flex-col my-2 sm:w-[48%]">
            <label>Date de naissance</label>
            <Field
              type="date"
              id="date_of_birth"
              name="date_of_birth"
              className="inline-flex input-form"
              required
            />
            <ErrorMessage
              name="date_of_birth"
              className="text-xs text-custom-red pl-1"
              component="div"
            />
          </div>
          <div className="flex flex-col my-2 sm:w-[48%]">
            <label>Adresse email</label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="johndoe@mail.com"
              className="block input-form"
              required
            />
            <ErrorMessage
              name="email"
              className="text-xs text-custom-red pl-1 -mb-8"
              component="div"
            />
          </div>
        </div>
        <div className="flex flex-col my-2">
          <label>Mot de passe</label>
          <span className="flex flex-col relative items-center">
            <Field
              type={viewPassword ? "text" : "password"}
              id="password"
              name="password"
              className="block input-form w-full"
              required
            />
            <button
              type="button"
              onClick={() => setViewPassword(!viewPassword)}
              className="absolute top-2.5 right-2"
            >
              {viewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </span>
          <ErrorMessage
            name="password"
            className="text-xs text-custom-red pl-1"
            component="div"
          />
        </div>

        <div className="flex flex-col my-2">
          <label>Confirmer le mot de passe</label>
          <span className="flex flex-col relative">
            <Field
              type={viewPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              className="block input-form"
              required
            />
            <button
              type="button"
              onClick={() => setViewPassword(!viewPassword)}
              className="absolute top-2.5 right-2"
            >
              {viewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </span>
          <ErrorMessage
            name="confirmPassword"
            className="text-xs text-custom-red pl-1"
            component="div"
          />
        </div>
        <div className="text-center w-full mt-3">
          <button
            type="submit"
            className="bg-custom-green-1 focus:outline-none focus:ring py-2 px-4 rounded-full"
          >
            M'inscrire
          </button>
        </div>
      </Form>
    </Formik>
  );
};

const Register = (props: RegisterFormType) => {

  const REGISTER = gql`
    mutation Mutation($createUserInput: CreateUserInput!) {
      createUser(createUserInput: $createUserInput) {
        first_name
        last_name
        email
        password
        date_of_birth
      }
    }
  `;

  const navigate = useNavigate();
  const [viewPassword, setViewPassword] = useState(false);
  const [sendQuery] = useMutation(REGISTER, {
    onError: (error) => {
      error.graphQLErrors.map((e) => {
        if (e.message.startsWith('duplicate key value violates unique constraint')) alert("Cette adresse mail existe déjà");
        return console.log('e: ', e);
      });
    }
  });

  interface RegisterOnCompleted { createUser: object }
  const handleRegistration = (values: RegisterValues) => {
    sendQuery({
      variables: {
        "createUserInput": {
          "first_name": values.first_name,
          "last_name": values.last_name,
          "password": values.password,
          "email": values.email,
          "date_of_birth": values.date_of_birth,
        },
      },
      onCompleted: (data: RegisterOnCompleted) => {
        if (data.createUser) {
          return navigate('/connexion');
        }
      }
    });
  };
  return (
    <div className="grow lg:w-1/2 mx-auto flex items-center">
      <RegisterForm
        {...props}
        submit={handleRegistration}
        viewPassword={viewPassword}
        setViewPassword={setViewPassword}
      />
    </div>
  );
};

export default Register;