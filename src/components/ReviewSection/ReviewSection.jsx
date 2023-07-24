import { useState, useEffect } from "react";
import axios from "axios";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch the reviews data from /addReview API
    axios.get("http://localhost:5000/addReview").then((res) => {
      setReviews(res.data);
    });
  }, []);

  return (
    <div className="grid md:grid-cols-3 pt-14 bg-gradient-to-b from-white to-stone-600 font-golos">
      {reviews.map((review, index) => (
        <div
          key={index}
          className="card w-96 md:m-12 ml-2 mb-8 md:ml-4 bg-stone-900 font-rubik text-white shadow-xl"
        >
          <div className="card-body">
            <h2 className="card-title">Review {index + 1}</h2>
            <figure className="px-10 pt-10">
              <img
                src={review.college.selectedCollege.college_image}
                alt={review.college.selectedCollege.college_name}
                className="rounded-md"
              />
            </figure>
            {review.college.selectedCollege && (
              <>
                <p>
                  <span className="font-semibold">College name:</span>{" "}
                  {review.college.selectedCollege.college_name}
                </p>

                    <br />
                <div className="w-24 avatar ">
                  <img
                    src={review.college.image}
                    alt={review.college.candidateName}
                    className=" h-2 text-left  rounded-xl"
                  />
                </div>
                <p>
                  <span className="font-semibold">Candidate name:</span>{" "}
                  {review.college.candidateName}
                </p>
                <p>
                  Research Count:{" "}
                  {review.college.selectedCollege.research_count}
                </p>
              </>
            )}
            <p>Rating: {review.rating}</p>
            <p>Feedback: {review.feedback}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewSection;
