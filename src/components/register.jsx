import React, {useState} from 'react';
import Input from "./common/input";

const Register = () => {
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setAccount((prevAccount) => {
      return { ...prevAccount, [name]: value };
    });
  };
  // call the server and redirct
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <Input
            name="username"
            label="Username"
            id="username"
            type="text"
            value={account.username}
            onChange={handleChange}
            error={errors.username}
          />
        </div>
        <div className="form-group">
        <Input
            name="username"
            label="Username"
            id="username"
            type="text"
            value={account.username}
            onChange={handleChange}
            error={errors.username}
          />
        </div>
        <div className="form-group">
        <Input
            name="username"
            label="Username"
            id="username"
            type="text"
            value={account.username}
            onChange={handleChange}
            error={errors.username}
          />
        </div>
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;
