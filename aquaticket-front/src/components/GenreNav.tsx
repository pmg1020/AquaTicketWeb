import { NavLink } from "react-router-dom";
import "../css/genre-nav.css";

const items = [
  { key: "all", label: "전체" },
  { key: "concert", label: "콘서트" },
  { key: "musical", label: "뮤지컬/연극" },
  { key: "classic", label: "클래식/오페라" },
  { key: "exhibit", label: "전시/행사" },
  { key: "kids", label: "아동/가족" },
  { key: "festival", label: "축제" },
];

export default function GenreNav() {
  return (
    <nav className="genre-nav" aria-label="장르 선택">
      <div className="genre-inner">
        {items.map((it) => (
          <NavLink
            key={it.key}
            to={`/performances?genre=${it.key}`}
            className={({ isActive }) =>
              "genre-link" + (isActive ? " is-active" : "")
            }
          >
            {it.label}
          </NavLink>
        ))}
      </div>
    </nav>

  );
}
