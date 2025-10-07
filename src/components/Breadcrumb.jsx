import Link from "next/link";

const Breadcrumb = ({ productName }) => {
    return (
        <nav aria-label="breadcrumb" className="mb-2 text-sm text-blue-600">
            <ol className="flex space-x-1">
                <li>
                    <Link href="/" legacyBehavior>
                        <a className="hover:underline">Home</a>
                    </Link>
                </li>
                <li>/</li>
                <li aria-current="page" className="font-semibold text-gray-700">
                    {productName}
                </li>
            </ol>
        </nav>
    );
};

export default Breadcrumb;