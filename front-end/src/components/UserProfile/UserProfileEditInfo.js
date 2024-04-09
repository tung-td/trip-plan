import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { LiaAddressCard } from "react-icons/lia";
import { AiOutlinePhone } from "react-icons/ai";
const UserProfileEditInfo = (props) => {
    return (
        <>
            {/* Edit User Information */}
            <div className="container lg:max-w-7xl mx-auto py-3 mb-2">
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Update My Infomation</Accordion.Header>
                        <Accordion.Body>
                            <InputGroup className="mb-3">
                                <InputGroup.Text className='fw-bold text-gray-800 w-40'> <AiOutlineUser className='mr-2' />User's Name</InputGroup.Text>
                                <Form.Control
                                    placeholder="User's full name"
                                    aria-label="UserFullName"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text className='fw-bold text-gray-800 w-40'> <AiOutlineInfoCircle className='mr-2' />Full name</InputGroup.Text>
                                <Form.Control
                                    placeholder="User's full name"
                                    aria-label="UserFullName"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text className='fw-bold text-gray-800 w-40'><AiOutlineInfoCircle className='mr-2' />First name</InputGroup.Text>
                                <Form.Control
                                    placeholder="User's First name"
                                    aria-label="UserFirstName"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text className='fw-bold text-gray-800 w-40'><AiOutlineInfoCircle className='mr-2' />Last name</InputGroup.Text>
                                <Form.Control
                                    placeholder="User's Last name"
                                    aria-label="UserLastName"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text className='fw-bold text-gray-800 w-40'> <AiOutlineMail className='mr-2' />Email</InputGroup.Text>
                                <Form.Control
                                    placeholder="User's full name"
                                    aria-label="UserFullName"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text className='fw-bold text-gray-800 w-40'><LiaAddressCard className='mr-2' />Address</InputGroup.Text>
                                <Form.Control
                                    placeholder="User's full name"
                                    aria-label="UserFullName"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text className='fw-bold text-gray-800 w-40'><AiOutlinePhone className='mr-2' />Phone</InputGroup.Text>
                                <Form.Control
                                    placeholder="User's full name"
                                    aria-label="UserFullName"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>


        </>
    )
}

export default UserProfileEditInfo