import React, { useEffect, useState } from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Checkbox,
	Input,
	Button,
	Link,
} from "@nextui-org/react";
import FaceIcon from "@mui/icons-material/Face";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import { MailIcon } from "@/components/icons";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import Authentication from "./authentication";
import VerificationModal from "./verification";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import Snackbar from "@mui/material/Snackbar";
import toast from "react-hot-toast";

// Define validation schema using Yup
const SignupSchema = Yup.object().shape({
	name: Yup.string().required("Name is required"),
	email: Yup.string().email("Invalid email").required("Email is required"),
	password: Yup.string().required("Password is required"),
});

interface Props {
	onClose: () => void;
	toggleSignInModal: () => void; // Add this line to include toggleSignInModal in props
}

const SignupModal: React.FC<Props> = ({
	onClose,
	toggleSignInModal,
}: Props) => {
	const [visible, setVisible] = useState(false);
	const [showVerificationModal, setShowVerificationModal] = useState(false);
	const [register, { data, error, isSuccess }] = useRegisterMutation();

	useEffect(() => {
		if (isSuccess) {
			const message = data?.message || "Resistration successful";

			setShowVerificationModal(true);

			console.log(message);
			// setSnackbarMessage(message);
			toast.success(message);
		}
		if (error) {
			if ("data" in error) {
				const errorData = error as any;
				console.log(errorData.data.message);
				// setSnackbarError(errorData.data.message);
				toast.error(errorData.data.message);
			}
		}
	}, [isSuccess, error]);

	const handleSignupSubmit = async (values: any, { setSubmitting }: any) => {
		console.log("Form submitted:", values);
		setSubmitting(false);
		// setShowVerificationModal(true);
		const data = {
			name: values.name,
			email: values.email,
			password: values.password,
		};
		try {
			await register(data);
			console.log("Registration successful");
		} catch (error) {
			console.error("Registration failed:", error);
		}
	};

	const toggleVisibility = () => {
		setVisible(!visible);
	};
	const closeModals = () => {
		setShowVerificationModal(false);
		onClose();
	};

	return (
		<>
			<Modal isOpen={true} onClose={closeModals} placement='top-center'>
				<ModalContent>
					<ModalHeader className='flex flex-col gap-1'>Đăng kí</ModalHeader>
					<ModalBody>
						<Formik
							initialValues={{ name: "", email: "", password: "" }}
							validationSchema={SignupSchema} // Pass validation schema to Formik
							onSubmit={handleSignupSubmit}
						>
							{({ isSubmitting }) => (
								<Form>
									<Field name='name'>
										{({ field }: any) => (
											<div className='mt-4'>
												<Input
													{...field}
													autoFocus={true}
													endContent={<FaceIcon />}
													label='Name'
													placeholder='Nhập họ và tên'
													variant='bordered'
												/>
												<ErrorMessage name='name' component='div' className='text-red-500 text-sm mt-1' />
											</div>
										)}
									</Field>
									<Field name='email'>
										{({ field }: any) => (
											<div className='mt-4'>
												<Input
													{...field}
													autoFocus
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
									</div>
									<Button
										color='primary'
										variant='shadow'
										type='submit'
										disabled={isSubmitting}
									>
										Đăng kí
									</Button>
								</Form>
							)}
						</Formik>
						<div className='flex py-2 px-1 justify-center gap-4'>
							<h1> hoặc đăng nhập bằng</h1>
						</div>
						<div className='flex py-2 px-1 justify-center gap-4'>
							{/* Add icons for Google and GitHub */}
							<GoogleIcon />
							<GitHubIcon />
						</div>
						<div className='flex py-2 px-1 justify-center gap-4'>
							<h1>Đã có tài khoản?</h1>
							<Link className='cursor-pointer' onClick={toggleSignInModal}>
								Đăng nhập
							</Link>
						</div>
					</ModalBody>
					<ModalFooter>
					</ModalFooter>
				</ModalContent>
			</Modal>
			{showVerificationModal && (
				<VerificationModal
					onClose={closeModals}
					toggleSignInModal={toggleSignInModal}
				/>
			)}
		</>
	);
};

export default SignupModal;
