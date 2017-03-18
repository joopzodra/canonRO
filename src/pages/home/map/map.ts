import { Component, Input, AfterViewInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapsLatLng,
  CameraPosition,
  GoogleMapsMarkerOptions,
  GoogleMapsMarker
} from 'ionic-native';


@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComp {

  @Input() entries;
  map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ngAfterViewInit() {

    this.loadMap();
  }

  loadMap() {

    let element: HTMLElement = document.getElementById('map');

    let map = new GoogleMap(element);

    let ionic: GoogleMapsLatLng = new GoogleMapsLatLng(52.10183, 5.64950);

    let position: CameraPosition = {
      target: ionic,
      zoom: 6.8,
      tilt: 0
    };

    map.one(GoogleMapsEvent.MAP_READY).then(() => {
      map.moveCamera(position); // works on iOS and Android

    let markerOptions: GoogleMapsMarkerOptions = {
      position: ionic,
      title: 'Ionic'
    }; 

    map.addMarker(markerOptions)
      .then((marker: GoogleMapsMarker) => {
        marker.showInfoWindow();
      });
    });

  }

};

//ionic run android --device

