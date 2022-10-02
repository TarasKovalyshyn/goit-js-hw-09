(function(o,e){const i=Math.random()>.3;return new Promise(((n,t)=>{i?setTimeout((()=>n({position:o,delay:e})),e):setTimeout((()=>t({position:o,delay:e})),e)}))})(2,1500).then((({position:o,delay:e})=>{console.log(`✅ Fulfilled promise ${o} in ${e}ms`)})).catch((({position:o,delay:e})=>{console.log(`❌ Rejected promise ${o} in ${e}ms`)}));
//# sourceMappingURL=03-promises.aa144be7.js.map
