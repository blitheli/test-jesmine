/* eslint-disable no-undef */
import add from '../src/add.js';

describe("add函数测试样例", function () {
     
     it("测试1", function () {
          const c = add(1, 2);
          expect(c).toBe(4);
     })


     it("测试2", function () {
          expect(add(3, 4)).toBe(8);
     })
})