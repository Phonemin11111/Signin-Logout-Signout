import React from "react";
import useTheme from "../hooks/useTheme";

export default function Home() {
	const { theme, setTheme } = useTheme();
	const handleClick = () => {
		console.log({ theme });

		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};
	return (
		<div className="text-3xl dark:text-red-500 text-blue-500">
			<h1>Home {theme}</h1>
			<button onClick={handleClick}>change theme</button>
		</div>
	);
}
