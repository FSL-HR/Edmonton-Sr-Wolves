// Builds the GitHub Pages copy of the Wolves dashboard: no team data in the file (it lives in Firestore), passcode gate + Firebase host.
// usage: node build-gh.js <src.html> <host.html> <logo.png> <out.html> <passcode>
const fs=require('fs');const [src,host,logo,out,code]=process.argv.slice(2);
let s=fs.readFileSync(src,'utf8');
const uri='data:image/png;base64,'+fs.readFileSync(logo).toString('base64');
s=s.replace(/(<script type="application\/json" id="wolves-data">)[\s\S]*?(<\/script>)/,'$1{}$2');
let h=fs.readFileSync(host,'utf8').replace('__LOGO__',uri).replace('__PASSCODE__',code).replace('__BUILD__',new Date().toISOString().slice(0,16).replace('T',' ')+' UTC');
if(!s.includes('<div id="app"></div>'))throw 'no app div';
s=s.replace('<div id="app"></div>',h+'\n<div id="app"></div>').replace('__LOGO__',uri);
const doc='<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n<meta name="robots" content="noindex,nofollow">\n<style>:root{color-scheme:dark;padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>\n</head>\n<body>\n'+s+'\n</body>\n</html>\n';
if(/"name":"Maia Ehmann"/.test(doc))throw 'team data leaked into the public build';
fs.writeFileSync(out,doc);console.log('built',out,doc.length,'bytes');
