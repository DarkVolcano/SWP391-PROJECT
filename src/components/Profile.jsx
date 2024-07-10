import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "../css/Profile.css";
import { Button } from "react-bootstrap";

export const Profile = () => {
  const navigate = useNavigate();
  const { accountId } = useParams();
  const [data, setData] = useState([]);

  const [user, setUser] = useState({
    accountName: "",
    fullName: "",
    phone: "",
    email: "",
    image: "http://ssl.gstatic.com/accounts/ui/avatar_2x.png",
  });

  const [userHistory, setUserHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [filterStatus, setFilterStatus] = useState(null);

  useEffect(() => {
    axios
      .get(`https://localhost:7088/api/Accounts/Account/${accountId}`)
      .then((response) => {
        const data = response.data;
        setUser({
          accountName: data.accountName,
          fullName: data.fullName,
          phone: data.phone,
          email: data.email,
          image: data.image
            ? data.image
            : "http://ssl.gstatic.com/accounts/ui/avatar_2x.png",
        });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [accountId]);

  useEffect(() => {
    axios
      .get(`https://localhost:7088/api/Bookings/ByCustomer/${accountId}`)
      .then((response) => {
        const data = response.data;
        setUserHistory(data);
        setFilteredHistory(data); // Initialize filtered history
      })
      .catch((error) => {
        console.error("Error fetching user booking history:", error);
      });
  }, [accountId]);

  useEffect(() => {
    getData();
    document.title = "Thông tin cá nhân";
  }, []);

  const readURL = (input) => {
    if (input.target.files && input.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setUser({ ...user, image: e.target.result });
      };

      reader.readAsDataURL(input.target.files[0]);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username: user.accountName,
      fullName: user.fullName,
      phoneNumber: user.phone,
      email: user.email.trim(),
      imgUrl: user.image,
    };

    axios
      .put(
        `https://localhost:7088/api/Accounts/UpdateProfile/${accountId}`,
        data
      )
      .then((response) => {
        console.log("updated successfully:", response.data);
        toast.success("Update profile successfully");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        toast.error("Update profile failed");
      });
  };

  const getData = async () => {
    try {
      const result = await axios.get("https://localhost:7088/api/BookingTypes");
      console.log(result.data);
      setData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleReset = () => {
    setUser({
      accountName: "",
      fullName: "",
      phone: "",
      email: "",
      image: "http://ssl.gstatic.com/accounts/ui/avatar_2x.png",
    });
  };

  const filterHistory = (status) => {
    setFilterStatus(status);
    setFilteredHistory(userHistory.filter((item) => item.status === status));
  };

  return (
    <div className="container bootstrap snippet">
      <ToastContainer />
      <div className="row">
        <div className="col-sm-12">
          <h1 style={{ visibility: "hidden" }}>Tên khách hàng</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-3">
          <div className="text-center">
            <img
              src={user.image}
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
          <Tabs
            defaultActiveKey="home"
            transition={false}
            id="noanim-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Thông tin cá nhân">
              <div className="col-sm-9">
                <div className="tab-content">
                  <div className="tab-pane active" id="home">
                    <form className="form" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <div className="col-xs-6">
                          <label htmlFor="account-name">
                            <h4>Tên người dùng</h4>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="accountName"
                            id="account-name"
                            placeholder="Account name"
                            value={user.accountName}
                            onChange={(e) =>
                              setUser({ ...user, accountName: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-xs-6">
                          <label htmlFor="full-name">
                            <h4>Họ & Tên</h4>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="fullName"
                            id="full-name"
                            placeholder="Full name"
                            value={user.fullName}
                            onChange={(e) =>
                              setUser({ ...user, fullName: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-xs-6">
                          <label htmlFor="phone">
                            <h4>Số điện thoại</h4>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="phone"
                            id="phone"
                            placeholder="Phone"
                            value={user.phone}
                            onChange={(e) =>
                              setUser({ ...user, phone: e.target.value })
                            }
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
                            placeholder="Email"
                            value={user.email}
                            onChange={(e) =>
                              setUser({ ...user, email: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-xs-12">
                          <br />
                          <button
                            className="btn btn-lg btn-primary"
                            type="button"
                            onClick={handleBack}
                          >
                            <i className="glyphicon glyphicon-repeat"></i> Quay
                            lại
                          </button>
                          <button
                            className="btn btn-lg btn-success"
                            type="submit"
                            style={{ float: "right", marginRight: "0" }}
                          >
                            <i className="glyphicon glyphicon-ok-sign"></i> Lưu
                          </button>
                          <button
                            className="btn btn-lg btn-primary"
                            type="button"
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
            </Tab>
            <Tab eventKey="profile" title="Lịch sử đặt lịch">
              <div>
                <Button
                  className="btn btn-success"
                  onClick={() => filterHistory(true)}
                >
                  Lịch đặt thành công
                </Button>
                <Button
                  className="btn btn-danger"
                  onClick={() => filterHistory(false)}
                >
                  Lịch đặt đã hủy
                </Button>
              </div>
              {filteredHistory.length > 0 ? (
                filteredHistory.map((item, index) => {
                  const datas = data.find(
                    (data) => data.bookingTypeId === item.bookingId
                  );
                  return (
                    <div
                      key={index}
                      className={item.status ? "history" : "cancelled"}
                    >
                      <div>BookingId: {item.bookingId}</div>
                      <div>Booking Type: {datas ? datas.description : ""}</div>
                      <div>Total Hours: {item.totalHours}</div>
                      <div>Total Price: {item.totalPrice}</div>
                      <div>Start Date: {item.startDate}</div>
                      <div>End Date: {item.endDate}</div>
                      <div>Note: {item.note}</div>
                    </div>
                  );
                })
              ) : (
                <p>No court available</p>
              )}
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
