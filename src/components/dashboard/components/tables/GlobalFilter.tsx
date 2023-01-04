import { useState, FC } from 'react';
import { useLocation } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import { useAsyncDebounce } from 'react-table'  // new

type FilterProps = {
    globalFilter: string,
    setGlobalFilter:React.Dispatch<React.SetStateAction<string>>,
    preGlobalFilteredRows: any
}


// Define a UI for filtering
const GlobalFilter:FC<FilterProps> = ({
    globalFilter,
    setGlobalFilter,
    preGlobalFilteredRows,
  }) => {
    const [value, setValue] = useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
    }, 200);
    const { pathname } = useLocation();



    return (
    <>
      {pathname.includes("/dashboard/quiz-history") && (
    <div hidden className="block absolute lg:right-[36px] right-[23px] top-[9px] z-[20] sm:w-auto w-1/2">
    <div className="relative flex items-center text-gray-400 focus-within:text-tomato">
      <span className="absolute left-4 flex h-6 items-center border-r border-gray-300 pr-3 z-[50]">
        <svg
          xmlns="http://ww50w3.org/2000/svg"
          className="w-4 fill-current"
          viewBox="0 0 35.997 36.004"
        >
          <path
            id="Icon_awesome-search"
            data-name="search"
            d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"
          ></path>
        </svg>
      </span>
      <input
        type="search"
        name="leadingIcon"
        id="leadingIcon"
        placeholder="Search..."
        value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
        className="outline-none w-full rounded-xl border border-gray-300 py-2.5 pl-14 pr-4 text-sm text-gray-600 transition focus:border-navy"
      />
    </div>
  </div>
      )}
      </>
    )
  }; 

  export default GlobalFilter;