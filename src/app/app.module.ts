import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ItemPage } from '../pages/item/item';
import { ListAzPage } from '../pages/list-az/list-az';
import { MapPage } from '../pages/map/map';
import { TabsComp } from '../pages/tabs/tabs';
import { ImageSliderPage } from '../pages/imageSlider/imageSlider';
import { DataService } from '../services/data.service';
import { SplitLinks } from '../pipes/split-links';
import { CreateLinkText } from '../pipes/create-link-text';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ItemPage,
    ListAzPage,
    MapPage,
    TabsComp,
    ImageSliderPage,
    SplitLinks,
    CreateLinkText
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ListAzPage,
    MapPage,
    TabsComp,
    ImageSliderPage,
    ItemPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataService
    ]
})
export class AppModule {}
