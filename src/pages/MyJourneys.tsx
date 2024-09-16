import React, { memo, useCallback, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";

import JourneysList from "../components/Journeys/JourneysList";
import { JourneyCardInformations } from "../types/Journey";
import { USER_JOURNEYS } from "../constants/journeys";

const MyJourneys: React.FC = memo(() => {
  const comingJourneys: string = 'Mes prochains trajets';
  const pastJourneys: string = 'Mes anciens trajets';
  const noJourney = 'Aucun trajet à afficher';
  const today = new Date().toJSON();
  
  const [tab, setTab] = useState<string>(comingJourneys);
  const [journeys, setJourneys] = useState<JourneyCardInformations[]>([]);

  const [sendFindUserBookingsQuery] = useLazyQuery(USER_JOURNEYS);
  
  useEffect(() => {
    sendFindUserBookingsQuery({
      onCompleted: (data) => {
        const loadedJourneys = data.findUserBookings.map((obj: any) => obj.journey)
        setJourneys(loadedJourneys)
      }
    });
  }, [sendFindUserBookingsQuery])
  
  
  const onChangeToTab1 = useCallback(() => {
    if (tab !== comingJourneys) {
      setTab(comingJourneys);
    };
  }, [tab]);

  const onChangeToTab2 = useCallback(() => {
    if (tab !== pastJourneys) {
      setTab(pastJourneys)
    };
  }, [tab]);

   return (
    <div className='grow flex justify-center items-start'>
      <div className="flex flex-col justify-top items-center">
        <div className="flex justify-center items-start gap-16 text-xl mt-1 mb-5">
          <button onClick={onChangeToTab1} className={ tab === comingJourneys ? 'selected-tab' : '' }>{comingJourneys}</button>
          <button onClick={onChangeToTab2} className={ tab === pastJourneys ? 'selected-tab' : '' }>{pastJourneys}</button>
        </div>
        {tab === comingJourneys && <JourneysList journeys={journeys.filter(j => j.start_date_time >= today)} message={journeys.filter(j => j.start_date_time >= today).length > 0 ? undefined : noJourney} journeysToCome />}
        {tab === pastJourneys && <JourneysList journeys={journeys.filter(j => j.start_date_time < today)} message={journeys.filter(j => j.start_date_time < today).length > 0 ? undefined : noJourney} />}
      </div>
    </div>
  );
});

export default MyJourneys;
