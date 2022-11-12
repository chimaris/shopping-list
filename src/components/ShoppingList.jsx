import React, { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';


const initialValue = [
    {
        name: 'Iphone 12 pro max',
        price: 1000,
        isChecked: false,
    },
    {
        name: 'HP folio laptop',
        price: 500,
        isChecked: false,

    },
];

const ShoppingList = () => {
    const [shoppingList, setShoppingList] = useState(initialValue);
    const [totalPrice, setTotalPrice] = useState(0);
    const [checkedPrice, setCheckedPrice] = useState(0);
    const [uncheckedPrice, setUncheckedPrice] = useState(0);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [isEdit, setIsEdit] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        updateTotalPrice();
        updateCheckedPrice();
        updateUncheckedPrice();
    }, [shoppingList]);

    const updateTotalPrice = () => {
        if (shoppingList.length > 0) {
            setTotalPrice(shoppingList.map(item => +item.price).reduce((a, b) => a + b));
        }
    }

    const updateCheckedPrice = () => {
        const checkedPriceArr = shoppingList.filter(item => item.isChecked != false);
        if (checkedPriceArr.length > 0) {
            setCheckedPrice(checkedPriceArr.map(item => +item.price).reduce((a, b) => a + b));
        } else {
            setCheckedPrice(0);
        }
    }

    const updateUncheckedPrice = () => {
        const checkedPriceArr = shoppingList.filter(item => item.isChecked != true);
        if (checkedPriceArr.length > 0) {
            setUncheckedPrice(checkedPriceArr.map(item => +item.price).reduce((a, b) => a + b));
        } else {
            setUncheckedPrice(0);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if ((name != '') && (+price > 0)) {
            setShoppingList((prev) => [...prev, { name: name, price: price, isChecked: false }]);
        }
        updateTotalPrice()
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

    const updateHandler = (e) => {
        e.preventDefault();
        const updateListCopy = [...shoppingList];
        updateListCopy[currentId].name = name;
        updateListCopy[currentId].price = price;
        setShoppingList(updateListCopy);
        setName('');
        setPrice(0);
        setIsEdit(false);
    }

    const editIconHandler = (id) => {
        setIsEdit(true);
        setCurrentId(id);
        setName(shoppingList[id].name);
        setPrice(shoppingList[id].price);
    }

    const deleteHandler = (id) => {
        const newShoppingList = shoppingList.filter(item => shoppingList.indexOf(item) != id);
        setShoppingList(newShoppingList);
    }


    return (
        <div className='md:container sm:p-0 bg-white mt-4 text-black py-5 px-8 h-auto md:flex justify-between box-border'>
            <div className='p-4'>
                <h1 className='text-4xl text-blue-600 font-bold '>Shopping App 🛒</h1>
                <div className='md:w-96 w-full max-W-xs mt-4'>
                    <form className='shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={isEdit ? updateHandler : submitHandler}>
                        <label className="block text-gray-700 text-sm font-bold mb-6" htmlFor="username">
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="What do you want to buy" value={name} onChange={e => setName(e.target.value)} />
                        </label>
                        <label className="block text-gray-700 text-sm font-bold mb-6" htmlFor="username">
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
                        </label>
                        <button className="block cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            {isEdit ? 'Edit Item' : 'Add Item'}
                        </button>
                    </form>
                </div>

            </div>

            <div className='border-l-2 border-blue-600 p-4 md:w-3/5'>
                <ul className='min-h-48'>
                    {shoppingList.length > 0 ? shoppingList.map((item, index) => (
                        <li key={index} className={item.isChecked ? 'line-through flex justify-between border-b-2 border-blue-400 p-3' : 'flex justify-between border-b-2 border-blue-400 p-3'}>
                            <input type="checkbox" name="" id="" onChange={(e) => checkboxHandler(e, index)} />
                            <span className='px-4 w-3/5'>{item.name}</span>
                            <span className='w-1/6'>${item.price}</span>
                            <div>
                                <button className='mr-4 cursor-pointer hover:text-blue-800' title='Edit' onClick={() => editIconHandler(index)}><FaEdit /></button>
                                <button className='cursor-pointer hover:text-red-800' title='Delete' onClick={() => deleteHandler(index)}><FaTrash /></button>
                            </div>

                        </li>
                    )) : <h2 className='pb-32 text-3xl text-red-800'>No list at the moment</h2>}
                </ul>
                <div className='border shadow-lg bg-gray-300 mt-10 h-16 py-4 px-6'>
                    <p className='flex justify-between'><span>Total: ${totalPrice}</span><span>Spent: ${checkedPrice}</span><span>Balance: ${uncheckedPrice}</span></p>
                </div>
            </div>
        </div>
    )
}

export default ShoppingList