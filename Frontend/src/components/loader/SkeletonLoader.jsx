import React from 'react'

export const SkeletonLoader = () => {
  return (
    <div>
    


<div role="status" class="animate-pulse space-y-8 max-w-3xl">

  <div class="space-y-4">
    <div class="h-6 bg-gray-200 rounded-md dark:bg-gray-700 w-1/2"></div>

    <div class="space-y-2">
      <div class="h-3 bg-gray-200 rounded dark:bg-gray-700 w-full"></div>
      <div class="h-3 bg-gray-200 rounded dark:bg-gray-700 w-11/12"></div>
      <div class="h-3 bg-gray-200 rounded dark:bg-gray-700 w-10/12"></div>
      <div class="h-3 bg-gray-200 rounded dark:bg-gray-700 w-9/12"></div>
    </div>

    <div class="bg-gray-100 dark:bg-gray-700 rounded p-4 space-y-2">
      <div class="h-2.5 bg-gray-300 rounded w-3/4"></div>
      <div class="h-2.5 bg-gray-300 rounded w-2/3"></div>
      <div class="h-2.5 bg-gray-300 rounded w-1/2"></div>
    </div>
  </div>


  <div class="space-y-4">
    <div class="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-1/2"></div>

    <div class="space-y-2">
      <div class="h-3 bg-gray-200 rounded dark:bg-gray-700 w-full"></div>
      <div class="h-3 bg-gray-200 rounded dark:bg-gray-700 w-11/12"></div>
      <div class="h-3 bg-gray-200 rounded dark:bg-gray-700 w-10/12"></div>
      <div class="h-3 bg-gray-200 rounded dark:bg-gray-700 w-9/12"></div>
    </div>
  </div>

</div>
    </div>
  )
}
