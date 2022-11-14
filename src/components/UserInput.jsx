import React from 'react'

const UserInput = (props) => {

    const { setShoppingList, shoppingList, setIsEdit, isEdit, name, price, setName, setPrice, currentId, updateTotalPrice } = props;

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
            setName('');
            setPrice(0);
        }
    }


    return (
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
    )
}

export default UserInput