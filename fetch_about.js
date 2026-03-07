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

function decodeHtmlEntities(value) {
  return value.replace(/&(?:quot|amp|#39|lt|gt|#(\d+)|#x([0-9a-fA-F]+));/g, (match, dec, hex) => {
    if (dec) {
      return String.fromCodePoint(Number(dec));
    }

    if (hex) {
      return String.fromCodePoint(parseInt(hex, 16));
    }

    switch (match) {
      case "&quot;":
        return '"';
      case "&amp;":
        return "&";
      case "&#39;":
        return "'";
      case "&lt;":
        return "<";
      case "&gt;":
        return ">";
      default:
        return match;
    }
  });
}

function extractAbout(text) {
  const tralbumMatch = text.match(/data-tralbum="([^"]+)"/);
  if (tralbumMatch) {
    const tralbumData = JSON.parse(decodeHtmlEntities(tralbumMatch[1]));
    const about = tralbumData?.current?.about;
    if (typeof about === "string" && about.trim()) {
      return about.trim().replace(/\s+/g, " ");
    }
  }

  const ldJsonMatch = text.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/i);
  if (ldJsonMatch) {
    const metadata = JSON.parse(ldJsonMatch[1]);
    const description = metadata?.description;
    if (typeof description === "string" && description.trim()) {
      return description.trim().replace(/\s+/g, " ");
    }
  }

  return "";
}

async function main() {
  for (const a of albums) {
    try {
      const res = await fetch(`https://gtwy.bandcamp.com${a.bcPath}`);
      const text = await res.text();

      const desc = extractAbout(text);
      
      console.log(`-- ${a.id} --`);
      console.log(`About: "${desc.slice(0, 100)}..."`);

    } catch (e) {
      console.log(`${a.id}: Error ${e.message}`);
    }
  }
}
main();
