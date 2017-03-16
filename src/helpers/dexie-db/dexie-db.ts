import Dexie from 'dexie';

import { entriesCsv } from './entries-csv';
import { IEntry } from '../../datatypes/i-entry';

//NB. If you want to start with a fresh database, clear the browser data before running the app

export class DexieDb extends Dexie {

  private entries: Dexie.Table<IEntry, number>;

  constructor() {

    super('canonRO');

    this.version(1).stores({
      entries: 'id, title, category, subtitle, lead, img1, img2, img3, img4, x, y, body'
    });

    let data = [];
    const row = /^(\d\d?),(.*?),(.*?),(.*?),(.*?),(.*?),(.*?),(.*?),(.*?),(.*?),(.*?),"([\s\S]*?)"$/gm;
    let match;
    while ((match = row.exec(entriesCsv)) !== null) {
      data.push({
        id: +match[1],
        title: match[2],
        category: match[3],
        subtitle: match[4],
        lead: match[5],
        img1: match[6],
        img2: match[7],
        img3: match[8],
        img4: match[9],
        x: match[10],
        y: match[11],
        body: match[12]
      });
    }

    this.on('populate', () => {
      this.entries.bulkAdd(data)
        .then((lastKey) => console.log("Last added row id was: " + lastKey))
        .catch(Dexie.BulkError, err => console.error(err));
    });
  }

  public getEntry(id): Dexie.Promise<IEntry> {
    return this.entries.where('id').equals(id).first();
  }

  public getAllEntries(): Dexie.Promise<IEntry[]> {
    return this.entries.toArray();
  }

}
