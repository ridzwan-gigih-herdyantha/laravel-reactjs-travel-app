import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Api } from "../../../../api";

function CommentForm({ submitLabel }) {
	let { id } = useParams();
	const [newcomment, setNewComment] = useState("");
	const isTextAreaDisabled = newcomment.length === 0;

	const addComments = () => {
		axios
			.post(`${Api}/blog`, { comment: newcomment, id: id })
			.then((response) => {
				// console.log("okeh");
			});
	};

	useEffect(() => {
		addComments();
	}, []);

	const onSubmit = (e) => {
		e.preventDefault();
		setNewComment("");
		addComments();
	};
	return (
		<form onSubmit={onSubmit}>
			<input
				value={newcomment}
				onChange={(e) => setNewComment(e.target.value)}
			/>
			<button disabled={isTextAreaDisabled}>Post Comment</button>
		</form>
	);
}

export default CommentForm;
