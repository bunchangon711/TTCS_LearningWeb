"use client";
import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/avatar";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

import { ThemeSwitch } from "@/components/theme-switch";

import {
	GithubIcon,
	SearchIcon,
} from "@/components/icons";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

import { Logo } from "@/components/icons";
import { FC, useEffect, useState } from "react";
import SignupModal from "./Auth/signin";
import Authentication from "../components/Auth/authentication";
// import Authentication from "./Auth/authentication";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import {
	useLogOutQuery,
	useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { avatar } from "@nextui-org/theme";
import Loader from "./Loader/Loader";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

type Props = {};

const Navbar: FC<Props> = () => {
	const pathname = usePathname();
	const [showAuthentication, setShowAuthentication] = useState(false);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const { theme, setTheme } = useTheme(); // Use useTheme hook to access theme state and setter

	const {
		data: userData,
		isLoading,
		refetch,
	} = useLoadUserQuery(undefined, {});

	const { user } = useSelector((state: any) => state.auth);
	const { data } = useSession();
	const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();

	const [logout, setLogout] = useState(false);
	const {} = useLogOutQuery(undefined, {
		skip: !logout ? true : false,
	});

	const handleOpenSnackbar = (message: any) => {
		setSnackbarMessage(message);
		setOpenSnackbar(true);
	};
	const toggleTheme = () => {
		// Toggle between light and dark themes
		setTheme(theme === "light" ? "dark" : "light");
	};
	useEffect(() => {
		if (isLoading) {
			return;
		}

		if (!userData && data) {
			socialAuth({
				email: data?.user?.email,
				name: data?.user?.name,
				avatar: data.user?.image,
			});
			refetch();
		}

		if (data === null && isSuccess) {
			handleOpenSnackbar("Welcome! You have successfully logged in.");
		}

		if (error && "data" in error) {
			const errorData = error as any;
			// toast.error(errorData.data.message);
			handleOpenSnackbar(errorData.data.message);
		}

		if (data === null && !isLoading && !userData) {
			setLogout(true);
		}
	}, [error, data, userData, isLoading, socialAuth, refetch, isSuccess]);

	const [search, setSearch] = useState("");

	const router = useRouter();

	const handleSearch = () => {
		if (search === "") {
			return;
		}
		router.push(`/courses?title=${search}`);
	};

	const searchInput = (
		<>
			<Input
				type='search'
				value={search}
				aria-label='Search'
				placeholder='Tìm kiếm khóa học'
				onChange={(e) => setSearch(e.target.value)}
				onClick={handleSearch}
				classNames={{
					inputWrapper: "bg-default-100 min-w-[400px]",
					input: "text-sm",
				}}
				endContent={
					<Kbd
						className='hidden lg:inline-block cursor-pointer'
						keys={["enter"]}
						onClick={handleSearch}
					>
						Tìm kiếm
					</Kbd>
				}
				labelPlacement='outside'
				startContent={
					<SearchIcon className='text-base text-default-400 pointer-events-none flex-shrink-0' />
				}
			/>
		</>
	);
	const handleAvatarClick = () => {
		setShowAuthentication(true);
	};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<NextUINavbar
						maxWidth='xl'
						position='sticky'
						classNames={{
							item: [
								"flex",
								"relative",
								"h-full",
								"items-center",
								"data-[active=true]:after:content-['']",
								"data-[active=true]:after:absolute",
								"data-[active=true]:after:bottom-0",
								"data-[active=true]:after:left-0",
								"data-[active=true]:after:right-0",
								"data-[active=true]:after:h-[2px]",
								"data-[active=true]:after:rounded-[2px]",
								"data-[active=true]:after:bg-primary",
							],
						}}
					>
						<NavbarBrand as='li' className='gap-3 max-w-fit'>
							<NextLink
								className='flex justify-start items-center gap-1'
								href='/'
							>
								<Logo />
								<p className='font-bold text-inherit'>Learning Corner</p>
							</NextLink>
						</NavbarBrand>
						<NavbarContent
							className='hidden lg:flex gap-4 justify-start ml-2'
							justify='start'
						>
							{/* Navbar items */}
							{siteConfig.navItems.map((item) => (
								<NavbarItem key={item.href}>
									<Link
										className={`link ${pathname === "/" ? "active" : ""}`}
										href={item.href}
										color={pathname === item.href ? "success" : "foreground"}
									>
										{item.label}
									</Link>
								</NavbarItem>
							))}
						</NavbarContent>

						{/* Navbar content */}
						<NavbarContent
							className='hidden sm:flex basis-1/5 sm:basis-full'
							justify='end'
						>
							{/* Other items */}
							<NavbarItem className='hidden sm:flex gap-2'>
								<Link
									isExternal
									href={siteConfig.links.github}
									aria-label='Github'
								>
									<GithubIcon className='text-default-500' />
								</Link>
							</NavbarItem>
							<ThemeSwitch toggleTheme={toggleTheme} />

							<NavbarItem className='hidden lg:flex'>{searchInput}</NavbarItem>

							<NavbarItem className=' md:flex'>
								{/* Avatar with click event to toggle sign-in modal */}
									{user ? (
									<>
										<Link href='/profile'>
										<Avatar
											className=' lg:flex cursor-pointer'
											isBordered
											radius='full'
											src={
											user.avatar
												? user.avatar.url
												: "https://api-private.atlassian.com/users/aa7543e682dff486562017fe2fedc6c0/avatar"
											}
										/>
										</Link>
									</>
									) : (
									<Button
										className="cursor-pointer"
										variant="light" 
										onClick={handleAvatarClick}
									>
										Đăng nhập/Đăng kí
									</Button>
									)}
							</NavbarItem>
						</NavbarContent>

						{/* Navbar menu */}
						<NavbarContent className='sm:hidden basis-1 pl-4' justify='end'>
							<NavbarItem>
								{/* Avatar with click event to toggle sign-in modal */}
									{user ? (
									<>
										<Link href='/profile'>
										<Avatar
											className=' lg:flex cursor-pointer'
											isBordered
											radius='full'
											src={
											user.avatar
												? user.avatar.url
												: "https://api-private.atlassian.com/users/aa7543e682dff486562017fe2fedc6c0/avatar"
											}
										/>
										</Link>
									</>
									) : (
									<Button
										className="cursor-pointer"
										variant="light" 
										onClick={handleAvatarClick}
									>
										Đăng nhập/Đăng kí
									</Button>
									)}
							</NavbarItem>
							<ThemeSwitch toggleTheme={toggleTheme} />
							<NavbarMenuToggle />
						</NavbarContent>

						<NavbarMenu>
							{searchInput}
							<div className='mx-4 mt-2 flex flex-col gap-2'>
								{siteConfig.navMenuItems.map((item, index) => (
									<NavbarMenuItem key={`${item}-${index}`}>
										<Link
											className={`link ${
												pathname === item.href ? "active" : ""
											}`}
											color={
												index === siteConfig.navMenuItems.length - 1
													? "danger"
													: pathname === item.href
													? "success"
													: "foreground"
											}
											href={item.href}
											size='lg'
										>
											{item.label}
										</Link>
									</NavbarMenuItem>
								))}
							</div>
						</NavbarMenu>
					</NextUINavbar>
					{showAuthentication && (
						<Authentication onClose={() => setShowAuthentication(false)} />
					)}
					<Snackbar
						open={openSnackbar}
						autoHideDuration={6000} // Adjust the duration as needed
						onClose={() => setOpenSnackbar(false)}
					>
						<MuiAlert
							elevation={6}
							variant='filled'
							onClose={() => setOpenSnackbar(false)}
							severity='success' // Change severity to 'error' or 'warning' as needed
						>
							{snackbarMessage}
						</MuiAlert>
					</Snackbar>
				</>
			)}{" "}
		</>
	);
};

export default Navbar;
