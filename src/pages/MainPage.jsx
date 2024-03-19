import CityList from '../components/MainComponents/CityList';
import StayList1 from '../components/MainComponents/StayList1';
import StayList2 from '../components/MainComponents/StayList2';
import StayList3 from '../components/MainComponents/StayList3';
import SearchBar from '../components/SearchBar';

export default function Main() {
    return (
        <>
            <div>
                <img
                    src="../img/city1.png"
                    alt="배너이미지"
                    className=" w-full h-44 bg-slate-300 rounded"
                />
            </div>
            <div className="max-w-mw mx-auto mb-32 mt-24">
                <SearchBar />
                <div className="flex flex-col gap-32">
                    <CityList />
                    <StayList1 />
                    <StayList2 />
                    <StayList3 />
                </div>
            </div>
        </>
    );
}
