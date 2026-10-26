// Local preview server for the Wolves GitHub Pages copy: node tools/serve.js  →  http://localhost:8150/
const http=require('http'),fs=require('fs'),p=require('path');
const ROOT=p.resolve(__dirname,'..');
const MIME={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png'};
http.createServer((req,res)=>{let u=decodeURIComponent(req.url.split('?')[0]);if(u==='/')u='/index.html';const f=p.join(ROOT,u);
  if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){res.writeHead(404);res.end('not found');return}
  res.writeHead(200,{'Content-Type':MIME[p.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(res);
}).listen(8150,()=>console.log('wolves dev server on 8150'));
