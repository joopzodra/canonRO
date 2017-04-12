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
import { Observable } from 'rxjs';
import { Platform } from 'ionic-angular';

import { DataService } from '../../services/data.service';
import { ItemPage } from '../item/item';
import { IEntry } from '../../datatypes/i-entry';


@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapPage {

  private entries: Observable<IEntry[]>;
  private notMappedEntries: string;
  private mobile = false;
  private buttonText = 'Overige iconen';

  constructor(private navCtrl: NavController, private platform: Platform, private navParams: NavParams) {

    if (this.platform.is('cordova') || this.platform.is('ios')) {
      this.mobile = true;
      this.entries = this.navParams.get('entries');
    }      
  }

  ngAfterViewInit() {

    if (this.mobile === true) {
      this.loadMap();
      this.entries
        .subscribe(entries => {
          let notMappedEntries = entries.filter(entry => entry.x === 0);
          this.notMappedEntries = notMappedEntries.map(entry => entry.title).join(', ');
        });
    }
  }

  private loadMap() {

    let element: HTMLElement = document.getElementById('map');
    let map = new GoogleMap(element);
    let center: GoogleMapsLatLng = new GoogleMapsLatLng(52.22253, 5.31102);

    let position: CameraPosition = {
      target: center,
      zoom: 7.5,
      tilt: 0
    };

    map.one(GoogleMapsEvent.MAP_READY).then(() => {

      map.moveCamera(position); // works on iOS and Android

      this.entries
        .subscribe(entries => entries.map((entry, index) => {
          if (entry.x !== 0) {
            map.addMarker({
              position: new GoogleMapsLatLng(entry.y, entry.x),
              title: entry.title,
              icon: 'blue',
              infoClick: () => this.goTo(index)
            })
          }
        }))
    });
  }

  private goTo(index: number): Promise<any> {

    return this.navCtrl.push(ItemPage, { index });
  }

};
