import React from 'react';

const Search = ({setItemsPerPage}) => {
    return (
        <div className="flex justify-between items-center">
            <select onChange={e => setItemsPerPage(parseInt(e.target.value))} className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] 
                border border-slate-700 rounded-md text-[#d0d2d6]">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>
            <input type="text" className="px-4 py-2 focus:border-indigo-500 
            outline-none bg-[#6a5fdf] border border-slate-700
            rounded-md text-[#d0d2d6]" placeholder="search" />
        </div>
    );
};

export default Search;