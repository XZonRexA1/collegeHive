import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Toaster, toast } from "react-hot-toast";
import { AuthContext } from "../../Providers/AuthProvider";

const MyCollege = () => {
  const [selectedCollegeData, setSelectedCollegeData] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get("http://localhost:5000/addCollege").then((res) => {
      setSelectedCollegeData(res.data);
    });
  }, []);

  const [reviews, setReviews] = useState({});

  const handleRatingChange = (event, collegeId) => {
    const rating = parseInt(event.target.value);
    setReviews((prevReviews) => ({
      ...prevReviews,
      [collegeId]: { ...prevReviews[collegeId], rating },
    }));
  };

  const handleFeedbackChange = (event, collegeId) => {
    const feedback = event.target.value;
    setReviews((prevReviews) => ({
      ...prevReviews,
      [collegeId]: { ...prevReviews[collegeId], feedback },
    }));
  };

  const handleSubmitReview = (collegeId) => {
    const reviewData = reviews[collegeId];
    const collegeData = selectedCollegeData.find(
      (clg) => clg._id === collegeId
    );

    if (!collegeData) {
      console.error(`College data not found for collegeId: ${collegeId}`);
      return;
    }

    // Add the college data to the reviewData object
    reviewData.college = collegeData;
    axios
      .post(`http://localhost:5000/addReview/${collegeId}`, reviewData)
      .then((res) => {
        console.log("Review submitted:", res.data);
        toast.success("Review submitted successfully");
      });
    console.log("Review submitted:", reviewData);
    setReviews((prevReviews) => ({
      ...prevReviews,
      [collegeId]: { rating: 0, feedback: "" },
    }));
  };
  return (
    <>
      <Helmet>
        <title>College Hive | My College</title>
      </Helmet>
      <div className="grid md:grid-cols-3 gap-8 pt-14 bg-gradient-to-b from-white to-stone-600 font-golos">
        {selectedCollegeData.map((clg) => (
          <div
            key={clg._id}
            className="card w-full md:m-12 ml-8 mb-8 md:ml-4 bg-stone-900 font-rubik text-white shadow-xl"
          >
            <div>
              {/* College Information */}
              <div className="w-full pr-4">
                <figure className="px-10 pt-10">
                  <img
                    src={clg.selectedCollege.college_image}
                    alt={clg.selectedCollege.college_name}
                    className="rounded-md"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {clg.selectedCollege.college_name}
                  </h2>
                  <p>Rating: {clg.selectedCollege.college_rating}</p>
                  <p>Admission Dates:</p>
                  <ul>
                    <li>
                      Fall:{" "}
                      {clg.selectedCollege.admission_dates.fall.start_date} -{" "}
                      {clg.selectedCollege.admission_dates.fall.end_date}
                    </li>
                    <li>
                      Spring:{" "}
                      {clg.selectedCollege.admission_dates.spring.start_date} -{" "}
                      {clg.selectedCollege.admission_dates.spring.end_date}
                    </li>
                  </ul>
                  <p>Research Count: {clg.selectedCollege.research_count}</p>
                </div>
              </div>

              {/* Divider */}
              <div className="divider text-white  border-1"></div>

              {/* Candidate Information */}
              <div className="w-full pl-4">
                <figure className="px-10 pt-10">
                  <img
                    src={clg.image}
                    alt="Candidate Photo"
                    className="rounded-md"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Candidate Details</h2>
                  <p>Name: {clg.candidateName}</p>
                  <p>Subject: {clg.subject}</p>
                  <p>Email: {clg.candidateEmail}</p>
                  <p>Phone Number: {clg.candidatePhoneNumber}</p>
                  <p>Date of Birth: {clg.dateOfBirth}</p>
                  <p>Address: {clg.address}</p>
                </div>
              </div>
              {/* Review Form */}
              {user && (
                <div className="mt-4 m-4">
                  <h2 className="text-2xl font-bold mb-2">Add a Review</h2>
                  <div className="flex items-center mb-2">
                    <label htmlFor={`rating_${clg._id}`} className="mr-2">
                      Rating:
                    </label>
                    <select
                      name={`rating_${clg._id}`}
                      id={`rating_${clg._id}`}
                      value={reviews[clg._id]?.rating || 0}
                      onChange={(e) => handleRatingChange(e, clg._id)}
                      className="border rounded-md px-2 py-1"
                    >
                      <option value={0}>Select a rating</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </select>
                  </div>
                  <div className="mb-2">
                    <label htmlFor={`feedback_${clg._id}`}>Feedback:</label>
                    <textarea
                      name={`feedback_${clg._id}`}
                      id={`feedback_${clg._id}`}
                      value={reviews[clg._id]?.feedback || ""}
                      onChange={(e) => handleFeedbackChange(e, clg._id)}
                      className="border rounded-md w-full px-2 py-1"
                    />
                  </div>
                  <button
                    onClick={() => handleSubmitReview(clg._id)}
                    className="btn bg-stone-800 hover:bg-stone-700"
                    disabled={
                      !reviews[clg._id]?.rating || !reviews[clg._id]?.feedback
                    }
                  >
                    Submit Review
                  </button>
                  <Toaster position="top-right" reverseOrder={false} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyCollege;
