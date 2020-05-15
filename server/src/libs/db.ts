import * as loki from 'lokijs';

export const db = new loki('snow.db');
export const users = db.addCollection('users');
export const props = db.addCollection('props');

