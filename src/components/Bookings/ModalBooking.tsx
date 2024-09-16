import { FC } from "react";
import { useMutation } from "@apollo/client";

import { Field, Formik, FieldProps, ErrorMessage, Form } from 'formik';

import { PASSENGERS_NB, BOOK_JOURNEY} from "../../constants/bookings";
import { SCHEMA_FROM_BOOKING } from "../../constants/shared/bookings.constants";
import { BookingValues, BookingOnCompleted, LabelProps, SelectProps, Option } from "../../types/Booking";

const ModalBooking = ({travel, endDate, startTime, journeyId, setShowBookingModal, setShowModal }: 
  {
    travel : string;
    endDate : string;
    startTime : string;
    journeyId : string | number;
    setShowBookingModal : (value : boolean) => void;
    setShowModal : (value : boolean) => void;
  }
  ) => {
  const [sendMutation] = useMutation(BOOK_JOURNEY);

  const initialValues: BookingValues = {
    journeyId: +journeyId,
    seats: 0,
    comment: "",
  };
  
  const handleBooking = (values: BookingValues) => {
    if (values.seats > 0) {
    sendMutation({
      variables: {
        bookingInfos: {
          "journeyId": +journeyId,
          "seats": +values.seats,
          "comment": values.comment,
        },
      },
      onCompleted: (data: BookingOnCompleted) => {
        if (data.bookJourney) {
          setShowBookingModal(false);
          setShowModal(true);
        }
      },
    });}
  };

  return (
      <Formik
        initialValues={initialValues}
        validationSchema={SCHEMA_FROM_BOOKING}
        onSubmit={handleBooking}
      >
        <>
        <Form>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">

            <div className="relative w-auto my-6 mx-auto max-w-6xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 bg-[#FFEEAD] border-solid rounded-t">
                  <h3 className="text-3xl font-semibold">Confirmer votre réservation</h3>
                </div>

                <div className="p-6 text-center flex-auto bg-[#FFEEAD]">
                  <p className="my-4 text-black text-lg leading-relaxed">
                    Voulez vous réserver ce trajet à destination de <b>{travel}</b> ?
                  </p>
                  <p className="my-4 text-center text-black text-lg leading-relaxed">
                  <b>Départ</b> à {startTime} - <b>Arrivée</b> à {endDate}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 items-center p-6 bg-[#FFEEAD]">
                  <Label id="seats" label="Combien de passagers êtes vous ?" />
                  <Field component={Select} name="seats" options={PASSENGERS_NB} />
                </div>
                <ErrorMessage name={'seats'} component={"p"} className='text-custom-red bg-[#FFEEAD] text-center' />

                <div className="flex flex-col gap-4 p-6 bg-[#FFEEAD]">
                  <Label id="comment" label="Un commentaire concernant votre réservation ?" />
                  <Field
                    id="comment"
                    name="comment"
                    component="textarea"
                    className="h-24 w-full"
                  />
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6  border-solid bg-[#FFEEAD] border-slate-200 rounded-b">

                  <button onClick= { () => setShowBookingModal(false) }
                    className="text-black-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    >
                    Annuler
                  </button>

                  <button
                    className="bg-[#96CEB4] text-white  active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    >
                    Réserver 
                  </button >
                  
                </div>
                
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </Form>
      </>  
    </Formik>

  );
};

const Label = ({ id, label }: LabelProps) => {
  return (
    <label htmlFor={id}>{label}</label>
  );
};

const Select: FC<SelectProps & FieldProps> = ({ field, form: { touched, errors }, options,  ...props }) => {
  return (
    <>
      <select className="px-4 py-2 input-form"   {...field} {...props}
      >
        {field.value === 0 && <option hidden>Choisir le nombre de passager</option>}
        {(options || []).map((o: Option) => (
          <option key={o.value} value={+o.value}>{o.label}</option>
        ))}
      </select>
    </>
  );
};

export { ModalBooking };