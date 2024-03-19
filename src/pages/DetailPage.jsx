import DetailEvent from "../components/DetailEvent";
import DetailInfo from "../components/DetailInfo";

export default function DetailPage() {
  return (
    <div className="flex justify-center max-w-mw mx-auto border-gray-200 border-solid border-2">
      <DetailInfo />
      <DetailEvent />
    </div>
  );
}
