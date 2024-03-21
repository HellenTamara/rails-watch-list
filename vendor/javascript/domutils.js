import{hasChildren as e,isTag as t,isCDATA as n,isText as i,isComment as r}from"domhandler";export{hasChildren,isCDATA,isComment,isDocument,isTag,isText}from"domhandler";import l from"dom-serializer";import{ElementType as o}from"domelementtype";
/**
 * @category Stringify
 * @deprecated Use the `dom-serializer` module directly.
 * @param node Node to get the outer HTML of.
 * @param options Options for serialization.
 * @returns `node`'s outer HTML.
 */function getOuterHTML(e,t){return l(e,t)}
/**
 * @category Stringify
 * @deprecated Use the `dom-serializer` module directly.
 * @param node Node to get the inner HTML of.
 * @param options Options for serialization.
 * @returns `node`'s inner HTML.
 */function getInnerHTML(t,n){return e(t)?t.children.map((e=>getOuterHTML(e,n))).join(""):""}
/**
 * Get a node's inner text. Same as `textContent`, but inserts newlines for `<br>` tags. Ignores comments.
 *
 * @category Stringify
 * @deprecated Use `textContent` instead.
 * @param node Node to get the inner text of.
 * @returns `node`'s inner text.
 */function getText(e){return Array.isArray(e)?e.map(getText).join(""):t(e)?"br"===e.name?"\n":getText(e.children):n(e)?getText(e.children):i(e)?e.data:""}
/**
 * Get a node's text content. Ignores comments.
 *
 * @category Stringify
 * @param node Node to get the text content of.
 * @returns `node`'s text content.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent}
 */function textContent(t){return Array.isArray(t)?t.map(textContent).join(""):e(t)&&!r(t)?textContent(t.children):i(t)?t.data:""}
/**
 * Get a node's inner text, ignoring `<script>` and `<style>` tags. Ignores comments.
 *
 * @category Stringify
 * @param node Node to get the inner text of.
 * @returns `node`'s inner text.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/innerText}
 */function innerText(t){return Array.isArray(t)?t.map(innerText).join(""):e(t)&&(t.type===o.Tag||n(t))?innerText(t.children):i(t)?t.data:""}
/**
 * Get a node's children.
 *
 * @category Traversal
 * @param elem Node to get the children of.
 * @returns `elem`'s children, or an empty array.
 */function getChildren(t){return e(t)?t.children:[]}
/**
 * Get a node's parent.
 *
 * @category Traversal
 * @param elem Node to get the parent of.
 * @returns `elem`'s parent node, or `null` if `elem` is a root node.
 */function getParent(e){return e.parent||null}
/**
 * Gets an elements siblings, including the element itself.
 *
 * Attempts to get the children through the element's parent first. If we don't
 * have a parent (the element is a root node), we walk the element's `prev` &
 * `next` to get all remaining nodes.
 *
 * @category Traversal
 * @param elem Element to get the siblings of.
 * @returns `elem`'s siblings, including `elem`.
 */function getSiblings(e){const t=getParent(e);if(null!=t)return getChildren(t);const n=[e];let{prev:i,next:r}=e;while(null!=i){n.unshift(i);({prev:i}=i)}while(null!=r){n.push(r);({next:r}=r)}return n}
/**
 * Gets an attribute from an element.
 *
 * @category Traversal
 * @param elem Element to check.
 * @param name Attribute name to retrieve.
 * @returns The element's attribute value, or `undefined`.
 */function getAttributeValue(e,t){var n;return null===(n=e.attribs)||void 0===n?void 0:n[t]}
/**
 * Checks whether an element has an attribute.
 *
 * @category Traversal
 * @param elem Element to check.
 * @param name Attribute name to look for.
 * @returns Returns whether `elem` has the attribute `name`.
 */function hasAttrib(e,t){return null!=e.attribs&&Object.prototype.hasOwnProperty.call(e.attribs,t)&&null!=e.attribs[t]}
/**
 * Get the tag name of an element.
 *
 * @category Traversal
 * @param elem The element to get the name for.
 * @returns The tag name of `elem`.
 */function getName(e){return e.name}
/**
 * Returns the next element sibling of a node.
 *
 * @category Traversal
 * @param elem The element to get the next sibling of.
 * @returns `elem`'s next sibling that is a tag, or `null` if there is no next
 * sibling.
 */function nextElementSibling(e){let{next:n}=e;while(null!==n&&!t(n))({next:n}=n);return n}
/**
 * Returns the previous element sibling of a node.
 *
 * @category Traversal
 * @param elem The element to get the previous sibling of.
 * @returns `elem`'s previous sibling that is a tag, or `null` if there is no
 * previous sibling.
 */function prevElementSibling(e){let{prev:n}=e;while(null!==n&&!t(n))({prev:n}=n);return n}
/**
 * Remove an element from the dom
 *
 * @category Manipulation
 * @param elem The element to be removed
 */function removeElement(e){e.prev&&(e.prev.next=e.next);e.next&&(e.next.prev=e.prev);if(e.parent){const t=e.parent.children;const n=t.lastIndexOf(e);n>=0&&t.splice(n,1)}e.next=null;e.prev=null;e.parent=null}
/**
 * Replace an element in the dom
 *
 * @category Manipulation
 * @param elem The element to be replaced
 * @param replacement The element to be added
 */function replaceElement(e,t){const n=t.prev=e.prev;n&&(n.next=t);const i=t.next=e.next;i&&(i.prev=t);const r=t.parent=e.parent;if(r){const n=r.children;n[n.lastIndexOf(e)]=t;e.parent=null}}
/**
 * Append a child to an element.
 *
 * @category Manipulation
 * @param parent The element to append to.
 * @param child The element to be added as a child.
 */function appendChild(e,t){removeElement(t);t.next=null;t.parent=e;if(e.children.push(t)>1){const n=e.children[e.children.length-2];n.next=t;t.prev=n}else t.prev=null}
/**
 * Append an element after another.
 *
 * @category Manipulation
 * @param elem The element to append after.
 * @param next The element be added.
 */function append(e,t){removeElement(t);const{parent:n}=e;const i=e.next;t.next=i;t.prev=e;e.next=t;t.parent=n;if(i){i.prev=t;if(n){const e=n.children;e.splice(e.lastIndexOf(i),0,t)}}else n&&n.children.push(t)}
/**
 * Prepend a child to an element.
 *
 * @category Manipulation
 * @param parent The element to prepend before.
 * @param child The element to be added as a child.
 */function prependChild(e,t){removeElement(t);t.parent=e;t.prev=null;if(1!==e.children.unshift(t)){const n=e.children[1];n.prev=t;t.next=n}else t.next=null}
/**
 * Prepend an element before another.
 *
 * @category Manipulation
 * @param elem The element to prepend before.
 * @param prev The element be added.
 */function prepend(e,t){removeElement(t);const{parent:n}=e;if(n){const i=n.children;i.splice(i.indexOf(e),0,t)}e.prev&&(e.prev.next=t);t.parent=n;t.prev=e.prev;t.next=e;e.prev=t}
/**
 * Search a node and its children for nodes passing a test function. If `node` is not an array, it will be wrapped in one.
 *
 * @category Querying
 * @param test Function to test nodes on.
 * @param node Node to search. Will be included in the result set if it matches.
 * @param recurse Also consider child nodes.
 * @param limit Maximum number of nodes to return.
 * @returns All nodes passing `test`.
 */function filter(e,t,n=true,i=Infinity){return find(e,Array.isArray(t)?t:[t],n,i)}
/**
 * Search an array of nodes and their children for nodes passing a test function.
 *
 * @category Querying
 * @param test Function to test nodes on.
 * @param nodes Array of nodes to search.
 * @param recurse Also consider child nodes.
 * @param limit Maximum number of nodes to return.
 * @returns All nodes passing `test`.
 */function find(t,n,i,r){const l=[];const o=[n];const a=[0];for(;;){if(a[0]>=o[0].length){if(1===a.length)return l;o.shift();a.shift();continue}const n=o[0][a[0]++];if(t(n)){l.push(n);if(--r<=0)return l}if(i&&e(n)&&n.children.length>0){a.unshift(0);o.unshift(n.children)}}}
/**
 * Finds the first element inside of an array that matches a test function. This is an alias for `Array.prototype.find`.
 *
 * @category Querying
 * @param test Function to test nodes on.
 * @param nodes Array of nodes to search.
 * @returns The first node in the array that passes `test`.
 * @deprecated Use `Array.prototype.find` directly.
 */function findOneChild(e,t){return t.find(e)}
/**
 * Finds one element in a tree that passes a test.
 *
 * @category Querying
 * @param test Function to test nodes on.
 * @param nodes Node or array of nodes to search.
 * @param recurse Also consider child nodes.
 * @returns The first node that passes `test`.
 */function findOne(e,n,i=true){let r=null;for(let l=0;l<n.length&&!r;l++){const o=n[l];t(o)&&(e(o)?r=o:i&&o.children.length>0&&(r=findOne(e,o.children,true)))}return r}
/**
 * Checks if a tree of nodes contains at least one node passing a test.
 *
 * @category Querying
 * @param test Function to test nodes on.
 * @param nodes Array of nodes to search.
 * @returns Whether a tree of nodes contains at least one node passing the test.
 */function existsOne(e,n){return n.some((n=>t(n)&&(e(n)||existsOne(e,n.children))))}
/**
 * Search an array of nodes and their children for elements passing a test function.
 *
 * Same as `find`, but limited to elements and with less options, leading to reduced complexity.
 *
 * @category Querying
 * @param test Function to test nodes on.
 * @param nodes Array of nodes to search.
 * @returns All nodes passing `test`.
 */function findAll(e,n){const i=[];const r=[n];const l=[0];for(;;){if(l[0]>=r[0].length){if(1===r.length)return i;r.shift();l.shift();continue}const n=r[0][l[0]++];if(t(n)){e(n)&&i.push(n);if(n.children.length>0){l.unshift(0);r.unshift(n.children)}}}}const a={tag_name(e){return"function"===typeof e?n=>t(n)&&e(n.name):"*"===e?t:n=>t(n)&&n.name===e},tag_type(e){return"function"===typeof e?t=>e(t.type):t=>t.type===e},tag_contains(e){return"function"===typeof e?t=>i(t)&&e(t.data):t=>i(t)&&t.data===e}};
/**
 * Returns a function to check whether a node has an attribute with a particular
 * value.
 *
 * @param attrib Attribute to check.
 * @param value Attribute value to look for.
 * @returns A function to check whether the a node has an attribute with a
 *   particular value.
 */function getAttribCheck(e,n){return"function"===typeof n?i=>t(i)&&n(i.attribs[e]):i=>t(i)&&i.attribs[e]===n}
/**
 * Returns a function that returns `true` if either of the input functions
 * returns `true` for a node.
 *
 * @param a First function to combine.
 * @param b Second function to combine.
 * @returns A function taking a node and returning `true` if either of the input
 *   functions returns `true` for the node.
 */function combineFuncs(e,t){return n=>e(n)||t(n)}
/**
 * Returns a function that executes all checks in `options` and returns `true`
 * if any of them match a node.
 *
 * @param options An object describing nodes to look for.
 * @returns A function that executes all checks in `options` and returns `true`
 *   if any of them match a node.
 */function compileTest(e){const t=Object.keys(e).map((t=>{const n=e[t];return Object.prototype.hasOwnProperty.call(a,t)?a[t](n):getAttribCheck(t,n)}));return 0===t.length?null:t.reduce(combineFuncs)}
/**
 * Checks whether a node matches the description in `options`.
 *
 * @category Legacy Query Functions
 * @param options An object describing nodes to look for.
 * @param node The element to test.
 * @returns Whether the element matches the description in `options`.
 */function testElement(e,t){const n=compileTest(e);return!n||n(t)}
/**
 * Returns all nodes that match `options`.
 *
 * @category Legacy Query Functions
 * @param options An object describing nodes to look for.
 * @param nodes Nodes to search through.
 * @param recurse Also consider child nodes.
 * @param limit Maximum number of nodes to return.
 * @returns All nodes that match `options`.
 */function getElements(e,t,n,i=Infinity){const r=compileTest(e);return r?filter(r,t,n,i):[]}
/**
 * Returns the node with the supplied ID.
 *
 * @category Legacy Query Functions
 * @param id The unique ID attribute value to look for.
 * @param nodes Nodes to search through.
 * @param recurse Also consider child nodes.
 * @returns The node with the supplied ID.
 */function getElementById(e,t,n=true){Array.isArray(t)||(t=[t]);return findOne(getAttribCheck("id",e),t,n)}
/**
 * Returns all nodes with the supplied `tagName`.
 *
 * @category Legacy Query Functions
 * @param tagName Tag name to search for.
 * @param nodes Nodes to search through.
 * @param recurse Also consider child nodes.
 * @param limit Maximum number of nodes to return.
 * @returns All nodes with the supplied `tagName`.
 */function getElementsByTagName(e,t,n=true,i=Infinity){return filter(a.tag_name(e),t,n,i)}
/**
 * Returns all nodes with the supplied `type`.
 *
 * @category Legacy Query Functions
 * @param type Element type to look for.
 * @param nodes Nodes to search through.
 * @param recurse Also consider child nodes.
 * @param limit Maximum number of nodes to return.
 * @returns All nodes with the supplied `type`.
 */function getElementsByTagType(e,t,n=true,i=Infinity){return filter(a.tag_type(e),t,n,i)}
/**
 * Given an array of nodes, remove any member that is contained by another
 * member.
 *
 * @category Helpers
 * @param nodes Nodes to filter.
 * @returns Remaining nodes that aren't contained by other nodes.
 */function removeSubsets(e){let t=e.length;while(--t>=0){const n=e[t];if(t>0&&e.lastIndexOf(n,t-1)>=0)e.splice(t,1);else for(let i=n.parent;i;i=i.parent)if(e.includes(i)){e.splice(t,1);break}}return e}var c;(function(e){e[e.DISCONNECTED=1]="DISCONNECTED";e[e.PRECEDING=2]="PRECEDING";e[e.FOLLOWING=4]="FOLLOWING";e[e.CONTAINS=8]="CONTAINS";e[e.CONTAINED_BY=16]="CONTAINED_BY"})(c||(c={}));
/**
 * Compare the position of one node against another node in any other document,
 * returning a bitmask with the values from {@link DocumentPosition}.
 *
 * Document order:
 * > There is an ordering, document order, defined on all the nodes in the
 * > document corresponding to the order in which the first character of the
 * > XML representation of each node occurs in the XML representation of the
 * > document after expansion of general entities. Thus, the document element
 * > node will be the first node. Element nodes occur before their children.
 * > Thus, document order orders element nodes in order of the occurrence of
 * > their start-tag in the XML (after expansion of entities). The attribute
 * > nodes of an element occur after the element and before its children. The
 * > relative order of attribute nodes is implementation-dependent.
 *
 * Source:
 * http://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-document-order
 *
 * @category Helpers
 * @param nodeA The first node to use in the comparison
 * @param nodeB The second node to use in the comparison
 * @returns A bitmask describing the input nodes' relative position.
 *
 * See http://dom.spec.whatwg.org/#dom-node-comparedocumentposition for
 * a description of these values.
 */function compareDocumentPosition(t,n){const i=[];const r=[];if(t===n)return 0;let l=e(t)?t:t.parent;while(l){i.unshift(l);l=l.parent}l=e(n)?n:n.parent;while(l){r.unshift(l);l=l.parent}const o=Math.min(i.length,r.length);let a=0;while(a<o&&i[a]===r[a])a++;if(0===a)return c.DISCONNECTED;const s=i[a-1];const u=s.children;const d=i[a];const f=r[a];return u.indexOf(d)>u.indexOf(f)?s===n?c.FOLLOWING|c.CONTAINED_BY:c.FOLLOWING:s===t?c.PRECEDING|c.CONTAINS:c.PRECEDING}
/**
 * Sort an array of nodes based on their relative position in the document,
 * removing any duplicate nodes. If the array contains nodes that do not belong
 * to the same document, sort order is unspecified.
 *
 * @category Helpers
 * @param nodes Array of DOM nodes.
 * @returns Collection of unique nodes, sorted in document order.
 */function uniqueSort(e){e=e.filter(((e,t,n)=>!n.includes(e,t+1)));e.sort(((e,t)=>{const n=compareDocumentPosition(e,t);return n&c.PRECEDING?-1:n&c.FOLLOWING?1:0}));return e}
/**
 * Get the feed object from the root of a DOM tree.
 *
 * @category Feeds
 * @param doc - The DOM to to extract the feed from.
 * @returns The feed.
 */function getFeed(e){const t=getOneElement(isValidFeed,e);return t?"feed"===t.name?getAtomFeed(t):getRssFeed(t):null}
/**
 * Parse an Atom feed.
 *
 * @param feedRoot The root of the feed.
 * @returns The parsed feed.
 */function getAtomFeed(e){var t;const n=e.children;const i={type:"atom",items:getElementsByTagName("entry",n).map((e=>{var t;const{children:n}=e;const i={media:getMediaElements(n)};addConditionally(i,"id","id",n);addConditionally(i,"title","title",n);const r=null===(t=getOneElement("link",n))||void 0===t?void 0:t.attribs.href;r&&(i.link=r);const l=fetch("summary",n)||fetch("content",n);l&&(i.description=l);const o=fetch("updated",n);o&&(i.pubDate=new Date(o));return i}))};addConditionally(i,"id","id",n);addConditionally(i,"title","title",n);const r=null===(t=getOneElement("link",n))||void 0===t?void 0:t.attribs.href;r&&(i.link=r);addConditionally(i,"description","subtitle",n);const l=fetch("updated",n);l&&(i.updated=new Date(l));addConditionally(i,"author","email",n,true);return i}
/**
 * Parse a RSS feed.
 *
 * @param feedRoot The root of the feed.
 * @returns The parsed feed.
 */function getRssFeed(e){var t,n;const i=null!==(n=null===(t=getOneElement("channel",e.children))||void 0===t?void 0:t.children)&&void 0!==n?n:[];const r={type:e.name.substr(0,3),id:"",items:getElementsByTagName("item",e.children).map((e=>{const{children:t}=e;const n={media:getMediaElements(t)};addConditionally(n,"id","guid",t);addConditionally(n,"title","title",t);addConditionally(n,"link","link",t);addConditionally(n,"description","description",t);const i=fetch("pubDate",t)||fetch("dc:date",t);i&&(n.pubDate=new Date(i));return n}))};addConditionally(r,"title","title",i);addConditionally(r,"link","link",i);addConditionally(r,"description","description",i);const l=fetch("lastBuildDate",i);l&&(r.updated=new Date(l));addConditionally(r,"author","managingEditor",i,true);return r}const s=["url","type","lang"];const u=["fileSize","bitrate","framerate","samplingrate","channels","duration","height","width"];
/**
 * Get all media elements of a feed item.
 *
 * @param where Nodes to search in.
 * @returns Media elements.
 */function getMediaElements(e){return getElementsByTagName("media:content",e).map((e=>{const{attribs:t}=e;const n={medium:t.medium,isDefault:!!t.isDefault};for(const e of s)t[e]&&(n[e]=t[e]);for(const e of u)t[e]&&(n[e]=parseInt(t[e],10));t.expression&&(n.expression=t.expression);return n}))}
/**
 * Get one element by tag name.
 *
 * @param tagName Tag name to look for
 * @param node Node to search in
 * @returns The element or null
 */function getOneElement(e,t){return getElementsByTagName(e,t,true,1)[0]}
/**
 * Get the text content of an element with a certain tag name.
 *
 * @param tagName Tag name to look for.
 * @param where Node to search in.
 * @param recurse Whether to recurse into child nodes.
 * @returns The text content of the element.
 */function fetch(e,t,n=false){return textContent(getElementsByTagName(e,t,n,1)).trim()}
/**
 * Adds a property to an object if it has a value.
 *
 * @param obj Object to be extended
 * @param prop Property name
 * @param tagName Tag name that contains the conditionally added property
 * @param where Element to search for the property
 * @param recurse Whether to recurse into child nodes.
 */function addConditionally(e,t,n,i,r=false){const l=fetch(n,i,r);l&&(e[t]=l)}
/**
 * Checks if an element is a feed root node.
 *
 * @param value The name of the element to check.
 * @returns Whether an element is a feed root node.
 */function isValidFeed(e){return"rss"===e||"feed"===e||"rdf:RDF"===e}export{c as DocumentPosition,append,appendChild,compareDocumentPosition,existsOne,filter,find,findAll,findOne,findOneChild,getAttributeValue,getChildren,getElementById,getElements,getElementsByTagName,getElementsByTagType,getFeed,getInnerHTML,getName,getOuterHTML,getParent,getSiblings,getText,hasAttrib,innerText,nextElementSibling,prepend,prependChild,prevElementSibling,removeElement,removeSubsets,replaceElement,testElement,textContent,uniqueSort};

