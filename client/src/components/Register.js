import React, { useState } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import logo from "../images/cart_logo.jpg";


const Register = (props) => {
    const [confirmReg, setConfirmReg] = useState("");
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };
    const register = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/register", user,
            {
                withCredentials: true,
            },
        )
            .then((res) => {
                console.log("res.data", res.data);
                setUser({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
                setConfirmReg(
                    "Thank you for registering! You can now login."
                );
                setErrors({});
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
            });
    };

    return (
        <div>
            <div className="header-main">
                <div className="brand-logo">
                    <img src={logo} className='cart-logo' />
                    <h1>Project Listit</h1>
                </div>
                <div>
                    <div className="navbar">
                        <Link to={"/"} className="nav-links">Browse Items</Link>
                        <Link to={"/"} className="nav-links">New Listing</Link>
                        <Link to={"/"} className="nav-links">Log Out</Link>
                    </div>
                </div>
            </div>
            <div className="body-main">
                <div className="body-content-logreg">
                    <h1>Register</h1>
                    {confirmReg ? <h4>{confirmReg}</h4> : null}
                    <form onSubmit={register}>
                        <div className="logregform">
                            <label className="form-labels">Username:</label>
                            <input className="login-input" type="text" name="username" value={user.username} onChange={handleChange} />
                            {errors.username ? (
                                <span className="error-text">
                                    {errors.username.message}
                                </span>
                            ) : null}
                        </div>
                        <div className="logregform">
                            <label className="form-labels">Email:</label>
                            <input className="login-input" type="text" name="email" value={user.email} onChange={handleChange} />
                            {errors.email ? (
                                <span className="error-text">
                                    {errors.email.message}
                                </span>
                            ) : null}
                        </div>
                        <div className="logregform">
                            <label className="form-labels">Password:</label>
                            <input className="login-input" type="password" name="password" value={user.password} onChange={handleChange} />
                            {errors.password ? (
                                <span className="error-text">
                                    {errors.password.message}
                                </span>
                            ) : null}
                        </div>
                        <div className="logregform">
                            <label className="form-labels">Confirm Password:</label>
                            <input className="login-input" type="password" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} />
                            {errors.confirmPassword ? (
                                <span className="error-text">
                                    {errors.confirmPassword.message}
                                </span>
                            ) : null}
                        </div>
                        <div className="center-button">
                            <button class="hover-button" type="submit">Register!</button>
                        </div>
                    </form>
                    <Link to={"/"} className="logreg-links">Already have an account? Login here!</Link>
                </div>
            </div>
        </div>
    )
}

export default Register;



