package com.aquaticket.aquaticketback.kopis;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@JacksonXmlRootElement(localName = "dbs")
public class KopisDetailEnvelope {

    @JacksonXmlElementWrapper(useWrapping = false)
    @JacksonXmlProperty(localName = "db")
    private List<KopisDetail> db;
}
