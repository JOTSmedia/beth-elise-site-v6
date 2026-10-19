from pathlib import Path
from html.parser import HTMLParser
from PIL import Image
import re,json,hashlib
root=Path('beth-elise-site-v6');old=Path('beth-elise-site-v5')
class Structure(HTMLParser):
 def __init__(self):super().__init__();self.items=[]
 def handle_starttag(self,tag,attrs):
  d=dict(attrs)
  if any(x in d.get('src','') for x in ['js/render-budget.js']):return
  if 'css/delivery.css' in d.get('href',''):return
  d.pop('srcset',None);d.pop('sizes',None)
  if tag=='iframe':d.pop('loading',None)
  for k,v in d.items():
   if v is not None:
    v=v.replace("this.removeAttribute('srcset');",'')
    if k in ['src','href'] and not v.startswith(('http:','https:')):v=v.split('?')[0]
    d[k]=v
  self.items.append((tag,sorted(d.items())))
pages=[];missing=[];candidate_count=0
for p in root.rglob('*.html'):
 rel=p.relative_to(root);a=Structure();b=Structure();a.feed((old/rel).read_text());b.feed(p.read_text());assert a.items==b.items,rel;pages.append(str(rel))
 for variants in re.findall(r'\bsrcset="([^"]+)"',p.read_text()):
  for item in variants.split(','):
   path,descriptor=item.strip().split();file=p.parent/path.split('?')[0]
   assert file.exists(),file
   with Image.open(file) as im:assert im.width==int(descriptor[:-1]),(file,descriptor,im.width)
   candidate_count+=1
for p in [*root.rglob('*.html'),*(root/'css').glob('*.css')]:
 for found in re.findall(r'''(?:src|href)=["']([^"']+)["']|url\(['"]?([^)'"\s]+)''',p.read_text()):
  url=found[0] or found[1]
  if url.startswith(('http:','https:','data:','#','mailto:','tel:','/')):continue
  if not (p.parent/url.split('?')[0].split('#')[0]).exists():missing.append(str(p)+':'+url)
assert not missing,missing
originals=[]
for p in (old/'images').rglob('*'):
 if p.is_file():
  q=root/p.relative_to(old);assert p.read_bytes()==q.read_bytes(),q;originals.append(str(p.relative_to(old)))
for sub in ['fonts','css']:
 for p in (old/sub).rglob('*'):
  if p.is_file():assert p.read_bytes()==(root/p.relative_to(old)).read_bytes(),p
assert (old/'js/living-forest.js').read_bytes()==(root/'js/living-forest.js').read_bytes()
before=(old/'js/main.js').read_text();after=(root/'js/main.js').read_text()
for start,end in [
 ('      const INTRO_TIMING = {','      };'),
 ('      const portalHighlights = [','      ];'),
 ('      let TREE_CONTOUR = [',';'),
 ('      const treePortal = {','      };'),
 ('    // BEGIN BUTTERFLY MOTION','    // END BUTTERFLY MOTION'),
 ('    function drawCinematicAmbientButterfly','    // ═'),
 ('      function renderCrystalBall(now) {','      let isCrystalBallVisible')]:
 def block(text):
  a=text.index(start);b=text.index(end,a+len(start));return text[a:b]
 assert block(before)==block(after),start
assert 'criticalAssetUrls' not in (root/'index.html').read_text()
assert '.decode()' not in (root/'index.html').read_text()
count=0
for p in (root/'images').rglob('*'):
 if p.suffix not in ['.webp','.png','.jpg']:continue
 with Image.open(p) as im:im.verify()
 count+=1
report={'version':'beth-elise-site-v6','status':'source and budget checks passed; physical iPhone retest pending','html_interactive_structure_preserved':pages,'original_image_files_byte_identical':len(originals),'fonts_licenses_and_original_styles_byte_identical':True,'forest_and_butterfly_paint_paths_unchanged':True,'intro_and_portal_timing_and_contour_unchanged':True,'crystal_render_function_unchanged':True,'responsive_candidates_checked':candidate_count,'raster_images_verified':count,'missing_local_references':missing,'memory_budget_test':'render-budget-verification-v6.json','published_baseline':'published-baseline-check-v6.json','browser_limit':'Automatic browser security review blocked localhost observation; no v6 browser screenshot or physical iPhone verification is claimed.','deployment':'local only; published v5 unchanged'}
(root/'verification-report.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
