import Footer from "../components/Route/Footer";

export default function ProfilegLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
			<div className='inline-block w-full mb-20 text-center justify-center'>
				{children}
			</div>
			<Footer />
		</section>
	);
}
