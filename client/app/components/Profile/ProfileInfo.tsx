"use client";
import {
	Avatar,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Checkbox,
	Divider,
	Input,
	Link,
	Tab,
	Tabs,
	useDisclosure,
	Image,
} from "@nextui-org/react";
import React, { FC, useEffect, useState } from "react";
import {
	EyeFilledIcon,
	EyeSlashFilledIcon,
	VideoIcon,
} from "@/components/icons";
import { GalleryIcon } from "@/components/icons";
import { MusicIcon } from "@/components/icons";
import FaceRoundedIcon from "@mui/icons-material/FaceRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import CameraEnhanceRoundedIcon from "@mui/icons-material/CameraEnhanceRounded";

import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signIn } from "next-auth/react";
import { Typography } from "@mui/material";
import {
	useEditProfileMutation,
	useUpdateAvatarMutation,
} from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { Snackbar, Alert } from "@mui/material";
import toast from "react-hot-toast";
type Props = {
	user: any;
	active: number;
	setActive: (active: number) => void;
	avatar: string | null;
	logOutHandler: any;
};

const ProfileInfo: FC<Props> = ({
	user,
	active,
	setActive,
	avatar,
	logOutHandler,
}) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [isVisible, setIsVisible] = React.useState(false);
	const [name, setName] = useState(user && user.name);
	const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
	const [editProfile, { isSuccess: success, error: updateError }] =
		useEditProfileMutation();

	const [loadUser, setLoadUser] = useState(false);
	const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });
	const [successMessage, setSuccessMessage] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");

	const imageHandler = async (e: any) => {
		const fileReader = new FileReader();

		fileReader.onload = () => {
			if (fileReader.readyState === 2) {
				const avatar = fileReader.result;
				updateAvatar(avatar);
			}
		};
		fileReader.readAsDataURL(e.target.files[0]);
	};

	useEffect(() => {
		if (isSuccess || success) {
			setLoadUser(true);
			// setSuccessMessage("Profile updated successfully");
			toast.success("Profile updated successfully");
		}
		if (error || updateError) {
			// setErrorMessage("Error updating profile");
			toast.error("Error updating profile");

			console.log(error);
		}
		if (success) {
			console.log("Profile updated successfully");
			// setSuccessMessage("Profile updated successfully");
			toast.success("Profile updated successfully");
		}
	}, [isSuccess, error, success, updateError]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (name !== "") {
			await editProfile({
				name: name,
			});
		}
	};
	return (
		<div className='flex justify-center'>
			<Card className=' md:min-w-[1000px]  '>
				<CardHeader className='flex gap-3 justify-center'>
					<div className='relative'>
						<Avatar
							alt='nextui logo'
							// height={90}
							radius='full'
							size='lg'
							src={
								user.avatar || avatar
									? user.avatar.url || avatar
									: "https://api-private.atlassian.com/users/aa7543e682dff486562017fe2fedc6c0/avatar"
							}
							// width={90}
							className='md:h-24 md:w-24  rounded-full overflow-hidden cursor-pointer  '
						/>
						<input
							id='avatarInput'
							type='file'
							name=''
							accept='image/*'
							className='absolute inset-0 opacity-0 cursor-pointer z-10'
							style={{
								visibility: "hidden",
								width: "1px",
								height: "1px",
							}}
							onChange={imageHandler}
						/>
						<label htmlFor='avatarInput'>
							<CameraEnhanceRoundedIcon className='absolute bottom-1 right-0  rounded-full  w-[30px] h-[30px] flex items-center justify-center cursor-pointer z-20' />
						</label>
					</div>
				</CardHeader>

				<Divider />
				<CardBody className=' flex items-center '>
					<form onSubmit={handleSubmit}>
						<div className='flex flex-col gap-5'>
							<Input
								type='string'
								variant='flat'
								required
								label='Tên tài khoản'
								className=' md:w-96'
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>

							<Input
								type='email'
								variant='flat'
								required
								readOnly
								label='Email'
								className=' md:w-96 '
								value={user?.email}
							/>

							<Button
								color='primary'
								variant='flat'
								type='submit'
								className=' md:w-96 '
							>
								Cập nhật
							</Button>
						</div>
					</form>
				</CardBody>
				<Divider />
			</Card>
		</div>
	);
};

export default ProfileInfo;
