export default function DetailImage({ detailItem }) {
    const roomImg = detailItem?.accommodationImage || [];

    return (
        <div className="medium:h-[530px] medium:flex gap-2 mt-8">
            {roomImg.length > 0 && roomImg[0] && (
                <img
                    src={detailItem?.accommodationImage[0]?.imagePath}
                    alt="객실이미지"
                    className="w-[656px] h-full rounded-xl "
                />
            )}

            <div className="medium:grid medium:grow medium:gap-2 medium:grid-rows-2 medium:grid-cols-2 medium:w-2/5 hidden ">
                <img
                    src={roomImg[1]?.imagePath}
                    alt="객실이미지"
                    className="h-64 w-64 rounded-xl"
                />

                <img
                    src={roomImg[2]?.imagePath}
                    alt="객실이미지"
                    className="w-64 h-64 rounded-xl "
                />

                <img
                    src={roomImg[3]?.imagePath}
                    alt="객실이미지"
                    className="w-64 h-64 rounded-xl "
                />

                <img
                    src={roomImg[4]?.imagePath}
                    alt="객실이미지"
                    className="w-64 h-64 rounded-xl "
                />
            </div>
        </div>
    );
}
