import React from "react";

interface IProps {
	status: boolean;
	text: string;
}

const ValidationInfoHidden = (props: IProps) => {
	return <div>{props.status && <span style={{ color: "#BD0000" }}>{props.text}</span>}</div>;
};

export default ValidationInfoHidden;
