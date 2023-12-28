import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Api } from "../../../api";

function SearchAll() {
	const [titleSearch, setTitleSearch] = useState([]);
	const [hideNullData, setHideNullData] = useState(true);

	function queryTitle(event) {
		Api.get(`/search-all?keyword=${event.target.value}`).then((response) => {
			if (event.target.value === "") {
				setHideNullData(true);
				setTitleSearch(0);
			} else {
				setHideNullData(false);
				setTitleSearch(response.data.data);
			}
		});
	}

	return (
		<div>
			<div className="mx-auto mt-12 justify-between px-4 lg:mx-8 w-auto sm:mx-8 w-auto md:mx-8 w-auto py-2 rounded-full items-center border-[.1em] border-[#005a98] bg-white flex lg:hidden">
				<input
					type="text"
					className="bg-transparent text-gray-500 font-medium w-full lg:w-96 placeholder:text-sm placeholder:text-gray-500 focus:border-2 focus:outline-none focus:border-none placeholder:font-medium placeholder:ml-4"
					placeholder="Cari tujuan Anda di sini"
					onChange={queryTitle}
				/>
				<BsSearch className="text-[#005a98] bg-transparent" />
			</div>
			{titleSearch && titleSearch.length !== 0 ? (
				<div className="mx-8 absolute lg:hidden">
					<ul
						className="bg-white absolute drop-shadow-md rounded-lg translate-y-2 w-96 space-y-2 p-2 divide-y align-center"
						hidden={hideNullData}
					>
						{titleSearch.slice(0, 10).map((item, key) => {
							return (
								<div className="border-bottom">
									<a
										className="dataItem text-sm text-gray-500 font-medium"
										href={`/${item.type}/${item.slug}`}
									>
										<p className="mt-[.5rem] ml-2">{item.title}</p>
									</a>
								</div>
							);
						})}
					</ul>
				</div>
			) : (
				<div className="mx-8 absolute lg:hidden" hidden={hideNullData}>
					<ul className="bg-white drop-shadow-md rounded-lg translate-y-2 w-96 space-y-2 p-2 divide-y">
						<p className="text-sm text-gray-500 font-medium">Tidak ditemukan</p>
					</ul>
				</div>
			)}
		</div>
	);
}

function SearchAllNavbar() {
	const [titleSearch, setTitleSearch] = useState([]);
	const [hideNullData, setHideNullData] = useState(true);

	function queryTitle(event) {
		Api.get(`/search-all?keyword=${event.target.value}`).then((response) => {
			if (event.target.value === "") {
				setHideNullData(true);
				setTitleSearch(0);
			} else {
				setHideNullData(false);
				setTitleSearch(response.data.data);
			}
		});
	}

	return (
		<div>
			<div className="mx-auto justify-between px-4 lg:px-6 w-64 sm:w-80 md:w-96 py-2 rounded-full items-center border-[.1em] border-[#005a98] bg-white hidden lg:flex">
				<input
					type="text"
					className="bg-transparent text-gray-500 font-medium w-full lg:w-96 placeholder:text-sm placeholder:text-gray-500 focus:border-2 focus:outline-none focus:border-none placeholder:font-medium placeholder:ml-4"
					placeholder="Cari tujuan Anda di sini"
					onChange={queryTitle}
				/>
				<BsSearch className="text-[#005a98] bg-transparent" />
			</div>
			{titleSearch && titleSearch.length !== 0 ? (
				<div className="absolute">
					<ul
						className="bg-white drop-shadow-md rounded-lg translate-y-2 w-96 space-y-2 p-2 divide-y align-center"
						hidden={hideNullData}
					>
						{titleSearch.slice(0, 10).map((item, key) => {
							return (
								<div className="border-bottom">
									<a
										className="dataItem text-sm text-gray-500 font-medium"
										href={`/${item.type}/${item.slug}`}
									>
										<p className="mt-[.5rem] ml-2">{item.title}</p>
									</a>
								</div>
							);
						})}
					</ul>
				</div>
			) : (
				<div className="absolute" hidden={hideNullData}>
					<ul className="bg-white drop-shadow-md rounded-lg translate-y-2 w-96 space-y-2 p-2 divide-y">
						<p className="text-sm text-gray-500 font-medium">Tidak ditemukan</p>
					</ul>
				</div>
			)}
		</div>
	);
}

export { SearchAll, SearchAllNavbar };
