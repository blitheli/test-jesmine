/* eslint-disable no-undef */
import add from '../Apps/lyf/add.js';

describe("add函数测试样例", function () {
     
     it("测试1", function () {
          expect(add(1, 2)).toBe(4);
     })


     it("测试2", function () {
          expect(add(3, 4)).toBe(8);
     })
})