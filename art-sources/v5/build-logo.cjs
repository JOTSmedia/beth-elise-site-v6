const fs=require('fs');
const sharp=require('/Users/bethrooney/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root='beth-elise-site-v5',dir=root+'/art-sources/v5';
const target='work-notes/original-logo-reference/logo.png';
// Exact script from Beth's latest reference, retained from the approved earlier logo.
const generated=root+'/art-sources/v4/approved-dark-lettering-source.png';
const origData=fs.readFileSync(target).toString('base64'), genData=fs.readFileSync(generated).toString('base64');
const wing='M329 148 L400 174 L445 220 L495 278 L519 338 L468 338 L419 315 L386 275 L355 216Z';
const wings=`<path d="${wing}"/><path d="${wing}" transform="translate(1328 0) scale(-1 1)"/>`;
const stars=`<circle cx="647" cy="391" r="26"/><circle cx="878" cy="372" r="27"/><circle cx="229" cy="347" r="19"/><circle cx="1063" cy="480" r="23"/><circle cx="1027" cy="384" r="16"/>`;
const protect=wings+stars;
const defs=`<clipPath id="name"><rect x="234" y="294" width="879" height="237"/></clipPath><clipPath id="sub"><rect x="365" y="531" width="538" height="70"/></clipPath><clipPath id="lowerArt"><rect x="365" y="601" width="538" height="18"/></clipPath><mask id="oldDescender" maskUnits="userSpaceOnUse" x="0" y="0" width="1264" height="848"><rect width="1264" height="848" fill="white"/><rect x="454" y="601" width="30" height="18" fill="black"/></mask><clipPath id="protected">${protect}</clipPath>
<mask id="artBase" maskUnits="userSpaceOnUse" x="0" y="0" width="1264" height="848"><rect width="1264" height="848" fill="white"/><rect x="234" y="294" width="879" height="237" fill="black"/><rect x="365" y="531" width="538" height="88" fill="black"/></mask>
<mask id="notProtected" maskUnits="userSpaceOnUse" x="0" y="0" width="1264" height="848"><rect width="1264" height="848" fill="white"/><g fill="black">${protect}</g></mask>
<clipPath id="wingArt">${wings}</clipPath><clipPath id="starArt">${stars}</clipPath>
<mask id="removeOldLoop" maskUnits="userSpaceOnUse" x="0" y="0" width="1264" height="848"><rect width="1264" height="848" fill="white"/><path d="M816 340 H866 V303 L816 333Z" fill="black"/></mask>
<filter id="originalWingArt" color-interpolation-filters="sRGB"><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 8 0 0 -0.25" result="gate"/><feComposite in="gate" in2="SourceGraphic" operator="in"/></filter>
<filter id="originalColoredArt" color-interpolation-filters="sRGB"><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -12 12 0 0 -0.2" result="gate"/><feComposite in="gate" in2="SourceGraphic" operator="in"/></filter>
<filter id="originalBlueArt" color-interpolation-filters="sRGB"><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 -40 36 0 0.1" result="gate"/><feComposite in="gate" in2="SourceGraphic" operator="in"/></filter>
<filter id="typeExtract" color-interpolation-filters="sRGB"><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -8 0 0 0 3" result="gate"/><feComposite in="gate" in2="SourceAlpha" operator="in"/></filter>
<filter id="nameInk" color-interpolation-filters="sRGB"><feMorphology in="SourceAlpha" operator="dilate" radius=".65" result="edge"/><feFlood flood-color="#080510" result="black"/><feComposite in="black" in2="edge" operator="in" result="outline"/><feFlood flood-color="#1f004c" result="ink"/><feComposite in="ink" in2="SourceAlpha" operator="in" result="letter"/><feMerge><feMergeNode in="outline"/><feMergeNode in="letter"/></feMerge></filter>
<filter id="subInk" color-interpolation-filters="sRGB"><feMorphology in="SourceAlpha" operator="dilate" radius=".85" result="edge"/><feFlood flood-color="#080510" flood-opacity=".75" result="black"/><feComposite in="black" in2="edge" operator="in" result="outline"/><feFlood flood-color="#2c9da1" result="ink"/><feComposite in="ink" in2="SourceAlpha" operator="in" result="letter"/><feMerge><feMergeNode in="outline"/><feMergeNode in="letter"/></feMerge></filter>
<filter id="mint" color-interpolation-filters="sRGB"><feFlood flood-color="#81d8d0" result="ink"/><feComposite in="ink" in2="SourceAlpha" operator="in"/></filter>`;
const original=`<image width="1264" height="848" xlink:href="data:image/png;base64,${origData}"/>`;
const typeImage=`<image width="1600" height="1073" preserveAspectRatio="none" xlink:href="data:image/png;base64,${genData}"/>`;
// These source-space masks remove the unrelated crest and separate the subtitle.
const typeDefs=`<clipPath id="scriptSource"><path d="M0 394 H515 V427 H1050 V394 H1600 V860 H1260 V800 H425 V860 H0Z"/></clipPath><clipPath id="subtitleSource"><rect x="435" y="802" width="810" height="58"/></clipPath>`;
const editedName=`<g transform="translate(274 331) scale(.5 .429185) translate(0 -394)"><g clip-path="url(#scriptSource)" filter="url(#typeExtract)">${typeImage}</g></g>`;
const editedSub=`<g transform="translate(365 543) scale(.664198 .793103) translate(-435 -802)"><g clip-path="url(#subtitleSource)" filter="url(#typeExtract)">${typeImage}</g></g>`;
// Keep every original ornament; recolor the approved type to the original purple/teal inks.
const group=`<g mask="url(#artBase)">${original}</g>
<g clip-path="url(#name)"><g filter="url(#nameInk)">${editedName}</g></g>
<g clip-path="url(#sub)"><g filter="url(#subInk)">${editedSub}</g></g>
<g clip-path="url(#name)" mask="url(#notProtected)"><g filter="url(#originalColoredArt)">${original}</g></g>
<g clip-path="url(#sub)"><g filter="url(#originalBlueArt)">${original}</g></g>
<g clip-path="url(#lowerArt)" mask="url(#oldDescender)">${original}</g>
<g clip-path="url(#name)"><g clip-path="url(#wingArt)" mask="url(#removeOldLoop)" filter="url(#originalWingArt)">${original}</g><g clip-path="url(#starArt)">${original}</g></g>`;
(async()=>{
fs.copyFileSync(generated,dir+'/approved-script-lettering-export.png');
const metadata=await sharp(generated).metadata();
for(const mint of [false,true]){
 const name=mint?'logo_light':'logo';
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="4096" height="2746" viewBox="0 0 1264 848"><title>Beth Elise — original artwork and colors, approved flowing script</title><defs>${defs}${typeDefs}</defs><g ${mint?'filter="url(#mint)"':''}>${group}</g></svg>`;
 fs.writeFileSync(`${dir}/${name}-master.svg`,svg);
 // Render once, then encode both delivery formats from that same raster.
 await sharp(Buffer.from(svg)).png().toFile(`${root}/images/${name}.png`);
 await sharp(`${root}/images/${name}.png`).webp({quality:96,alphaQuality:100}).toFile(`${root}/images/${name}.webp`);
}
for(const ext of ['png','webp'])fs.copyFileSync(`${root}/images/logo.${ext}`,`${root}/images/logo-dark.${ext}`);
await sharp(`${root}/images/logo.png`).resize(1264,848).flatten({background:'#ffffff'}).jpeg({quality:95}).toFile('work-notes/logo-v5-review.jpg');
fs.writeFileSync(root+'/logo-art-report-v5.json',JSON.stringify({method:'Actual original ornament artwork retained; exact script from the user screenshot recovered from the approved earlier lettering source, separately masked and recolored. Thin dark edge around the name. All original plants, wing roots, stars and lower garland restored.',original_native:[1264,848],original_web:[640,429],typography_generated_native:[1533,1026],typography_prior_export:[metadata.width,metadata.height],typography_source:'Built-in ImageGen exec-876327ad-7ab1-4d76-9267-045ade932de0.png; existing approved asset reused, no new generation',export:[4096,2746],source:'original GitHub source commit 1d1760e4f0b67fd9e5e040b386be15d021316ac0',colors:{name:'#1f004c',subtitle:'#2c9da1',lightVariant:'#81d8d0'},detail:'Raster illustration and lettering enlargement is not native 4K detail.'},null,2));
console.log('Saved original-art logo with a constrained typography-only edit.');
})();
