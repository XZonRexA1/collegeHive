import { Helmet } from "react-helmet-async";

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Gallery from "../Gallery/Gallery";

const Home = () => {
  const [collegeData, setCollegeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:5000/college`).then((res) => {
      setCollegeData(res.data);
    });
  }, []);

  // Filter the collegeData array based on the search term
  const filteredColleges = collegeData.filter((clg) =>
    clg.college_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Limit the filtered colleges to a maximum of three cards
  const displayedColleges = filteredColleges.slice(0, 3);
  return (
    <>
      <Helmet>
        <title>College Hive | Home</title>
      </Helmet>

      {/* Banner */}
      <div className="bg-stone-500 py-44 font-golos text-white p-4 text-center">
        <h2 className="text-5xl font-semibold">
          Welcome to College Hive! Find your dream college here.
        </h2>
      </div>

        <div className="text-center mt-44 font-bold font-golos text-4xl">View Different <span className="bg-black text-white p-2 rounded">Colleges</span></div>
      <div>
        {/* Search bar */}
       
        <div>
          <input
            className="mt-48 -mb-44 ml-8 text-xl  font-golos px-4 py-2 rounded border-none  text-white"
            type="text"
            placeholder="Search by college name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* Display the filtered cards */}
        <div className="grid md:grid-cols-3 pt-14 bg-gradient-to-b from-white to-stone-600 font-golos">
          {displayedColleges.map((clg) => (
            <div
              key={clg._id}
              className="card w-96 md:m-12 ml-2 mb-8 md:ml-4 bg-stone-900 font-rubik text-white shadow-xl"
            >
              <figure className="px-10 pt-10">
                <img
                  src={clg.college_image}
                  alt={clg.college_name}
                  className="rounded-md"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{clg.college_name}</h2>
                <p>Rating: {clg.college_rating}</p>
                <p>Admission Dates:</p>
                <ul>
                  <li>
                    Fall: {clg.admission_dates.fall.start_date} -{" "}
                    {clg.admission_dates.fall.end_date}
                  </li>
                  <li>
                    Spring: {clg.admission_dates.spring.start_date} -{" "}
                    {clg.admission_dates.spring.end_date}
                  </li>
                </ul>
                <p>Research Count: {clg.research_count}</p>
                <div className="card-actions">
                  {user && (
                    <Link to={`/CollegeDetails/${clg._id}`}>
                      <button className="btn border-none text-white font-golos bg-gradient-to-r from-stone-400 to-gray-500 hover:from-orange-500 hover:to-yellow-500">
                        Details
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Gallery></Gallery>
    </>
  );
};

export default Home;
