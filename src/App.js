import { useState } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function App() {
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState("");
  const [value, setValue] = useState({
    name: "",
    age: "",
    email: "",
  });

  const [item, setItem] = useState(
    JSON.parse(localStorage.getItem("item")) || []
  );
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
  });
  const handleOnchange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleClose = () => {
    setShow(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setItem([
      {
        name: form.name,
        age: form.age,
        email: form.email,
      },
    ]);
    const newData = [...item, form];
    setItem(newData);
    localStorage.setItem("item", JSON.stringify(newData));
    setForm({
      name: "",
      age: "",
      email: "",
    });
  };

  const handleDelete = (index) => {
    const newData = [...item];
    newData.splice(index, 1);
    setItem(newData);
    localStorage.setItem("item", JSON.stringify(newData));
  };
  const handleChange = (e) => {
    setValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleShow = (index, items) => {
    setShow(true);
    setValue(items);
    setEditId(index);
  };
  // const handleUpdate = (index) => {
  //   setShow(false);
  //   // setItem(value);
  //   const newData = [...item];

  //   console.log(newData);
  // };
  const handleUpdate = (index) => {
    setShow(false);
    const newData = [...item];
    newData[editId] = {
      name: value.name,
      age: value.age,
      email: value.email,
    };
    setItem(newData);
    localStorage.setItem("item", JSON.stringify(newData));
  };
  return (
    <div className="">
      <div className=" mt-2 container">
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Name
            </label>
            <input
              value={form.name}
              onChange={(e) => handleOnchange(e)}
              name="name"
              type="text"
              className="form-control"
              placeholder=""
            />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Age
            </label>
            <input
              value={form.age}
              onChange={(e) => handleOnchange(e)}
              name="age"
              type="text"
              className="form-control"
              placeholder=""
            />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Email address
            </label>
            <input
              value={form.email}
              onChange={(e) => handleOnchange(e)}
              name="email"
              type="email"
              className="form-control"
              placeholder="name@example.com"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Record
          </button>
        </form>
      </div>
      <hr />
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Email</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {item.map((items, index) => (
              <tr key={index}>
                <td>{items.name}</td>
                <td>{items.age}</td>
                <td>{items.email}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleShow(index, items);
                    }}
                  >
                    Edit
                  </Button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Edit Record</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Name
                        </label>
                        <input
                          value={value.name}
                          onChange={(e) => handleChange(e)}
                          name="name"
                          type="text"
                          className="form-control"
                          placeholder=""
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Age
                        </label>
                        <input
                          value={value.age}
                          onChange={(e) => handleChange(e)}
                          name="age"
                          type="text"
                          className="form-control"
                          placeholder=""
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Email address
                        </label>
                        <input
                          value={value.email}
                          onChange={(e) => handleChange(e)}
                          name="email"
                          type="email"
                          className="form-control"
                          placeholder="name@example.com"
                        />
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          handleUpdate(index);
                        }}
                      >
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(index)}
                  >
                    delete
                  </button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
