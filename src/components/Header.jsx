import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header>
      <Link to="/">
        <h1>FE-MINI-2</h1>
      </Link>
      <nav>
        <Link to="/detail">DetailPage</Link>
        <Link to="/list">ListPage</Link>
        <Link to="/signin">SignInPage</Link>
        <Link to="/signup">SignUpPage</Link>
      </nav>
    </header>
  );
}
