import { Injectable } from '@angular/core';
import { Mock } from '../models/mock.model';

const dummyMocks: Array<Mock> = [
  { name: "Mock 1", route: "/mock/1", method: "GET", bodyType: "static", contentType: "application/json", status: "200", headers: [{ key: "Content-Type", value: "application/json" }, { key: "Active-User-Role", value: "ROLE_ADMIN" }, { key: "testKey", value: "testValue" }] },
  { name: "Mock 2", route: "/mock/2", method: "POST", bodyType: "javascript", contentType: "application/json", status: "201", body: "return 2+2;" },
  { name: "Mock 3", route: "/mock/3", method: "PUT", bodyType: "static", contentType: "application/json", status: "200" },
  { name: "Mock 4", route: "/mock/4", method: "DELETE", bodyType: "static", contentType: "application/json", status: "200" },
  { name: "Mock 5", route: "/mock/5", method: "GET", bodyType: "javascript", contentType: "application/json", status: "200" },
  { name: "Mock 6", route: "/mock/6", method: "POST", bodyType: "static", contentType: "application/json", status: "201" },
  { name: "Mock 7", route: "/mock/7", method: "PUT", bodyType: "static", contentType: "application/json", status: "200" },
  { name: "Mock 4", route: "/mock/4", method: "DELETE", bodyType: "static", contentType: "application/json", status: "200" },
  { name: "Mock 5", route: "/mock/5", method: "GET", bodyType: "javascript", contentType: "application/json", status: "200" },
  { name: "Mock 6", route: "/mock/6", method: "POST", bodyType: "static", contentType: "application/json", status: "201" },
  { name: "Mock 7", route: "/mock/7", method: "PUT", bodyType: "static", contentType: "application/json", status: "200" },
];

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor() { }

  getMocks() {
    return dummyMocks;
  }

}
