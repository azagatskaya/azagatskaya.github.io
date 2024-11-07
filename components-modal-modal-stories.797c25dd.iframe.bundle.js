"use strict";(self.webpackChunkreact_start_template=self.webpackChunkreact_start_template||[]).push([[134],{"./src/components/modal/modal.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Hidden:()=>Hidden,Visible:()=>Visible,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={title:"Example/Modal",component:__webpack_require__("./src/components/modal/Modal.tsx").Z,tags:["autodocs"],argTypes:{visible:{type:"boolean"},message:{type:"string"}}};var Visible={args:{visible:!0}},Hidden={args:{visible:!1}};Visible.parameters={...Visible.parameters,docs:{...Visible.parameters?.docs,source:{originalSource:"{\n  args: {\n    visible: true\n  }\n}",...Visible.parameters?.docs?.source}}},Hidden.parameters={...Hidden.parameters,docs:{...Hidden.parameters?.docs,source:{originalSource:"{\n  args: {\n    visible: false\n  }\n}",...Hidden.parameters?.docs?.source}}};const __namedExportsOrder=["Visible","Hidden"]},"./node_modules/antd/es/_util/wave/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>wave});var react=__webpack_require__("./node_modules/react/index.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),isVisible=__webpack_require__("./node_modules/rc-util/es/Dom/isVisible.js"),es_ref=__webpack_require__("./node_modules/rc-util/es/ref.js"),context=__webpack_require__("./node_modules/antd/es/config-provider/context.js"),reactNode=__webpack_require__("./node_modules/antd/es/_util/reactNode.js"),genStyleUtils=__webpack_require__("./node_modules/antd/es/theme/util/genStyleUtils.js");const genWaveStyle=token=>{const{componentCls,colorPrimary}=token;return{[componentCls]:{position:"absolute",background:"transparent",pointerEvents:"none",boxSizing:"border-box",color:`var(--wave-color, ${colorPrimary})`,boxShadow:"0 0 0 0 currentcolor",opacity:.2,"&.wave-motion-appear":{transition:[`box-shadow 0.4s ${token.motionEaseOutCirc}`,`opacity 2s ${token.motionEaseOutCirc}`].join(","),"&-active":{boxShadow:"0 0 0 6px currentcolor",opacity:0},"&.wave-quick":{transition:[`box-shadow ${token.motionDurationSlow} ${token.motionEaseInOut}`,`opacity ${token.motionDurationSlow} ${token.motionEaseInOut}`].join(",")}}}}},style=(0,genStyleUtils.A1)("Wave",(token=>[genWaveStyle(token)]));var useEvent=__webpack_require__("./node_modules/rc-util/es/hooks/useEvent.js"),raf=__webpack_require__("./node_modules/rc-util/es/raf.js"),useToken=__webpack_require__("./node_modules/antd/es/theme/useToken.js"),wave_interface=__webpack_require__("./node_modules/antd/es/_util/wave/interface.js"),es=__webpack_require__("./node_modules/rc-motion/es/index.js"),render=__webpack_require__("./node_modules/rc-util/es/React/render.js");function isValidWaveColor(color){return color&&"#fff"!==color&&"#ffffff"!==color&&"rgb(255, 255, 255)"!==color&&"rgba(255, 255, 255, 1)"!==color&&!/rgba\((?:\d*, ){3}0\)/.test(color)&&"transparent"!==color}function validateNum(value){return Number.isNaN(value)?0:value}const WaveEffect=props=>{const{className,target,component}=props,divRef=react.useRef(null),[color,setWaveColor]=react.useState(null),[borderRadius,setBorderRadius]=react.useState([]),[left,setLeft]=react.useState(0),[top,setTop]=react.useState(0),[width,setWidth]=react.useState(0),[height,setHeight]=react.useState(0),[enabled,setEnabled]=react.useState(!1),waveStyle={left,top,width,height,borderRadius:borderRadius.map((radius=>`${radius}px`)).join(" ")};function syncPos(){const nodeStyle=getComputedStyle(target);setWaveColor(function getTargetWaveColor(node){const{borderTopColor,borderColor,backgroundColor}=getComputedStyle(node);return isValidWaveColor(borderTopColor)?borderTopColor:isValidWaveColor(borderColor)?borderColor:isValidWaveColor(backgroundColor)?backgroundColor:null}(target));const isStatic="static"===nodeStyle.position,{borderLeftWidth,borderTopWidth}=nodeStyle;setLeft(isStatic?target.offsetLeft:validateNum(-parseFloat(borderLeftWidth))),setTop(isStatic?target.offsetTop:validateNum(-parseFloat(borderTopWidth))),setWidth(target.offsetWidth),setHeight(target.offsetHeight);const{borderTopLeftRadius,borderTopRightRadius,borderBottomLeftRadius,borderBottomRightRadius}=nodeStyle;setBorderRadius([borderTopLeftRadius,borderTopRightRadius,borderBottomRightRadius,borderBottomLeftRadius].map((radius=>validateNum(parseFloat(radius)))))}if(color&&(waveStyle["--wave-color"]=color),react.useEffect((()=>{if(target){const id=(0,raf.Z)((()=>{syncPos(),setEnabled(!0)}));let resizeObserver;return"undefined"!=typeof ResizeObserver&&(resizeObserver=new ResizeObserver(syncPos),resizeObserver.observe(target)),()=>{raf.Z.cancel(id),null==resizeObserver||resizeObserver.disconnect()}}}),[]),!enabled)return null;const isSmallComponent=("Checkbox"===component||"Radio"===component)&&(null==target?void 0:target.classList.contains(wave_interface.A));return react.createElement(es.ZP,{visible:!0,motionAppear:!0,motionName:"wave-motion",motionDeadline:5e3,onAppearEnd:(_,event)=>{var _a;if(event.deadline||"opacity"===event.propertyName){const holder=null===(_a=divRef.current)||void 0===_a?void 0:_a.parentElement;(0,render.v)(holder).then((()=>{null==holder||holder.remove()}))}return!1}},((_ref,ref)=>{let{className:motionClassName}=_ref;return react.createElement("div",{ref:(0,es_ref.sQ)(divRef,ref),className:classnames_default()(className,motionClassName,{"wave-quick":isSmallComponent}),style:waveStyle})}))},wave_WaveEffect=(target,info)=>{var _a;const{component}=info;if("Checkbox"===component&&!(null===(_a=target.querySelector("input"))||void 0===_a?void 0:_a.checked))return;const holder=document.createElement("div");holder.style.position="absolute",holder.style.left="0px",holder.style.top="0px",null==target||target.insertBefore(holder,null==target?void 0:target.firstChild),(0,render.s)(react.createElement(WaveEffect,Object.assign({},info,{target})),holder)},wave_useWave=(nodeRef,className,component)=>{const{wave}=react.useContext(context.E_),[,token,hashId]=(0,useToken.ZP)(),showWave=(0,useEvent.Z)((event=>{const node=nodeRef.current;if((null==wave?void 0:wave.disabled)||!node)return;const targetNode=node.querySelector(`.${wave_interface.A}`)||node,{showEffect}=wave||{};(showEffect||wave_WaveEffect)(targetNode,{className,token,component,event,hashId})})),rafId=react.useRef();return event=>{raf.Z.cancel(rafId.current),rafId.current=(0,raf.Z)((()=>{showWave(event)}))}};const wave=props=>{const{children,disabled,component}=props,{getPrefixCls}=(0,react.useContext)(context.E_),containerRef=(0,react.useRef)(null),prefixCls=getPrefixCls("wave"),[,hashId]=style(prefixCls),showWave=wave_useWave(containerRef,classnames_default()(prefixCls,hashId),component);if(react.useEffect((()=>{const node=containerRef.current;if(!node||1!==node.nodeType||disabled)return;const onClick=e=>{!(0,isVisible.Z)(e.target)||!node.getAttribute||node.getAttribute("disabled")||node.disabled||node.className.includes("disabled")||node.className.includes("-leave")||showWave(e)};return node.addEventListener("click",onClick,!0),()=>{node.removeEventListener("click",onClick,!0)}}),[disabled]),!react.isValidElement(children))return null!=children?children:null;const ref=(0,es_ref.Yr)(children)?(0,es_ref.sQ)(children.ref,containerRef):containerRef;return(0,reactNode.Tm)(children,{ref})}},"./node_modules/antd/es/_util/wave/interface.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>TARGET_CLS});const TARGET_CLS=`${__webpack_require__("./node_modules/antd/es/config-provider/context.js").Rf}-wave-target`},"./src/components/modal/Modal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Modal});__webpack_require__("./node_modules/react/index.js");var antd__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/antd/es/modal/index.js"),antd__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/antd/es/button/index.js"),antd__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/antd/es/typography/index.js"),react_dom__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-dom/index.js"),react_i18next__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");function Modal(_ref){var visible=_ref.visible,setVisible=_ref.setVisible,message=_ref.message,t=(0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.$G)().t,handleClose=function handleClose(){setVisible(!1)};return visible?(0,react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal)((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(antd__WEBPACK_IMPORTED_MODULE_4__.Z,{title:"Модальное окно",open:visible,onOk:handleClose,onCancel:handleClose,closeIcon:!0,footer:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(antd__WEBPACK_IMPORTED_MODULE_5__.ZP,{type:"primary",onClick:handleClose,children:t("ok")},"submit")],children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(antd__WEBPACK_IMPORTED_MODULE_6__.Z,{children:message})}),document.body):null}try{Modal.displayName="Modal",Modal.__docgenInfo={description:"",displayName:"Modal",props:{visible:{defaultValue:null,description:"",name:"visible",required:!0,type:{name:"boolean"}},setVisible:{defaultValue:null,description:"",name:"setVisible",required:!0,type:{name:"(visible: boolean) => void"}},message:{defaultValue:null,description:"",name:"message",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/modal/Modal.tsx#Modal"]={docgenInfo:Modal.__docgenInfo,name:"Modal",path:"src/components/modal/Modal.tsx#Modal"})}catch(__react_docgen_typescript_loader_error){}},"./node_modules/rc-util/es/React/render.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var react_dom__WEBPACK_IMPORTED_MODULE_0___namespace_cache;__webpack_require__.d(__webpack_exports__,{s:()=>render,v:()=>unmount});var createRoot,_babel_runtime_helpers_esm_regeneratorRuntime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js"),_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/typeof.js"),_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),react_dom__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react-dom/index.js"),fullClone=(0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__.Z)({},react_dom__WEBPACK_IMPORTED_MODULE_0___namespace_cache||(react_dom__WEBPACK_IMPORTED_MODULE_0___namespace_cache=__webpack_require__.t(react_dom__WEBPACK_IMPORTED_MODULE_0__,2))),version=fullClone.version,reactRender=fullClone.render,unmountComponentAtNode=fullClone.unmountComponentAtNode;try{Number((version||"").split(".")[0])>=18&&(createRoot=fullClone.createRoot)}catch(e){}function toggleWarning(skip){var __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=fullClone.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED&&"object"===(0,_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_2__.Z)(__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)&&(__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.usingClientEntryPoint=skip)}var MARK="__rc_react_root__";function render(node,container){createRoot?function modernRender(node,container){toggleWarning(!0);var root=container[MARK]||createRoot(container);toggleWarning(!1),root.render(node),container[MARK]=root}(node,container):function legacyRender(node,container){reactRender(node,container)}(node,container)}function modernUnmount(_x){return _modernUnmount.apply(this,arguments)}function _modernUnmount(){return(_modernUnmount=(0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__.Z)((0,_babel_runtime_helpers_esm_regeneratorRuntime__WEBPACK_IMPORTED_MODULE_4__.Z)().mark((function _callee(container){return(0,_babel_runtime_helpers_esm_regeneratorRuntime__WEBPACK_IMPORTED_MODULE_4__.Z)().wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:return _context.abrupt("return",Promise.resolve().then((function(){var _container$MARK;null===(_container$MARK=container[MARK])||void 0===_container$MARK||_container$MARK.unmount(),delete container[MARK]})));case 1:case"end":return _context.stop()}}),_callee)})))).apply(this,arguments)}function legacyUnmount(container){unmountComponentAtNode(container)}function unmount(_x2){return _unmount.apply(this,arguments)}function _unmount(){return(_unmount=(0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__.Z)((0,_babel_runtime_helpers_esm_regeneratorRuntime__WEBPACK_IMPORTED_MODULE_4__.Z)().mark((function _callee2(container){return(0,_babel_runtime_helpers_esm_regeneratorRuntime__WEBPACK_IMPORTED_MODULE_4__.Z)().wrap((function _callee2$(_context2){for(;;)switch(_context2.prev=_context2.next){case 0:if(void 0===createRoot){_context2.next=2;break}return _context2.abrupt("return",modernUnmount(container));case 2:legacyUnmount(container);case 3:case"end":return _context2.stop()}}),_callee2)})))).apply(this,arguments)}},"./node_modules/rc-util/es/pickAttrs.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>pickAttrs});var _babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),propList="".concat("accept acceptCharset accessKey action allowFullScreen allowTransparency\n    alt async autoComplete autoFocus autoPlay capture cellPadding cellSpacing challenge\n    charSet checked classID className colSpan cols content contentEditable contextMenu\n    controls coords crossOrigin data dateTime default defer dir disabled download draggable\n    encType form formAction formEncType formMethod formNoValidate formTarget frameBorder\n    headers height hidden high href hrefLang htmlFor httpEquiv icon id inputMode integrity\n    is keyParams keyType kind label lang list loop low manifest marginHeight marginWidth max maxLength media\n    mediaGroup method min minLength multiple muted name noValidate nonce open\n    optimum pattern placeholder poster preload radioGroup readOnly rel required\n    reversed role rowSpan rows sandbox scope scoped scrolling seamless selected\n    shape size sizes span spellCheck src srcDoc srcLang srcSet start step style\n    summary tabIndex target title type useMap value width wmode wrap"," ").concat("onCopy onCut onPaste onCompositionEnd onCompositionStart onCompositionUpdate onKeyDown\n    onKeyPress onKeyUp onFocus onBlur onChange onInput onSubmit onClick onContextMenu onDoubleClick\n    onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown\n    onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onSelect onTouchCancel\n    onTouchEnd onTouchMove onTouchStart onScroll onWheel onAbort onCanPlay onCanPlayThrough\n    onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata\n    onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting onLoad onError").split(/[\s\n]+/),ariaPrefix="aria-",dataPrefix="data-";function match(key,prefix){return 0===key.indexOf(prefix)}function pickAttrs(props){var mergedConfig,ariaOnly=arguments.length>1&&void 0!==arguments[1]&&arguments[1];mergedConfig=!1===ariaOnly?{aria:!0,data:!0,attr:!0}:!0===ariaOnly?{aria:!0}:(0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.Z)({},ariaOnly);var attrs={};return Object.keys(props).forEach((function(key){(mergedConfig.aria&&("role"===key||match(key,ariaPrefix))||mergedConfig.data&&match(key,dataPrefix)||mergedConfig.attr&&propList.includes(key))&&(attrs[key]=props[key])})),attrs}}}]);