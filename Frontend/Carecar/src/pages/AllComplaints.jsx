import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getComplaints } from "../features/car/carSlice";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import BackButton from "../components/BackButton";
import { Link } from "react-router-dom";

const AllComplaints = () => {
  const { cars, isLoading, isError, message } = useSelector(
    (state) => state.car
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComplaints());
  }, [dispatch]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container p-5">
      <BackButton url={"/"} />
      <h1 className="text-center">All Complaints</h1>
      <table className="table mt-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Car</th>
            <th scope="col">Registration</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {cars?.map((car, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{car.car}</td>
                <td>{car.registration}</td>
                <td>{new Date(car.createdAt).toLocaleDateString("EN-IN")}</td>
                <td>
                  <span
                    className={
                      car.status === "closed"
                        ? "badge text-bg-danger"
                        : "badge text-bg-success"
                    }
                  >
                    {car.status}
                  </span>
                </td>
                <td>
                  <Link className="btn btn-sm btn-dark" to={`/cars/${car._id}`}>
                    View
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllComplaints;
