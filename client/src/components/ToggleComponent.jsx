import React, { useState } from "react";
import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";

function ToggleComponent({ children }) {
	const [isVisible, setIsVisible] = useState(true);

	const toggleVisibility = () => {
		setIsVisible(!isVisible);
	};

	return (
		<>
			<a onClick={toggleVisibility} id="btn-nav-mobile">
				<AiOutlineMenu />
			</a>
			{!isVisible && children}
		</>
	);
}

export default ToggleComponent;
