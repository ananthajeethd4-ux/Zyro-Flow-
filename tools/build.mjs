import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {transform} from 'esbuild';
const root=new URL('../',import.meta.url);
await mkdir(new URL('assets/',root),{recursive:true});
const names={};
let inlineStyles='';
for(const [name,loader] of [['site.css','css'],['site.js','js']]){
 const source=await readFile(new URL('src/'+name,root),'utf8');
 const {code}=await transform(source,{loader,minify:true,target:'es2020'});
 const hash=createHash('sha256').update(code).digest('hex').slice(0,12);
 const asset=(loader==='css'?'styles':'app')+'.'+hash+'.'+loader;
 await writeFile(new URL('assets/'+asset,root),code);
 names[loader]=asset;
 if(loader==='css')inlineStyles=code;
}
const template=await readFile(new URL('src/index.html',root),'utf8');
await writeFile(new URL('index.html',root),template.replace('__CRITICAL_CSS__',inlineStyles).replace('__SCRIPT__',names.js));
console.log('Built static HTML with inline CSS and a minified, content-hashed deferred script.');
