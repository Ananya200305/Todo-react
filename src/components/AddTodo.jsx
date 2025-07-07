import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, setEditTodo, updateTodo } from '../features/todo/todoSlice'

function AddTodo() {
  const [input, setInput] = useState('')
  const dispatch = useDispatch()
  const editTodo = useSelector((state) => state.editTodo)

  // 🧠 When user clicks "Edit", this will fill the input field
  useEffect(() => {
    if (editTodo) {
      setInput(editTodo.text)
    } else {
      setInput('')
    }
  }, [editTodo])

  const addTodoHandler = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    if (editTodo) {
      dispatch(updateTodo({ id: editTodo.id, text: input }))
      dispatch(setEditTodo(null)) // ✅ Reset edit mode after update
    } else {
      dispatch(addTodo(input))
    }

    setInput('')
  }

  return (
    <form onSubmit={addTodoHandler} className="space-x-3 mt-12">
      <input
        type="text"
        className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        {editTodo ? 'Update To Do' : 'Add To Do'}
      </button>
    </form>
  )
}

export default AddTodo
