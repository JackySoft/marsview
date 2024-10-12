const extractCodeBlocks = (str) => {
  if (!str) {
    return [];
  }

  // 正则表达式匹配所有的代码块内容
  const matches = str.match(/```[\s\S]*?\n([\s\S]*?)\n```/g);

  // 如果找到了匹配项，返回提取的内容，否则返回空数组
  return matches
    ? matches.map((match) =>
        match.replace(/```[\s\S]*?\n([\s\S]*?)\n```/, "$1").trim()
      )
    : [];
};

module.exports = { extractCodeBlocks };
