import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [{id: 1, text: "Hello World"}],
    editTodo: null
}


export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(), 
                text: action.payload
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },
        updateTodo: (state, action) => {
            const {id,text} = action.payload
            const todo = state.todos.find((todo) => todo.id === id)
            if(todo){
                todo.text = text
            }
        },
        setEditTodo: (state,action) => {
            state.editTodo = action.payload
        }
    }
})

export const {addTodo, removeTodo, updateTodo, setEditTodo} = todoSlice.actions

export default todoSlice.reducer