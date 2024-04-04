export default function DetailImage({ roomData, detailItem }) {
    const roomImg = detailItem?.accommodationImage || [];
    console.log(detailItem?.accommodationImage[0]?.imagePath);
    console.log(detailItem);

    return (
        <div className="h-[530px] flex gap-2 mt-8">
            {roomImg.length > 0 && roomImg[0] && (
                <img
                    src={detailItem?.accommodationImage[0]?.imagePath}
                    alt="객실이미지"
                    className="w-[656px] h-full rounded-xl border-gray-200 border-solid border-2 p-4"
                />
            )}

            <div className="grid grow gap-2 grid-rows-2 grid-cols-2">
                {roomImg.length > 0 && roomImg[1] && (
                    <img
                        src={roomImg[1].imagePath}
                        alt="객실이미지"
                        className="h-full rounded-xl border-gray-200 border-solid border-2 p-4"
                    />
                )}

                <img
                    src="../img/Frame4.png"
                    alt="객실이미지"
                    className=" rounded-xl border-gray-200 border-solid border-2 p-4"
                />

                <img
                    src="../img/Frame4.png"
                    alt="객실이미지"
                    className=" rounded-xl border-gray-200 border-solid border-2 p-4"
                />

                <img
                    src="../img/Frame4.png"
                    alt="객실이미지"
                    className=" rounded-xl border-gray-200 border-solid border-2 p-4"
                />
            </div>
        </div>
    );
}
