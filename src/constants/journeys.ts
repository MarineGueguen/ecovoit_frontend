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
  }
}
`;

export const USER_JOURNEYS = gql`
  query FindUserBookings {
    findUserBookings {
      journey {
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
  }
`;

export const ADD_JOURNEY = gql`
  mutation Mutation($createJourneyInput: CreateJourneyInput!) {
    createJourney(createJourneyInput: $createJourneyInput) {
      start_date_time
      is_instant_bookable
      is_smoking_allowed
      is_talkative
      is_music_lover
      seats_available
      car {
        id
      }
      comment
      duration
      start_point {
        latitude
        longitude
        city
      }
      end_point {
        latitude
        longitude
        city
      }
    }
  }
`;

export const PLACE_NB = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
];

export const ADD_VEHICLES = gql`
mutation CreateCar($createCarInput: CreateCarInput!) {
  createCar(createCarInput: $createCarInput) {
    id
    brand
    color
    created_at
    energy
    model
    registration_number
    registration_year
    seats_number
    sticker
  }
}
`;
