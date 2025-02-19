import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex justify-between bg-slate-800 text-white px-8 py-4'>
            <div className="logo">
                <span className='font-bold text-xl'>iTask</span>
            </div>
            <ul className="flex gap-8">
                <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
                <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
            </ul>
        </nav>
    )
}

export default Navbar
