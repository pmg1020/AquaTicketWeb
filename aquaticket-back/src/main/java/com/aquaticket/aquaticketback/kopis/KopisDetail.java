package com.aquaticket.aquaticketback.kopis;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@JacksonXmlRootElement(localName = "db")
public class KopisDetail extends KopisItem {
    private String mt10id;       // 공연시설 ID
    private String prfcast;      // 출연진
    private String prfcrew;      // 제작진
    private String prfruntime;   // 런타임
    private String prfage;       // 관람 연령
    private String entrpsnmP;    // 제작사
    private String entrpsnmA;    // 기획사
    private String entrpsnmH;    // 주최
    private String entrpsnmS;    // 주관
    private String pcseguidance; // 티켓 가격
    private String sty;          // 줄거리
    private String openrun;      // 오픈런 여부
    private String visit;        // 내한 여부
    private String child;        // 아동 여부
    private String daehakro;     // 대학로 여부
    private String festival;     // 축제 여부
    private String musicallicense; // 뮤지컬 라이센스 여부
    private String musicalcreate;  // 뮤지컬 창작 여부
    private String updatedate;     // 최종 수정일
    private String dtguidance;     // 공연시간 안내

    // 소개 이미지(styurl)는 여러 개가 올 수 있으므로 리스트 처리
    @JacksonXmlElementWrapper(localName = "styurls")
    @JacksonXmlProperty(localName = "styurl")
    private List<String> styurls;
}
