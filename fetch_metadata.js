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
  const finalAlbums = [];
  for (const a of albums) {
    try {
      const res = await fetch(`https://gtwy.bandcamp.com${a.bcPath}`);
      const text = await res.text();
      
      let price = "5.00";
      let year = "202x";
      let desc = "Transmission from the gateway.";

      // Try parsing data-tralbum
      const match2 = text.match(/data-tralbum="([^"]+)"/);
      if (match2) {
          const tralbumData = JSON.parse(match2[1].replace(/&quot;/g, '"'));
          if (tralbumData.current) {
            if (tralbumData.current.minimum_price !== undefined) {
              price = Number(tralbumData.current.minimum_price).toFixed(2);
            }
            if (tralbumData.current.release_date) {
               const date = new Date(tralbumData.current.release_date);
               if (!isNaN(date.getFullYear())) {
                   year = String(date.getFullYear());
               }
            }
          }
      }

      // Try for description
      const descMatch = text.match(/<meta property="og:description" content="([^"]+)">/);
      if (descMatch) {
          desc = descMatch[1].trim();
          // Remove tracklist part if any (e.g. Bandcamp adds "Includes unlimited streaming..." or tracklist)
          let splitted = desc.split('Includes unlimited streaming');
          if (splitted[0].trim() === "") {
              // Sometimes it starts with "Includes unlimited streaming"
             desc = desc.split('. ')[1] || desc; 
          } else {
             desc = splitted[0].split('Buy the full')[0].split('1.')[0].trim();
          }
      }

      console.log(`-- ${a.id} --`);
      console.log(`price: "${price}"`);
      console.log(`year: "${year}"`);
      console.log(`desc: "${desc}"`);
      console.log('---');

    } catch (e) {
      console.log(`${a.id}: Error ${e.message}`);
    }
  }
}
main();
