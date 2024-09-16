import { Formik, Form, Field } from 'formik';
import { DEFAULT_SEARCH_JOURNEY_VALUES, SCHEMA_FROM_SEARCH_JOURNEY } from '../../constants/shared/journeys.constants';

import { FaMapMarkerAlt, FaFlag } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';
import { SearchJourneyValues } from '../../types/Journey';

type Props = {
    handleSearchJourneys: (values: SearchJourneyValues) => void,
}

const SearchJourneyForm = ({ handleSearchJourneys }: Props) => {

    return (
        <div className="bg-[url('./../assets/tree-road.jpg')] bg-cover bg-center">
            <div className="bg-white bg-opacity-70 py-10 lg:py-16 px-4 text-center">
                <h2 className="text-3xl font-semibold">
                    ROULONS ENSEMBLE !
                </h2>
                <h3 className="text-xl py-6 font-semibold">
                    Où allons-nous ?
                </h3>
                <Formik
                    initialValues={DEFAULT_SEARCH_JOURNEY_VALUES}
                    validationSchema={SCHEMA_FROM_SEARCH_JOURNEY}
                    onSubmit={handleSearchJourneys}
                >
                    {props => (
                        <Form className='py-6'>
                            <div className="flex flex-col lg:flex-row bg-white mx-auto lg:w-fit max-w-sm lg:max-w-none gap-2 p-2 rounded border-2 border-custom-red">
                                <div className='flex items-center gap-2'>
                                    <FaMapMarkerAlt />
                                    <Field
                                        name="start_point"
                                        type="text"
                                        placeholder="Lieu de départ"
                                        className="p-1 focus:outline-none focus:ring-2 focus:rounded ring-custom-green-1"
                                    />

                                </div>
                                <div className='flex items-center gap-2'>
                                    <FaFlag />
                                    <Field
                                        name="end_point"
                                        type="text"
                                        placeholder="Lieu d'arrivée"
                                        className="p-1 focus:outline-none focus:ring-2 focus:rounded ring-custom-green-1"
                                    />

                                </div>
                                <div className='flex items-center gap-2'>
                                    <IoIosPeople />
                                    <Field
                                        name="seats"
                                        type="number"
                                        placeholder="Nombre de personnes"
                                        className="p-1 focus:outline-none focus:ring-2 focus:rounded ring-custom-green-1"
                                    />

                                </div>
                                <div className='flex items-center'>
                                    <Field
                                        name="date"
                                        type="date"
                                        placeholder="A quelle date ?"
                                        className="p-1 focus:outline-none flex-row-reverse gap-2"
                                    />

                                </div>
                            </div>
                            <p className='text-custom-red text-xl font-medium min-h-[80px] py-6'>{Object.keys(props.errors).length > 0 ? "Veuillez compléter tous les champs pour lancer la recherche" : ""}</p>
                            <button
                                type="submit"
                                className="bg-custom-green-2 hover:bg-custom-green-1 transition-all rounded-full py-2 px-4 text-xl font-medium">
                                Rechercher un trajet
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default SearchJourneyForm;