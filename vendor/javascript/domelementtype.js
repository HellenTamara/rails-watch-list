var t;(function(t){t.Root="root";t.Text="text";t.Directive="directive";t.Comment="comment";t.Script="script";t.Style="style";t.Tag="tag";t.CDATA="cdata";t.Doctype="doctype"})(t||(t={}));
/**
 * Tests whether an element is a tag or not.
 *
 * @param elem Element to test
 */function isTag(e){return e.type===t.Tag||e.type===t.Script||e.type===t.Style}const e=t.Root;const o=t.Text;const c=t.Directive;const n=t.Comment;const i=t.Script;const s=t.Style;const r=t.Tag;const p=t.CDATA;const y=t.Doctype;export{p as CDATA,n as Comment,c as Directive,y as Doctype,t as ElementType,e as Root,i as Script,s as Style,r as Tag,o as Text,isTag};

