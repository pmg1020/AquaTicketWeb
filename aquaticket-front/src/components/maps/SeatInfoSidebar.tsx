import React from "react";
import "../../css/maps.css";

interface SeatInfoSidebarProps {
  selectedZone: string | null;
}

const seatData: Record<
  string,
  { name: string; grade: string; price: string; remain: number }
> = {
  "standing-a": { name: "STANDING A", grade: "스탠딩석", price: "132,000원", remain: 20 },
  "standing-b": { name: "STANDING B", grade: "스탠딩석", price: "132,000원", remain: 15 },
  "standing-c": { name: "STANDING C", grade: "스탠딩석", price: "132,000원", remain: 18 },
  "standing-d": { name: "STANDING D", grade: "스탠딩석", price: "132,000원", remain: 25 },
  "zone-29": { name: "29구역", grade: "지정석", price: "132,000원", remain: 42 },
  "zone-30": { name: "30구역", grade: "지정석", price: "132,000원", remain: 37 },
  "zone-31": { name: "31구역", grade: "지정석", price: "132,000원", remain: 28 },
  "zone-32": { name: "32구역", grade: "지정석", price: "132,000원", remain: 44 },
  "zone-33": { name: "33구역", grade: "지정석", price: "132,000원", remain: 12 },
  "zone-34": { name: "34구역", grade: "지정석", price: "132,000원", remain: 50 },
  "zone-35": { name: "35구역", grade: "지정석", price: "132,000원", remain: 33 },
  "zone-36": { name: "36구역", grade: "지정석", price: "132,000원", remain: 17 },
  "zone-37": { name: "37구역", grade: "지정석", price: "132,000원", remain: 20 },
  "zone-38": { name: "38구역", grade: "지정석", price: "132,000원", remain: 21 },
  "zone-39": { name: "39구역", grade: "지정석", price: "132,000원", remain: 30 },
  "zone-40": { name: "40구역", grade: "지정석", price: "132,000원", remain: 26 },
  "zone-41": { name: "41구역", grade: "지정석", price: "132,000원", remain: 22 },
  "zone-42": { name: "42구역", grade: "지정석", price: "132,000원", remain: 18 },
  "zone-43": { name: "43구역", grade: "지정석", price: "132,000원", remain: 15 },
  "zone-44": { name: "44구역", grade: "지정석", price: "132,000원", remain: 10 },
};

export default function SeatInfoSidebar({ selectedZone }: SeatInfoSidebarProps) {
  const info = selectedZone ? seatData[selectedZone] : null;

  return (
    <aside className="seat-sidebar">
      <div className="sidebar-header">
        <h2>2025 N.Flying LIVE &CON4 ENCORE</h2>
        <p>2025.12.19 (금) 19:30</p>
      </div>

      <div className="sidebar-body">
        {info ? (
          <>
            <h3>{info.name}</h3>
            <p>좌석등급: {info.grade}</p>
            <p>잔여석: {info.remain}석</p>
            <p>가격: <strong>{info.price}</strong></p>
          </>
        ) : (
          <p className="text-gray-400">구역을 선택해주세요.</p>
        )}
      </div>

      <div className="sidebar-footer">
        <button
          className="complete-btn"
          disabled={!info}
          onClick={() => alert(`${info?.name} 예매 페이지로 이동`)}
        >
          예매하기
        </button>
      </div>
    </aside>
  );
}
