//import react
import React from 'react';
import { Link } from 'react-router-dom';
//import { FaLinkedinIn,FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import {FiMail} from 'react-icons/fi'
import {HiOutlineLocationMarker} from 'react-icons/hi'
function WebFooter() {

    return(
        <React.Fragment>
            <div className="w-full bg-[#229396] py-8 z-40 relative mt-36">
                <div className="flex items-center justify-between md:flex-row flex-col text-white px-10 md:px-24 gap-y-[30px]">
                    <section className='md:w-1/2 w-full md:items-center'>
                    <img src={process.env.REACT_APP_BASEURL+'/'+`image-logo`} alt='logo-white' height={175} width={175}/>
                    <p className='md:w-3/4 mt-5'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Curabitur vestibulum vulputate leo et vulputate. 
                        Nullam eu eros ut tellus varius pretium.
                    </p>
                    </section>
                    <section className='md:w-1/2 w-full flex flex-col md:flex-row justify-between gap-y-[20px]'>
                        <section className="items-center md:ml-10">
                            <h1 className='font-bold text-lg'>Sitemap</h1>
                            <ul>
                                <li className='my-2'><Link className='text-white' to="/">Home</Link></li>
                                <li className='my-2'><Link className='text-white' to="/about-us">About us</Link></li>
                                <li className='my-2'><Link className='text-white' to="/faq">FAQ</Link></li>
                                <li className='my-2'><Link className='text-white' to="/pricing">Pricing</Link></li>
                            </ul>
                        </section>
                        <section className="items-center">
                            <h1 className='font-bold text-lg'>Contact</h1>
                            <ul>
                                <li className='my-2'><Link className='flex flex-row items-baseline gap-1 text-white' to=""><HiOutlineLocationMarker className='self-center'/><p>Semarang, Indonesia</p></Link></li>
                                <li className='my-2'><Link className='text-white' to="">0812-3456-7890</Link></li>
                                <li className='my-2'><Link className='text-white' to="">Jl. Lorem Ipsum No.1</Link></li>
                                <li className='my-2'><Link className='flex flex-row items-baseline gap-1 text-white' to=""><FiMail className='self-center'/><p>pmg@gmail.com</p></Link></li>
                            </ul>
                        </section>
                    </section>  
                </div>
            </div>
        </React.Fragment>
    )
}

export default WebFooter;