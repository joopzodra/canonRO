import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Tabs } from 'ionic-angular';

import { ListAzPage } from '../list-az/list-az';
import { MapPage } from '../map/map';
import { AboutPage } from '../about/about';
import { DataService } from '../../services/data.service';
import { IEntry } from '../../datatypes/i-entry';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsComp {
  // should be each tab's root Page
  tab1Root: any = ListAzPage;
  tab2Root: any = MapPage;
  tab3Root: any = AboutPage;

  @ViewChild('tabsComp') tabsComp: Tabs;

  private entries: Observable<IEntry[]>;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.entries = this.data.getAllEntries();
  }

  tabChange() {

    let prevTab = this.tabsComp.previousTab(false);

    if (prevTab) {
      let length = prevTab.length();
      while (length > 1) {
        prevTab.pop();
        length--;
      }
    }
  }
  
}
