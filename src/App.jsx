import { useState } from 'react'
import ShoppingList from './components/ShoppingList'
import './App.css'

function App() {

  return (
    <div className="container mx-auto bg-gray-900 text-white rounded-xl shadow border p-4 md:p-8 m-4 h-auto">
      <p className="text-3xl text-gray-700 font-bold mb-5">
        Welcome!
      </p>
      <p className="text-gray-500 text-lg">
        React and Tailwind CSS in action
      </p>
      <ShoppingList />
    </div>
  )
}

export default App
