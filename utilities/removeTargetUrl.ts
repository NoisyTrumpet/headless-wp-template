// Remove the main url and leave only the target url

export default function removeTargetUrl(url: string): string {
  return url.replace(/https?:\/\/[^/]+/, "");
}
