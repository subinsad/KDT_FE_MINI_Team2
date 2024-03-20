import { Link } from "react-router-dom";
export default function Gnb() {
  return (
    <header className="flex p-8 sticky top-0 w-full bg-white z-10 border-gray-200 border-solid border-2">
      <Link to="/">
        <h1>FE-MINI-2</h1>
      </Link>
      <nav>
        <Link to="/list">ListPage</Link>
        <Link to="/detail">DetailPage</Link>
        <Link to="/signin">SignInPage</Link>
        <Link to="/signup">SignUpPage</Link>
      </nav>
    </header>
  );
}
