const e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]"),a=document.querySelector("body");let o=null;e.addEventListener("click",(()=>{e.disabled=!0,o=setInterval((()=>{const e=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`;a.style.background=e}),1e3)})),t.addEventListener("click",(()=>{e.disabled=!1,clearInterval(o),console.log("interval is stopped")}));
//# sourceMappingURL=01-color-switcher.6451a19a.js.map
