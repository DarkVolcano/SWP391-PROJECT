import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Button } from "react-bootstrap";

const NewsDetail = () => {
  const { user } = useContext(UserContext);
  const { postId } = useParams(); // Get the postId from URL parameters
  const [data, setData] = useState("");
  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    getData();
  }, [postId]);

  useEffect(() => {
    if (data.context) {
      document.title = data.context;
    }
  }, [data.context]);

  useEffect(() => {
    axios
      .get(`https://localhost:7088/api/Accounts/${user.accountId}/Image`, {
        responseType: "blob",
      })
      .then((response) => {
        const url = URL.createObjectURL(response.data);
        setUserImage(url);
      })
      .catch((error) => {
        console.error("Error fetching user image:", error);
      });
  }, [user.accountId]);

  const getData = () => {
    axios
      .get(`https://localhost:7088/api/Posts/${postId}`) // Fetch the specific post by postId
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="court-name">{data.context}</div>
      <div
        style={{
          display: "grid",
          justifyContent: "center",
          gridTemplateColumns: "50% 50%",
          margin: "0 112px",
        }}
      ></div>
      <div className="tooltip-container">
        <span className="tooltip">
          <span style={{ display: "flex", margin: "3px" }}>
            <strong className="available"></strong> : Available
            <strong className="unavailable"></strong> : Unavailable
          </span>
        </span>
        <span className="text">?</span>
      </div>
      <div className="full-infor" style={{ margin: "63px 138px" }}>
        <div className="court-con">Quy định</div>
        <div className="rule" style={{ marginTop: "11px" }}>
          {data.title}
        </div>
      </div>
      <InputGroup style={{ justifyContent: "center", marginBottom: "40px" }}>
        <InputGroup.Text>
          {userImage ? (
            <img
              src={userImage}
              alt="User"
              style={{ width: "30px", height: "30px", borderRadius: "20px" }}
            />
          ) : (
            <div
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: "gray",
              }}
            ></div>
          )}
        </InputGroup.Text>
        <div class="col-sm-9">
          <Form.Control as="textarea" aria-label="With textarea" rows={4} />
          <Button variant="primary float-end mt-2">Bình luận</Button>
        </div>
      </InputGroup>
    </>
  );
};

export default NewsDetail;
