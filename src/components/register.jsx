import React, { useState } from "react";
import Input from "./common/input";
import Joi from "joi-browser";
import apiEndPoint from "./../services/appService";
import axios from "axios";

const Login = () => {
  const [account, setAccount] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const schema = {
    username: Joi.string().required().min(5).label("Username"),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const _schema = { [name]: schema[name] };
    const result = Joi.validate(obj, _schema, { abortEarly: true });

    if (!result.error) return null;
    return result.error.details[0].message;
  };

  const validate = () => {
    const result = Joi.validate(account, schema, { abortEarly: false });

    if (!result.error) return null;
    const errors = {};

    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorMessage = validate();

    if (errorMessage) {
      setErrors(errorMessage);
    }

    const { username, password, email } = account;

    axios
      .post(apiEndPoint + "users", { username, password, email })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
        setErrors(prevError => {
          return {...prevError, username: "Already registered!"}
        })
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    const errorMessage = validateProperty(e.currentTarget);

    if (errorMessage) {
      setErrors((prevError) => {
        return { ...prevError, [name]: errorMessage };
      });
    } else {
      setErrors((prevError) => {
        return { ...prevError, [name]: "" };
      });
    }

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
            name="email"
            label="Email"
            id="email"
            type="text"
            value={account.email}
            onChange={handleChange}
            error={errors.email}
          />
        </div>
        <div className="form-group">
          <Input
            name="password"
            label="Password"
            id="password"
            type="password"
            value={account.password}
            onChange={handleChange}
            error={errors.password}
          />
        </div>
        <button className="btn btn-primary" disabled={validate()}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;
