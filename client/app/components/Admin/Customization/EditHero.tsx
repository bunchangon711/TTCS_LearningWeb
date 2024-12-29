import {
	useEditLayoutMutation,
	useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import { Badge, Button, Image } from "@nextui-org/react";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { title, subtitle } from "@/components/primitives";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { GithubIcon } from "@/components/icons";
import { CameraAltRounded } from "@mui/icons-material";
// import Heading from "./utils/Heading";
// import Navbar from "./components/navbar";

type Props = {};

const EditHero: FC<Props> = (props: Props) => {
	const [image, setImage] = useState("");

	const [heading, setHeading] = useState("");

	const [subHeading, setSubHeading] = useState("");

	const { data, refetch } = useGetHeroDataQuery("Banner", {
		refetchOnMountOrArgChange: true,
	});

	const [editLayout, { isSuccess, error }] = useEditLayoutMutation();

	useEffect(() => {
		if (data) {
			setHeading(data?.layout?.banner?.title ?? "");
			setSubHeading(data?.layout?.banner?.subtitle ?? "");
			setImage(data?.layout?.banner?.image?.url ?? "");
		}

		if (isSuccess) {
			toast.success("Hero updated successfully!");
			refetch();
		}

		if (error && "data" in error) {
			const errorData = error as any;
			toast.error(errorData?.data?.message);
		}
	}, [data, isSuccess, error, refetch]);

	const handleUpdate = (e: any) => {
		const file = e.target.files?.[0];

		if (!file) {
			return;
		}

		const reader = new FileReader();

		reader.onload = (e: any) => {
			if (reader.readyState === 2) {
				setImage(e.target.result as string);
			}
		};

		reader.readAsDataURL(file);
	};

	const handleEdit = async () => {
		await editLayout({
			type: "Banner",
			image,
			title,
			subtitle,
		});
	};

	return (
		<>
			<div
				className='container mx-auto  
			flex lg:flex-row flex-col justify-evenly'
			>
				<section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10 '>
					<label htmlFor='banner'>
						<Badge
							className='bg-transparent border-none cursor-pointer'
							placement='bottom-right'
							content={<CameraAltRounded />}
						>
							<Image
								isZoomed
								width={240}
								height={240}
								alt='Banner trang chủ'
								src={image}
							/>
							<input
								type='file'
								name=''
								id='banner'
								accept='image/*'
								onChange={handleUpdate}
								className='hidden'
							/>
						</Badge>
					</label>

					{/* <label htmlFor='banner' className='absolute bottom-60 right-60 z-20'>
					<CameraAltRounded className='dark:text-white text-black text-[18px] cursor-pointer' />
				</label> */}
				</section>
				<section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
					<div className='inline-block max-w-lg text-center justify-center flex-col'>
						<textarea
							className={`${title()} outline-none resize-none h-36 md:h-60 bg-transparent   px-2 block text-center`}
							placeholder='Tiêu đề trang chủ'
							value={heading}
							onChange={(e) => setHeading(e.target.value)}
							rows={4}
						/>

						<textarea
							value={subHeading}
							onChange={(e) => setSubHeading(e.target.value)}
							placeholder='Giúp bạn tự tin chinh phục mọi lĩnh vực và phát triển trong thế giới tri thức đa dạng.'
							className={`${subtitle()} outline-none resize-none  bg-transparent   px-2 block text-center`}
						/>
					</div>
				</section>
			</div>
			<div className='flex justify-end'>
				<Button
					variant='flat'
					color='danger'
					className={`
			
          ${
						data?.layout?.banner?.title !== title ||
						data?.layout?.banner?.subtitle !== subtitle ||
						data?.layout?.banner?.image?.url !== image
							? "!cursor-pointer "
							: "!cursor-not-allowed"
					}
					
       `}
					onClick={
						data?.layout?.banner?.title !== title ||
						data?.layout?.banner?.subtitle !== subtitle ||
						data?.layout?.banner?.image?.url !== image
							? handleEdit
							: () => null
					}
				>
					Lưu
				</Button>
			</div>
		</>
	);
};

export default EditHero;
