import React from "react";
// import { Link } from "react-router-dom";
import { ApiImg } from "../../../api";

function CardCity(props) {
	return (
		<a href={`/wisata`} key={props.id}>
			<img className="w-96 md:w-auto object-cover object-center rounded-xl h-40" src={ApiImg + "/" + props.path_image} alt="placeholder"/>
			<h5 className="text-base font-semibold mt-2 truncate text-gray-500">
				{props.name}
			</h5>
		</a>
	);
}

function CardEducation(props) {
	return (
		<a href={`/edukasi/${props.link}`} key={props.id}>
			<img className="w-96 md:w-auto object-cover object-center rounded-xl h-40" src={ApiImg + "/" + props.path_image} alt="placeholder"/>
			<h5 className="text-base font-semibold truncate mt-2 text-gray-500">
				{props.name}
			</h5>
		</a>
	);
}

export { CardCity, CardEducation };
