const albums = [
  { "id": "GT-10", "bcPath": "/album/lighthouse-and-sirius" },
  { "id": "GT-09", "bcPath": "/album/crock" },
  { "id": "GT-08", "bcPath": "/album/inevitability-2018" },
  { "id": "GT-07", "bcPath": "/album/droppin-the-pressure-2018" },
  { "id": "GT-06", "bcPath": "/album/kiev-2017" },
  { "id": "GT-05", "bcPath": "/album/amnesiac-2010" },
  { "id": "GT-04", "bcPath": "/album/violet-2009" },
  { "id": "GT-03", "bcPath": "/album/cube3-2008" },
  { "id": "GT-02", "bcPath": "/album/geometric-progression-2007" },
  { "id": "GT-01", "bcPath": "/album/master-tempo-2006" }
];

async function main() {
  for (const a of albums) {
    try {
      const res = await fetch(`https://gtwy.bandcamp.com${a.bcPath}`);
      const text = await res.text();

      // Try for about section
      let desc = "";
      const aboutMatch = text.match(/<div class="tralbum-about">\s*(.*?)\s*<\/div>/s);
      if (aboutMatch) {
         // strip simple tags
         desc = aboutMatch[1].replace(/<br\s*[\/]?>/gi, " ").replace(/<[^>]*>?/gm, "").trim();
      }
      
      console.log(`-- ${a.id} --`);
      console.log(`About: "${desc.slice(0, 100)}..."`);

    } catch (e) {
      console.log(`${a.id}: Error ${e.message}`);
    }
  }
}
main();
