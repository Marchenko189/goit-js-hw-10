import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{f as l}from"./assets/vendor-EyZmBGcZ.js";const d={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){o=t[0],o<=Date.now()?(alert("Please choose a date in the future"),s.disabled=!0):s.disabled=!1}};new l("#datetime-picker",d);let o;console.log(o);const s=document.querySelector("button[data-start]");s.addEventListener("click",()=>{o&&m(o)});function m(t){const a=setInterval(()=>{const n=t-Date.now();if(n<=0)clearInterval(a);else{const e=f(n);console.log(`${e.days} days, ${e.hours} hours, ${e.minutes} minutes, ${e.seconds} seconds`)}},1e3)}function f(t){const r=Math.floor(t/864e5),c=Math.floor(t%864e5/36e5),u=Math.floor(t%864e5%36e5/6e4),i=Math.floor(t%864e5%36e5%6e4/1e3);return{days:r,hours:c,minutes:u,seconds:i}}
//# sourceMappingURL=1-timer.js.map
