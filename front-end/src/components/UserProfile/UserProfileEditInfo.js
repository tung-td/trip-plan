import React, { useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { LiaAddressCard } from "react-icons/lia";
import { AiOutlinePhone } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { FcPlus } from "react-icons/fc";
import toast from "react-hot-toast";
import axios from "axios";
import upDateRedux from "../../redux/userSlice.js";
import "react-toastify/dist/ReactToastify.css";

const UserProfileEditInfo = (props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const [userName, setUserName] = useState(userInfo.user || "");
  const [firstName, setFirstName] = useState(userInfo.first_name || "");
  const [lastName, setLastName] = useState(userInfo.last_name || "");
  const [email, setEmail] = useState(userInfo.email || "");
  const [address, setAddress] = useState(userInfo.address || "");
  const [phone, setPhone] = useState(userInfo.phone || "");
  const [previewImage, setPreviewImage] = useState("");
  const [image, setImgae] = useState("");
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const UpdateAPI = process.env.REACT_APP_SERVER_DOMAIN;

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImgae(event.target.files[0]);
    } else {
      // setPreviewImage("")
    }
    console.log("Upload file", event.target.files[0]);
  };

  const handleSubmitUpdate = async () => {
    const token = localStorage.getItem("accessToken");

    const data = new FormData();
    data.append("phone", phone);
    data.append("email", email);
    data.append("first_name", firstName);
    data.append("username", userName);
    if (image) {
      data.append("avatar", image);
    }
    data.append("last_name", lastName);
    data.append("address", address);
    try {
      const dataUpdate = await axios.put(`${UpdateAPI}/updateprofile/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Gọi toast thông báo thành công
      toast.success("Update Successfully");

      // Dispatch action với dữ liệu nhận được từ response
      if (dataUpdate.data && dataUpdate.data.data) {
        // Dữ liệu người dùng được cập nhật được gửi đi như là payload
        dispatch(upDateRedux(dataUpdate.data.data));
      } else {
        // Handle khi không có dữ liệu
        console.log(
          "Response không chứa 'data' object hoặc 'data' object rỗng",
        );
      }
      // Sau khi xử lý xong, reload lại trang
      // window.location.reload();
    } catch (error) {
      console.log("API Update User FAILED: ", error);
      toast.error("Failed to Update");
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      {/* Edit User Information */}
      <div className="container mx-auto mb-2 py-3 lg:max-w-7xl">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header
              onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            >
              Update My Infomation
            </Accordion.Header>
            <Accordion.Body>
              <InputGroup className="mb-3">
                <InputGroup.Text className="fw-bold w-40 text-gray-800">
                  {" "}
                  <AiOutlineUser className="mr-2" />
                  User's Name
                </InputGroup.Text>
                <Form.Control
                  placeholder="User's name"
                  aria-label="UserFullName"
                  aria-describedby="basic-addon1"
                  value={userName}
                  onChange={(event) => setUserName(event.target.value)}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text className="fw-bold w-40 text-gray-800">
                  <AiOutlineInfoCircle className="mr-2" />
                  First name
                </InputGroup.Text>
                <Form.Control
                  placeholder="User's First name"
                  aria-label="UserFirstName"
                  aria-describedby="basic-addon1"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text className="fw-bold w-40 text-gray-800">
                  <AiOutlineInfoCircle className="mr-2" />
                  Last name
                </InputGroup.Text>
                <Form.Control
                  placeholder="User's Last name"
                  aria-label="UserLastName"
                  aria-describedby="basic-addon1"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text className="fw-bold w-40 text-gray-800">
                  {" "}
                  <AiOutlineMail className="mr-2" />
                  Email
                </InputGroup.Text>
                <Form.Control
                  placeholder="User's full name"
                  aria-label="UserFullName"
                  aria-describedby="basic-addon1"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text className="fw-bold w-40 text-gray-800">
                  <LiaAddressCard className="mr-2" />
                  Address
                </InputGroup.Text>
                <Form.Control
                  placeholder="User's Address"
                  aria-label="UserFullName"
                  aria-describedby="basic-addon1"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text className="fw-bold w-40 text-gray-800">
                  <AiOutlinePhone className="mr-2" />
                  Phone
                </InputGroup.Text>
                <Form.Control
                  placeholder="User's Phone Number"
                  aria-label="UserFullName"
                  aria-describedby="basic-addon1"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </InputGroup>
              <div className="col-md-6 mb-3">
                <label
                  className="flex items-center justify-center gap-x-3 rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                  htmlFor="labelUpload"
                >
                  <FcPlus /> Upload file image
                </label>
                <input
                  type="file"
                  id="labelUpload"
                  hidden
                  onChange={(event) => handleUploadImage(event)}
                ></input>
              </div>
              <div className="col-md-12 img-preview mb-3">
                {previewImage ? (
                  <img
                    className="max-h-[50%] w-[40%] rounded-lg object-cover hover:cursor-pointer"
                    src={previewImage}
                  ></img>
                ) : (
                  <span>Preview image</span>
                )}
              </div>
              {/* Update / Cancel Button */}
              <div className="flex flex-col gap-y-3 md:flex-row">
                <button
                  onClick={() => handleSubmitUpdate()}
                  id="update-btn"
                  className="w-full rounded bg-yellow-300 px-4 py-2 font-bold text-black hover:bg-yellow-400"
                >
                  Update
                </button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
};

export default UserProfileEditInfo;
