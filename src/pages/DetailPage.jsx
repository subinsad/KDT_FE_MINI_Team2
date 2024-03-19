import DetailEvent from "../components/DetailEvent";
import DetailInfo from "../components/DetailInfo";

export default function DetailPage() {
  return (
    <div className="flex justify-center bg-black">
      <div className="flex w-[1200px] bg-white">
        <DetailInfo />
        <DetailEvent />
      </div>
    </div>
  );
}
