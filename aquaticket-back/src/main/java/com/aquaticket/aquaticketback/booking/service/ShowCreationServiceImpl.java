package com.aquaticket.aquaticketback.booking.service;

import com.aquaticket.aquaticketback.booking.domain.Performance;
import com.aquaticket.aquaticketback.booking.domain.Show;
import com.aquaticket.aquaticketback.booking.domain.Venue;
import com.aquaticket.aquaticketback.booking.repository.PerformanceRepository;
import com.aquaticket.aquaticketback.booking.repository.ShowRepository;
import com.aquaticket.aquaticketback.booking.repository.VenueRepository;
import com.aquaticket.aquaticketback.kopis.KopisDetail;
import com.aquaticket.aquaticketback.kopis.KopisDetailEnvelope;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ShowCreationServiceImpl implements ShowCreationService {

    private final PerformanceRepository performanceRepository;
    private final ShowRepository showRepository;
    private final VenueRepository venueRepository;
    private final RestTemplate restTemplate;
    private final XmlMapper xmlMapper;
    private final String kopisServiceKey;

    public ShowCreationServiceImpl(PerformanceRepository performanceRepository, ShowRepository showRepository,
                                 VenueRepository venueRepository, @Value("${kopis.service-key}") String kopisServiceKey) {
        this.performanceRepository = performanceRepository;
        this.showRepository = showRepository;
        this.venueRepository = venueRepository;
        this.kopisServiceKey = kopisServiceKey;
        this.restTemplate = new RestTemplate();
        this.xmlMapper = new XmlMapper();
        this.xmlMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    @Override
    @Transactional
    public Show createShowFromKopis(String kopisId, LocalDateTime startAt) {
        KopisDetail detail = fetchKopisDetail(kopisId);

        // Step 1: Explicitly find or create Venue, then flush.
        Optional<Venue> venueOpt = venueRepository.findByName(detail.getFcltynm());
        Venue venue;
        if (venueOpt.isEmpty()) {
            Venue newVenue = new Venue();
            newVenue.setName(detail.getFcltynm());
            venue = venueRepository.saveAndFlush(newVenue);
        } else {
            venue = venueOpt.get();
        }

        // Step 2: Explicitly find or create Performance, then flush.
        Optional<Performance> perfOpt = performanceRepository.findByKopisId(kopisId);
        Performance performance;
        if (perfOpt.isEmpty()) {
            Performance newPerf = new Performance();
            newPerf.setKopisId(kopisId);
            newPerf.setTitle(detail.getPrfnm());
            newPerf.setPosterUrl(detail.getPoster());
            newPerf.setVenue(venue);
            performance = performanceRepository.saveAndFlush(newPerf);
        } else {
            performance = perfOpt.get();
        }

        // Step 3: Create and save the final Show entity.
        Show newShow = new Show();
        newShow.setKopisId(kopisId);
        newShow.setPerformance(performance);
        newShow.setStartsAt(startAt);
        return showRepository.save(newShow);
    }

    private KopisDetail fetchKopisDetail(String kopisId) {
        String url = UriComponentsBuilder.fromUriString("http://www.kopis.or.kr/openApi/restful/pblprfr/" + kopisId)
                .queryParam("service", kopisServiceKey)
                .build().toUriString();
        try {
            byte[] bytes = restTemplate.getForObject(url, byte[].class);
            KopisDetailEnvelope env = xmlMapper.readValue(bytes, KopisDetailEnvelope.class);
            if (env == null || env.getDb() == null || env.getDb().isEmpty()) {
                throw new RuntimeException("Failed to fetch details from KOPIS for id: " + kopisId);
            }
            return env.getDb().get(0);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch or parse KOPIS details for id: " + kopisId, e);
        }
    }
}
