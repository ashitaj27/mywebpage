import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; // Include custom CSS

function App() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [users, setUsers] = useState([]);

  // Fetch users
  useEffect(() => {
    axios.get("http://localhost:5000/api/users")
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/users/register", form)
      .then(res => {
        setUsers([...users, res.data]);
        setForm({ name: "", email: "" });
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="app-background d-flex align-items-center justify-content-center min-vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow p-4">
              <h2 className="text-center mb-4">Register User</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Enter name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Register
                </button>
              </form>
            </div>

            <div className="card mt-4 p-3 shadow-sm">
              <h4 className="mb-3 text-center">Registered Users</h4>
              <ul className="list-group">
                {users.map(user => (
                  <li key={user._id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{user.name}</strong>
                      <br />
                      <small>{user.email}</small>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
