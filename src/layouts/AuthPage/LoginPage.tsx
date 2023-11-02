import React, { useState } from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { login } from "../../auth/AuthService";

type Props = {}

export const LoginPage: React.FC<Props> = () => {
    const [formValue, setFormValue] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const [successful, setSuccessful] = useState(false);

    let navigate: NavigateFunction = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValue({ ...formValue, [name]: value });
    };

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        const { username, password } = formValue;

        setMessage("");

        login(username, password).then(
            () => {
                navigate("/");
                window.location.reload();
            },
            (error: { response: { data: { message: any; }; }; message: any; toString: () => any; }) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);
            }
        );
    };

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleLogin}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Login</h3>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            name="username"
                            value={formValue.username}
                            onChange={handleInputChange}
                            className="form-control mt-1"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formValue.password}
                            onChange={handleInputChange}
                            className="form-control mt-1"
                            placeholder="Enter password"
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <p className="forgot-password text-right mt-2">
                        Forgot <a href="#">password?</a>
                    </p>
                </div>
            </form>
        </div>
    );
};
