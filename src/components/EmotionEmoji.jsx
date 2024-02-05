/* eslint react/prop-types: 0 */

function EmotionEmoji({ emotionData }) {
  const emojiMap = {
    disappointment: "😞",
    sadness: "😢",
    annoyance: "😠",
    neutral: "😐",
    disapproval: "👎",
    realization: "💡",
    nervousness: "😰",
    approval: "👍",
    joy: "😄",
    anger: "😡",
    embarrassment: "😳",
    caring: "❤️",
    remorse: "😔",
    disgust: "🤢",
    grief: "💔",
    confusion: "😕",
    relief: "😌",
    desire: "😍",
    admiration: "😊",
    optimism: "😊",
    fear: "😨",
    love: "❤️",
    excitement: "😃",
    curiosity: "🤔",
    amusement: "😆",
    surprise: "😲",
    gratitude: "🙏",
    pride: "🏆",
  };

  // Filter emotions with scores greater than 0.8
  const highScoreEmotions = emotionData.filter(
    (emotion) => emotion.score > 0.8
  );
  return (
    <div>
      {highScoreEmotions.map((emotion, index) => (
        <span key={index}>{emojiMap[emotion.label]}</span>
      ))}
    </div>
  );
}

export default EmotionEmoji;
