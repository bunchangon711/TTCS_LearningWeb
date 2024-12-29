/* eslint-disable @next/next/no-img-element */
"use client";
import React, { FC, useEffect, useState } from "react";
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Divider,
	Link,
	Input,
	Textarea,
	Button,
	Select,
	SelectItem,
} from "@nextui-org/react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";

type Props = {
	courseInfo: any;
	setCourseInfo: (courseInfo: any) => void;
	activeStep: number;
	setActiveStep: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
	courseInfo,
	setCourseInfo,
	activeStep,
	setActiveStep,
}) => {
	const [dragging, setDragging] = useState(false);
	const [selectedFileName, setSelectedFileName] = useState("");

	const { data } = useGetHeroDataQuery("Categories", {});

	const [categories, setCategories] = useState([]);

	useEffect(() => {
		if (data) {
			setCategories(data.layout.categories);
		}
	}, [data]);

	const [errorMessage, setErrorMessage] = useState("");
	const [openSnackbar, setOpenSnackbar] = useState(false);

	const handleCloseSnackbar = () => {
		setOpenSnackbar(false);
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (validateForm()) {
			setActiveStep(activeStep + 1);
			console.log("next");
		} else {
			setOpenSnackbar(true);
		}
	};

	const handleFileChange = (e: any) => {
		const file = e.target.files?.[0];

		if (file) {
			setSelectedFileName(file.name); // Set selected file name
			const reader = new FileReader();
			reader.onload = (e: any) => {
				if (reader.readyState === 2) {
					setCourseInfo({ ...courseInfo, thumbnail: reader.result });
				}
			};
			reader.readAsDataURL(file);
		}
	};

	const handleDragOver = (e: any) => {
		e.preventDefault();
		setDragging(true);
	};

	const handleDragLeave = (e: any) => {
		e.preventDefault();
		setDragging(false);
	};

	const handleDrop = (e: any) => {
		e.preventDefault();
		setDragging(false);
		const file = e.dataTransfer.files?.[0];
		if (file) {
			setSelectedFileName(file.name); // Set selected file name

			const reader = new FileReader();

			reader.onload = () => {
				setCourseInfo({ ...courseInfo, thumbnail: reader.result });
			};
			reader.readAsDataURL(file);
		}
	};

	const validateForm = () => {
		if (
			!courseInfo.name ||
			!courseInfo.description ||
			!courseInfo.price ||
			!courseInfo.tags ||
			!courseInfo.categories ||
			!courseInfo.level ||
			!courseInfo.demoUrl ||
			!courseInfo.thumbnail
		) {
			setErrorMessage("Please fill in all fields.");
			return false;
		}
		return true;
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<Card className='md:min-w-[750px] '>
					<CardHeader className='flex gap-3'>
						<Input
							labelPlacement='outside'
							type='text'
							variant='bordered'
							required
							label='Tên khóa học'
							placeholder='Tên khóa học'
							value={courseInfo.name}
							onChange={(e: any) =>
								setCourseInfo({ ...courseInfo, name: e.target.value })
							}
						/>
					</CardHeader>
					<CardBody className='gap-3'>
						<Textarea
							variant='bordered'
							label='Giới thiệu khóa học'
							labelPlacement='outside'
							required
							placeholder='Mô tả khóa học'
							className='col-span-12 md:col-span-6 mb-6 md:mb-0'
							value={courseInfo.description}
							onChange={(e: any) =>
								setCourseInfo({
									...courseInfo,
									description: e.target.value,
								})
							}
						/>
						<div className='flex gap-3'>
							<Input
								labelPlacement='outside'
								type='number'
								variant='bordered'
								label='Giá bán'
								placeholder='150000'
								value={courseInfo.price}
								onChange={(e: any) =>
									setCourseInfo({ ...courseInfo, price: e.target.value })
								}
								startContent={
									<div className='pointer-events-none flex items-center'>
										<span className='text-default-400 text-small'> VND</span>
									</div>
								}
							/>
							<Input
								labelPlacement='outside'
								type='number'
								variant='bordered'
								label='Giá gốc'
								placeholder='200000'
								value={courseInfo.estimatedPrice}
								onChange={(e: any) =>
									setCourseInfo({
										...courseInfo,
										estimatedPrice: e.target.value,
									})
								}
								startContent={
									<div className='pointer-events-none flex items-center'>
										<span className='text-default-400 text-small'> VND</span>
									</div>
								}
							/>
						</div>

						<div className='flex gap-3'>
							<Input
								labelPlacement='outside'
								type='text'
								required
								variant='bordered'
								label='Từ khóa'
								value={courseInfo.tags}
								onChange={(e: any) =>
									setCourseInfo({ ...courseInfo, tags: e.target.value })
								}
								placeholder='MERN, NEXT 13, Socket.io, tailwindcss, ...'
							/>

							{/* <Select
								name=''
								id=''
								label='Course Categories'
								variant='bordered'
								value={courseInfo.categories}
								onChange={(e) =>
									setCourseInfo({ ...courseInfo, categories: e.target.value })
								}
							>
								{categories?.map((item: any) => (
									<SelectItem value={item.title} key={item._id}>
										{item.title}
									</SelectItem>
								))}
							</Select> */}

							<select
								name=''
								id=''
								className='border-2 rounded-2xl h-10 w-auto mt-6 bg-transparent '
								value={courseInfo.category}
								onChange={(e: any) =>
									setCourseInfo({ ...courseInfo, categories: e.target.value })
								}
							>
								<option value=''>Chọn danh mục</option>
								{categories?.map((item: any) => (
									<option value={item.title} key={item._id}>
										{item.title}
									</option>
								))}
							</select>
						</div>
						<div className='flex gap-3'>
							<Input
								labelPlacement='outside'
								type='text'
								variant='bordered'
								label='Trình độ khóa học'
								required
								value={courseInfo.level}
								onChange={(e: any) =>
									setCourseInfo({ ...courseInfo, level: e.target.value })
								}
								placeholder='Dễ/Trung bình/Khó'
							/>
							<Input
								labelPlacement='outside'
								type='text'
								variant='bordered'
								label='Link video demo'
								placeholder='https://youtu.be/abc'
								required
								value={courseInfo.demoUrl}
								onChange={(e: any) =>
									setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
								}
							/>
						</div>
						<Input
							id='file'
							type='file'
							required
							variant='bordered'
							label='Course Thumbnail'
							labelPlacement='outside'
							accept='image/*'
							onChange={handleFileChange}
							className='hidden , h-6' // Hide the default file input
						/>

						<label
							htmlFor='file' // Match with the id of the input field
							onDragOver={handleDragOver}
							onDragLeave={handleDragLeave}
							onDrop={handleDrop}
							className={`cursor-pointer ${
								dragging ? "border border-gray-400 p-11" : ""
							}`}
						>
							<div className='flex flex-col items-center justify-center'>
								{courseInfo.thumbnail ? (
									<img
										src={courseInfo.thumbnail}
										alt=''
										className='max-h-full md:max-w-[740px] object-cover w-auto'
									/>
								) : (
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-12 w-12 mb-2 text-gray-400'
										viewBox='0 0 20 20'
										fill='currentColor'
									>
										<path
											fillRule='evenodd'
											d='M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2-2a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H4z'
											clipRule='evenodd'
										/>
										<path
											fillRule='evenodd'
											d='M4 8a1 1 0 00-1 1v6a1 1 0 001 1h12a1 1 0 001-1V9a1 1 0 00-1-1H4zm1 6V9h10v5H5z'
											clipRule='evenodd'
										/>
									</svg>
								)}
								<span className='text-sm text-gray-600'>
									{courseInfo.thumbnail
										? "Thay đổi ảnh bìa"
										: "Kéo thả ảnh bìa vào đây hoặc chọn từ máy tính"}
								</span>
								{selectedFileName && (
									<span className='text-gray-600'>{selectedFileName}</span>
								)}
							</div>
						</label>
					</CardBody>

					<Divider className='my-5' />

					<div className='flex justify-end  me-6'>
						<Button
							color='danger'
							variant='flat'
							className='px-8'
							type='submit'
						>
							Tiếp tục
						</Button>
					</div>
				</Card>
			</form>

			<Snackbar
				open={openSnackbar}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<MuiAlert
					elevation={6}
					variant='filled'
					severity='error'
					onClose={handleCloseSnackbar}
				>
					{errorMessage}
				</MuiAlert>
			</Snackbar>
		</div>
	);
};

export default CourseInformation;
