import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

function NumberPagination({ totalPosts, limit, page, setPage }) {
    const numPages = Math.ceil(totalPosts / limit); // 페이지계산

    const handlePrevious = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNext = () => {
        if (page < numPages) {
            setPage(page + 1);
        }
    };

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <button
                    onClick={handlePrevious}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Next
                </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing{' '}
                        <span className="font-medium">
                            {(page - 1) * limit + 1}
                        </span>{' '}
                        to{' '}
                        <span className="font-medium">
                            {Math.min(page * limit, totalPosts)}
                        </span>{' '}
                        of <span className="font-medium">{totalPosts}</span>{' '}
                        results
                    </p>
                </div>
                <div>
                    <nav
                        className="inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination">
                        <button
                            onClick={handlePrevious}
                            disabled={page === 1}
                            className={`${
                                page === 1
                                    ? 'opacity-50 cursor-not-allowed'
                                    : ''
                            } relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}>
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </button>
                        {[...Array(numPages).keys()].map((pageNum) => (
                            <button
                                key={pageNum + 1}
                                onClick={() => setPage(pageNum + 1)}
                                className={`${
                                    pageNum + 1 === page
                                        ? 'bg-primary text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                                } relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus:outline-offset-0`}>
                                {pageNum + 1}
                            </button>
                        ))}
                        <button
                            onClick={handleNext}
                            disabled={page === numPages}
                            className={`${
                                page === numPages
                                    ? 'opacity-50 cursor-not-allowed'
                                    : ''
                            } relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}>
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default NumberPagination;
