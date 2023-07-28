import React from "react";
import TodoList from "./todo-list";

//include images into your bundle

//create your first component
const Home = () => {
	return (
		<div className="d-flex justify-content-center">
			<TodoList />
		</div>
	);
};

export default Home;
