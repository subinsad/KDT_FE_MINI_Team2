import EventBox from "../components/EventBox";
import DetailInfo from "../components/DetailInfo";
import DetailList from "../components/DetailList";
import DetailMap from "../components/DetailMap";
import ProductName from "../components/ProductName";
import DetailImage from "../components/DetailImage";
export default function DetailPage() {
  return (
    <div className="flex flex-col max-w-mw mx-auto">
      <DetailImage />
      <ProductName />
      <div className="flex">
        <div className="flex-grow">
          <DetailList />
        </div>
        <div>
          <EventBox />
        </div>
      </div>

      <DetailInfo />
      <DetailMap />
    </div>
  );
}
