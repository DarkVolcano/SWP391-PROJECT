import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "./UserContext";

const Book = () => {
  const [data, setData] = useState([]);
  const [areas, setAreas] = useState([]);
  const [search, setSearch] = useState("");
  const { setCourt } = useContext(UserContext);

  useEffect(() => {
    getData();
    fetchArea();
  }, []);

  const getData = () => {
    axios
      .get("https://localhost:7088/api/Courts?pageNumber=1&pageSize=10")
      .then((result) => {
        console.log(result.data);
        setData(result.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchArea = () => {
    axios
      .get("https://localhost:7088/api/Areas")
      .then((response) => {
        console.log(response.data);
        setAreas(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const url = `https://localhost:7088/api/Courts/Search-Court?searchTerm=${search}&pageNumber=1&pageSize=10`;

    axios
      .get(url)
      .then((response) => {
        console.log("Search result:", response.data.items);
        setData(response.data.items);
        toast.success("Search successfully");
      })
      .catch((error) => {
        console.error("Error searching:", error);
        toast.error("Failed to search courts");
        setData([]);
      });
  };

  const handleBookingClick = (court) => {
    setCourt(court);
  };

  return (
    <div className="body-book">
      <ToastContainer />
      <div className="book-fil">
        <div className="form-floating mb-3">
          <input
            type="date"
            className="form-control"
            id="chooseday"
            placeholder="Choose date"
          />
          <label htmlFor="chooseday" className="form-label">
            Choose day
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="chooseplace"
            placeholder="Choose place"
          />
          <label htmlFor="chooseplace" className="form-label">
            Choose place
          </label>
        </div>
      </div>
      <form
        className="col-md-4"
        style={{
          width: "auto",
          height: "auto",
          display: "flex",
          justifyContent: "center",
          maxWidth: "100%",
        }}
        onSubmit={handleSearch}
      >
        <div className="form-floating">
          <input
            id="searchTerm"
            type="text"
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            required
          />
          <label htmlFor="searchTerm" className="form-label">
            Search court name
          </label>
        </div>
        <div className="d-grid" style={{ margin: "0 12px" }}>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>
      <div className="tooltip-container">
        <span className="tooltip">
          <span className="reject">Reject; Not Check In/Out Yet</span>
          <span>Main Task :</span>
          <span>Extra Work/Change Location</span>
        </span>
        <span className="text">?</span>
      </div>
      {data && data.length > 0 ? (
        data.map((item, index) => {
          const area = areas.find((area) => area.areaId === item.areaId);
          return (
            <div className="book-box" key={index}>
              <div className="book-infor">
                <div className="book-text">
                  <div className="book-place">{item.courtName}</div>
                  <div className="book-slot">
                    {item.openTime} - {item.closeTime}
                    <NavLink
                      to={`/BookInfor/${item.courtId}`}
                      onClick={() => handleBookingClick(item)}
                    >
                      Đặt ngay
                    </NavLink>
                  </div>
                  <div className="book-price">
                    Giá tham khảo: {item.priceAvr} VND
                  </div>
                  <div className="book-con">
                    Khu vực: {area ? area.location : "Unknown"}
                  </div>
                  <div className="book-con">Địa chỉ: {item.address}</div>
                  <div className="book-con">
                    Tiêu chuẩn sân: Tiêu chuẩn quốc tế
                  </div>
                </div>
                <div className="book-image">
                  <img src={item.image} alt={item.courtName} />
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No court available</p>
      )}
    </div>
  );
};

export default Book;
