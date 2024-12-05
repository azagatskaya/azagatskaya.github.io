"use strict";(self.webpackChunkreact_start_template=self.webpackChunkreact_start_template||[]).push([[838],{"./src/components/header/header.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{En:()=>En,Ru:()=>Ru,__namedExportsOrder:()=>__namedExportsOrder,default:()=>header_stories});var react=__webpack_require__("./node_modules/react/index.js"),Logo=__webpack_require__("./src/components/logo/Logo.tsx"),ThemeSwitch=__webpack_require__("./src/components/theme-switch/ThemeSwitch.tsx"),ThemeContext=__webpack_require__("./src/contexts/ThemeContext.ts"),LanguageSelect=__webpack_require__("./src/components/language-select/LanguageSelect.tsx"),flex=__webpack_require__("./node_modules/antd/es/flex/index.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function _typeof(o){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){_defineProperty(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function _defineProperty(e,r,t){return(r=function _toPropertyKey(t){var i=function _toPrimitive(t,r){if("object"!=_typeof(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=_typeof(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"==_typeof(i)?i:i+""}(r))in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var style={height:60,position:"sticky",top:0,padding:"15px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"};function Header(){var _useContext=(0,react.useContext)(ThemeContext.Z),palette=_useContext.palette,theme=_useContext.theme;return(0,jsx_runtime.jsxs)("div",{style:_objectSpread(_objectSpread({},style),{},{backgroundColor:palette.background,borderBottom:"1px solid ".concat("light"===theme?"rgba(0, 0, 0, 0.1)":"rgba(255, 255, 255, 0.2)")}),children:[(0,jsx_runtime.jsx)(Logo.Z,{}),(0,jsx_runtime.jsxs)(flex.Z,{vertical:!1,gap:16,justify:"flex-end",align:"center",children:[(0,jsx_runtime.jsx)(ThemeSwitch.Z,{}),(0,jsx_runtime.jsx)(LanguageSelect.Z,{})]})]})}Header.displayName="Header";const header_stories={title:"Example/Header",component:Header};var Ru={parameters:{lang:"ru",theme:"light",palette:{primary:"#3d96c8",secondary:"#1de9b6",background:"#fff",foreground:"#00000011",borderColor:"rgba(0, 0, 0, 0.1)",error:"#d32f2f",success:"#2e7d32",fontColor:"#000",fontColorDisabled:"#00000044"}}},En={parameters:{lang:"en",theme:"light",palette:{primary:"#3d96c8",secondary:"#1de9b6",background:"#fff",foreground:"#00000011",borderColor:"rgba(0, 0, 0, 0.1)",error:"#d32f2f",success:"#2e7d32",fontColor:"#000",fontColorDisabled:"#00000044"}}};Ru.parameters={...Ru.parameters,docs:{...Ru.parameters?.docs,source:{originalSource:"{\n  parameters: {\n    lang: 'ru',\n    theme: 'light',\n    palette: {\n      primary: '#3d96c8',\n      secondary: '#1de9b6',\n      background: '#fff',\n      foreground: '#00000011',\n      borderColor: 'rgba(0, 0, 0, 0.1)',\n      error: '#d32f2f',\n      success: '#2e7d32',\n      fontColor: '#000',\n      fontColorDisabled: '#00000044'\n    }\n  }\n}",...Ru.parameters?.docs?.source}}},En.parameters={...En.parameters,docs:{...En.parameters?.docs,source:{originalSource:"{\n  parameters: {\n    lang: 'en',\n    theme: 'light',\n    palette: {\n      primary: '#3d96c8',\n      secondary: '#1de9b6',\n      background: '#fff',\n      foreground: '#00000011',\n      borderColor: 'rgba(0, 0, 0, 0.1)',\n      error: '#d32f2f',\n      success: '#2e7d32',\n      fontColor: '#000',\n      fontColorDisabled: '#00000044'\n    }\n  }\n}",...En.parameters?.docs?.source}}};const __namedExportsOrder=["Ru","En"]},"./node_modules/antd/es/_util/wave/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>wave});var react=__webpack_require__("./node_modules/react/index.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),isVisible=__webpack_require__("./node_modules/rc-util/es/Dom/isVisible.js"),es_ref=__webpack_require__("./node_modules/rc-util/es/ref.js"),context=__webpack_require__("./node_modules/antd/es/config-provider/context.js"),reactNode=__webpack_require__("./node_modules/antd/es/_util/reactNode.js"),genStyleUtils=__webpack_require__("./node_modules/antd/es/theme/util/genStyleUtils.js");const genWaveStyle=token=>{const{componentCls,colorPrimary}=token;return{[componentCls]:{position:"absolute",background:"transparent",pointerEvents:"none",boxSizing:"border-box",color:`var(--wave-color, ${colorPrimary})`,boxShadow:"0 0 0 0 currentcolor",opacity:.2,"&.wave-motion-appear":{transition:[`box-shadow 0.4s ${token.motionEaseOutCirc}`,`opacity 2s ${token.motionEaseOutCirc}`].join(","),"&-active":{boxShadow:"0 0 0 6px currentcolor",opacity:0},"&.wave-quick":{transition:[`box-shadow ${token.motionDurationSlow} ${token.motionEaseInOut}`,`opacity ${token.motionDurationSlow} ${token.motionEaseInOut}`].join(",")}}}}},style=(0,genStyleUtils.A1)("Wave",(token=>[genWaveStyle(token)]));var useEvent=__webpack_require__("./node_modules/rc-util/es/hooks/useEvent.js"),raf=__webpack_require__("./node_modules/rc-util/es/raf.js"),useToken=__webpack_require__("./node_modules/antd/es/theme/useToken.js"),wave_interface=__webpack_require__("./node_modules/antd/es/_util/wave/interface.js"),es=__webpack_require__("./node_modules/rc-motion/es/index.js"),render=__webpack_require__("./node_modules/rc-util/es/React/render.js");function isValidWaveColor(color){return color&&"#fff"!==color&&"#ffffff"!==color&&"rgb(255, 255, 255)"!==color&&"rgba(255, 255, 255, 1)"!==color&&!/rgba\((?:\d*, ){3}0\)/.test(color)&&"transparent"!==color}function validateNum(value){return Number.isNaN(value)?0:value}const WaveEffect=props=>{const{className,target,component}=props,divRef=react.useRef(null),[color,setWaveColor]=react.useState(null),[borderRadius,setBorderRadius]=react.useState([]),[left,setLeft]=react.useState(0),[top,setTop]=react.useState(0),[width,setWidth]=react.useState(0),[height,setHeight]=react.useState(0),[enabled,setEnabled]=react.useState(!1),waveStyle={left,top,width,height,borderRadius:borderRadius.map((radius=>`${radius}px`)).join(" ")};function syncPos(){const nodeStyle=getComputedStyle(target);setWaveColor(function getTargetWaveColor(node){const{borderTopColor,borderColor,backgroundColor}=getComputedStyle(node);return isValidWaveColor(borderTopColor)?borderTopColor:isValidWaveColor(borderColor)?borderColor:isValidWaveColor(backgroundColor)?backgroundColor:null}(target));const isStatic="static"===nodeStyle.position,{borderLeftWidth,borderTopWidth}=nodeStyle;setLeft(isStatic?target.offsetLeft:validateNum(-parseFloat(borderLeftWidth))),setTop(isStatic?target.offsetTop:validateNum(-parseFloat(borderTopWidth))),setWidth(target.offsetWidth),setHeight(target.offsetHeight);const{borderTopLeftRadius,borderTopRightRadius,borderBottomLeftRadius,borderBottomRightRadius}=nodeStyle;setBorderRadius([borderTopLeftRadius,borderTopRightRadius,borderBottomRightRadius,borderBottomLeftRadius].map((radius=>validateNum(parseFloat(radius)))))}if(color&&(waveStyle["--wave-color"]=color),react.useEffect((()=>{if(target){const id=(0,raf.Z)((()=>{syncPos(),setEnabled(!0)}));let resizeObserver;return"undefined"!=typeof ResizeObserver&&(resizeObserver=new ResizeObserver(syncPos),resizeObserver.observe(target)),()=>{raf.Z.cancel(id),null==resizeObserver||resizeObserver.disconnect()}}}),[]),!enabled)return null;const isSmallComponent=("Checkbox"===component||"Radio"===component)&&(null==target?void 0:target.classList.contains(wave_interface.A));return react.createElement(es.ZP,{visible:!0,motionAppear:!0,motionName:"wave-motion",motionDeadline:5e3,onAppearEnd:(_,event)=>{var _a;if(event.deadline||"opacity"===event.propertyName){const holder=null===(_a=divRef.current)||void 0===_a?void 0:_a.parentElement;(0,render.v)(holder).then((()=>{null==holder||holder.remove()}))}return!1}},((_ref,ref)=>{let{className:motionClassName}=_ref;return react.createElement("div",{ref:(0,es_ref.sQ)(divRef,ref),className:classnames_default()(className,motionClassName,{"wave-quick":isSmallComponent}),style:waveStyle})}))},wave_WaveEffect=(target,info)=>{var _a;const{component}=info;if("Checkbox"===component&&!(null===(_a=target.querySelector("input"))||void 0===_a?void 0:_a.checked))return;const holder=document.createElement("div");holder.style.position="absolute",holder.style.left="0px",holder.style.top="0px",null==target||target.insertBefore(holder,null==target?void 0:target.firstChild),(0,render.s)(react.createElement(WaveEffect,Object.assign({},info,{target})),holder)},wave_useWave=(nodeRef,className,component)=>{const{wave}=react.useContext(context.E_),[,token,hashId]=(0,useToken.ZP)(),showWave=(0,useEvent.Z)((event=>{const node=nodeRef.current;if((null==wave?void 0:wave.disabled)||!node)return;const targetNode=node.querySelector(`.${wave_interface.A}`)||node,{showEffect}=wave||{};(showEffect||wave_WaveEffect)(targetNode,{className,token,component,event,hashId})})),rafId=react.useRef();return event=>{raf.Z.cancel(rafId.current),rafId.current=(0,raf.Z)((()=>{showWave(event)}))}};const wave=props=>{const{children,disabled,component}=props,{getPrefixCls}=(0,react.useContext)(context.E_),containerRef=(0,react.useRef)(null),prefixCls=getPrefixCls("wave"),[,hashId]=style(prefixCls),showWave=wave_useWave(containerRef,classnames_default()(prefixCls,hashId),component);if(react.useEffect((()=>{const node=containerRef.current;if(!node||1!==node.nodeType||disabled)return;const onClick=e=>{!(0,isVisible.Z)(e.target)||!node.getAttribute||node.getAttribute("disabled")||node.disabled||node.className.includes("disabled")||node.className.includes("-leave")||showWave(e)};return node.addEventListener("click",onClick,!0),()=>{node.removeEventListener("click",onClick,!0)}}),[disabled]),!react.isValidElement(children))return null!=children?children:null;const ref=(0,es_ref.Yr)(children)?(0,es_ref.sQ)(children.ref,containerRef):containerRef;return(0,reactNode.Tm)(children,{ref})}},"./node_modules/antd/es/_util/wave/interface.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>TARGET_CLS});const TARGET_CLS=`${__webpack_require__("./node_modules/antd/es/config-provider/context.js").Rf}-wave-target`},"./src/components/language-select/LanguageSelect.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>LanguageSelect});var _ant_design_icons__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@ant-design/icons/es/icons/GlobalOutlined.js"),antd__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/antd/es/menu/index.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_contexts_ThemeContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/contexts/ThemeContext.ts"),_contexts_LocalizationContext__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/contexts/LocalizationContext.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");function LanguageSelect(){var theme=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_contexts_ThemeContext__WEBPACK_IMPORTED_MODULE_1__.Z).theme,_useContext2=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_contexts_LocalizationContext__WEBPACK_IMPORTED_MODULE_2__.Z),lang=_useContext2.lang,setLang=_useContext2.setLang;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(antd__WEBPACK_IMPORTED_MODULE_4__.Z,{onClick:function onClick(e){return setLang(e.key)},selectedKeys:[lang],mode:"vertical",theme,items:[{key:"lang",icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_5__.Z,{}),children:[{key:"ru",label:"Русский"},{key:"en",label:"English"}]}]})}LanguageSelect.displayName="LanguageSelect"},"./src/components/logo/Logo.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Logo});__webpack_require__("./node_modules/react/index.js");const logo_namespaceObject=__webpack_require__.p+"static/media/logo.7995780c.svg";var injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),logo_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/logo/logo.module.sass"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(logo_module.Z,options);const logo_logo_module=logo_module.Z&&logo_module.Z.locals?logo_module.Z.locals:void 0;var es=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Logo(){var t=(0,es.$G)().t;return(0,jsx_runtime.jsxs)("div",{className:logo_logo_module.container,children:[(0,jsx_runtime.jsx)("img",{src:logo_namespaceObject,alt:"logoImage"}),(0,jsx_runtime.jsx)("h1",{children:t("companyName")})]})}Logo.displayName="Logo"},"./src/components/theme-switch/ThemeSwitch.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ThemeSwitch});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),antd__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/antd/es/flex/index.js"),antd__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/antd/es/radio/index.js"),_ant_design_icons_lib_icons__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@ant-design/icons/lib/icons/index.js"),_contexts_ThemeContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/contexts/ThemeContext.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js"),DarkThemeIcon=function DarkThemeIcon(_ref){return"dark"===_ref.theme?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ant_design_icons_lib_icons__WEBPACK_IMPORTED_MODULE_3__.MNn,{style:styles.iconDark}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ant_design_icons_lib_icons__WEBPACK_IMPORTED_MODULE_3__.CLU,{style:styles.iconDark})},LightThemeIcon=function LightThemeIcon(_ref2){return"light"===_ref2.theme?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ant_design_icons_lib_icons__WEBPACK_IMPORTED_MODULE_3__.Zt5,{style:styles.iconLight}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ant_design_icons_lib_icons__WEBPACK_IMPORTED_MODULE_3__.LT0,{style:styles.iconLight})};function ThemeSwitch(){var _useContext=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_contexts_ThemeContext__WEBPACK_IMPORTED_MODULE_1__.Z),setTheme=_useContext.setTheme,theme=_useContext.theme,palette=_useContext.palette;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(antd__WEBPACK_IMPORTED_MODULE_4__.Z,{vertical:!1,gap:"middle",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_5__.ZP.Group,{defaultValue:theme,onChange:function handleChangeTheme(e){setTheme(e.target.value)},size:"large",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(antd__WEBPACK_IMPORTED_MODULE_5__.ZP.Button,{value:"dark",style:{backgroundColor:palette.foreground},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(DarkThemeIcon,{theme})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(antd__WEBPACK_IMPORTED_MODULE_5__.ZP.Button,{value:"light",style:{backgroundColor:palette.background},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(LightThemeIcon,{theme})})]})})}ThemeSwitch.displayName="ThemeSwitch";var styles={iconDark:{color:"#303f9f"},iconLight:{color:"#f57f17"}}},"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/logo/logo.module.sass":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".WGia0URjWvTpZfnJpK2Z{display:flex;flex-direction:row;justify-content:flex-start;align-items:center;gap:12px}.WGia0URjWvTpZfnJpK2Z h1{font-size:18px;font-weight:600;font-style:italic;color:#303f9f}","",{version:3,sources:["webpack://./src/components/logo/logo.module.sass"],names:[],mappings:"AAAA,sBACE,YAAA,CACA,kBAAA,CACA,0BAAA,CACA,kBAAA,CAMA,QAAA,CALA,yBACE,cAAA,CACA,eAAA,CACA,iBAAA,CACA,aAAA",sourcesContent:[".container\n  display: flex\n  flex-direction: row\n  justify-content: flex-start\n  align-items: center\n  & h1\n    font-size: 18px\n    font-weight: 600\n    font-style: italic\n    color: #303f9f\n  gap: 12px\n"],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={container:"WGia0URjWvTpZfnJpK2Z"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/css-loader/dist/runtime/api.js":module=>{module.exports=function(cssWithMappingToString){var list=[];return list.toString=function toString(){return this.map((function(item){var content="",needLayer=void 0!==item[5];return item[4]&&(content+="@supports (".concat(item[4],") {")),item[2]&&(content+="@media ".concat(item[2]," {")),needLayer&&(content+="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {")),content+=cssWithMappingToString(item),needLayer&&(content+="}"),item[2]&&(content+="}"),item[4]&&(content+="}"),content})).join("")},list.i=function i(modules,media,dedupe,supports,layer){"string"==typeof modules&&(modules=[[null,modules,void 0]]);var alreadyImportedModules={};if(dedupe)for(var k=0;k<this.length;k++){var id=this[k][0];null!=id&&(alreadyImportedModules[id]=!0)}for(var _k=0;_k<modules.length;_k++){var item=[].concat(modules[_k]);dedupe&&alreadyImportedModules[item[0]]||(void 0!==layer&&(void 0===item[5]||(item[1]="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {").concat(item[1],"}")),item[5]=layer),media&&(item[2]?(item[1]="@media ".concat(item[2]," {").concat(item[1],"}"),item[2]=media):item[2]=media),supports&&(item[4]?(item[1]="@supports (".concat(item[4],") {").concat(item[1],"}"),item[4]=supports):item[4]="".concat(supports)),list.push(item))}},list}},"./node_modules/css-loader/dist/runtime/sourceMaps.js":module=>{module.exports=function(item){var content=item[1],cssMapping=item[3];if(!cssMapping)return content;if("function"==typeof btoa){var base64=btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping)))),data="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64),sourceMapping="/*# ".concat(data," */");return[content].concat([sourceMapping]).join("\n")}return[content].join("\n")}},"./node_modules/rc-util/es/React/render.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var react_dom__WEBPACK_IMPORTED_MODULE_0___namespace_cache;__webpack_require__.d(__webpack_exports__,{s:()=>render,v:()=>unmount});var createRoot,_babel_runtime_helpers_esm_regeneratorRuntime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js"),_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/typeof.js"),_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),react_dom__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react-dom/index.js"),fullClone=(0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__.Z)({},react_dom__WEBPACK_IMPORTED_MODULE_0___namespace_cache||(react_dom__WEBPACK_IMPORTED_MODULE_0___namespace_cache=__webpack_require__.t(react_dom__WEBPACK_IMPORTED_MODULE_0__,2))),version=fullClone.version,reactRender=fullClone.render,unmountComponentAtNode=fullClone.unmountComponentAtNode;try{Number((version||"").split(".")[0])>=18&&(createRoot=fullClone.createRoot)}catch(e){}function toggleWarning(skip){var __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=fullClone.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED&&"object"===(0,_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_2__.Z)(__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)&&(__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.usingClientEntryPoint=skip)}var MARK="__rc_react_root__";function render(node,container){createRoot?function modernRender(node,container){toggleWarning(!0);var root=container[MARK]||createRoot(container);toggleWarning(!1),root.render(node),container[MARK]=root}(node,container):function legacyRender(node,container){reactRender(node,container)}(node,container)}function modernUnmount(_x){return _modernUnmount.apply(this,arguments)}function _modernUnmount(){return(_modernUnmount=(0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__.Z)((0,_babel_runtime_helpers_esm_regeneratorRuntime__WEBPACK_IMPORTED_MODULE_4__.Z)().mark((function _callee(container){return(0,_babel_runtime_helpers_esm_regeneratorRuntime__WEBPACK_IMPORTED_MODULE_4__.Z)().wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:return _context.abrupt("return",Promise.resolve().then((function(){var _container$MARK;null===(_container$MARK=container[MARK])||void 0===_container$MARK||_container$MARK.unmount(),delete container[MARK]})));case 1:case"end":return _context.stop()}}),_callee)})))).apply(this,arguments)}function legacyUnmount(container){unmountComponentAtNode(container)}function unmount(_x2){return _unmount.apply(this,arguments)}function _unmount(){return(_unmount=(0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__.Z)((0,_babel_runtime_helpers_esm_regeneratorRuntime__WEBPACK_IMPORTED_MODULE_4__.Z)().mark((function _callee2(container){return(0,_babel_runtime_helpers_esm_regeneratorRuntime__WEBPACK_IMPORTED_MODULE_4__.Z)().wrap((function _callee2$(_context2){for(;;)switch(_context2.prev=_context2.next){case 0:if(void 0===createRoot){_context2.next=2;break}return _context2.abrupt("return",modernUnmount(container));case 2:legacyUnmount(container);case 3:case"end":return _context2.stop()}}),_callee2)})))).apply(this,arguments)}},"./node_modules/rc-util/es/pickAttrs.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>pickAttrs});var _babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),propList="".concat("accept acceptCharset accessKey action allowFullScreen allowTransparency\n    alt async autoComplete autoFocus autoPlay capture cellPadding cellSpacing challenge\n    charSet checked classID className colSpan cols content contentEditable contextMenu\n    controls coords crossOrigin data dateTime default defer dir disabled download draggable\n    encType form formAction formEncType formMethod formNoValidate formTarget frameBorder\n    headers height hidden high href hrefLang htmlFor httpEquiv icon id inputMode integrity\n    is keyParams keyType kind label lang list loop low manifest marginHeight marginWidth max maxLength media\n    mediaGroup method min minLength multiple muted name noValidate nonce open\n    optimum pattern placeholder poster preload radioGroup readOnly rel required\n    reversed role rowSpan rows sandbox scope scoped scrolling seamless selected\n    shape size sizes span spellCheck src srcDoc srcLang srcSet start step style\n    summary tabIndex target title type useMap value width wmode wrap"," ").concat("onCopy onCut onPaste onCompositionEnd onCompositionStart onCompositionUpdate onKeyDown\n    onKeyPress onKeyUp onFocus onBlur onChange onInput onSubmit onClick onContextMenu onDoubleClick\n    onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown\n    onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onSelect onTouchCancel\n    onTouchEnd onTouchMove onTouchStart onScroll onWheel onAbort onCanPlay onCanPlayThrough\n    onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata\n    onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting onLoad onError").split(/[\s\n]+/),ariaPrefix="aria-",dataPrefix="data-";function match(key,prefix){return 0===key.indexOf(prefix)}function pickAttrs(props){var mergedConfig,ariaOnly=arguments.length>1&&void 0!==arguments[1]&&arguments[1];mergedConfig=!1===ariaOnly?{aria:!0,data:!0,attr:!0}:!0===ariaOnly?{aria:!0}:(0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.Z)({},ariaOnly);var attrs={};return Object.keys(props).forEach((function(key){(mergedConfig.aria&&("role"===key||match(key,ariaPrefix))||mergedConfig.data&&match(key,dataPrefix)||mergedConfig.attr&&propList.includes(key))&&(attrs[key]=props[key])})),attrs}},"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":module=>{var stylesInDOM=[];function getIndexByIdentifier(identifier){for(var result=-1,i=0;i<stylesInDOM.length;i++)if(stylesInDOM[i].identifier===identifier){result=i;break}return result}function modulesToDom(list,options){for(var idCountMap={},identifiers=[],i=0;i<list.length;i++){var item=list[i],id=options.base?item[0]+options.base:item[0],count=idCountMap[id]||0,identifier="".concat(id," ").concat(count);idCountMap[id]=count+1;var indexByIdentifier=getIndexByIdentifier(identifier),obj={css:item[1],media:item[2],sourceMap:item[3],supports:item[4],layer:item[5]};if(-1!==indexByIdentifier)stylesInDOM[indexByIdentifier].references++,stylesInDOM[indexByIdentifier].updater(obj);else{var updater=addElementStyle(obj,options);options.byIndex=i,stylesInDOM.splice(i,0,{identifier,updater,references:1})}identifiers.push(identifier)}return identifiers}function addElementStyle(obj,options){var api=options.domAPI(options);api.update(obj);return function updater(newObj){if(newObj){if(newObj.css===obj.css&&newObj.media===obj.media&&newObj.sourceMap===obj.sourceMap&&newObj.supports===obj.supports&&newObj.layer===obj.layer)return;api.update(obj=newObj)}else api.remove()}}module.exports=function(list,options){var lastIdentifiers=modulesToDom(list=list||[],options=options||{});return function update(newList){newList=newList||[];for(var i=0;i<lastIdentifiers.length;i++){var index=getIndexByIdentifier(lastIdentifiers[i]);stylesInDOM[index].references--}for(var newLastIdentifiers=modulesToDom(newList,options),_i=0;_i<lastIdentifiers.length;_i++){var _index=getIndexByIdentifier(lastIdentifiers[_i]);0===stylesInDOM[_index].references&&(stylesInDOM[_index].updater(),stylesInDOM.splice(_index,1))}lastIdentifiers=newLastIdentifiers}}},"./node_modules/style-loader/dist/runtime/insertBySelector.js":module=>{var memo={};module.exports=function insertBySelector(insert,style){var target=function getTarget(target){if(void 0===memo[target]){var styleTarget=document.querySelector(target);if(window.HTMLIFrameElement&&styleTarget instanceof window.HTMLIFrameElement)try{styleTarget=styleTarget.contentDocument.head}catch(e){styleTarget=null}memo[target]=styleTarget}return memo[target]}(insert);if(!target)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");target.appendChild(style)}},"./node_modules/style-loader/dist/runtime/insertStyleElement.js":module=>{module.exports=function insertStyleElement(options){var element=document.createElement("style");return options.setAttributes(element,options.attributes),options.insert(element,options.options),element}},"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=function setAttributesWithoutAttributes(styleElement){var nonce=__webpack_require__.nc;nonce&&styleElement.setAttribute("nonce",nonce)}},"./node_modules/style-loader/dist/runtime/styleDomAPI.js":module=>{module.exports=function domAPI(options){if("undefined"==typeof document)return{update:function update(){},remove:function remove(){}};var styleElement=options.insertStyleElement(options);return{update:function update(obj){!function apply(styleElement,options,obj){var css="";obj.supports&&(css+="@supports (".concat(obj.supports,") {")),obj.media&&(css+="@media ".concat(obj.media," {"));var needLayer=void 0!==obj.layer;needLayer&&(css+="@layer".concat(obj.layer.length>0?" ".concat(obj.layer):""," {")),css+=obj.css,needLayer&&(css+="}"),obj.media&&(css+="}"),obj.supports&&(css+="}");var sourceMap=obj.sourceMap;sourceMap&&"undefined"!=typeof btoa&&(css+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))))," */")),options.styleTagTransform(css,styleElement,options.options)}(styleElement,options,obj)},remove:function remove(){!function removeStyleElement(styleElement){if(null===styleElement.parentNode)return!1;styleElement.parentNode.removeChild(styleElement)}(styleElement)}}}},"./node_modules/style-loader/dist/runtime/styleTagTransform.js":module=>{module.exports=function styleTagTransform(css,styleElement){if(styleElement.styleSheet)styleElement.styleSheet.cssText=css;else{for(;styleElement.firstChild;)styleElement.removeChild(styleElement.firstChild);styleElement.appendChild(document.createTextNode(css))}}}}]);