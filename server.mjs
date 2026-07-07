import { createServer } from "node:http";
import { mkdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const host = process.env.HOST || "0.0.0.0";
const port = Number(process.env.PORT || 4173);
const rootDir = path.dirname(fileURLToPath(import.meta.url));
const workspaceDir = path.resolve(rootDir, "..");
const envPath = path.join(workspaceDir, ".env.local");

await loadLocalEnv(envPath);

const dataDir = path.resolve(process.env.DATA_DIR || path.join(rootDir, "data"));
const sharedStatePath = path.join(dataDir, "shared-state.json");
const sharedStateBackupPath = path.join(dataDir, "shared-state.backup.json");
const supabaseUrl = normalizePublicBaseUrl(process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL);
const supabaseServiceKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || "";
const supabaseStateTable = normalizeSqlIdentifier(process.env.SUPABASE_STATE_TABLE || "app_state", "app_state");
const stateStorageMode = supabaseUrl && supabaseServiceKey ? "supabase" : "server-file";
const model = process.env.OPENAI_MODEL || "gpt-5.5";
const publicBaseUrl = normalizePublicBaseUrl(process.env.PUBLIC_BASE_URL);
const maxRequestBytes = 15_000_000;
const maxDocumentChars = 120_000;

const competencySchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    document_summary: {
      type: "string",
      description: "Two or three sentence neutral summary of the supplied policy document excerpt."
    },
    analysis_limitations: {
      type: "array",
      items: { type: "string" },
      description: "Material limitations of the supplied text and this analysis."
    },
    competencies: {
      type: "array",
      maxItems: 18,
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          name: {
            type: "string",
            description: "Concise canonical competency name in Mongolian."
          },
          category: {
            type: "string",
            enum: [
              "strategic_thinking",
              "policy_legal",
              "decision_making",
              "risk_crisis",
              "collaboration",
              "data_evidence",
              "digital_technology",
              "change_innovation",
              "ethics_accountability",
              "people_leadership",
              "communication",
              "performance_management",
              "other"
            ]
          },
          description: {
            type: "string",
            description: "Observable knowledge, skill, or judgment represented by the competency."
          },
          rationale: {
            type: "string",
            description: "Why this competency follows from the supplied evidence, without adding outside facts."
          },
          program_relevance: {
            type: "string",
            description: "How this documented competency relates to the supplied curriculum name, level, and target group."
          },
          evidence_quote: {
            type: "string",
            description: "Exact short quotation from the supplied text, no more than 300 characters."
          },
          evidence_type: {
            type: "string",
            enum: ["explicit", "implicit"]
          },
          confidence: {
            type: "string",
            enum: ["high", "medium", "low"]
          },
          keywords: {
            type: "array",
            items: { type: "string" },
            maxItems: 8
          },
          suggested_learning_outcome: {
            type: "string",
            description: "One measurable graduate learning outcome in Mongolian."
          }
        },
        required: [
          "name",
          "category",
          "description",
          "rationale",
          "program_relevance",
          "evidence_quote",
          "evidence_type",
          "confidence",
          "keywords",
          "suggested_learning_outcome"
        ]
      }
    }
  },
  required: ["document_summary", "analysis_limitations", "competencies"]
};

const server = createServer(async (request, response) => {
  try {
    if (request.method === "GET" && request.url === "/api/health") {
      return sendJson(response, 200, {
        ok: true,
        aiConfigured: Boolean(process.env.OPENAI_API_KEY),
        model,
        publicBaseUrl: publicBaseUrl || null,
        storage: await sharedStateStorageStatus()
      });
    }

    if (request.method === "GET" && request.url === "/api/state") {
      return sendJson(response, 200, {
        ok: true,
        state: await readSharedState(),
        storage: stateStorageMode
      });
    }

    if (request.method === "POST" && request.url === "/api/state") {
      try {
        return await saveSharedState(request, response);
      } catch (error) {
        console.error("Shared state save failed:", safeError(error));
        return sendJson(response, 502, {
          error: stateStorageMode === "supabase"
            ? "Supabase өгөгдөл хадгалах үед алдаа гарлаа."
            : "Серверийн өгөгдөл хадгалах үед алдаа гарлаа.",
          detail: safeError(error),
          storage: stateStorageMode
        });
      }
    }

    if (request.method === "GET" && request.url === "/robots.txt") {
      return sendText(response, 200, buildRobotsTxt(), "text/plain; charset=utf-8", "public, max-age=3600");
    }

    if (request.method === "GET" && request.url === "/sitemap.xml") {
      return sendText(response, 200, buildSitemapXml(), "application/xml; charset=utf-8", "public, max-age=3600");
    }

    if (request.method === "POST" && request.url === "/api/analyze-competencies") {
      return await analyzeCompetencies(request, response);
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      return sendJson(response, 405, { error: "Method not allowed." });
    }

    return await serveStatic(request, response);
  } catch (error) {
    console.error("Request failed:", safeError(error));
    return sendJson(response, 500, { error: "Серверийн дотоод алдаа гарлаа." });
  }
});

const listenCallback = () => {
  console.log(`Curriculum needs study running locally at http://127.0.0.1:${port}/`);
  if (!process.env.VERCEL) {
    console.log(`LAN sharing is enabled. Open http://<this-computer-ip>:${port}/ from devices on the same network.`);
  }
  console.log(`State storage: ${stateStorageMode}${stateStorageMode === "supabase" ? ` · table ${supabaseStateTable}` : ""}`);
  console.log(`AI analysis: ${process.env.OPENAI_API_KEY ? "configured" : "not configured"} · model ${model}`);
};

if (process.env.VERCEL) {
  server.listen(port, listenCallback);
} else {
  server.listen(port, host, listenCallback);
}

async function analyzeCompetencies(request, response) {
  if (!process.env.OPENAI_API_KEY) {
    return sendJson(response, 503, { error: "AI шинжилгээний түлхүүр тохируулагдаагүй байна." });
  }

  const payload = await readJsonBody(request);
  const sourceText = String(payload.sourceText || "").trim();
  if (sourceText.length < 40) {
    return sendJson(response, 400, { error: "Шинжилгээний эх текст хэт богино байна." });
  }
  if (sourceText.length > maxDocumentChars) {
    return sendJson(response, 400, { error: `Эх текст ${maxDocumentChars.toLocaleString()} тэмдэгтээс урт байна.` });
  }

  const documentContext = {
    title: cleanText(payload.title, 300) || "Нэр оруулаагүй баримт",
    organization: cleanText(payload.organization, 200) || "Тодорхойгүй",
    agency: cleanText(payload.agency, 120) || "Тодорхойгүй",
    year: cleanText(payload.year, 20) || "Тодорхойгүй",
    version: cleanText(payload.version, 120) || "Тодорхойгүй"
  };
  const programContext = {
    name: cleanText(payload.programName, 300),
    level: cleanText(payload.programLevel, 120),
    targetGroup: cleanText(payload.targetGroup, 500)
  };
  if (!programContext.name || !programContext.level || !programContext.targetGroup) {
    return sendJson(response, 400, { error: "Сургалтын хөтөлбөрийн нэр, түвшин, зорилтот бүлгийг бүрэн оруулна уу." });
  }

  const instructions = [
    "Та их сургуулийн сургалтын хөтөлбөрийн хэрэгцээний шинжилгээ хийдэг төвийг сахисан ахлах судлаач.",
    "ЗӨВХӨН хэрэглэгчийн өгсөн бодлого, стратегийн баримтын эх текстэд тулгуурлан удирдах албан тушаалтанд шаардлагатай чадамжийг гарга.",
    "Түлхүүр үгийн дан давтамжаар дүгнэхгүй. Бүтэн өгүүлбэрийн утга, өгүүлбэрт заасан хийх үйлдэл, зорилго, нөхцөл, үгүйсгэлийг хамтад нь шинжил.",
    "“Тусгахгүй”, “хамаарахгүй”, “шаардахгүй” зэрэг үгүйсгэсэн өгүүлбэрийг эерэг чадамжийн нотолгоо болгож болохгүй.",
    "Хөтөлбөрийн нэр, түвшин, зорилтот бүлгийг чадамжийн хамаарлыг сонгох, эрэмбэлэхэд ашигла; эдгээрийг чадамжийн нотолгоо гэж үзэж болохгүй.",
    "Гадаад мэдлэг, байгууллагын талаар таамаг, баримтаар батлагдаагүй шаардлага бүү нэм.",
    "Чадамж бүр мэдлэг, ур чадвар эсвэл үнэлэмжийн ажиглагдахуйц нэгдэл байна. Сэдэв, зорилго, үйл ажиллагааг дангаар нь чадамж гэж нэрлэхгүй.",
    "Давхардсан чадамжийг нэгтгэ. Ижил эх заалтаас үндэслэлгүй олон чадамж бүү үүсгэ.",
    "evidence_quote нь өгсөн эх текстээс үгчлэн авсан, 300 тэмдэгтээс богино ишлэл байна.",
    "program_relevance-д тухайн чадамж хөтөлбөрийн нэр, түвшин, зорилтот бүлэгтэй хэрхэн хамаарахыг төвийг сахисан байдлаар тайлбарла.",
    "Шууд шаардаж байвал evidence_type=explicit; болгоомжтой тайлбарлан гаргасан бол implicit.",
    "Нотолгоо хангалтгүй бол confidence=low; хамааралгүй бол огт бүү оруул.",
    "Бүх тайлбар, нэр, суралцахуйн үр дүнг монгол хэлээр бич. Эх ишлэлийг эх хэлээр нь хэвээр үлдээ.",
    "Судалгааны хязгаарлалт болон тодорхойгүй байдлыг analysis_limitations-д ил тод тэмдэглэ."
  ].join("\n");

  const input = [
    "БАРИМТЫН МЕТА МЭДЭЭЛЭЛ",
    JSON.stringify(documentContext, null, 2),
    "",
    "СУРГАЛТЫН ХӨТӨЛБӨРИЙН МЭДЭЭЛЭЛ",
    JSON.stringify(programContext, null, 2),
    "",
    "ШИНЖИЛГЭЭНИЙ ЭХ ТЕКСТ",
    sourceText
  ].join("\n");

  const apiResponse = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model,
      store: false,
      reasoning: { effort: "medium" },
      instructions,
      input,
      max_output_tokens: 6000,
      text: {
        format: {
          type: "json_schema",
          name: "policy_document_competency_analysis",
          strict: true,
          schema: competencySchema
        }
      }
    })
  });

  const apiPayload = await apiResponse.json().catch(() => ({}));
  if (!apiResponse.ok) {
    console.error("OpenAI API error:", apiResponse.status, apiPayload?.error?.code || "unknown");
    return sendJson(response, apiResponse.status, {
      error: apiErrorMessage(apiResponse.status, apiPayload?.error?.code)
    });
  }

  const outputText = extractOutputText(apiPayload);
  if (!outputText) {
    return sendJson(response, 502, { error: "AI бүтэцчилсэн үр дүн буцаасангүй." });
  }

  let analysis;
  try {
    analysis = JSON.parse(outputText);
  } catch {
    return sendJson(response, 502, { error: "AI үр дүнг JSON болгон тайлах боломжгүй байна." });
  }

  const verifiedCompetencies = (analysis.competencies || []).filter((competency) => evidenceExistsInSource(sourceText, competency.evidence_quote));
  const removedCount = (analysis.competencies || []).length - verifiedCompetencies.length;
  analysis.competencies = verifiedCompetencies;
  if (removedCount > 0) {
    analysis.analysis_limitations = [
      ...(analysis.analysis_limitations || []),
      `${removedCount} саналын ишлэл эх тексттэй үгчлэн таараагүй тул үр дүнгээс хасав.`
    ];
  }

  return sendJson(response, 200, {
    analysis,
    meta: {
      model: apiPayload.model || model,
      responseId: apiPayload.id || null,
      inputTokens: apiPayload.usage?.input_tokens ?? null,
      outputTokens: apiPayload.usage?.output_tokens ?? null
    }
  });
}

async function readSharedState() {
  if (stateStorageMode === "supabase") return await readSupabaseState();
  return await readFileState();
}

async function readFileState() {
  try {
    const content = await readFile(sharedStatePath, "utf8");
    const payload = JSON.parse(content);
    return payload && typeof payload === "object" ? payload : null;
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

async function sharedStateStorageStatus() {
  if (stateStorageMode === "supabase") return await supabaseStorageStatus();
  return await fileStorageStatus();
}

async function fileStorageStatus() {
  let exists = false;
  let bytes = 0;
  let savedAt = null;
  try {
    const fileStat = await stat(sharedStatePath);
    exists = fileStat.isFile();
    bytes = fileStat.size;
    if (exists) {
      const payload = await readSharedState();
      savedAt = payload?.serverMeta?.savedAt || null;
    }
  } catch (error) {
    if (error.code !== "ENOENT") {
      return {
        mode: "server-file",
        dataDir,
        statePath: sharedStatePath,
        writable: false,
        exists: false,
        bytes: 0,
        savedAt: null,
        error: safeError(error)
      };
    }
  }
  return {
    mode: "server-file",
    dataDir,
    statePath: sharedStatePath,
    writable: true,
    exists,
    bytes,
    savedAt,
    supabase: {
      urlConfigured: Boolean(supabaseUrl),
      serviceKeyConfigured: Boolean(supabaseServiceKey),
      table: supabaseStateTable
    }
  };
}

async function supabaseStorageStatus() {
  try {
    const state = await readSupabaseState();
    return {
      mode: "supabase",
      table: supabaseStateTable,
      configured: true,
      writable: true,
      exists: Boolean(state),
      savedAt: state?.serverMeta?.savedAt || null
    };
  } catch (error) {
    return {
      mode: "supabase",
      table: supabaseStateTable,
      configured: true,
      writable: false,
      exists: false,
      savedAt: null,
      error: safeError(error)
    };
  }
}

async function readSupabaseState() {
  const response = await fetch(supabaseRestUrl(`${supabaseStateTable}?id=eq.default&select=payload,updated_at`), {
    method: "GET",
    headers: supabaseHeaders()
  });
  const text = await response.text();
  if (!response.ok) throw new Error(`Supabase read failed ${response.status}: ${text.slice(0, 300)}`);
  const rows = text ? JSON.parse(text) : [];
  const payload = Array.isArray(rows) && rows[0]?.payload && typeof rows[0].payload === "object" ? rows[0].payload : null;
  return payload;
}

async function writeSupabaseState(storedState) {
  const response = await fetch(supabaseRestUrl(`${supabaseStateTable}?on_conflict=id`), {
    method: "POST",
    headers: {
      ...supabaseHeaders(),
      "Content-Type": "application/json",
      "Prefer": "resolution=merge-duplicates,return=representation"
    },
    body: JSON.stringify({
      id: "default",
      payload: storedState,
      updated_at: new Date().toISOString()
    })
  });
  const text = await response.text();
  if (!response.ok) throw new Error(`Supabase write failed ${response.status}: ${text.slice(0, 300)}`);
}

function supabaseRestUrl(pathAndQuery) {
  return `${supabaseUrl}/rest/v1/${pathAndQuery}`;
}

function supabaseHeaders() {
  return {
    "apikey": supabaseServiceKey,
    "Authorization": `Bearer ${supabaseServiceKey}`,
    "Accept": "application/json"
  };
}

async function saveSharedState(request, response) {
  const payload = await readJsonBody(request);
  const incomingState = payload?.state;
  if (!incomingState || typeof incomingState !== "object" || Array.isArray(incomingState)) {
    return sendJson(response, 400, { error: "Хадгалах state объект буруу байна." });
  }

  const savedAt = new Date().toISOString();
  const storedState = {
    ...incomingState,
    serverMeta: {
      ...(incomingState.serverMeta && typeof incomingState.serverMeta === "object" ? incomingState.serverMeta : {}),
      savedAt
    }
  };
  if (stateStorageMode === "supabase") {
    await writeSupabaseState(storedState);
    return sendJson(response, 200, { ok: true, savedAt, storage: stateStorageMode });
  }
  await mkdir(dataDir, { recursive: true });
  await backupExistingSharedState();
  const tmpPath = path.join(dataDir, `shared-state.${process.pid}.${Date.now()}.tmp`);
  await writeFile(tmpPath, `${JSON.stringify(storedState, null, 2)}\n`, "utf8");
  await rename(tmpPath, sharedStatePath);
  return sendJson(response, 200, { ok: true, savedAt, storage: stateStorageMode });
}

async function backupExistingSharedState() {
  try {
    const current = await readFile(sharedStatePath, "utf8");
    await writeFile(sharedStateBackupPath, current, "utf8");
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

async function serveStatic(request, response) {
  const requestUrl = new URL(request.url, `http://${request.headers.host || `${host}:${port}`}`);
  const requestedPath = decodeURIComponent(requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname);
  const filePath = path.resolve(rootDir, `.${requestedPath}`);
  if (!filePath.startsWith(`${rootDir}${path.sep}`)) {
    return sendJson(response, 403, { error: "Forbidden." });
  }

  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) throw new Error("Not a file");
    const content = await readFile(filePath);
    response.writeHead(200, {
      "Content-Type": mimeType(filePath),
      "Content-Length": content.length,
      "Cache-Control": filePath.endsWith(".html") || filePath.endsWith(".js") ? "no-cache" : "public, max-age=3600",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "no-referrer",
      "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'self'; worker-src 'self' blob:; img-src 'self' data:; font-src 'self';"
    });
    if (request.method === "HEAD") return response.end();
    response.end(content);
  } catch {
    return sendJson(response, 404, { error: "Not found." });
  }
}

async function readJsonBody(request) {
  let size = 0;
  const chunks = [];
  for await (const chunk of request) {
    size += chunk.length;
    if (size > maxRequestBytes) throw new Error("Request too large");
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return {};
  }
}

async function loadLocalEnv(filePath) {
  try {
    const content = await readFile(filePath, "utf8");
    for (const line of content.split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (!match || process.env[match[1]]) continue;
      const value = match[2].replace(/^(['"])(.*)\1$/, "$2");
      process.env[match[1]] = value;
    }
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

function extractOutputText(payload) {
  if (typeof payload.output_text === "string") return payload.output_text;
  for (const item of payload.output || []) {
    for (const content of item.content || []) {
      if (content.type === "output_text" && typeof content.text === "string") return content.text;
    }
  }
  return "";
}

function apiErrorMessage(status, code) {
  if (status === 401) return "OpenAI API түлхүүр хүчингүй эсвэл цуцлагдсан байна.";
  if (status === 429 && code === "insufficient_quota") return "OpenAI API төслийн кредит эсвэл квот хүрэлцэхгүй байна.";
  if (status === 429) return "OpenAI API хүсэлтийн хязгаарт хүрсэн. Түр хүлээгээд дахин оролдоно уу.";
  if (status === 403) return "Сонгосон AI загварт энэ төслийн хандалт хүрэхгүй байна.";
  return "AI шинжилгээний үйлчилгээ хүсэлтийг боловсруулж чадсангүй.";
}

function cleanText(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

function evidenceExistsInSource(sourceText, evidenceQuote) {
  const normalize = (value) => String(value || "").replace(/\s+/g, " ").trim();
  const source = normalize(sourceText);
  const quote = normalize(evidenceQuote);
  return quote.length > 0 && source.includes(quote);
}

function sendJson(response, statusCode, payload) {
  const body = JSON.stringify(payload);
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff"
  });
  response.end(body);
}

function sendText(response, statusCode, body, contentType, cacheControl = "no-store") {
  response.writeHead(statusCode, {
    "Content-Type": contentType,
    "Content-Length": Buffer.byteLength(body),
    "Cache-Control": cacheControl,
    "X-Content-Type-Options": "nosniff"
  });
  response.end(body);
}

function normalizePublicBaseUrl(value) {
  const url = String(value || "").trim();
  if (!url) return "";
  return url.replace(/\/+$/, "");
}

function normalizeSqlIdentifier(value, fallback) {
  const identifier = String(value || "").trim();
  return /^[A-Za-z_][A-Za-z0-9_]*$/.test(identifier) ? identifier : fallback;
}

function requestBaseUrl() {
  if (publicBaseUrl) return publicBaseUrl;
  return `http://127.0.0.1:${port}`;
}

function buildRobotsTxt() {
  return [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${requestBaseUrl()}/sitemap.xml`,
    ""
  ].join("\n");
}

function buildSitemapXml() {
  const base = xmlEscape(requestBaseUrl());
  const lastmod = new Date().toISOString().slice(0, 10);
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    "  <url>",
    `    <loc>${base}/</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    "    <changefreq>weekly</changefreq>",
    "    <priority>1.0</priority>",
    "  </url>",
    "</urlset>",
    ""
  ].join("\n");
}

function xmlEscape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function mimeType(filePath) {
  const types = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".mjs": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".txt": "text/plain; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon"
  };
  return types[path.extname(filePath).toLowerCase()] || "application/octet-stream";
}

function safeError(error) {
  return error instanceof Error ? error.message : "Unknown error";
}
