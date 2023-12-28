//import pagination
import Pagination from "react-js-pagination";

function PaginationComponent(props) {
	return (
		props.total > 0 && (
			<Pagination
				innerClass={`pagination justify-content-${props.position} my-10 flex flex-row list-style-none gap-x-3 mx-50 justify-center`}
				activePage={props.currentPage}
				activeLinkClass="page text-sm py-3 px-6 relative block bg-[#229396] transition-all duration-300 rounded-md text-gray-50 hover:text-gray-50 hover:bg-[#229396] shadow-md focus:shadow-md"
				activeClass="page-item active"
				itemsCountPerPage={props.perPage}
				totalItemsCount={props.total}
				onChange={props.onChange}
				itemClasss="page-item"
				linkClass="z-10 bg-white border-[#229396] text-white-600 relative inline-flex items-center px-4 py-2 rounded-md border text-sm font-medium hover:text-gray-50 hover:bg-[#229396] shadow-md focus:shadow-md"
				pageRangeDisplayed={2}
				itemClassPrev="page-item"
				linkClassPrev="mr-3 relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white rounded-md text-gray-50 hover:text-gray-50 hover:bg-[#229396] shadow-md focus:shadow-md"
				itemClassNext="page-item"
				linkClassNext="ml-3 relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white rounded-md text-gray-50 hover:text-gray-50 hover:bg-[#229396] shadow-md focus:shadow-md"
			/>
		)
	);
}

export default PaginationComponent;
