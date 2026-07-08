import { fallbackEvents, fallbackPublications } from "../data/fallbackContent";
import { wordpress } from "../data/site";

const parser = typeof window !== "undefined" ? document.createElement("textarea") : null;

function decodeHtml(value = "") {
  if (!parser) return value;
  parser.innerHTML = value;
  return parser.value.replace(/\s+/g, " ").trim();
}

function stripHtml(value = "") {
  return decodeHtml(value.replace(/<[^>]*>/g, " "));
}

function sanitizeHtml(value = "") {
  return value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/\sclass="[^"]*"/gi, "")
    .replace(/\sid="[^"]*"/gi, "")
    .replace(/\sstyle="[^"]*"/gi, "")
    .replace(/<a\s/gi, '<a target="_blank" rel="noreferrer" ');
}

function yearFromDate(date) {
  if (!date) return "";
  return new Intl.DateTimeFormat("el-GR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(date));
}

function imageFromPost(post) {
  return (
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    post?.jetpack_featured_media_url ||
    null
  );
}

function normalizePost(post, type) {
  const title = decodeHtml(post.title?.rendered || "Χωρίς τίτλο");
  const excerpt = stripHtml(post.excerpt?.rendered || "");
  const content = sanitizeHtml(post.content?.rendered || post.excerpt?.rendered || "");

  return {
    id: `${type}-${post.id}`,
    type,
    title,
    date: type === "publication" ? excerpt : yearFromDate(post.date),
    meta: excerpt || yearFromDate(post.date),
    image: imageFromPost(post),
    link: post.link,
    content
  };
}

async function fetchCategory(categoryId, type) {
  const url = `${wordpress.baseUrl}/posts?categories=${categoryId}&per_page=30&_embed=1`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`WordPress API returned ${response.status}`);
  }

  const posts = await response.json();
  return posts.map((post) => normalizePost(post, type));
}

export async function fetchContent() {
  const [publications, events] = await Promise.all([
    fetchCategory(wordpress.categories.publications, "publication"),
    fetchCategory(wordpress.categories.events, "event")
  ]);

  return { publications, events };
}

export const fallbackContent = {
  publications: fallbackPublications,
  events: fallbackEvents
};
