!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("react"),require("colorthief")):"function"==typeof define&&define.amd?define(["exports","react","colorthief"],t):t((e||self).useColorThief={},e.react,e.colorthief)}(this,function(e,t,r){function n(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var o,i=n(r);e.FormatString=void 0,(o=e.FormatString||(e.FormatString={})).rgb="rgb",o.hex="hex";var f=function(e,t,r){var n=function(e){return e.toString(16).padStart(2,"0")};return"#"+n(e)+n(t)+n(r)};e.default=function(e,r){var n=r.format,o=void 0===n?"rgb":n,u=r.quality,a=void 0===u?10:u,c=r.colorCount,l=void 0===c?10:c,s=t.useState(""),d=s[0],v=s[1],g=t.useState({color:null,palette:null}),p=g[0],h=g[1];return t.useEffect(function(){if(e)if("string"==typeof e&&e.length)v(e);else{var t=e.current;if(t&&t instanceof HTMLImageElement&&t.src!==window.location.href){var r=function(){t.src&&v(t.src)};r();var n=new MutationObserver(r);return n.observe(t,{attributes:!0}),function(){n.disconnect()}}}return function(){}},[e]),t.useEffect(function(){var e=!0;if(d){var t=new Image;t.crossOrigin="anonymous",t.referrerPolicy="no-referrer",t.addEventListener("load",function r(){if(e){var n=new i.default,u=n.getColor(t,a),c=n.getPalette(t,l,a);"hex"===o&&(u=f(u[0],u[1],u[2]),c=c.map(function(e){return f(e[0],e[1],e[2])})),h({color:u,palette:c}),t.removeEventListener("load",r)}}),t.src=d}return function(){e=!1}},[d,l,a,o]),p}});
//# sourceMappingURL=use-color-thief.umd.js.map
