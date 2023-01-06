import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


const SkeletonLoader = () => {
  return (
    <SkeletonTheme baseColor="#a5a6c8" highlightColor="#7d7eaf">
    <p>
        <Skeleton count={1} className='h-5 w-36 mb-4' />
    </p>
    <p>
        <Skeleton count={1} className='h-10' />
    </p>
   
    <p className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 transition'>
        <Skeleton count={1} className='w-full h-12'/>
        <Skeleton count={1} className='w-full h-12'/>
        <Skeleton count={1} className='w-full h-12'/>
        <Skeleton count={1} className='w-full h-12'/>
    </p>
</SkeletonTheme>
  )
}

export default SkeletonLoader;