import React, { useState, useEffect, Fragment } from "react";
import "./StyleDashboard.css";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Court = () => {
  const [data, setData] = useState([]);
  const [roles, setRoles] = useState([]);
  const [areas, setAreas] = useState([]);
  const [managers, setManagers] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [show, setShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteCourtId, setDeleteCourtId] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [areaId, setAreaId] = useState("");
  const [courtName, setCourtName] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [rules, setRules] = useState("");
  const [status, setStatus] = useState(true);
  const [image, setImage] = useState("");
  const [managerId, setManagerId] = useState("");
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [totalRate, setTotalRate] = useState("");
  const [priceAvr, setPriceAvr] = useState("");
  const [courtId, setCourtId] = useState("");

  const [number, setNumber] = useState("");
  const [subStatus, setSubStatus] = useState(true);

  const [amenityId, setAmenityId] = useState("");
  const [amenStatus, setAmenStatus] = useState(true);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [weekdayPrice, setWeekdayPrice] = useState("");
  const [weekendPrice, setWeekendPrice] = useState("");
  const [slotStatus, setSlotStatus] = useState(true);

  const [editAreaId, setEditAreaId] = useState("");
  const [editCourtName, setEditCourtName] = useState("");
  const [editOpenTime, setEditOpenTime] = useState("");
  const [editCloseTime, setEditCloseTime] = useState("");
  const [editRules, setEditRules] = useState("");
  const [editStatus, setEditStatus] = useState(true);
  const [editImage, setEditImage] = useState("");
  const [editManagerId, setEditManagerId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editaddress, setEditAddress] = useState("");
  const [editTotalRate, setEditTotalRate] = useState("");
  const [editPriceAvr, setEditPriceAvr] = useState("");
  const [editCourtId, setEditCourtId] = useState("");

  useEffect(() => {
    let sidebar = document.querySelector(".sidebar");
    let sidebarBtn = document.querySelector(".sidebarBtn");
    sidebarBtn.onclick = function () {
      sidebar.classList.toggle("active");
      if (sidebar.classList.contains("active")) {
        sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
      } else {
        sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
      }
    };
  }, []);

  useEffect(() => {
    getData();
    fetchArea();
    fetchManager();
    fetchAmenity();
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

  const fetchManager = () => {
    axios
      .get("https://localhost:7088/api/Accounts?pageNumber=1&pageSize=10")
      .then((respond) => {
        console.log(respond.data);
        setManagers(respond.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = () => {
    axios
      .get("https://localhost:7088/api/Roles")
      .then((response) => {
        console.log(response.data);
        setRoles(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchAmenity = () => {
    axios
      .get("https://localhost:7088/api/Amenities")
      .then((responses) => {
        console.log(responses.data);
        setAmenities(responses.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setRules(data);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDeleteClose = () => setShowDeleteModal(false);
  const handleDeleteShow = (id) => {
    setDeleteCourtId(id);
    setShowDeleteModal(true);
  };
  const handleCreateClose = () => setShowCreateModal(false);
  const handleCreateShow = () => setShowCreateModal(true);

  const handleDelete = () => {
    axios
      .delete(`https://localhost:7088/api/Courts/${deleteCourtId}`)
      .then((result) => {
        handleDeleteClose();
        getData();
        toast.success("Court has been delete");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleEdit = (id) => {
    handleShow();
    axios
      .get(`https://localhost:7088/api/Accounts/id?id=${id}`)
      .then((result) => {
        console.log(result.data);
        setEditAreaId(result.data.areaId);
        setEditCourtName(result.data.courtName);
        setEditOpenTime(result.data.openTime);
        setEditCloseTime(result.data.closeTime);
        setEditRules(result.data.rules);
        setEditImage(result.data.image);
        setEditManagerId(result.data.managerId);
        setEditTitle(result.data.title);
        setEditAddress(result.data.address);
        setEditTotalRate(result.data.totalRate);
        setEditPriceAvr(result.data.priceAvr);
        setEditStatus(result.data.status);
        setEditCourtId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = (id) => {
    const url = `https://localhost:7088/api/Accounts/id?id=${editCourtId}`;
    const data = {
      courtId: editCourtId,
      areaId: editAreaId,
      courtName: editCourtName,
      openTime: editOpenTime,
      closeTime: editCloseTime,
      rules: editRules,
      image: editImage,
      managerId: editManagerId,
      title: editTitle,
      address: editaddress,
      totalRate: editTotalRate,
      priceAvr: editPriceAvr,
      status: editStatus,
    };

    axios
      .put(url, data)
      .then((result) => {
        handleClose();
        getData();
        clear();
        toast.success("Court has been update");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleSave = () => {
    const url = "https://localhost:7088/api/Courts";
    const data = {
      areaId: areaId,
      courtName: courtName,
      openTime: openTime,
      closeTime: closeTime,
      rules: rules,
      image: image,
      managerId: managerId,
      title: title,
      address: address,
      totalRate: totalRate,
      priceAvr: priceAvr,
      status: status,
      number: number,
      subStatus: status,
      amenityId: amenityId,
      amenStatus: status,
      startTime: startTime,
      endTime: endTime,
      weekdayPrice: weekdayPrice,
      weekendPrice: weekendPrice,
      slotStatus: status,
    };

    axios
      .post(url, data)
      .then((result) => {
        getData();
        clear();
        handleCreateClose();
        toast.success("Court has been added");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const clear = () => {
    setAreaId("");
    setCourtName("");
    setOpenTime("");
    setCloseTime("");
    setRules("");
    setImage("");
    setManagerId("");
    setTitle("");
    setAddress("");
    setTotalRate("");
    setPriceAvr("");
    setStatus(true);
    setNumber("");
    setSubStatus(true);
    setAmenityId("");
    setAmenStatus(true);
    setStartTime("");
    setEndTime("");
    setWeekdayPrice("");
    setWeekendPrice("");
    setSlotStatus(true);
    setEditAreaId("");
    setEditCourtName("");
    setEditOpenTime("");
    setEditCloseTime("");
    setEditRules("");
    setEditImage("");
    setEditManagerId("");
    setEditTitle("");
    setEditAddress("");
    setEditTotalRate("");
    setEditPriceAvr("");
    setEditStatus(false);
    setEditCourtId("");
  };

  const handleActiveChange = (e) => {
    if (e.target.checked) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  };

  const handleCourtActive = (e) => {
    if (e.target.defaultChecked) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  };

  const handleSubActive = (e) => {
    if (e.target.defaultChecked) {
      setSubStatus(true);
    } else {
      setSubStatus(false);
    }
  };

  const handleAmenActive = (e) => {
    if (e.target.defaultChecked) {
      setAmenStatus(true);
    } else {
      setAmenStatus(false);
    }
  };

  const handleSlotActive = (e) => {
    if (e.target.defaultChecked) {
      setSlotStatus(true);
    } else {
      setSlotStatus(false);
    }
  };

  // const handleEditActiveChange = (e) => {
  //   if (e.target.checked) {
  //     setEditStatus(true);
  //   } else {
  //     setEditStatus(false);
  //   }
  // };

  return (
    <>
      <Fragment>
        <ToastContainer />
        <section className="home-section" style={{ padding: "0 27px" }}>
          <nav>
            <div className="sidebar-button">
              <i className="bx bx-menu sidebarBtn"></i>
              <span className="dashboard">Court</span>
            </div>
          </nav>
          <div className="home-content">
            <div className="infor">
              <div className="total">{data.length} total</div>
              <div className="function">
                <Button
                  className="btn btn-primary create"
                  onClick={handleCreateShow}
                >
                  Create
                </Button>
              </div>
            </div>
          </div>

          <Table
            striped
            bordered
            hover
            style={{ margin: "14px 0", border: "none" }}
          >
            <thead>
              <tr>
                <th style={{ display: "none" }}>#</th>
                <th style={{ borderTopLeftRadius: "10px", border: "none" }}>
                  Area
                </th>
                <th>Court Name</th>
                <th>Open Time</th>
                <th>Close Time</th>
                <th>Rules</th>
                <th>Image</th>
                <th>Manager</th>
                <th>Title</th>
                <th>Address</th>
                <th style={{ display: "none" }}>Total Rate</th>
                <th style={{ display: "none" }}>Price Average</th>
                <th className="center">Status</th>
                <th className="center" style={{ borderTopRightRadius: "10px" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0
                ? data.map((item, index) => {
                    const area = areas.find(
                      (area) => area.areaId === item.areaId
                    );
                    const manager = managers.find(
                      (manager) => manager.accountId === item.managerId
                    );
                    return (
                      <tr key={index}>
                        <td style={{ display: "none" }}>{index + 1}</td>
                        <td className="center">
                          {area ? area.location : "Unknown"}
                        </td>
                        <td>{item.courtName}</td>
                        <td>{item.openTime}</td>
                        <td>{item.closeTime}</td>
                        <td>{item.rules}</td>
                        <td>
                          <img src={item.image} style={{ width: "100px" }} />
                        </td>
                        <td className="center">
                          {manager ? manager.fullName : "Unknown"}
                        </td>
                        <td>{item.title}</td>
                        <td>{item.address}</td>
                        <td style={{ display: "none" }}>{item.totalRate}</td>
                        <td style={{ display: "none" }}>{item.priceAvr}</td>
                        <td className="center">
                          {item.status ? "Active" : "Disable"}
                        </td>
                        <td className="center">
                          <svg
                            width="33"
                            height="33"
                            viewBox="0 0 54 54"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => handleEdit(item.courtId)}
                            style={{
                              background: "#000",
                              borderRadius: "30px",
                              padding: "4px",
                              cursor: "pointer",
                            }}
                          >
                            <mask
                              id="mask0_544_736"
                              style={{ maskType: "alpha" }}
                              maskUnits="userSpaceOnUse"
                              x="0"
                              y="0"
                              width="54"
                              height="54"
                            >
                              <path
                                d="M28.0405 16.8232L13.6385 31.2252L13.6385 31.2252C12.993 31.8707 12.6702 32.1935 12.458 32.59C12.2458 32.9865 12.1563 33.4341 11.9772 34.3293L10.5415 41.5081C10.3394 42.5183 10.2384 43.0235 10.5258 43.3108C10.8131 43.5982 11.3182 43.4971 12.3285 43.2951L19.5073 41.8593L19.5073 41.8593C20.4025 41.6803 20.85 41.5908 21.2466 41.3786C21.6431 41.1664 21.9658 40.8436 22.6114 40.1981L37.0133 25.7961L28.0405 16.8232Z"
                                fill="white"
                              />
                              <path
                                d="M28.0405 16.8232L13.6385 31.2252L13.6385 31.2252C12.993 31.8707 12.6702 32.1935 12.458 32.59C12.2458 32.9865 12.1563 33.4341 11.9772 34.3293L10.5415 41.5081C10.3394 42.5183 10.2384 43.0235 10.5258 43.3108C10.8131 43.5982 11.3182 43.4971 12.3285 43.2951L19.5073 41.8593L19.5073 41.8593C20.4025 41.6803 20.85 41.5908 21.2466 41.3786C21.6431 41.1664 21.9658 40.8436 22.6114 40.1981L37.0133 25.7961L28.0405 16.8232Z"
                                fill="black"
                                fill-opacity="0.1"
                              />
                              <path
                                d="M13.7635 31.5729L13.7635 31.5729C13.7328 31.6035 13.7024 31.6338 13.6724 31.6638C13.1697 32.1658 12.7583 32.5766 12.469 33.0874C12.1798 33.5983 12.0392 34.1624 11.8675 34.8517C11.8572 34.8929 11.8468 34.9345 11.8363 34.9766L10.6151 39.8616C10.609 39.8859 10.6029 39.9102 10.5968 39.9345C10.4757 40.4185 10.353 40.9086 10.3132 41.315C10.2699 41.7573 10.2861 42.4484 10.8372 42.9994C11.3882 43.5505 12.0793 43.5667 12.5216 43.5234C12.928 43.4837 13.4181 43.361 13.9021 43.2398C13.9264 43.2337 13.9507 43.2276 13.975 43.2216L18.86 42.0003C18.9021 41.9898 18.9437 41.9794 18.9849 41.9692C19.6742 41.7974 20.2384 41.6568 20.7492 41.3676C21.2601 41.0783 21.6708 40.6669 22.1728 40.1642C22.2028 40.1342 22.2331 40.1038 22.2638 40.0731L37.8981 24.4388L37.9315 24.4054C38.4708 23.8661 38.9255 23.4115 39.2697 23.0097C39.6297 22.5893 39.938 22.1501 40.1256 21.6203C40.4536 20.694 40.4536 19.6832 40.1256 18.7569C39.938 18.2272 39.6297 17.7879 39.2697 17.3676C38.9255 16.9658 38.4708 16.5111 37.9314 15.9718L37.8981 15.9385L37.8648 15.9051C37.3255 15.3658 36.8708 14.9111 36.469 14.5669C36.0487 14.2069 35.6094 13.8986 35.0797 13.7111C34.1534 13.3831 33.1426 13.3831 32.2163 13.7111C31.6865 13.8986 31.2473 14.2069 30.827 14.5669C30.4251 14.9111 29.9705 15.3658 29.4312 15.9052L29.3978 15.9385L13.8014 31.535L13.8013 31.535L13.7635 31.5729Z"
                                stroke="white"
                                stroke-width="2.50406"
                              />
                              <path
                                d="M13.7635 31.5729L13.7635 31.5729C13.7328 31.6035 13.7024 31.6338 13.6724 31.6638C13.1697 32.1658 12.7583 32.5766 12.469 33.0874C12.1798 33.5983 12.0392 34.1624 11.8675 34.8517C11.8572 34.8929 11.8468 34.9345 11.8363 34.9766L10.6151 39.8616C10.609 39.8859 10.6029 39.9102 10.5968 39.9345C10.4757 40.4185 10.353 40.9086 10.3132 41.315C10.2699 41.7573 10.2861 42.4484 10.8372 42.9994C11.3882 43.5505 12.0793 43.5667 12.5216 43.5234C12.928 43.4837 13.4181 43.361 13.9021 43.2398C13.9264 43.2337 13.9507 43.2276 13.975 43.2216L18.86 42.0003C18.9021 41.9898 18.9437 41.9794 18.9849 41.9692C19.6742 41.7974 20.2384 41.6568 20.7492 41.3676C21.2601 41.0783 21.6708 40.6669 22.1728 40.1642C22.2028 40.1342 22.2331 40.1038 22.2638 40.0731L37.8981 24.4388L37.9315 24.4054C38.4708 23.8661 38.9255 23.4115 39.2697 23.0097C39.6297 22.5893 39.938 22.1501 40.1256 21.6203C40.4536 20.694 40.4536 19.6832 40.1256 18.7569C39.938 18.2272 39.6297 17.7879 39.2697 17.3676C38.9255 16.9658 38.4708 16.5111 37.9314 15.9718L37.8981 15.9385L37.8648 15.9051C37.3255 15.3658 36.8708 14.9111 36.469 14.5669C36.0487 14.2069 35.6094 13.8986 35.0797 13.7111C34.1534 13.3831 33.1426 13.3831 32.2163 13.7111C31.6865 13.8986 31.2473 14.2069 30.827 14.5669C30.4251 14.9111 29.9705 15.3658 29.4312 15.9052L29.3978 15.9385L13.8014 31.535L13.8013 31.535L13.7635 31.5729Z"
                                stroke="black"
                                stroke-opacity="0.1"
                                stroke-width="2.50406"
                              />
                              <path
                                d="M28.04 16.8232L37.0129 25.7961"
                                stroke="white"
                                stroke-width="2.50406"
                              />
                              <path
                                d="M28.04 16.8232L37.0129 25.7961"
                                stroke="black"
                                stroke-opacity="0.1"
                                stroke-width="2.50406"
                              />
                            </mask>
                            <g mask="url(#mask0_544_736)">
                              <rect
                                x="-10.0234"
                                y="-0.12793"
                                width="64.1115"
                                height="59.1798"
                                fill="#F49D1A"
                              />
                            </g>
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-trash"
                            width="33"
                            height="33"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            onClick={() => handleDeleteShow(item.courtId)}
                            style={{
                              background: "#000",
                              borderRadius: "30px",
                              padding: "4px",
                              cursor: "pointer",
                            }}
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <line
                              x1="4"
                              y1="7"
                              x2="20"
                              y2="7"
                              style={{ color: "red" }}
                            />
                            <line
                              x1="10"
                              y1="11"
                              x2="10"
                              y2="17"
                              style={{ color: "red" }}
                            />
                            <line
                              x1="14"
                              y1="11"
                              x2="14"
                              y2="17"
                              style={{ color: "red" }}
                            />
                            <path
                              d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"
                              style={{ color: "red" }}
                            />
                            <path
                              d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"
                              style={{ color: "red" }}
                            />
                          </svg>
                        </td>
                      </tr>
                    );
                  })
                : "Loading..."}
            </tbody>
          </Table>

          <Modal
            show={showCreateModal}
            onHide={handleCreateClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Create Court</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h3>Court</h3>
              <Row>
                <Col sm={6}>
                  <select
                    className="form-control mb-3"
                    value={areaId}
                    onChange={(e) => setAreaId(e.target.value)}
                  >
                    <option value="">Select Area</option>
                    {areas.map((area) => (
                      <option key={area.areaId} value={area.areaId}>
                        {area.location}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col sm={6}>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter court name"
                    value={courtName}
                    onChange={(e) => setCourtName(e.target.value)}
                  />
                </Col>
                <Col sm={6}>
                  <input
                    type="time"
                    className="form-control mb-3"
                    placeholder="Enter open time"
                    value={openTime}
                    onChange={(e) => setOpenTime(e.target.value)}
                  />
                </Col>
                <Col sm={6}>
                  <input
                    type="time"
                    className="form-control mb-3"
                    placeholder="Enter close time"
                    value={closeTime}
                    onChange={(e) => setCloseTime(e.target.value)}
                  />
                </Col>
                <Col sm={12}>
                  <CKEditor
                    editor={ClassicEditor}
                    data={rules}
                    onChange={handleEditorChange}
                  />
                </Col>
                <Col sm={6}>
                  <input
                    type="file"
                    className="form-control mb-3"
                    placeholder="Choose image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </Col>
                <Col sm={6}>
                  <select
                    className="form-control mb-3"
                    value={managerId}
                    onChange={(e) => setManagerId(e.target.value)}
                  >
                    <option value="">Select Manager</option>
                    {managers
                      .filter((manager) => manager.roleId === 4)
                      .map((manager) => (
                        <option
                          key={manager.managerId}
                          value={manager.managerId}
                        >
                          {manager.fullName}
                        </option>
                      ))}
                  </select>
                </Col>
                <Col sm={6}>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Col>
                <Col sm={6}>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Col>
                <Col sm={6}>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter rate"
                    value={totalRate}
                    onChange={(e) => setTotalRate(e.target.value)}
                  />
                </Col>
                <Col sm={6}>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter price"
                    value={priceAvr}
                    onChange={(e) => setPriceAvr(e.target.value)}
                  />
                </Col>
                <Col sm={6} style={{ display: "none" }}>
                  {/* <input
                    type="checkbox"
                    checked={status}
                    onChange={handleActiveChange}
                  />
                  <label>Status</label> */}
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Status"
                    defaultChecked={status}
                    onChange={handleCourtActive}
                    style={{ paddingLeft: "2.5em" }}
                  />
                </Col>
              </Row>
              <h3>Sub</h3>
              <Row>
                <Col sm={6}>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter sub name"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </Col>
                <Col sm={6} style={{ display: "none" }}>
                  {/* <input
                    type="checkbox"
                    checked={subStatus}
                    onChange={handleActiveChange}
                  />
                  <label>Status</label> */}
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Status"
                    defaultChecked={subStatus}
                    onChange={handleSubActive}
                    style={{ paddingLeft: "2.5em" }}
                  />
                </Col>
              </Row>
              <h3>Amenity</h3>
              <Row>
                <Col sm={6}>
                  <select
                    className="form-control mb-3"
                    value={amenityId}
                    onChange={(e) => setAmenityId(e.target.value)}
                  >
                    <option value="">Select Amenity</option>
                    {amenities.map((amenity) => (
                      <option key={amenity.amenityId} value={amenity.amenityId}>
                        {amenity.description}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col sm={6} style={{ display: "none" }}>
                  {/* <input
                    type="checkbox"
                    checked={amenStatus}
                    onChange={handleActiveChange}
                  />
                  <label>Status</label> */}
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Status"
                    defaultChecked={amenStatus}
                    onChange={handleAmenActive}
                    style={{ paddingLeft: "2.5em" }}
                  />
                </Col>
              </Row>
              <h3>Slot</h3>
              <Row>
                <Col sm={6}>
                  <input
                    type="time"
                    className="form-control mb-3"
                    placeholder="Enter start time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </Col>
                <Col sm={6}>
                  <input
                    type="time"
                    className="form-control mb-3"
                    placeholder="Enter end time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </Col>
                <Col sm={6}>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter week day price"
                    value={weekdayPrice}
                    onChange={(e) => setWeekdayPrice(e.target.value)}
                  />
                </Col>
                <Col sm={6}>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter weekend price"
                    value={weekendPrice}
                    onChange={(e) => setWeekendPrice(e.target.value)}
                  />
                </Col>
                <Col sm={6} style={{ display: "none" }}>
                  {/* <input
                    type="checkbox"
                    checked={status}
                    onChange={handleActiveChange}
                  />
                  <label>Status</label> */}
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Status"
                    defaultChecked={slotStatus}
                    onChange={handleSlotActive}
                    style={{ paddingLeft: "2.5em" }}
                  />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCreateClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>

          {/* <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Modify / Update Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col sm={12}>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter account name"
                    value={editAccountname}
                    onChange={(e) => setEditAccountname(e.target.value)}
                  />
                </Col>
                <Col sm={12}>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter full name"
                    value={editFullname}
                    onChange={(e) => setEditFullname(e.target.value)}
                  />
                </Col>
                <Col sm={12}>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter phone"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                  />
                </Col>
                <Col sm={12}>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                  />
                </Col>
                <Col sm={12}>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter role id"
                    value={editRoleID}
                    onChange={(e) => setEditRoleID(e.target.value)}
                  />
                </Col>
                <Col sm={12}>
                  <input
                    type="checkbox"
                    checked={editStatus}
                    onChange={(e) => handleEditActiveChange(e)}
                    value={editStatus}
                  />
                  <label>Status</label>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleUpdate}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal> */}

          <Modal show={showDeleteModal} onHide={handleDeleteClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this court?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleDeleteClose}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </section>
      </Fragment>
    </>
  );
};

export default Court;
