(window.webpackJsonp=window.webpackJsonp||[]).push([[4,6],{"4w2Y":function(e,t,a){"use strict";a.r(t);var c=a("q1tI"),n=a.n(c),l=a("XtUg"),r=(a("XfO3"),a("HEwt"),a("a1Th"),a("rE2o"),a("ioFf"),a("rGqo"),a("yt8O"),a("Btvt"),a("ma3e")),i=a("Wbzz"),s=a("LvDl"),m=a.n(s),o=(a("2rJu"),a("9eCu")),d=a("baAH"),u=a("oIpN"),h=function(e){var t=e.slug,a=e.title;return n.a.createElement("p",null,n.a.createElement(i.a,{className:"has-text-white has-text-weight-medium calendar-day-text",to:t},a))},v=function(e){var t=e.events,a=e.date;return n.a.createElement(n.a.Fragment,null,n.a.createElement(p,{date:a}),t.slice(0,3).map((function(e){return n.a.createElement(h,{slug:e.fields.slug,title:e.frontmatter.title,key:e.frontmatter.title})})),t.length>3?n.a.createElement("p",null,"..."):null)},f=function(e){var t=e.date,a=e.events,c=e.close,l=e.active,r=a?a.map((function(e){return Object(u.b)(e)})):[];return n.a.createElement("div",{className:"modal "+(l?"is-active":"")},n.a.createElement("div",{className:"modal-background",onClick:c}),n.a.createElement("div",{className:"modal-content"},n.a.createElement("div",{className:"message"},n.a.createElement("h1",{className:"message-header is-primary"},t.toLocaleDateString("en-GB",b)),n.a.createElement(d.b,{panelData:r,emptyText:"No events found."}))),n.a.createElement("button",{className:"modal-close is-large","aria-label":"close",onClick:c}))},p=function(e){var t=e.date;return n.a.createElement("p",null,Object(o.b)(t,new Date)?n.a.createElement("img",{className:"pencil-circle",src:"/img/pencil-circle.png",width:"140"}):null,t.toLocaleDateString("en-GB",g))},g={weekday:"short",day:"numeric"},b={weekday:"long",day:"numeric",month:"long",year:"numeric"},w=function(e){var t=e.dateTime,a=e.events,l=new Date(t),r=Object(c.useState)(!1),i=r[0],s=r[1],o=Object(c.useState)(0),d=o[0],u=o[1],h=a.filter((function(e){return e.frontmatter.image})),g=h.length;Object(c.useEffect)((function(){if(g>1){var e=setTimeout((function(){u((d+1)%g)}),4e3);return function(){clearTimeout(e)}}}));var b,w=function(){s(!0)},E=function(){s(!1)};if(0===h.length)b=0===a.length?n.a.createElement(n.a.Fragment,null,n.a.createElement(f,{date:l,close:E,active:i}),n.a.createElement("div",{className:"box button has-text-left calendar-day",onClick:w},n.a.createElement(p,{date:l}))):n.a.createElement(n.a.Fragment,null,n.a.createElement(f,{date:l,events:a,close:E,active:i}),n.a.createElement("div",{className:"box button has-text-left calendar-day has-text-white has-text-weight-bold is-primary-pale",onClick:w},n.a.createElement(v,{events:a,date:l})));else if(1===h.length){var y=h[0];b=n.a.createElement(n.a.Fragment,null,n.a.createElement(f,{date:l,events:a,close:E,active:i}),n.a.createElement("div",{className:"box button has-text-left calendar-day has-text-white has-text-weight-bold",onClick:w,style:{backgroundImage:"url("+m.a.get(y.frontmatter.image,"srcNode.childImageSharp.editedFluid.src",y.frontmatter.image.src)+")"}},n.a.createElement(v,{events:a,date:l})))}else b=n.a.createElement("div",{style:{position:"relative"}},n.a.createElement(f,{date:l,events:a,close:E,active:i}),h.map((function(e,t){return n.a.createElement("div",{key:e.fields.slug,className:"box button has-text-left calendar-day has-text-white has-text-weight-bold",onClick:w,style:{backgroundImage:"url("+m.a.get(e.frontmatter.image,"srcNode.childImageSharp.editedFluid.src",e.frontmatter.image.src)+")",opacity:t===d?1:0,transition:"opacity 0.5s",position:"absolute",width:"100%"}},n.a.createElement(v,{events:a,date:l}))})));return n.a.createElement("div",{className:"column is-half-mobile is-one-quarter-tablet is-2-desktop"},b)},E=a("h8DE"),y=a("6sa9"),x=a("scPP"),N=a("Vi9F"),k=a("WtST");function T(e){return function(e){if(Array.isArray(e)){for(var t=0,a=new Array(e.length);t<e.length;t++)a[t]=e[t];return a}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var D=function(e){var t=e.events;return n.a.createElement(N.a.Consumer,null,(function(e){return n.a.createElement(S,{isPreview:e,previewEventList:t})}))},S=function(e){var t=e.isPreview,a=e.previewEventList,l=Object(c.useState)(new Date),r=l[0],i=l[1],s=Object(k.a)(E.a),m=t?a:Object(x.a)(),o=new Date(r.getFullYear(),r.getMonth()+1,0).getDate(),d=function(e){var t=new Date(r),a=t.getMonth();t.setMonth(a+e),i(t)},u=T(Array(o).keys()).map((function(e){return e+1}));return n.a.createElement(n.a.Fragment,null,n.a.createElement(j,{monthForward:function(){d(1)},monthBack:function(){d(-1)},focusDate:r}),n.a.createElement("div",{className:"calendar panel"},n.a.createElement(y.a,{filterProps:s,withDivider:!0}),n.a.createElement("div",{className:"panel-block"},n.a.createElement("div",{className:"columns is-multiline is-mobile"},u.map((function(e){var t=new Date(r.getFullYear(),r.getMonth(),e);return n.a.createElement(w,{key:e,dateTime:t,events:F(t,Object(y.c)(m,s.activeFilters))})}))))))},j=function(e){var t=e.monthForward,a=e.monthBack,c=e.focusDate;return n.a.createElement("div",{className:"month-scrubber"},n.a.createElement("button",{onClick:a,className:"button is-white"},n.a.createElement("span",{className:"icon has-text-dark is-large"},n.a.createElement(r.b,null))),n.a.createElement("div",{className:"calendar-month"},n.a.createElement("p",{className:"title is-hidden-mobile"},new Date(c).toLocaleDateString("en-GB",{year:"numeric",month:"long"})),n.a.createElement("p",{className:"title is-hidden-tablet"},new Date(c).toLocaleDateString("en-GB",{month:"long"})),n.a.createElement("p",{className:"title is-hidden-tablet"},new Date(c).toLocaleDateString("en-GB",{year:"numeric"}))),n.a.createElement("button",{onClick:t,className:"button is-white"},n.a.createElement("span",{className:"icon has-text-dark is-large"},n.a.createElement(r.c,null))))};function F(e,t){return t.filter((function(t){return Object(o.b)(new Date(t.frontmatter.dateTimeRange.startDateTime),e)}))}var R=a("FK8U");a.d(t,"CalendarPage",(function(){return C})),a.d(t,"query",(function(){return O}));var C=function(e){var t=e.events;return n.a.createElement("section",null,n.a.createElement(R.a,{view:"calendar"}),n.a.createElement(D,{events:t}))},O=(t.default=Object(l.a)(C,{additionalPropsExtractor:function(e){return{events:e.allMarkdownRemark.edges,tabTitle:"Calendar"}},isWide:!0}),"2309489029")},"6sa9":function(e,t,a){"use strict";a.d(t,"a",(function(){return i})),a.d(t,"b",(function(){return s})),a.d(t,"c",(function(){return m}));a("Z2Ku"),a("L9s1"),a("rE2o"),a("ioFf"),a("rGqo"),a("f3/d");var c=a("q1tI"),n=a.n(c),l=function(e){var t=e.name,a=e.remove;return n.a.createElement("a",{className:"tag is-primary is-light",onClick:a},t)},r=function(e){var t=e.name,a=e.add;return n.a.createElement("a",{className:"tag",onClick:a},t)},i=function(e){var t=e.filterProps,a=e.withDivider;return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"filter-block"},n.a.createElement(s,{filterProps:t})),a?n.a.createElement("hr",{className:"filter-block-divider"}):null)},s=function(e){var t=e.filterProps,a=t.allFilters,c=t.activeFilters,i=t.addFilter,s=t.removeFilter,m=t.clearFilters,o=[],d=a,u=Array.isArray(d),h=0;for(d=u?d:d[Symbol.iterator]();;){var v;if(u){if(h>=d.length)break;v=d[h++]}else{if((h=d.next()).done)break;v=h.value}var f=v;c.includes(f)?o.push(n.a.createElement(l,{key:f,name:f,remove:s(f)})):o.push(n.a.createElement(r,{key:f,name:f,add:i(f)}))}return n.a.createElement("span",{className:"tags"},n.a.createElement("span",{className:"tag is-white"},"Filters: "),o,n.a.createElement("a",{className:"tag is-delete",onClick:m}))},m=function(e,t){return e.filter((function(e){return t.every((function(t){return e.frontmatter.eventTypes.includes(t)}))}))}},FK8U:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));var c=a("q1tI"),n=a.n(c),l=a("Wbzz"),r=a("ma3e"),i=function(e){var t=e.view;return n.a.createElement(n.a.Fragment,null,["is-hidden-touch","is-hidden-desktop is-centered"].map((function(e){return n.a.createElement("div",{className:"tabs is-boxed "+e,key:e},n.a.createElement("ul",null,n.a.createElement("li",{className:"calendar"==t?"is-active":""},n.a.createElement(l.a,{to:"/calendar"},n.a.createElement("span",{className:"icon is-small"},n.a.createElement(r.a,null)),n.a.createElement("h1",null,"Calendar"))),n.a.createElement("li",{className:"upcoming"==t?"is-active":""},n.a.createElement(l.a,{to:"/events"},n.a.createElement("span",{className:"icon is-small"},n.a.createElement(r.f,null)),n.a.createElement("h1",null,"Events list")))))})))}},I3Ch:function(e,t,a){"use strict";a.r(t),a.d(t,"EventInfo",(function(){return h})),a.d(t,"generateEventSubtitle",(function(){return f})),a.d(t,"query",(function(){return p}));var c=a("q1tI"),n=a.n(c),l=a("LvDl"),r=a.n(l),i=a("ExEM"),s=a("i8hC"),m=a("XtUg"),o=a("9eCu"),d=a("Vi9F"),u=function(e){var t=e.eventTypes;return t?n.a.createElement("div",{className:"tags"},t.map((function(e){return n.a.createElement("span",{key:e,className:"tag"},e)}))):null},h=function(e){var t=e.image,a=e.slug,c=e.eventTypes,l=e.content,r=e.contentComponent;return n.a.createElement(d.a.Consumer,null,(function(e){return n.a.createElement(v,{isPreview:e,image:t,slug:a,eventTypes:c,content:l,contentComponent:r})}))},v=function(e){var t=e.isPreview,a=e.image,c=e.slug,l=e.eventTypes,m=e.content,o=e.contentComponent||s.b;return n.a.createElement(n.a.Fragment,null,n.a.createElement(u,{eventTypes:l}),!t&&c?n.a.createElement("a",{className:"button event-download-button",href:"/ics"+c.slice(0,-1)+".ics",download:!0},"Add to Calendar"):null,n.a.createElement(i.a,{imageInfo:a?{src:r.a.get(a,"srcNode.childImageSharp.fixedAspect.src",a.src),alt:a.alt}:null}),n.a.createElement(o,{content:m}))},f=function(e,t){void 0===t&&(t=!1);var a=e.markdownRemark.frontmatter.dateTimeRange,c=new Date(a.startDateTime),n=new Date(a.endDateTime),l=Object(o.a)(c,n),r=Object(o.f)(c,{isShort:t,withYear:!l});return a.provideEnd?Object(o.b)(c,n)?r+"–"+n.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"}):r+" – "+Object(o.f)(n,{isShort:t,withYear:!l}):r};t.default=Object(m.a)(h,{additionalPropsExtractor:function(e){return{subtitle:f(e)}},isNarrow:!0});var p="2862034923"},MAan:function(e){e.exports=JSON.parse('{"data":{"allMarkdownRemark":{"nodes":[{"frontmatter":{"title":"Ozymandias","image":{"alt":"Placeholder","srcNode":{"childImageSharp":{"fluid":{"tracedSVG":"data:image/svg+xml,%3csvg%20xmlns=\'http://www.w3.org/2000/svg\'%20width=\'400\'%20height=\'267\'%3e%3crect%20width=\'100%25\'%20height=\'100%25\'%20fill=\'white\'/%3e%3cpath%20d=\'M0%20121v121h7c6-1%206-1%206%201-1%202-1%202%2011%202l16-2c3-1%2019-3%2042-4l19-2%2020-2%2029-1a321%20321%200%200148-4l12-1%2010-2c3-2%204-2%205%200%203%202%204%201%202-3l-1-3%206%202c3%204%2048%200%2046-4l8-1%2012%201a623%20623%200%200124-2c-1-7-1-11%201-11l2%201%205%202c8%201%208%201%208%204s1%204%204%207c4%204%204%204-5%204-10%201-16%202-14%204%202%201%2014%202%2033%202l20%202c9%201%2014%201%2014-2%200-2%201-2%203-1v1c-4%200%200%202%204%202%203%200%203%200%203%205a8461%208461%200%2000-2-141c-1%201-2%201-3-1h-40l-7-1h-16l-2-4-3-15a72%2072%200%2000-6-21l-2-2-5-1-10%203c-5%203-8%204-12%203-3%200-4%200-2%201%201%201%201%201-1%201l-2%201-4%201h-5l3-1%205-2%204-2c1%200%201-1-1-2-3-2-6-3-4-1%201%202%201%202-2%202-4-1-4-1-1-2%201-1%201-1-1-1l-3-3c0-2-1-2-7%200l-13%204-9%204c-6%206-8%206-14%207-10%201-22%204-22%206l-2%201-4%201-6%202c-7%201-10%200-8-3%202-2%201-4-1-4s-2-1-2-3l-1-3-2-2c0-4-1-5-4-5s-3%200-3-3-1-4-3-5-2-2-2-5l-1-4-4-1c-3%200-3%200-3%203l-1%2010-2%2012-2%207-1%209c1%206%201%206-1%206l-35-2H92l-1%202-1%201c0-2-1-2-3-2l-3%201v35a190%20190%200%2001-2%2047l-2-84-2-51V15h2c4%200%207-3%206-6V0H0v121m263-61l-2%201c-3%200-8%205-6%206s0%202-3%201v1l5%202%207%201h12l4-1h2c2%201%207-1%207-3l6-3%201-1h-6l-6%202c-4%200-4%200-2-1l2-1h-7l-3-1h2l1-2-1-1-2-1c-1-1-4%200-6%202l-2%201%201-2-1-2-3%202m48%207h-8c-2%200-4%200-3%201l-3%202-2%202%205%201c5%201%205%204-1%205-5%200-5%200-2%201h10c5%201%205%201%202%201l-4%202h7l3-1c1-1%201-1%202%201l1%203v2c-1%200-1%201%201%202l1%202v1h1l2-1c2%200%201-2-1-3l-1-1c3%200%202-2-2-5-2-3-4-4-5-4-3%200-5-2-3-3%202-2%205-6%205-8h-5m-98%209l-5%201-3%201-5%203-14%208-1%201-3%201-24%2015c-3%202-9%203-13%203-14%202-30%206-36%209-7%204-12%208-11%2010%200%202%202%203%202%201l3-1%202-1c0-2%206-2%2011%200%204%201%206%202%207%201%203-1%209%200%208%201h-2l-1%201%202%201%202%202h2c1-1%201-1%201%201l2%202c4%200%209%204%2011%209%201%203%203%204%203%202l2-1c2%200%202%201%202%206s1%2010%204%2018l4%2014c0%202%200%203%204%203h4l5-1%205-2%204-1%204%201-3-3c-4-2-3-3%201%200h5l1-4c-1-1%200-1%202-2l3-2c1-2%203%200%203%202l1%201%201-2%202-3%201-1-2-3c-2-3-5-5-8-6-4%200-3-1%201-1l4%201%204%201%205%201c1%201%201%201%201-1-1-3%201-4%203-1%201%202%200%204-3%204l-4%204%202%201c2-1%202%200%203%202s2%202%205%201c3-2%204-3%201-5h-2l-2%201c-2-2%203-5%205-4h3c2-1%202-1-1-2-4-2-1-3%206-3%205-1%208-1%2010-3l3-2h-8l-17-3c-12-3-18-3-18-2h-1c-1-1-2%200-5%201-4%202-8%203-5%201h-1l-2-1-3-5-5-7-3-4v-1l-3-6c-3-3-3-5-3-5%202%200%207%206%207%208l2%203%206%208%202%203%201%203c0%201%206%201%208-1%201%200-3-3-5-3s-3-2-4-6-3-6-7-11l-5-6c0-1%204%200%208%203%203%203%204%203%204%201%200-1%201-1%203%201l1%203%201%203c1%203%201%203%203%202l3-2%202-1%204-1%205-2%203-2-1%202v4h1l3-2c2%200%201-2-1-3-2-2-2-3%201-2l2-1%202-2v1c-1%201-1%202%201%202h11l5-1h1l-2%202c-4%200-6%203-3%204%203%200%204%202%203%204-1%201%201%2011%202%2012v-16l2-1c-1-1%200-1%201-1l3%201%201%201h1c1%201%201-1%201-3s2-1%203%201c0%202%200%201%203-1%203-3%206-4%209-2%201%201%200%201-3%201l-4%201c-1%201%205%204%208%204%202%200%202%200-2%202l-4%203%203-1h4c2%200%202%200%200%201-3%201-3%201%200%201l6%201%205%201%204%201%202%201h7c1%202%202%201%206-2l4-3%201-2%202-4%201-2%201-1%202-1h1c0%203%202%202%202-1%200-4-2-9-4-12l-9-7-2-1h-6l-5%202-4-4-12-16c0-3%200-3%203-2%204%201%208%203%2012%207%203%202%204%203%204%201%200-1-3-5-8-8-3-2-18-3-23-2-2%201-3%201-6-2-4-4-6-4-19-5h-11m92%2012l-7%201c-4%200-7%202-5%203v1l-2-1c-3-1-4-1-4%204%201%204%203%205%2012%208a1421%201421%200%200125%208l2%204%203%206c0%203%201%204%203%202l2%201%202%203v-4c0-9-7-29-10-30-2%200-2%200-1-1v-1h-1l-1%201-3%202h-5l-8-1-3-1c0-1%206-2%208-1l2-1-5-1-3-1h4c2%200%202%200%201-1-2-2-3-2-6%200m-191%207l-10%201c0%202%2028%202%2036%200h4l-4-1h-26m76%2011c-5%202-5%205-1%205h7l1-1%202-2c0-3%200-3-3-3l-6%201m-42%208c6%206%208%2013%2012%2041l1%203%201-5a142%20142%200%2000-4-25c-2-7-8-16-11-16l1%202m28%2038c0%201-1%202-2%201l-2%201c0%201%206%206%208%206l4-4c-3-6-7-8-8-4m-8%205l2%202-1%202c-2%202-2%202-1%207%201%204%201%204%204%204%203-1%204-5%201-6-2-1-2-1%200-3l3-2h-3c-2%200-2%200-1-1v-4c-2-3-4-3-4%201M57%20174c0%202-1%202-3%202-3%200-16%205-16%206l5%202c3%201%206%202%209%205l5%203%201%204c0%203%200%203%201%202v-10l-1-4c-1-2-2-3-1-4l1-5c0-2-1-2-1-1m267%2010l-5%201-2%201%2028%202%209%201h5l12-1h12c1-2-2-3-6-3l-14-1c-16-2-35-2-39%200m17%2013l22%203c10%200%2016%201%2020%203s8%201%204-2c-1-2-5-3-17-3a603%20603%200%2001-29-1m-62%203l6%201c3%200%205%200%205%202h-4c-5%200-5%200-3%207l1%204h7l8-2%203-1c2-1%202-1%201-2l-2-2h1l10-1c11%200%2010-2-1-2-7%200-9%200-13%203l-6%201%202-2%201-1h3l2-1-5-1-4-1-1-2a2041%202041%200%2001-11%200m-203%205c-2%202-4%202-9%202l-4%201v1s2%201%202%203c2%202%202%202%202%200s2-3%204-1c0%202%204%201%206-1l8-1%208-1c2-2%204%200%206%205%203%205%203%205%203%200%200-8-2-8-16-10-7%200-8%200-10%202M3%20251c-3%201-3%202-3%205v4l5-1c6%200%208-3%207-6s-4-3-9-2\'%20fill=\'%23ae1414\'%20fill-rule=\'evenodd\'/%3e%3c/svg%3e","aspectRatio":1.5,"src":"/static/ca2de9258ad0b02957977fc3b6aee636/b17c1/ozymandias_rielvp.jpg","srcSet":"/static/ca2de9258ad0b02957977fc3b6aee636/00e5e/ozymandias_rielvp.jpg 200w,\\n/static/ca2de9258ad0b02957977fc3b6aee636/1a903/ozymandias_rielvp.jpg 400w,\\n/static/ca2de9258ad0b02957977fc3b6aee636/b17c1/ozymandias_rielvp.jpg 800w,\\n/static/ca2de9258ad0b02957977fc3b6aee636/2f073/ozymandias_rielvp.jpg 1200w,\\n/static/ca2de9258ad0b02957977fc3b6aee636/48ee2/ozymandias_rielvp.jpg 1600w,\\n/static/ca2de9258ad0b02957977fc3b6aee636/827e9/ozymandias_rielvp.jpg 1620w","sizes":"(max-width: 800px) 100vw, 800px"},"editedFluid":{"tracedSVG":"data:image/svg+xml,%3csvg%20xmlns=\'http://www.w3.org/2000/svg\'%20width=\'400\'%20height=\'267\'%3e%3crect%20width=\'100%25\'%20height=\'100%25\'%20fill=\'white\'/%3e%3cpath%20d=\'M0%20121v121h7c6-1%206-1%206%201s0%202%2011%202l15-2c5-1%2021-3%2044-4l18-2%2020-2a447%20447%200%200066-4l13-1%208-1%2011-2c4-2%204-2%206%200%203%202%203%201%202-2v-3c1-1%204%200%205%201%203%204%2048%200%2046-4h8a119%20119%200%200025%200l11-1v-7c-1-4-1-5%201-5l2%201%206%202c6%200%207%201%207%205%200%201%201%204%204%206l3%204h-6l-9%201c-16%203-6%205%2025%205l21%202c9%201%2014%200%2014-2s2-3%204-1l3%201c1%201%200%201-2%201h-4l4%201h5v5a8454%208454%200%20000-190c0%2044-1%2047-2%2048h-55c0-2-1-2-6-1h-5l-2-6-4-19-3-11c-4-8-8-9-19-4-6%203-8%204-12%203-10-2-12-2-12-4l-1-2h-2l-1-1c-2-2-2-2-12%201s-16%206-16%207c-2%203-6%205-14%206-11%201-20%204-22%206-1%202-9%204-15%204-3%200-3%200-3-3%200-2-1-3-2-3l-2-4-1-3c-2%200-3-3-2-4l-1-2c-3-1-4-1-4%201s0%202-1%201l-1-5c0-4-1-5-3-7-2%200-2-2-2-2%200-2%200-2-2-2l-2-1h2l2-1c1-1%200-2-3-2l-5-1v5c-2%2015-3%2025-5%2027v15l-3-1H90l-6%201v39a200%20200%200%2001-2%2041%20220%20220%200%2001-1-25%208583%208583%200%2000-3-121l4-3c4%200%205-2%204-8V0H0v121m264-62l-4%202c-4%202-7%206-5%207l1%201c0%202%205%203%2011%203l13-1h3l4-1%205-4c5-3%203-4-2-1-5%202-9%202-8-1h-4c-5%200-7-1-5-4%201-1%201-1-1-1l-2%201-1%201c-2%201-2%201-2-1%201-2-2-3-3-1m49%208h-6l-7%201-2%202c-6%200-3%203%203%203%205%200%205%200%204%202-2%202-10%203-11%201l-3-1%201%202c2%202%206%203%2012%202h4c3%200%203%200%202%201-3%201%200%202%204%202%202-1%202-1%203%201%200%202%201%203%202%203v2l-3-1-2-1v1c0%202%207%205%207%204h2l1%203h-1c-1-1-2-1-2%201-1%201-2%201-9-1l-7-2c2%200%203-2%201-2-1-1%200-1%201-1l3%201c-1%201%202%202%203%202%200-1-1-5-3-5-2-1-8%200-7%201s0%201-3%201c-6%200-9%201-8%203s-1%201-2-1c-2-1-2-1-2%201l-1%204%202%204c2%202%2013%206%2014%206l8%202%2010%203c1%200%203%201%203%203l3%204%203%206c0%203%200%204%201%203s2-2%203-1c5%201%201-15-8-34-4-7-10-14-11-13l-3-1-3-1%204-4c3-4%204-7%202-7l-2%201m-99%209l-6%201-8%204a919%20919%200%2001-15%209c-3%203-21%2014-27%2016-4%202-11%203-17%204-16%202-28%205-33%209-10%206-14%2011-11%2011%202%200%203-2%202-2-1-1%200-1%202-1l3%201%201%201v-1c-2-3%206-3%2011-1%203%201%205%202%208%201l4%201%202%202%201%203v2l1-2h2l4%202%202%202%202%201c2%200%207%205%207%208s2%202%202-1v-2l1%202%201%203v-3c0-5%202%201%202%207s2%2012%204%2019a51%2051%200%20013%207c2%205%202%205%200%204l-2%201%201%201%202%201c2%202%206%201%2018-2%204-1%207-3%204-3l-1-1h3c3%202%206%201%206-2%200-2%201-3%203-3l2-2%202-1%201%202%201%201%201-2%201-2c3-1-3-9-8-10l-3-1%204%201c13%201%2015%202%2011%206-2%202-2%202%200%203%203%200%206%202%205%203h-3c-3-1-4%200-2%202%203%203%2013-2%2011-5-1-3-3-3-2-1%200%202%200%202-1%201-3-2%200-7%203-5h3c1%200%201-1-1-2-3-1-2-3%202-3h2l5-1c5%200%2010-2%2010-4l-8-1-14-1c-14-4-24-4-28-1l-4%201%201-3%203-2c3-1%201-4-3-4l-2-1c-3-8-4-10-9-15l-5-6c0-2%205-1%208%201%201%202%204%203%204%202%202%200%205%204%205%207l2%202%201-2v-2l2%202%205%202c2%200%202%200%201-1-3-1-2-3%201-2l2-1c0-3%203-2%205%200h4l5-1h2c3-1%200-2-5-2-7%200-8%200-6-1l4-1c2%200%203%200%202-1%200-2%200-2%202-2%201%200%202%200%201-1l4-1%209%201h4l-3%201-6%201c-4-1-10%201-7%203l3-1%204-1%206%201h3l-4%201c-4%201-5%203-2%203l3%201%205%201c3%200%203%200%201-1s-2-1-1-2l2-2c0-1%200-2%201-1l1%202c-1%202%200%203%201%201v1l1%203%201-2%201-4c2-1%202-1%202%202l1%205%201-3c0-3%200-4%202-4l1%201c-1%201%204%204%207%204%202%200%202%200%201%202l-5%201-2%201h6c3%200%204%200%202%201l-3%201h6l2%201c1%201%2016%204%2018%203h4c2%201%202%201%203-2l3-3%203-4c0-4%200-4%201-2%201%201%201%201%201-1s0-2%202-2c3%201%204-1%204-4l-1-5c-1-3-7-9-11-11l-3-2h-6l-6%201-5-5a58%2058%200%2001-9-12v-4c2-1%2010%203%2014%207l4%202c0-2-4-6-8-9-3-2-19-3-23-2-3%201-3%201-6-2-5-5-19-7-29-5M114%2095l-10%201c0%202%203%202%2017%201%2018%200%2028-2%2016-2h-23m77%2011c-4%202-5%203-4%205%202%202%2012-1%2012-3%200-3-4-3-8-2m-41%2011c3%203%204%205%204%209l3%208%202%2011c0%2010%201%2014%202%2014a498%20498%200%2001-2-29c-1-4-5-12-8-15-5-5-6-4-1%202m16%206l3%205c2%203%203%206%201%206s-2%205%200%206c4%203%205%202%202-1l-1-4c1-1%201%200%204%203%206%2010%209%2014%2010%2013s-16-27-18-28h-1m11%2028l-3%202c-2-2-6%201-6%204-2%205-2%209-1%209l2%203c0%202%201%203%203%203%203%200%204-3%201-5v-6l-1-7%204%203%205%203c2-1%203-6%200-9l-2-2-2%202M43%20179c-6%203-6%203%200%205%207%202%2015%208%2015%2013l1%202v-7l-1-3c1-1%200-4-1-5v-4c4-4-6-5-14-1m279%205l-5%202a2450%202450%200%200066%202c1-2-2-3-6-3l-14-1c-15-2-34-2-41%200m19%2013c1%201%2010%202%2022%202l10%201%203%201%206%202c5%202%209%201%205-2-2-3-4-3-16-3a525%20525%200%2001-30-1m-59%209l2%207c0%201%2012%201%2017-2%203-1%203-1%201-3s-6-2-8%200h-2c0-2%202-3%205-3l2-1-7-1-9-1-1%204m-205-1l-9%202c-5%201-10%202-6%202l3%202%201%202%201-2c1-2%201-2%203-1%202%202%204%202%208%201l5-2%203-1h11l2%203%201%203%201%204c2%201%202%201%201-3-1-8-1-9-4-10l-11-2c-7%200-8%200-10%202M5%20251H0v5c0%204%200%204%203%204l6-2%203-1v-2c1-3-1-5-7-4\'%20fill=\'%23ae1414\'%20fill-rule=\'evenodd\'/%3e%3c/svg%3e","aspectRatio":1.5,"src":"/static/ca2de9258ad0b02957977fc3b6aee636/9cebd/ozymandias_rielvp.jpg","srcSet":"/static/ca2de9258ad0b02957977fc3b6aee636/faf93/ozymandias_rielvp.jpg 200w,\\n/static/ca2de9258ad0b02957977fc3b6aee636/0aeaf/ozymandias_rielvp.jpg 400w,\\n/static/ca2de9258ad0b02957977fc3b6aee636/9cebd/ozymandias_rielvp.jpg 800w,\\n/static/ca2de9258ad0b02957977fc3b6aee636/cc138/ozymandias_rielvp.jpg 1200w,\\n/static/ca2de9258ad0b02957977fc3b6aee636/91eac/ozymandias_rielvp.jpg 1600w,\\n/static/ca2de9258ad0b02957977fc3b6aee636/f2605/ozymandias_rielvp.jpg 1620w","sizes":"(max-width: 800px) 100vw, 800px"},"fixedAspect":{"src":"/static/ca2de9258ad0b02957977fc3b6aee636/1264d/ozymandias_rielvp.jpg"}}},"shouldDisplay":true},"eventTypes":["Band competition"],"dateTimeRange":{"startDateTime":"2020-06-01T12:00:00.000Z","endDateTime":null,"provideEnd":false}},"html":"<h2>By Percy Shelley</h2>\\n<p>I met a traveller from an antique land,<br>\\nWho said—“Two vast and trunkless legs of stone<br>\\nStand in the desert. . . . Near them, on the sand,<br>\\nHalf sunk a shattered visage lies, whose frown,<br>\\nAnd wrinkled lip, and sneer of cold command,<br>\\nTell that its sculptor well those passions read<br>\\nWhich yet survive, stamped on these lifeless things,<br>\\nThe hand that mocked them, and the heart that fed;<br>\\nAnd on the pedestal, these words appear:<br>\\nMy name is Ozymandias, King of Kings;<br>\\nLook on my Works, ye Mighty, and despair!<br>\\nNothing beside remains. Round the decay<br>\\nOf that colossal Wreck, boundless and bare<br>\\nThe lone and level sands stretch far away.”</p>","excerpt":"<h2>By Percy Shelley</h2>\\n<p>I met a traveller from an antique land,<br>\\nWho said—“Two vast and trunkless legs of stone<br>\\nStand in the desert. . . . Near them, on the sand,<br>\\nHalf sunk a shattered visage lies, whose…</p>","fields":{"slug":"/events/ozymandias/"}},{"frontmatter":{"title":"Virtual Strawberry Fair","image":{"alt":"Cambridge 105 logo","srcNode":{"childImageSharp":{"fluid":{"tracedSVG":"data:image/svg+xml,%3csvg%20xmlns=\'http://www.w3.org/2000/svg\'%20width=\'400\'%20height=\'300\'%3e%3crect%20width=\'100%25\'%20height=\'100%25\'%20fill=\'white\'/%3e%3cpath%20d=\'M0%20150v150h401V0H0v150m314-60c-2%201-3%206-1%208%203%203%2010-1%208-5-1-3-4-5-7-3m-17%2010c-4%202-6%208-6%2011%203%2010%2015%2011%2020%203%204-9-6-18-14-14m-147%2020c0%2013%200%2015%202%2015l1-2%203%201c7%206%2018-1%2018-11%200-9-12-14-19-9-2%201-2%201-2-4l-1-6c-2%200-2%202-2%2016m71-10c0%205%200%205-2%204-7-5-19%200-19%209%200%2010%2011%2017%2018%2011l3-1%202%202%201-15-1-16c-2%200-2%201-2%206m-91%203c-3%202-4%202-5%200h-12l-1-1c-2%200-2%202-2%2012%200%209%200%2011%202%2011l1-8c0-9%201-12%206-12s6%201%206%2011c0%208%200%209%202%209s2-1%202-8c0-10%201-12%207-12%204%200%205%202%205%2012%200%206%200%208%202%208s2-18-1-21c-4-3-7-3-12-1m-74%202c-7%208-2%2021%2010%2021%203%200%209-4%2010-6%200-3-2-2-5%201-8%206-18-3-14-11%203-5%2010-7%2014-3%204%203%206%203%205%200-4-6-14-7-20-2m28%200c-10%2010%202%2026%2014%2020l3-1%202%201c2%200%202-1%202-11%200-11%200-12-2-12l-2%202h-2c-4-3-12-2-15%201m94%209c0%2010%200%2011%202%2011s2-1%202-9%200-8%203-10l3-3h-6l-2-1c-2%200-2%201-2%2012m14%200c0%209%200%2011%202%2011l1-11-1-12c-2%200-2%202-2%2012m43-10c-7%203-7%2016%200%2020%205%203%2014%202%2014-1l1-1c1%200-1%206-3%208-3%202-9%201-11-2-4-4-7-2-4%202%203%203%209%205%2013%204%208-2%209-5%209-20%200-12%200-12-2-12s-2%200-2%202l-2-1c-3-1-10-1-13%201m27%201l-4%205c-3%2013%2014%2022%2022%2011%203-4%200-4-4%200-5%203-11%202-14-3l-1-3h21v-3c0-9-14-14-20-7m-175%202c-5%204-4%2012%201%2015%204%202%206%201%2010-2%209-7-2-20-11-13m68%200c-5%206%200%2017%208%2016%2011-2%2010-18-1-18l-7%202m52-1c-7%205-4%2015%204%2017%208%201%2013-10%208-16-3-2-9-3-12-1m28%201c-6%207%202%2019%2010%2015%204-2%205-4%205-9%200-7-9-11-15-6m29%200c-4%204-3%205%207%205%209%200%209%200%206-4-4-4-10-4-13-1m48%208c-10%205-6%2020%205%2020s14-15%203-20h-8m22%200c-2%201-3%206-1%208s6%201%207-1c2-3%202-4%200-6s-4-2-6-1M57%20152c-5%201-5%205-1%204h3v17c0%2016%201%2018%202%2018%202%200%202-1%202-20%200-22%201-21-6-19m28%200c-18%204-22%2028-6%2036%2017%209%2035-8%2027-26-3-6-12-12-18-11l-3%201m33%201c-4%2016-4%2021%202%2017%209-7%2020%207%2012%2015-5%204-14%202-15-5l-3-2c-2%200-2%202%201%207%204%209%2018%208%2022-1%205-10-2-21-13-20l-5%201%201-5%201-5h8c6%200%207%200%207-2%200-1-2-2-9-2-9%200-9%200-9%202m115-1l-1%207v6l-4-2c-16-9-31%2014-16%2025%205%204%2019%203%2019-1l1%201%202%203c2%200%202-2%202-20%200-20%200-22-3-19m79%203l-4%204c-6%208%203%2019%2012%2015%2012-6%204-24-8-19m-229%201c-9%204-12%2014-8%2023%205%2011%2021%2011%2027%200%207-13-6-29-19-23m78%207h-2l-2-1c-2%200-2%201-2%2015%200%2013%200%2014%202%2014%201%200%202-2%202-11%200-10%201-11%203-13l4-2%201-2c0-2-3-3-6%200m16%200c-8%205-10%2014-5%2021%205%208%2018%209%2023%203%201-1%201%200%201%201%200%202%200%203%202%203s2-1%202-14c0-14%200-15-2-15l-2%202v2l-2-2c-4-4-12-4-17-1m83%200c-14%207-8%2028%207%2028%209%200%2015-6%2015-14%200-12-11-19-22-14m-17%2014c0%2013%200%2014%202%2014%201%200%202-2%202-15s0-14-2-14-2%201-2%2015m-64-11c-4%203-6%2010-4%2015%203%207%2012%208%2017%203%2010-9-1-24-13-18m36%200c-6%204-7%2013-2%2018%207%207%2019%202%2019-8%200-8-10-14-17-10m46%201c-9%207-4%2020%206%2020%207%200%2011-4%2011-11%200-9-10-14-17-9m71%201v5c3%204%209%202%209-3s-6-7-9-2m-35%2012c-10%205-6%2020%205%2020s14-15%203-20h-8m16%2021c-3%203-2%208%203%208s7-5%203-8c-3-2-4-2-6%200\'%20fill=\'%23ae1414\'%20fill-rule=\'evenodd\'/%3e%3c/svg%3e","aspectRatio":1.3333333333333333,"src":"/static/ed3483474dd397908c644f3df60babd3/a54c6/Radio105_y5fm3e.png","srcSet":"/static/ed3483474dd397908c644f3df60babd3/59beb/Radio105_y5fm3e.png 200w,\\n/static/ed3483474dd397908c644f3df60babd3/c0bbd/Radio105_y5fm3e.png 400w,\\n/static/ed3483474dd397908c644f3df60babd3/a54c6/Radio105_y5fm3e.png 800w,\\n/static/ed3483474dd397908c644f3df60babd3/273c9/Radio105_y5fm3e.png 900w","sizes":"(max-width: 800px) 100vw, 800px"},"editedFluid":{"tracedSVG":"data:image/svg+xml,%3csvg%20xmlns=\'http://www.w3.org/2000/svg\'%20width=\'400\'%20height=\'300\'%3e%3crect%20width=\'100%25\'%20height=\'100%25\'%20fill=\'white\'/%3e%3cpath%20d=\'M0%20150v150h401V0H0v150m314-60c-2%201-3%206-1%208%203%203%2010-1%208-5-1-3-4-5-7-3m-17%2010c-4%202-6%208-6%2011%203%2010%2015%2011%2020%203%204-9-6-18-14-14m-147%2020c0%2013%200%2015%202%2015l1-2%203%201c7%206%2018-1%2018-11%200-9-12-14-19-9-2%201-2%201-2-4l-1-6c-2%200-2%202-2%2016m71-10c0%205%200%205-2%204-7-5-19%200-19%209%200%2010%2011%2017%2018%2011l3-1%202%202%201-15-1-16c-2%200-2%201-2%206m-91%203c-3%202-4%202-5%200h-12l-1-1c-2%200-2%202-2%2012%200%209%200%2011%202%2011l1-8c0-9%201-12%206-12s6%201%206%2011c0%208%200%209%202%209s2-1%202-8c0-10%201-12%207-12%204%200%205%202%205%2012%200%206%200%208%202%208s2-18-1-21c-4-3-7-3-12-1m-74%202c-7%208-2%2021%2010%2021%203%200%209-4%2010-6%200-3-2-2-5%201-8%206-18-3-14-11%203-5%2010-7%2014-3%204%203%206%203%205%200-4-6-14-7-20-2m28%200c-10%2010%202%2026%2014%2020l3-1%202%201c2%200%202-1%202-11%200-11%200-12-2-12l-2%202h-2c-4-3-12-2-15%201m94%209c0%2010%200%2011%202%2011s2-1%202-9%200-8%203-10l3-3h-6l-2-1c-2%200-2%201-2%2012m14%200c0%209%200%2011%202%2011l1-11-1-12c-2%200-2%202-2%2012m43-10c-7%203-7%2016%200%2020%205%203%2014%202%2014-1l1-1c1%200-1%206-3%208-3%202-9%201-11-2-4-4-7-2-4%202%203%203%209%205%2013%204%208-2%209-5%209-20%200-12%200-12-2-12s-2%200-2%202l-2-1c-3-1-10-1-13%201m27%201l-4%205c-3%2013%2014%2022%2022%2011%203-4%200-4-4%200-5%203-11%202-14-3l-1-3h21v-3c0-9-14-14-20-7m-175%202c-5%204-4%2012%201%2015%204%202%206%201%2010-2%209-7-2-20-11-13m68%200c-5%206%200%2017%208%2016%2011-2%2010-18-1-18l-7%202m52-1c-7%205-4%2015%204%2017%208%201%2013-10%208-16-3-2-9-3-12-1m28%201c-6%207%202%2019%2010%2015%204-2%205-4%205-9%200-7-9-11-15-6m29%200c-4%204-3%205%207%205%209%200%209%200%206-4-4-4-10-4-13-1m48%208c-10%205-6%2020%205%2020s14-15%203-20h-8m22%200c-2%201-3%206-1%208s6%201%207-1c2-3%202-4%200-6s-4-2-6-1M57%20152c-5%201-5%205-1%204h3v17c0%2016%201%2018%202%2018%202%200%202-1%202-20%200-22%201-21-6-19m28%200c-18%204-22%2028-6%2036%2017%209%2035-8%2027-26-3-6-12-12-18-11l-3%201m33%201c-4%2016-4%2021%202%2017%209-7%2020%207%2012%2015-5%204-14%202-15-5l-3-2c-2%200-2%202%201%207%204%209%2018%208%2022-1%205-10-2-21-13-20l-5%201%201-5%201-5h8c6%200%207%200%207-2%200-1-2-2-9-2-9%200-9%200-9%202m115-1l-1%207v6l-4-2c-16-9-31%2014-16%2025%205%204%2019%203%2019-1l1%201%202%203c2%200%202-2%202-20%200-20%200-22-3-19m79%203l-4%204c-6%208%203%2019%2012%2015%2012-6%204-24-8-19m-229%201c-9%204-12%2014-8%2023%205%2011%2021%2011%2027%200%207-13-6-29-19-23m78%207h-2l-2-1c-2%200-2%201-2%2015%200%2013%200%2014%202%2014%201%200%202-2%202-11%200-10%201-11%203-13l4-2%201-2c0-2-3-3-6%200m16%200c-8%205-10%2014-5%2021%205%208%2018%209%2023%203%201-1%201%200%201%201%200%202%200%203%202%203s2-1%202-14c0-14%200-15-2-15l-2%202v2l-2-2c-4-4-12-4-17-1m83%200c-14%207-8%2028%207%2028%209%200%2015-6%2015-14%200-12-11-19-22-14m-17%2014c0%2013%200%2014%202%2014%201%200%202-2%202-15s0-14-2-14-2%201-2%2015m-64-11c-4%203-6%2010-4%2015%203%207%2012%208%2017%203%2010-9-1-24-13-18m36%200c-6%204-7%2013-2%2018%207%207%2019%202%2019-8%200-8-10-14-17-10m46%201c-9%207-4%2020%206%2020%207%200%2011-4%2011-11%200-9-10-14-17-9m71%201v5c3%204%209%202%209-3s-6-7-9-2m-35%2012c-10%205-6%2020%205%2020s14-15%203-20h-8m16%2021c-3%203-2%208%203%208s7-5%203-8c-3-2-4-2-6%200\'%20fill=\'%23ae1414\'%20fill-rule=\'evenodd\'/%3e%3c/svg%3e","aspectRatio":1.3333333333333333,"src":"/static/ed3483474dd397908c644f3df60babd3/61a1f/Radio105_y5fm3e.png","srcSet":"/static/ed3483474dd397908c644f3df60babd3/e5588/Radio105_y5fm3e.png 200w,\\n/static/ed3483474dd397908c644f3df60babd3/c6422/Radio105_y5fm3e.png 400w,\\n/static/ed3483474dd397908c644f3df60babd3/61a1f/Radio105_y5fm3e.png 800w,\\n/static/ed3483474dd397908c644f3df60babd3/d4dca/Radio105_y5fm3e.png 900w","sizes":"(max-width: 800px) 100vw, 800px"},"fixedAspect":{"src":"/static/ed3483474dd397908c644f3df60babd3/b6193/Radio105_y5fm3e.png"}}},"shouldDisplay":true},"eventTypes":["Other"],"dateTimeRange":{"startDateTime":"2020-06-06T10:00:32.989Z","endDateTime":null,"provideEnd":null}},"html":"<p>Strawberries coming at you across the airwaves and through the interpipes. </p>\\n<p>Join us for a special 12 hour long broadcast on Cambridge 105 Radio, showcasing all the areas and a lot of the acts that had been booked to play at this years Strawberry Fair. <a href=\\"/news/2020-04-18-virtual-strawberry-fair-broadcast/\\">Read the full announcement here</a>.</p>","excerpt":"<p>Strawberries coming at you across the airwaves and through the interpipes. </p>\\n<p>Join us for a special 12 hour long broadcast on Cambridge 105 Radio…</p>","fields":{"slug":"/events/2020-04-18-virtual-strawberry-fair/"}},{"frontmatter":{"title":"The Millenium","image":null,"eventTypes":["Meeting - Programming"],"dateTimeRange":{"startDateTime":"3000-01-01T00:00:00.000Z","endDateTime":"4000-01-01T00:00:00.000Z","provideEnd":true}},"html":"<p>The glorious 3000s! Come join us in experiencing these hopeful thousand years!</p>","excerpt":"<p>The glorious 3000s! Come join us in experiencing these hopeful thousand years!</p>","fields":{"slug":"/events/millenium/"}}]}}}')},WtST:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var c=a("q1tI"),n=function(e){var t=Object(c.useState)([]),a=t[0],n=t[1];return{allFilters:e,activeFilters:a,addFilter:function(e){return function(){n(a.concat(e))}},removeFilter:function(e){return function(){n(a.filter((function(t){return t!==e})))}},clearFilters:function(){n([])}}}},baAH:function(e,t,a){"use strict";a.d(t,"b",(function(){return o})),a.d(t,"a",(function(){return u}));var c=a("q1tI"),n=a.n(c),l=a("Wbzz"),r=a("LvDl"),i=a.n(r),s=a("ExEM"),m=a("i8hC"),o=function(e){var t=e.panelData,a=e.emptyText,c=e.isViewportWidthDesktop;return n.a.createElement("div",{className:"xpanel-block"},p(t,a).map((function(e,t){return n.a.createElement("div",{key:t,className:"xpanel-background "+(c?"is-viewport-width":"")},n.a.createElement("section",{className:"section section-root"},n.a.createElement("div",{className:"container wide-container"},e)))})))},d=function(e){var t=e.text;return n.a.createElement("div",{className:"xpanel"},t)},u=function(e){var t=e.image,a=e.slug,c=e.title,l=e.subtitle,r=e.mobileSubtitle,i=e.excerpt,s=n.a.createElement(h,{image:t}),m=n.a.createElement(v,{slug:a,title:c,subtitle:l,mobileSubtitle:r}),o=n.a.createElement(f,{excerpt:i});return n.a.createElement("div",{className:"xpanel"},n.a.createElement("div",{className:"xpanel-header"},m),n.a.createElement("div",{className:"xpanel-image"},s),n.a.createElement("div",{className:"xpanel-excerpt"},o))},h=function(e){var t=e.image;if(t){var a={alt:t.alt,src:i.a.get(t,"srcNode.childImageSharp.fixedAspect.src",t.src)};return n.a.createElement(s.a,{imageInfo:a})}return null},v=function(e){var t=e.slug,a=e.title,c=e.subtitle,r=e.mobileSubtitle;return n.a.createElement(l.a,{to:t},n.a.createElement("h2",{className:"title is-4 upcoming-title"},n.a.createElement("strong",null,a)),n.a.createElement("h3",{className:"subtitle is-6 upcoming-subtitle is-hidden-mobile"},n.a.createElement("strong",null,c)),n.a.createElement("h3",{className:"subtitle is-6 upcoming-subtitle is-hidden-tablet"},n.a.createElement("strong",null,r||c)))},f=function(e){var t=e.excerpt;return n.a.createElement(m.c,{content:t})},p=function(e,t){return e.length>0?e.map((function(e,t){return n.a.createElement(u,{image:e.image,slug:e.slug,title:e.title,subtitle:e.subtitle,mobileSubtitle:e.mobileSubtitle,excerpt:e.excerpt,key:t})})):[n.a.createElement(d,{key:"1",text:t||""})]}},h8DE:function(e,t,a){"use strict";a.d(t,"a",(function(){return c}));var c=["Benefit gig","Meeting - Programming","Meeting - Finance","Band competition","Other"]},oIpN:function(e,t,a){"use strict";a.d(t,"a",(function(){return h})),a.d(t,"b",(function(){return f}));var c=a("q1tI"),n=a.n(c),l=a("baAH"),r=(a("2rJu"),a("6sa9")),i=a("h8DE"),s=a("scPP"),m=a("Vi9F"),o=a("WtST"),d=a("9eCu"),u=a("I3Ch"),h=function(e){var t=e.events;return n.a.createElement(m.a.Consumer,null,(function(e){return n.a.createElement(v,{isPreview:e,previewEventList:t})}))},v=function(e){var t=e.isPreview,a=e.previewEventList,c=Object(o.a)(i.a),m=t?a:Object(s.a)();m=m.filter((function(e){return Object(d.d)(new Date,new Date(e.frontmatter.dateTimeRange.provideEnd?e.frontmatter.dateTimeRange.endDateTime:e.frontmatter.dateTimeRange.startDateTime))}));var u=Object(r.c)(m,c.activeFilters).slice(0,5).map((function(e){return f(e)}));return n.a.createElement(n.a.Fragment,null,n.a.createElement("h1",{className:"title"},"Upcoming Events"),n.a.createElement("div",null,n.a.createElement(r.a,{filterProps:c,withDivider:!1}),n.a.createElement(l.b,{panelData:u,emptyText:"No events match the selected filters.",isViewportWidthDesktop:!0})))},f=function(e){return{image:e.frontmatter.image,slug:e.fields.slug,title:e.frontmatter.title,subtitle:Object(u.generateEventSubtitle)({markdownRemark:e},!1),mobileSubtitle:Object(u.generateEventSubtitle)({markdownRemark:e},!0),excerpt:e.excerpt}}},scPP:function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));a("Vd3H");var c=a("MAan"),n=a("9eCu"),l=function(){return c.data.allMarkdownRemark.nodes.sort((function(e,t){var a=e.frontmatter.dateTimeRange,c=t.frontmatter.dateTimeRange,l=new Date(a.startDateTime),r=new Date(c.startDateTime);if(Object(n.c)(l,r)){if(a.provideEnd){var i=new Date(a.endDateTime);return c.provideEnd?i-new Date(c.endDateTime):1}return c.provideEnd?-1:0}return 0}))}}}]);
//# sourceMappingURL=component---src-templates-calendar-page-jsx-26172e922d18c4d0b84a.js.map