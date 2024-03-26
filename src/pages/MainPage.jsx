import Banner from "../components/MainComponents/Banner";
import CityList from "../components/MainComponents/CityList";
import StayList1 from "../components/MainComponents/StayList1";
import StayList2 from "../components/MainComponents/StayList2";
import StayList3 from "../components/MainComponents/StayList3";
import SearchBar from "../components/SearchBar";
import { useUser } from "../store/user";

export default function Main() {
  const { loginUser } = useUser((state) => ({
    loginUser: state.loginUser,
  }));
  if (!loginUser) {
    return <div>Please log in to see your profile.</div>;
  }
  return (
    <>
      <div className="mb-24">
        <Banner />
      </div>
      <div className="max-w-mw mx-auto mb-32">
        <SearchBar className="absolute top-[24rem] z-10" />
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
