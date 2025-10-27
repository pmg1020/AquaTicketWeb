package com.aquaticket.aquaticketback.kopis;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;

import java.util.List;

@JacksonXmlRootElement(localName = "dbs")
public class KopisListEnvelope {

    @JacksonXmlElementWrapper(useWrapping = false)
    @JacksonXmlProperty(localName = "db")
    private List<KopisItem> db;

    public List<KopisItem> getDb() { return db; }
    public void setDb(List<KopisItem> db) { this.db = db; }
}
