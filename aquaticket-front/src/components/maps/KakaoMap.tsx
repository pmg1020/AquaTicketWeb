import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

/** ====== Minimal Kakao types (no any, no Status re-typing) ====== */
type KakaoGeocoderResult = { x: string; y: string };
type KakaoPlaceResult = { x: string; y: string; place_name: string };

type KakaoGeocoder = {
  addressSearch(
    query: string,
    callback: (result: KakaoGeocoderResult[], status: string) => void
  ): void;
};

type KakaoPlaces = {
  keywordSearch(
    query: string,
    callback: (data: KakaoPlaceResult[], status: string) => void
  ): void;
};

type KakaoMapsServices = {
  Geocoder: new () => KakaoGeocoder;
  Places: new () => KakaoPlaces;
  Status: {
    OK: string;
    ZERO_RESULT: string;
    ERROR: string;
  };
};

type KakaoWindow = {
  maps: {
    services: KakaoMapsServices;
  };
};

declare global {
  interface Window {
    kakao?: KakaoWindow;
  }
}
/** ============================================================= */

interface KakaoMapProps {
  venueName: string;
  venueArea?: string;
}

const KakaoMap = ({ venueName, venueArea }: KakaoMapProps) => {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const kakao = window.kakao;
    if (!kakao?.maps?.services || !venueName) {
      setLoading(false);
      return;
    }

    const services = kakao.maps.services;
    const geocoder = new services.Geocoder();
    const places = new services.Places();

    const query = venueArea ? `${venueArea} ${venueName}` : venueName;

    const done = (lat: number, lng: number) => {
      setCoords({ lat, lng });
      setLoading(false);
    };

    const fail = () => {
      setCoords(null);
      setLoading(false);
    };

    geocoder.addressSearch(query, (result, status) => {
      console.log("addressSearch query:", query, "status:", status, "result:", result);

      if (status === services.Status.OK && result.length > 0) {
        const lat = Number(result[0].y);
        const lng = Number(result[0].x);
        if (!Number.isNaN(lat) && !Number.isNaN(lng)) return done(lat, lng);
      }

      places.keywordSearch(query, (data, kStatus) => {
        console.log("keywordSearch query:", query, "status:", kStatus, "data:", data);

        if (kStatus === services.Status.OK && data.length > 0) {
          const lat = Number(data[0].y);
          const lng = Number(data[0].x);
          if (!Number.isNaN(lat) && !Number.isNaN(lng)) return done(lat, lng);
        }

        fail();
      });
    });
  }, [venueName, venueArea]);

  if (loading) return <div>지도 로딩중...</div>;
  if (!coords) return <div>장소 정보를 찾을 수 없습니다.</div>;

  return (
    <Map center={coords} style={{ width: "100%", height: "360px" }} level={3}>
      <MapMarker position={coords} />
    </Map>
  );
};

export default KakaoMap;
