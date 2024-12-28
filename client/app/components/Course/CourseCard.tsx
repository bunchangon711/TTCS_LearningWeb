import Link from "next/link";
import Image from "next/image";
import Ratings from "@/app/utils/Ratings";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

type CourseCardProps = {
	item: any;
	isProfile?: boolean;
};

const CourseCard = ({ item, isProfile }: CourseCardProps) => {
	return (
		<div className="h-fit">
		<Link href={isProfile ? `course-access/${item._id}` : `/course/${item._id}`}>
			<CardContainer className='w-full'>
				<CardBody className='bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto min-h-full rounded-xl p-4 border'>
					<CardItem translateZ='50' className='text-xl font-bold text-neutral-600 dark:text-white h-[60px] line-clamp-2'>
						{item.name}
					</CardItem>

					<CardItem translateZ='100' className='w-full mt-6'>
						<Image
							src={item.thumbnail?.url}
							width={500}
							height={300}
							className='rounded w-full h-[300px] object-cover'
							alt=''
						/>
					</CardItem>

					<div className='flex justify-between items-center mt-4'>
						<Ratings rating={item.ratings} />
						<h5 className={`text-black dark:text-[#fff] ${isProfile && "hidden 800px:inline"}`}>
							{item.purchased} Students
						</h5>
					</div>
					
					<div className='flex justify-between items-center mt-8'>
						<div className='flex'>
							<h3 className='text-black dark:text-[#fff]'>
								{item.price === 0 ? "Free" : `${item.price} VND`}
							</h3>
							<h5 className='pl-3 text-[14px] mt-[-5px] line-through opacity-80 text-black dark:text-[#fff]'>
								{item.estimatedPrice} VND
							</h5>
						</div>
						<div className='flex items-center pb-3 pl-3'>
							{/* <AiOutlineUnorderedList size={20} fill='#fff' /> */}
							<h5 className='pl-2 text-black dark:text-[#fff]'>
								{item.courseData?.length} Lectures
							</h5>
						</div>
					</div>
				</CardBody>
			</CardContainer>
		</Link>
		</div>
	);
};

export default CourseCard;
