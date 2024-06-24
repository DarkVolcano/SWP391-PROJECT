import React, { useState, useEffect, Fragment } from "react";
import "./StyleDashboardAdmin.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const Users = () => {
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

  const [data, setData] = useState([]);
  const [roles, setRoles] = useState([]);
  const [show, setShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteAccountId, setDeleteAccountId] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("password123");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [roleID, setRoleID] = useState("");
  const [status, setStatus] = useState(true);
  const [image, setImage] = useState("");

  const [editAccountID, setEditAccountID] = useState("");
  const [editAccountname, setEditAccountname] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editFullname, setEditFullname] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRoleID, setEditRoleID] = useState("");
  const [editStatus, setEditStatus] = useState(true);
  const [editImage, setEditImage] = useState("");

  useEffect(() => {
    getData();
    fetchRoles();
  }, []);

  const getData = () => {
    axios
      .get("https://localhost:7088/api/Accounts?pageNumber=1&pageSize=10")
      .then((result) => {
        console.log(result.data);
        setData(result.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDeleteClose = () => setShowDeleteModal(false);
  const handleDeleteShow = (id) => {
    setDeleteAccountId(id);
    setShowDeleteModal(true);
  };
  const handleCreateClose = () => setShowCreateModal(false);
  const handleCreateShow = () => setShowCreateModal(true);

  const handleDelete = () => {
    axios
      .delete(`https://localhost:7088/api/Accounts/id?id=${deleteAccountId}`)
      .then((result) => {
        handleDeleteClose();
        getData();
        toast.success("Account has been delete");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleSave = () => {
    const url = "https://localhost:7088/api/Accounts/CreateAccount";
    const data = {
      accountName: accountName,
      password: password,
      fullName: fullname,
      phone: phone,
      email: email,
      roleId: roleID,
      status: status,
      image: image,
    };

    axios
      .post(url, data)
      .then((result) => {
        getData();
        clear();
        handleCreateClose();
        toast.success("Account has been added");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const clear = () => {
    setAccountName("");
    setPassword("");
    setFullname("");
    setPhone("");
    setEmail("");
    setRoleID("");
    setStatus(true);
    setImage("");
    setEditAccountname("");
    setEditPassword("");
    setEditFullname("");
    setEditPhone("");
    setEditEmail("");
    setEditRoleID("");
    setEditStatus(false);
    setEditImage("");
    setEditAccountID("");
  };

  const handleActiveChange = (e) => {
    if (e.target.checked) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  };

  const handleEditActiveChange = (e) => {
    if (e.target.checked) {
      setEditStatus(true);
    } else {
      setEditStatus(false);
    }
  };

  const columns = [
    { field: "accountName", headerName: "Account Name" },
    { field: "fullName", headerName: "Full Name" },
    { field: "phone", headerName: "Phone" },
    { field: "email", headerName: "Email" },
    { field: "roleId", headerName: "Role" },
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
      renderCell: (params) => {
        const { accountId } = params.row;
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            color="inherit"
            onClick={() => handleDeleteShow(accountId)}
          />,
        ];
      },
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
              <span className="dashboard">Users</span>
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
              getRowId={(data) => data.accountId}
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
              <Modal.Title>Create Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col sm={12}>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter account name"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                  />
                </Col>
                <Col sm={12} style={{ display: "none" }}>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Col>
                <Col sm={12}>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter full name"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </Col>
                <Col sm={12}>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Col>
                <Col sm={12}>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Col>
                <Col sm={12}>
                  <select
                    className="form-control mb-3"
                    value={roleID}
                    onChange={(e) => setRoleID(e.target.value)}
                  >
                    <option value="">Select Role</option>
                    {roles.map((role) => (
                      <option key={role.roleId} value={role.roleId}>
                        {role.roleName}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col sm={12}>
                  <input
                    type="checkbox"
                    checked={status}
                    onChange={handleActiveChange}
                  />
                  <label>Status</label>
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

          <Modal show={showDeleteModal} onHide={handleDeleteClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this account?
            </Modal.Body>
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

export default Users;
