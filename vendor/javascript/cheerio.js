import{g as r,a as e,s as o}from"../../_/d3b51885.js";export{h as html,t as text,x as xml}from"../../_/d3b51885.js";import{isDocument as s}from"domhandler";import{parse as a,parseFragment as n,serializeOuter as i}from"parse5";import{adapter as p}from"parse5-htmlparser2-tree-adapter";import l from"dom-serializer";import{parseDocument as m}from"htmlparser2";import"domutils";import"./utils.js";import"cheerio-select";
/**
 * Parse the content with `parse5` in the context of the given `ParentNode`.
 *
 * @param content - The content to parse.
 * @param options - A set of options to use to parse.
 * @param isDocument - Whether to parse the content as a full HTML document.
 * @param context - The context in which to parse the content.
 * @returns The parsed content.
 */function parseWithParse5(r,e,t,o){const s={scriptingEnabled:"boolean"!==typeof e.scriptingEnabled||e.scriptingEnabled,treeAdapter:p,sourceCodeLocationInfo:e.sourceCodeLocationInfo};return t?a(r,s):n(o,r,s)}const c={treeAdapter:p};
/**
 * Renders the given DOM tree with `parse5` and returns the result as a string.
 *
 * @param dom - The DOM tree to render.
 * @returns The rendered document.
 */function renderWithParse5(r){const e="length"in r?r:[r];for(let r=0;r<e.length;r+=1){const t=e[r];s(t)&&Array.prototype.splice.call(e,r,1,...t.children)}let t="";for(let r=0;r<e.length;r+=1){const o=e[r];t+=i(o,c)}return t}const d=r(((r,e,t,o)=>e.xmlMode||e._useHtmlParser2?m(r,e):parseWithParse5(r,e,t,o)));
/**
 * Create a querying function, bound to a document created from the provided markup.
 *
 * Note that similar to web browser contexts, this operation may introduce
 * `<html>`, `<head>`, and `<body>` elements; set `isDocument` to `false` to
 * switch to fragment mode and disable this.
 *
 * @param content - Markup to be loaded.
 * @param options - Options for the created instance.
 * @param isDocument - Allows parser to be switched to fragment mode.
 * @returns The loaded document.
 * @see {@link https://cheerio.js.org#loading} for additional usage information.
 */const f=e(d,((r,e)=>e.xmlMode||e._useHtmlParser2?l(r,e):renderWithParse5(r)));
/**
 * The default cheerio instance.
 *
 * @deprecated Use the function returned by `load` instead.
 */var u=f([]);
/**
 * In order to promote consistency with the jQuery library, users are encouraged
 * to instead use the static method of the same name.
 *
 * @deprecated
 * @example
 *
 * ```js
 * const $ = cheerio.load('<div><p></p></div>');
 *
 * $.contains($('div').get(0), $('p').get(0));
 * //=> true
 *
 * $.contains($('p').get(0), $('div').get(0));
 * //=> false
 * ```
 *
 * @returns {boolean}
 */const{contains:g}=o;
/**
 * In order to promote consistency with the jQuery library, users are encouraged
 * to instead use the static method of the same name.
 *
 * @deprecated
 * @example
 *
 * ```js
 * const $ = cheerio.load('');
 *
 * $.merge([1, 2], [3, 4]);
 * //=> [1, 2, 3, 4]
 * ```
 */const{merge:b}=o;
/**
 * In order to promote consistency with the jQuery library, users are encouraged
 * to instead use the static method of the same name as it is defined on the
 * "loaded" Cheerio factory function.
 *
 * @deprecated See {@link static/parseHTML}.
 * @example
 *
 * ```js
 * const $ = cheerio.load('');
 * $.parseHTML('<b>markup</b>');
 * ```
 */const{parseHTML:P}=o;
/**
 * Users seeking to access the top-level element of a parsed document should
 * instead use the `root` static method of a "loaded" Cheerio function.
 *
 * @deprecated
 * @example
 *
 * ```js
 * const $ = cheerio.load('');
 * $.root();
 * ```
 */const{root:W}=o;export{g as contains,u as default,f as load,b as merge,P as parseHTML,W as root};

