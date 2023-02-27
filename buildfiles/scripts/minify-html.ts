import {DOMParser, Element} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { minifyHTML } from "https://deno.land/x/minifier/mod.ts";


const projectDir = new URL("../..", import.meta.url).pathname
const content = await Deno.readFile(`${projectDir}/index.html`)
const decoder = new TextDecoder("utf-8");


const doc = new DOMParser().parseFromString(decoder.decode(content),"text/html")!;
  
console.log(minifyHTML(doc.documentElement!.outerHTML, {
  minifyCSS: true,
  minifyJS: true
}));

  