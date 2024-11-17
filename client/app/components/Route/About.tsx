import Link from "next/link";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { title } from "@/components/primitives";

type FooterProps = {};

const words = `	Website Learning corner mang đến một nền tảng học tập hiện đại và tiện lợi, 
giúp học viên có thể truy cập khóa học mọi lúc mọi nơi, xem video bài giảng, tải tài liệu và theo dõi tiến độ học tập dễ dàng. 
Với hệ thống quản lý khóa học hiệu quả, giảng viên có thể dễ dàng tạo mới, chỉnh sửa và cập nhật nội dung khóa học, 
trong khi học viên có thể tham gia thảo luận, đặt câu hỏi và đánh giá chất lượng khóa học. 
Được tích hợp các tính năng bảo mật và thanh toán linh hoạt, nền tảng còn cung cấp báo cáo thống kê chi tiết về hoạt động và doanh thu, 
giúp quản lý dễ dàng hơn. Hướng tới trải nghiệm học tập toàn diện và an toàn, 
Website Học Trực Tuyến sẽ là công cụ hỗ trợ đắc lực cho cả học viên, giảng viên và nhà quản trị. `;

const About = ({}: FooterProps) => {
	return (
		<div className=' '>
			<br />
			<h1 className={` text-5xl font-semibold`}>
				Giới thiệu về <span className={title({ color: "violet" })}>Learning corner</span>
			</h1>

			<br />
			<div className='w-[95%] md:w-[85%] m-auto '>
				<p className=''>
					<TextGenerateEffect words={words} className='  font-light  mb-20' />
				</p>
				<br />
				<br />
				<br />
				<br />
			</div>
		</div>
	);
};

export default About;
