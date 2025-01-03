"use client";

import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import {
	HomeOutlinedIcon,
	ArrowForwardIosIcon,
	ArrowBackIosIcon,
	PeopleOutlinedIcon,
	ReceiptOutlinedIcon,
	BarChartOutlinedIcon,
	MapOutlinedIcon,
	GroupsIcon,
	OndemandVideoIcon,
	VideoCallIcon,
	WebIcon,
	QuizIcon,
	WysiwygIcon,
	ManageHistoryIcon,
	ExitToAppIcon,
} from "./Icon";
import { Avatar } from "@nextui-org/avatar";

interface ItemProps {
	title: string;
	to: string;
	icon: JSX.Element;
	selected: string;
	setSelected: any;
}

const Item = ({ title, to, icon, selected, setSelected }: ItemProps) => {
	const handleClick = () => {
		setSelected(title);
	};

	return (
		<MenuItem active={selected === title} onClick={handleClick} icon={icon}>
			<Typography className='!text-[16px] !font-Poppins'>{title}</Typography>

			<Link href={to} />
		</MenuItem>
	);
};

const Sidebar = () => {
	const { user } = useSelector((state: any) => state.auth);

	const [logout, setLogout] = useState(false);

	const [isCollapsed, setIsCollapsed] = useState(false);

	const [selected, setSelected] = useState("Dashboard");

	const [mounted, setMounted] = useState(false);

	const { theme, setTheme } = useTheme();

	useEffect(() => setMounted(true), []);

	if (!mounted) {
		return null;
	}

	const logoutHandler = () => {
		setLogout(true);
	};

	return (
		<Box
			sx={{
				"& .pro-sidebar-inner": {
					background: `${
						theme === "dark" ? "#090909 !important" : "#fff !important"
					}`,
				},

				"& .pro-icon-wrapper": {
					backgroundColor: "transparent !important",
				},

				"& .pro-inner-item:hover": {
					color: "#A555EC !important",
				},

				"& .pro-menu-item.active": {
					color: "#A555EC !important",
				},

				"& .pro-inner-item": {
					padding: "5px 35px 5px 20px !important",
					opacity: 1,
				},

				"& .pro-menu-item": {
					color: `${theme !== "dark" && "#000"}`,
				},
			}}
			className='!bg-white dark:bg-[#111C43]'
		>
			<ProSidebar
				collapsed={isCollapsed}
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					height: "100vh",
					zIndex: 99999999999999,
					width: isCollapsed ? "0%" : "17%",
				}}
			>
				<Menu iconShape='square'>
					<MenuItem
						onClick={() => setIsCollapsed(!isCollapsed)}
						icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
						style={{
							margin: "10px 0 20px 0",
						}}
					>
						{!isCollapsed && (
							<Box
								display='flex'
								justifyContent='space-between'
								alignItems='center'
								ml='15px'
							>
								<Link href='/' className='block'>
									<h3 className='text-[25px]  dark:text-white text-black'>
										Learning Corner
									</h3>
								</Link>
								<IconButton
									onClick={() => setIsCollapsed(!isCollapsed)}
									className='inline-block'
								>
									<ArrowBackIosIcon className='text-black dark:text-[#ffffffc1]' />
								</IconButton>
							</Box>
						)}
					</MenuItem>

					{!isCollapsed && (
						<Box mb='25px'>
							<Box display='flex' justifyContent='center' alignItems='center'>
								<Avatar
									src={
										user.avatar
											? user.avatar.url
											: "https://api-private.atlassian.com/users/aa7543e682dff486562017fe2fedc6c0/avatar"
									}
									alt=''
									size='lg'
									className='lg:w-24 lg:h-24 md:w-20 md:h-20'
								/>
							</Box>
							<Box textAlign='center'>
								<Typography
									variant='h4'
									className='!text-[20px] text-black dark:text-[#ffffffc1]'
									sx={{ m: "10px 0 0 0" }}
								>
									{user?.name}
								</Typography>
								<Typography
									variant='h6'
									sx={{ m: "10px 0 0 0" }}
									className='!text-[20px] text-black dark:text-[#ffffffc1] capitalize'
								>
									* {user?.role}
								</Typography>
							</Box>
						</Box>
					)}

					<Box paddingLeft={isCollapsed ? undefined : "10%"}>
						<Item
							title='Bảng thống kê'
							to='/admin'
							icon={<HomeOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>

						<Typography
							variant='h5'
							sx={{ m: "15px 0 5px 25px" }}
							className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
						>
							{!isCollapsed && "Data"}
						</Typography>
						<Item
							title='Danh sách người dùng'
							to='/admin/users'
							icon={<GroupsIcon />}
							selected={selected}
							setSelected={setSelected}
						/>

						<Item
							title='Hóa đơn'
							to='/admin/invoices'
							icon={<ReceiptOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>

						<Typography
							variant='h5'
							className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
							sx={{ m: "15px 0 5px 20px" }}
						>
							{!isCollapsed && "Content"}
						</Typography>
						<Item
							title='Tạo khóa học'
							to='/admin/create-course'
							icon={<VideoCallIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title='Khóa học đang bán'
							to='/admin/all-courses'
							icon={<OndemandVideoIcon />}
							selected={selected}
							setSelected={setSelected}
						/>

						<Typography
							variant='h5'
							className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
							sx={{ m: "15px 0 5px 20px" }}
						>
							{!isCollapsed && "Customization"}
						</Typography>
						<Item
							title='Banner trang chủ'
							to='/admin/hero'
							icon={<WebIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title='FAQ'
							to='/admin/faq'
							icon={<QuizIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title='Danh mục khóa học'
							to='/admin/categories'
							icon={<WysiwygIcon />}
							selected={selected}
							setSelected={setSelected}
						/>

						<Typography
							variant='h5'
							className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
							sx={{ m: "15px 0 5px 20px" }}
						>
							{!isCollapsed && "Controllers"}
						</Typography>
						<Item
							title='Quản lý giáo viên'
							to='/admin/team'
							icon={<PeopleOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>

						<Typography
							variant='h6'
							className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
							sx={{ m: "15px 0 5px 20px" }}
						>
							{!isCollapsed && "Analytics"}
						</Typography>
						<Item
							title='Thống kê khóa học'
							to='/admin/courses-analytics'
							icon={<BarChartOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title='Thống kê đơn hàng'
							to='/admin/orders-analytics'
							icon={<MapOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>

						<Item
							title='Thống kê người dùng'
							to='/admin/users-analytics'
							icon={<ManageHistoryIcon />}
							selected={selected}
							setSelected={setSelected}
						/>

						<Typography
							variant='h6'
							className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
							sx={{ m: "15px 0 5px 20px" }}
						>
							{!isCollapsed && "Extras"}
						</Typography>
						<div onClick={logoutHandler}>
							<Item
								title='Đăng xuất'
								to='/'
								icon={<ExitToAppIcon />}
								selected={selected}
								setSelected={setSelected}
							/>
						</div>
					</Box>
				</Menu>
			</ProSidebar>
		</Box>
	);
};

export default Sidebar;
