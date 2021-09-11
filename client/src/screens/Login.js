import "./form.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/userActions";
import Loader from "../components/Loader";

export default function Login() {
  const dispatch = useDispatch();
  const loginUserReducer = useSelector((state) => state.loginUserReducer);
  const { err, loading } = loginUserReducer;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function _login(e) {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };

    dispatch(loginUser(user));
  }

  return (
    <main className="form-container">
      {loading && <Loader />}
      <form className="card-form" onSubmit={_login}>
        <h1>accesso</h1>
        {err && <p className="form-error">{err}</p>}
        <div className="form-row">
          <input
            type="email"
            placeholder=" "
            autoFocus
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>password</label>
        </div>
        <p className="form-helper">
          non hai un account? <a href="./register">registrati</a>
        </p>
        <input
          type="submit"
          value={loading ? "accesso in corso..." : "accedi"}
          className="btn-submit"
          disabled={loading}
        />
        <input type="submit" hidden />
      </form>
    </main>
  );
}
