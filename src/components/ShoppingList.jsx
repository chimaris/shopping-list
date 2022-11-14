import React, { useEffect, useState } from 'react'
import UserInput from './UserInput';
import ListItems from './ListItems';
import Account from './Account';


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


    return (
        <div className='bg-white mt-4 text-black py-5 lg:px-8 h-auto lg:flex lg:justify-between box-border'>
            <div className='p-4'>
                <h1 className='md:text-4xl text-blue-600 font-bold text-center text-2xl '>Shopping App 🛒</h1>

                <UserInput setShoppingList={setShoppingList} shoppingList={shoppingList} setIsEdit={setIsEdit} updateTotalPrice={updateTotalPrice} isEdit={isEdit} currentId={currentId} name={name} price={price} setName={setName} setPrice={setPrice} />

            </div>

            <div className='border-t-2 lg:border-l-2  border-blue-600 p-4 md:w-3/5 mx-auto'>

                <ListItems setShoppingList={setShoppingList} setIsEdit={setIsEdit} setCurrentId={setCurrentId} setName={setName} setPrice={setPrice} shoppingList={shoppingList} />

                <Account checkedPrice={checkedPrice} uncheckedPrice={uncheckedPrice} totalPrice={totalPrice} />

            </div>
        </div>
    )
}

export default ShoppingList