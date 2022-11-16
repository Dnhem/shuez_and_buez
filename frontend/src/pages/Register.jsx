import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8800";

const Register = () => {
  let initialVal = {
    username: "",
    password: "",
  };
  const [ formData, setFormData ] = useState(initialVal);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, formData);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} method="POST">
        <input
          required
          type="text"
          name="username"
          placeholder="username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
        />
        <button>Register</button>
        <span>
          Already have an account? <Link to="/login">Log in</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
