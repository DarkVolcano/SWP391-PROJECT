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
    document.title = "Đặt lịch";
  }, []);

  const getData = () => {
    axios
      .get("https://localhost:7088/api/Courts")
      .then((result) => {
        console.log(result.data);
        setData(result.data);
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

    const url = `https://localhost:7088/api/Courts/Search-Court?searchTerm=${search}`;

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
      <form
        className="col-md-4"
        style={{
          width: "auto",
          height: "auto",
          display: "flex",
          justifyContent: "center",
          maxWidth: "100%",
          marginTop: "60px",
        }}
        onSubmit={handleSearch}
      >
        <div className="form-floating col-md-5">
          <input
            id="searchTerm"
            type="search"
            className="form-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            required
            placeholder="Search court name"
          />
        </div>
        <div className="d-grid" style={{ margin: "0 12px" }}>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>
      <div className="tooltip-container">
        <span className="tooltip">
          <span>Search court name</span>
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
