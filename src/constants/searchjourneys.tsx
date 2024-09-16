import { gql } from "@apollo/client";

export const RESEARCH_JOURNEYS = gql`
  query SearchJourneys($nbPassengers: Float!, $startDateTime: DateTime!, $endCity: String!, $startCity: String!) {
    searchJourneys(nbPassengers: $nbPassengers, start_date_time: $startDateTime, endCity: $endCity, startCity: $startCity) {
      id
      start_point {
        city
      }
      end_point {
        city
      }
      car {
        owner {
          id
          first_name
          last_name
        }
      }
      is_instant_bookable
      seats_available
      start_date_time
      duration
      bookings {
        id
      }
    }
  }
`;