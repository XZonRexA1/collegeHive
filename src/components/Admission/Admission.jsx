import { Helmet } from "react-helmet-async";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const Admission = () => {
  const [collegeData, setCollegeData] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://college-hive-server.vercel.app/college").then((res) => {
      //   console.log(res.data);
      setCollegeData(res.data);
      setLoading(false);
    });
  }, []);

  const handleCollegeSelect = (college) => {
    setSelectedCollege(college);
  };

  const onSubmitCandidateForm = (data) => {
    console.log("Form data:", data);
    data.selectedCollege = selectedCollege;
    axios
      .post("https://college-hive-server.vercel.app/addCollege", data)
      .then((response) => {
        reset();
        console.log("Data sent successfully:", response.data);
        toast.success("Candidate data submitted successfully");
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (loading) {
    return <progress className="progress w-56" />;
  }
  return (
    <>
      <Helmet>
        <title>College Hive | Admission</title>
      </Helmet>
      <div className="mx-4 pt-14 font-golos">
        <h2 className="text-3xl m-4 font-extrabold text-gray-900 text-center mb-8">
          College Admission
        </h2>
        <table className="table w-full  border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 text-2xl font-bold text-black">
                College Name
              </th>
            </tr>
          </thead>
          <tbody>
            {collegeData.map((college) => (
              <tr
                key={college._id}
                onClick={() => handleCollegeSelect(college)}
              >
                <td className="border-2 px-4 py-2 cursor-pointer">
                  {college.college_name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedCollege && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold">
              {selectedCollege.college_name} Admission
            </h2>
            <form
              onSubmit={handleSubmit(onSubmitCandidateForm)}
              className="space-y-4"
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Candidate Name</span>
                </label>
                <input
                  type="text"
                  {...register("candidateName", { required: true })}
                  placeholder="Candidate Name"
                  className="input input-bordered bg-white"
                />
                {errors.candidateName && (
                  <span className="text-red-600 mt-2">
                    Candidate Name is required
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Subject</span>
                </label>
                <input
                  type="text"
                  {...register("subject", { required: true })}
                  placeholder="Subject"
                  className="input input-bordered bg-white"
                />
                {errors.subject && (
                  <span className="text-red-600 mt-2">Subject is required</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Candidate Email</span>
                </label>
                <input
                  type="email"
                  {...register("candidateEmail", { required: true })}
                  placeholder="Candidate Email"
                  className="input input-bordered bg-white"
                />
                {errors.candidateEmail && (
                  <span className="text-red-600 mt-2">
                    Candidate Email is required
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Candidate Phone Number</span>
                </label>
                <input
                  type="tel"
                  {...register("candidatePhoneNumber", { required: true })}
                  placeholder="Candidate Phone Number"
                  className="input input-bordered bg-white"
                />
                {errors.candidatePhoneNumber && (
                  <span className="text-red-600 mt-2">
                    Candidate Phone Number is required
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <input
                  type="text"
                  {...register("address", { required: true })}
                  placeholder="Address"
                  className="input input-bordered bg-white"
                />
                {errors.address && (
                  <span className="text-red-600 mt-2">Address is required</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Date of Birth</span>
                </label>
                <input
                  type="date"
                  {...register("dateOfBirth", { required: true })}
                  className="input input-bordered bg-white"
                />
                {errors.dateOfBirth && (
                  <span className="text-red-600 mt-2">
                    Date of Birth is required
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image</span>
                </label>
                <input
                  type="text"
                  {...register("image", { required: true })}
                  placeholder="Image URL"
                  className="input input-bordered bg-white"
                />
                {errors.image && (
                  <span className="text-red-600 mt-2">
                    Image URL is required
                  </span>
                )}
              </div>

              <div className="form-control m-4 w-50">
                <button
                  className="btn btn-active btn-accent mb-12"
                  type="submit"
                >
                  Submit
                </button>
                <Toaster position="top-right" reverseOrder={false} />
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Admission;
