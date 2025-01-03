import {
	useGetOrdersAnalyticsQuery,
	useGetUsersAnalyticsQuery,
} from "@/redux/features/analytics/analyticsApi";
import { Box, CircularProgress } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import UserAnalytics from "../Analytics/UsersAnalytics";
import OrdersAnalytics from "../Analytics/OrdersAnalytics";
import AllInvoices from "../Order/AllInvoices";
import WidgetsRoundedIcon from "@mui/icons-material/WidgetsRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";

type Props = {
	open: boolean;
	value?: number;
};

const CircularProgressWithLabel = ({ open, value }: Props) => {
	return (
		<Box sx={{ position: "relative", display: "inline-flex" }}>
			<CircularProgress
				variant='determinate'
				value={value}
				size={45}
				color={value && value > 99 ? "info" : "error"}
				thickness={4}
				style={{ zIndex: open ? -1 : 1 }}
			/>

			<Box
				sx={{
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					position: "absolute",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			/>
		</Box>
	);
};

const DashboardWidgets: FC<Props> = ({ open }) => {
	const [ordersComparePercentage, setOrdersComparePercentage] = useState<any>();

	const [userComparePercentage, setuserComparePercentage] = useState<any>();

	const { data, isLoading } = useGetUsersAnalyticsQuery({});

	const { data: ordersData, isLoading: ordersLoading } =
		useGetOrdersAnalyticsQuery({});

	useEffect(() => {
		if (isLoading && ordersLoading) {
			return;
		}

		if (!(data && ordersData)) {
			return;
		}

		const usersLastTwoMonths = data.users.last12Months.slice(-2);

		const ordersLastTwoMonths = ordersData.orders.last12Months.slice(-2);

		if (
			!(usersLastTwoMonths.length === 2 && ordersLastTwoMonths.length === 2)
		) {
			return;
		}
		const usersCurrentMonth = usersLastTwoMonths[1].count;

		const usersPreviousMonth = usersLastTwoMonths[0].count;

		const ordersCurrentMonth = ordersLastTwoMonths[1].count;

		const ordersPreviousMonth = ordersLastTwoMonths[0].count;

		const usersPercentChange =
			usersPreviousMonth === 0
				? 100
				: ((usersCurrentMonth - usersPreviousMonth) / usersPreviousMonth) * 100;

		const ordersPercentChange =
			ordersPreviousMonth === 0
				? 100
				: ((ordersCurrentMonth - ordersPreviousMonth) / ordersPreviousMonth) *
				  100;

		setuserComparePercentage({
			currentMonth: usersCurrentMonth,
			previousMonth: usersPreviousMonth,
			percentChange: usersPercentChange,
		});

		setOrdersComparePercentage({
			currentMonth: ordersCurrentMonth,
			previousMonth: ordersPreviousMonth,
			percentChange: ordersPercentChange,
		});
	}, [isLoading, ordersLoading, data, ordersData]);
	return (
		<div className='mt-0 min-h-screen'>
			<div className='grid grid-cols-[75%,25%]'>
				<div className='p-8 '>
					<UserAnalytics isDashboard={true} />
				</div>

				<div className='pt-[60px] pr-8'>
					<div className='w-full dark:bg-[#111C43] rounded-sm shadow'>
						<div className='flex items-center p-5 justify-between'>
							<div className=''>
								<WidgetsRoundedIcon className='dark:text-[#45CBA0] text-[#000] text-[30px]' />
								<h5 className='pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]'>
									{ordersComparePercentage?.currentMonth}
								</h5>
								<h5 className='py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]'>
									Lượt mua
								</h5>
							</div>
							<div>
								<CircularProgressWithLabel
									value={ordersComparePercentage?.percentChange > 0 ? 100 : 0}
									open={open}
								/>
								<h5 className='text-center pt-4'>
									{ordersComparePercentage?.percentChange > 0
										? `+${ordersComparePercentage?.percentChange.toFixed(2)}`
										: `-${ordersComparePercentage?.percentChange.toFixed(2)}`}
									%
								</h5>
							</div>
						</div>
					</div>

					<div className='w-full dark:bg-[#111C43] rounded-sm shadow my-8'>
						<div className='flex items-center p-5 justify-between'>
							<div className=''>
								<PeopleRoundedIcon className='dark:text-[#45CBA0] text-[#000] text-[30px]' />
								<h5 className='pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]'>
									{userComparePercentage?.currentMonth}
								</h5>
								<h5 className='py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]'>
									Người dùng mới
								</h5>
							</div>
							<div>
								<CircularProgressWithLabel
									value={userComparePercentage?.percentChange > 0 ? 100 : 0}
									open={open}
								/>
								<h5 className='text-center pt-4'>
									{userComparePercentage?.percentChange > 0
										? `+${userComparePercentage?.percentChange.toFixed(2)}`
										: `-${userComparePercentage?.percentChange.toFixed(2)}`}
									%
								</h5>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='grid grid-cols-[65%,35%] mt-[-30px]'>
			<div className='dark:bg-[#111c43] w-[94%] mt-[30px] h-[50vh] shadow-sm m-auto'>
				<OrdersAnalytics isDashboard={true} />
			</div>
				<div className='p-5'>
					<h5 className='dark:text-[#fff] text-black text-[20px] font-[400] font-Poppins pb-3'>
						Đơn mua gần nhất
					</h5>
					<AllInvoices isDashboard={true} />
				</div>
			</div>
		</div>
	);
};

export default DashboardWidgets;
