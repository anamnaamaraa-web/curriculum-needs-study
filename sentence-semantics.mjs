const actionPatterns = [
  /шинж(?:лэх|илж|илнэ)/i,
  /үнэл(?:эх|ж|нэ)/i,
  /төлөвл(?:өх|өж|өнө)/i,
  /боловсруул(?:ах|ж|на)/i,
  /хэрэгжүүл(?:эх|ж|нэ)/i,
  /удирд(?:ах|аж|ана)/i,
  /шийдвэр\s+гарг(?:ах|аж|ана)/i,
  /зохицуул(?:ах|ж|на)/i,
  /хамтран\s+ажил(?:лах|лаж|лана)/i,
  /хян(?:ах|аж|ана)/i,
  /хэмж(?:их|иж|инэ)/i,
  /тайлагн(?:ах|аж|ана)/i,
  /хамгаал(?:ах|ж|на)/i,
  /манлайл(?:ах|ж|на)/i,
  /сайжруул(?:ах|ж|на)/i,
  /тодорхойл(?:ох|ж|но)/i,
  /ашигл(?:ах|аж|ана)/i,
  /хэрэгл(?:эх|эж|энэ)/i,
  /хангах|бүрдүүлэх|эзэмших|эзэмшинэ/i,
  /\b(?:analyse|analyze|evaluate|plan|develop|implement|manage|lead|coordinate|apply|assess)\b/i
];

const outcomePatterns = [
  /суралцахуйн\s+үр\s+дүн/i,
  /суралцагч|төгсөгч/i,
  /чадвартай\s+болно/i,
  /эзэмшинэ|эзэмшсэн\s+байна/i,
  /мэдлэг[, ]+ур\s+чадвар/i,
  /\blearning\s+outcome\b/i,
  /\bwill\s+be\s+able\s+to\b/i,
  /\bcompetenc(?:y|ies)\b/i
];

const negationPatterns = [
  /тусгахгүй|оруулахгүй|хамаарахгүй|шаардахгүй|судлахгүй|заахгүй|хэрэгжүүлэхгүй/i,
  /тооцохгүй|үнэлэхгүй|ашиглахгүй|хассан|хасагдсан/i,
  /(?:байх|байгаа)\s*гүй|үгүйсгэ/i,
  /\b(?:not|no|without|exclude(?:d|s)?|does not|do not|will not)\b/i
];

export function analyzeSentenceSemantics({ text = "", keywords = [], competencyName = "" } = {}) {
  const sentences = splitSentences(text);
  const normalizedName = normalize(competencyName);
  const analyses = sentences.map((sentence) => {
    const normalizedSentence = normalize(sentence);
    const matchedKeywords = [...new Set(keywords.filter((keyword) => {
      const normalizedKeyword = normalize(keyword);
      return normalizedKeyword && normalizedSentence.includes(normalizedKeyword);
    }))];
    const actionTerms = actionPatterns
      .map((pattern) => normalizedSentence.match(pattern)?.[0] || "")
      .filter(Boolean);
    const outcomeCues = outcomePatterns
      .map((pattern) => normalizedSentence.match(pattern)?.[0] || "")
      .filter(Boolean);
    const negationTerms = negationPatterns
      .map((pattern) => normalizedSentence.match(pattern)?.[0] || "")
      .filter(Boolean);
    const exactNameMatch = Boolean(normalizedName && normalizedSentence.includes(normalizedName));
    const semanticScore = matchedKeywords.length * 2
      + Math.min(actionTerms.length, 2) * 2
      + Math.min(outcomeCues.length, 1) * 2
      + (exactNameMatch ? 4 : 0)
      - (negationTerms.length ? 10 : 0);
    return {
      sentence,
      matchedKeywords,
      actionTerms: [...new Set(actionTerms)],
      outcomeCues: [...new Set(outcomeCues)],
      negationTerms: [...new Set(negationTerms)],
      exactNameMatch,
      semanticScore,
      isNegated: negationTerms.length > 0
    };
  });

  const positive = analyses
    .filter((item) => item.matchedKeywords.length > 0 && !item.isNegated)
    .sort(sortSemantic);
  const negated = analyses
    .filter((item) => item.matchedKeywords.length > 0 && item.isNegated)
    .sort((left, right) => right.matchedKeywords.length - left.matchedKeywords.length);
  return {
    best: positive[0] || null,
    bestNegated: negated[0] || null,
    sentencesAnalyzed: sentences.length
  };
}

export function splitSentences(text) {
  return String(text)
    .match(/[^.!?\n•]+(?:[.!?]+|$)/g)?.map((sentence) => sentence.replace(/^[\s\-–—•\d.)]+/, "").trim())
    .filter((sentence) => sentence.length >= 8) || [];
}

function sortSemantic(left, right) {
  return right.semanticScore - left.semanticScore
    || right.matchedKeywords.length - left.matchedKeywords.length
    || left.sentence.length - right.sentence.length;
}

function normalize(value) {
  return String(value).toLocaleLowerCase("mn").replace(/\s+/g, " ").trim();
}
