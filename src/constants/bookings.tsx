import { gql } from "@apollo/client";

export const BOOK_JOURNEY = gql`
  mutation BookJourney($bookingInfos: BookJourneyInput!) {
    bookJourney(bookingInfos: $bookingInfos)
  }
`;

export const PASSENGERS_NB = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" }
];

export const UNBOOK_JOURNEY = gql`
  mutation Mutation($journeyId: Float!) {
    deleteBooking(journeyId: $journeyId)
  }
`;