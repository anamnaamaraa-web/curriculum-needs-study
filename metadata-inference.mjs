const organizationCatalog = [
  { name: "Монгол Улсын Засгийн газар", patterns: [/\bмонгол улсын засгийн газар\b/i] },
  { name: "Хууль зүй, дотоод хэргийн яам", patterns: [/хууль зүй[,\s]+дотоод хэргийн яам/i, /\bхздөя\b/i] },
  { name: "Боловсролын яам", patterns: [/боловсрол(?:ын|, шинжлэх ухааны) яам/i] },
  { name: "Цагдаагийн ерөнхий газар", patterns: [/цагдаагийн ерөнхий газар/i, /\bцег\b/i] },
  { name: "Хил хамгаалах ерөнхий газар", patterns: [/хил хамгаалах ерөнхий газар/i, /\bххег\b/i] },
  { name: "Шүүхийн шийдвэр гүйцэтгэх ерөнхий газар", patterns: [/шүүхийн шийдвэр гүйцэтгэх ерөнхий газар/i, /\bшшгег\b/i] },
  { name: "Онцгой байдлын ерөнхий газар", patterns: [/онцгой байдлын ерөнхий газар/i, /\bобег\b/i] },
  { name: "Нэгдсэн Үндэстний Байгууллага", patterns: [/нэгдсэн үндэстний байгууллага/i, /\bunited nations\b/i] },
  { name: "НҮБ-ын Мансууруулах бодис, гэмт хэрэгтэй тэмцэх алба", patterns: [/\bun(?:ited nations)?\s*office on drugs and crime\b/i, /\bunodc\b/i] }
];

const agencyCatalog = [
  { value: "Цагдаа", patterns: [/цагдаа/i, /\bpolice\b/i] },
  { value: "Хил хамгаалах", patterns: [/хил хамгаалах/i, /\bborder guard\b/i, /\bborder protection\b/i] },
  { value: "Шүүхийн шийдвэр гүйцэтгэх", patterns: [/шүүхийн шийдвэр гүйцэтгэх/i, /хорих байгууллаг/i, /\bcorrection(?:s|al)?\b/i] },
  { value: "Онцгой байдал", patterns: [/онцгой байдал/i, /гамшгаас хамгаалах/i, /\bemergency management\b/i] }
];

const programLevels = [
  { value: "doctorate", patterns: [/доктор/i, /\bdoctoral\b/i, /\bph\.?d\b/i] },
  { value: "master", patterns: [/магистр/i, /\bmaster(?:'s)?\b/i] },
  { value: "bachelor", patterns: [/бакалавр/i, /\bbachelor(?:'s)?\b/i] },
  { value: "professional", patterns: [/мэргэжил дээшлүүлэх/i, /давтан сургалт/i, /\bprofessional development\b/i] },
  { value: "certificate", patterns: [/сертификат/i, /богино хугацааны сургалт/i, /\bcertificate\b/i] }
];

export function titleFromFileName(fileName = "") {
  return String(fileName)
    .replace(/\.[^.]+$/, "")
    .replace(/[_]+/g, " ")
    .replace(/\s*[-–—]\s*(copy|хуулбар)\s*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function inferDocumentMetadata({ text = "", fileName = "", currentYear = new Date().getFullYear() } = {}) {
  const source = String(text);
  const title = titleFromFileName(fileName);
  const searchable = `${title}\n${source.slice(0, 50000)}`;
  const firstSection = source.slice(0, 16000);
  const organization = inferOrganization(searchable) || inferOrganizationFromTitle(title);
  const year = inferYear(`${title}\n${firstSection}`, currentYear);
  const agency = inferAgency(title, firstSection);
  const quality = inferQuality(searchable, organization);
  const url = inferUrl(source);
  const version = inferVersion(firstSection);
  const programName = /хөтөлбөр|\bprogram(?:me)?\b/i.test(title) ? title : "";
  const programLevel = inferProgramLevel(`${title}\n${firstSection}`);
  const targetGroup = inferTargetGroup(firstSection);

  return {
    title,
    organization,
    year,
    quality,
    agency,
    url,
    version,
    programName,
    programLevel,
    targetGroup
  };
}

function inferOrganization(text) {
  for (const organization of organizationCatalog) {
    if (organization.patterns.some((pattern) => pattern.test(text))) return organization.name;
  }
  return "";
}

function inferOrganizationFromTitle(title) {
  const titleOrganizations = [
    { name: "Цагдаагийн байгууллага", pattern: /цагдаагийн байгууллаг/i },
    { name: "Хил хамгаалах байгууллага", pattern: /хил хамгаалах байгууллаг/i },
    { name: "Шүүхийн шийдвэр гүйцэтгэх байгууллага", pattern: /шүүхийн шийдвэр гүйцэтгэх байгууллаг/i },
    { name: "Онцгой байдлын байгууллага", pattern: /онцгой байдлын байгууллаг/i }
  ];
  return titleOrganizations.find((organization) => organization.pattern.test(title))?.name || "";
}

function inferYear(text, currentYear) {
  const preferred = text.match(/(?:батлав|батлагдсан|баталсан|тушаал|тогтоол|огноо)[^0-9]{0,100}((?:19|20)\d{2})/i)?.[1];
  if (preferred && isPlausibleYear(preferred, currentYear)) return preferred;
  const years = [...text.matchAll(/\b((?:19|20)\d{2})\b/g)]
    .map((match) => match[1])
    .filter((year) => isPlausibleYear(year, currentYear));
  return years[0] || "";
}

function isPlausibleYear(value, currentYear) {
  const year = Number(value);
  return year >= 1900 && year <= currentYear + 1;
}

function inferAgency(title, text) {
  if (/салбар (?:дундын|хоорондын)|хууль сахиулах байгууллагууд/i.test(`${title}\n${text}`)) return "Салбар дундын";
  const scored = agencyCatalog.map((agency) => {
    const titleScore = agency.patterns.some((pattern) => pattern.test(title)) ? 5 : 0;
    const textScore = agency.patterns.reduce((sum, pattern) => sum + countMatches(text, pattern), 0);
    return { value: agency.value, score: titleScore + textScore };
  }).filter((agency) => agency.score > 0).sort((left, right) => right.score - left.score);
  if (!scored.length) return "";
  if (scored.length > 1 && scored[0].score === scored[1].score) return "Салбар дундын";
  return scored[0].value;
}

function countMatches(text, pattern) {
  const flags = pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`;
  return [...text.matchAll(new RegExp(pattern.source, flags))].length;
}

function inferQuality(text, organization) {
  const officialCues = /(батлав|баталсан|тушаал|тогтоол|албан ёсны|засгийн газар|яам|ерөнхий газар)/i.test(text);
  if (organization && officialCues) return "official";
  const peerReviewCues = [
    /\bdoi\s*:/i,
    /\bissn\b/i,
    /\babstract\b/i,
    /\breferences\b/i,
    /хураангуй/i,
    /ном зүй/i
  ].filter((pattern) => pattern.test(text)).length;
  return peerReviewCues >= 2 ? "peer-reviewed" : "";
}

function inferUrl(text) {
  const match = text.match(/https?:\/\/[^\s<>"')\]]+/i)?.[0] || "";
  return match.replace(/[.,;:]+$/, "");
}

function inferVersion(text) {
  const numberBeforeType = text.match(/([А-ЯA-Z]?[/-]?\d+(?:[/-]\d+)?)\s*дугаар\s*(?:тушаал|тогтоол|шийдвэр)/i);
  if (numberBeforeType) return numberBeforeType[1].replace(/\s+/g, "");
  const officialNumber = text.match(/(?:тушаал|тогтоол|шийдвэр)(?:ын)?\s*(?:дугаар)?\s*[№#:]?\s*([А-ЯA-Z]?[/-]?\d+(?:[/-]\d+)?)/i);
  if (officialNumber) return `${officialNumber[1].replace(/\s+/g, "")}`;
  const number = text.match(/№\s*([A-Za-zА-Яа-яӨөҮү0-9/-]{1,30})/i)?.[1];
  return number || "";
}

function inferProgramLevel(text) {
  return programLevels.find((level) => level.patterns.some((pattern) => pattern.test(text)))?.value || "";
}

function inferTargetGroup(text) {
  const match = text.match(/(?:зорилтот бүлэг|хамрагдах этгээд|хэнд зориулагдсан)\s*[:\-–—]\s*([^.\n]{5,250})/i);
  return match?.[1]?.replace(/\s+/g, " ").trim() || "";
}
