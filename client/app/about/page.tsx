"use client";
import { title } from "@/components/primitives";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import Heading from "../utils/Heading";
import { useSelector } from "react-redux";
import Footer from "../components/Route/Footer";
import About from "../components/Route/About";

const words = `	Website Learning corner mang đến một nền tảng học tập hiện đại và tiện lợi,  
giúp học viên có thể truy cập khóa học mọi lúc mọi nơi, xem video bài giảng, tải tài liệu và theo dõi tiến độ học tập dễ dàng. 
Với hệ thống quản lý khóa học hiệu quả, giảng viên có thể dễ dàng tạo mới, chỉnh sửa và cập nhật nội dung khóa học, 
trong khi học viên có thể tham gia thảo luận, đặt câu hỏi và đánh giá chất lượng khóa học. 
Được tích hợp các tính năng bảo mật và thanh toán linh hoạt, nền tảng còn cung cấp báo cáo thống kê chi tiết về hoạt động và doanh thu, 
giúp quản lý dễ dàng hơn. Hướng tới trải nghiệm học tập toàn diện và an toàn, 
Website Học Trực Tuyến sẽ là công cụ hỗ trợ đắc lực cho cả học viên, giảng viên và nhà quản trị. `;

export default function AboutPage() {
	const { user } = useSelector((state: any) => state.auth);

	return (
		<>
			<Heading
				title={`${user?.name} Profile - Learning Corner`}
				description='Explore coding courses and tutorials tailored for your learning needs at Learning Corner. Enhance your skills with expert-led programming courses.'
				keywords='coding courses, programming tutorials, web development, software engineering, computer science, programming languages, coding bootcamp'
			/>
			<div className='h-[50rem] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center mt-28'>
				<div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'></div>
				<div className='text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8'>
					<div className=''>
						{" "}
						<About />
					</div>
					<Footer />
				</div>
			</div>
		</>
	);
}
