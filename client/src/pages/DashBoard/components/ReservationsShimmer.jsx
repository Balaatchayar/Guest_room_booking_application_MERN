const ReservationsShimmer = () => {
    return (
        <div className="flex flex-col gap-4 bg-slate-100 px-6 py-4 rounded-lg buffer mt-12 mx-24">
             {/* Shimmer effect for a title or small content */}
            <div className="bg-slate-300 h-6 max-w-[25%] rounded-lg">
                &nbsp;
            </div>
             {/* Shimmer effect for reservation items */}
            <div className="bg-slate-300 h-[200px] max-w-[85%] ml-20 rounded-lg">
                &nbsp;
            </div>
            <div className="bg-slate-300 h-[200px] max-w-[85%] ml-20 rounded-lg">
                &nbsp;
            </div>
            <div className="bg-slate-300 h-[200px] max-w-[85%] ml-20 rounded-lg">
                &nbsp;
            </div>
            <div className="bg-slate-300 h-[200px] max-w-[85%] ml-20 rounded-lg">
                &nbsp;
            </div>
        </div>
    );
};

export default ReservationsShimmer;
