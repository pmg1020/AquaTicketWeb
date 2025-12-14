// src/pages/PerformanceList.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPerformances, type KopisListItem, formatDate } from "../api/kopis";
import "../css/performance-list.css";

export default function PerformanceList() {
  const [items, setItems] = useState<KopisListItem[]>([]);
  const [loading, setLoading] = useState(true);

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
        if (alive) setItems(list);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (loading) return <div className="page">Loading...</div>;

  return (
    <main className="page"> {/* ✅ [수정] <main> 태그 추가 */}
      <h1>공연 목록</h1>
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