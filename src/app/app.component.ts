import { Component } from '@angular/core';
import { Platform, NavController} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsComp } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsComp;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

}
