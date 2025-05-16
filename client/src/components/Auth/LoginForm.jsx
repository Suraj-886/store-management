import { useForm } from "../../hooks/useAuth";
import { loginUser } from "../../services/authService";
import "../../styles/auth.css";
import { keyWord } from "../../utils/keyword";
import Style from "./Register.module.css";
import { Typography, Link } from "@mui/material";
import {
    Store,
    Email,
    Lock,
} from "@mui/icons-material";

function LoginForm() {
    const { values, handleChange, handleSubmit } = useForm(
        {
            storeName: "",
            email: "",
            password: "",
        },
        loginUser,
        keyWord?.actionType?.login
    );
    return (
        <div className={`${Style.Register} vh-100 vw-100`} my-5>
            <form
                onSubmit={handleSubmit}
                className="bg-light p-4 shadow-sm col-md-4"
                style={{ borderRadius: "10px" }}
            >
                <h2 className="text-center mb-4">
                    <i className="fas fa-clinic-medical me-2"></i>Login
                </h2>
                <Typography variant="body2" align="center" mb={3}>
                    <Link
                        href="/register"
                        underline="hover"
                        sx={{
                            color: "text.secondary",
                            "&:hover": {
                                color: "primary.main",
                            },
                        }}
                    >
                        Don't have an account? Register here
                    </Link>
                </Typography>
                {/* <a  href='/register'>Dont have an account? Register here</a> */}
                <div className="mb-4 ">
                    {/* <label htmlFor="name" className="form-label">
                            Name
                        </label> */}
                    {/* <input
                        type="text"
                        name="storeName"
                        className="form-control"
                        value={values?.storeName}
                        onChange={handleChange}
                        required
                        placeholder='store name'
                    /> */}
                    <div className="input-group mb-3">
                        <span className="input-group-text">
                            <Store />
                        </span>
                        <input
                            type="text"
                            name="storeName"
                            className="form-control"
                            value={values?.storeName}
                            onChange={handleChange}
                            required
                            placeholder="Store Name"
                        />
                    </div>
                </div>
                <div className="input-group mb-3">
                    {/* <label htmlFor="email" className="form-label">
                            Email
                        </label> */}
                    <span className="input-group-text">
                        <Email />
                    </span>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={values?.email}
                        onChange={handleChange}
                        required
                        placeholder="E-mail"
                    />
                </div>
                <div className="input-group mb-3">
                    {/* <label htmlFor="password" className="form-label">
                            Password
                        </label> */}
                    <span className="input-group-text">
                        <Lock />
                    </span>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        value={values?.password}
                        onChange={handleChange}
                        required
                        placeholder="password"
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Login
                </button>
                <a className="mt-2 small text-decoration-none" href="/forget">Forgot password</a>
            </form>
        </div>
    );
}

export default LoginForm;