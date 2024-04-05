export default function ProductName({ detailItem }) {
    const accommodationType = detailItem?.accommodationType || '';
    const accommodationName = detailItem?.accommodationName || '';
    return (
        <div className="pt-6 mb-6">
            <p className="py-2 text-m">{accommodationType}</p>
            <p className="pb-5 font-semibold text-3xl ">{accommodationName}</p>

            <div className="">{detailItem?.introduction}</div>
        </div>
    );
}
