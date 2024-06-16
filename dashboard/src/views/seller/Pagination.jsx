import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const Pagination = ({ pageNumber, setPageNumber, totalItem, perPage, showItems }) => {
    let totalPage = Math.ceil(totalItem / perPage);
    let startPage = Math.max(1, pageNumber - Math.floor(showItems / 2));
    let endPage = startPage + showItems - 1;

    if (endPage > totalPage) {
        endPage = totalPage;
        startPage = Math.max(1, endPage - showItems + 1);
    }
    startPage = Math.max(1, startPage);

    const createBtn = () => {
        const btns = [];
        for (let i = startPage; i <= endPage; i++) {
            btns.push(
                <li
                    key={i} // Added key prop to avoid React warnings
                    className={`bg-slate-600 hover:bg-indigo-400 shadow-lg ${
                        pageNumber === i
                            ? 'bg-slate-300 shadow-indigo-300/50 text-white'
                            : 'shadow-indigo-500/50 hover:text-white text-[#d9d9d9]'
                    } w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer`}
                    onClick={() => setPageNumber(i)}
                >
                    {i}
                </li>
            );
        }
        return btns;
    }
    
    return (
        <ul className="flex gap-3">
            {pageNumber > 1 && (
                <li
                    className="w-[33px] h-[33px] rounded-full flex justify-center items-center 
                    bg-slate-300 text-[#000000] cursor-pointer"
                    onClick={() => setPageNumber(pageNumber - 1)}
                >
                    <MdOutlineKeyboardDoubleArrowLeft />
                </li>
            )}
            {
                createBtn()
            }
            {pageNumber < totalPage && (
                <li
                    className="w-[33px] h-[33px] rounded-full flex justify-center items-center 
                    bg-slate-300 text-[#000000] cursor-pointer"
                    onClick={() => setPageNumber(pageNumber + 1)}
                >
                    <MdOutlineKeyboardDoubleArrowRight />
                </li>
            )}
        </ul>
    );
};

export default Pagination;
