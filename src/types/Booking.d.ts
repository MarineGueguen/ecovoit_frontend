export interface BookingValues {
    journeyId: number;
    seats: number;
    comment: string;
}

export interface Booking {
    id: number;
    journeyId: number;
    seats: number;
    comment: string;
}

export interface BookingOnCompleted {
    bookJourney: BookingValues
}

export type LabelProps = {
    label: string,
    id: string,
};

export type SelectProps = {
    options: Array<Option>,
};

export type Option = {
    value: number | string,
    label: number | string,
};

export type ModalProps= {
    setShowBookingModal: (value: boolean) => void
  }