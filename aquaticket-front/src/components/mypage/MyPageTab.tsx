type TabKey = "home" | "booking" | "coupons" | "tickets";

const TABS: { key: TabKey; label: string }[] = [
  { key: "home", label: "마이티켓 홈" },
  { key: "booking", label: "예매확인/취소" },
  { key: "coupons", label: "할인쿠폰" },
  { key: "tickets", label: "공연예매권" },
];

const MyPageTab = ({
  active,
  onChange,
}: {
  active: TabKey;
  onChange: (key: TabKey) => void;
}) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="flex gap-2">
        {TABS.map((t) => {
          const isActive = active === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => onChange(t.key)}
              className={`relative px-5 py-4 text-[16px] font-semibold transition ${
                isActive
                  ? "text-emerald-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {t.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-emerald-600" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MyPageTab;