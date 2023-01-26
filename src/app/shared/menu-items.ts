import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  role: string;
}

const MENUITEMS = [
  //Admin
  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'dashboard',role: '' },
  { state: 'category', type: 'link', name: 'Manage Category', icon: 'category',role: 'admin' },
  { state: 'product', type: 'link', name: 'Manage Product', icon: 'inventory_2',role: 'admin' },
  { state: 'order', type: 'link', name: 'Manage Order', icon: 'shopping_cart',role: 'admin' },
  { state: 'bill', type: 'link', name: 'View Bill', icon: 'backup_table',role: 'admin' },
  { state: 'user', type: 'link', name: 'Manage Users', icon: 'people',role: 'admin' },
  //User
  { state: 'order', type: 'link', name: 'Manage Order', icon: 'shopping_cart',role: 'user' },
  { state: 'bill', type: 'link', name: 'View Bill', icon: 'backup_table',role: 'user' },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
