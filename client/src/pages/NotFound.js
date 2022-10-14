import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div>
      <h1>Oops! You seem to be lost.</h1>
      <p>Click the link to return to the homepage:</p>
      <Link to="/">Home</Link>
    </div>
  );
}
