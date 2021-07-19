import React, { useEffect } from 'react'
import { TextField, Button, Checkbox } from '@material-ui/core';

// List all todos after fetching from http://jsonplaceholder.typicode.com/todos

export default function Todos() {
	const [todos, setTodos] = React.useState([]);

	useEffect(() => {
		fetch('http://jsonplaceholder.typicode.com/todos')
			.then(response => response.json())
			.then(todos => {
				setTodos(todos);
			}).catch(error => console.log(error));
	}, []);

	return (
		<div>
			<TextField
				id="new-todo"
				label="Add a new todo"
				type="text"
				onChange={event => {
					const todo = {
						task: event.target.value,
					};
					todos.push(todo);
					setTodos(todos);
				}}
			/>
			<Button
				color="primary"
				onClick={() => {
					setTodos([]);
				}}
			>
				Clear
			</Button>
			<ul>
				{todos.map(todo => (
					<li key={todo._id}>
						<Checkbox
							label="Completed"
							checked={todo.done}
							onChange={() => {
								todo.done = !todo.done;
								setTodos(todos);
							}}
						/>
						<span>{todo.title}</span>
					</li>
				))}
			</ul>
		</div>
	)
}