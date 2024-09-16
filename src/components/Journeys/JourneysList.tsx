import { JourneyCardInformations } from '../../types/Journey';
import JourneyCard from './JourneyCard';
import NoFounds from './NoFounds';
import ResearchMessage from './ResearchMessage';

type Props = {
  journeys: null | JourneyCardInformations[]
  message?: string
  journeySearch?: boolean | undefined
  journeysToCome?: boolean | undefined
}

const JourneysList = ({ journeys, message, journeySearch, journeysToCome }: Props) => {
  return (
    <div className='w-fit mx-auto'>
      {
       journeys ?
          journeys.length > 0 ?
            journeys.map((journey) => (
              <JourneyCard key={journey.id} journey={journey} journeySearch={journeySearch} journeysToCome={journeysToCome} />
            ))
            :
            <NoFounds message={message} />

          :
          <ResearchMessage />
      }
    </div>
  )
}

export default JourneysList;