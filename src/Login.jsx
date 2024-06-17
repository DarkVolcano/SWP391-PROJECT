import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const clientId =
  "242000824863-hdrd5enmg6b0hg1pbn1pe0asvset9r14.apps.googleusercontent.com";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");
  const { setUser, setLoginMessage } = useContext(UserContext);
  const [noticeVisible, setNoticeVisible] = useState(false);

  const navigate = useNavigate();

  const loginWithUsernameAndPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `https://localhost:7088/api/Accounts/Login?email=${email}&pass=${password}`
      );
      const user = response.data;

      if (user) {
        setUser(user);
        if (user.roleId === 1) {
          navigate("/Dashboard");
        } else if (user.roleId === 2) {
          navigate("/Home");
        } else if (user.roleId === 3) {
          navigate("/HomeStaff");
        } else {
          navigate("/HomeManager");
        }
      } else {
        setNotice("Invalid username or password.");
        setNoticeVisible(true);
        setTimeout(() => {
          setNoticeVisible(false);
        }, 5000);
      }
    } catch (error) {
      setNotice("An error occurred while trying to log in.");
      setNoticeVisible(true);
      setTimeout(() => {
        setNoticeVisible(false);
      }, 5000);
    }
  };

  const handleCloseNotice = () => {
    setNoticeVisible(false);
  };

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    const userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
    setLoginMessage("Login successful");
    navigate("/Home");
    alert("Login successful");
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt();
  }, []);

  return (
    <div className="loginN">
      <div className="container-fluid">
        <div className="row justify-content-center mt-3">
          <div className="text-center">
            <p className="lead login">Login</p>
          </div>
          <div className="text-center" style={{ width: "auto" }}>
            <p className="lead re">Please enter your email and password</p>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <form
          className="col-md-7 mt-3 pt-3 pb-3"
          onSubmit={loginWithUsernameAndPassword}
          style={{ width: "auto", height: "auto" }}
        >
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email or telephone
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
          </div>
          <div className="mt-3" style={{ textAlign: "right" }}>
            <span>
              <Link to="/EmailVerify" className="forgot">
                Forgot your password?
              </Link>
            </span>
          </div>
          <div className="d-grid" style={{ margin: "1rem 0" }}>
            <button type="submit" className="btn btn-primary pt-3 pb-3">
              Login
            </button>
          </div>
          {notice && (
            <div className={`error ${noticeVisible ? "" : "hide"}`}>
              <span className="check">
                <i className="fa fa-warning"></i>
              </span>
              <span className="msg">{notice}</span>
              <span className="crose" onClick={handleCloseNotice}>
                <i className="fa fa-times"></i>
              </span>
            </div>
          )}
          <div className="or">OR</div>
          <div id="signInDiv"></div>
          <div className="mt-3 text-center">
            <span>
              Sign up for an account? <Link to="/Register">Sign up</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
