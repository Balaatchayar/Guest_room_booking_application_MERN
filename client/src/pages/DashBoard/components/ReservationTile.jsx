import { LocationIcon } from "../../../assets/SVGAssets";
import { CalendarIcon, MobileIcon, UserIconSmall } from "../assets/SVGAssets";

const ReservationTile = ({ reservation, place, user }) => {
    return (
        <div className="bg-slate-200 px-8 py-6 rounded-lg flex gap-6">
             {/* Thumbnail image of the reservation */}
            <div className="w-[300px] h-[200px] flex justify-center items-center rounded-lg overflow-hidden m-1">
                <img
                    src={`${import.meta.env.VITE_UPLOAD_CARE_URL}${
                        reservation?.place?.photos[0]
                    }/`}// Image URL with environment variable
                    alt="thumbnail object-contain rounded-lg"
                />
            </div>
            <div className="flex flex-col gap-2">
                <h2 className="font-bold text-xl">{place.name}</h2>
                <p className="flex gap-2">
                    <UserIconSmall /> {user.name}
                </p>
                <p className="flex gap-2">
                    <MobileIcon /> {user.phone}
                </p>
                {reservation?.address && (
                    <p className="flex gap-1 cols-span-1">
                        <LocationIcon />
                        {reservation?.address}
                    </p>
                )}{" "}
                <p className="flex gap-2">
                    <CalendarIcon />
                    {reservation.checkInDate +
                        " -> " +
                        reservation.checkOutDate}
                </p>
                <p>
                    {`for ${reservation.days} ${
                        reservation.days === 1 ? "night" : "nights"
                    } stay , The amount is`}
                </p>
                <div className="flex gap-2 font-bold px-2 py-1  bg-primary rounded-lg text-white w-fit">
                    {"₹ " + reservation?.price?.toLocaleString()}
                </div>
            </div>
        </div>
    );
};

export default ReservationTile;
