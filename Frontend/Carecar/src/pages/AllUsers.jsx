import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/admin/adminSlice";
import { useEffect } from "react";
import Loading from "../components/Loading";
import BackButton from "../components/BackButton";
import { toast } from "react-toastify";

const AllUsers = () => {
  const { users, isLoading, isError, message } = useSelector(
    (state) => state.admin
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message, dispatch]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="container p-5">
      <BackButton url={"/"} />
      <h1 className="text-center">All Users</h1>
      <table className="table mt-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user._id}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default AllUsers;
