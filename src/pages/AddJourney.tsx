import React, { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/token";
import AddJourneyForm from "../components/Journeys/JourneyForm";

const AddJourney: React.FC = memo(() => {

  const token = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (token?.length === 0) navigate('/connexion');
  }, [navigate, token])

  return (
    <div className="h-full grow flex justify-center items-center">
      <AddJourneyForm />
    </div>
  );
});

export default AddJourney;
