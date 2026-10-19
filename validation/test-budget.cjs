const fs=require('fs'),vm=require('vm'),assert=require('assert');
const source=fs.readFileSync('beth-elise-site-v6/js/render-budget.js','utf8');
const results=[];
for(const [width,height,dpr,coarse] of [[402,874,3,true],[393,852,3,true],[430,932,3,true],[874,402,3,true],[1024,1366,2,true],[1440,900,2,false],[3840,2160,3,false]]){
 const env={window:{},URL,Set,Math,devicePixelRatio:dpr,document:{currentScript:{src:'https://example.com/beth-elise-site-v6/js/render-budget.js'}},matchMedia:q=>({matches:q.includes('coarse')?coarse:width<=1024})};
 vm.createContext(env);vm.runInContext(source,env);const api=env.window.BethGraphics;
 const ratio=api.pixelRatio(width,height);const pixels=Math.round(width*ratio)*Math.round(height*ratio);
 assert(pixels<=(coarse||width<=1024?1503000:8006000));
 let writes=0,w=0,h=0;
 const canvas={get width(){return w},set width(value){writes++;w=value},get height(){return h},set height(value){writes++;h=value}};
 for(let i=0;i<100;i++)api.resizeCanvas(canvas,width,height,ratio);
 assert.equal(writes,2,'identical resize events must not recreate backing stores');
 const mapped=api.assetUrl('images/avatar_body.webp?v=37.0');
 assert(mapped.includes((coarse||width<=1024)?'/runtime/mobile/':'/runtime/desktop/'));
 const attrs={};const image={set srcset(v){attrs.srcset=v},set src(v){attrs.src=v},sizes:'64px',removeAttribute(k){delete attrs[k]}};
 api.setImage(image,'../images/merch-eye-believe-white.webp');
 assert.equal(attrs.src,'https://example.com/beth-elise-site-v6/images/merch-eye-believe-white.webp');
 assert(attrs.srcset.includes('/beth-elise-site-v6/images/display/merch-eye-believe-white-960.webp 960w'));
 assert(!attrs.srcset.includes('lavender'));
 assert.equal(api.thumbnailUrl('../images/merch-eye-believe-white.webp'),'https://example.com/beth-elise-site-v6/images/display/merch-eye-believe-white-192.webp');
 const crystalRatio=api.pixelRatio(280,280,2);const crystalPixels=Math.round(280*crystalRatio)**2;
 results.push({viewport:[width,height],devicePixelRatio:dpr,backingPixelRatio:ratio,heroCanvasPixels:pixels,heroCanvasMiB:pixels*4/1048576,crystalCanvasPixels:crystalPixels,sameSizeResizeWrites:writes,productVariantAndSubpathPreserved:true});
}
fs.writeFileSync('beth-elise-site-v6/render-budget-verification-v6.json',JSON.stringify(results,null,2)+'\n');console.log(results);
