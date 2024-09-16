import { CarInfos } from "./Car";
import { StopPoint } from "./StopPoint";
import { JourneyUserInfos } from "./User";
import { Booking } from "./Booking";

export interface Journey {
  id: number;
  start_date_time: string;
  duration?: string;
  is_instant_bookable: boolean;
  seats_available: number;
  comment?: string;
  user: JourneyUserInfos;
  start_point: StopPoint;
  end_point: StopPoint;
}

export interface AddJourneyValues {
    startDate: string;
    startTime: string;
    isInstantBookable: boolean;
    isSmoker: boolean,
    isTalkative: boolean,
    isMusicLover: boolean,
    seatsAvailable: string;
    startCity: string;
    endCity: string;
    carId: string;
    comment?: string;
};

export type StartDateProps = {
  date: string,
  time: string
}

export type OnCheckedProps = {
  id: string,
  checked: boolean,
}

export type Option = {
  value: number | string,
  label: number | string,
};

export type SelectProps = {
  options: Array<Option>,
};

export type Vehicle = {
  id: number,
  model: string,
};

export type CheckboxProps = {
  label: string,
  tooltip: string,
  checked: boolean,
  id: string,
  onChecked: ({id, checked} :OnCheckedProps) => void,
};

export type TargetProps = {
  target: {
    checked: boolean,
  }
}

export type LabelProps = {
  label: string,
  id: string,
};

export type ModalProps= {
  setModalOpen: (value: boolean) => void
}

export interface AddJourneyOnCompleted {
  createJourney: AddJourneyValues
}

export interface SearchJourneyValues {
  start_point: string;
  end_point: string;
  seats: number;
  date: string;
}

export interface JourneyCardInformations {
  id: string;
  start_date_time: Date | string;
  created_at: number;
  duration: Date | string;
  start_point: StopPoint;
  end_point: StopPoint;
  is_instant_bookable: boolean;
  seats_available: number;
  car: CarInfos;
  bookings: Booking;
}
