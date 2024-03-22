import { Link } from "react-router-dom";
import Button from "../components/Common/Button";
export default function Gnb() {
  return (
    <header className="py-8 sticky top-0 bg-white border-b-2 border-gray-200 border-solid z-10">
      <div className="flex items-center justify-between gap-9 max-w-mw mx-auto">
        <Link to="/">
          <h1 className="text-primary text-3xl font-bold">FE-MINI-2</h1>
        </Link>
        <nav>
          <Link to="/list">ListPage</Link>
          <Link to="/detail">DetailPage</Link>
          <Link to="/signin">
            <Button text="로그인" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
