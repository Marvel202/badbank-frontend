import React from "react";
import { useForm } from "react-hook-form";
import { signUp } from "../firebaseapp/auth";
import { Link, useNavigate } from "react-router-dom";

export const Signup = (props) => {
  const { register, handleSubmit, reset } = useForm();
  // const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log("Data", data);
    console.log("Register", register);
    let newUser;
    // setLoading(true);
    try {
      newUser = await signUp(data);
      console.log("newUser", newUser);
      console.log("then", props);
      reset();
    } catch (error) {
      console.log(error);
    }
    if (newUser) {
      navigate(`/profile/${newUser.uid}`);
    } else {
      // setLoading(false);
      console.log("Signed Up Already");
    }
  };

  // const formClassName = `ui form ${isLoading ? "Loading" : ""}`;

  return (
    <>
      <div className="login-container">
        <div className="ui card login-card">
          <div className="content">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="field">
                <label>
                  First Name
                  <input type="input" {...register("firstName")} />
                </label>
              </div>
              <div className="field">
                <label>
                  Last Name
                  <input type="input" {...register("lastName")} />
                </label>
              </div>
              <div className="field">
                <label>
                  Email
                  <input type="email" {...register("email")} />
                </label>
              </div>
              <div className="field">
                <label>
                  Password
                  <input type="password" {...register("password")} />
                </label>
              </div>
              <div className="field actons">
                <button className="ui primary button login" type="submit">
                  Sign Up
                </button>
                or <Link to="/login">Log In </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

// export default Signup;
