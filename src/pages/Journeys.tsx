import { useLazyQuery } from '@apollo/client';
import { useState } from 'react';

import JourneysList from '../components/Journeys/JourneysList';
import SearchJourney from '../components/Journeys/SearchJourney';

import { RESEARCH_JOURNEYS } from '../constants/searchjourneys';

import { SearchJourneyValues } from '../types/Journey';
import { JourneyCardInformations } from '../types/Journey';

const Journeys = () => {
  const [journeysList, setJourneysList] = useState<JourneyCardInformations[] | null>(null);

  const [sendResearchJourneysQuery] = useLazyQuery(RESEARCH_JOURNEYS);

  const handleSearchJourneys = (values: SearchJourneyValues) => {
    sendResearchJourneysQuery({
      variables: {
        nbPassengers: values.seats,
        startDateTime: values.date,
        endCity: values.end_point,
        startCity: values.start_point,
      },
      onCompleted: (data) => {
        setJourneysList(data.searchJourneys)
      }
    },
    );
  }

  return (
    <section id='journeys-section' className='grow'>
      <SearchJourney handleSearchJourneys={handleSearchJourneys} />
      <JourneysList journeys={journeysList} journeySearch />
    </section>
  )
}

export default Journeys