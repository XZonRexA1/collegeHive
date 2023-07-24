import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const College = () => {
  const [collegeData, setCollegeData] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    axios.get(`https://college-hive-server.vercel.app/college`).then((res) => {
      // console.log(res.data);
      setCollegeData(res.data);
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>College Hive | Colleges</title>
      </Helmet>
      <div className="grid md:grid-cols-3 pt-14 bg-gradient-to-b from-white to-stone-600 font-golos">
        {collegeData.map((clg) => (
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
    </>
  );
};

export default College;
