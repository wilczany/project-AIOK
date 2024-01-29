import React from "react";

interface IProps {
	status: boolean;
	text: string;
}

const ValidationInfo = (props: IProps) => {
	return (
		<div>
			{props.status ? (
				// <span hidden={true} style={{ color: "green" }}>
				<span style={{ color: "green" }}>{props.text}</span>
			) : (
				<span style={{ color: "red" }}>{props.text}</span>
			)}
		</div>
	);
};

export default ValidationInfo;
