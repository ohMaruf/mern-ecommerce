import "./form.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/userActions";
import Loader from "../components/Loader";

export default function Register() {
  const dispatch = useDispatch();
  const registerUserReducer = useSelector((state) => state.registerUserReducer);
  const { err, loading } = registerUserReducer;

  const [errorMessage, setErrorMessage] = useState(err);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function _register(e) {
    e.preventDefault();
    if (
      confirmPassword.length !== password.length ||
      password !== confirmPassword
    ) {
      setErrorMessage("le password non coincidono");
    } else if (password.length < 6) {
      setErrorMessage("password troppo corta");
    } else {
      const user = {
        name: name,
        email: email,
        password: password,
      };

      dispatch(registerUser(user));
    }
  }

  return (
    <main className="form-container">
      {loading && <Loader />}
      <form className="card-form" onSubmit={_register}>
        <h1>registrazione</h1>
        {(err || errorMessage) && <p className="form-error">{errorMessage}</p>}
        <div className="form-row first-row">
          <input
            type="name"
            placeholder=" "
            autoFocus
            required
            onChange={(e) => setName(e.target.value)}
          />
          <label>nome utente</label>
        </div>
        <div className="form-row">
          <input
            type="email"
            placeholder=" "
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>e-mail</label>
        </div>
        <div className="form-row">
          <input
            type="password"
            placeholder=" "
            required
            minLength="6"
            maxLength="32"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>password</label>
        </div>
        <div className="form-row last-row">
          <input
            type="password"
            placeholder=" "
            required
            minLength="6"
            maxLength="32"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label>conferma password</label>
        </div>
        <p className="form-helper">
          hai gi&agrave; un'account? <a href="./login">accedi</a>
        </p>
        <input
          type="submit"
          value={loading ? "registrazione in corso..." : "registrati"}
          className="btn-submit"
          disabled={loading}
        />
        <input type="submit" hidden />
      </form>
    </main>
  );
}
