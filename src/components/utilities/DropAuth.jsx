import React from "react"
import { Menu, Transition } from '@headlessui/react'
// import RegBtn from "./register"
// import LoginBtn from "./login"
import { NavLink } from "react-router-dom"
import { HiMenu } from 'react-icons/hi'

function DropAuth() {
  return (
    <Menu as="div" className="relative inline-block">
        <Menu.Button>
            <HiMenu className="text-black"/>
        </Menu.Button>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-40 mt-4 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-4 flex flex-col gap-y-2">
            <Menu.Item className="block lg:hidden">
                <NavLink to="/" className={({ isActive }) => (isActive ? "text-[#EC452D] font-extrabold" : "text-sm hover:text-[#EC452D] font-extrabold")}>Home</NavLink>
            </Menu.Item>
            <Menu.Item className="block lg:hidden">
                <NavLink to="/wisata" className={({ isActive }) => (isActive ? "text-[#EC452D] font-extrabold" : "text-sm hover:text-[#EC452D] font-extrabold")}>Wisata</NavLink>
            </Menu.Item>
            <Menu.Item className="block lg:hidden">
                <NavLink to="/edukasi" className={({ isActive }) => (isActive ? "text-[#EC452D] font-extrabold" : "text-sm hover:text-[#EC452D] font-extrabold")}>Edukasi</NavLink>
            </Menu.Item>
            <Menu.Item className="block lg:hidden">
                <NavLink to="artikel" className="text-sm hover:text-[#EC452D] font-extrabold">Artikel</NavLink>
            </Menu.Item>
            {/* <hr />
            <Menu.Item className="block lg:hidden">
              <LoginBtn/>
            </Menu.Item>
            <Menu.Item className="block lg:hidden">
              <RegBtn/>
            </Menu.Item> */}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default DropAuth