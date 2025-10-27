package com.aquaticket.aquaticketback.kopis;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true) // 알 수 없는 필드는 무시
public class KopisItem {

    @JacksonXmlProperty(localName = "mt20id")
    private String mt20id;   // 공연 ID

    @JacksonXmlProperty(localName = "prfnm")
    private String prfnm;    // 공연명

    @JacksonXmlProperty(localName = "prfpdfrom")
    private String prfpdfrom; // 공연 시작일

    @JacksonXmlProperty(localName = "prfpdto")
    private String prfpdto;   // 공연 종료일

    @JacksonXmlProperty(localName = "fcltynm")
    private String fcltynm;   // 공연장명

    @JacksonXmlProperty(localName = "poster")
    private String poster;    // 포스터 이미지

    @JacksonXmlProperty(localName = "genrenm")
    private String genrenm;   // 장르

    @JacksonXmlProperty(localName = "prfstate")
    private String prfstate;  // 공연상태

    // ✅ 추가된 필드
    @JacksonXmlProperty(localName = "area")
    private String area;      // 지역

    @JacksonXmlProperty(localName = "openrun")
    private String openrun;   // 오픈런 여부 (Y/N)
}
