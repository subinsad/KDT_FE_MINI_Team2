export default function ProductName({ detailItem }) {
    return (
        <div className="pt-6">
            <p className="py-2 text-m">{detailItem.accommodationType}</p>
            <p className="pb-5 font-semibold text-3xl ">
                {detailItem.accommodationName}
            </p>
        </div>
    );
}
