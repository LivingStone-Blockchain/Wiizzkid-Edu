import React, {FC, useEffect} from 'react'
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import {DOTS, useCustomPagination} from './useCustomPagination';
import GlobalFilter from './GlobalFilter';
import 'regenerator-runtime/runtime';


type PropsType = {
   columns: {
    Header: string,
    accessor: string,
   }[],
   data: any,
  }
  

const Table:FC<PropsType> = ({ columns, data }) => {
    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        page, 
        preGlobalFilteredRows,
        setGlobalFilter,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state,
     } =
    useTable({
      columns,
      data,
    },  useGlobalFilter, usePagination);



    const {pageIndex} = state;
            const paginationRange = useCustomPagination({
              totalPageCount: pageCount,
              currentPage: pageIndex,
              siblingCount: 1
       });

          useEffect(() => {
                  setPageSize(6);
            }, [setPageSize]); //set according to your preference




  return (
    <>
    <GlobalFilter
      preGlobalFilteredRows={preGlobalFilteredRows}
      globalFilter={state.globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
    <div data-aos="fade-up" data-aos-delay="100" className="flex flex-col">
            <div className="-my-2 overflow-auto whitespace-nowrap scrollbar-hide -mx-4 sm:-mx-6 lg:-mx-8">
              <div  className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-300 rounded-xl">
                    <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                      {headerGroups.map((headerGroup) => (
                          <tr {...headerGroup.getHeaderGroupProps()}>
                              {headerGroup.headers.map((column) => (
                                  <th {...column.getHeaderProps()}
                                  className="p-4 text-left text-sm font-medium text-gray-600 Capitalize rounded-xl tracking-wider"
                                  >
                                    {column.render("Header")}
                                    </th>
                              ))}
                          </tr>
                      ))}
                  </thead>
                  <tbody {...getTableBodyProps()}
                  className="bg-white divide-y divide-gray-200">
                    {page?.map((row, i) => {
                         prepareRow(row);
                         return (
                             <tr {...row.getRowProps()}>
                             {row.cells.map((cell) => {
                                 return <td {...cell.getCellProps()} className="p-4 text-sm font-lg tracking-wide text-left text-gray-600 whitespace-nowrap">{cell.render("Cell")}</td>
                             })}
                             </tr>
                         );
                         })}
                     </tbody>
                       </table>

                       <div className="py-3 flex items-center text-center md:justify-center justify-start pt-5 bg-gray-100">
        <div className="flex-1 flex items-center md:justify-center justify-start" aria-label="Pagination">
          <div className="relative z-0 inline-flex items-center justify-center md:mx-auto ml-10 rounded-md shadow-sm space-x-5" aria-label="Pagination">
                {paginationRange?.map((pageNumber:any, index) => {
                    if (pageNumber === DOTS) {
                        return (
                            <div
                            key={index} className="relative bottom-1">...</div>
                        );
                    }

                    if ((pageNumber - 1) === pageIndex) {
                        return (
                            <div
                            key={index} className="relative bottom-1">...</div>
                            );
                        }
    
                        if ((pageNumber - 1) === pageIndex) {
                            return (
                                <div
                                    key={index}
                                    className='active:bg-teal text-[10px] bg-navy rounded-lg text-white py-2 px-3 cursor-pointer'
                                    onClick={() => gotoPage(pageNumber - 1)}>{pageNumber}</div>
                            );
                        }
    
                        return (
                            <div
                                key={index}
                                className='active:bg-teal text-[10px] bg-navy rounded-lg text-white py-2 px-3 cursor-pointer'
                                onClick={() => gotoPage(pageNumber - 1)}>{pageNumber}</div>
                        );
                    })}
                   </div>
                 </div>
             </div>
            </div>
        </div>
    </div>
</div>
</>
  )
}

export default Table;