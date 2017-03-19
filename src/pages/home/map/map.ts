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

import { DataService } from '../../../services/data.service';
import { ItemPage } from '../../item/item';
import { IEntry } from '../../../datatypes/i-entry';


@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComp {

  @Input() entries: Observable<IEntry[]>;
  private notMappedItems: Promise<IEntry[]>;
  private mobile = false;
  private buttonText = 'Overige iconen';

  constructor(private navCtrl: NavController, private data: DataService, private platform: Platform) {

    if (this.platform.is('cordova')) {
      this.mobile = true;
    }
  }

  ngAfterViewInit() {

    if (this.mobile === true) {
      this.loadMap();
      this.notMappedItems = this.entries.toPromise()
        .then(entries => entries.filter(entry => entry.x === 0));
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

      this.entries.toPromise()
        .then(entries => entries.map((entry, index) => {
          if (entry.x !== 0) {
            return <GoogleMapsMarkerOptions>{
              position: new GoogleMapsLatLng(entry.y, entry.x),
              title: entry.title,
              icon: 'blue',
              infoClick: () => this.goTo(index)
            }
          }
        }))
        .then(markerOptions => markerOptions.map(options => map.addMarker(options)))
        .then(marker => marker)
        .catch(err => console.log(err));
    });
  }

  private goTo(index: number): Promise<any> {
    console.log(index)

    return this.navCtrl.push(ItemPage, { index });
  }

  private toggleNotMappedItems() {
    this.buttonText === 'Overige iconen' ? this.buttonText = 'Verberg overige iconen' : this.buttonText = 'Overige iconen';
  }

};
