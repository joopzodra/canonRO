import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ItemPage } from '../pages/item/item';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ImageSliderPage } from '../pages/imageSlider/imageSlider';
import { DataService } from '../services/data.service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ItemPage,
    HomePage,
    TabsPage,
    ImageSliderPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ItemPage,
    HomePage,
    TabsPage,
    ImageSliderPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataService
    ]
})
export class AppModule {}
