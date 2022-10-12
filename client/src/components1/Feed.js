import { useEffect } from "react";

function Feed(props) {
  useEffect;
  return (
    <div>
      <li className="list-group-item">
        {props.name} purchased {props.description} for ${props.cost}
      </li>
    </div>
  );
}

export default Feed;
