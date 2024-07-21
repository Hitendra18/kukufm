export default function timeAgo(timestamp) {
  const now = new Date();
  const posted = new Date(timestamp);
  const secondsAgo = Math.floor((now - posted) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [key, value] of Object.entries(intervals)) {
    const interval = Math.floor(secondsAgo / value);
    if (interval >= 1) {
      return `${interval} ${key}${interval !== 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
}
