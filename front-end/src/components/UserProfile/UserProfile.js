import React from 'react'
import { useState } from 'react'
import Lightbox from "react-awesome-lightbox";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { LiaAddressCard } from "react-icons/lia";
import { AiOutlinePhone } from "react-icons/ai";
const UserProfile = () => {
    const [fitstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [isPreviewAvatarImage, setIsPreviewAvatarImage] = useState(false)

    return (
        <>
            {/* Pill Personal Information */}
            <div className="container lg:max-w-7xl mx-auto py-3">
                <div className="lg:grid lg:grid-cols-9 lg:gap-4 lg:p-3">
                    <div className="col-span-2">
                        <div className="bg-blue-500 text-white text-center py-2 rounded-full font-bold">
                            PERSONAL INFORMATION
                        </div>
                    </div>
                </div>
            </div>

            {/* User Profile Content */}
            <div className="container lg:max-w-7xl mx-auto bg-[#F5FBFF] py-4 px-3 rounded-md border-t-[3px] border-blue-300 shadow-xl">
                <div className="grid grid-cols-9 gap-4 rounded-lg ">
                    {/* #1 Left Content */}
                    <div className="col-span-3 flex justify-center items-center">
                        <img
                            onClick={() => setIsPreviewAvatarImage(true)}
                            className="object-fit w-full max-h-96 rounded-lg hover:cursor-pointer"
                            src="https://i.pinimg.com/736x/74/f4/f5/74f4f548392fbdafbe8a5d9764c83eaf.jpg"
                            alt="User_Avatar_Image"
                        />
                        {
                            isPreviewAvatarImage == true &&
                            <Lightbox
                                image={`https://i.pinimg.com/736x/74/f4/f5/74f4f548392fbdafbe8a5d9764c83eaf.jpg`}
                                title={"User_Avatar_Image"}
                                onClose={() => setIsPreviewAvatarImage(false)} >
                            </Lightbox>
                        }
                    </div>

                    {/* #2 Right Content */}
                    <div className="col-span-6 p-4">
                        <InputGroup className="mb-3">
                            <InputGroup.Text className='fw-bold text-primary w-40'> <AiOutlineUser className='mr-2' />User's Name</InputGroup.Text>
                            <Form.Control
                                placeholder="User's full name"
                                aria-label="UserFullName"
                                aria-describedby="basic-addon1"
                                disabled
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text className='fw-bold text-primary w-40'> <AiOutlineInfoCircle className='mr-2' />Full name</InputGroup.Text>
                            <Form.Control
                                placeholder="User's full name"
                                aria-label="UserFullName"
                                aria-describedby="basic-addon1"
                                disabled
                            />
                        </InputGroup>
                        <Form.Group className="mb-3">
                            <Row>
                                <Col>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text className='fw-bold text-primary w-40'><AiOutlineInfoCircle className='mr-2' />First name</InputGroup.Text>
                                        <Form.Control
                                            placeholder="User's First name"
                                            aria-label="UserFirstName"
                                            aria-describedby="basic-addon1"
                                            disabled
                                        />
                                    </InputGroup>
                                </Col>
                                <Col>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text className='fw-bold text-primary w-40'><AiOutlineInfoCircle className='mr-2' />Last name</InputGroup.Text>
                                        <Form.Control
                                            placeholder="User's Last name"
                                            aria-label="UserLastName"
                                            aria-describedby="basic-addon1"
                                            disabled
                                        />
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Form.Group>
                        <InputGroup className="mb-3">
                            <InputGroup.Text className='fw-bold text-primary w-40'> <AiOutlineMail className='mr-2' />Email</InputGroup.Text>
                            <Form.Control
                                placeholder="User's full name"
                                aria-label="UserFullName"
                                aria-describedby="basic-addon1"
                                disabled
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text className='fw-bold text-primary w-40'><LiaAddressCard className='mr-2' />Address</InputGroup.Text>
                            <Form.Control
                                placeholder="User's full name"
                                aria-label="UserFullName"
                                aria-describedby="basic-addon1"
                                disabled
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text className='fw-bold text-primary w-40'><AiOutlinePhone className='mr-2' />Phone</InputGroup.Text>
                            <Form.Control
                                placeholder="User's full name"
                                aria-label="UserFullName"
                                aria-describedby="basic-addon1"
                                disabled
                            />
                        </InputGroup>
                    </div>
                </div>
            </div>
        </>

    )
}

export default UserProfile