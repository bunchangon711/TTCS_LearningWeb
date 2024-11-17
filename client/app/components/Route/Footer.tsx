import Link from "next/link";

type FooterProps = {};

const Footer = ({}: FooterProps) => {
  return (
    <footer className='mt-28'>
      <div className='border border-[#0000000e] dark:border-[#ffffff1e]' />
      <br />
      <div className='w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8'>
        <div className='flex justify-center gap-8'>
          <Link
            href='/courses'
            className='text-base text-black dark:text-gray-300 dark:hover:text-white'
          >
            Courses
          </Link>
          <Link
            href='/profile'
            className='text-base text-black dark:text-gray-300 dark:hover:text-white'
          >
            My Account
          </Link>
          <Link
            href='/about'
            className='text-base text-black dark:text-gray-300 dark:hover:text-white'
          >
            About
          </Link>
        </div>
        <br />
        <p className='text-center text-black dark:text-white md:text-xl text-sm'>
         Learning Corner | Buncha
        </p>
      </div>
      <br />
    </footer>
  );
};

export default Footer;
