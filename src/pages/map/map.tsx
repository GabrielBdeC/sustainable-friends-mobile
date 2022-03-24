import React, { useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import "./map.css";
import Button from "../../shared/components/button/button";
import { AuthService } from '../../shared/services/auth.service';
import { useNavigate } from 'react-router-dom';


function onMarkerClick() {
} 

function Map() {

  const navigate = useNavigate();
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

  const onInit = async () => {
    const authService = new AuthService();
    if (authService.getCurrentUser()) {
      if (!await authService.protected()){
        navigate("/login");
      }
    };
  }

  onInit();

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
          
        <></>
      </GoogleMap>
      <Button type="submit" buttonSize="btn--little" ><p className="p">Adicionar Ponto</p></Button>
    </div>
    
  ) : <></>
}


export default React.memo(Map);

