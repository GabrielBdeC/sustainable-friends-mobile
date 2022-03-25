import React, { MouseEventHandler, useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import "./map.css";
import Button from "../../shared/components/button/button";
import { AuthService } from '../../shared/services/auth.service';
import { useNavigate } from 'react-router-dom';
import { PointService } from '../../shared/services/point.service';
import { PagedPointDto } from '../../shared/models/paged.dto';
import { ItemDto } from '../../shared/models/item.dto';
import { PointDto } from '../../shared/models/point.dto';
import { AddItems } from '../../shared/components/addItems/addItems';
import { CgCloseO } from 'react-icons/cg';
import { ItemService } from '../../shared/services/item.service';


function onMarkerClick() {
}

const pointService: PointService = new PointService();

function Map() {

  const items = [
    {
      id: 1,
      name: 'Papel',
      value: false,
    },
    {
      id: 2,
      name: 'Vidro',
      value: false,
    },
    {
      id: 3,
      name: 'Lata de alumínio',
      value: false,
    },
    {
      id: 4,
      name: 'Embalagem PET',
      value: false,
    },
    {
      id: 5,
      name: 'Lata de aço',
      value: false,
    },
    {
      id: 6,
      name: 'Emabalagem loga vida',
      value: false,
    },
    {
      id: 7,
      name: 'Ferro',
      value: false,
    },
    {
      id: 8,
      name: 'Pilha',
      value: false,
    },
    {
      id: 9,
      name: 'Bateria',
      value: false,
    },
    {
      id: 10,
      name: 'Óleo de cozinha',
      value: false,
    },
    {
      id: 11,
      name: 'Eletroeletrônico',
      value: false,
    },
    {
      id: 12,
      name: 'Pneu',
      value: false,
    },
  ];

  // @ts-ignore
  const sizePoint: google.maps.Size = {
    height: 30,
    width: 30
  };

  const markerObjectEmpty: {
    obj: PointDto,
    marker: {
      onClick: any,
      position: { lat: number, lng: number },
      icon: {
        url: string,
        scaledSize: google.maps.Size
      },
    }
  }[] = [
      {
        obj: {
          identifier: '',
          distance: undefined,
          latitude: '',
          longitude: '',
          description: undefined,
          pointItems: [
            {
              identifier: '',
              item: {
                id: 0,
                name: '',
              },
              collectedBy: undefined,
            }],
          createdBy: {
            identifier: '',
            name: '',
            isPersonal: undefined,
          },
        },
        marker: {
          onClick: { onMarkerClick },
          position: { lat: 0, lng: 0 },
          icon: {
            url: "https://imgkub.com/images/2022/03/20/coleta_WB.png",
            scaledSize: sizePoint
          },
        }
      }
    ];

  const [modalOpen, setModalOpen] = useState(false);
  const [checkItems, setCheckItems] = useState(items);
  const [openModalType, setOpenModelType] = useState(0);
  const [markerOpenned, setMarkerOpenned] = useState(0);
  const [markerState, setMarkerState] = useState(markerObjectEmpty);

  const listItems = checkItems.map((el) => {
    return (
      <div key={`cb-${el.id}`}>
        <input id={`cb-${el.id}`} type="checkbox" className="checkbox"
          onClick={() => {
            const copyItems = JSON.parse(JSON.stringify(checkItems));
            copyItems[el.id - 1].value = !copyItems[el.id - 1].value;
            setCheckItems(copyItems);
          }} defaultChecked={el.value} value={el.name} />
        <label htmlFor={`cb-${el.id}`}>{el.name}</label>
      </div>
    );
  });

  const listObjMarker = markerState.map(({ obj }) => {
    return obj;
  });

  const listMarker = markerState.map(({ marker }, idObj) => {
    return (
      <Marker key={idObj}
        onClick={() => {
          setMarkerOpenned(idObj);
          setOpenModelType(1);
          const itemsPossible = {} as any;
          listObjMarker[idObj].pointItems.forEach((el) => {
            //@ts-ignore
            itemsPossible[el.item._id] = true;
          })
          setCheckItems(items.map((el) => {
            return {
              id: el.id,
              name: el.name,
              value: itemsPossible[el.id] ? true : false
            }
          }));
          setModalOpen(true);
        }}
        position={marker.position}
        icon={marker.icon}
      />);
  });

  const navigate = useNavigate();
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDQISO3k52QEUZ_tQ3zsM6gbX5p4UlvirI"
  })

  const [position, setMovement] = useState({ lat: 0, lng: 0 });

  let idWatch: number;

  function fetchPoints(lat: number, lng: number) {
    setMarkerState(markerObjectEmpty);
    pointService.getAllByLatLong(lat, lng, {
      "pageSize": 25,
      "pageIndex": 1
    }).then((pagePoint: PagedPointDto) => {
      if (pagePoint.points) {
        setMarkerState(pagePoint.points.map((point: PointDto) => {
          return {
            obj: point, marker: {
              onClick: { onMarkerClick },
              position: { lat: parseFloat(point.latitude), lng: parseFloat(point.longitude) },
              icon: {
                url: point.description ? "https://imgkub.com/images/2022/03/20/entrega_WB.png" : "https://imgkub.com/images/2022/03/20/coleta_WB.png",
                scaledSize: sizePoint
              },
            }
          }
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

  const handleClickCloseModal = () => {
    setModalOpen(false);
  }

  const handleClickOpenModal = () => {
    setOpenModelType(0);
    setMarkerOpenned(0);
    setCheckItems(items);
    setModalOpen(true);
  }

  const handleConfirmModal = () => {
    if (openModalType == 0) {
      pointService.createPoint({
        latitude: position.lat.toString(),
        longitude: position.lng.toString(),
        items: checkItems.map((el) => {
          if (el.value) {
            return el.id;
          }
        }).filter((el) => {
          return typeof el === 'number';
        })
      }).then(() => {
        fetchPoints(position.lat, position.lng);
        handleClickCloseModal();
      });
    } else {
      pointService.removePoint(listObjMarker[markerOpenned]).then(()=>{
        fetchPoints(position.lat, position.lng);
        handleClickCloseModal();
      });
    }
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
        <ul>
          {listMarker}
        </ul>
      </GoogleMap>
      <Button type="button" onClick={handleClickOpenModal} buttonSize="btn--little" ><p className="p">Adicionar Ponto</p></Button>
      <div className='button-logout'>
        <Button type="button" onClick={onLogout} buttonSize="btn--little" ><p className="p">Logout</p></Button>
      </div>
      {modalOpen ?
        <div className='modal'>
          <AddItems addSize="add--itens--size" addStyle="alert--primary--solid" >
            <Button type="button" onClick={handleClickCloseModal} buttonSize="btn--circle"><CgCloseO /></Button>
            {openModalType == 0 ? <p className="text">Selecione os Materiais:</p> : <p className="text">Lista de materiais:</p>}
            <div className="materiais" id="materiais">
              {listItems}
            </div>
            <div className='button-ready'>
              <Button type="button" buttonSize="btn--little" onClick={handleConfirmModal}><p className="p">{openModalType == 0 ? "Pronto" : "Coletar"}</p></Button>
            </div>
          </AddItems>
        </div> : <></>}
      <></>

    </div>

  ) : <></>
}


export default React.memo(Map);

