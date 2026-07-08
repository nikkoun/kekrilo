import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const API_BASE = "https://public-api.wordpress.com/wp/v2/sites/kekrilo.wordpress.com";
const CATEGORIES = {
  publications: { id: 6270, type: "publication", outDir: "publications" },
  events: { id: 924, type: "event", outDir: "events" }
};

const decodeMap = {
  "&nbsp;": " ",
  "&#8211;": "-",
  "&#8212;": "-",
  "&#8230;": "...",
  "&#8220;": "“",
  "&#8221;": "”",
  "&#8216;": "‘",
  "&#8217;": "’",
  "&amp;": "&",
  "&quot;": "\"",
  "&#039;": "'",
  "&lt;": "<",
  "&gt;": ">"
};

function decodeHtml(value = "") {
  return Object.entries(decodeMap).reduce(
    (text, [entity, replacement]) => text.replaceAll(entity, replacement),
    value
  );
}

function stripHtml(value = "") {
  return decodeHtml(value.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
}

function cleanHtml(value = "") {
  return decodeHtml(value)
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi, (_match, src) => `<img src="${src}" alt="">`)
    .replace(/\sclass="[^"]*"/gi, "")
    .replace(/\sid="[^"]*"/gi, "")
    .replace(/\sstyle="[^"]*"/gi, "")
    .replace(/\saria-describedby="[^"]*"/gi, "")
    .replace(/<a\s/gi, '<a target="_blank" rel="noreferrer" ')
    .trim();
}

function dateLabel(date, type, fallback) {
  if (type === "publication") return fallback;
  if (!date) return fallback;
  return new Intl.DateTimeFormat("el-GR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(date));
}

function slugify(value) {
  return decodeHtml(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9α-ω]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

function mediaUrl(post) {
  return (
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    post?.jetpack_featured_media_url ||
    null
  );
}

function extensionFrom(url, contentType) {
  const cleanPath = new URL(url).pathname;
  const ext = path.extname(cleanPath).toLowerCase();
  if (ext) return ext;
  if (contentType?.includes("png")) return ".png";
  if (contentType?.includes("webp")) return ".webp";
  if (contentType?.includes("gif")) return ".gif";
  return ".jpg";
}

async function downloadAsset(url, itemDir, basename) {
  if (!url) return null;

  const response = await fetch(url);
  if (!response.ok) {
    console.warn(`Skipping ${url}: ${response.status}`);
    return null;
  }

  const contentType = response.headers.get("content-type") || "";
  const ext = extensionFrom(url, contentType);
  const relative = `/content/${itemDir}/${basename}${ext}`;
  const absolute = path.join(ROOT, "public", relative);

  await mkdir(path.dirname(absolute), { recursive: true });
  await writeFile(absolute, Buffer.from(await response.arrayBuffer()));

  return relative;
}

function imageSourcesFromHtml(html) {
  return [...html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)].map((match) => match[1]);
}

function uploadLinksFromHtml(html) {
  return [...html.matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>/gi)]
    .map((match) => match[1])
    .filter((url) => {
      try {
        const parsed = new URL(url);
        return (
          parsed.hostname === "kekrilo.wordpress.com" &&
          parsed.pathname.includes("/wp-content/uploads/")
        );
      } catch {
        return false;
      }
    });
}

async function localizeContentImages(html, itemDir) {
  let localized = html;
  const sources = [...new Set(imageSourcesFromHtml(html))];

  for (const [index, source] of sources.entries()) {
    const local = await downloadAsset(source, itemDir, `image-${index + 1}`);
    if (local) {
      localized = localized.replaceAll(source, local);
    }
  }

  return localized;
}

async function localizeUploadLinks(html, itemDir) {
  let localized = html;
  const sources = [...new Set(uploadLinksFromHtml(html))];

  for (const [index, source] of sources.entries()) {
    const local = await downloadAsset(source, itemDir, `asset-${index + 1}`);
    if (local) {
      localized = localized.replaceAll(source, local);
    }
  }

  return localized;
}

async function fetchPosts(categoryId) {
  const url = `${API_BASE}/posts?categories=${categoryId}&per_page=50&_embed=1`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`WordPress API returned ${response.status} for ${url}`);
  }

  return response.json();
}

async function normalizePost(post, collection) {
  const title = stripHtml(post.title?.rendered || "Χωρίς τίτλο");
  const meta = stripHtml(post.excerpt?.rendered || "");
  const itemSlug = `${collection.type}-${post.id}-${slugify(title) || "item"}`;
  const itemDir = `${collection.outDir}/${itemSlug}`;
  const cover = await downloadAsset(mediaUrl(post), itemDir, "cover");
  const rawContent = cleanHtml(post.content?.rendered || post.excerpt?.rendered || "");
  const withLocalImages = await localizeContentImages(rawContent, itemDir);
  const contentHtml = await localizeUploadLinks(withLocalImages, itemDir);
  const displayDate = dateLabel(post.date, collection.type, meta);

  return {
    id: itemSlug,
    type: collection.type,
    title,
    date: displayDate,
    meta: collection.type === "publication" ? meta : displayDate,
    image: cover,
    contentHtml,
    sourceUrl: null
  };
}

function fileContents(name, items) {
  return `export const ${name} = ${JSON.stringify(items, null, 2)};\n`;
}

async function main() {
  await mkdir(path.join(ROOT, "src", "data"), { recursive: true });
  await mkdir(path.join(ROOT, "public", "content"), { recursive: true });

  for (const [name, collection] of Object.entries(CATEGORIES)) {
    const posts = await fetchPosts(collection.id);
    const items = [];

    for (const post of posts) {
      items.push(await normalizePost(post, collection));
    }

    await writeFile(
      path.join(ROOT, "src", "data", `${name}.js`),
      fileContents(name, items)
    );

    console.log(`Migrated ${items.length} ${name}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
