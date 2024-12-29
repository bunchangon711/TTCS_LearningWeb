import Link from "next/link";
import { useEffect, useState } from "react";
import { format } from "timeago.js";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

import Image from "next/image";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import CourseContentList from "./CourseContentList";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { subtitle, title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "@/app/Payment/CheckOutForm";

type CourseDetailsProps = {
	data: any;
	stripePromise: any;
	clientSecret: string;
	setRoute: any;
	setOpen: any;
};

const CourseDetails = ({
	data,
	stripePromise,
	clientSecret,
	setRoute,
	setOpen: openAuthModal,
}: CourseDetailsProps) => {
	const { data: userData, refetch } = useLoadUserQuery(undefined, {});

	const [user, setUser] = useState<any>();

	const [open, setOpen] = useState(false);

	useEffect(() => {
		setUser(userData?.user);
	}, [userData]);

	const dicountPercentenge =
		((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100;

	const discountPercentengePrice = dicountPercentenge.toFixed(0);

	const isPurchased = user?.courses?.find((item: any) => item._id === data._id);

	const isAdmin = user?.role === "admin";

	const handleOrder = (e: any) => {
		if (user) {
			setOpen(true);
		} else {
			setRoute("Login");
			openAuthModal(true);
		}
	};

	return (
		<div>
			<div className='w-[100%] md:w-[100%] m-auto py-5'>
				<div className='w-full flex flex-col-reverse md:flex-row'>
					<div className='w-full 800px:w-[65%] 800px:pr-5'>
						<h1 className={title({ color: "violet" })}>{data.name}</h1>
						<div className='flex items-center justify-between pt-3 pr-6'>
							<div className='flex items-center'>
								<Ratings rating={data.ratings} />
								<h5 className={subtitle()}> {data.reviews?.length} Đánh giá</h5>
							</div>
							<div className='flex items-center'>
								<h5 className={subtitle()}>{data.purchased} Học viên</h5>
							</div>
						</div>

						<br />
						<h1 className='lg:text-3xl  text-2xl font-semibold'>
							Bạn sẽ học được gì từ khóa học này?
						</h1>
						<div>
							{data.benefits?.map((item: any, index: number) => (
								<div
									className='w-full flex md:items-center py-4 pr-4'
									key={index}
								>
									<div className='w-[15px] mr-1'>
										<DoneAllRoundedIcon />
									</div>
									<p className='lg:text-xl  text-xl ml-2'>{item.title}</p>
								</div>
							))}
							<br />
							<br />
						</div>
						<h1 className='lg:text-3xl  text-2xl font-semibold '>
							Các yêu cầu tiên quyết
						</h1>
						{data.prerequisites?.map((item: any, index: number) => (
							<div
								className='w-full flex md:items-center py-4 pr-4'
								key={index}
							>
								<div className='w-[15px] mr-1'>
									<DoneAllRoundedIcon className='text-black dark:text-white' />
								</div>
								<p className='lg:text-xl  text-xl ml-2'>{item.title}</p>
							</div>
						))}
						<br />
						<br />
						<div>
							<h1 className='lg:text-3xl  text-2xl font-semibold'>
								Chương trình học
							</h1>
							<CourseContentList data={data?.courseData} isDemo={true} />
						</div>
						<br />
						<br />
						<div className='w-full'>
							<h1 className='lg:text-3xl  text-2xl  font-semibold'>
								Chi tiết khóa học
							</h1>
							<p className='lg:text-xl  text-xl pr-4 mt-12'>
								{data.description}
							</p>
						</div>
						<br />
						<br />
						<div className='w-full'>
							<div className='md:flex items-center gap-2'>
								<Ratings rating={data?.ratings} />
								<div className='mb-2 800px:mb-[unset]' />
								<h5 className='text-[25px] font-Poppins text-black dark:text-white'>
									{Number.isInteger(data?.ratings)
										? data?.ratings.toFixed(1)
										: data?.ratings.toFixed(2)}{" "}
									Sao • {data?.reviews?.length} Đánh giá
								</h5>
							</div>
							<br />
							{(data?.reviews && [...data.reviews].reverse()).map(
								(item: any, index: number) => (
									<div className='w-[95%] pb-4' key={index}>
										<div className='flex'>
											<div className='w-[50px] h-[50px]'>
											<Image
												src={item.user.avatar ? item.user.avatar.url : "https://res.cloudinary.com/kouroshrstn/image/upload/v1707293133/Avatars/avatar_dwjgxo.png"}
												width={50}
												height={50}
												alt=''
												className='w-[50px] h-[50px] rounded-full object-cover'
											/>
											</div>
											<div className='pl-3 w-[85%]'>
											<h5 className='text-[20px]'>{item.user.name}</h5>
											<Ratings rating={item.rating} />
											<p className='break-words'>{item.comment}</p>
											<small>{format(item.createdAt)} •</small>
											</div>
										</div>
										{item.commentReplies.map((i: any, index: number) => (
											<div className='w-[85%] flex ml-14 my-5' key={index}>
											<div className='w-[50px] h-[50px]'>
												<Image
												src={i.user.avatar ? i.user.avatar.url : "https://res.cloudinary.com/kouroshrstn/image/upload/v1707293133/Avatars/avatar_dwjgxo.png"}
												width={50}
												height={50}
												alt=''
												className='w-[50px] h-[50px] rounded-full object-cover'
												/>
											</div>
											<div className='pl-3 w-[80%]'>
												<div className='flex items-center'>
												<h5 className='text-[20px]'>{i.user.name}</h5>
												<VerifiedRoundedIcon className='text-[#0095F6] ml-2 text-[20px]' />
												</div>
												<p className='break-words'>{i.comment}</p>
												<small>{format(i.createdAt)} •</small>
											</div>
											</div>
										))}
									</div>
								)
							)}
						</div>
					</div>
					<div className='w-full md:w-[55%] relative'>
						<div className='sticky top-[100px] left-0 z-50 w-full'>
							<CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
							<div className='flex items-center'>
								<h1 className='pt-5 lg:text-3xl  text-2xl font-semibold'>
									{data.price === 0 ? "Free" : `${data.price} VND`}
								</h1>
								<h5 className='pl-3  mt-2 line-through opacity-80 lg:text-2xl  text-xl font-normal'>
									{data.estimatedPrice} VND
								</h5>

								<h4 className='pl-5 pt-4 lg:text-2xl  text-xl font-semibold'>
									Giảm {discountPercentengePrice}%
								</h4>
							</div>
							<div className='flex items-center'>
								{isPurchased || isAdmin ? (
								<Link href={`/course-access/${data._id}`}>
									<Button
									variant='flat'
									color='danger'
									className='my-3 cursor-pointer'
									>
									Vào khóa học
									</Button>
								</Link>
								) : (
								<Button
									variant='flat'
									color='danger'
									className='my-3 cursor-pointer'
									onClick={handleOrder}
								>
									Mua khóa học {data.price} VND
								</Button>
								)}
							</div>
							<br />
							<p className='pb-1 text-black dark:text-white'>
								• Đầy đủ tài liệu và bài giảng
							</p>
							<p className='pb-1 text-black dark:text-white'>
								• Quyền ruy cập trọn đời
							</p>
							<p className='pb-1 text-black dark:text-white'>
								• Giấy chứng nhận hoàn thành
							</p>
							<p className='pb-3 800px:pb-1 text-black dark:text-white'>
								• Hỗ trợ 24/7
							</p>
						</div>
					</div>
				</div>
			</div>
			<>
				{open && (
					<div className='w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center'>
						<div className='w-[500px] min-h-[500px] bg-white rounded-xl shadow p-4'>
							<div className='w-full flex justify-end'>
								<CloseRoundedIcon
									className='text-black cursor-pointer'
									onClick={() => setOpen(false)}
								/>
							</div>
							<div className='w-full'>
								{stripePromise && clientSecret && (
									<Elements stripe={stripePromise} options={{ clientSecret }}>
										<CheckOutForm
											setOpen={setOpen}
											data={data}
											user={user}
											refetch={refetch}
										/>
									</Elements>
								)}
							</div>
						</div>
					</div>
				)}
			</>
		</div>
	);
};

export default CourseDetails;
