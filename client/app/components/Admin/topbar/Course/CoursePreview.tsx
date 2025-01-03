"use client";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import { Rating } from "@mui/material";
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	Input,
} from "@nextui-org/react";
import React, { FC } from "react";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import CreateCourse from "./CreateCourse";
type Props = {
	activeStep: number;
	setActiveStep: (active: number) => void;
	courseData: any;
	handleCourseCreate: any;
	isEdit?: boolean;
};

const CoursePreview: FC<Props> = ({
	courseData,
	handleCourseCreate,
	setActiveStep,
	activeStep,
	isEdit,
}) => {
	const discountPercentage =
		((courseData?.estimatedPrice - courseData?.price) /
			courseData?.estimatedPrice) *
		100;

	const discountPercentengePrice = discountPercentage.toFixed(0);

	const handleBackClick = () => {
		setActiveStep(activeStep - 1);
	};

	const createCourse = () => {
		handleCourseCreate();
	};

	return (
		<Card className='md:min-w-[750px] '>
			<CardHeader className='flex w-full'>
				<div className='w-full h-full'>
					<CoursePlayer
						videoUrl={courseData?.demoUrl}
						title={courseData?.title}
					/>
				</div>
			</CardHeader>
			<div className='flex flex-row items-center ml-4'>
				<h1 className='text-lg font-bold'>
					{courseData?.price === 0 ? "Free" : courseData?.price + " VND"}
				</h1>
				{courseData?.estimatedPrice && (
					<>
						<h5 className='pl-3 mb-3 line-through opacity-80 text-lg'>
							{courseData?.estimatedPrice} VND
						</h5>
						<h4 className='pl-3 text-lg'>{discountPercentengePrice}% Off</h4>
					</>
				)}
			</div>

			<CardBody className='flex gap-3'>
				<Button color='primary' variant='flat' className='px-8' type='submit'>
					Mua ngay với giá {courseData?.price} VND
				</Button>{" "}
				<div className='flex gap-3'>
					<Input
						labelPlacement='outside'
						type='text'
						variant='bordered'
						label=''
						placeholder='Mã giảm giá ...'
					/>
					<Button color='primary' variant='flat' className='px-8' type='submit'>
						Sử dụng{" "}
					</Button>{" "}
				</div>
				<p>
					<VerifiedRoundedIcon className='text-blue-600 mr-3 ' />
					Bao gồm đầy đủ tài liệu
				</p>
				<p>
					<VerifiedRoundedIcon className='text-blue-600 mr-3 ' />
					Quyền truy cập trọn đời
				</p>
				<p>
					<VerifiedRoundedIcon className='text-blue-600 mr-3 ' />
					Chứng chỉ hoàn thành
				</p>
				<p>
					<VerifiedRoundedIcon className='text-blue-600 mr-3 ' />
					Hỗ trợ 24/7
				</p>
				<Divider />
				<h1 className='font-[600] text-[25px]'>{courseData?.name}</h1>
				<div className='flex  justify-between me-2 '>
					<div className='flex gap-3 align-middle '>
						<Ratings rating={0} />
						<h5>{"  "} 0 Đánh giá</h5>
					</div>
					<h5>0 Học viên</h5>
				</div>
				<h1 className='font-[600] text-[25px]'>
					Bạn sẽ học được gì từ khóa học này?
				</h1>
				{courseData?.benefits?.map((item: any, index: number) => (
					<div key={index} className='flex align-middle '>
						<div className=' w-[15px] mr-4'>
							<ChecklistRoundedIcon />
						</div>
						<p>{item.title}</p>
					</div>
				))}
				<h1 className='font-[600] text-[25px]'>
					Những điều cần chuẩn bị trước khi tham gia khóa học?
				</h1>
				{courseData?.prerequisites?.map((item: any, index: number) => (
					<div key={index} className='flex align-middle '>
						<div className=' w-[15px] mr-4'>
							<ChecklistRoundedIcon />
						</div>
						<p>{item.title}</p>
					</div>
				))}
				{/* course Description */}
				<div>
					<h1 className='font-[600] text-[25px]'>Chi tiết khóa học</h1>
					{courseData?.description}
				</div>
			</CardBody>

			<Divider className='my-2' />
			<Divider className='my-2' />

			<CardFooter className="className='flex justify-between  mx-6'">
				<Button
					color='danger'
					variant='flat'
					className='px-8'
					onClick={handleBackClick}
				>
					Quay lại
				</Button>
				<Button
					color='danger'
					variant='flat'
					className='px-8'
					onClick={() => createCourse()}
				>
					{isEdit ? "Cập nhật" : "Tạo khóa học"}
				</Button>
			</CardFooter>
		</Card>
	);
};

export default CoursePreview;
