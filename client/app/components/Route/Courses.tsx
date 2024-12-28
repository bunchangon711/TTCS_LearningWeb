import { useEffect, useState } from "react";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import CourseCard from "../Course/CourseCard";
import { title } from "@/components/primitives";

type CoursesProps = {};

const Courses = ({}: CoursesProps) => {
	const { data, isLoading } = useGetUsersAllCoursesQuery({});
	const [courses, setCourses] = useState<any[]>([]);
  
	useEffect(() => {
	  if (data?.courses) {
		setCourses(data.courses);
	  }
	}, [data]);

	return (
		<div>
			<div className="mt-44 flex justify-center flex-col">
			<h1 className={title({ class: "text-center mb-16" })}>
				<span className={title({ color: "violet" })}>Các khóa học tiêu biểu</span>
			</h1>

			<div className="relative w-screen -left-[50vw] right-[50vw] ml-[50%] mr-[50%] overflow-hidden">
				<div className="flex animate-scroll gap-[35px] py-4">
				{courses && courses.length > 0 && [...courses, ...courses, ...courses].map((item: any, index: number) => (
					<div key={index} className="flex-none w-[calc(25%-26px)] min-w-[500px]">
					<CourseCard item={item} />
					</div>
				))}
				</div>
			</div>
			</div>
		</div>
	);
};

export default Courses;
