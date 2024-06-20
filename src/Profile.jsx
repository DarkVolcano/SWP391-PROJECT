import { Navigate, useParams } from "react-router-dom";
import { USERS } from "./data";
import { useState } from "react";

export const Profile = () => {
  const userName = useParams();
  const users = USERS.find((obj) => {
    return obj.id == userName.id;
  });

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    mobile: "",
    email: "",
    location: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log("Form submitted:", user);
  };

  const handleReset = () => {
    setUser({
      firstName: "",
      lastName: "",
      phone: "",
      mobile: "",
      email: "",
      location: "",
      password: "",
      password2: "",
    });
  };

  const [avatar, setAvatar] = useState(
    "http://ssl.gstatic.com/accounts/ui/avatar_2x.png"
  );
  const readURL = (input) => {
    if (input.target.files && input.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setAvatar(e.target.result);
      };

      reader.readAsDataURL(input.target.files[0]);
    }
  };

  const handleBack = () => {
    Navigate("/");
  };

  return (
    <div className="container bootstrap snippet">
      <div className="row">
        <div className="col-sm-12">
          <h1 style={{ visibility: "hidden" }}>User name</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-3">
          <div className="text-center">
            <img
              src={avatar}
              className="avatar img-circle img-thumbnail"
              alt="avatar"
            />
            <h6>Upload a different photo...</h6>
            <input
              type="file"
              className="text-center center-block file-upload"
              onChange={readURL}
              style={{ width: "-webkit-fill-available" }}
            />
          </div>
          <br />
        </div>
        <div className="col-sm-9">
          <div className="tab-content">
            <div className="tab-pane active" id="home">
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <div className="col-xs-6">
                    <label htmlFor="account-name">
                      <h4>Account name</h4>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="account-name"
                      id="account-name"
                      placeholder="Account name"
                      value={users.userName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-xs-6">
                    <label htmlFor="full-name">
                      <h4>Full name</h4>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="full-name"
                      id="full-name"
                      placeholder="Full name"
                      value={users.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-xs-6">
                    <label htmlFor="phone">
                      <h4>Phone</h4>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      id="phone"
                      placeholder="enter phone"
                      value={users.telephone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-xs-6">
                    <label htmlFor="email">
                      <h4>Email</h4>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      placeholder="you@email.com"
                      value={users.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-xs-6">
                    <label htmlFor="role">
                      <h4>Role</h4>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="role"
                      id="role"
                      placeholder="role"
                      value={users.roleID}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-xs-6">
                    <label htmlFor="password">
                      <h4>Password</h4>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      id="password"
                      placeholder="password"
                      value={users.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-xs-12">
                    <br />
                    <button
                      className="btn btn-lg btn-primary"
                      type="submit"
                      onClick={handleReset}
                    >
                      <i className="glyphicon glyphicon-repeat"></i> Back
                    </button>
                    <button
                      className="btn btn-lg btn-success"
                      type="submit"
                      style={{ float: "right", marginRight: "0" }}
                    >
                      <i className="glyphicon glyphicon-ok-sign"></i> Save
                    </button>
                    <button
                      className="btn btn-lg btn-primary"
                      type="submit"
                      onClick={handleReset}
                      style={{ float: "right" }}
                    >
                      <i className="glyphicon glyphicon-repeat"></i> Reset
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
