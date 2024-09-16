import { useState, } from 'react';
import { FaLocationArrow, FaPlus } from 'react-icons/fa';
import { TbBook, TbBookOff } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { ModalBooking } from "../Bookings/ModalBooking";
import ModalUnbooking from '../Bookings/ModalUnbooking';
import { Modal }  from "../Bookings/ModalBookingConfirmed";
import { LOCATORS } from '../../constants/tests/journeysList';
import { JourneyCardInformations } from '../../types/Journey';


type Props = {
  journey: JourneyCardInformations
  journeySearch?: boolean | undefined
  journeysToCome?: boolean | undefined
}

const JourneyCard = ({ journey, journeySearch, journeysToCome }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showUnbookingModal, setShowUnbookingModal] = useState(false);

  const startDate = new Date(journey.start_date_time) as any | Date;
  const endDate = new Date(journey.duration) as any | Date;
  const travelDuration = new Date(Math.abs(endDate - startDate));
  
  const startHour = ("0" + startDate.getHours()).slice(-2);
  const startMinute = ("0" + startDate.getMinutes()).slice(-2);
  const endHour = ("0" + endDate.getHours()).slice(-2);
  const endMinute = ("0" + endDate.getMinutes()).slice(-2);
  const durationHour = ("0" + travelDuration.getHours()).slice(-2);
  const durationMinute = ("0" + travelDuration.getMinutes()).slice(-2);

  return (
    <div
      className='my-2 mx-auto p-4 border-2 border-custom-green-1 rounded-2xl shadow-lg bg-white text-[#292524]'
      data-testid={LOCATORS.journeyCard}
    >
      <div className='flex flex-col sm:flex-row w-full items-center justify-between gap-3 sm:gap-8 '>
        <ul className='flex flex-1 flex-col items-center text-center font-medium w-full sm:w-fit'>
          {!journeySearch && <h1 className='text-md pb-1 w-full text-left font-normal'>Voyage du {startDate.toLocaleDateString("fr")}</h1>}
          <li className='flex text-lg w-full'>
            <p className='flex-1'>{journey.start_point.city}</p>
            <div className='w-[64px] sm:w-[96px]'></div>
            <p className='flex-1'>{journey.end_point.city}</p>
          </li>
          <li className='flex items-center text-center w-full'>
            <p className='flex-1'>{startHour}h{startMinute}</p>
            <div className='w-[64px] sm:w-[96px] h-1 bg-custom-orange relative'>
              <div className=' h-2 w-2 rounded-full border-custom-orange bg-white border-2 absolute bottom-1/2 translate-y-1/2'></div>
              <div className=' h-2 w-2 rounded-full border-custom-orange bg-white border-2 absolute bottom-1/2 right-0 translate-y-1/2'></div>
            </div>
            <p className='flex-1'>{endHour}h{endMinute}</p>
          </li>
          <li className='text-sm font-medium text-stone-800'>{durationHour}h{durationMinute}</li>
        </ul>

        <div className='flex items-center justify-evenly gap-3 w-full sm:w-fit'>
          <div>
            {journeySearch && journey.is_instant_bookable && (
              <div className='group/icon relative'>
                <TbBook size={20} />
                <p className='invisible group-hover/icon:visible text-xs absolute -right-1 bottom-0 translate-x-full bg-white p-1 border border-[#292524] rounded-sm'>Réservation automatique</p>
              </div>
            )}
            {journeySearch && !journey.is_instant_bookable && (
              <div className='group/icon relative'>
                <TbBookOff size={20} />
                <p className='invisible group-hover/icon:visible text-xs absolute -right-1 bottom-0 translate-x-full bg-white p-1 border border-[#292524] rounded-sm'>Pas de réservation automatique</p>
              </div>
            )}
          </div>

          <div className='flex flex-col items-center justify-center order-first sm:order-none'>
            <img
              src={journey.car.owner.photo ?? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
              alt="avatar de l'utilisateur"
              className='h-8 w-8 rounded-full border-2 border-custom-orange'
            />
            <p className='text-sm font-medium text-center w-full sm:w-[64px] truncate'>{journey.car.owner.first_name}</p>
          </div>

        </div>

        <div className='flex items-center sm:flex-col justify-around w-full sm:w-fit font-semibold min-w-fit justify-self-end'>
          <Link
            to={`${journey.id}`}
            className='flex py-1 px-0 md:px-3 items-center gap-1 text-custom-orange hover:bg-custom-orange hover:text-white rounded-xl transition-all'
          >
            En voir <FaPlus />
          </Link>
          {journeySearch && <button type='button' onClick={() => setShowBookingModal(true)} className='flex py-1 px-0 md:px-3 items-center gap-1 text-custom-green-2 hover:bg-custom-green-2 hover:text-white rounded-xl transition-all'>Je réserve <FaLocationArrow /></button>}
          {journeysToCome && <button type='button' onClick={() => setShowUnbookingModal(true)} className='flex py-1 px-0 md:px-3 items-center gap-1 text-custom-red hover:bg-custom-red hover:text-white rounded-xl transition-all'>Annuler</button>}
        </div>
      
        {showBookingModal && <ModalBooking setShowBookingModal={setShowBookingModal} setShowModal={setShowModal}
          travel={journey.start_point.city}
          startTime={ `${startHour}h${startMinute}` } 
          endDate={ `${endHour}h${endMinute}` } 
          journeyId = {journey.id}
          />   
        }

        {showUnbookingModal && <ModalUnbooking setShowUnbookingModal={setShowUnbookingModal} journey={journey} />}
        {showModal && <Modal setShowModal={setShowModal} />}
      </div>
    </div>
  )
}

export default JourneyCard;