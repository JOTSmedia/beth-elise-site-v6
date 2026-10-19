const fs=require('fs'),path=require('path');
const sharp=require('/Users/bethrooney/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root='beth-elise-site-v6',dir=root+'/images',report=[];
async function output(file,dest,width){
 const source=dir+'/'+file,meta=await sharp(source).metadata();
 await sharp(source).resize({width:Math.min(width,meta.width),withoutEnlargement:true}).webp({quality:94,alphaQuality:100,effort:4}).toFile(dest);
 const out=await sharp(dest).metadata();
 report.push({source:file,sourceExport:[meta.width,meta.height],delivery:path.relative(root,dest),deliverySize:[out.width,out.height],bytes:fs.statSync(dest).size,method:'Resize unchanged existing artwork; no generation, crop or recoloring'});
}
(async()=>{
 for(const d of ['display','runtime/mobile','runtime/desktop'])fs.mkdirSync(dir+'/'+d,{recursive:true});
 // Reusable photo and logo candidates for HTML; originals stay available in images/.
 for(const file of fs.readdirSync(dir).filter(f=>f.endsWith('.webp'))){
  const meta=await sharp(dir+'/'+file).metadata();
  if(meta.width<480 && !file.startsWith('icon-'))continue;
  for(const w of [192,480,960,1440])await output(file,`${dir}/display/${file.slice(0,-5)}-${w}.webp`,w);
 }
 const sprites=['avatar_body.webp','avatar_wing_left.webp','avatar_wing_right.webp','avatar_train.webp',
 'photorealistic_glinda_bubble_orb.webp','photorealistic_purple_iris_orb.webp',
 'butterfly-cinematic.webp','butterfly-monarch.webp','butterfly-swallowtail.webp','butterfly-orange-tip.webp',
 'eye-iris-natural.webp','crystal_nebula_panorama.webp','crystal_glass_specular.webp',
 'merch-eye-believe-hoodie-lavender.webp','chakra-watercolor-transparent.webp','aura-silhouette-glow.webp',
 'notes-by-beth.webp','portrait.webp','merch-eye-believe-hat-black.webp'];
 for(const file of sprites)for(const mode of ['mobile','desktop']){
  const panorama=file==='crystal_nebula_panorama.webp';
  await output(file,`${dir}/runtime/${mode}/${file}`,panorama?(mode==='mobile'?1024:2048):(mode==='mobile'?512:1024));
 }
 await output('hero-bg.webp',dir+'/runtime/mobile/hero-bg.webp',2580);
 await output('services-bg.webp',dir+'/runtime/mobile/services-bg.webp',1440);
 await output('footer-bg.webp',dir+'/runtime/mobile/footer-bg.webp',2064);
 for(const file of ['icon-eye.webp','icon-orb.webp'])await output(file,dir+'/runtime/'+file,192);
 fs.writeFileSync(root+'/delivery-provenance-v6.json',JSON.stringify(report,null,2)+'\n');
 console.log(`Exported ${report.length} unchanged-art delivery assets.`);
})();
