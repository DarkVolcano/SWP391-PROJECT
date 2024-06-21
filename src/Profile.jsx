// import { Navigate, useParams } from "react-router-dom";
// import { useState, useEffect } from "react";

// export const Profile = () => {

//   const [image, setImage] = useState(
//     "http://ssl.gstatic.com/accounts/ui/avatar_2x.png"
//   );

//   const readURL = (input) => {
//     if (input.target.files && input.target.files[0]) {
//       const reader = new FileReader();

//       reader.onload = (e) => {
//         setImage(e.target.result);
//       };

//       reader.readAsDataURL(input.target.files[0]);
//     }
//   };

//   const { id } = useParams(); // Assuming your route parameter is 'id'
//   const [user, setUser] = useState({
//     accountName: "",
//     fullName: "",
//     phone: "",
//     email: "",
//     image: "http://ssl.gstatic.com/accounts/ui/avatar_2x.png",
//   });

//   useEffect(() => {
//     fetch(`https://localhost:7088/api/Accounts/Account/${id}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setUser({
//           accountName: data.accountName,
//           fullName: data.fullName,
//           phone: data.phone,
//           email: data.email,
//           image: data.image
//             ? data.image
//             : "http://ssl.gstatic.com/accounts/ui/avatar_2x.png",
//         });
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//       });
//   }, [id]);

//   const handleReset = () => {
//     setUser({
//       accountName: "",
//       fullName: "",
//       phone: "",
//       email: "",
//       image: "",
//     });
//   };

//   const handleUpdate = (id) => {
//     const url = `https://localhost:7088/api/Accounts/UpdateProfile/${editAccountID}`;
//     const data = {
//       accountId: editAccountID,
//       accountName: editAccountname,
//       password: editPassword,
//       fullName: editFullname,
//       phone: editPhone,
//       email: editEmail,
//       roleId: editRoleID,
//       status: editStatus,
//       image: editImage,
//     };

//     axios
//       .put(url, data)
//       .then((result) => {
//         handleClose();
//         getData();
//         clear();
//         toast.success("Account has been update");
//       })
//       .catch((error) => {
//         toast.error(error);
//       });
//   };

//   const handleBack = () => {
//     Navigate("/");
//   };

//   return (
//     <div className="container bootstrap snippet">
//       <div className="row">
//         <div className="col-sm-12">
//           <h1 style={{ visibility: "hidden" }}>User name</h1>
//         </div>
//       </div>
//       <div className="row">
//         <div className="col-sm-3">
//           <div className="text-center">
//             <img
//               src={user.image}
//               className="avatar img-circle img-thumbnail"
//               alt="avatar"
//             />
//             <h6>Upload a different photo...</h6>
//             <input
//               type="file"
//               className="text-center center-block file-upload"
//               onChange={readURL}
//               style={{ width: "-webkit-fill-available" }}
//             />
//           </div>
//           <br />
//         </div>
//         <div className="col-sm-9">
//           <div className="tab-content">
//             <div className="tab-pane active" id="home">
//               {/* <form className="form" onSubmit={handleSubmit}> */}
//               <form className="form">
//                 <div className="form-group">
//                   <div className="col-xs-6">
//                     <label htmlFor="account-name">
//                       <h4>Account name</h4>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="account-name"
//                       id="account-name"
//                       placeholder="Account name"
//                       value={user.accountName}
//                       // onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//                 <div className="form-group">
//                   <div className="col-xs-6">
//                     <label htmlFor="full-name">
//                       <h4>Full name</h4>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="full-name"
//                       id="full-name"
//                       placeholder="Full name"
//                       value={user.fullName}
//                       // onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//                 <div className="form-group">
//                   <div className="col-xs-6">
//                     <label htmlFor="phone">
//                       <h4>Phone</h4>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="phone"
//                       id="phone"
//                       placeholder="Phone"
//                       value={user.phone}
//                       // onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//                 <div className="form-group">
//                   <div className="col-xs-6">
//                     <label htmlFor="email">
//                       <h4>Email</h4>
//                     </label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       name="email"
//                       id="email"
//                       placeholder="Email"
//                       value={user.email}
//                       // onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//                 <div className="form-group">
//                   <div className="col-xs-12">
//                     <br />
//                     <button
//                       className="btn btn-lg btn-primary"
//                       type="submit"
//                       onClick={handleBack}
//                     >
//                       <i className="glyphicon glyphicon-repeat"></i> Back
//                     </button>
//                     <button
//                       className="btn btn-lg btn-success"
//                       type="submit"
//                       style={{ float: "right", marginRight: "0" }}
//                       onClick={handleUpdate}
//                     >
//                       <i className="glyphicon glyphicon-ok-sign"></i> Save
//                     </button>
//                     <button
//                       className="btn btn-lg btn-primary"
//                       type="submit"
//                       onClick={handleReset}
//                       style={{ float: "right" }}
//                     >
//                       <i className="glyphicon glyphicon-repeat"></i> Reset
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// export const Profile = () => {
//   const navigate = useNavigate();
//   const { accountId } = useParams(); // Assuming your route parameter is 'id'

//   const [user, setUser] = useState({
//     accountName: "",
//     fullName: "",
//     phone: "",
//     email: "",
//     image: "http://ssl.gstatic.com/accounts/ui/avatar_2x.png", // Initial image
//   });

//   useEffect(() => {
//     fetch(`https://localhost:7088/api/Accounts/UpdateProfile/${accountId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setUser({
//           accountName: data.accountName,
//           fullName: data.fullName,
//           phone: data.phone,
//           email: data.email,
//           image: data.image
//             ? data.image
//             : "http://ssl.gstatic.com/accounts/ui/avatar_2x.png",
//         });
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//       });
//   }, [accountId]);

//   const readURL = (input) => {
//     if (input.target.files && input.target.files[0]) {
//       const reader = new FileReader();

//       reader.onload = (e) => {
//         setUser({ ...user, image: e.target.result });
//       };

//       reader.readAsDataURL(input.target.files[0]);
//     }
//   };

//   const handleBack = () => {
//     navigate("/");
//   };

//   // Handle form submission logic
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", user);
//     // Add your logic to submit the form data
//   };

//   // Handle resetting form fields
//   const handleReset = () => {
//     setUser({
//       accountName: "",
//       fullName: "",
//       phone: "",
//       email: "",
//       image: "http://ssl.gstatic.com/accounts/ui/avatar_2x.png",
//     });
//   };

//   return (
//     <div className="container bootstrap snippet">
//       <div className="row">
//         <div className="col-sm-12">
//           <h1 style={{ visibility: "hidden" }}>User name</h1>
//         </div>
//       </div>
//       <div className="row">
//         <div className="col-sm-3">
//           <div className="text-center">
//             <img
//               src={user.image}
//               className="avatar img-circle img-thumbnail"
//               alt="avatar"
//             />
//             <h6>Upload a different photo...</h6>
//             <input
//               type="file"
//               className="text-center center-block file-upload"
//               onChange={readURL}
//               style={{ width: "-webkit-fill-available" }}
//             />
//           </div>
//           <br />
//         </div>
//         <div className="col-sm-9">
//           <div className="tab-content">
//             <div className="tab-pane active" id="home">
//               <form className="form" onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <div className="col-xs-6">
//                     <label htmlFor="account-name">
//                       <h4>Account name</h4>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="accountName"
//                       id="account-name"
//                       placeholder="Account name"
//                       value={user.accountName}
//                       onChange={(e) =>
//                         setUser({ ...user, accountName: e.target.value })
//                       }
//                     />
//                   </div>
//                 </div>
//                 <div className="form-group">
//                   <div className="col-xs-6">
//                     <label htmlFor="full-name">
//                       <h4>Full name</h4>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="fullName"
//                       id="full-name"
//                       placeholder="Full name"
//                       value={user.fullName}
//                       onChange={(e) =>
//                         setUser({ ...user, fullName: e.target.value })
//                       }
//                     />
//                   </div>
//                 </div>
//                 <div className="form-group">
//                   <div className="col-xs-6">
//                     <label htmlFor="phone">
//                       <h4>Phone</h4>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="phone"
//                       id="phone"
//                       placeholder="Phone"
//                       value={user.phone}
//                       onChange={(e) =>
//                         setUser({ ...user, phone: e.target.value })
//                       }
//                     />
//                   </div>
//                 </div>
//                 <div className="form-group">
//                   <div className="col-xs-6">
//                     <label htmlFor="email">
//                       <h4>Email</h4>
//                     </label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       name="email"
//                       id="email"
//                       placeholder="Email"
//                       value={user.email}
//                       onChange={(e) =>
//                         setUser({ ...user, email: e.target.value })
//                       }
//                     />
//                   </div>
//                 </div>
//                 <div className="form-group">
//                   <div className="col-xs-12">
//                     <br />
//                     <button
//                       className="btn btn-lg btn-primary"
//                       type="button"
//                       onClick={handleBack}
//                     >
//                       <i className="glyphicon glyphicon-repeat"></i> Back
//                     </button>
//                     <button
//                       className="btn btn-lg btn-success"
//                       type="submit"
//                       style={{ float: "right", marginRight: "0" }}
//                     >
//                       <i className="glyphicon glyphicon-ok-sign"></i> Save
//                     </button>
//                     <button
//                       className="btn btn-lg btn-primary"
//                       type="button"
//                       onClick={handleReset}
//                       style={{ float: "right" }}
//                     >
//                       <i className="glyphicon glyphicon-repeat"></i> Reset
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const Profile = () => {
  const navigate = useNavigate();
  const { accountId } = useParams(); // Assuming your route parameter is 'accountId'

  const [user, setUser] = useState({
    accountName: "",
    fullName: "",
    phone: "",
    email: "",
    image: "http://ssl.gstatic.com/accounts/ui/avatar_2x.png", // Initial image
  });

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
      accountId: accountId,
      accountName: user.accountName,
      fullName: user.fullName,
      phone: user.phone,
      email: user.email,
      image: user.image,
    };

    axios
      .put(
        `https://localhost:7088/api/Accounts/UpdateProfile/${accountId}`,
        data
      )
      .then((response) => {
        console.log("User updated successfully:", response.data);
        // Optionally navigate to another page or show a success message
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
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
                      <h4>Full name</h4>
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
                      <h4>Phone</h4>
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
      </div>
    </div>
  );
};

export default Profile;
