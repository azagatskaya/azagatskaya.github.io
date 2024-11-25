"use strict";(self.webpackChunkreact_start_template=self.webpackChunkreact_start_template||[]).push([[181],{"./src/stories/ModalOpen.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>ModalOpen_stories});var react=__webpack_require__("./node_modules/react/index.js"),flex=__webpack_require__("./node_modules/antd/es/flex/index.js"),input=__webpack_require__("./node_modules/antd/es/input/index.js"),es_button=__webpack_require__("./node_modules/antd/es/button/index.js"),Modal=__webpack_require__("./src/components/modal/Modal.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(r,l){var t=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=t){var e,n,i,u,a=[],f=!0,o=!1;try{if(i=(t=t.call(r)).next,0===l){if(Object(t)!==t)return;f=!1}else for(;!(f=(e=i.call(t)).done)&&(a.push(e.value),a.length!==l);f=!0);}catch(r){o=!0,n=r}finally{try{if(!f&&null!=t.return&&(u=t.return(),Object(u)!==u))return}finally{if(o)throw n}}return a}}(arr,i)||function _unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function ModalOpen(){var _useState2=_slicedToArray((0,react.useState)("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id volutpat leo. Integer mattis neque nec velit elementum, ac rutrum."),2),message=_useState2[0],setMessage=_useState2[1],_useState4=_slicedToArray((0,react.useState)(!1),2),visible=_useState4[0],setVisible=_useState4[1];return(0,jsx_runtime.jsxs)(flex.Z,{gap:"middle",vertical:!0,children:[(0,jsx_runtime.jsx)(input.Z,{value:message,onChange:function handleInputChange(e){setMessage(e.target.value)},placeholder:"Текст для модального окна"}),(0,jsx_runtime.jsx)(es_button.ZP,{type:"primary",onClick:function onClick(){return setVisible(!0)},children:"Открыть"}),(0,jsx_runtime.jsx)(Modal.Z,{visible,setVisible,message})]})}ModalOpen.displayName="ModalOpen";const ModalOpen_stories={title:"Example/ModalOpen",component:ModalOpen,argTypes:{visible:{type:"boolean"}}};var Default={args:{visible:!1}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {\n    visible: false\n  }\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./node_modules/antd/es/flex/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>flex});var react=__webpack_require__("./node_modules/react/index.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),omit=__webpack_require__("./node_modules/rc-util/es/omit.js");function isPresetSize(size){return["small","middle","large"].includes(size)}var context=__webpack_require__("./node_modules/antd/es/config-provider/context.js"),genStyleUtils=__webpack_require__("./node_modules/antd/es/theme/util/genStyleUtils.js"),es=__webpack_require__("./node_modules/@ant-design/cssinjs-utils/es/index.js");const flexWrapValues=["wrap","nowrap","wrap-reverse"],justifyContentValues=["flex-start","flex-end","start","end","center","space-between","space-around","space-evenly","stretch","normal","left","right"],alignItemsValues=["center","start","end","flex-start","flex-end","self-start","self-end","baseline","normal","stretch"];const utils=function createFlexClassNames(prefixCls,props){return classnames_default()(Object.assign(Object.assign(Object.assign({},((prefixCls,props)=>{const wrap=!0===props.wrap?"wrap":props.wrap;return{[`${prefixCls}-wrap-${wrap}`]:wrap&&flexWrapValues.includes(wrap)}})(prefixCls,props)),((prefixCls,props)=>{const alignCls={};return alignItemsValues.forEach((cssKey=>{alignCls[`${prefixCls}-align-${cssKey}`]=props.align===cssKey})),alignCls[`${prefixCls}-align-stretch`]=!props.align&&!!props.vertical,alignCls})(prefixCls,props)),((prefixCls,props)=>{const justifyCls={};return justifyContentValues.forEach((cssKey=>{justifyCls[`${prefixCls}-justify-${cssKey}`]=props.justify===cssKey})),justifyCls})(prefixCls,props)))},genFlexStyle=token=>{const{componentCls}=token;return{[componentCls]:{display:"flex","&-vertical":{flexDirection:"column"},"&-rtl":{direction:"rtl"},"&:empty":{display:"none"}}}},genFlexGapStyle=token=>{const{componentCls}=token;return{[componentCls]:{"&-gap-small":{gap:token.flexGapSM},"&-gap-middle":{gap:token.flexGap},"&-gap-large":{gap:token.flexGapLG}}}},genFlexWrapStyle=token=>{const{componentCls}=token,wrapStyle={};return flexWrapValues.forEach((value=>{wrapStyle[`${componentCls}-wrap-${value}`]={flexWrap:value}})),wrapStyle},genAlignItemsStyle=token=>{const{componentCls}=token,alignStyle={};return alignItemsValues.forEach((value=>{alignStyle[`${componentCls}-align-${value}`]={alignItems:value}})),alignStyle},genJustifyContentStyle=token=>{const{componentCls}=token,justifyStyle={};return justifyContentValues.forEach((value=>{justifyStyle[`${componentCls}-justify-${value}`]={justifyContent:value}})),justifyStyle},flex_style=(0,genStyleUtils.I$)("Flex",(token=>{const{paddingXS,padding,paddingLG}=token,flexToken=(0,es.IX)(token,{flexGapSM:paddingXS,flexGap:padding,flexGapLG:paddingLG});return[genFlexStyle(flexToken),genFlexGapStyle(flexToken),genFlexWrapStyle(flexToken),genAlignItemsStyle(flexToken),genJustifyContentStyle(flexToken)]}),(()=>({})),{resetStyle:!1});var __rest=function(s,e){var t={};for(var p in s)Object.prototype.hasOwnProperty.call(s,p)&&e.indexOf(p)<0&&(t[p]=s[p]);if(null!=s&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(p=Object.getOwnPropertySymbols(s);i<p.length;i++)e.indexOf(p[i])<0&&Object.prototype.propertyIsEnumerable.call(s,p[i])&&(t[p[i]]=s[p[i]])}return t};const Flex=react.forwardRef(((props,ref)=>{const{prefixCls:customizePrefixCls,rootClassName,className,style,flex,gap,children,vertical=!1,component:Component="div"}=props,othersProps=__rest(props,["prefixCls","rootClassName","className","style","flex","gap","children","vertical","component"]),{flex:ctxFlex,direction:ctxDirection,getPrefixCls}=react.useContext(context.E_),prefixCls=getPrefixCls("flex",customizePrefixCls),[wrapCSSVar,hashId,cssVarCls]=flex_style(prefixCls),mergedVertical=null!=vertical?vertical:null==ctxFlex?void 0:ctxFlex.vertical,mergedCls=classnames_default()(className,rootClassName,null==ctxFlex?void 0:ctxFlex.className,prefixCls,hashId,cssVarCls,utils(prefixCls,props),{[`${prefixCls}-rtl`]:"rtl"===ctxDirection,[`${prefixCls}-gap-${gap}`]:isPresetSize(gap),[`${prefixCls}-vertical`]:mergedVertical}),mergedStyle=Object.assign(Object.assign({},null==ctxFlex?void 0:ctxFlex.style),style);return flex&&(mergedStyle.flex=flex),gap&&!isPresetSize(gap)&&(mergedStyle.gap=gap),wrapCSSVar(react.createElement(Component,Object.assign({ref,className:mergedCls,style:mergedStyle},(0,omit.Z)(othersProps,["justify","wrap","align"])),children))}));const flex=Flex},"./src/components/modal/Modal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Modal});__webpack_require__("./node_modules/react/index.js");var antd__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/antd/es/modal/index.js"),antd__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/antd/es/button/index.js"),antd__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/antd/es/typography/index.js"),react_dom__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-dom/index.js"),react_i18next__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react-i18next/dist/es/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");function Modal(_ref){var visible=_ref.visible,setVisible=_ref.setVisible,message=_ref.message,t=(0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.$G)().t,handleClose=function handleClose(){setVisible(!1)};return visible?(0,react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal)((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(antd__WEBPACK_IMPORTED_MODULE_4__.Z,{title:"Модальное окно",open:visible,onOk:handleClose,onCancel:handleClose,closeIcon:!0,footer:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(antd__WEBPACK_IMPORTED_MODULE_5__.ZP,{type:"primary",onClick:handleClose,children:t("ok")},"submit")],children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(antd__WEBPACK_IMPORTED_MODULE_6__.Z,{children:message})}),document.body):null}try{Modal.displayName="Modal",Modal.__docgenInfo={description:"",displayName:"Modal",props:{visible:{defaultValue:null,description:"",name:"visible",required:!0,type:{name:"boolean"}},setVisible:{defaultValue:null,description:"",name:"setVisible",required:!0,type:{name:"(visible: boolean) => void"}},message:{defaultValue:null,description:"",name:"message",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/modal/Modal.tsx#Modal"]={docgenInfo:Modal.__docgenInfo,name:"Modal",path:"src/components/modal/Modal.tsx#Modal"})}catch(__react_docgen_typescript_loader_error){}}}]);