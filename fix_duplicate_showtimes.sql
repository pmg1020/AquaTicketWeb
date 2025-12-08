-- ===================================================
-- 중복 Showtime 데이터 정리 및 UNIQUE 제약조건 추가
-- ===================================================

-- 1. 현재 중복 데이터 확인
SELECT kopis_id, start_at, COUNT(*) as count
FROM showtimes
GROUP BY kopis_id, start_at
HAVING COUNT(*) > 1;

-- 2. 중복된 레코드 중 ID가 가장 작은 것만 남기고 나머지 삭제
DELETE s1 FROM showtimes s1
INNER JOIN showtimes s2
WHERE s1.id > s2.id
  AND s1.kopis_id = s2.kopis_id
  AND s1.start_at = s2.start_at;

-- 3. 중복 제거 후 확인 (결과가 없어야 정상)
SELECT kopis_id, start_at, COUNT(*) as count
FROM showtimes
GROUP BY kopis_id, start_at
HAVING COUNT(*) > 1;

-- 4. UNIQUE 제약조건 추가 (중복 생성 방지)
ALTER TABLE showtimes
ADD UNIQUE INDEX uk_showtimes_kopis_start (kopis_id, start_at);

-- 5. 제약조건이 추가되었는지 확인
SHOW INDEX FROM showtimes WHERE Key_name = 'uk_showtimes_kopis_start';
