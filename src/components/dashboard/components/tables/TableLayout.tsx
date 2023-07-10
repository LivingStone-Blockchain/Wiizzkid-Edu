import React, { FC, useContext, useMemo } from 'react'
import { QuizContext, QuizContextType } from '../../../../context/quiz.context';
import { WiizzkidContext, WiizzkidContextType } from '../../../../context/wiizzkid.context';
import {TimestableContext,TimestableContextType } from '../../../../context/timestable.context';
import { tableData as quizTableData } from '../../data/quizTableData';
import { tableData as timestableTableData } from '../../data/timetableTableData';
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
  const { quizRecentGames } = useContext(QuizContext) as QuizContextType;
  const { timestableRecentGames } = useContext(TimestableContext) as TimestableContextType;
  const { dashBoardMode } = useContext(WiizzkidContext) as WiizzkidContextType;
  const data = dashBoardMode ?  useMemo(() => timestableTableData(timestableRecentGames!), []) :  useMemo(() => quizTableData(quizRecentGames!), []);


  //pick columns based on dashboard type
  const columns: ColumnsType[] = dashBoardMode 
  ? useMemo(() => [
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
      Header: "Difficulty",
      accessor: "difficulty",
    },
    {
      Header: "score",
      accessor: "score",
    },

  ], [])
  : useMemo(() => [
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
      <p className='font-medium text-navy'>Games Table</p>
      <div data-aos="fade-up" data-aos-delay="200" className='overflow-auto whitespace-nowrap scrollbar-hide rounded-lg ring-1 ring-black ring-opacity-5'>
      {data === undefined ? (
        <Preloader dashboardLoader={true}/>
      ):(
        <Table columns={columns} data={data.reverse()} />
      )}
    </div>
    </div>
  )
}

export default TableLayout;