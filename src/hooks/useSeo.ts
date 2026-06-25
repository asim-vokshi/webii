import { useEffect } from "react";

const SITE_NAME = "Asim Vokshi";
const BASE_URL = "https://asimvokshi.edu.al";
const DEFAULT_IMAGE = `${BASE_URL}/images/building_front.jpeg`;

interface SeoOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useSeo({ title, description, path = "/", image = DEFAULT_IMAGE }: SeoOptions) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const url = `${BASE_URL}${path}`;

    document.title = fullTitle;

    setMeta("description", description);
    setMeta("robots", "index, follow");

    setMeta("og:type", "website", "property");
    setMeta("og:url", url, "property");
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:image", image, "property");

    setMeta("twitter:card", "summary_large_image", "property");
    setMeta("twitter:url", url, "property");
    setMeta("twitter:title", fullTitle, "property");
    setMeta("twitter:description", description, "property");
    setMeta("twitter:image", image, "property");

    setLink("canonical", url);
  }, [title, description, path, image]);
}
