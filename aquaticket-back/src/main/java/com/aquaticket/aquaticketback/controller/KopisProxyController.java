package com.aquaticket.aquaticketback.controller;

import com.aquaticket.aquaticketback.kopis.*;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/kopis")
public class KopisProxyController {

    @Value("${kopis.service-key}")
    private String kopisServiceKey;

    private static final String KOPIS_API_BASE_URL = "http://www.kopis.or.kr/openApi/restful";

    /* =========================
       목록
       ========================= */
    @GetMapping(value = "/pblprfr", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getPerformances(
            @RequestParam(defaultValue = "20230101") String stdate,
            @RequestParam(defaultValue = "20230630") String eddate,
            @RequestParam(defaultValue = "1") String cpage,
            @RequestParam(defaultValue = "12") String rows
    ) {
        String url = UriComponentsBuilder.fromHttpUrl(KOPIS_API_BASE_URL + "/pblprfr")
                .queryParam("service", kopisServiceKey)
                .queryParam("stdate", stdate)
                .queryParam("eddate", eddate)
                .queryParam("cpage", cpage)
                .queryParam("rows", rows)
                .build().toUriString();

        try {
            RestTemplate rt = new RestTemplate();
            byte[] bytes = rt.getForObject(url, byte[].class);

            XmlMapper xml = new XmlMapper();
            KopisListEnvelope env = xml.readValue(bytes, KopisListEnvelope.class);
            List<KopisItem> list = (env != null) ? env.getDb() : null;

            return ResponseEntity.ok(list == null ? List.of() : list);
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .contentType(MediaType.TEXT_PLAIN)
                    .body("API 호출 오류(목록): " + e.getMessage());
        }
    }

    /* =========================
       상세
       ========================= */
    @GetMapping(value = "/pblprfr/{mt20id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getPerformanceDetail(@PathVariable String mt20id) {
        String url = UriComponentsBuilder.fromHttpUrl(KOPIS_API_BASE_URL + "/pblprfr/" + mt20id)
                .queryParam("service", kopisServiceKey)
                .build().toUriString();

        try {
            RestTemplate rt = new RestTemplate();
            byte[] bytes = rt.getForObject(url, byte[].class);

            XmlMapper xml = new XmlMapper();
            KopisDetailEnvelope env = xml.readValue(bytes, KopisDetailEnvelope.class);
            KopisDetail detail = (env != null && env.getDb() != null && !env.getDb().isEmpty())
                    ? env.getDb().get(0)
                    : null;

            return ResponseEntity.ok(detail);
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .contentType(MediaType.TEXT_PLAIN)
                    .body("API 호출 오류(상세): " + e.getMessage());
        }
    }

    /* =========================
       가격 (pcseguidance 파싱)
       ========================= */
    @GetMapping(value = "/prfprice/{mt20id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<PriceLineDto>> getPerformancePrices(@PathVariable String mt20id) {
        String url = UriComponentsBuilder
                .fromHttpUrl(KOPIS_API_BASE_URL + "/pblprfr/" + mt20id)
                .queryParam("service", kopisServiceKey)
                .build().toUriString();

        try {
            RestTemplate rt = new RestTemplate();
            byte[] bytes = rt.getForObject(url, byte[].class);

            XmlMapper xml = new XmlMapper();
            KopisDetailEnvelope env = xml.readValue(bytes, KopisDetailEnvelope.class);
            KopisDetail detail = (env != null && env.getDb() != null && !env.getDb().isEmpty())
                    ? env.getDb().get(0)
                    : null;

            String guide = (detail != null) ? detail.getPcseguidance() : null;
            List<PriceLineDto> lines = parsePcseguidance(guide);

            // UX: 항상 200 + 배열
            return ResponseEntity.ok(lines);
        } catch (Exception e) {
            // 에러도 200 + 빈 배열
            return ResponseEntity.ok(List.of());
        }
    }

    /** pcseguidance를 안정적으로 파싱해 항상 "##,###원"/"lo~hi원" 포맷으로 반환 */
    private List<PriceLineDto> parsePcseguidance(String guide) {
        List<PriceLineDto> out = new ArrayList<>();
        if (guide == null || guide.isBlank()) return out;

        // 예: "R석 198,000원", "전석 30000", "스탠딩 60", "A석 10,000 ~ 20,000원"
        Pattern pattern = Pattern.compile(
                "([A-Za-z가-힣0-9]+(?:석|전석|스탠딩|자유석|지정석)?)\\s*([\\d,]+(?:\\s*~\\s*[\\d,]+)?)\\s*원?"
        );
        Matcher m = pattern.matcher(guide);

        while (m.find()) {
            String grade = m.group(1);
            String price = normalizePrice(m.group(2));
            if (grade != null && !grade.isBlank() && price.matches(".*\\d.*")) {
                out.add(new PriceLineDto(grade.trim(), "-", price));
            }
        }

        // 정규식에 안 걸리면 폴백(기존 토큰 분해)
        if (out.isEmpty()) {
            String[] parts = guide.split("[,;/\\n]+");
            for (String raw : parts) {
                String s = raw.trim();
                if (s.isEmpty()) continue;

                int lastSpace = s.lastIndexOf(' ');
                String grade = s, price = "";
                if (lastSpace > 0) {
                    String tail = s.substring(lastSpace + 1).trim();
                    if (tail.matches(".*\\d.*")) {
                        grade = s.substring(0, lastSpace).trim();
                        price = normalizePrice(tail);
                    }
                }
                grade = grade.replaceAll("\\(.*?\\)", "").trim();
                if (!grade.isEmpty() && price.matches(".*\\d.*")) {
                    out.add(new PriceLineDto(grade, "-", price));
                }
            }
        }

        return out;
    }

    /* =========================
       가격 정규화 유틸
       ========================= */
    private String normalizePrice(String input) {
        if (input == null) return "가격 문의";
        String s = input.trim();
        if (s.isEmpty()) return "가격 문의";

        // 범위 "10000~20000", "10,000 ~ 20,000원" 등
        if (s.contains("~")) {
            String[] parts = s.split("~");
            if (parts.length == 2) {
                String lo = parts[0].replaceAll("[^\\d]", "");
                String hi = parts[1].replaceAll("[^\\d]", "");
                if (!lo.isEmpty() && !hi.isEmpty()) {
                    return formatWon(lo) + "~" + formatWon(hi) + "원";
                }
            }
            return "가격 문의";
        }

        // 단일 금액: "60000", "60,000", "60,000원", "60" 등
        String digits = s.replaceAll("[^\\d]", "");
        if (digits.isEmpty()) return "가격 문의";
        return formatWon(digits) + "원";
    }

    private String formatWon(String digits) {
        try {
            long n = Long.parseLong(digits);
            return String.format("%,d", n);
        } catch (NumberFormatException e) {
            return digits; // 파싱 실패 시 원본 숫자
        }
    }

    /* =========================
       DTO
       ========================= */
    @Data
    @AllArgsConstructor
    public static class PriceLineDto {
        private String grade; // 등급(예: R석, 전석)
        private String seat;  // 좌석 구분 없으면 "-"
        private String price; // 항상 "##,###원" 또는 "lo~hi원"
    }
}
