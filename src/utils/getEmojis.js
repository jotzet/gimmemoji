const getRandomEmoji = () => {
  const emojis = ["😠", "😡", "😤", "🤬", "😾", "💢", "👿"];
  const randomIndex = Math.floor(Math.random() * emojis.length);
  return emojis[randomIndex];
};

export default getRandomEmoji;
