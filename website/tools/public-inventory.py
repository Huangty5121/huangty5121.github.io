"""Inventory generated visible text, image captions/alternatives and destinations."""
from html.parser import HTMLParser
from pathlib import Path
import json
class Inventory(HTMLParser):
 def __init__(self):
  super().__init__();self.hidden=0;self.text=[];self.images=[];self.links=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag in ('script','style'):self.hidden+=1
  if tag=='img':self.images.append({k:a.get(k,'') for k in ('src','alt','width','height')})
  if tag=='a':self.links.append(a.get('href',''))
 def handle_endtag(self,tag):
  if tag in ('script','style'):self.hidden=max(0,self.hidden-1)
 def handle_data(self,data):
  if not self.hidden and data.strip():self.text.append(data.strip())
root=Path('material-demo/dist/site');out=[]
for file in sorted(root.rglob('*.html')):
 if 'assets' in file.parts:continue
 p=Inventory();p.feed(file.read_text());out.append({'page':str(file.relative_to(root)),'text':p.text,'images':p.images,'links':p.links})
Path('website/review/redesign-2026-10-10/public-page-inventory.json').write_text(json.dumps(out,ensure_ascii=False,indent=2))
print(f'{len(out)} generated public pages inventoried')
