import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { closeComplaint, getComplaint } from "../features/car/carSlice";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { createNote, getNotes } from "../features/note/noteSlice";

const SingleComplaints = () => {
  const [text, setText] = useState("");

  const { carName, isLoading, isError, message } = useSelector(
    (state) => state.car
  );
  const { notes, isSuccess } = useSelector((state) => state.note);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createNote({
        id,
        note: text
      })
    );
    toast.success("Note Added!");
    setText("");
  };

  // Close Complaint
  const handleCloseComplaint = () => {
    dispatch(closeComplaint(id));
    toast.success("Complaint Closed!");
  };

  useEffect(() => {
    dispatch(getNotes(id));
  }, [isSuccess]);

  useEffect(() => {
    dispatch(getComplaint(id));
    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message, dispatch, id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container p-5">
      <BackButton url={"/cars"} />

      <div className="card p-3 my-3">
        <span className="d-flex align-items-center justify-content-around">
          <div>
            <h3 className="my-2">Your Car : {carName.car}</h3>
            <h4 className="my-2">Registration : {carName.registration}</h4>
            <h5 className="my-2">
              Status :{" "}
              <span
                className={
                  carName.status === "closed"
                    ? "badge text-bg-danger"
                    : "badge text-bg-success"
                }
              >
                {carName.status}
              </span>
            </h5>
            <p className="my-2 text-secondary">
              Description : {carName.description}
            </p>
          </div>

          <img
            style={{ height: "250px" }}
            src="https://static.vecteezy.com/system/resources/previews/028/754/168/original/travel-car-3d-icon-illustrations-png.png"
            alt=""
            className="float-end"
          />
        </span>
      </div>

      <div className="card p-3 my-3">
        <h4>Add Note : </h4>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            required
            className="form-control"
            placeholder="Enter Note Here.."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="btn btn-sm btn-dark my-3">
            Add Note
          </button>
        </form>
      </div>

      <div className="card p-3 my-3">
        <h4 className="text-secondary">Notes : </h4>

        <ul className="list-group">
          {notes.length > 0 ? (
            notes?.map((note) => {
              return (
                <li
                  key={note?._id}
                  className={
                    note?.isStaff
                      ? "list-group-item bg-secondary"
                      : "list-group-item"
                  }
                >
                  <h1 className="h5">{note?.note}</h1>
                  {note?.isStaff ? (
                    <p className="text-light">- From Staff</p>
                  ) : (
                    <p className="text-secondary">-{user?.name}</p>
                  )}
                </li>
              );
            })
          ) : (
            <>
              <h1>Notes not found</h1>
            </>
          )}

          {/* {notes?.map((note) => {
            return (
              <li
                key={note?._id}
                className={
                  note?.isStaff
                    ? "list-group-item bg-secondary"
                    : "list-group-item"
                }
              >
                <h1 className="h5">{note?.note}</h1>
                {note?.isStaff ? (
                  <p className="text-light">- From Staff</p>
                ) : (
                  <p className="text-secondary">-{user?.name}</p>
                )}
              </li>
            );
          })} */}
        </ul>
      </div>

      <button
        className="btn btn-danger my-3 w-100"
        disabled={carName?.status === "closed" ? true : false}
        onClick={handleCloseComplaint}
      >
        Close Ticket
      </button>
    </div>
  );
};

export default SingleComplaints;
