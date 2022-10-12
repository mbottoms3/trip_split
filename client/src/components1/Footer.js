import "./Footer.css";
import { SiGithub } from "react-icons/si";

export default function Footer() {
  return (
    <div className="containerFooter">
      <a
        href="https://github.com/mbottoms3/trip_split"
        //can change to each person once we all fork
        target="_blank"
        rel="noreferrer"
        className="linkFooter"
      >
        <SiGithub className="iconFooter" />
      </a>
    </div>
  );
}
