import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const CollegeDetails = () => {
  const [collegeDataDetails, setCollegeDataDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/college`).then((res) => {
      setCollegeDataDetails(res.data.find((clg) => clg._id === id));
    });
  }, [id]);

  if (!collegeDataDetails) {
    return <progress className="progress w-56"></progress>;
  }

  return (
    <>
    <Helmet>
        <title>College Hive | College Details</title>
      </Helmet>
    <div className="pt-14 w-full font-golos">
      <div className="card w-full md:m-8 mt-8 mb-8 md:ml-0 grid md:grid-cols-2 bg-stone-900 font-rubik text-white shadow-xl divide-x divide-white">
        <figure className="px-10 pt-10">
          <img
            src={collegeDataDetails.college_image}
            alt={collegeDataDetails.college_name}
            className="rounded-md "
          />
        </figure>
        <div className="p-6 divide-y card-body divide-white">
          <h2 className="font-bold">{collegeDataDetails.college_name} Details: </h2>
          <p>Rating: {collegeDataDetails.college_rating}</p>
          <p>Admission Dates:</p>
          <ul>
            <li>
              Fall: {collegeDataDetails.admission_dates.fall.start_date} -{" "}
              {collegeDataDetails.admission_dates.fall.end_date}
            </li>
            <li>
              Spring: {collegeDataDetails.admission_dates.spring.start_date} -{" "}
              {collegeDataDetails.admission_dates.spring.end_date}
            </li>
          </ul>
          <p>Research Count: {collegeDataDetails.research_count}</p>

          <div>
            <h3 className="font-bold mt-8">Events:</h3>
            <ul>
              {collegeDataDetails.details.events.map((event, index) => (
                <li key={index}>
                  <strong>{event.event_name}</strong> - {event.date} at{" "}
                  {event.location}
                  <p>{event.description}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mt-8">Sports Facilities:</h3>
            <p>Teams: {collegeDataDetails.details.sports.teams.join(", ")}</p>
            <p>Home Stadium: {collegeDataDetails.details.sports.home_stadium}</p>
            <p>Championships:</p>
            <ul>
            {collegeDataDetails.details.sports.championships.football && (
                <li>
                  Football: {collegeDataDetails.details.sports.championships.football}
                </li>
              )}
              {collegeDataDetails.details.sports.championships.basketball && (
                <li>
                  Basketball: {collegeDataDetails.details.sports.championships.basketball}
                </li>
              )}
              {collegeDataDetails.details.sports.championships.volleyball && (
                <li>
                  Volleyball: {collegeDataDetails.details.sports.championships.volleyball}
                </li>
              )}
              {collegeDataDetails.details.sports.championships.tennis && (
                <li>
                  Tennis: {collegeDataDetails.details.sports.championships.tennis}
                </li>
              )}
              {collegeDataDetails.details.sports.championships.swimming && (
                <li>
                  Swimming: {collegeDataDetails.details.sports.championships.swimming}
                </li>
              )}
              {collegeDataDetails.details.sports.championships.badminton && (
                <li>
                  Badminton: {collegeDataDetails.details.sports.championships.badminton}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CollegeDetails;
