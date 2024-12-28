// import { styles } from "@/app/styles/styles";
import Image from "next/image";
import React from "react";
import ReviewCard from "../Review/ReviewCard";
import { subtitle, title } from "@/components/primitives";

type ReviewsProps = {};

export const reviews = [
	{
		name: "Nguyễn Ngân Hà",
		avatar: "https://unica.vn/media/img/ab-av-1.jpg",
		profession: "Student",
		comment:
			"Mình đang theo học khóa Tiếng Anh tại Unica, chương trình dạy rất thực tế và dễ hiểu cho người mất gốc. Chỉ sau 3 tháng mình đã có thể tự tin giao tiếp Tiếng Anh cơ bản và sử dụng được ngay trong chuyến du lịch Thái vừa rồi. Rất cám ơn Unica và cô giáo đã nhiệt tình support, mình sẽ tham khảo thêm các khóa nâng cao hơn để thi lấy chứng chỉ Tiếng Anh nữa.",
	},
	{
		name: "Đào Thị Hồng Anh",
		avatar: "https://unica.vn/media/img/ab-av-2.jpg",
		profession: "Student",
		comment:
			"Tôi là nhân viên văn phòng nên không có nhiều thời gian đi học thêm. Nhưng Unica mang cho tôi trải nghiệm học tập rất thoải mái, mở máy lên là học bất cứ lúc nào cũng được, hoàn toàn chủ động chứ không bị phụ thuộc vào ai cả. Tuy là học online nhưng vẫn được giảng viên hỗ trợ giải đáp thắc mắc nữa. Tôi chắc chắn sẽ đăng ký thêm nhiều khóa học tại đây!",
	},
	{
		name: "Trần Văn Tuấn",
		avatar: "https://unica.vn/media/img/ab-av-3.jpg",
		profession: "Computer systems engineering student",
		comment:
			"Cám ơn Unica đã mang đến những khóa học chất lượng, tôi đã mua tới 6 khóa học bởi những kiến thức rất thực tế mà các bài học mang lại và chắc chắn sẽ sẽ còn mua thêm. Bên chăm sóc khách hàng và tư vấn cũng rất nhiệt tình để tìm ra đúng khóa học phù hợp yêu cầu của khách hàng, khi gặp khó khăn gì tôi cũng nhanh chóng được giải quyết ngay. Đây cũng là điều tôi rất thích về Unica.",
	},
	{
		name: "Trần Văn Tuấn",
		avatar: "https://unica.vn/media/img/ab-av-3.jpg",
		profession: "Computer systems engineering student",
		comment:
			"Cám ơn Unica đã mang đến những khóa học chất lượng, tôi đã mua tới 6 khóa học bởi những kiến thức rất thực tế mà các bài học mang lại và chắc chắn sẽ sẽ còn mua thêm. Bên chăm sóc khách hàng và tư vấn cũng rất nhiệt tình để tìm ra đúng khóa học phù hợp yêu cầu của khách hàng, khi gặp khó khăn gì tôi cũng nhanh chóng được giải quyết ngay. Đây cũng là điều tôi rất thích về Unica.",
	},
	{
		name: "Trần Văn Tuấn",
		avatar: "https://unica.vn/media/img/ab-av-3.jpg",
		profession: "Computer systems engineering student",
		comment:
			"Cám ơn Unica đã mang đến những khóa học chất lượng, tôi đã mua tới 6 khóa học bởi những kiến thức rất thực tế mà các bài học mang lại và chắc chắn sẽ sẽ còn mua thêm. Bên chăm sóc khách hàng và tư vấn cũng rất nhiệt tình để tìm ra đúng khóa học phù hợp yêu cầu của khách hàng, khi gặp khó khăn gì tôi cũng nhanh chóng được giải quyết ngay. Đây cũng là điều tôi rất thích về Unica.",
	},
	{
		name: "Trần Văn Tuấn",
		avatar: "https://unica.vn/media/img/ab-av-3.jpg",
		profession: "Computer systems engineering student",
		comment:
			"Cám ơn Unica đã mang đến những khóa học chất lượng, tôi đã mua tới 6 khóa học bởi những kiến thức rất thực tế mà các bài học mang lại và chắc chắn sẽ sẽ còn mua thêm. Bên chăm sóc khách hàng và tư vấn cũng rất nhiệt tình để tìm ra đúng khóa học phù hợp yêu cầu của khách hàng, khi gặp khó khăn gì tôi cũng nhanh chóng được giải quyết ngay. Đây cũng là điều tôi rất thích về Unica.",
	},
];

const Reviews = ({}: ReviewsProps) => {
	return (
		<div className='w-[90%] 800px:w-[85%] m-auto'>
			<div
				className='mt-44 w-full lg:flex  sm:flex
                lg:flex-row

            items-center'
			>
				<div className='800px:w-[50%] w-full'>
					<Image
						src='https://res.cloudinary.com/kouroshrstn/image/upload/v1707293134/Avatars/business-img_o2xmaa.png'
						alt='business'
						width={700}
						height={700}
					/>
				</div>

				<div className='800px:w-[50%] w-full'>
					<h3 className={title()}>
						Đồng hành cùng{" "}
						<span className={title({ color: "violet" })}>Sự phát triển</span>{" "}
						của học viên
						<br />
					</h3>
					<br />
					<p className={subtitle()}>
					Chúng tôi tự hào được đồng hành cùng hàng nghìn học viên trên hành trình phát triển bản thân và sự nghiệp. Thông qua nền tảng học trực tuyến, học viên không chỉ tiếp thu kiến thức mà còn được hỗ trợ tận tình từ đội ngũ giảng viên giàu kinh nghiệm.
					Sự tiến bộ của từng học viên chính là thước đo thành công của chúng tôi. Với phương pháp giảng dạy tương tác, học liệu chất lượng và hệ thống theo dõi tiến độ chuyên nghiệp, chúng tôi cam kết mang đến trải nghiệm học tập hiệu quả nhất cho mọi người.
					</p>
					<br />
				</div>
				<br />
				<br />
			</div>

			<div className={`${title()} text-center w-full`}>
				<h3>
				<br />
					Đánh giá của các khóa học
				</h3>
			</div>

			<div className='grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[35px] lg:grid-cols-2 lg:gap-[35px] xl:grid-cols-2 xl:gap-[35px] mb-12 mt-16'>
			{reviews?.map((i, index) => (
				<ReviewCard item={i} key={index} />
			))}
			</div>
		</div>
	);
};

export default Reviews;
