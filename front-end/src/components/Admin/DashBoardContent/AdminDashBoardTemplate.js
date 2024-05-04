import classNames from 'classnames'

import {
    CAvatar,
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CProgress,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
    cibCcAmex,
    cibCcApplePay,
    cibCcMastercard,
    cibCcPaypal,
    cibCcStripe,
    cibCcVisa,
    cibGoogle,
    cibFacebook,
    cibLinkedin,
    cifBr,
    cifEs,
    cifFr,
    cifIn,
    cifPl,
    cifUs,
    cibTwitter,
    cilCloudDownload,
    cilPeople,
    cilUser,
    cilUserFemale,
} from '@coreui/icons'

import avatar1 from '../../../assets/img/avt.jpg'
import avatar2 from '../../../assets/img/avt.jpg'
import avatar3 from '../../../assets/img/avt.jpg'
import avatar4 from '../../../assets/img/avt.jpg'
import avatar5 from '../../../assets/img/avt.jpg'
import avatar6 from '../../../assets/img/avt.jpg'


import WidgetsBrand from '../DashBoardContent/Widgets/WidgetsBrand'
import WidgetsDropdown from '../DashBoardContent/Widgets/WidgetsDropdown'
import MainChart from './MainChart'

import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Link } from 'react-router-dom'
import { getOrderStatus } from './helpers/adminHelpers.jsx'
const AdminDashBoardTemplate = () => {
    const progressExample = [
        { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
        { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
        { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
        { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
        { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
    ]
    const progressGroupExample1 = [
        { title: 'Monday', value1: 34, value2: 78 },
        { title: 'Tuesday', value1: 56, value2: 94 },
        { title: 'Wednesday', value1: 12, value2: 67 },
        { title: 'Thursday', value1: 43, value2: 91 },
        { title: 'Friday', value1: 22, value2: 73 },
        { title: 'Saturday', value1: 53, value2: 82 },
        { title: 'Sunday', value1: 9, value2: 69 },
    ]
    const progressGroupExample2 = [
        { title: 'Male', icon: cilUser, value: 53 },
        { title: 'Female', icon: cilUserFemale, value: 43 },
    ]
    const progressGroupExample3 = [
        { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
        { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
        { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
        { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
    ]
    const tableExample = [
        {
            avatar: { src: avatar1, status: 'success' },
            user: {
                name: 'Yiorgos Avraamu',
                new: true,
                registered: 'Jan 1, 2023',
            },
            country: { name: 'USA', flag: cifUs },
            usage: {
                value: 50,
                period: 'Jun 11, 2023 - Jul 10, 2023',
                color: 'success',
            },
            payment: { name: 'Mastercard', icon: cibCcMastercard },
            activity: '10 sec ago',
        },
        {
            avatar: { src: avatar2, status: 'danger' },
            user: {
                name: 'Avram Tarasios',
                new: false,
                registered: 'Jan 1, 2023',
            },
            country: { name: 'Brazil', flag: cifBr },
            usage: {
                value: 22,
                period: 'Jun 11, 2023 - Jul 10, 2023',
                color: 'info',
            },
            payment: { name: 'Visa', icon: cibCcVisa },
            activity: '5 minutes ago',
        },
        {
            avatar: { src: avatar3, status: 'warning' },
            user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2023' },
            country: { name: 'India', flag: cifIn },
            usage: {
                value: 74,
                period: 'Jun 11, 2023 - Jul 10, 2023',
                color: 'warning',
            },
            payment: { name: 'Stripe', icon: cibCcStripe },
            activity: '1 hour ago',
        },
        {
            avatar: { src: avatar4, status: 'secondary' },
            user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2023' },
            country: { name: 'France', flag: cifFr },
            usage: {
                value: 98,
                period: 'Jun 11, 2023 - Jul 10, 2023',
                color: 'danger',
            },
            payment: { name: 'PayPal', icon: cibCcPaypal },
            activity: 'Last month',
        },
        {
            avatar: { src: avatar5, status: 'success' },
            user: {
                name: 'Agapetus Tadeáš',
                new: true,
                registered: 'Jan 1, 2023',
            },
            country: { name: 'Spain', flag: cifEs },
            usage: {
                value: 22,
                period: 'Jun 11, 2023 - Jul 10, 2023',
                color: 'primary',
            },
            payment: { name: 'Google Wallet', icon: cibCcApplePay },
            activity: 'Last week',
        },
        {
            avatar: { src: avatar6, status: 'danger' },
            user: {
                name: 'Friderik Dávid',
                new: true,
                registered: 'Jan 1, 2023',
            },
            country: { name: 'Poland', flag: cifPl },
            usage: {
                value: 43,
                period: 'Jun 11, 2023 - Jul 10, 2023',
                color: 'success',
            },
            payment: { name: 'Amex', icon: cibCcAmex },
            activity: 'Last week',
        },
    ]

    //DATA TRANSACTIONS SECTION
    const data = [
        {
            name: 'Jan',
            Expense: 4000,
            Income: 2400
        },
        {
            name: 'Feb',
            Expense: 3000,
            Income: 1398
        },
        {
            name: 'Mar',
            Expense: 2000,
            Income: 9800
        },
        {
            name: 'Apr',
            Expense: 2780,
            Income: 3908
        },
        {
            name: 'May',
            Expense: 1890,
            Income: 4800
        },
        {
            name: 'Jun',
            Expense: 2390,
            Income: 3800
        },
        {
            name: 'July',
            Expense: 3490,
            Income: 4300
        },
        {
            name: 'Aug',
            Expense: 2000,
            Income: 9800
        },
        {
            name: 'Sep',
            Expense: 2780,
            Income: 3908
        },
        {
            name: 'Oct',
            Expense: 1890,
            Income: 4800
        },
        {
            name: 'Nov',
            Expense: 2390,
            Income: 3800
        },
        {
            name: 'Dec',
            Expense: 3490,
            Income: 4300
        }
    ]

    // PIE CHART DATA
    const dataPie = [
        { name: 'Positve', value: 540 },
        { name: 'Negative', value: 620 },
        { name: 'Same', value: 210 }
    ]

    const RADIAN = Math.PI / 180
    const COLORS = ['#00C49F', '#FFBB28', '#FF8042']

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5
        const x = cx + radius * Math.cos(-midAngle * RADIAN)
        const y = cy + radius * Math.sin(-midAngle * RADIAN)

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        )
    }

    // POPULAR PRODUCTS DATA 
    const popularProducts = [
        {
            id: '3432',
            product_name: 'Macbook M1 Pro 14"',
            product_thumbnail: 'https://source.unsplash.com/100x100?macbook',
            product_price: '$1499.00',
            product_stock: 341
        },
        {
            id: '7633',
            product_name: 'Samsung Galaxy Buds 2',
            product_thumbnail: 'https://source.unsplash.com/100x100?earbuds',
            product_price: '$399.00',
            product_stock: 24
        },
        {
            id: '6534',
            product_name: 'Asus Zenbook Pro',
            product_thumbnail: 'https://source.unsplash.com/100x100?laptop',
            product_price: '$899.00',
            product_stock: 56
        },
        {
            id: '9234',
            product_name: 'LG Flex Canvas',
            product_thumbnail: 'https://source.unsplash.com/100x100?smartphone',
            product_price: '$499.00',
            product_stock: 98
        },
        {
            id: '4314',
            product_name: 'Apple Magic Touchpad',
            product_thumbnail: 'https://source.unsplash.com/100x100?touchpad',
            product_price: '$699.00',
            product_stock: 0
        },
        {
            id: '4342',
            product_name: 'Nothing Earbuds One',
            product_thumbnail: 'https://source.unsplash.com/100x100?earphone',
            product_price: '$399.00',
            product_stock: 453
        }
    ]

    // RecentTripCreate
    const recentTripCreate = [
        {
            id: '1',
            product_id: '4324',
            customer_id: '23143',
            customer_name: 'Shirley A. Lape',
            order_date: '2022-05-17T03:24:00',
            order_total: '$435.50',
            current_order_status: 'PLACED',
            shipment_address: 'Cottage Grove, OR 97424'
        },
        {
            id: '7',
            product_id: '7453',
            customer_id: '96453',
            customer_name: 'Ryan Carroll',
            order_date: '2022-05-14T05:24:00',
            order_total: '$96.35',
            current_order_status: 'CONFIRMED',
            shipment_address: 'Los Angeles, CA 90017'
        },
        {
            id: '2',
            product_id: '5434',
            customer_id: '65345',
            customer_name: 'Mason Nash',
            order_date: '2022-05-17T07:14:00',
            order_total: '$836.44',
            current_order_status: 'SHIPPED',
            shipment_address: 'Westminster, CA 92683'
        },
        {
            id: '3',
            product_id: '9854',
            customer_id: '87832',
            customer_name: 'Luke Parkin',
            order_date: '2022-05-16T12:40:00',
            order_total: '$334.50',
            current_order_status: 'SHIPPED',
            shipment_address: 'San Mateo, CA 94403'
        },
        {
            id: '4',
            product_id: '8763',
            customer_id: '09832',
            customer_name: 'Anthony Fry',
            order_date: '2022-05-14T03:24:00',
            order_total: '$876.00',
            current_order_status: 'OUT_FOR_DELIVERY',
            shipment_address: 'San Mateo, CA 94403'
        },
        {
            id: '5',
            product_id: '5627',
            customer_id: '97632',
            customer_name: 'Ryan Carroll',
            order_date: '2022-05-14T05:24:00',
            order_total: '$96.35',
            current_order_status: 'DELIVERED',
            shipment_address: 'Los Angeles, CA 90017'
        }
    ]



    return (
        <>
            {/* <WidgetsDropdown className="mb-4" />
            <CCard className="mb-4">
                <CCardBody>
                    <CRow>
                        <CCol sm={5}>
                            <h4 id="traffic" className="card-title mb-0">
                                Traffic
                            </h4>
                            <div className="small text-body-secondary">January - July 2023</div>
                        </CCol>
                        <CCol sm={7} className="d-none d-md-block">
                            <CButton color="primary" className="float-end">
                                <CIcon icon={cilCloudDownload} />
                            </CButton>
                            <CButtonGroup className="float-end me-3">
                                {['Day', 'Month', 'Year'].map((value) => (
                                    <CButton
                                        color="outline-secondary"
                                        key={value}
                                        className="mx-0"
                                        active={value === 'Month'}
                                    >
                                        {value}
                                    </CButton>
                                ))}
                            </CButtonGroup>
                        </CCol>
                    </CRow>
                    <MainChart />
                </CCardBody>
                <CCardFooter>
                    <CRow
                        xs={{ cols: 1, gutter: 4 }}
                        sm={{ cols: 2 }}
                        lg={{ cols: 4 }}
                        xl={{ cols: 5 }}
                        className="mb-2 text-center"
                    >
                        {progressExample.map((item, index, items) => (
                            <CCol
                                className={classNames({
                                    'd-none d-xl-block': index + 1 === items.length,
                                })}
                                key={index}
                            >
                                <div className="text-body-secondary">{item.title}</div>
                                <div className="fw-semibold text-truncate">
                                    {item.value} ({item.percent}%)
                                </div>
                                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
                            </CCol>
                        ))}
                    </CRow>
                </CCardFooter>
            </CCard>
            <WidgetsBrand className="mb-4" withCharts />
            <CRow>
                <CCol xs>
                    <CCard className="mb-4">
                        <CCardHeader>Traffic {' & '} Sales</CCardHeader>
                        <CCardBody>
                            <CRow>
                                <CCol xs={12} md={6} xl={6}>
                                    <CRow>
                                        <CCol xs={6}>
                                            <div className="border-start border-start-4 border-start-info py-1 px-3">
                                                <div className="text-body-secondary text-truncate small">New Clients</div>
                                                <div className="fs-5 fw-semibold">9,123</div>
                                            </div>
                                        </CCol>
                                        <CCol xs={6}>
                                            <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                                                <div className="text-body-secondary text-truncate small">
                                                    Recurring Clients
                                                </div>
                                                <div className="fs-5 fw-semibold">22,643</div>
                                            </div>
                                        </CCol>
                                    </CRow>
                                    <hr className="mt-0" />
                                    {progressGroupExample1.map((item, index) => (
                                        <div className="progress-group mb-4" key={index}>
                                            <div className="progress-group-prepend">
                                                <span className="text-body-secondary small">{item.title}</span>
                                            </div>
                                            <div className="progress-group-bars">
                                                <CProgress thin color="info" value={item.value1} />
                                                <CProgress thin color="danger" value={item.value2} />
                                            </div>
                                        </div>
                                    ))}
                                </CCol>
                                <CCol xs={12} md={6} xl={6}>
                                    <CRow>
                                        <CCol xs={6}>
                                            <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                                                <div className="text-body-secondary text-truncate small">Pageviews</div>
                                                <div className="fs-5 fw-semibold">78,623</div>
                                            </div>
                                        </CCol>
                                        <CCol xs={6}>
                                            <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                                                <div className="text-body-secondary text-truncate small">Organic</div>
                                                <div className="fs-5 fw-semibold">49,123</div>
                                            </div>
                                        </CCol>
                                    </CRow>

                                    <hr className="mt-0" />

                                    {progressGroupExample2.map((item, index) => (
                                        <div className="progress-group mb-4" key={index}>
                                            <div className="progress-group-header">
                                                <CIcon className="me-2" icon={item.icon} size="lg" />
                                                <span>{item.title}</span>
                                                <span className="ms-auto fw-semibold">{item.value}%</span>
                                            </div>
                                            <div className="progress-group-bars">
                                                <CProgress thin color="warning" value={item.value} />
                                            </div>
                                        </div>
                                    ))}

                                    <div className="mb-5"></div>

                                    {progressGroupExample3.map((item, index) => (
                                        <div className="progress-group" key={index}>
                                            <div className="progress-group-header">
                                                <CIcon className="me-2" icon={item.icon} size="lg" />
                                                <span>{item.title}</span>
                                                <span className="ms-auto fw-semibold">
                                                    {item.value}{' '}
                                                    <span className="text-body-secondary small">({item.percent}%)</span>
                                                </span>
                                            </div>
                                            <div className="progress-group-bars">
                                                <CProgress thin color="success" value={item.percent} />
                                            </div>
                                        </div>
                                    ))}
                                </CCol>
                            </CRow>

                            <br />

                            <CTable align="middle" className="mb-0 border" hover responsive>
                                <CTableHead className="text-nowrap">
                                    <CTableRow>
                                        <CTableHeaderCell className="bg-body-tertiary text-center">
                                            <CIcon icon={cilPeople} />
                                        </CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary">User</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary text-center">
                                            Country
                                        </CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary">Usage</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary text-center">
                                            Payment Method
                                        </CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary">Activity</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {tableExample.map((item, index) => (
                                        <CTableRow v-for="item in tableItems" key={index}>
                                            <CTableDataCell className="text-center">
                                                <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div>{item.user.name}</div>
                                                <div className="small text-body-secondary text-nowrap">
                                                    <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                                                    {item.user.registered}
                                                </div>
                                            </CTableDataCell>
                                            <CTableDataCell className="text-center">
                                                <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div className="d-flex justify-content-between text-nowrap">
                                                    <div className="fw-semibold">{item.usage.value}%</div>
                                                    <div className="ms-3">
                                                        <small className="text-body-secondary">{item.usage.period}</small>
                                                    </div>
                                                </div>
                                                <CProgress thin color={item.usage.color} value={item.usage.value} />
                                            </CTableDataCell>
                                            <CTableDataCell className="text-center">
                                                <CIcon size="xl" icon={item.payment.icon} />
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div className="small text-body-secondary text-nowrap">Last login</div>
                                                <div className="fw-semibold text-nowrap">{item.activity}</div>
                                            </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow> */}

            {/* <div class="container relative flex flex-col justify-between h-full max-w-6xl px-10 mx-auto xl:px-0 mt-5">
                <div class="w-full">
                    <div class="flex flex-col w-full mb-10 sm:flex-row justify-center">
                        <div class="w-full mb-10 sm:mb-0 sm:w-1/2">
                            <div class="relative h-full ml-0 mr-0 sm:mr-10">
                                <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg"></span>
                                <div class="relative h-full p-5 bg-white border-2 border-indigo-500 rounded-lg">
                                    <div class="flex items-center -mt-1">
                                        <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">DAPP Development</h3>
                                    </div>
                                    <p class="mt-3 mb-1 text-xs font-medium text-indigo-500 uppercase">------------</p>
                                    <p class="mb-2 text-gray-600">A decentralized application (dapp) is an application built on a
                                        decentralized network that combines a smart contract and a frontend user interface.</p>
                                </div>
                            </div>
                        </div>
                        <div class="w-full sm:w-1/2">
                            <div class="relative h-full ml-0 md:mr-10">
                                <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-purple-500 rounded-lg"></span>
                                <div class="relative h-full p-5 bg-white border-2 border-purple-500 rounded-lg">
                                    <div class="flex items-center -mt-1">
                                        <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">Web 3.0 Development</h3>
                                    </div>
                                    <p class="mt-3 mb-1 text-xs font-medium text-purple-500 uppercase">------------</p>
                                    <p class="mb-2 text-gray-600">Web 3.0 is the third generation of Internet services that will
                                        focus on understanding and analyzing data to provide a semantic web.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col w-full mb-5 sm:flex-row">
                        <div class="w-full mb-10 sm:mb-0 sm:w-1/2">
                            <div class="relative h-full ml-0 mr-0 sm:mr-10">
                                <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-400 rounded-lg"></span>
                                <div class="relative h-full p-5 bg-white border-2 border-blue-400 rounded-lg">
                                    <div class="flex items-center -mt-1">
                                        <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">Project Audit</h3>
                                    </div>
                                    <p class="mt-3 mb-1 text-xs font-medium text-blue-400 uppercase">------------</p>
                                    <p class="mb-2 text-gray-600">A Project Audit is a formal review of a project, which is intended
                                        to assess the extent up to which project management standards are being upheld.</p>
                                </div>
                            </div>
                        </div>
                        <div class="w-full mb-10 sm:mb-0 sm:w-1/2">
                            <div class="relative h-full ml-0 mr-0 sm:mr-10">
                                <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-yellow-400 rounded-lg"></span>
                                <div class="relative h-full p-5 bg-white border-2 border-yellow-400 rounded-lg">
                                    <div class="flex items-center -mt-1">
                                        <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">Hacking / RE</h3>
                                    </div>
                                    <p class="mt-3 mb-1 text-xs font-medium text-yellow-400 uppercase">------------</p>
                                    <p class="mb-2 text-gray-600">A security hacker is someone who explores methods for breaching
                                        defenses and exploiting weaknesses in a computer system or network.</p>
                                </div>
                            </div>
                        </div>
                        <div class="w-full sm:w-1/2">
                            <div class="relative h-full ml-0 md:mr-10">
                                <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-green-500 rounded-lg"></span>
                                <div class="relative h-full p-5 bg-white border-2 border-green-500 rounded-lg">
                                    <div class="flex items-center -mt-1">
                                        <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">Bot/Script Development</h3>
                                    </div>
                                    <p class="mt-3 mb-1 text-xs font-medium text-green-500 uppercase">------------</p>
                                    <p class="mb-2 text-gray-600">Bot development frameworks were created as advanced software tools
                                        that eliminate a large amount of manual work and accelerate the development process.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="grid gap-4 p-3 grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
                <BoxWrapper>
                    <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
                        <IoBagHandle className="text-2xl text-white" />
                    </div>
                    <div className="pl-4">
                        <span className="text-sm text-gray-500 font-light">Total Users</span>
                        <div className="flex items-center">
                            <strong className="text-xl text-gray-700 font-semibold">9999</strong>
                            <span className="text-sm text-green-500 pl-2">+343</span>
                        </div>
                    </div>
                </BoxWrapper>
                <BoxWrapper>
                    <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
                        <IoPieChart className="text-2xl text-white" />
                    </div>
                    <div className="pl-4">
                        <span className="text-sm text-gray-500 font-light">Total Locations</span>
                        <div className="flex items-center">
                            <strong className="text-xl text-gray-700 font-semibold">299</strong>
                            <span className="text-sm text-green-500 pl-2">-343</span>
                        </div>
                    </div>
                </BoxWrapper>
                <BoxWrapper>
                    <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
                        <IoPeople className="text-2xl text-white" />
                    </div>
                    <div className="pl-4">
                        <span className="text-sm text-gray-500 font-light">Total Comments</span>
                        <div className="flex items-center">
                            <strong className="text-xl text-gray-700 font-semibold">9999</strong>
                            <span className="text-sm text-red-500 pl-2">-30</span>
                        </div>
                    </div>
                </BoxWrapper>
                <BoxWrapper>
                    <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
                        <IoCart className="text-2xl text-white" />
                    </div>
                    <div className="pl-4">
                        <span className="text-sm text-gray-500 font-light">Total Trips</span>
                        <div className="flex items-center">
                            <strong className="text-xl text-gray-700 font-semibold">898</strong>
                            <span className="text-sm text-red-500 pl-2">-43</span>
                        </div>
                    </div>
                </BoxWrapper>
            </div>


            {/* TRANSACTIONS */}
            <div className="h-[24rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1 mr-4 ml-4">
                <strong className="text-gray-700 font-medium">Transactions</strong>
                <div className="mt-3 w-full flex-1 text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 20,
                                right: 10,
                                left: -10,
                                bottom: 0
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Income" fill="#0ea5e9" />
                            <Bar dataKey="Expense" fill="#ea580c" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className='grid gap-4 p-3 grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2'>
                {/* PIE CHART COMMENTS*/}
                <div className="col-span-1 h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col ">
                    <strong className="text-gray-700 font-medium">Comments Chart Ratings</strong>
                    <div className="mt-3 w-full flex-1 text-xs">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart width={400} height={300}>
                                <Pie
                                    data={dataPie}
                                    cx="50%"
                                    cy="45%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={105}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {dataPie.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* POPULAR PRODUCTS */}
                <div className="col-span-1 h-[22rem]  bg-white p-4 rounded-sm border border-gray-200 overflow-auto">
                    <strong className="text-gray-700 font-medium">Popular Destinations</strong>
                    <div className="mt-4 flex flex-col gap-3">
                        {popularProducts.map((product) => (
                            <Link
                                key={product.id}
                                to={`/product/${product.id}`}
                                className="flex items-start hover:no-underline"
                            >
                                <div className="w-10 h-10 min-w-[2.5rem] bg-gray-200 rounded-sm">
                                    <img
                                        className="w-full h-full object-cover rounded-sm"
                                        src={product.product_thumbnail}
                                        alt={product.product_name}
                                    />
                                </div>
                                <div className="ml-4 flex-1">
                                    <p className="text-sm text-gray-800">{product.product_name}</p>
                                    <span
                                        className={classNames(
                                            product.product_stock === 0
                                                ? 'text-red-500'
                                                : product.product_stock > 50
                                                    ? 'text-green-500'
                                                    : 'text-orange-500',
                                            'text-xs font-medium'
                                        )}
                                    >
                                        {product.product_stock === 0 ? 'Out of Stock' : product.product_stock + ' in Stock'}
                                    </span>
                                </div>
                                <div className="text-xs text-gray-400 pl-1.5">{product.product_price}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* RECENT TRIP CREATED */}
            <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-700 flex-1 ml-4 mr-4">
                <strong className="text-gray-700 font-medium">Recent Orders</strong>
                <div className="border-gray-200 rounded-sm mt-3">
                    <table className="w-full text-gray-700 ">
                        <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 px-4">
                            <tr>
                                <th class="px-6 py-3">ID</th>
                                <th class="px-6 py-3">Product ID</th>
                                <th class="px-6 py-3">Customer Name</th>
                                <th class="px-6 py-3">Order Date</th>
                                <th class="px-6 py-3">Order Total</th>
                                <th class="px-6 py-3">Shipping Address</th>
                            </tr>
                        </thead>
                        <tbody className='mt-3'>
                            {recentTripCreate.map((order) => (
                                <tr key={order.id} className="border-b-2 border-gray-100">
                                    <td className="px-3 py-3 ">
                                        <Link to={`/order/${order.id}`}>#{order.id}</Link>
                                    </td>
                                    <td>
                                        <Link to={`/product/${order.product_id}`}>#{order.product_id}</Link>
                                    </td>
                                    <td>
                                        <Link to={`/customer/${order.customer_id}`}>{order.customer_name}</Link>
                                    </td>
                                    {/* <td>{format(new Date(order.order_date), 'dd MMM yyyy')}</td> */}
                                    <td>{order.order_total}</td>
                                    <td>{order.shipment_address}</td>
                                    <td>{getOrderStatus(order.current_order_status)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );




}

function BoxWrapper({ children }) {
    return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>
}

export default AdminDashBoardTemplate