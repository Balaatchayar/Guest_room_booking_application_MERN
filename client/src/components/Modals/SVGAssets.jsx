export const X = () => {
    return (
        <svg
        // SVG namespace declaration and defining view box size
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                // Path data defining the "X" shape
                d="M6 18 18 6M6 6l12 12"
            />
        </svg>
    );
};
