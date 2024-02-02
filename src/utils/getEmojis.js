import { env, pipeline } from "@xenova/transformers";
env.useBrowserCache = false;
env.allowLocalModels = false;

export const getRandomEmoji = (sentimentScore) => {
  console.log(sentimentScore);
  if (sentimentScore >= 0.8) {
    // Very positive sentiment
    return "😍";
  } else if (sentimentScore >= 0.6) {
    // Positive sentiment
    return "😊";
  } else if (sentimentScore >= 0.4) {
    // Neutral sentiment
    return "😐";
  } else if (sentimentScore >= 0.2) {
    // Negative sentiment
    return "😕";
  } else {
    // Very negative sentiment
    return "😢";
  }
};

export default async function getEmojis(text) {
  let pipe = await pipeline("sentiment-analysis");
  let out = await pipe(text);

  const sentimentScore = out[0].score;
  const emoji = getRandomEmoji(sentimentScore);
  return `${emoji}`;
}
