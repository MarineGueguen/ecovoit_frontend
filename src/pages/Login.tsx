import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { Formik, Field, Form, ErrorMessage } from 'formik';

import { LOGIN } from "../constants/login";
import { LoginValues } from "../types/User.d";
import { DEFAULT_VALUES_LOGIN, SCHEMA_FORM_LOGIN } from "../constants/shared/users.constants";
import { LOCATORS } from "../constants/tests/login";

type Props = {
    token: string;
    setToken: (value: any) => void;
}

const Login = ({ token, setToken }: Props) => {
    const navigate = useNavigate();
    const [sendMutation, { loading }] = useMutation(LOGIN);

    const handleSubmit = (values: LoginValues) => {
        sendMutation({
            variables: {
                loginInput: {
                    email: values.email,
                    password: values.password,
                }
            },
            onCompleted: (data) => {
                if (data.login !== "User not found") {
                    setToken(data.login)
                }
            }
        },
        );
    };

    useEffect(() => {
        if (token.length > 0) {
            navigate('/');
        }
    }, [token, navigate]);

    if (loading) return <p>Loading ...</p>;
    return (
        <div className="grow mx-auto flex justify-center items-center w-[50%] max-w-[650px]" data-testid={LOCATORS.login}>
            <Formik
                initialValues={DEFAULT_VALUES_LOGIN}
                validationSchema={SCHEMA_FORM_LOGIN}
                onSubmit={handleSubmit}
            >
                <Form className="text-center w-full">
                    <h1 className="text-4xl mb-12">
                        Renseignez vos identifiants
                    </h1>
                    <div className="text-start">
                        <Field
                            id="email"
                            name="email"
                            placeholder="E-mail"
                            type="email"
                            className="block input-form w-full"
                            data-testid={LOCATORS.emailInput}
                        />
                        <ErrorMessage name="email" render={msg => <div className="text-xs text-custom-red pl-1">{msg}</div>} />
                    </div>


                    <div className="text-start mt-3">
                        <Field
                            id="password"
                            name="password"
                            placeholder="Mot de passe"
                            type="password"
                            className="block input-form w-full"
                            data-testid={LOCATORS.passwordInput}
                        />
                        <ErrorMessage name="password" render={msg => <div className="text-xs text-custom-red pl-1">{msg}</div>} />
                    </div>

                    <div className="text-end mt-3 mb-6 pr-1">
                        <a href="/" className="text-sm">Mot de passe oublié ?</a>
                    </div>

                    <button
                        type="submit"
                        className="bg-custom-green-1 focus:outline-none focus:ring py-2 px-4 rounded-full"
                        data-testid={LOCATORS.loginButton}
                    >
                        Connexion
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

export default Login;