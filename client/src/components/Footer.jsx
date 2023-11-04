import { Link } from "react-router-dom";

function Footer() {
  return (
<footer className="bg-white rounded-lg shadow ">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <Link to='/' className="flex items-center mb-4 sm:mb-0">
                <img src="https://gujhome.gujarat.gov.in/portal/images/Home/gujaratpolice.png" className="h-8 mr-3" alt="Flowbite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap ">Gujrat Police</span>
            </Link>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6 ">Home</a>
                </li>
                <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6">Dashboard</a>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center">© 2023 <Link to="/" className="hover:underline">Gujrat Police</Link>. All Rights Reserved.</span>
    </div>
</footer>


  );
}

export default Footer;
