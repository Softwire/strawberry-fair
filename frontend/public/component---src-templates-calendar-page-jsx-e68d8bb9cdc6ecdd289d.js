(window.webpackJsonp=window.webpackJsonp||[]).push([[4,6],{"4w2Y":function(e,t,a){"use strict";a.r(t);var c=a("q1tI"),l=a.n(c),n=a("XtUg"),r=(a("XfO3"),a("HEwt"),a("a1Th"),a("rE2o"),a("ioFf"),a("rGqo"),a("yt8O"),a("Btvt"),a("ma3e")),i=a("Wbzz"),s=a("LvDl"),m=a.n(s),o=(a("2rJu"),a("9eCu")),u=a("baAH"),d=a("oIpN"),v=function(e){var t=e.slug,a=e.title;return l.a.createElement("p",null,l.a.createElement(i.a,{className:"has-text-white has-text-weight-medium calendar-day-text",to:t},a))},h=function(e){var t=e.events,a=e.date;return l.a.createElement(l.a.Fragment,null,l.a.createElement(p,{date:a}),t.slice(0,3).map((function(e){return l.a.createElement(v,{slug:e.fields.slug,title:e.frontmatter.title,key:e.frontmatter.title})})),t.length>3?l.a.createElement("p",null,"..."):null)},f=function(e){var t=e.date,a=e.events,c=e.close,n=e.active,r=a?a.map((function(e){return Object(d.b)(e)})):[];return l.a.createElement("div",{className:"modal "+(n?"is-active":"")},l.a.createElement("div",{className:"modal-background",onClick:c}),l.a.createElement("div",{className:"modal-content"},l.a.createElement("div",{className:"message"},l.a.createElement("h1",{className:"message-header is-primary"},t.toLocaleDateString("en-GB",b)),l.a.createElement(u.b,{panelData:r,emptyText:"No events found."}))),l.a.createElement("button",{className:"modal-close is-large","aria-label":"close",onClick:c}))},p=function(e){var t=e.date;return l.a.createElement("p",null,Object(o.b)(t,new Date)?l.a.createElement("img",{className:"pencil-circle",src:"/img/pencil-circle.png",width:"140"}):null,t.toLocaleDateString("en-GB",g))},g={weekday:"short",day:"numeric"},b={weekday:"long",day:"numeric",month:"long",year:"numeric"},E=function(e){var t=e.dateTime,a=e.events,n=new Date(t),r=Object(c.useState)(!1),i=r[0],s=r[1],o=Object(c.useState)(0),u=o[0],d=o[1],v=a.filter((function(e){return e.frontmatter.image})),g=v.length;Object(c.useEffect)((function(){if(g>1){var e=setTimeout((function(){d((u+1)%g)}),4e3);return function(){clearTimeout(e)}}}));var b,E=function(){s(!0)},w=function(){s(!1)};if(0===v.length)b=0===a.length?l.a.createElement(l.a.Fragment,null,l.a.createElement(f,{date:n,close:w,active:i}),l.a.createElement("div",{className:"box button has-text-left calendar-day",onClick:E},l.a.createElement(p,{date:n}))):l.a.createElement(l.a.Fragment,null,l.a.createElement(f,{date:n,events:a,close:w,active:i}),l.a.createElement("div",{className:"box button has-text-left calendar-day has-text-white has-text-weight-bold is-primary-pale",onClick:E},l.a.createElement(h,{events:a,date:n})));else if(1===v.length){var x=v[0];b=l.a.createElement(l.a.Fragment,null,l.a.createElement(f,{date:n,events:a,close:w,active:i}),l.a.createElement("div",{className:"box button has-text-left calendar-day has-text-white has-text-weight-bold",onClick:E,style:{backgroundImage:"url("+m.a.get(x.frontmatter.image,"srcNode.childImageSharp.editedFluid.src",x.frontmatter.image.src)+")"}},l.a.createElement(h,{events:a,date:n})))}else b=l.a.createElement("div",{style:{position:"relative"}},l.a.createElement(f,{date:n,events:a,close:w,active:i}),v.map((function(e,t){return l.a.createElement("div",{key:e.fields.slug,className:"box button has-text-left calendar-day has-text-white has-text-weight-bold",onClick:E,style:{backgroundImage:"url("+m.a.get(e.frontmatter.image,"srcNode.childImageSharp.editedFluid.src",e.frontmatter.image.src)+")",opacity:t===u?1:0,transition:"opacity 0.5s",position:"absolute",width:"100%"}},l.a.createElement(h,{events:a,date:n}))})));return l.a.createElement("div",{className:"column is-half-mobile is-one-quarter-tablet is-2-desktop"},b)},w=a("h8DE"),x=a("6sa9"),y=a("scPP"),N=a("Vi9F"),k=a("WtST");function j(e){return function(e){if(Array.isArray(e)){for(var t=0,a=new Array(e.length);t<e.length;t++)a[t]=e[t];return a}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var D=function(e){var t=e.events;return l.a.createElement(N.a.Consumer,null,(function(e){return l.a.createElement(T,{isPreview:e,previewEventList:t})}))},T=function(e){var t=e.isPreview,a=e.previewEventList,n=Object(c.useState)(new Date),r=n[0],i=n[1],s=Object(k.a)(w.a),m=t?a:Object(y.a)(),o=new Date(r.getFullYear(),r.getMonth()+1,0).getDate(),u=function(e){var t=new Date(r),a=t.getMonth();t.setMonth(a+e),i(t)},d=j(Array(o).keys()).map((function(e){return e+1}));return l.a.createElement(l.a.Fragment,null,l.a.createElement(S,{monthForward:function(){u(1)},monthBack:function(){u(-1)},focusDate:r}),l.a.createElement("div",{className:"calendar panel"},l.a.createElement(x.a,{filterProps:s,withDivider:!0}),l.a.createElement("div",{className:"panel-block"},l.a.createElement("div",{className:"columns is-multiline is-mobile"},d.map((function(e){var t=new Date(r.getFullYear(),r.getMonth(),e);return l.a.createElement(E,{key:e,dateTime:t,events:F(t,Object(x.c)(m,s.activeFilters))})}))))))},S=function(e){var t=e.monthForward,a=e.monthBack,c=e.focusDate;return l.a.createElement("div",{className:"month-scrubber"},l.a.createElement("button",{onClick:a,className:"button is-white"},l.a.createElement("span",{className:"icon has-text-dark is-large"},l.a.createElement(r.b,null))),l.a.createElement("div",{className:"calendar-month"},l.a.createElement("p",{className:"title is-hidden-mobile"},new Date(c).toLocaleDateString("en-GB",{year:"numeric",month:"long"})),l.a.createElement("p",{className:"title is-hidden-tablet"},new Date(c).toLocaleDateString("en-GB",{month:"long"})),l.a.createElement("p",{className:"title is-hidden-tablet"},new Date(c).toLocaleDateString("en-GB",{year:"numeric"}))),l.a.createElement("button",{onClick:t,className:"button is-white"},l.a.createElement("span",{className:"icon has-text-dark is-large"},l.a.createElement(r.c,null))))};function F(e,t){return t.filter((function(t){return Object(o.b)(new Date(t.frontmatter.dateTimeRange.startDateTime),e)}))}var C=a("FK8U");a.d(t,"CalendarPage",(function(){return O})),a.d(t,"query",(function(){return P}));var O=function(e){var t=e.events;return l.a.createElement("section",null,l.a.createElement(C.a,{view:"calendar"}),l.a.createElement(D,{events:t}))},P=(t.default=Object(n.a)(O,{additionalPropsExtractor:function(e){return{events:e.allMarkdownRemark.edges,tabTitle:"Calendar"}},isWide:!0}),"2309489029")},"6sa9":function(e,t,a){"use strict";a.d(t,"a",(function(){return i})),a.d(t,"b",(function(){return s})),a.d(t,"c",(function(){return m}));a("Z2Ku"),a("L9s1"),a("rE2o"),a("ioFf"),a("rGqo"),a("f3/d");var c=a("q1tI"),l=a.n(c),n=function(e){var t=e.name,a=e.remove;return l.a.createElement("a",{className:"tag is-primary is-light",onClick:a},t)},r=function(e){var t=e.name,a=e.add;return l.a.createElement("a",{className:"tag",onClick:a},t)},i=function(e){var t=e.filterProps,a=e.withDivider;return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"filter-block"},l.a.createElement(s,{filterProps:t})),a?l.a.createElement("hr",{className:"filter-block-divider"}):null)},s=function(e){var t=e.filterProps,a=t.allFilters,c=t.activeFilters,i=t.addFilter,s=t.removeFilter,m=t.clearFilters,o=[],u=a,d=Array.isArray(u),v=0;for(u=d?u:u[Symbol.iterator]();;){var h;if(d){if(v>=u.length)break;h=u[v++]}else{if((v=u.next()).done)break;h=v.value}var f=h;c.includes(f)?o.push(l.a.createElement(n,{key:f,name:f,remove:s(f)})):o.push(l.a.createElement(r,{key:f,name:f,add:i(f)}))}return l.a.createElement("span",{className:"tags"},l.a.createElement("span",{className:"tag is-white"},"Filters: "),o,l.a.createElement("a",{className:"tag is-delete",onClick:m}))},m=function(e,t){return e.filter((function(e){return t.every((function(t){return e.frontmatter.eventTypes.includes(t)}))}))}},FK8U:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));var c=a("q1tI"),l=a.n(c),n=a("Wbzz"),r=a("ma3e"),i=function(e){var t=e.view;return l.a.createElement(l.a.Fragment,null,["is-hidden-touch","is-hidden-desktop is-centered"].map((function(e){return l.a.createElement("div",{className:"tabs is-boxed "+e,key:e},l.a.createElement("ul",null,l.a.createElement("li",{className:"calendar"==t?"is-active":""},l.a.createElement(n.a,{to:"/calendar"},l.a.createElement("span",{className:"icon is-small"},l.a.createElement(r.a,null)),l.a.createElement("h1",null,"Calendar"))),l.a.createElement("li",{className:"upcoming"==t?"is-active":""},l.a.createElement(n.a,{to:"/events"},l.a.createElement("span",{className:"icon is-small"},l.a.createElement(r.f,null)),l.a.createElement("h1",null,"Events list")))))})))}},I3Ch:function(e,t,a){"use strict";a.r(t),a.d(t,"EventInfo",(function(){return v})),a.d(t,"generateEventSubtitle",(function(){return f})),a.d(t,"query",(function(){return p}));var c=a("q1tI"),l=a.n(c),n=a("LvDl"),r=a.n(n),i=a("ExEM"),s=a("i8hC"),m=a("XtUg"),o=a("9eCu"),u=a("Vi9F"),d=function(e){var t=e.eventTypes;return t?l.a.createElement("div",{className:"tags"},t.map((function(e){return l.a.createElement("span",{key:e,className:"tag"},e)}))):null},v=function(e){var t=e.image,a=e.slug,c=e.eventTypes,n=e.content,r=e.contentComponent;return l.a.createElement(u.a.Consumer,null,(function(e){return l.a.createElement(h,{isPreview:e,image:t,slug:a,eventTypes:c,content:n,contentComponent:r})}))},h=function(e){var t=e.isPreview,a=e.image,c=e.slug,n=e.eventTypes,m=e.content,o=e.contentComponent||s.b;return l.a.createElement(l.a.Fragment,null,l.a.createElement(d,{eventTypes:n}),!t&&c?l.a.createElement("a",{className:"button event-download-button",href:"/ics"+c.slice(0,-1)+".ics",download:!0},"Add to Calendar"):null,l.a.createElement(i.a,{imageInfo:a?{src:r.a.get(a,"srcNode.childImageSharp.fixedAspect.src",a.src),alt:a.alt}:null}),l.a.createElement(o,{content:m}))},f=function(e,t){void 0===t&&(t=!1);var a=e.markdownRemark.frontmatter.dateTimeRange,c=new Date(a.startDateTime),l=new Date(a.endDateTime),n=Object(o.a)(c,l),r=Object(o.f)(c,{isShort:t,withYear:!n});return a.provideEnd?Object(o.b)(c,l)?r+"–"+l.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"}):r+" – "+Object(o.f)(l,{isShort:t,withYear:!n}):r};t.default=Object(m.a)(v,{additionalPropsExtractor:function(e){return{subtitle:f(e)}},isNarrow:!1});var p="2862034923"},MAan:function(e){e.exports=JSON.parse('{"data":{"allMarkdownRemark":{"nodes":[{"frontmatter":{"title":"Cambridge Band Comp - Final","image":{"alt":"Band on Stage","srcNode":{"childImageSharp":{"fluid":{"tracedSVG":"data:image/svg+xml,%3csvg%20xmlns=\'http://www.w3.org/2000/svg\'%20width=\'400\'%20height=\'309\'%3e%3crect%20width=\'100%25\'%20height=\'100%25\'%20fill=\'white\'/%3e%3cpath%20d=\'M0%20118v118l3-1h8l9-1%2022-2c7%200%208%200%207-1s0-2%205-2l6%202%204%201%201%201v3l-3%203-4%202c-2%200-2%200-1%201l1%201-5%201%208%204%206%202c5%203%2013%205%2024%206%2011%200%2011%200%2011%203l1%204c3%204%2021%208%2033%208%205%200%208%200%207%201-3%201-1%202%204%202h5l-1%201%2018%203c4%200%207%201%207%202h5l-2-2c-4-3-1-5%206-3l17%201h13c2%201%2012-1%2011-2%200-1%202-3%205-3v1c-3%202%200%202%205%201%203%200%206-1%207-3l1-2%208%204c8%204%2019%207%2032%209a577%20577%200%200066%201l1%208c1%205%202%206%206%207l7%202%203-1%201-2%201%201c-1%201%200%201%201%201l7%203%2012%204%2010%203c2%200%202-9%202-154V0h-30l-30%201c0%203%201%204%207%203%207%200%2013%202%2011%204l1%201v9c0%203-5%208-11%208-7%201-11%203-12%206l-2%202-8%204-5%202-2%202-2%201-14-2-15-2h-1v1c2%200%206%209%207%2013%200%203%202%206%203%208l6%208%204%206c2%201%202%2010%201%2010l-2%201c0%202%201%204%203%204s2%201%202%203l3%209c2%206%203%2013%202%2020-1%204-1%204%203%209%205%205%206%2010%206%2014-1%205-5%209-7%209l-2%202-5%201c-3-1-4%201-1%204%202%202%201%203-3%205-6%204-7%204-10%201l-3-2c-3%200-17-11-17-13-1-2%202-8%203-8s3-5%202-6l1-2%201-1c-1-2%202-8%204-8l1-2%208-1c8%201%209%200%209-5%200-2-1-2-4-1h-10c-5%201-6%201-10%204-3%202-4%203-6%202s-3-1-6%202l-4%203-2-7a525%20525%200%200116-6c5-3%2018-7%2019-7l2-1v-3c-2%200-2-1-1-1v-1l-4-4-2-3c-2%202-4-3-2-6v-3c-2%200-3-3-1-3l-1-2-1-2c2-1%202-6%200-6l-3-2-4-3-1-6-1-6v-2c-2%201-5-3-7-7l-2-4-2-2c0-2%201-2%204-2v-2c-1-2-1-2%201-4s5-2%205%200l1%201c2%200%202-1%201-5%200-4%200-6%202-9l2-6%201-1%204-3%208-4%206-3%204-1c7-3-2-3-56-3h-57l4%204c4%205%203%205-2%201l-5-3-1-1-96-1H0v118M245%2010c-3%202-6%204-7%207-1%202-4%203-5%201-1-3-4%200-6%205-2%203-2%204-1%205l1%205c0%204-1%204-4%205a279%20279%200%20006%202c1%201%205%205%207%205%201%200%202-1%202-3%202-3%208-9%209-8l4-3%205-3c4-1%204-5%202-11-1-5-2-6-3-6l-2-1h-8M79%2035l2%2011v4c0%202%200%202-2%200-3-3-6-3-15-2l-9%203c0%202-3%205-5%208-7%209-10%2025-6%2030l5%203%202%204c0%203-2%206-4%206l-3%202v3l-1-3c0-2%200-2-2-1-2%202-1%204%202%204%202%200%203%200%203%202l-3%201c-5-1-6%202-3%205l3%201c2-2%203-1%202%201-3%205%205%2018%2012%2018h3l-3-1c-2-1-2-1-1-2v-1c-2%201-5-5-4-8v-6l1-2%204-1c2%201%203%200%203-1%200-3%2017-3%2024%200v-1c-2-3%204-12%207-12%202-1%203%200%203%201v1l9%202c10%202%2013-1%2013-10%200-4-1-4-3-4h-3l3-1%202-3c-1-1%2012-5%2017-5h9l6-2c4%200%207-3%203-4-3-1-20%202-28%205-8%202-10%202-10-1l-1-1c-3%200-4%200-5-4l-4-4-3-2c-1-2-1-2-1%201-1%206%200%2014%201%2015%202%201%200%203-3%203-2%200-2%200-2-6l-1-8-1-2-1%202-2%203-3%204c-2%205-7%206-6%201l2-3%202-4c1-2%202-2%203-2%201%201%202%200%202-2%201-4%200-11-1-13-3-3%200-2%204%202%205%205%206%206%208%204%201-2%200-6-3-8-2-1-3-5-1-5v-5l-1-5c1-2-3-5-4-3h-2l-1%203v3l-4-5c-3-4-4-5-5-3m42%2018c-3%203-1%206%203%207s7-3%203-7c-3-3-3-3-6%200m84%202l2%203c1%200%202%203%200%203v4l1%201%201%202c1%203%202%203%203-1l2-3v4c-1%202-1%202%201%203v1c-1%201-1%201%201%201l5%201c2%200%203%200%203-2l-1-3c0-2%200-2-3%200-1%202-3%203-3%202l1-2c2-1%204-8%203-9h-6l-2%202-1-2a1280%201280%200%20010-4h-2c-2%202-2%202-2-1-1-4-3-4-3%200m-96%200c-2%202-2%202%200%205%201%202%207%203%207%201l1-2c0-2-3-6-5-6l-3%202m136%2032c-1%202%200%203%202%206%204%204%205%204%205%200%201-2%200-4-1-3l-1-1-1-3c-2-1-2-1-2%201s0%202-1%200l-1-3v3m-10%202v4c-1%204-3%206-9%207-4%200-5-1-5-2h-1l-1-4c0-4%200-5-2-5s-2%201-2%205c0%202%200%204-1%203l-2%201c0%202-1%202-2%201l-6-1h-4v4c-1%203-1%202-1-2%200-6-2-9-5-9-3%201-3%2031%200%2031%202%200%202-1%202-5l1-6%201%203c0%203%200%203%202%202h6l2%201c1%200%202%203%200%204v1h3c1-1%201-1%201%201s0%202%201%201c1-2%202-2%204-1l8-1%2010-2%204-1v-11c0-14%201-17%205-13%203%203%205%202%201-1-2-2-4-4-5-3l-1-2c0-3-4-3-4%200m-57%203c-2%202-2%205-1%208v1l-3%2012%201%203c1-1%201%200%201%204l1%202%201%201%203%204c1%200%202-1%202-3%202-2%202-2%200-5-1-3-1-17%201-25%200-3%200-3-2-3l-4%201m70%206l-1%203c0%204-10%2029-14%2033-1%202-1%202%203%202%203%200%204-1%203-2l1-2c1%201%202-2%201-3v-1c3%200%205-5%205-12l2-1c2-1%204-15%202-17h-2M81%20126l-3%203-1%202-8%2018c-2%202-6%2014-6%2016s1%202%205%202%205%200%206-3c3-6%202-6-1-8-3-1-3-1-2-3a104%20104%200%200012-18l2-8c1-5-1-5-4-1m176-1v7c1%203%201%203%204%201%205-2%205-5%202-7s-4-2-6-1m55%206c-2%202-3%204-3%207%200%206%201%2011%202%208%201-1%202-2%203-1l1-4%201-7c0-5-1-6-4-3m-92%207l-2%201c-2%200-10%205-10%206%200%204%203%206%209%205l7-1h1l2%201c1-3%203-2%203%203v7c2%200%200%203-3%204-6%202-5%203%204%203%2010%200%2011-1%205-3l-4-1v-8c0-8%200-8%203-9%204-1%206-5%204-5l-4%201-3%201%204-3v-2h-16m0%2015c0%202%200%202-2%200h-1l-1%201c-1-1-1%200-1%201%200%203%200%203%203%203%202-1%202-1%202%202l1%203c1-1%201%200%201%201h1l3-2-1-1-2-4-1-4c-1-2-1-2-2%200m-48%202l-5%203-2%202v1c2%200%203%202%201%202v1c0%201-1%202-3%201-2%200-2%200-1%201l3%201%202%201-1%201-1%202%201%202%201%204v7c0%203%202%206%205%206l2%201c-1%200%200%202%202%202l3%201c0-2%202-2%204-1h4l2-1%202-2c4-1%206-5%205-7%200-2-5-5-7-4v-1c1-1%200-2-1-3-3-2-4-1-3%201%200%201%201%202%202%201l1%201c0%201%201%202%203%202%204%202%205%203%203%205-1%202-2%202-3%200h-3c0%202-7%201-7%200l1-2%201-1-1-1c-2%200-6-3-6-5l-1-1-1%202c0%202-3%201-3-1v-4c2-3%202-4%200-6v-7c1%200%202-1%201-2l1-1c2%200%204-2%203-2l-4%201m-79%200v1c4%203%208%205%2013%206l5%203h2l3%201c2%202%202%202%204%200l2-3-4-2c-2-2-5-3-7-3l-16-4-2%201m259%200l-15%201a3757%203757%200%2000-16%202%20517%20517%200%200063-2%20337%20337%200%2001-32-1m-36%204v2c0%204-6%2027-7%2027-2%200-1%202%201%205%202%201%202%202%201%204v3l-2%204c-5%208-4%209%202%204%209-8%2016-26%2016-41%200-4%200-4%205-4l4-1-8-1c-5%200-7%200-8-2h-4m-170%202l-1%202c-1%202-1%2010%201%2010l1-1c-1-1%200-1%202-1l1-3v-3c2%200%201-2-1-4s-3-3-3%200m210%208l-3%202-1%201%204%201%2014%201c11%200%2011%200%2012-3l2-2h-5c-2%202-6%202-7%200h-1l-4%201h-3c-4%201-5%201-3-2v-1h-2c-1-1-2%200-3%202m-242%202c-1%201-1%204%201%208l2%203%201-2c1-2%201-2%202-1l2%202%203%202%204%203%202%203-2-1-2-1-3-1-3-3c-2%200-1%202%201%203l2%203%202%201%204%201c3%201%207%200%207-1l-3-4-13-9c-1%201-1%200-1-1%200-4-3-7-6-5m188%2018v9c0%205%201%206%203%203l2-7c0-3%200-4-1-3v-1c0-3%200-3-1-2s-1%201-1-1c0-1-1-1-2%202m48%2012l-2%204h3l27%202c2%200%203%200%202-1l1-2c2%200%202-3-1-3l-3%201c-1%202-8%202-7-1h-2c-2%202-6%203-6%201h-2l-2%201c-2%200-2%200-1%201l-1%201c-3%200-3%200-1-3v-3h-2c0-1-2%200-3%202m-214%200v2l1%202c-1%201%200%201%201%201l3-2c1-2%201-2%201%200-1%203%200%204%202%202h2l3%201h7l1%201%201-3c0-3-1-4-4-4l-5%201h-2l-1-1-3-1-3%201h-4m220%2018c-5%203-6%205-3%204%202%200%2023%202%2044%206%203%200%203%200%203-2s-1-3-2-3h-3a289%20289%200%2000-17-3l4-1c8%202%2018%202%2018%201l-4-1a156%20156%200%2001-22-2h-5l-4-1c0-2-4-1-9%202M70%20234c-4%203-4%207-1%205%201-2%202-2%202-1l3-1%207-4%204-1h-4l-7-1-4%203m-62%202l-4%201c-3%201-3%201-3%205l1%204v1l-1%2010v9l3-1c5-1%207-1%2010-4l5-2%201-2%202-1h2l9-2h-3c-3%200-3%200-2-1%202-2%201-3-1-4l-2-3c-1-2-9-3-12-1h-1c0-1-3-2-5-1l-1%202c1%202%200%201-2-1-1-2%200-3%203-3s3%200%202-1c-2-2-2-2%200-2l1-2-2-1m257%2024c1%201%201%201-1%201s0%208%202%2010c3%202%2023%203%2028%200%201%200%202-1%201-2h1l4-1v-1h-2l2-1c1-1-1-1-5-1-9%200-9%200-8%202l-1%201-1-1-2-2-4-2-6-2a169%20169%200%2001-8-1m-17%204c-1%202%200%203%201%203l1-1%203%201%203%201h-3c-3-1-3-1-1%201%208%207%2021%2010%2041%2011%2010%200%2014%200%2010-1-6-1-10-3-10-4l-10-1-20-1-2-3-2-5c-3-2-11-3-11-1m69%203v7c2%202%200%202-3%201-5-3-18-4-18-1%200%201%208%204%2014%205%204%200%205%200%207-2%202-1%202-1%202%201l-1%202h11l10-1c-1-1-1-2%201-3l3-3-14-2c-4%200-5-1-6-2l-2-2-1-1c0-2-3-1-3%201M1%20290v19h76v-3c-1-4-1-4%203-4l5%202h2l2%202%202%202%205-1c3%201%203%201%203-1s0-2-5-1c-3%200-4%200-2-1l3-4%202-3c3%200%204-2%205-5%200-4%200-4-2-4l-2%202-1%202-1-3c0-3%200-3-5-4h-3l-5%203c-10%202-11%202-11%201-1-1-1%200-1%202s0%202-2%201c-1-2-1-2-1%200%200%204-1%203-9-1l-23-8-4-1c1-2-2-4-3-3l-2-1%202-1v-5l-5-1-14%201c-2%201-5%200-3-1%201-1%200-1-2-1H1v20\'%20fill=\'%23ae1414\'%20fill-rule=\'evenodd\'/%3e%3c/svg%3e","aspectRatio":1.2955465587044535,"src":"/static/625a48e7da48c132dd81427e16f01aee/b17c1/band-comp-jump_bbclzx.jpg","srcSet":"/static/625a48e7da48c132dd81427e16f01aee/00e5e/band-comp-jump_bbclzx.jpg 200w,\\n/static/625a48e7da48c132dd81427e16f01aee/1a903/band-comp-jump_bbclzx.jpg 400w,\\n/static/625a48e7da48c132dd81427e16f01aee/b17c1/band-comp-jump_bbclzx.jpg 800w,\\n/static/625a48e7da48c132dd81427e16f01aee/a52cf/band-comp-jump_bbclzx.jpg 960w","sizes":"(max-width: 800px) 100vw, 800px"},"editedFluid":{"tracedSVG":"data:image/svg+xml,%3csvg%20xmlns=\'http://www.w3.org/2000/svg\'%20width=\'400\'%20height=\'309\'%3e%3crect%20width=\'100%25\'%20height=\'100%25\'%20fill=\'white\'/%3e%3cpath%20d=\'M0%20118v117h3l3%201-3%201c-3%200-3%200-3%204l1%205v1l-1%209v10l5-1c6-1%208-2%206-5-1-1-1-1%203-1a513%20513%200%20006-1c0-2%201-3%202-1h2l3-1c1%200%202%200%201-1v-2c1-2-1-5-3-5l-1-2c0-2-1-2-11-1l1%202v1l-6-1-4-1v-1c-2-2%200-3%203-3%202%200%204-2%202-2v-4a3017%203017%200%200050-5c3%202%204%202%205%201%200-2%202-1%202%201l-2%204-2%201-3%203c-4%201-4%203%200%203h3l-2%201-2%201%206%202%203%201c1%203%209%205%2019%206%2014%201%2016%202%2016%205%200%205%2019%2011%2036%2011%205%200%206%200%203%201l-4%201h5l8%201%207%201c2%200%203%200%203%202l4%201%204%201h13l3-1-4-1c-5-2-2-3%206-2%206%200%206%200%206-2s0-2%201%200l12%202%2011%201c1%202%2011%200%2010-2%200-3%204-3%205%200h1l4-1c3%200%205-1%206-3%203-2%203-2%204-1l4%203%203%201%2020%206a378%20378%200%200073%201h3l-3-1c-2-1-2-1%201-1%202%200%202%201%202%203l1%203%201%207c1%205%203%207%205%204h1c1%200%201%201-1%201-1%201-1%201%201%201%202-1%204%200%205%201h6c3%200%205%200%208%202a513%20513%200%200124%207c1%201%201-34%201-153V0h-30l-31%201c0%202%205%204%208%203s10%201%2012%203%202%2010%200%209l-1%202-2%203-3%204-5%202c-9%200-10%201-10%204l-5%203-7%204-3%201-1%201c0%201-2%202-9%202l-10-1h-12c-2-2-5-3-5-2l1%201c2%201%205%207%206%2013l4%208%202%202%207%2011c3%202%204%2012%201%2012-2%200-1%202%202%203l2%204%202%208c3%208%204%2016%203%2017-2%203-1%208%203%2013%204%204%206%2010%206%2014-1%204-4%209-6%209l-3%202-5%201c-4-1-5%201-2%203%202%202%202%205%200%205l-4%202-3%202-7-4-8-4-1-1-3-1-3-3-4-4c0-3%203-8%205-8s2-1%203-8c0-6%201-8%202-8v-1c0-3%204-3%206%200h3l4-3c3-3%204-4%201-4-1-1-1-1%201-1l2%202c0%203%201%202%203-1l1-3h-5l-6%202h-2c-2-2-7-1-11%202s-5%203-7%203c-2-1-3-1-6%202l-5%203c-1-1-1%200-1%201l-2%202-3%202c-2%202-4-1-4-5%200-5%206-6%208-2%201%201%201%200%201-2%200-3%200-4%204-4l13-5c2-2%2015-7%2018-7l4-2h-1c-3%200-4-1-2-2h-1c-4%200-4-1-2-3v-2l-2-3-2-2c-3%200-3-2-2-5%201-4%200-10-3-10l1-2c2-2%202-2%201-4-2-3-3-3-3%200%200%201%200%202-1%201l-1-1c1-1-4-6-5-6-2%200-1-3%201-5%202-3%201-6-4-10-3-2-6-5-6-7l-3-2%201-2%203-2%201-2c-1-2%200-3%201-4%201-2%201-2%204%200l4%203c1-1%202-5%200-5s-1-12%201-13l2-2c0-1%206-8%208-8l1-1h1l10-4c8-4%206-4-53-4a499%20499%200%2000-55%203c3%200%202%202-2%202-1%200-2%200-1-1%201-4-3-4-99-4H0v118M248%2010l-4%201c-3%200-7%206-6%2010l-1%202-1-2c0-2-1-3-2-3l-2-1-3%202c-3%203-5%209-3%2010l1%205c0%203-1%204-4%204-3%201-3%201%201%201s5%200%208%203c4%204%205%204%206%200%202-5%208-9%209-7h1c0-2%205-6%209-7%202-1%203-5%202-9l-1-5c-1-3-9-7-10-4M79%2036l1%206c2%205%201%2013%200%209-3-5-26-4-26%201l-4%207c-5%206-8%2016-8%2023%200%206%201%207%206%2010%203%201%203%202%203%204%200%204-2%206-4%206l-2%202-1%201-1-1c0-2-2-2-2%200-2%203-1%204%202%203l3%201c0%202-1%202-4%202s-4%200-4%202c0%203%203%204%206%202%202-1%204%200%202%202-4%205%203%2019%2010%2019%202%200%202%200%200-2l-1-2%201-1h-1c-2%200-3-2-3-9%201-7%200-7%206-7l2-1c0-2%201-2%2012-2l10%201h2c-1-2-1-3%201-7%203-5%203-6%200-4-1%202-2%202-4%201v-1l1-2c0-2%203-4%204-2s6%204%207%203l2-1-1%202c-1%201%201%202%207%203%2013%201%2015%200%2015-10-1-4-1-4-3-4l-2-1%203-1c2%200%202%200%200-1-2%200-2-1%203-2%209-3%2012-4%2017-4%207%200%2018-3%2018-5s-3-2-11%200l-10%201-4%201c-7%202-13%204-15%203l-3%201c1%201%200%201-1%201-2%200-1-2%202-3l2-1a1931%201931%200%2001-6-6l-2-1-1-1-2-1-1-3c-2-1-2-1-2%201v6c-1%203%200%204%201%205v1c-1%200-1%202%201%204%201%202%200%203-4%203-2%200-2%200-2-6%200-8-1-9-4-6l-5%206-3%203-1%201-1%201-2%201-2%201%202-3c2-1%203-3%203-5l2-2%201-2c0-2%201-3%203-4s2-2%202-8l-1-7v-1l5%203c3%204%205%205%207%204%202-2%201-5-1-6l-3-2a1330%201330%200%2000-3-19c-3-1-5%201-5%205%200%201-1%201-4-3-5-5-5-5-5-2m41%2018c-1%202-1%202%201%204%203%202%205%203%207%200%202-2%202-2%200-4-4-4-5-4-8%200m-11%200c-3%201-2%204%200%206%204%204%209%201%207-3-1-4-4-5-7-3m100%205l-2%202c-1%200%200%203%202%205v4l-1%202%202%201%201-1%203-6c2%200%201%204%200%205-3%201-1%202%203%202%205%200%207-1%207-3s2-1%203%201l1-1c1-3%201-3-3-3s-5-2-4-4v-3c-1-1-6-1-7%201h-1v-3c1-2%201-2-1-2s-3%201-3%203m36%2029c-1%203-4%204-4%201l-1%201c-1%202-1%202-1-2l-2-1c-1%200-2%201-2%204l-1%205-1%202-2%201-3%201h-1l-4-1h-4v-5c0-4%200-5-2-5-1%200-2%201-2%206-1%204-1%205-2%204h-1l-1%201-6-2h-5v4c-1%202-1%202-1-3%200-6-1-8-5-7-2%200-2%200-2%2015%200%2013%201%2015%202%2015%202%200%202-1%202-5l1-6%201%203c0%203%200%203%202%202h6l2%201c1%200%202%202%200%203-2%200-1%203%201%203l1-2c0-2%200-2%201%200%201%203%202%204%203%202l7-1h7l5-2c6%200%206-1%206-13l-1-12%203-1c2%200%203-1%203-2%200-2%202-1%205%202%202%202%202%202%203%201v-6l-1-1-2-1c-2-3-4-3-4%201m-63%207c-1%203-1%203-2%202h-3l-1%201%202%201c1%201%202%201%201%202%200%202%200%202-1%201-2-3-5%2010-3%2015%200%202%200%202%201%201h1c0%203%200%205%202%208l3%202%201-3c2-3%202-4%200-6-1-3-1-17%201-25l-1-3-1%204m65%204l-3%2013-1%201-2%207a448%20448%200%2000-7%2013l-2%203h3c4%200%207-3%207-6-1-1%200-3%202-6l3-6c0-3%200-3%201-2h1l1-9c1-7%201-7-1-9s-2-2-2%201M82%20125l-2%204-1%201-3%204-3%206-1%204-3%205-4%207-2%207c-2%202%200%205%204%205%205%200%205%200%207-4%203-6%203-7%200-7s-2-3%204-15c6-10%207-14%207-18%200-2-2-1-3%201m231%205l-3%203-1%205c0%206%201%208%204%207%202%200%204-11%202-15-1-2-1-2-2%200m-87%208h-3l-6%202-6%202c-1%200-3%204-2%206s14%205%2014%202l-2-1v-1h4l1%202h1c2-2%203-2%203%204v7c1%201%200%202-4%203-3%201-4-1-1-2v-1l-2-5c-1-4-3-6-3-2l-1-1h-3c-1-1-1-1-1%202s0%203%202%203c2-1%204%201%203%203-1%201-1%202%201%203%203%203%204%203%2011%203%209%200%2010-1%204-3l-4-1v-16l4-1%203-4h-5c-2-1%201-3%204-3%202%200%202%200%200-1h-12M93%20155c-1%201%201%203%2014%208l4%203h4c2%200%202%201%201%202-2%202%201%201%203-1%203-3%204-5%202-5l-4-2-5-2-17-4-2%201m78%200l-3%203-3%202-2%201h2c3%200%203%200%202%201v2l-2%201-2%201%202%201c3%200%204%202%202%202s-3%203-1%204l1%204v7c0%203%202%206%205%206l2%201%201%202c3%201%203%201%203-1h3l2%201h5l1-1s1-2%203-2c3-2%206-6%204-7l-2%201c-1%202-1%202-2%201h-6c-1-1-2%200-4%201h-2l1-1c2%200%201-4-1-4-1-1-2-2-1-3l-1-1-2-1-2-1c-1%200-2%200-1%201l1%201h-3c-1-2%200-7%201-7s1-5-1-5c-3-2%200-9%204-9l1-1h-5m148%203c-3%201-4%204-4%209l-1%205c-1%202-2%204-1%205l-4%2010-1-2-2%203c-2%204-4%205-4%203h-1v2l1%202v9c3%201%205-4%205-10%200-7%201-7%203%200%201%205%201%206-2%2010-3%208-2%209%203%204%207-6%2013-18%2015-31%202-15%202-15-1-16l-3%201-1-1c-1-2-1-2%2023-2l56-2c0-2-77-1-81%201m-173%201v2l-2%202v6c0%204%200%204%202%203%204-2%205-4%204-5v-5l-1-2c-1-2-3-3-3-1m214%208h-1l-3%202c-1%202-3%203-3%202l-1%201%204%201%203-1h1l11%202h10l2-3%201-3h-3l-3%202c0%202-5%201-5-1h-2c-1%201-4%202-5%201%200-2%200-2-2%200-1%201-4%202-4%200l1-2v-1h-1m-246%204c-1%202-1%205%202%208%201%203%201%203%202%201s1-2%204%201l6%204c3%202%204%204%202%204s-3%203-1%203h5c4-1%204-4%200-7-2%200-2-2-2-3l-1-2-1%201c0%202-1%201-5-2-3-2-3-3-4-2h-1l-1-2-1-1c1-3-2-5-4-3m236%2031l-2%202h-2l20%202%2014%201%201-3c2-2%202-4%200-2h-4c-1%202-7%202-7%200s-2-2-2%200c-1%202-1%202-3%201h-1l-1%201-1-1-1-2-1%201h-1l-3%201c-1%202-3%202-3%201l1-1%201-1c0-2-2-3-2-1v-1c0-2-2-1-3%202m-210%200h-2c-1-2-2-1-1%202%200%201%201%202%202%201l1%201h9c1%202%202%202%203%201h2l2%201c2%200%202-1%202-3v-4h-12c0-1-6-1-6%201m221%2014c-6%202-13%209-8%207l15%201a792%20792%200%200132%203c0-2-1-3-7-4l-11-1-5-1%204-1c11%202%2019%202%2019%201l-2-1-5-1-23-1-5-1c-1-1-2-2-4-1M69%20234c-3%203-2%203%203%204%203%200%204%200%203-1l-2-1%202-1%207-2%206-2h-8c-7%200-9%201-11%203m195%2026l2%202v1l-2-1h-1v1l1%204%201%204c2%201%2023%203%2023%201h2l7-2%207-3%201-1-16-1c-6%200-9-1-9-2l-7-2c-8-2-9-2-9-1m-15%203v3l4%203c6%206%2020%2010%2041%2011%208%200%2013%200%2012-1-10-1-13-2-12-3%200-1-2-2-11-2-22-1-21-1-21-3l-1-3-2-3c0-1-2-1-2%201l-2%201-3-1v-2l2-1h-5m68%205v6l1%205%2010%201%209-1%201-1%202-1%202-3v-1c-4-2-11-3-14-2-3%200-4%200-4-2l-3-2-3-2-1%203m-296%202l-5%202h-1c3-1%200-2-6-2-8%200-8%200-8%203%200%202%201%202%202%201%205-2%206-1%203%201l-4%202c-1-1-1%202-1%2016v16h76v-3c-1-3-1-4%201-4l2%201%204%202c2%200%203%201%203%202v3l1-3c1-3%203-4%204-2h2c0-2%203-1%203%200-1%202%201%203%202%202v-6c0-5%200-5%202-5s3%200%203-2%201-3%202-3c3-2%201-3-4-3l-6-1c0-2-1-2-4-2s-4%200-4%202l-4%201-4%201-4%201-4-1-2%201-1%204c0%202-3%201-12-3-6-3-16-6-19-6l-2-1-2-1-2-2c1-1-2-3-4-3h-1l2-1v-4c-2-4-6-5-8-3m276%203c-2%201%200%203%204%204l6%201h10c1-4-16-8-20-5\'%20fill=\'%23ae1414\'%20fill-rule=\'evenodd\'/%3e%3c/svg%3e","aspectRatio":1.2955465587044535,"src":"/static/625a48e7da48c132dd81427e16f01aee/9cebd/band-comp-jump_bbclzx.jpg","srcSet":"/static/625a48e7da48c132dd81427e16f01aee/faf93/band-comp-jump_bbclzx.jpg 200w,\\n/static/625a48e7da48c132dd81427e16f01aee/0aeaf/band-comp-jump_bbclzx.jpg 400w,\\n/static/625a48e7da48c132dd81427e16f01aee/9cebd/band-comp-jump_bbclzx.jpg 800w,\\n/static/625a48e7da48c132dd81427e16f01aee/41a9b/band-comp-jump_bbclzx.jpg 960w","sizes":"(max-width: 800px) 100vw, 800px"},"fixedAspect":{"src":"/static/625a48e7da48c132dd81427e16f01aee/1264d/band-comp-jump_bbclzx.jpg"}}},"shouldDisplay":true},"eventTypes":["Band competition"],"dateTimeRange":{"startDateTime":"2021-10-28T17:30:00.000Z","endDateTime":null,"provideEnd":null}},"html":"<p>The Cambridge Over 18’s Band Competition Final will be at the Junction, Cambridge Leisure Park,   alongside the heat winners of the Under 18’s. Prizes for the winners and for best acts in many different categories, PLUS the prestigious Kimberley Rew Best Song Prize.</p>\\n<ul>\\n<li>Shambertans</li>\\n<li>Pink Lemonade</li>\\n<li>Bleed Easy</li>\\n<li>The Routine</li>\\n<li>Jenem</li>\\n<li>Strawberry Lace</li>\\n<li>Chloe Lorentzen</li>\\n</ul>\\n<p><strong><a href=\\"https://www.junction.co.uk/cambridge-band-competition-final\\">https://www.junction.co.uk/cambridge-band-competition-final</a></strong></p>\\n<p>Please note that The Junction have a Covid policy for entry that you can see here:    <strong><a href=\\"https://www.junction.co.uk/covid-19-entry-requirements\\">https://www.junction.co.uk/covid-19-entry-requirements</a></strong></p>","excerpt":"<p>The Cambridge Over 18’s Band Competition Final will be at the Junction, Cambridge Leisure Park,   alongside the heat winners of the Under 18’s. Prizes…</p>","fields":{"slug":"/events/2021-05-02-over-18s-band-comp-final/"}}]}}}')},WtST:function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));var c=a("q1tI"),l=function(e){var t=Object(c.useState)([]),a=t[0],l=t[1];return{allFilters:e,activeFilters:a,addFilter:function(e){return function(){l(a.concat(e))}},removeFilter:function(e){return function(){l(a.filter((function(t){return t!==e})))}},clearFilters:function(){l([])}}}},baAH:function(e,t,a){"use strict";a.d(t,"b",(function(){return o})),a.d(t,"a",(function(){return d}));var c=a("q1tI"),l=a.n(c),n=a("Wbzz"),r=a("LvDl"),i=a.n(r),s=a("ExEM"),m=a("i8hC"),o=function(e){var t=e.panelData,a=e.emptyText,c=e.isViewportWidthDesktop;return l.a.createElement("div",{className:"xpanel-block"},p(t,a).map((function(e,t){return l.a.createElement("div",{key:t,className:"xpanel-background "+(c?"is-viewport-width":"")},l.a.createElement("section",{className:"section section-root"},l.a.createElement("div",{className:"container wide-container"},e)))})))},u=function(e){var t=e.text;return l.a.createElement("div",{className:"xpanel"},t)},d=function(e){var t=e.image,a=e.slug,c=e.title,n=e.subtitle,r=e.mobileSubtitle,i=e.excerpt,s=l.a.createElement(v,{image:t}),m=l.a.createElement(h,{slug:a,title:c,subtitle:n,mobileSubtitle:r}),o=l.a.createElement(f,{excerpt:i});return l.a.createElement("div",{className:"xpanel"},l.a.createElement("div",{className:"xpanel-header"},m),l.a.createElement("div",{className:"xpanel-image"},s),l.a.createElement("div",{className:"xpanel-excerpt"},o))},v=function(e){var t=e.image;if(t){var a={alt:t.alt,src:i.a.get(t,"srcNode.childImageSharp.fixedAspect.src",t.src)};return l.a.createElement(s.a,{imageInfo:a})}return null},h=function(e){var t=e.slug,a=e.title,c=e.subtitle,r=e.mobileSubtitle;return l.a.createElement(n.a,{to:t},l.a.createElement("h2",{className:"title is-4 upcoming-title"},l.a.createElement("strong",null,a)),l.a.createElement("h3",{className:"subtitle is-6 upcoming-subtitle is-hidden-mobile"},l.a.createElement("strong",null,c)),l.a.createElement("h3",{className:"subtitle is-6 upcoming-subtitle is-hidden-tablet"},l.a.createElement("strong",null,r||c)))},f=function(e){var t=e.excerpt;return l.a.createElement(m.c,{content:t})},p=function(e,t){return e.length>0?e.map((function(e,t){return l.a.createElement(d,{image:e.image,slug:e.slug,title:e.title,subtitle:e.subtitle,mobileSubtitle:e.mobileSubtitle,excerpt:e.excerpt,key:t})})):[l.a.createElement(u,{key:"1",text:t||""})]}},h8DE:function(e,t,a){"use strict";a.d(t,"a",(function(){return c}));var c=["Benefit gig","Meeting - Programming","Meeting - Finance","Band competition","Other"]},oIpN:function(e,t,a){"use strict";a.d(t,"a",(function(){return v})),a.d(t,"b",(function(){return f}));var c=a("q1tI"),l=a.n(c),n=a("baAH"),r=(a("2rJu"),a("6sa9")),i=a("h8DE"),s=a("scPP"),m=a("Vi9F"),o=a("WtST"),u=a("9eCu"),d=a("I3Ch"),v=function(e){var t=e.events;return l.a.createElement(m.a.Consumer,null,(function(e){return l.a.createElement(h,{isPreview:e,previewEventList:t})}))},h=function(e){var t=e.isPreview,a=e.previewEventList,c=Object(o.a)(i.a),m=t?a:Object(s.a)();m=m.filter((function(e){return Object(u.d)(new Date,new Date(e.frontmatter.dateTimeRange.provideEnd?e.frontmatter.dateTimeRange.endDateTime:e.frontmatter.dateTimeRange.startDateTime))}));var d=Object(r.c)(m,c.activeFilters).slice(0,5).map((function(e){return f(e)}));return l.a.createElement(l.a.Fragment,null,l.a.createElement("h1",{className:"title"},"Upcoming Events"),l.a.createElement("div",null,l.a.createElement(r.a,{filterProps:c,withDivider:!1}),l.a.createElement(n.b,{panelData:d,emptyText:"No events match the selected filters.",isViewportWidthDesktop:!0})))},f=function(e){return{image:e.frontmatter.image,slug:e.fields.slug,title:e.frontmatter.title,subtitle:Object(d.generateEventSubtitle)({markdownRemark:e},!1),mobileSubtitle:Object(d.generateEventSubtitle)({markdownRemark:e},!0),excerpt:e.excerpt}}},scPP:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));a("Vd3H");var c=a("MAan"),l=a("9eCu"),n=function(){return c.data.allMarkdownRemark.nodes.sort((function(e,t){var a=e.frontmatter.dateTimeRange,c=t.frontmatter.dateTimeRange,n=new Date(a.startDateTime),r=new Date(c.startDateTime);if(Object(l.c)(n,r)){if(a.provideEnd){var i=new Date(a.endDateTime);return c.provideEnd?i-new Date(c.endDateTime):1}return c.provideEnd?-1:0}return 0}))}}}]);
//# sourceMappingURL=component---src-templates-calendar-page-jsx-e68d8bb9cdc6ecdd289d.js.map