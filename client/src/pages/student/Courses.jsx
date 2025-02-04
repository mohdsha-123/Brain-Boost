import { Skeleton } from "@/components/ui/skeleton";
import React, { useState } from "react";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
import { Button } from "@/components/ui/button";

const Courses = () => {
  const { data, isLoading, isError } = useGetPublishedCourseQuery();
  const [visibleCount, setVisibleCount] = useState(8);

  if (isError) return <h1>Some error occurred while fetching courses.</h1>;

  const loadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <div className="bg-gray-50 dark:bg-[#141414]">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-3xl text-center mb-10">Our Courses</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <CourseSkeleton key={index} />
              ))
            : data?.courses &&
              data.courses
                .slice(0, visibleCount)
                .map((course, index) => <Course key={index} course={course} />)}
        </div>

        {/* Load More Button */}
        {!isLoading && visibleCount < data?.courses?.length && (
          // <div className="flex justify-center mt-6">
          //   <button
          //     onClick={loadMore}
          //     className="text-blue-700 hover:underline p-7 text-center w-full"
              
          //   >
          //     Load More
          //   </button>
          // </div>
          <div
          onClick={loadMore}
          className="flex justify-center mt-6">
            <Button 
          className="bg-blue-600 dark:bg-gray-800 text-white rounded-full hover:bg-white hover:text-blue-600">
            Show more
          </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
};
