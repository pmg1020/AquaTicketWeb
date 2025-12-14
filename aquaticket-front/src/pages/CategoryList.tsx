// src/pages/CategoryList.tsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPerformances, type KopisListItem, formatDate } from "../api/kopis";
import "../css/performance-list.css";

// genreFilterMap: For filtering API data
const genreFilterMap: { [key: string]: string } = {
  concert: "대중음악", // KOPIS API uses "대중음악" for concerts
  musical: "뮤지컬",
  classic: "클래식",
};

// genreTitleMap: For display in the UI
const genreTitleMap: { [key: string]: string } = {
  all: "전체",
  concert: "콘서트",
  musical: "뮤지컬/연극",
  classic: "클래식/오페라",
};

export default function CategoryList() {
  const { slug } = useParams<{ slug: string }>();
  const [items, setItems] = useState<KopisListItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const genre = slug || "all";
  const filterTerm = genreFilterMap[genre];
  const pageTitle = genreTitleMap[genre] || "전체";

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const today = new Date();
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(today.getMonth() - 3);
        const oneYearLater = new Date();
        oneYearLater.setFullYear(today.getFullYear() + 1);

        const stdate = formatDate(threeMonthsAgo);
        const eddate = formatDate(oneYearLater);
        
        const list = await fetchPerformances(stdate, eddate);
        
        const filtered =
          genre === "all"
            ? list
            : list.filter((x) => (x.genrenm || "").includes(filterTerm));
            
        if (alive) setItems(filtered);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [genre, filterTerm]);

  if (loading) return <div className="page">Loading...</div>;

  return (
    <main className="page">
      <h1>{pageTitle} 공연</h1>
      <div className="grid">
        {items.map((it) => (
          <Link key={it.mt20id} to={`/performances/${it.mt20id}`} className="card">
            <img src={it.poster} alt={it.prfnm} />
            <div className="meta">
              <div className="name">{it.prfnm}</div>
              <div className="sub">
                {it.genrenm} · {it.fcltynm}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}