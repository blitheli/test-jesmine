/**
 * 20240724 blitheli
 */

/**
 * C# 工程AstroxWasm的入口对象（Wasm模式）
 *
 */
const AstroxWasm = {

    _isReady: false,

    /**
     * Wasm模块是否已经准备好（未准备好时，则采用异步方式加载）
     */
    get isReady() {

        if (!AstroxWasm._readyPromise) {
            makeReadyPromise();
        }
        return this._isReady;
    },

    /**
     * 用于和C#工程AstroxWasm交互的函数(作为C#的输入函数)
     */
    setModuleImports: undefined,

    /**
     * 获取C#工程AstroxWasm的导出对象(可直接调用内部的类和方法)
     * 
     * @returns [Promise<Object>] 返回一个Promise对象，当C#工程AstroxWasm准备好时，Promise对象会被resolve
     */
    loadWasmModule: function () {

        if (!AstroxWasm._readyPromise) {
            makeReadyPromise();
        }
        return AstroxWasm._readyPromise;
    }
};


AstroxWasm._readyPromise = undefined;


function makeReadyPromise() {
    //导入dotnet模块
    const dotnetUrl = AstroxWasm.dotnetUrl || "./_framework/dotnet.js";
    const readyPromise = import(dotnetUrl).then(function (Module) {
        const dotnet = Module.dotnet;
        return dotnet
            .withDiagnosticTracing(false)
            .withApplicationArgumentsFromQuery()
            .create().then(function (rlt) {

                const { setModuleImports, getAssemblyExports, getConfig } = rlt;

                AstroxWasm.setModuleImports = setModuleImports;

                const config = getConfig();
                console.log("c# wasm module loaded!");
                console.log(`主程序集名称:${config.mainAssemblyName}`);

                return getAssemblyExports(config.mainAssemblyName).then(function (exports) {
                    AstroxWasm._isReady = true;
                    AstroxWasm.exports = exports;
                    return exports;
                });

            });
    });
    AstroxWasm._readyPromise = readyPromise;
}


export default AstroxWasm;
