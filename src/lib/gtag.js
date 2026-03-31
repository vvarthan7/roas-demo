export const pageview = (url) => {
  window.dataLayer.push({
    event: "page_view",
    page_path: url,
  });
};

export const trackLinkClick = (linkUrl, linkText) => {
  window.dataLayer.push({
    event: "link_click",
    link_url: linkUrl,
    link_title: linkText,
  });
};
