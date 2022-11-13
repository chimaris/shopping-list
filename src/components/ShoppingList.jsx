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
        if ((name != '') && (+price > 0 && +price < 1000000)) {
            setShoppingList((prev) => [...prev, { name: name, price: price, isChecked: false }]);
            setName('');
            setPrice(0);
        }
        updateTotalPrice();
    }

    const updateHandler = (e) => {
        e.preventDefault();
        if ((name != '') && (+price > 0 && +price < 1000000)) {
            const updateListCopy = [...shoppingList];
            updateListCopy[currentId].name = name;
            updateListCopy[currentId].price = price;
            setShoppingList(updateListCopy);
            setIsEdit(false);
        }
    }

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
        if (confirm('oops!! 😱😱\nAre you sure you want to delete ??')) {
            const newShoppingList = shoppingList.filter(item => shoppingList.indexOf(item) != id);
            setShoppingList(newShoppingList);
        }

    }


    return (
        <div className='bg-white mt-4 text-black py-5 lg:px-8 h-auto lg:flex lg:justify-between box-border'>
            <div className='p-4'>
                <h1 className='md:text-4xl text-blue-600 font-bold text-center text-2xl '>Shopping App 🛒</h1>
                <div className='md:w-96 w-full md:max-W-xs mt-4 mx-auto'>
                    <form className='shadow-md rounded md:px-8 px-4 pt-6 pb-8 mb-4' onSubmit={isEdit ? updateHandler : submitHandler}>
                        <label className="block text-gray-700 text-sm font-bold mb-6" htmlFor="username">
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="What do you want to buy" value={name} onChange={e => setName(e.target.value)} />
                        </label>
                        <label className="block text-gray-700 text-sm font-bold mb-6" htmlFor="username">
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value.slice(0, 6))} />
                        </label>
                        <button className="block cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            {isEdit ? 'Edit Item' : 'Add Item'}
                        </button>
                    </form>
                </div>

            </div>

            <div className='border-t-2 lg:border-l-2  border-blue-600 p-4 md:w-3/5 mx-auto'>
                <ul className='min-h-48'>
                    {shoppingList.length > 0 ? shoppingList.map((item, index) => (
                        <li key={index} className={item.isChecked ? 'line-through flex justify-between border-b-2 border-blue-400 md:p-3 p-2' : 'flex justify-between border-b-2 border-blue-400 md:p-3 p-2'}>
                            <input type="checkbox" name="" id="" onChange={(e) => checkboxHandler(e, index)} />
                            <span className='px-4 w-3/6 lg:w-3/5'>{item.name}</span>
                            <span className='w-1/7 mr-2'>${item.price}</span>
                            <div className='w-auto'>
                                <button className='md:mr-4 mr-2 cursor-pointer hover:text-blue-800' title='Edit' onClick={() => editIconHandler(index)}><FaEdit /></button>
                                <button className='cursor-pointer hover:text-red-800' title='Delete' onClick={() => deleteHandler(index)}><FaTrash /></button>
                            </div>

                        </li>
                    )) : <h2 className='pb-32 text-3xl text-red-800'>No list at the moment</h2>}
                </ul>
                <div className='border shadow-lg text-white mt-10 h-18 lg:py-4 lg:px-6 py-4 px-2 bg-blue-600 rounded-lg '>
                    <p className='flex justify-between text-center'><span className='mr-2'>Total: ${totalPrice}</span><span className='mr-2'>Spent: ${checkedPrice}</span><span>Bal: ${uncheckedPrice}</span></p>
                </div>
            </div>
        </div>
    )
}

export default ShoppingList