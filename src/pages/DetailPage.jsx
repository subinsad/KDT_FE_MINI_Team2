import DetailImage from "../components/DetailComponents/DetailImage";
import DetailInfo from "../components/DetailComponents/DetailInfo";
import DetailList from "../components/DetailComponents/DetailList";
import DetailMap from "../components/DetailComponents/DetailMap";
import EventBox from "../components/DetailComponents/EventBox";
import MapNavi from "../components/DetailComponents/MapNavi";
import ProductName from "../components/DetailComponents/ProductName";

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
