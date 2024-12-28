import React, { useEffect, useState } from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Input,
	Button,
	Link,
	Checkbox,
} from "@nextui-org/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { MailIcon } from "@/components/icons";
import VerificationModal from "./verification";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { Snackbar } from "@mui/material";

import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
interface Props {
	onClose: () => void;
	toggleSignUpModal: () => void;
}

const validationSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email address").required("Email required"),
	password: Yup.string().required("Password is required"),
});

const SignInModal: React.FC<Props> = ({ onClose, toggleSignUpModal }) => {
	const [visible, setVisible] = useState(false);
	const [login, { isSuccess, error }] = useLoginMutation();

	const handleSubmit = async (values: any, { setSubmitting }: any) => {
		console.log("Form submitted:", values);
		setSubmitting(false);
		await login({ email: values.email, password: values.password });
	};

	useEffect(() => {
		if (isSuccess) {
		  toast.success("Login successful!");
		  onClose();
		}
		if (error) {
		  if ("data" in error) {
			const errorData = error as any;
			toast.error(errorData.data.message);
		  }
		}
	}, [isSuccess, error]);
	

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	const closeModals = () => {
		onClose();
	};

	return (
		<>
			<Modal isOpen={true} onClose={closeModals} placement='top-center'>
				<ModalContent>
					<ModalHeader className='flex flex-col gap-1'>Đăng nhập</ModalHeader>
					<ModalBody>
						<Formik
							initialValues={{ email: "", password: "" }}
							validationSchema={validationSchema}
							onSubmit={handleSubmit}
						>
							{({ isSubmitting }) => (
								<Form>
									<Field name='email'>
										{({ field }: any) => (
											<div className='mt-4'>
												<Input
													{...field}
													endContent={
														<MailIcon className='text-2xl  pointer-events-none flex-shrink-0' />
													}
													label='Email'
													placeholder='Nhập email'
													variant='bordered'
												/>
												 <ErrorMessage name='email' component='div' className='text-red-500 text-sm mt-1' />
											</div>
										)}
									</Field>
									<Field name='password'>
										{({ field }: any) => (
											<div className='mt-4'>
												<Input
													{...field}
													endContent={
														<div onClick={toggleVisibility} className="cursor-pointer">
															{visible ? (
																<VisibilityRoundedIcon />
															) : (
																<VisibilityOffRoundedIcon />
															)}
														</div>
													}
													label='Password'
													placeholder='Nhập mật khẩu'
													type={visible ? "text" : "password"}
													variant='bordered'
													classNames={{
														input: "[&::-ms-reveal]:hidden [&::-ms-clear]:hidden"
													}}
												/>
												<ErrorMessage name='password' component='div' className='text-red-500 text-sm mt-1' />
											</div>
										)}
									</Field>
									<div className='flex py-2 px-1 justify-between'>
										<Checkbox
											classNames={{ label: "text-small" }}
											onClick={toggleVisibility}
										>
											Hiện mật khẩu
										</Checkbox>
										<Link color='primary' href='#' size='sm'>
											Quên mật khẩu?
										</Link>
									</div>
									<Button
										className='mt-6'
										color='primary'
										variant='shadow'
										type='submit'
										disabled={isSubmitting}
									>
										Đăng nhập
									</Button>
								</Form>
							)}
						</Formik>
						<div className='flex py-2 px-1 justify-center gap-4'>
							<h1> hoặc đăng nhập bằng</h1>
						</div>
						<div className='flex py-2 px-1 justify-center gap-4'>
							<div
								className='cursor-pointer'
								onClick={async () => {
									await signIn("google");
								}}
							>
								<GoogleIcon />
							</div>
							<div
								className='cursor-pointer'
								onClick={async () => await signIn("github")}
							>
								<GitHubIcon />
							</div>
						</div>
						<div className='flex py-2 px-1 justify-center gap-4'>
							<h1>Không có tài khoản?</h1>
							<Link className='cursor-pointer' onClick={toggleSignUpModal}>
								Đăng kí
							</Link>
						</div>
					</ModalBody>
					<ModalFooter>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default SignInModal;
