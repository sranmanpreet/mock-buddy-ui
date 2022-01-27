import { Injectable } from '@angular/core';
import { Mock } from '../models/mock.model';

const dummyMocks: Array<Mock> = [
  { name: "Mock 1", route: "/mock/1", method: "GET", bodyType: "static", contentType: "application/json", status: "200", body: "return 2+3;", headers: [{ key: "Content-Type", value: "application/json" }, { key: "Active-User-Role", value: "ROLE_ADMIN" }, { key: "testKey", value: "testValue" }]},
  { name: "Mock 2", route: "/mock/2", method: "POST", bodyType: "javascript", contentType: "application/json", status: "201", body: "return 2+2;", headers: [] },
  { name: "Mock 3", route: "/mock/3", method: "PUT", bodyType: "static", contentType: "application/json", status: "200", body: '', headers: [{ key: "Content-Type", value: "application/json" }, { key: "Active-User-Role", value: "ROLE_ADMIN" }, { key: "testKey", value: "testValue" }] },
  { name: "Mock 4", route: "/mock/4", method: "DELETE", bodyType: "static", contentType: "application/json", status: "200", headers: [], body: '' },
  { name: "Mock 5", route: "/mock/5", method: "GET", bodyType: "javascript", contentType: "application/json", status: "200", headers: [], body: '' },
  { name: "Mock 6", route: "/mock/6", method: "POST", bodyType: "static", contentType: "application/json", status: "201", headers: [], body: '' },
  { name: "Mock 7", route: "/mock/7", method: "PUT", bodyType: "static", contentType: "application/json", status: "200", headers: [], body: '' },
  { name: "Mock 8", route: "/mock/8", method: "DELETE", bodyType: "static", contentType: "application/json", status: "200", headers: [], body: '' },
  { name: "Mock 9", route: "/mock/9", method: "GET", bodyType: "javascript", contentType: "application/json", status: "200", headers: [], body: '' },
  { name: "Mock 10", route: "/mock/10", method: "POST", bodyType: "static", contentType: "application/json", status: "201", headers: [], body: '' },
  { name: "Mock 11", route: "/mock/11", method: "PUT", bodyType: "static", contentType: "application/json", status: "200", headers: [], body: '' },
];

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor() { }

  getMocks() {
    return dummyMocks;
  }

  createMock(mock : Mock) {
    dummyMocks.push(mock);
  }

}
