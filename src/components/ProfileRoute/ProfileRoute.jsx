import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link } from "react-router-dom";

const ProfileRoute = () => {
  const [userData, setUserData] = useState([]);
  const { user } = useContext(AuthContext);
  const [editing, setEditing] = useState(false); // To manage editing state
  const [updatedData, setUpdatedData] = useState({}); // To store the updated data

  useEffect(() => {
    axios.get("https://college-hive-server.vercel.app/userInfo").then((res) => {
      setUserData(res.data);
    });
  }, []);

  const currentUser = userData.find((ud) => ud.email === user.email);

  if (!currentUser) {
    // Handle the case where no user data matches the logged-in user's email
    return (
      <>
        <div className="font-golos text-4xl ml-12 font-bold pt-44 mx-auto">
          No user data found for the current user {}
          <Link to="/signup" className="text-blue-500 underline">
            Go back
          </Link>
        </div>
      </>
    );
  }

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  // Function to handle the save button click
  const handleSaveClick = () => {
    axios
      .put("https://college-hive-server.vercel.app/userInfo", updatedData)
      .then(() => {
        // If the update was successful, show a success toast
        toast.success("User data updated successfully!");
        setUserData(
          userData.map((data) =>
            data._id === updatedData._id ? updatedData : data
          )
        );
        setEditing(false);
      })
      .catch((error) => {
        // Handle any errors that occurred during the update process
        console.error("Error updating user info:", error);
        // Optionally, you can show an error message to the user to indicate the failure
      });
  };

  const handleEditClick = (index) => {
    setEditing(true);
    setUpdatedData(userData[index]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-14 bg-gradient-to-b from-white to-stone-600 font-golos">
      {userData.map((data, index) => (
        <div
          className="card w-96 bg-stone-900 text-white shadow-xl rounded-lg"
          key={index}
        >
          <figure className="px-10 w-full pt-10">
            <img src={data.imageUrl} alt={data.name} className="rounded-md" />
          </figure>
          <div className="card-body p-6">
            {editing ? (
              <div>
                <h2 className="text-2xl font-bold mb-4">Name:</h2>
                <input
                  type="text"
                  name="name"
                  value={updatedData.name || ""}
                  onChange={handleInputChange}
                  className="input input-bordered"
                />
                <h2 className="text-2xl font-bold mb-4">College:</h2>
                <input
                  type="text"
                  name="college"
                  value={updatedData.college || ""}
                  onChange={handleInputChange}
                  className="input input-bordered"
                />
                <h2 className="text-2xl font-bold mb-4">Address:</h2>
                <input
                  type="text"
                  name="address"
                  value={updatedData.address || ""}
                  onChange={handleInputChange}
                  className="input input-bordered"
                />
                <button
                  className="btn bg-stone-500 hover:bg-teal-800 text-left m-4"
                  onClick={handleSaveClick}
                >
                  Save
                </button>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-4">Name: {data.name}</h2>
                <p className="text-lg">College: {data.college}</p>
                <p className="text-lg">Address: {data.address}</p>
              </div>
            )}
          </div>
          <button
            className="btn bg-stone-500 hover:bg-teal-800 text-left m-4"
            onClick={() => handleEditClick(index)}
          >
            Edit
          </button>
        </div>
      ))}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default ProfileRoute;
