// src/pages/SearchPage.tsx
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchPerformances, type KopisListItem, formatDate } from "../api/kopis";
import "../css/performance-list.css";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [items, setItems] = useState<KopisListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) {
      setItems([]);
      setLoading(false);
      return;
    }

    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const today = new Date();
        const oneYearLater = new Date();
        oneYearLater.setFullYear(today.getFullYear() + 1);

        const stdate = formatDate(today);
        const eddate = formatDate(oneYearLater);

        const list = await fetchPerformances(stdate, eddate, "1", "100", query);
        if (alive) setItems(list);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [query]);

  if (loading) return <div className="page">Loading...</div>;

  return (
    <main className="page">
      <h1>'{query}' 검색 결과</h1>
      <div className="grid">
        {items.length > 0 ? (
          items.map((it) => (
            <Link key={it.mt20id} to={`/performances/${it.mt20id}`} className="card">
              <img src={it.poster} alt={it.prfnm} />
              <div className="meta">
                <div className="name">{it.prfnm}</div>
                <div className="sub">
                  {it.genrenm} · {it.fcltynm}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </main>
  );
}
