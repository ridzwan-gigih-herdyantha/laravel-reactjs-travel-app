import React, { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import LayoutWeb from "../../layouts/Web";
import { AiOutlineDown } from "react-icons/ai";

function FAQ() {
	const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
	useEffect(() => {
		scrollToTop();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<LayoutWeb>
			<div className="bg-[#f9fafb] w-full h-64 my-8 md:h-28 px-12 md:px-24 space-y-5">
				<section className="translate-y-6 flex flex-col gap-y-1">
					<h5 className="text-2xl font-extrabold text-black">FAQ</h5>
					<p className="text-base font-normal text-[#8888]">
						Everything you need to know about TRAVELING
					</p>
				</section>
			</div>
			<section className="px-12 md:px-24 mt-6 space-y-4">
				<Disclosure>
					{({ open }) => (
						<>
							<Disclosure.Button className="flex w-full justify-between items-center rounded-lg bg-white shadow-md px-4 py-4 font-medium focus:outline-none">
								<span>What is your refund policy?</span>
								<AiOutlineDown
									className={`${
										open ? "rotate-180 transform" : ""
									} h-3 w-3 text-black`}
								/>
							</Disclosure.Button>
							<Disclosure.Panel className="text-gray-500 text-left mt-5">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation ullamco laboris
								nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
								in reprehenderit in voluptate velit esse cillum dolore eu fugiat
								nulla pariatur.
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
				<Disclosure>
					{({ open }) => (
						<>
							<Disclosure.Button className="flex w-full justify-between items-center rounded-lg bg-white shadow-md px-4 py-4 font-medium focus:outline-none">
								<span>What is your refund policy?</span>
								<AiOutlineDown
									className={`${
										open ? "rotate-180 transform" : ""
									} h-3 w-3 text-black`}
								/>
							</Disclosure.Button>
							<Disclosure.Panel className="text-gray-500 text-left mt-5">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation ullamco laboris
								nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
								in reprehenderit in voluptate velit esse cillum dolore eu fugiat
								nulla pariatur.
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
				<Disclosure>
					{({ open }) => (
						<>
							<Disclosure.Button className="flex w-full justify-between items-center rounded-lg bg-white shadow-md px-4 py-4 font-medium focus:outline-none">
								<span>What is your refund policy?</span>
								<AiOutlineDown
									className={`${
										open ? "rotate-180 transform" : ""
									} h-3 w-3 text-black`}
								/>
							</Disclosure.Button>
							<Disclosure.Panel className="text-gray-500 text-left mt-5">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation ullamco laboris
								nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
								in reprehenderit in voluptate velit esse cillum dolore eu fugiat
								nulla pariatur.
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
				<Disclosure>
					{({ open }) => (
						<>
							<Disclosure.Button className="flex w-full justify-between items-center rounded-lg bg-white shadow-md px-4 py-4 font-medium focus:outline-none">
								<span>What is your refund policy?</span>
								<AiOutlineDown
									className={`${
										open ? "rotate-180 transform" : ""
									} h-3 w-3 text-black`}
								/>
							</Disclosure.Button>
							<Disclosure.Panel className="text-gray-500 text-left mt-5">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation ullamco laboris
								nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
								in reprehenderit in voluptate velit esse cillum dolore eu fugiat
								nulla pariatur.
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			</section>
		</LayoutWeb>
	);
}

export default FAQ;
