import fetch from "node-fetch";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function downloadBrainrots() {
  // Fetch all Brainrots JSON
  const response = await fetch("http://localhost:3000/api/brainrots"); // <-- use your working API URL
  const brainrotsArray = await response.json();

  // Ensure images folder exists
  const imagesDir = join(__dirname, "images");
  if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir);

  // Path to placeholder image
  const placeholderPath = join(__dirname, "placeholder.jpg");
  if (!fs.existsSync(placeholderPath)) {
    console.log(
      "⚠️  Make sure you have a placeholder.jpg in the project folder",
    );
  }

  // Loop over each Brainrot
  for (let i = 0; i < brainrotsArray.length; i++) {
    const item = brainrotsArray[i];
    const imageUrl = item.image;

    const filename = `${String(i + 1).padStart(3, "0")}-${item.slug}.jpg`;
    const filepath = join(imagesDir, filename);

    try {
      const imageResponse = await fetch(imageUrl);
      if (!imageResponse.ok) throw new Error(`HTTP ${imageResponse.status}`);

      const buffer = await imageResponse.arrayBuffer();
      fs.writeFileSync(filepath, Buffer.from(buffer));
      console.log(`Downloaded ${filename}`);
    } catch (err) {
      console.log(`⚠️  Failed to download ${imageUrl}. Using placeholder.`);
      fs.copyFileSync(placeholderPath, filepath);
    }

    // Update JSON to local path
    item.image = `./images/${filename}`;
  }

  // Save updated JSON
  const jsonPath = join(__dirname, "allBrainrots.json");
  fs.writeFileSync(jsonPath, JSON.stringify(brainrotsArray, null, 2));
  console.log(`✅ All Brainrots JSON saved to ${jsonPath}`);
}

downloadBrainrots();
