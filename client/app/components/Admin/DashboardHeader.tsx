/* eslint-disable react/jsx-key */
"use client";
import { Button } from "@nextui-org/button";
import {
	Dropdown,
	DropdownTrigger,
	Badge,
	DropdownMenu,
	DropdownItem,
	Divider,
} from "@nextui-org/react";
import React, { FC, useCallback, useEffect, useState } from "react";
import socketIO from "socket.io-client";

import NotificationIcon from "@/components/icons";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { Typography } from "@mui/material";
import {
	useGetAllNotificationsQuery,
	useUpdateNotificationStatusMutation,
} from "@/redux/features/notifications/notificationsApi";
import { format } from "timeago.js";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
	open?: boolean;
	setOpen?: any;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
	const { data, refetch } = useGetAllNotificationsQuery(undefined, {
		refetchOnMountOrArgChange: true,
	});

	const [updateNotificationStatus, { isSuccess }] =
		useUpdateNotificationStatusMutation();

	const [notifications, setNotifications] = useState<any>([]);

	const [audio] = useState<any>(
		typeof window !== "undefined" &&
			new Audio(
				"https://res.cloudinary.com/dccwkb00z/video/upload/f_auto:video,q_auto/blol1sioybbqf63elb0t"
			)
	);

	const playNotificationSound = useCallback(() => {
		audio.play();
	}, [audio]);

	useEffect(() => {
		if (data) {
			setNotifications(
				data.notifications.filter((item: any) => item.status === "unread")
			);
		}

		if (isSuccess) {
			refetch();
		}

		audio.load();
	}, [data, isSuccess, audio, refetch]);

	useEffect(() => {
		socketId.on("newNotification", (data) => {
			refetch();
			playNotificationSound();
		});
	}, [playNotificationSound, refetch]);

	const handleNotificationStatusChange = async (id: string) => {
		await updateNotificationStatus(id);
	};

	return (
		<div className='flex justify-end gap-4'>
			<Dropdown placement='bottom-end'>
				<DropdownTrigger>
					<Button
						radius='full'
						variant='light'
						className="flex items-center gap-2 h-10" // Added h-10 for reduced height
					>
					<span>Thông báo</span>
					<div className="relative">
						<Badge
							content={notifications && notifications.length}
							shape='circle'
							color='danger'
						>
						<NotificationIcon size={24} />
						</Badge>
					</div>
					</Button>
				</DropdownTrigger>

				<DropdownMenu
					aria-label='Profile Actions'
					variant='flat'
					className='md:w-80 h-96 overflow-y-auto w-48' // Set a fixed height with overflow-y auto
				>
					<DropdownItem className='h-10 gap-2' isReadOnly>
						<p className='font-semibold p-3 flex justify-center'>
							Danh sách thông báo
						</p>
						<Divider />
					</DropdownItem>
					{/* Iterate over notifications and render each as a DropdownItem */}
					{notifications.map((item: any) => (
						<DropdownItem key={item._id} isReadOnly>
							<div className='flex flex-col md:items-center md:justify-between gap-1 md:gap-1'>
								<div className='md:flex-grow flex-row whitespace-normal justify-between'>
									<Typography>{item.title}</Typography>
								</div>
								<div className='md:flex-grow md:text-center whitespace-normal'>
									<div className='text-wrap'>{item.message}</div>
								</div>
								<div className='flex flex-row gap-9'>
									<Typography>{format(item.createdAt)}</Typography>
									<DoneAllIcon
										onClick={() => handleNotificationStatusChange(item._id)}
									/>
								</div>
								<Divider className='my-2' />
							</div>
						</DropdownItem>
					))}
				</DropdownMenu>
			</Dropdown>
		</div>
	);
};

export default DashboardHeader;
