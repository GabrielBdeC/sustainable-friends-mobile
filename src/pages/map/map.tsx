import React, { useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import "./map.css";
import Button from "../../shared/components/button/button";
import { AuthService } from '../../shared/services/auth.service';
import { useNavigate } from 'react-router-dom';
import { PointService } from '../../shared/services/point.service';
import { PagedPointDto } from '../../shared/models/paged.dto';
import { PointDto } from '../../shared/models/point.dto';
import { AddItems } from '../../shared/components/addItems/addItems';
import { CgCloseO } from 'react-icons/cg';

function onMarkerClick() {
}

const pointService: PointService = new PointService();

function Map() {

  // @ts-ignore
  const sizePoint: google.maps.Size = {
    height: 30,
    width: 30
  };

  const [markerState, setMarkerState] = useState([
    {
      onClick: { onMarkerClick },
      position: { lat: -28.930480, lng: -49.472340 },
      icon: {
        url: "https://imgkub.com/images/2022/03/20/coleta_WB.png",
        scaledSize: sizePoint
      },
    },
    {
      onClick: { onMarkerClick },
      position: { lat: -28.930580, lng: -49.412940 },
      icon: {
        url: "https://imgkub.com/images/2022/03/20/entrega_WB.png",
        scaledSize: sizePoint

      },
    },
    {
      onClick: { onMarkerClick },
      position: { lat: -28.930510, lng: -49.432940 },
      icon: {
        url: "https://imgkub.com/images/2022/03/20/entrega_WB.png",
        scaledSize: sizePoint
      }
    }
  ]);

  const listMarker = markerState.map(({ onClick, position, icon }, id) => {
    return (<li key={id}>
      <Marker
        //onClick={onClick}
        position={position}
        icon={icon}
      />
    </li>);
  })

  const navigate = useNavigate();
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDQISO3k52QEUZ_tQ3zsM6gbX5p4UlvirI"
  })

  const [position, setMovement] = useState({ lat: 0, lng: 0 });

  let idWatch: number;

  function fetchPoints(lat: number, lng: number) {
    pointService.getAllByLatLong(lat, lng, {
      "pageSize": 25,
      "pageIndex": 1
    }).then((pagePoint: PagedPointDto) => {
      if (pagePoint.points) {
        setMarkerState(pagePoint.points.map((point: PointDto) => {
          return {
            onClick: { onMarkerClick },
            position: { lat: point.latitude, lng: point.longitude },
            icon: {
              url: point.description ? "https://imgkub.com/images/2022/03/20/entrega_WB.png" : "https://imgkub.com/images/2022/03/20/coleta_WB.png",
              scaledSize: sizePoint
            },
          };
        }));
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  const onLoad = React.useCallback((map) => {
    navigator.geolocation.getCurrentPosition((resp) => {
      setMovement({
        lat: resp.coords.latitude,
        lng: resp.coords.longitude,
      });
      fetchPoints(resp.coords.latitude, resp.coords.longitude);
    });
    idWatch = navigator.geolocation.watchPosition(() => {
      navigator.geolocation.getCurrentPosition((resp) => {
        setMovement({
          lat: resp.coords.latitude,
          lng: resp.coords.longitude,
        });
        fetchPoints(resp.coords.latitude, resp.coords.longitude);
      });
    });
  }, []);

  const onInit = async () => {
    const authService = new AuthService();
    if (AuthService.getCurrentUser()) {
      if (!await authService.protected()) {
        navigate("/login");
      }
    };
  }

  const onLogout = () => {
    AuthService.logout();
    navigate("/home");
  }

  onInit();

  const handleClick = () => {
    let listaMarcados = document.getElementsByTagName("input");
    for (let loop = 0; loop < listaMarcados.length; loop++) {
      let item = listaMarcados[loop];
      if (item.type == "checkbox" && item.checked) {
        alert(item.id);
      }
    };
  }

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
        {/* <Marker
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
        /> */}
        <ul>
          {listMarker}
        </ul>
      </GoogleMap>
      <div className='modal'>
        <AddItems addSize="add--itens--size" addStyle="alert--primary--solid" userId=" " latitude={0} longitude={0} itens={[]}>
          <Button type="submit" buttonSize="btn--circle"><CgCloseO /></Button>
          <p className="text">Selecione os Materiais:</p>
          <div className="materiais" id="materiais">
            <input id="cb-1" type="checkbox" className="checkbox" value="Material 1" />
            <label htmlFor="cb-1">Material 1</label>
            <input id="cb-2" type="checkbox" className="checkbox" value="Material 2" />
            <label htmlFor="cb-2">Material 2</label>
            <input id="cb-3" type="checkbox" className="checkbox" value="Material 3" />
            <label htmlFor="cb-3">Material 3</label>
            <input id="cb-4" type="checkbox" className="checkbox" value="Material 4" />
            <label htmlFor="cb-4">Material 4</label>
          </div>
          <Button type="button" buttonSize="btn--little" onClick={handleClick}><p className="p">Pronto</p></Button>
        </AddItems>
      </div>
      <></>

    </div>

  ) : <></>
}

export default React.memo(Map);

