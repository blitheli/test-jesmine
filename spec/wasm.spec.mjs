import AstroxWasm from '../src/AstroxWasm.js';

describe("wasm函数", function () {


     it("测试1", async () => {

          //   动态加载模块
          const module = await import('../src/add.js');
          const add = module.default;

          // 使用 add 模块中的函数
          const result = add(2, 3);
          expect(result).toBe(6);


          //  加载Wasm模块
          AstroxWasm.dotnetUrl = '../src/_framework/dotnet.js';
          await AstroxWasm.loadWasmModule();

          //  历元时刻
          //const jd = new JulianDate(2457707, 8640 - 32.184, TimeStandard.TAI);

          const motion = AstroxWasm.exports.CelestialLib.GetCbMotionTranslation(2457707, 2300.0, 'Earth', 1, 'Moon', 1);
          console.log(motion);
          expect(1).toBe(1);
     })

})