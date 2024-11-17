"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Loader from "../Loader/Loader";
import { Code, Image, Link, Snippet } from "@nextui-org/react";
import { subtitle, title } from "@/components/primitives";
import { siteConfig } from "@/config/site";
import { button as buttonStyles } from "@nextui-org/theme";


type HeroProps = {};

const Hero = ({}: HeroProps) => {
	const [search, setSearch] = useState("");

	const router = useRouter();

	const [mounted, setMounted] = useState(false);
	const { data, isLoading } = useGetHeroDataQuery("Banner", {});

	useEffect(() => {
		setMounted(true);
	  }, []);
	
	if (!mounted) {
	return null;
	}

	const handleSearch = () => {
		if (search === "") {
			return;
		}
		router.push(`/courses?title=${search}`);
	};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div
					className='container mx-auto  
			flex lg:flex-row flex-col justify-evenly'
				>
					<section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10 '>
						<Image
							isZoomed
							width={600}
							height={600}
							alt='NextUI Fruit Image with Zoom'
							src={data?.layout?.banner?.image?.url}
						/>
					</section>
					<section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
						<div className='inline-block max-w-xl text-center justify-center'>
						<h1 className={title({ color: "violet" })}>
							{data?.layout?.banner?.title}
						</h1>
							<h2 className={subtitle({ class: "mt-4" })}>
								{data?.layout?.banner?.subtitle}
							</h2>
						</div>
					</section>
				</div>
			)}
		</>
	);
};

export default Hero;
