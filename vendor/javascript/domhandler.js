import{ElementType as t,isTag as e}from"domelementtype";class Node{constructor(){this.parent=null;this.prev=null;this.next=null;this.startIndex=null;this.endIndex=null}get parentNode(){return this.parent}set parentNode(t){this.parent=t}get previousSibling(){return this.prev}set previousSibling(t){this.prev=t}get nextSibling(){return this.next}set nextSibling(t){this.next=t}
/**
     * Clone this node, and optionally its children.
     *
     * @param recursive Clone child nodes as well.
     * @returns A clone of the node.
     */cloneNode(t=false){return cloneNode(this,t)}}class DataNode extends Node{
/**
     * @param data The content of the data node
     */
constructor(t){super();this.data=t}get nodeValue(){return this.data}set nodeValue(t){this.data=t}}class Text extends DataNode{constructor(){super(...arguments);this.type=t.Text}get nodeType(){return 3}}class Comment extends DataNode{constructor(){super(...arguments);this.type=t.Comment}get nodeType(){return 8}}class ProcessingInstruction extends DataNode{constructor(e,n){super(n);this.name=e;this.type=t.Directive}get nodeType(){return 1}}class NodeWithChildren extends Node{
/**
     * @param children Children of the node. Only certain node types can have children.
     */
constructor(t){super();this.children=t}get firstChild(){var t;return null!==(t=this.children[0])&&void 0!==t?t:null}get lastChild(){return this.children.length>0?this.children[this.children.length-1]:null}get childNodes(){return this.children}set childNodes(t){this.children=t}}class CDATA extends NodeWithChildren{constructor(){super(...arguments);this.type=t.CDATA}get nodeType(){return 4}}class Document extends NodeWithChildren{constructor(){super(...arguments);this.type=t.Root}get nodeType(){return 9}}class Element extends NodeWithChildren{
/**
     * @param name Name of the tag, eg. `div`, `span`.
     * @param attribs Object mapping attribute names to attribute values.
     * @param children Children of the node.
     */
constructor(e,n,s=[],i=("script"===e?t.Script:"style"===e?t.Style:t.Tag)){super(s);this.name=e;this.attribs=n;this.type=i}get nodeType(){return 1}get tagName(){return this.name}set tagName(t){this.name=t}get attributes(){return Object.keys(this.attribs).map((t=>{var e,n;return{name:t,value:this.attribs[t],namespace:null===(e=this["x-attribsNamespace"])||void 0===e?void 0:e[t],prefix:null===(n=this["x-attribsPrefix"])||void 0===n?void 0:n[t]}}))}}
/**
 * @param node Node to check.
 * @returns `true` if the node is a `Element`, `false` otherwise.
 */function isTag(t){return e(t)}
/**
 * @param node Node to check.
 * @returns `true` if the node has the type `CDATA`, `false` otherwise.
 */function isCDATA(e){return e.type===t.CDATA}
/**
 * @param node Node to check.
 * @returns `true` if the node has the type `Text`, `false` otherwise.
 */function isText(e){return e.type===t.Text}
/**
 * @param node Node to check.
 * @returns `true` if the node has the type `Comment`, `false` otherwise.
 */function isComment(e){return e.type===t.Comment}
/**
 * @param node Node to check.
 * @returns `true` if the node has the type `ProcessingInstruction`, `false` otherwise.
 */function isDirective(e){return e.type===t.Directive}
/**
 * @param node Node to check.
 * @returns `true` if the node has the type `ProcessingInstruction`, `false` otherwise.
 */function isDocument(e){return e.type===t.Root}
/**
 * @param node Node to check.
 * @returns `true` if the node has children, `false` otherwise.
 */function hasChildren(t){return Object.prototype.hasOwnProperty.call(t,"children")}
/**
 * Clone a node, and optionally its children.
 *
 * @param recursive Clone child nodes as well.
 * @returns A clone of the node.
 */function cloneNode(t,e=false){let n;if(isText(t))n=new Text(t.data);else if(isComment(t))n=new Comment(t.data);else if(isTag(t)){const s=e?cloneChildren(t.children):[];const i=new Element(t.name,{...t.attribs},s);s.forEach((t=>t.parent=i));null!=t.namespace&&(i.namespace=t.namespace);t["x-attribsNamespace"]&&(i["x-attribsNamespace"]={...t["x-attribsNamespace"]});t["x-attribsPrefix"]&&(i["x-attribsPrefix"]={...t["x-attribsPrefix"]});n=i}else if(isCDATA(t)){const s=e?cloneChildren(t.children):[];const i=new CDATA(s);s.forEach((t=>t.parent=i));n=i}else if(isDocument(t)){const s=e?cloneChildren(t.children):[];const i=new Document(s);s.forEach((t=>t.parent=i));t["x-mode"]&&(i["x-mode"]=t["x-mode"]);n=i}else{if(!isDirective(t))throw new Error(`Not implemented yet: ${t.type}`);{const e=new ProcessingInstruction(t.name,t.data);if(null!=t["x-name"]){e["x-name"]=t["x-name"];e["x-publicId"]=t["x-publicId"];e["x-systemId"]=t["x-systemId"]}n=e}}n.startIndex=t.startIndex;n.endIndex=t.endIndex;null!=t.sourceCodeLocation&&(n.sourceCodeLocation=t.sourceCodeLocation);return n}function cloneChildren(t){const e=t.map((t=>cloneNode(t,true)));for(let t=1;t<e.length;t++){e[t].prev=e[t-1];e[t-1].next=e[t]}return e}const n={withStartIndices:false,withEndIndices:false,xmlMode:false};class DomHandler{
/**
     * @param callback Called once parsing has completed.
     * @param options Settings for the handler.
     * @param elementCB Callback whenever a tag is closed.
     */
constructor(t,e,s){this.dom=[];this.root=new Document(this.dom);this.done=false;this.tagStack=[this.root];this.lastNode=null;this.parser=null;if("function"===typeof e){s=e;e=n}if("object"===typeof t){e=t;t=void 0}this.callback=null!==t&&void 0!==t?t:null;this.options=null!==e&&void 0!==e?e:n;this.elementCB=null!==s&&void 0!==s?s:null}onparserinit(t){this.parser=t}onreset(){this.dom=[];this.root=new Document(this.dom);this.done=false;this.tagStack=[this.root];this.lastNode=null;this.parser=null}onend(){if(!this.done){this.done=true;this.parser=null;this.handleCallback(null)}}onerror(t){this.handleCallback(t)}onclosetag(){this.lastNode=null;const t=this.tagStack.pop();this.options.withEndIndices&&(t.endIndex=this.parser.endIndex);this.elementCB&&this.elementCB(t)}onopentag(e,n){const s=this.options.xmlMode?t.Tag:void 0;const i=new Element(e,n,void 0,s);this.addNode(i);this.tagStack.push(i)}ontext(e){const{lastNode:n}=this;if(n&&n.type===t.Text){n.data+=e;this.options.withEndIndices&&(n.endIndex=this.parser.endIndex)}else{const t=new Text(e);this.addNode(t);this.lastNode=t}}oncomment(e){if(this.lastNode&&this.lastNode.type===t.Comment){this.lastNode.data+=e;return}const n=new Comment(e);this.addNode(n);this.lastNode=n}oncommentend(){this.lastNode=null}oncdatastart(){const t=new Text("");const e=new CDATA([t]);this.addNode(e);t.parent=e;this.lastNode=t}oncdataend(){this.lastNode=null}onprocessinginstruction(t,e){const n=new ProcessingInstruction(t,e);this.addNode(n)}handleCallback(t){if("function"===typeof this.callback)this.callback(t,this.dom);else if(t)throw t}addNode(t){const e=this.tagStack[this.tagStack.length-1];const n=e.children[e.children.length-1];this.options.withStartIndices&&(t.startIndex=this.parser.startIndex);this.options.withEndIndices&&(t.endIndex=this.parser.endIndex);e.children.push(t);if(n){t.prev=n;n.next=t}t.parent=e;this.lastNode=null}}export{CDATA,Comment,DataNode,Document,DomHandler,Element,Node,NodeWithChildren,ProcessingInstruction,Text,cloneNode,DomHandler as default,hasChildren,isCDATA,isComment,isDirective,isDocument,isTag,isText};

