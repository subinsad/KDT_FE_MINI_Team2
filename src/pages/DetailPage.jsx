import DetailImage from "../components/DetailPage/DetailImage";
import DetailInfo from "../components/DetailPage/DetailInfo";
import DetailList from "../components/DetailPage/DetailList";
import DetailMap from "../components/DetailPage/DetailMap";
import EventBox from "../components/DetailPage/EventBox";
import MapNavi from "../components/DetailPage/MapNavi";
import ProductName from "../components/DetailPage/ProductName";

export default function DetailPage() {
  return (
    <div className="max-w-mw mx-auto">
      <DetailImage />
      <ProductName />
      <MapNavi />
      <div className="flex justify-between">
        <div>
          <DetailList />
          <DetailInfo />
        </div>
        <div className="py-5">
          <EventBox />
        </div>
      </div>
      <DetailMap />
    </div>
  );
}
