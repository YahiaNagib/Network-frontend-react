import React, { useState } from "react";
import Input from "./common/input";
import Joi from "joi-browser";
import auth from "../services/authService";

const Login = (props) => {
  // store username and password 
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });

  // store errors in the state
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  // create schema to verify inputs
  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };


  // this method is used to validate a single property while typing
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMessage = validate();

    if (errorMessage) {
      setErrors(errorMessage);
    }
    const { username, password } = account;
    try {
      await auth.login(username, password);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setErrors({ password: ex.response.data });
      }
    }
    // axios
    //   .post(apiEndPoint + "auth", { username, password })
    //   .then((response) => {
    //     const jwt = response.data;
    //     localStorage.setItem("token", jwt);
    //     window.location = "/";
    //   })
    //   .catch((e) => {
    //     setErrors({password: "Invalid username or password"})
    //   });
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
      <h1>Login</h1>
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
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
