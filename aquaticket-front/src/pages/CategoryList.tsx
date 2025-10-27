// src/pages/CategoryList.tsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPerformances, type KopisListItem } from "../api/kopis";
import "../css/performance-list.css";

export default function CategoryList() {
  const { genre } = useParams<{ genre: string }>();
  const [items, setItems] = useState<KopisListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        // 장르 필터가 필요하면 프론트에서 필터
        const list = await fetchPerformances("20230101", "20230630");
        const filtered = genre
          ? list.filter((x) => (x.genrenm || "").includes(genre))
          : list;
        if (alive) setItems(filtered);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [genre]);

  if (loading) return <div className="page">Loading...</div>;

  return (
    <main className="page"> {/* ✅ [수정] <main> 태그 추가 */}
      <h1>{genre ?? "카테고리"} 공연</h1>
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