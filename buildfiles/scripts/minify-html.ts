import { DOMParser, Element, HTMLTemplateElement } from "https://deno.land/x/deno_dom@v0.1.36-alpha/deno-dom-wasm.ts";
import { minifyHTML, minify } from "https://deno.land/x/minifier@v1.1.1/mod.ts";

const projectDir = new URL("../..", import.meta.url)
const indexUrl = new URL("index.html", projectDir)
const content = await Deno.readFile(indexUrl.pathname)
const decoder = new TextDecoder("utf-8");

const doc = new DOMParser().parseFromString(decoder.decode(content),"text/html")!;
  
doc.querySelectorAll('link[rel="stylesheet"][href][ss:defer]').forEach(node => {
  if(node instanceof Element){
    const el = node as Element
    const href = el.getAttribute("href")!
    const noscript = doc.createElement("noscript")
    noscript.innerHTML = `<link rel="stylesheet" href="${href}"/>`
    const template = doc.createElement("template") as HTMLTemplateElement
    template.innerHTML = `<link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'"/>`
    el.replaceWith(template.content, noscript)
  
  }
})

doc.querySelectorAll('link[rel="stylesheet"][href][ss:inline]').forEach(node => {
  if(node instanceof Element){
    const el = node as Element
    const href = el.getAttribute("href")!
    const cssPath = new URL(href, indexUrl)
    const cssFileContent = Deno.readFileSync(cssPath.pathname)
    const cssFileText = decoder.decode(cssFileContent)
    const cssMinifiedText = minify("css", cssFileText)

    const style = doc.createElement("style")
    style.innerHTML = cssMinifiedText
    el.replaceWith(style)
  }
})

const minifiedHtml = minifyHTML(doc.documentElement!.outerHTML, {
  minifyCSS: true,
  minifyJS: true
})

if(!minifiedHtml.startsWith("<!")){
  console.log('<!DOCTYPE html>');
}
console.log(minifiedHtml);


  