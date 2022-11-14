import React from 'react'

const Account = ({ uncheckedPrice, checkedPrice, totalPrice }) => {
    return (
        <div className='border shadow-lg text-white mt-10 h-18 lg:py-4 lg:px-6 py-4 px-2 bg-blue-600 rounded-lg '>
            <p className='flex justify-between text-center'><span className='mr-2'>Total: ${totalPrice}</span><span className='mr-2'>Spent: ${checkedPrice}</span><span>Bal: ${uncheckedPrice}</span></p>
        </div>
    )
}

export default Account