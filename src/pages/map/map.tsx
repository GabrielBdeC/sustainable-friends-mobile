import React, { useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import "./map.css";
import Button from "../../shared/components/button/button";

function onMarkerClick() {
} 

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDQISO3k52QEUZ_tQ3zsM6gbX5p4UlvirI"
  })

  const [position, setMovement] = useState({lat: 0, lng: 0});

  let idWatch: number;

  const onLoad = React.useCallback((map) => {
    navigator.geolocation.getCurrentPosition((resp)=>{
      setMovement({
        lat: resp.coords.latitude,
        lng: resp.coords.longitude,
      });
    });
    idWatch = navigator.geolocation.watchPosition(()=>{
      navigator.geolocation.getCurrentPosition((resp)=>{
        setMovement({
          lat: resp.coords.latitude,
          lng: resp.coords.longitude,
        });
      });
    });
  }, []);

  return isLoaded ? (
    <div className="container-map">
      <GoogleMap
        center={{ lat: position.lat, lng: position.lng }}
        id='map'
        zoom={14}
        onLoad={onLoad}
      >
        <Marker
          position={{ lat: position.lat, lng: position.lng }}
          icon={{
            url: "https://imgkub.com/images/2022/03/20/pessoa_WB.png",
            scaledSize: new google.maps.Size(30, 30)
          }}
        />
        <Marker
          onClick={onMarkerClick}
          position={{ lat: -28.930480, lng: -49.472340 }}
          icon={{
            url: "https://imgkub.com/images/2022/03/20/coleta_WB.png",
            scaledSize: new google.maps.Size(30, 30)
          }}
        />
        <Marker
          onClick={onMarkerClick}
          position={{ lat: -28.930580, lng: -49.412940 }}
          icon={{
            url: "https://imgkub.com/images/2022/03/20/entrega_WB.png",
            scaledSize: new google.maps.Size(30, 30)
          }}
        />
        <Marker
          onClick={onMarkerClick}
          position={{ lat: -28.930510, lng: -49.432940 }}
          icon={{
            url: "https://imgkub.com/images/2022/03/20/entrega_WB.png",
            scaledSize: new google.maps.Size(30, 30)
          }}
        />
        <></>
      </GoogleMap>
      <Button type="submit" buttonSize="btn--little" ><p className="p">Adicionar Ponto</p></Button>
    </div>
    
  ) : <></>
}

export default React.memo(Map);

