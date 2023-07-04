let counter = 0;
export const itWorks = async (req, res) => {
  res.json({ message: `it works! WOO HOO!!! ${counter}` });
  counter++;
};
