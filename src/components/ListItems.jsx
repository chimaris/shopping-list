import React from 'react'
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';

const ListItems = ({ setShoppingList, shoppingList, setIsEdit, setCurrentId, setName, setPrice }) => {

    const editIconHandler = (id) => {
        setIsEdit(true);
        setCurrentId(id);
        setName(shoppingList[id].name);
        setPrice(shoppingList[id].price);
    }

    const checkboxHandler = (e, id) => {
        const listCopy = [...shoppingList];
        const itemToUpdate = listCopy.find(item => listCopy.indexOf(item) === id);
        itemToUpdate.isChecked = e.target.checked;
        setShoppingList(listCopy);
        // updateCheckedPrice();
        // updateUncheckedPrice();
        // console.log(shoppingList);
    }

    const deleteHandler = (id) => {
        if (confirm("oops!! 😱😱\n\nAre you sure you want to delete?\nClick OK if yes.")) {
            const newShoppingList = shoppingList.filter(item => shoppingList.indexOf(item) != id);
            setShoppingList(newShoppingList);
        }

    }

    return (
        <ul style={{ minHeight: "250px" }}>
            {shoppingList.length > 0 ? shoppingList.map((item, index) => (
                <li key={index} className={item.isChecked ? 'line-through flex justify-between border-b-2 border-blue-400 md:p-3 p-2' : 'flex justify-between border-b-2 border-blue-400 md:p-3 p-2'}>
                    <input type="checkbox" name="" id="" onChange={(e) => checkboxHandler(e, index)} />
                    <span className='mx-2 lg:mx-4 w-3/6 lg:w-3/5'>{item.name}</span>
                    <span className='w-1/7 mr-2'>${item.price}</span>
                    <div>
                        <button className='md:mr-4 mr-2 cursor-pointer text-blue-800' title='Edit' onClick={() => editIconHandler(index)}><FaEdit /></button>
                        <button className='cursor-pointer text-red-800' title='Delete' onClick={() => deleteHandler(index)}><FaTrash /></button>
                    </div>
                </li>
            )) : <h2 className='pb-32 text-3xl text-red-800 text-bolder text-center'>No list found</h2>}
        </ul>
    )
}

export default ListItems