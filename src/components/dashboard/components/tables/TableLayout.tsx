import React, { FC, useContext, useMemo } from 'react'
import { QuizContext, QuizContextType } from '../../../../context/quiz.context';
import { tableData } from './../../data/tableData';
import Table from './Table';
import { Preloader } from './../../../index';


type ColumnsType = {
  Header: string,
  accessor: string,
}


type val = {
  value: number
}




const TableLayout = () => {
  const { recentGames } = useContext(QuizContext) as QuizContextType;
  const data = useMemo(() => tableData(recentGames!), []);


  const columns: ColumnsType[] = useMemo(() => [
    {
      Header: "Game Id",
      accessor: "gameId",
    },
    {
      Header: "Game Mode",
      accessor: "game_mode",
    },
    {
      Header: "Date",
      accessor: "created_at",
    },
    {
      Header: "Category",
      accessor: "category",
    },
    {
      Header: "Difficulty",
      accessor: "difficulty",
    },
    {
      Header: "score",
      accessor: "score",
    },

  ], []);



  return (
      <div className="flex flex-col gap-8">
      <p className='font-medium text-navy'>Quiz Table</p>
      <div data-aos="fade-up" data-aos-delay="200" className='overflow-auto whitespace-nowrap scrollbar-hide rounded-lg ring-1 ring-black ring-opacity-5'>
      {data === undefined ? (
        <Preloader dashboardLoader={true}/>
      ):(
        <Table columns={columns} data={data} />
      )}
    </div>
    </div>
  )
}

export default TableLayout;