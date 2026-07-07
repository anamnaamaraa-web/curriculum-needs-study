import { analyzeSentenceSemantics } from "./sentence-semantics.mjs";

const fallbackStopwords = new Set([
  "болон", "тухайн", "хүрээнд", "чадамж", "чадвар", "мэдлэг", "хэрэглэх",
  "хэрэгжүүлэх", "удирдлага", "сургалт", "суралцагч", "үнэлэх", "хангах"
]);

export function analyzeCompetencyCoverage({ competencies = [], text = "" } = {}) {
  return competencies.map((competency) => {
    const keywords = buildKeywords(competency);
    const semantics = analyzeSentenceSemantics({ text, keywords, competencyName: competency.name });
    const best = semantics.best;
    const bestNegated = semantics.bestNegated;
    const relevantBest = best && (best.exactNameMatch || best.matchedKeywords.length >= 2) ? best : null;
    const relevantNegated = bestNegated && (bestNegated.exactNameMatch || bestNegated.matchedKeywords.length >= 2)
      ? bestNegated
      : null;
    const hasActionOrOutcome = Boolean(relevantBest && (relevantBest.actionTerms.length || relevantBest.outcomeCues.length));
    const status = relevantBest && hasActionOrOutcome
      ? "covered"
      : relevantBest
        ? "partial"
        : "missing";
    const matchedTerms = relevantBest?.matchedKeywords || relevantNegated?.matchedKeywords || [];

    return {
      id: competency.id,
      name: competency.name,
      description: competency.description || "",
      status,
      matchedTerms,
      evidence: relevantBest?.sentence || relevantNegated?.sentence || "",
      rationale: status === "covered"
        ? `Нэг бүтэн өгүүлбэрт ${relevantBest.matchedKeywords.length} хамаарах ойлголт болон ${relevantBest.actionTerms.length + relevantBest.outcomeCues.length} үйлдэл/үр дүн хамт илэрсэн.`
        : status === "partial"
          ? `Өгүүлбэрт хамаарах ойлголт дурдсан боловч хэрэгжүүлэх үйлдэл эсвэл суралцах үр дүн хангалттай тодорхой бус байна.`
          : relevantNegated
            ? `Хамаарах ойлголт илэрсэн боловч өгүүлбэрт “${relevantNegated.negationTerms.join(", ")}” гэсэн үгүйсгэлтэй тул тусгасан гэж тооцоогүй.`
            : "Чадамжийг илэрхийлэх ойлголт, үйлдэл, суралцах үр дүн бүхий бүтэн өгүүлбэр илрээгүй."
    };
  });
}

function buildKeywords(competency) {
  const supplied = Array.isArray(competency.keywords) ? competency.keywords : [];
  const fallback = `${competency.name || ""} ${competency.description || ""}`
    .toLocaleLowerCase("mn")
    .split(/[^\p{L}\p{N}]+/u)
    .filter((token) => token.length >= 5 && !fallbackStopwords.has(token));
  return [...new Set([...supplied, ...fallback].map((item) => String(item).trim()).filter(Boolean))]
    .sort((left, right) => right.length - left.length)
    .slice(0, 16);
}
