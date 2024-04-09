import React, { useEffect } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { useState } from 'react'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { LiaAddressCard } from "react-icons/lia";
import { AiOutlinePhone } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { FcPlus } from 'react-icons/fc'
import toast from 'react-hot-toast'
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';
const UserProfileEditInfo = (props) => {
    const userInfo = useSelector(state => state.user);
    const [userName, setUserName] = useState(userInfo.user)
    const [firstName, setFirstName] = useState(userInfo.first_name)
    const [lastName, setLastName] = useState(userInfo.last_name)
    const [email, setEmail] = useState(userInfo.email)
    const [address, setAddress] = useState(userInfo.address)
    const [phone, setPhone] = useState(userInfo.phone)
    const [previewImage, setPreviewImage] = useState("");
    const [image, setImgae] = useState("");
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);

    const UpdateAPI = process.env.REACT_APP_SERVER_DOMAIN
    //console.log("API: ", UpdateAPI)

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImgae(event.target.files[0]);
        } else {
            // setPreviewImage("")
        }
        console.log("Upload file", event.target.files[0])
    }

    const handleSubmitUpdate = async () => {
        const token = localStorage.getItem('accessToken')
        console.log("Token la: ", token)
        const data = new FormData();
        data.append('first_name', firstName);
        data.append('last_name', lastName);
        data.append('email', email);
        data.append('username', userName);
        data.append('avatar', "");
        data.append('address', address);
        data.append('phone', phone);
        try {
            const dataUpdate = await axios.put(
                `${UpdateAPI}updateprofile/`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                }
            )
        } catch (error) {
            console.log("API Update User FAILED: ", error)
            toast.fail("Failed to Update")
        }
        toast.success("Done Successfully!")
    }

    useEffect(() => {

    }, [])

    return (
        <>
            {/* Edit User Information */}
            <div className="container lg:max-w-7xl mx-auto py-3 mb-2">
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header onClick={() => setIsAccordionOpen(!isAccordionOpen)}> Update My Infomation</Accordion.Header>
                        <Accordion.Body>
                            <InputGroup className="mb-3">
                                <InputGroup.Text className='fw-bold text-gray-800 w-40'> <AiOutlineUser className='mr-2' />User's Name</InputGroup.Text>
                                <Form.Control
                                    placeholder="User's name"
                                    aria-label="UserFullName"
                                    aria-describedby="basic-addon1"
                                    value={userName}
                                    onChange={(event) => setUserName(event.target.value)}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text className='fw-bold text-gray-800 w-40'><AiOutlineInfoCircle className='mr-2' />First name</InputGroup.Text>
                                <Form.Control
                                    placeholder="User's First name"
                                    aria-label="UserFirstName"
                                    aria-describedby="basic-addon1"
                                    value={firstName}
                                    onChange={(event) => setFirstName(event.target.value)}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text className='fw-bold text-gray-800 w-40'><AiOutlineInfoCircle className='mr-2' />Last name</InputGroup.Text>
                                <Form.Control
                                    placeholder="User's Last name"
                                    aria-label="UserLastName"
                                    aria-describedby="basic-addon1"
                                    value={lastName}
                                    onChange={(event) => setLastName(event.target.value)}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text className='fw-bold text-gray-800 w-40'> <AiOutlineMail className='mr-2' />Email</InputGroup.Text>
                                <Form.Control
                                    placeholder="User's full name"
                                    aria-label="UserFullName"
                                    aria-describedby="basic-addon1"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text className='fw-bold text-gray-800 w-40'><LiaAddressCard className='mr-2' />Address</InputGroup.Text>
                                <Form.Control
                                    placeholder="User's Address"
                                    aria-label="UserFullName"
                                    aria-describedby="basic-addon1"
                                    value={address}
                                    onChange={(event) => setAddress(event.target.value)}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text className='fw-bold text-gray-800 w-40'><AiOutlinePhone className='mr-2' />Phone</InputGroup.Text>
                                <Form.Control
                                    placeholder="User's Phone Number"
                                    aria-label="UserFullName"
                                    aria-describedby="basic-addon1"
                                    value={phone}
                                    onChange={(event) => setPhone(event.target.value)}
                                />
                            </InputGroup>
                            <div className='col-md-6 mb-3'>
                                <label
                                    className='flex justify-center items-center gap-x-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
                                    htmlFor='labelUpload'
                                >
                                    <FcPlus /> Upload file image
                                </label>
                                <input
                                    type="file"
                                    id='labelUpload'
                                    hidden
                                    onChange={(event) => handleUploadImage(event)}
                                >
                                </input>
                            </div>
                            <div className='col-md-12 img-preview mb-3'>
                                {previewImage ?
                                    <img className='object-cover w-[40%] max-h-[50%] rounded-lg hover:cursor-pointer' src={previewImage}></img>
                                    :
                                    <span>Preview image</span>
                                }
                            </div>
                            {/* Update / Cancel Button */}
                            <div className="flex flex-col md:flex-row gap-y-3">
                                <button
                                    onClick={() => handleSubmitUpdate()}
                                    id="update-btn" className="w-full bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded">
                                    Update
                                </button>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>


        </>
    )
}

export default UserProfileEditInfo