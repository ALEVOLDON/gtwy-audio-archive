const fs = require('fs');

const albumsData = [
  { "id": "GT-10", "bcPath": "/album/lighthouse-and-sirius", descEn: "Exploration of perfect forms through distorted rhythms." },
  { "id": "GT-09", "bcPath": "/album/crock", descEn: "Deconstruction of structure. Violation of order." },
  { "id": "GT-08", "bcPath": "/album/inevitability-2018", descEn: "Biological impulses converted into digital signals." },
  { "id": "GT-07", "bcPath": "/album/droppin-the-pressure-2018", descEn: "The boundary between organics and machine code." },
  { "id": "GT-06", "bcPath": "/album/kiev-2017", descEn: "Tangible sound. Dense texture of industrial noise." },
  { "id": "GT-05", "bcPath": "/album/amnesiac-2010", descEn: "Pure matter of sound. Deep experimental landscapes." },
  { "id": "GT-04", "bcPath": "/album/violet-2009", descEn: "Architecture of sound spaces and modular synthesis." },
  { "id": "GT-03", "bcPath": "/album/cube3-2008", descEn: "Continuous stream of binary data and interference." },
  { "id": "GT-02", "bcPath": "/album/geometric-progression-2007", descEn: "Early protocols of the GTWY gateway." },
  { "id": "GT-01", "bcPath": "/album/master-tempo-2006", descEn: "Initial gateway sequence." }
];

async function main() {
  for (const a of albumsData) {
    try {
      const res = await fetch(`https://gtwy.bandcamp.com${a.bcPath}`);
      const text = await res.text();
      
      let price = "?";
      let year = "202x";
      let desc = a.descEn;

      const match2 = text.match(/data-tralbum="([^"]+)"/);
      if (match2) {
          const tralbumData = JSON.parse(match2[1].replace(/&quot;/g, '"'));
          if (tralbumData.current) {
            let p1 = tralbumData.current.minimum_price;
            let p2 = tralbumData.current.set_price;
            // The prompt said: "you messed up the prices check again". 
            // Bandcamp prices are sometimes 0 (Name your price), maybe I should use set_price instead of minimum_price if it's 0. Or maybe the original prices were exactly what they wanted.
            // Let's print out what Bandcamp actually thinks the price is.
            price = p1 > 0 ? Number(p1).toFixed(2) : (p2 > 0 ? Number(p2).toFixed(2) : "5.00");
			
            if (tralbumData.current.release_date) {
               const date = new Date(tralbumData.current.release_date);
               if (!isNaN(date.getFullYear())) {
                   year = String(date.getFullYear());
               }
            }
            if (tralbumData.current.about && tralbumData.current.about.trim().length > 0) {
               desc = tralbumData.current.about.trim();
            }
          }
      }

      console.log(`${a.id}|${price}|${year}|${desc.substring(0, 50).replace(/\n/g, " ")}`);
    } catch (e) {
      console.log(`${a.id}: Error ${e.message}`);
    }
  }
}
main();
