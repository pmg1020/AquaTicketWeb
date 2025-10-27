// src/pages/PerformanceList.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPerformances, type KopisListItem } from "../api/kopis";
import "../css/performance-list.css";

export default function PerformanceList() {
  const [items, setItems] = useState<KopisListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        // ✅ 기본 인자 제공했지만 명시적으로 날짜 전달해도 OK
        const list = await fetchPerformances("20230101", "20230630");
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