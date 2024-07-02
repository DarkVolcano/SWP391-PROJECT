import React, { useState, useEffect, Fragment } from "react";
import "./StyleDashboardAdmin.css";
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
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ImageIcon from "@mui/icons-material/Image";

const Court = () => {
  const [data, setData] = useState([]);
  const [roles, setRoles] = useState([]);
  const [areas, setAreas] = useState([]);
  const [managers, setManagers] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [show, setShow] = useState(false);
  const [showImage, setShowImage] = useState(false);
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
  const [editAddress, setEditAddress] = useState("");
  const [editTotalRate, setEditTotalRate] = useState("");
  const [editPriceAvr, setEditPriceAvr] = useState("");
  const [editCourtId, setEditCourtId] = useState("");

  useEffect(() => {
    let sidebar = document.querySelector(".sidebarA");
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
    document.title = "Court Management";
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

  const fetchManager = () => {
    axios
      .get("https://localhost:7088/api/Accounts")
      .then((respond) => {
        console.log(respond.data);
        setManagers(respond.data);
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
  const handleCloseImage = () => setShowImage(false);
  const handleShowImage = () => setShowImage(true);
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
      .get(`https://localhost:7088/api/Courts/${id}`)
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
    const url = `https://localhost:7088/api/Courts/${editCourtId}`;
    const data = {
      courtId: editCourtId,
      areaId: editAreaId,
      courtName: editCourtName,
      openTime: editOpenTime.trim(),
      closeTime: editCloseTime,
      rules: editRules,
      image: editImage,
      managerId: editManagerId,
      title: editTitle,
      address: editAddress,
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

  const handleEditImage = (id) => {
    handleShowImage();
    axios
      .get(`https://localhost:7088/api/Courts/UploadCourtImage/${id}`)
      .then((result) => {
        console.log(result.data);
        setEditImage(result.data.image);
        setEditCourtId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateImage = (id) => {
    const url = `https://localhost:7088/api/Courts/UploadCourtImage/${editCourtId}`;
    const data = {
      courtId: editCourtId,
      image: editImage,
    };

    axios
      .put(url, data)
      .then((result) => {
        handleClose();
        getData();
        clear();
        toast.success("Court Image has been update");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleSave = () => {
    const url = "https://localhost:7088/api/Courts";
    const subCourtsArray = [
      {
        number,
        status: subStatus,
      },
    ];

    const amenitiesArray = [
      {
        amenityId,
        status: amenStatus,
      },
    ];

    const slotTimesArray = [
      {
        startTime,
        endTime,
        weekdayPrice,
        weekendPrice,
        status: slotStatus,
      },
    ];

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
      subCourts: subCourtsArray,
      amenities: amenitiesArray,
      slotTimes: slotTimesArray,
    };

    axios
      .post(url, data)
      .then((result) => {
        getData();
        clear();
        console.log(result.data);
        handleCreateClose();
        toast.success("Court has been added");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          toast.error("Validation Error: Please fill in all required fields.");
        } else {
          console.log(error);
          toast.error("An error occurred while adding court.");
        }
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

  const columns = [
    { field: "courtId", headerName: "CourtId" },
    { field: "areaId", headerName: "Area" },
    { field: "courtName", headerName: "Court" },
    {
      field: "time",
      headerName: "Time",
      renderCell: (params) => {
        const { openTime, closeTime } = params.row;
        return `${openTime} - ${closeTime}`;
      },
    },
    {
      field: "image",
      headerName: "Image",
      renderCell: (params) => {
        const { image } = params.row;
        return <img src={image} alt="court" style={{ width: 70 }} />;
      },
    },
    { field: "managerId", headerName: "Manager" },
    { field: "title", headerName: "Title" },
    { field: "address", headerName: "Address" },
    {
      field: "status",
      headerName: "Status",
      renderCell: (params) => {
        const { status } = params.row;
        return status ? <TaskAltIcon /> : <HighlightOffIcon />;
      },
    },
    {
      field: "Action",
      type: "Actions",
      headerName: "Actions",
      cellClassName: "actions",
      renderCell: (params) => (
        <>
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            color="inherit"
            onClick={() => handleEdit(params.row.courtId)}
          />
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            color="inherit"
            onClick={() => handleDeleteShow(params.row.courtId)}
          />
          <GridActionsCellItem
            icon={<ImageIcon />}
            label="Image"
            color="inherit"
            onClick={() => handleEditImage(params.row.courtId)}
          />
        </>
      ),
    },
  ];

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

          <div style={{ width: "100%" }}>
            <DataGrid
              getRowId={(data) => data.courtId}
              columns={columns}
              rows={data}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 7,
                  },
                },
              }}
              pageSizeOptions={[7]}
              sx={{
                width: "-webkit-fill-available",
              }}
            />
          </div>

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
                {/*<Col sm={6}>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter rule"
                    value={rules}
                    onChange={(e) => setRules(e.target.value)}
                  />
                </Col>*/}
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
                          value={manager.accountId}
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
                <Col sm={6}>
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
                <Col sm={6}>
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
                <Col sm={6}>
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
                <Col sm={6}>
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

          <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Modify / Update Court</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col sm={12}>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter court name"
                    value={editCourtName}
                    onChange={(e) => setEditCourtName(e.target.value)}
                  />
                </Col>
                <Col sm={12}>
                  <input
                    type="time"
                    className="form-control mb-3"
                    placeholder="Choose open time"
                    value={editOpenTime}
                    onChange={(e) => setEditOpenTime(e.target.value)}
                  />
                </Col>
                <Col sm={12}>
                  <input
                    type="time"
                    className="form-control mb-3"
                    placeholder="Choose close time"
                    value={editCloseTime}
                    onChange={(e) => setEditCloseTime(e.target.value)}
                  />
                </Col>
                <Col sm={12}>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter email"
                    value={editRules}
                    onChange={(e) => setEditRules(e.target.value)}
                  />
                </Col>
                <Col sm={12}>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter title"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                </Col>
                <Col sm={12}>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter address"
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                  />
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
          </Modal>

          <Modal
            show={showImage}
            onHide={handleCloseImage}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Modify / Update Court Image</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col sm={12}>
                  <input
                    type="file"
                    className="form-control mb-3"
                    placeholder="Enter address"
                    value={editImage}
                    onChange={(e) => setEditImage(e.target.value)}
                  />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseImage}>
                Close
              </Button>
              <Button variant="primary" onClick={handleUpdateImage}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

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
