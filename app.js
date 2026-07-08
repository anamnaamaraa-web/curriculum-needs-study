const appAssetBaseUrl = new URL(".", document.currentScript?.src || window.location.href);
const resolveAppAsset = (path) => new URL(path, appAssetBaseUrl).href;

const taskDefinitions = [
  { code: "1.1", phase: 1, period: "07.03–07.07", title: "Ажлын хэсгийн хурал, ажлын төлөвлөгөө, үүрэг хуваарилалт батлах", output: "Хуралдааны тэмдэглэл, үүрэг хуваарилалт", assignee: "Ажлын хэсгийн ахлагч" },
  { code: "1.2", phase: 1, period: "07.03–07.07", title: "Судалгааны хэрэглэгдэхүүн боловсруулах: асуулга загвар, ярилцлагын удирдамж", output: "Асуулга загвар, ярилцлагын гид", assignee: "Судалгааны баг" },
  { code: "1.3", phase: 1, period: "07.06–07.07", title: "Захиалагч байгууллагуудын стратегийн баримт бичгүүд цуглуулах, шинжлэх", output: "Баримт бичгийн шинжилгээний тайлан", assignee: "Баримт бичгийн баг" },
  { code: "1.4", phase: 1, period: "07.06–07.07", title: "Олон улсын хууль сахиулах удирдлагын сургалтын тогтолцоог судлах", output: "Олон улсын харьцуулалтын хүснэгт", assignee: "Харьцуулалтын баг" },
  { code: "1.5", phase: 1, period: "07.08–07.09", title: "Ижил төстэй магистрын хөтөлбөрүүдтэй харьцуулалт хийх: чадамж, хичээл, кредит цаг, агуулга", output: "Харьцуулалтын матриц", assignee: "Харьцуулалтын баг" },
  { code: "1.6", phase: 1, period: "07.08–07.09", title: "I шатны дундын үр дүн нэгтгэх, II шатанд бэлтгэх", output: "I шатны нэгтгэл тайлан", assignee: "Нарийн бичгийн дарга" },
  { code: "2.1", phase: 2, period: "08.17–08.19", title: "Цагдаагийн ерөнхий газрын дээд удирдлагуудтай фокус бүлгийн ярилцлага хийх", output: "Ярилцлагын бичлэг, тэмдэглэл", assignee: "Ярилцлагын баг" },
  { code: "2.2", phase: 2, period: "08.20–08.24", title: "Хил хамгаалах ерөнхий газар, Онцгой байдлын ерөнхий газрын удирдлагуудтай фокус бүлгийн ярилцлага хийх", output: "Ярилцлагын бичлэг, тэмдэглэл", assignee: "Ярилцлагын баг" },
  { code: "2.3", phase: 2, period: "08.25–08.27", title: "ШШГА-ын удирдлагуудтай фокус бүлгийн ярилцлага хийх", output: "Ярилцлагын бичлэг, тэмдэглэл", assignee: "Ярилцлагын баг" },
  { code: "2.4", phase: 2, period: "08.28–08.31", title: "Ярилцлагын үр дүнг нэгтгэх, дутагдаж буй чадамжуудын жагсаалт гаргах", output: "Ур чадварын зөрүүний жагсаалт", assignee: "Шинжилгээний баг" },
  { code: "3.1", phase: 3, period: "09.01–09.08", title: "Одоогийн магистрын суралцагчдаас судалгаа авах", output: "Асуулгын хариулт — бүх суралцагч", assignee: "Асуулгын баг" },
  { code: "3.2", phase: 3, period: "09.01–09.08", title: "Захиалагч байгууллагын дунд шатны удирдах албан тушаалтнуудаас судалгаа авах", output: "Асуулгын хариулт — n≥50", assignee: "Асуулгын баг" },
  { code: "3.3", phase: 3, period: "09.09–09.15", title: "Асуулгын үр дүн боловсруулах", output: "Чадамжийн жагсаалт, шинжилгээний тайлан", assignee: "Шинжилгээний баг" },
  { code: "3.4", phase: 3, period: "09.09–09.15", title: "Олон улсын Leadership Competency Framework-тай харьцуулах", output: "Харьцуулалтын матриц", assignee: "Харьцуулалтын баг" },
  { code: "4.1", phase: 4, period: "09.16–09.21", title: "3 түвшний судалгааны үр дүн нэгтгэх: Макро + Мезо + Микро", output: "Нэгтгэл шинжилгээний тайлан", assignee: "Шинжилгээний баг" },
  { code: "4.2", phase: 4, period: "09.16–09.21", title: "Хөтөлбөрийн шинэчлэлийн санал боловсруулах", output: "Шинэчлэлийн санал: хичээл, кредит, агуулга", assignee: "Хөтөлбөрийн баг" },
  { code: "4.3", phase: 4, period: "09.22–09.25", title: "Эцсийн тайлан бичих", output: "Эцсийн судалгааны тайлан — төсөл", assignee: "Тайлангийн баг" },
  { code: "4.4", phase: 4, period: "09.28–09.29", title: "Ажлын хэсгийн эцсийн хурал: тайлан хэлэлцэх, батлах, удирдлагад танилцуулах", output: "Батлагдсан эцсийн тайлан", assignee: "Ажлын хэсэг" }
];

const phases = [
  { id: 1, name: "Бэлтгэл ба байгууллагын түвшин", period: "2026.07.03–2026.07.09 · 1 долоо хоног", level: "Макро", description: "Бодлого, стратеги, олон улсын хөтөлбөр" },
  { id: 2, name: "Үйл ажиллагааны түвшин", period: "2026.08.17–2026.08.31 · 2 долоо хоног", level: "Мезо", description: "Дээд удирдлагын фокус бүлэг" },
  { id: 3, name: "Хувь хүний түвшин", period: "2026.09.01–2026.09.15 · 2 долоо хоног", level: "Микро", description: "Суралцагч ба дунд шатны удирдлагын асуулга" },
  { id: 4, name: "Нэгтгэл шинжилгээ ба тайлан бэлтгэх", period: "2026.09.16–2026.09.29 · 2 долоо хоног", level: "Шийдвэр", description: "3 түвшний нэгтгэл, шинэчлэлийн санал" }
];

const programDefinitions = [
  { id: "police", name: "Цагдаагийн стратеги", code: "103208", agency: "Цагдаа" },
  { id: "border", name: "Хилийн стратеги", code: "103909", agency: "Хил хамгаалах" },
  { id: "corrections", name: "Шүүхийн шийдвэр гүйцэтгэлийн стратеги", code: "103209", agency: "Шүүхийн шийдвэр гүйцэтгэх" },
  { id: "emergency", name: "Онцгой байдлын стратеги", code: "103210", agency: "Онцгой байдал" }
];

const competencies = [
  { id: "systems", name: "Системийн ба стратегийн сэтгэлгээ", detail: "Урт хугацааны нөлөөлөл, харилцан хамаарал" },
  { id: "policy", name: "Төрийн бодлого ба эрх зүйн шинжилгээ", detail: "Бодлогын хувилбар, хэрэгжилтийн үнэлгээ" },
  { id: "decision", name: "Стратегийн шийдвэр гаргалт", detail: "Тодорхойгүй нөхцөл, эрсдэлийн сонголт" },
  { id: "crisis", name: "Хямрал ба эрсдэлийн удирдлага", detail: "Бэлэн байдал, удирдлага, сэргээн босголт" },
  { id: "coordination", name: "Салбар хоорондын хамтын ажиллагаа", detail: "Нэгдсэн удирдлага, түншлэл" },
  { id: "evidence", name: "Өгөгдөл ба нотолгоонд суурилсан удирдлага", detail: "Шинжилгээ, хэмжилт, технологи" },
  { id: "change", name: "Өөрчлөлт ба инновацын манлайлал", detail: "Байгууллагын өөрчлөлт, суралцах чадвар" },
  { id: "ethics", name: "Ёс зүй, хариуцлага, олон нийтийн итгэл", detail: "Шударга байдал, ил тод байдал" }
];

const documentCompetencyCatalog = [
  { id: "systems", name: "Системийн ба стратегийн сэтгэлгээ", description: "Алсын хараа, урт хугацааны зорилго, системийн хамаарлыг шинжлэх", keywords: ["стратеги", "алсын хараа", "урт хугацаа", "систем", "сценари", "стратегийн төлөвлөлт"] },
  { id: "policy", name: "Төрийн бодлого ба эрх зүйн шинжилгээ", description: "Бодлого боловсруулах, эрх зүйн нийцэл ба хэрэгжилтийг үнэлэх", keywords: ["төрийн бодлого", "бодлогын хэрэгжилт", "эрх зүй", "хууль тогтоомж", "зохицуулалт", "бодлогын шинжилгээ"] },
  { id: "decision", name: "Стратегийн шийдвэр гаргалт", description: "Тодорхойгүй нөхцөлд хувилбар үнэлж, хариуцлагатай шийдвэр гаргах", keywords: ["шийдвэр гаргах", "шийдвэр гаргалт", "хувилбар", "эрэмбэ", "сонголт", "удирдлагын шийдвэр"] },
  { id: "crisis", name: "Хямрал ба эрсдэлийн удирдлага", description: "Эрсдэл үнэлэх, бэлэн байдлыг хангах, хямралыг удирдах", keywords: ["эрсдэл", "хямрал", "гамшиг", "бэлэн байдал", "тасралтгүй ажиллагаа", "онцгой нөхцөл"] },
  { id: "coordination", name: "Салбар хоорондын хамтын ажиллагаа", description: "Байгууллага хоорондын зохицуулалт, түншлэл, нэгдсэн удирдлага", keywords: ["хамтын ажиллагаа", "уялдаа", "зохицуулалт", "салбар хооронд", "түншлэл", "нэгдсэн удирдлага"] },
  { id: "evidence", name: "Өгөгдөл ба нотолгоонд суурилсан удирдлага", description: "Өгөгдөл цуглуулах, шинжлэх, хэмжилтэд тулгуурлан удирдах", keywords: ["өгөгдөл", "нотолгоо", "судалгаа", "дүн шинжилгээ", "статистик", "үзүүлэлт", "мониторинг", "үнэлгээ"] },
  { id: "digital", name: "Дижитал шилжилт ба технологийн удирдлага", description: "Мэдээллийн систем, кибер орчин, шинэ технологийг стратегитай уялдуулах", keywords: ["дижитал", "цахим", "технологи", "мэдээллийн систем", "кибер", "хиймэл оюун", "автоматжуулалт"] },
  { id: "change", name: "Өөрчлөлт ба инновацын манлайлал", description: "Байгууллагын өөрчлөлт, шинэчлэл, инновацыг манлайлах", keywords: ["өөрчлөлт", "шинэчлэл", "инновац", "манлайлал", "байгууллагын хөгжил", "чадавхжуулах"] },
  { id: "ethics", name: "Ёс зүй, хариуцлага, олон нийтийн итгэл", description: "Шударга байдал, ил тод байдал, хүний эрх ба тайлагналыг хангах", keywords: ["ёс зүй", "хариуцлага", "ил тод", "хүний эрх", "шударга", "олон нийтийн итгэл", "тайлагнал"] },
  { id: "people", name: "Хүний нөөц ба авьяас удирдах", description: "Алба хаагчийн хөгжил, гүйцэтгэл, залгамж халааг удирдах", keywords: ["хүний нөөц", "алба хаагч", "гүйцэтгэлийн үнэлгээ", "сургалт хөгжил", "залгамж халаа", "чадамж"] },
  { id: "communication", name: "Стратегийн харилцаа ба хэлэлцээ", description: "Оролцогч талтай харилцах, хэлэлцээ хийх, олон нийтэд мэдээлэх", keywords: ["харилцаа", "хэлэлцээ", "олон нийт", "оролцогч тал", "мэдээлэл түгээх", "зөвлөлдөх"] },
  { id: "performance", name: "Гүйцэтгэл ба төслийн удирдлага", description: "Зорилт, төсөл, төсөв, гүйцэтгэлийг төлөвлөж хянах", keywords: ["гүйцэтгэл", "төсөл", "төсөв", "санхүү", "зорилтот түвшин", "хэрэгжилтийн төлөвлөгөө"] }
];

const deliverables = [
  { code: "01", title: "I шатны нэгтгэл тайлан", detail: "Бодлого, стратеги, олон улсын харьцуулалт", tasks: ["1.3", "1.4", "1.5", "1.6"], evidence: "macro" },
  { code: "02", title: "Чадварын зөрүүний жагсаалт", detail: "Фокус бүлгийн кодлогдсон үр дүн", tasks: ["2.1", "2.2", "2.3", "2.4"], evidence: "focus" },
  { code: "03", title: "Чадамжийн шинжилгээний тайлан", detail: "Суралцагч ба дунд шатны удирдлагын асуулга", tasks: ["3.1", "3.2", "3.3"], evidence: "survey" },
  { code: "04", title: "Leadership framework харьцуулалт", detail: "Нийтлэг ба онцлог хэрэгцээний матриц", tasks: ["3.4"], evidence: "comparison" },
  { code: "05", title: "Нэгтгэл шинжилгээний тайлан", detail: "Макро + мезо + микро нотолгоо", tasks: ["4.1"], evidence: "all" },
  { code: "06", title: "Хөтөлбөрийн шинэчлэлийн санал", detail: "Хичээл, кредит, агуулгын санал", tasks: ["4.2"], evidence: "all" },
  { code: "07", title: "Батлагдсан эцсийн тайлан", detail: "Хуралдаанаар хэлэлцэж баталсан шийдвэр", tasks: ["4.3", "4.4"], evidence: "all" }
];

const storageKey = "strategicCurriculumNeedsProjectV3";
const sessionEmailKey = "strategicCurriculumNeedsCurrentEmail";
const sharedStateApiPath = "/api/state";
const statusLabels = {
  "not-started": "Эхлээгүй",
  "in-progress": "Хийгдэж байна",
  "review": "Хяналтад",
  "done": "Дууссан"
};

const roleDefinitions = [
  { id: "admin", name: "Admin", description: "Бүх хэсэг болон эрхийн тохиргоог удирдана." },
  { id: "researcher", name: "Судлаач", description: "Судалгааны ажил гүйцэтгэх үндсэн хэрэглэгч." },
  { id: "viewer", name: "Харах эрхтэй хэрэглэгч", description: "Зөвхөн зөвшөөрсөн тайлан, арга зүй, самбарыг харна." }
];

const managedViewDefinitions = [
  { id: "plan", name: "Үйл ажиллагааны төлөвлөгөө", group: "Ажлын орчин" },
  { id: "tools", name: "Судалгааны хэрэгслүүд", group: "Ажлын орчин" },
  { id: "survey", name: "Чадамжийн асуулга", group: "Ажлын орчин" },
  { id: "analysis", name: "Нэгдсэн шинжилгээ", group: "Ажлын орчин" },
  { id: "program-comparison", name: "Хөтөлбөрийн харьцуулалт", group: "Ажлын орчин" },
  { id: "reports", name: "Гарах үр дүн, тайлан", group: "Ажлын орчин" },
  { id: "methodology", name: "Арга зүй ба чанарын хяналт", group: "Лавлагаа" }
];

const defaultRoleAccess = {
  researcher: managedViewDefinitions.map((view) => view.id),
  viewer: ["reports", "methodology"]
};

const defaultAdminEmail = "admin@local.mn";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
let state = loadState();
let pendingDocumentCompetencies = [];
let selectedDocumentFileName = "";
let pendingAiAnalysis = null;
let curriculumCoverageFileName = "";
let curriculumCoverageText = "";
let curriculumCoverageResults = [];
let curriculumCoverageRunId = 0;
let learningOutcomeCoverageText = "";
let learningOutcomeCoverageResults = [];
let learningOutcomeCoverageRunId = 0;
let sharedStateSaveTimer = 0;
let sharedStateSaveInFlight = Promise.resolve();
let selectedSurveySourceFilter = "all";
let selectedSurveyProgramFilter = "all";
let selectedComparisonProgramFilter = "all";
let comparisonImportSuggestions = [];
let comparisonRejectedSuggestions = 0;
let comparisonFormEvidence = {};
let surveyDraftRatings = {};

function defaultState() {
  const tasks = createTaskMap();
  const programTasks = Object.fromEntries(programDefinitions.map((program) => [program.id, createTaskMap()]));
  return {
    tasks,
    programTasks,
    documents: [],
    focusGroups: [],
    comparisons: [],
    localPrograms: [],
    learningOutcomeCoverage: {
      text: "",
      results: [],
      programFilter: "all",
      sourceFilter: "all",
      agencyFilter: "",
      updatedAt: ""
    },
    surveys: [],
    access: createDefaultAccess()
  };
}

function normalizeProjectState(saved) {
  if (!saved || typeof saved !== "object") return defaultState();
  const base = defaultState();
  const legacyTasks = saved.tasks && typeof saved.tasks === "object" ? saved.tasks : {};
  const programTasks = { ...base.programTasks };
  programDefinitions.forEach((program) => {
    const savedProgramTasks = saved.programTasks?.[program.id];
    programTasks[program.id] = createTaskMap(savedProgramTasks || legacyTasks);
  });
  return {
    tasks: createTaskMap(legacyTasks),
    programTasks,
    documents: Array.isArray(saved.documents) ? saved.documents : [],
    focusGroups: Array.isArray(saved.focusGroups) ? saved.focusGroups : [],
    comparisons: Array.isArray(saved.comparisons) ? saved.comparisons : [],
    localPrograms: Array.isArray(saved.localPrograms) ? saved.localPrograms : [],
    learningOutcomeCoverage: saved.learningOutcomeCoverage && typeof saved.learningOutcomeCoverage === "object"
      ? {
          text: String(saved.learningOutcomeCoverage.text || ""),
          results: Array.isArray(saved.learningOutcomeCoverage.results) ? saved.learningOutcomeCoverage.results : [],
          programFilter: saved.learningOutcomeCoverage.programFilter || "all",
          sourceFilter: saved.learningOutcomeCoverage.sourceFilter || "all",
          agencyFilter: saved.learningOutcomeCoverage.agencyFilter || "",
          updatedAt: saved.learningOutcomeCoverage.updatedAt || ""
        }
      : base.learningOutcomeCoverage,
    surveys: Array.isArray(saved.surveys) ? saved.surveys : [],
    access: normalizeAccess(saved.access),
    serverMeta: saved.serverMeta && typeof saved.serverMeta === "object" ? saved.serverMeta : {}
  };
}

function loadState() {
  try {
    return normalizeProjectState(JSON.parse(localStorage.getItem(storageKey) || "null"));
  } catch {
    return defaultState();
  }
}

function createDefaultAccess() {
  return {
    adminEmail: defaultAdminEmail,
    currentEmail: "",
    currentRole: "admin",
    roleViews: typeof structuredClone === "function" ? structuredClone(defaultRoleAccess) : JSON.parse(JSON.stringify(defaultRoleAccess)),
    passwords: {},
    users: [
      { email: "researcher@example.mn", role: "researcher", views: [...defaultRoleAccess.researcher], programs: programDefinitions.map((program) => program.id) },
      { email: "viewer@example.mn", role: "viewer", views: [...defaultRoleAccess.viewer], programs: programDefinitions.map((program) => program.id) }
    ]
  };
}

function normalizeAccess(seed = {}) {
  const base = createDefaultAccess();
  const adminEmail = normalizeEmail(seed?.adminEmail || base.adminEmail) || base.adminEmail;
  const protectedAdminEmails = adminEmailList(adminEmail);
  const currentEmail = normalizeEmail(sessionStorage.getItem(sessionEmailKey) || "");
  const roleViews = { ...base.roleViews };
  ["researcher", "viewer"].forEach((roleId) => {
    const savedViews = Array.isArray(seed?.roleViews?.[roleId]) ? seed.roleViews[roleId] : roleViews[roleId];
    roleViews[roleId] = savedViews.filter((viewId) => managedViewDefinitions.some((view) => view.id === viewId));
  });
  const users = Array.isArray(seed?.users)
    ? seed.users
        .map((user) => ({
          email: normalizeEmail(user.email),
          role: roleDefinitions.some((role) => role.id === user.role && role.id !== "admin") ? user.role : "viewer",
          views: Array.isArray(user.views)
            ? user.views.filter((viewId) => managedViewDefinitions.some((view) => view.id === viewId))
            : roleViews[user.role] || roleViews.viewer,
          programs: Array.isArray(user.programs)
            ? user.programs.filter((programId) => programDefinitions.some((program) => program.id === programId))
            : programDefinitions.map((program) => program.id)
        }))
        .filter((user) => user.email && !protectedAdminEmails.includes(user.email))
    : base.users;
  const currentRole = isAdminEmail(currentEmail, { adminEmail }) ? "admin" : (users.find((user) => user.email === currentEmail)?.role || "viewer");
  const passwords = seed?.passwords && typeof seed.passwords === "object" ? seed.passwords : {};
  return { adminEmail, currentEmail, currentRole, roleViews, users, passwords };
}

function createTaskMap(seed = {}) {
  const tasks = {};
  taskDefinitions.forEach((task) => {
    const saved = seed?.[task.code] || {};
    tasks[task.code] = {
      status: saved.status || "not-started",
      assignee: saved.assignee ?? task.assignee,
      evidence: saved.evidence || "",
      note: saved.note || ""
    };
  });
  return tasks;
}

function saveLocalState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function persist(message = "Өөрчлөлт хадгалагдсан") {
  saveLocalState();
  queueSharedStateSave();
  $("#save-state").textContent = message;
  showToast(message);
}

async function hydrateSharedState() {
  const saveState = $("#save-state");
  try {
    const payload = await fetchSharedState();
    if (payload.state && typeof payload.state === "object") {
      const localState = state;
      const serverState = normalizeProjectState(payload.state);
      const mergedState = mergeProjectStates(serverState, localState);
      state = mergedState;
      saveLocalState();
      if (stateActivityScore(localState) > stateActivityScore(serverState) || stateActivityScore(mergedState) !== stateActivityScore(serverState)) {
        await saveSharedStateNow();
        if (saveState) saveState.textContent = "Энэ browser-ийн өмнөх датаг сервер рүү шилжүүллээ";
        return;
      }
      if (saveState) saveState.textContent = "Серверийн хадгалсан дата ачааллаа";
      return;
    }
    await saveSharedStateNow();
    if (saveState) saveState.textContent = "Анхны датаг серверт хадгаллаа";
  } catch (error) {
    if (saveState) saveState.textContent = "Сервертэй холбогдсонгүй · түр local хадгалалт ашиглаж байна";
    console.warn("Shared state load failed:", error);
  }
}

async function fetchSharedState() {
  const response = await fetch(sharedStateApiPath, {
    method: "GET",
    headers: { "Accept": "application/json" },
    cache: "no-store"
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return await response.json();
}

async function refreshSharedStateForLogin() {
  try {
    const payload = await fetchSharedState();
    if (payload.state && typeof payload.state === "object") {
      state = mergeProjectStates(normalizeProjectState(payload.state), state);
      saveLocalState();
    }
  } catch (error) {
    console.warn("Shared state refresh before login failed:", error);
  }
}

function mergeProjectStates(primaryState, secondaryState) {
  const primary = normalizeProjectState(primaryState);
  const secondary = normalizeProjectState(secondaryState);
  return {
    tasks: mergeTaskMap(primary.tasks, secondary.tasks),
    programTasks: mergeProgramTasks(primary.programTasks, secondary.programTasks),
    documents: mergeById(primary.documents, secondary.documents),
    focusGroups: mergeById(primary.focusGroups, secondary.focusGroups),
    comparisons: mergeById(primary.comparisons, secondary.comparisons),
    localPrograms: mergeById(primary.localPrograms, secondary.localPrograms),
    learningOutcomeCoverage: newerTimestamp(primary.learningOutcomeCoverage?.updatedAt, secondary.learningOutcomeCoverage?.updatedAt)
      ? primary.learningOutcomeCoverage
      : secondary.learningOutcomeCoverage,
    surveys: mergeById(primary.surveys, secondary.surveys),
    access: mergeAccess(primary.access, secondary.access),
    serverMeta: primary.serverMeta || secondary.serverMeta || {}
  };
}

function mergeTaskMap(primaryTasks = {}, secondaryTasks = {}) {
  const merged = createTaskMap(primaryTasks);
  taskDefinitions.forEach((task) => {
    const localTask = secondaryTasks?.[task.code];
    if (isMeaningfulTask(localTask)) merged[task.code] = { ...merged[task.code], ...localTask };
  });
  return merged;
}

function mergeProgramTasks(primaryProgramTasks = {}, secondaryProgramTasks = {}) {
  return Object.fromEntries(programDefinitions.map((program) => [
    program.id,
    mergeTaskMap(primaryProgramTasks?.[program.id], secondaryProgramTasks?.[program.id])
  ]));
}

function isMeaningfulTask(task) {
  return Boolean(task && (task.status && task.status !== "not-started" || task.evidence || task.note));
}

function mergeById(primaryItems = [], secondaryItems = []) {
  const map = new Map();
  [...primaryItems, ...secondaryItems].forEach((item) => {
    if (!item || typeof item !== "object") return;
    const key = item.id || `${item.createdAt || item.submittedAt || ""}:${item.title || item.agency || item.country || ""}`;
    if (!key) return;
    map.set(key, { ...(map.get(key) || {}), ...item });
  });
  return [...map.values()];
}

function newerTimestamp(primaryValue, secondaryValue) {
  const primaryTime = Date.parse(primaryValue || "");
  const secondaryTime = Date.parse(secondaryValue || "");
  if (Number.isFinite(primaryTime) && !Number.isFinite(secondaryTime)) return true;
  if (!Number.isFinite(primaryTime)) return false;
  return primaryTime >= secondaryTime;
}

function mergeAccess(primaryAccess = {}, secondaryAccess = {}) {
  const primary = normalizeAccess(primaryAccess);
  const secondary = normalizeAccess(secondaryAccess);
  const users = mergeByEmail(primary.users, secondary.users);
  return normalizeAccess({
    ...primary,
    adminEmail: primary.adminEmail || secondary.adminEmail,
    roleViews: {
      ...primary.roleViews,
      ...secondary.roleViews
    },
    passwords: {
      ...(primary.passwords || {}),
      ...(secondary.passwords || {})
    },
    users
  });
}

function mergeByEmail(primaryUsers = [], secondaryUsers = []) {
  const map = new Map();
  [...primaryUsers, ...secondaryUsers].forEach((user) => {
    const email = normalizeEmail(user?.email);
    if (!email) return;
    map.set(email, { ...(map.get(email) || {}), ...user, email });
  });
  return [...map.values()];
}

function stateActivityScore(projectState) {
  const project = normalizeProjectState(projectState);
  const taskScore = Object.values(project.programTasks || {}).reduce((total, taskMap) => {
    return total + Object.values(taskMap || {}).filter((task) => {
      return task?.status && task.status !== "not-started" || task?.evidence || task?.note;
    }).length;
  }, 0);
  const accessScore = Math.max(0, (project.access?.users || []).length - 2);
  const passwordScore = Object.keys(project.access?.passwords || {}).length;
  return taskScore
    + project.documents.length * 10
    + project.focusGroups.length * 6
    + project.comparisons.length * 6
    + project.localPrograms.length * 6
    + (project.learningOutcomeCoverage?.text ? 4 : 0)
    + (project.learningOutcomeCoverage?.results?.length || 0)
    + project.surveys.length * 4
    + accessScore * 2
    + passwordScore;
}

function queueSharedStateSave() {
  clearTimeout(sharedStateSaveTimer);
  sharedStateSaveTimer = setTimeout(() => {
    sharedStateSaveInFlight = sharedStateSaveInFlight
      .catch(() => {})
      .then(() => saveSharedStateNow())
      .catch((error) => {
        const saveState = $("#save-state");
        const friendlyMessage = storageErrorMessage(error);
        if (saveState) {
          saveState.textContent = `Хадгалалтын алдаа: ${friendlyMessage}`;
          saveState.title = String(error?.message || error || "");
        }
        console.warn("Shared state save failed:", error);
      });
  }, 350);
}

async function saveSharedStateNow() {
  let response;
  try {
    response = await fetch(sharedStateApiPath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ state })
    });
  } catch (error) {
    throw new Error("Сервертэй холбогдож чадсангүй. Та GitHub Pages/static линкээр биш Render/Node server линкээр орсон эсэхээ шалгана уу.");
  }
  const responseText = await response.text();
  let payload = {};
  try {
    payload = responseText ? JSON.parse(responseText) : {};
  } catch {
    throw new Error(`API JSON биш хариу буцаалаа. Энэ линк static hosting байж магадгүй. HTTP ${response.status}`);
  }
  if (!response.ok) {
    throw new Error(readableStoragePayloadMessage(payload, response.status));
  }
  const saveState = $("#save-state");
  if (saveState && payload.savedAt) saveState.textContent = "Серверт хадгалагдсан";
  return payload;
}

function storageErrorMessage(error) {
  const message = stringifyErrorMessage(error);
  if (/HTTP 404|not found/i.test(message)) return "API олдсонгүй. GitHub Pages биш Render/Node server линкээр орно уу.";
  if (/HTTP 401|HTTP 403|JWT|apikey|permission|permission denied|unauthorized/i.test(message)) return "Supabase key/эрхийн тохиргоо буруу байна.";
  if (/relation .* does not exist|app_state|table/i.test(message)) return "Supabase дээр app_state table үүсээгүй байна.";
  if (/SUPABASE|Supabase/i.test(message) && /write failed|read failed/i.test(message)) return `Supabase хадгалалтын алдаа: ${message}`;
  if (/Failed to fetch|холбогдож чадсангүй|NetworkError/i.test(message)) return "Сервертэй холбогдож чадсангүй. Public server/API ажиллаж байгаа эсэхийг шалгана уу.";
  return message || "Хадгалалтын тодорхойгүй алдаа.";
}

function readableStoragePayloadMessage(payload, status) {
  if (!payload || typeof payload !== "object") return `HTTP ${status}`;
  const detail = stringifyErrorMessage(payload.detail);
  const error = stringifyErrorMessage(payload.error);
  const message = stringifyErrorMessage(payload.message);
  const hint = stringifyErrorMessage(payload.hint);
  const code = stringifyErrorMessage(payload.code);
  const storage = stringifyErrorMessage(payload.storage);
  const parts = [
    error,
    detail && detail !== error ? detail : "",
    message,
    hint ? `Hint: ${hint}` : "",
    code ? `Code: ${code}` : "",
    storage ? `Storage: ${storage}` : ""
  ].filter(Boolean);
  return parts.length ? parts.join(" · ") : `HTTP ${status}`;
}

function stringifyErrorMessage(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (value instanceof Error) return value.message || value.name || "Error";
  if (typeof value === "object") {
    const preferred = value.message || value.error || value.detail || value.hint || value.code;
    if (preferred && preferred !== value) return stringifyErrorMessage(preferred);
    try {
      return JSON.stringify(value);
    } catch {
      return Object.prototype.toString.call(value);
    }
  }
  return String(value);
}

async function manualSaveData() {
  const button = $("#manual-save-data");
  const previousText = button?.textContent || "";
  try {
    if (button) {
      button.disabled = true;
      button.textContent = "Хадгалж байна...";
    }
    saveLocalState();
    await saveSharedStateNow();
    showToast("Өгөгдөл сервер/Supabase рүү хадгалагдлаа");
    const saveState = $("#save-state");
    if (saveState) saveState.textContent = "Өгөгдөл хадгалагдсан";
  } catch (error) {
    console.warn("Manual save failed:", error);
    const friendlyMessage = storageErrorMessage(error);
    showToast(friendlyMessage);
    const saveState = $("#save-state");
    if (saveState) {
      saveState.textContent = `Хадгалалтын алдаа: ${friendlyMessage}`;
      saveState.title = String(error?.message || error || "");
    }
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = previousText || "Өгөгдөл хадгалах";
    }
  }
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function adminEmailList(configuredAdminEmail = "") {
  return [...new Set([defaultAdminEmail, normalizeEmail(configuredAdminEmail)].filter(Boolean))];
}

function isAdminEmail(email, access = {}) {
  const normalized = normalizeEmail(email);
  if (!normalized) return false;
  const configuredAdminEmail = typeof access === "string" ? access : access?.adminEmail;
  return adminEmailList(configuredAdminEmail).includes(normalized);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(value));
}

function currentUser() {
  state.access = normalizeAccess(state.access);
  const email = state.access.currentEmail;
  if (!email) return { email: "", role: "guest", views: [], programs: [], label: "Нэвтрээгүй" };
  if (isAdminEmail(email, state.access)) {
    return { email, role: "admin", views: managedViewDefinitions.map((view) => view.id), programs: programDefinitions.map((program) => program.id), label: "Admin" };
  }
  const savedUser = state.access.users.find((user) => user.email === email);
  if (savedUser) return { ...savedUser, label: roleDefinitions.find((role) => role.id === savedUser.role)?.name || savedUser.role };
  return { email, role: "viewer", views: [...defaultRoleAccess.viewer], programs: [], label: "Бүртгэлгүй viewer" };
}

function currentRole() {
  return currentUser().role;
}

function isAdminRole() {
  return currentRole() === "admin";
}

function allowedManagedViews(roleId = currentRole()) {
  if (roleId === "admin") return managedViewDefinitions.map((view) => view.id);
  const user = currentUser();
  if (roleId === user.role) return user.views || [];
  return state.access?.roleViews?.[roleId] || [];
}

function allowedProgramIds() {
  const user = currentUser();
  if (user.role === "admin") return programDefinitions.map((program) => program.id);
  return (user.programs || []).filter((programId) => programDefinitions.some((program) => program.id === programId));
}

function accessibleProgramDefinitions() {
  const allowed = new Set(allowedProgramIds());
  return programDefinitions.filter((program) => allowed.has(program.id));
}

function isProgramAllowed(programId) {
  if (currentRole() === "admin") return true;
  return allowedProgramIds().includes(programId);
}

function programByAgency(agency) {
  return programDefinitions.find((program) => program.agency === agency || agency?.includes(program.agency) || program.agency.includes(agency));
}

function isAgencyAllowed(agency) {
  if (currentRole() === "admin") return true;
  const program = programByAgency(agency);
  return Boolean(program && isProgramAllowed(program.id));
}

function visibleDocuments() {
  return state.documents.filter((item) => isAgencyAllowed(item.agency));
}

function isViewAllowed(viewId, roleId = currentRole()) {
  if (roleId === "guest") return false;
  if (!viewId || viewId === "dashboard") return true;
  if (viewId === "settings") return roleId === "admin";
  if (roleId === "admin") return true;
  return allowedManagedViews(roleId).includes(viewId);
}

function firstAllowedView(roleId = currentRole()) {
  if (roleId === "admin") return "dashboard";
  return "dashboard";
}

function applyAccessControl() {
  state.access = normalizeAccess(state.access);
  const roleId = currentRole();
  document.body.dataset.role = roleId;
  $$("[data-view-target]").forEach((button) => {
    const target = button.dataset.viewTarget;
    const allowed = isViewAllowed(target, roleId);
    button.hidden = !allowed;
    button.disabled = !allowed;
    button.setAttribute("aria-hidden", String(!allowed));
  });
  $$(".view").forEach((view) => {
    const allowed = isViewAllowed(view.id, roleId);
    view.hidden = !allowed;
    view.setAttribute("aria-hidden", String(!allowed));
  });
  const roleSelect = $("#current-role-select");
  if (roleSelect) roleSelect.value = roleId;
  renderAccessSettings();
  const activeView = $(".view.active")?.id || "dashboard";
  if (!isViewAllowed(activeView, roleId)) setView(firstAllowedView(roleId));
}

function renderRoleSwitcher() {
  const select = $("#current-role-select");
  if (!select) return;
  select.innerHTML = roleDefinitions.map((role) => `<option value="${role.id}">${escapeHtml(role.name)}</option>`).join("");
  select.value = currentRole();
}

function renderAccessSettings() {
  const container = $("#access-role-panels");
  const summary = $("#access-summary");
  if (!container || !summary) return;
  if (!isAdminRole()) {
    container.innerHTML = "";
    summary.textContent = "Энэ тохиргоо зөвхөн admin хэрэглэгчид харагдана.";
    return;
  }
  const managedRoles = roleDefinitions.filter((role) => role.id !== "admin");
  container.innerHTML = managedRoles.map((role) => {
    const allowed = new Set(state.access.roleViews[role.id] || []);
    const rows = managedViewDefinitions.map((view) => `
      <label class="access-check">
        <input type="checkbox" name="${role.id}" value="${view.id}" ${allowed.has(view.id) ? "checked" : ""}>
        <span>
          <strong>${escapeHtml(view.name)}</strong>
          <small>${escapeHtml(view.group)}</small>
        </span>
      </label>
    `).join("");
    return `
      <article class="access-role-card">
        <div class="access-role-head">
          <div>
            <p class="eyebrow">${escapeHtml(role.name)}</p>
            <h2>${escapeHtml(role.description)}</h2>
          </div>
          <span>${allowed.size}/${managedViewDefinitions.length}</span>
        </div>
        <div class="access-check-grid">${rows}</div>
      </article>
    `;
  }).join("");
  const counts = managedRoles.map((role) => `${role.name}: ${(state.access.roleViews[role.id] || []).length}/${managedViewDefinitions.length}`).join(" · ");
  summary.textContent = `Dashboard бүх хэрэглэгчид нээлттэй. Admin бүх хэсгийг харна. ${counts}`;
}

function saveAccessSettings(event) {
  event.preventDefault();
  const form = event.currentTarget;
  state.access = normalizeAccess(state.access);
  roleDefinitions.filter((role) => role.id !== "admin").forEach((role) => {
    state.access.roleViews[role.id] = $$(`input[name="${role.id}"]:checked`, form).map((input) => input.value);
  });
  persist("Эрхийн тохиргоо хадгалагдлаа");
  applyAccessControl();
}

function setRole(roleId) {
  if (!roleDefinitions.some((role) => role.id === roleId)) return;
  state.access = normalizeAccess(state.access);
  state.access.currentRole = roleId;
  persist(`Хэрэглэгчийн горим: ${roleDefinitions.find((role) => role.id === roleId).name}`);
  applyAccessControl();
}

function setAccessPreset(preset) {
  state.access = normalizeAccess(state.access);
  if (preset === "all") {
    roleDefinitions.filter((role) => role.id !== "admin").forEach((role) => {
      state.access.roleViews[role.id] = managedViewDefinitions.map((view) => view.id);
    });
  }
  if (preset === "default") {
    state.access.roleViews = typeof structuredClone === "function" ? structuredClone(defaultRoleAccess) : JSON.parse(JSON.stringify(defaultRoleAccess));
  }
  persist(preset === "all" ? "Бүх хэрэглэгчид бүх хэсгийг харахаар тохирууллаа" : "Эрхийн тохиргоог үндсэн төлөвт орууллаа");
  applyAccessControl();
}

function applyAccessControl() {
  state.access = normalizeAccess(state.access);
  const user = currentUser();
  const roleId = user.role;
  document.body.dataset.role = roleId;
  document.body.dataset.email = user.email;
  $$("[data-view-target]").forEach((button) => {
    const target = button.dataset.viewTarget;
    const allowed = isViewAllowed(target, roleId);
    button.hidden = !allowed;
    button.disabled = !allowed;
    button.setAttribute("aria-hidden", String(!allowed));
  });
  $$(".view").forEach((view) => {
    const allowed = isViewAllowed(view.id, roleId);
    view.hidden = !allowed;
    view.setAttribute("aria-hidden", String(!allowed));
  });
  const emailInput = $("#current-email-input");
  if (emailInput) emailInput.value = user.email;
  const roleBadge = $("#current-role-badge");
  if (roleBadge) roleBadge.textContent = user.label;
  renderAccessSettings();
  const activeView = $(".view.active")?.id || "dashboard";
  if (!isViewAllowed(activeView, roleId)) setView(firstAllowedView(roleId));
}

function renderCurrentUserBar() {
  const user = currentUser();
  const emailInput = $("#current-email-input");
  if (emailInput) emailInput.value = user.email;
  const roleBadge = $("#current-role-badge");
  if (roleBadge) roleBadge.textContent = user.label;
}

function renderRoleSwitcher() {
  renderCurrentUserBar();
}

function renderUserAccessEditor(seed = {}) {
  const emailField = $("#access-user-email");
  const roleField = $("#access-user-role");
  const viewBox = $("#access-user-view-grid");
  const programBox = $("#access-user-program-grid");
  if (!emailField || !roleField || !viewBox || !programBox) return;
  const role = seed.role || "viewer";
  const selectedViews = new Set(seed.views || defaultRoleAccess[role] || []);
  const selectedPrograms = new Set(seed.programs || programDefinitions.map((program) => program.id));
  emailField.value = seed.email || "";
  roleField.innerHTML = roleDefinitions
    .filter((item) => item.id !== "admin")
    .map((item) => `<option value="${item.id}" ${item.id === role ? "selected" : ""}>${escapeHtml(item.name)}</option>`)
    .join("");
  viewBox.innerHTML = managedViewDefinitions.map((view) => `
    <label class="access-check compact">
      <input type="checkbox" name="newUserViews" value="${view.id}" ${selectedViews.has(view.id) ? "checked" : ""}>
      <span><strong>${escapeHtml(view.name)}</strong><small>${escapeHtml(view.group)}</small></span>
    </label>
  `).join("");
  programBox.innerHTML = programDefinitions.map((program) => `
    <label class="access-check compact">
      <input type="checkbox" name="newUserPrograms" value="${program.id}" ${selectedPrograms.has(program.id) ? "checked" : ""}>
      <span><strong>${escapeHtml(program.name)}</strong><small>${escapeHtml(program.agency)} · ${escapeHtml(program.code)}</small></span>
    </label>
  `).join("");
}

function renderAccessSettings() {
  const container = $("#access-user-panels");
  const summary = $("#access-summary");
  if (!container || !summary) return;
  if (!isAdminRole()) {
    container.innerHTML = "";
    summary.textContent = "Энэ тохиргоо зөвхөн admin мэйлээр нэвтэрсэн үед харагдана.";
    return;
  }
  const adminEmailField = $("#admin-email-input");
  if (adminEmailField) adminEmailField.value = state.access.adminEmail;
  renderUserAccessEditor({
    email: $("#access-user-email")?.value || "",
    role: $("#access-user-role")?.value || "viewer",
    views: $$('input[name="newUserViews"]:checked').map((input) => input.value),
    programs: $$('input[name="newUserPrograms"]:checked').map((input) => input.value)
  });
  const users = state.access.users || [];
  container.innerHTML = users.length ? users.map((user) => {
    const allowed = new Set(user.views || []);
    const allowedPrograms = new Set(user.programs || []);
    const rows = managedViewDefinitions.map((view) => `
      <label class="access-check">
        <input type="checkbox" data-user-view="${escapeHtml(user.email)}" value="${view.id}" ${allowed.has(view.id) ? "checked" : ""}>
        <span>
          <strong>${escapeHtml(view.name)}</strong>
          <small>${escapeHtml(view.group)}</small>
        </span>
      </label>
    `).join("");
    const programRows = programDefinitions.map((program) => `
      <label class="access-check">
        <input type="checkbox" data-user-program="${escapeHtml(user.email)}" value="${program.id}" ${allowedPrograms.has(program.id) ? "checked" : ""}>
        <span>
          <strong>${escapeHtml(program.name)}</strong>
          <small>${escapeHtml(program.agency)} · ${escapeHtml(program.code)}</small>
        </span>
      </label>
    `).join("");
    const roleName = roleDefinitions.find((role) => role.id === user.role)?.name || user.role;
    return `
      <article class="access-role-card">
        <div class="access-role-head">
          <div>
            <p class="eyebrow">${escapeHtml(roleName)}</p>
            <h2>${escapeHtml(user.email)}</h2>
          </div>
          <span>${allowed.size}/${managedViewDefinitions.length} · ${allowedPrograms.size}/${programDefinitions.length}</span>
        </div>
        <div class="access-card-subtitle">Харах хэсэг</div>
        <div class="access-check-grid">${rows}</div>
        <div class="access-card-subtitle">Харах хөтөлбөр</div>
        <div class="access-check-grid">${programRows}</div>
        <div class="access-user-actions">
          <button class="button secondary" type="button" data-load-user="${escapeHtml(user.email)}">Засах</button>
          <button class="button secondary" type="button" data-delete-user="${escapeHtml(user.email)}">Устгах</button>
        </div>
      </article>
    `;
  }).join("") : `<div class="empty-state">Одоогоор бүртгэсэн хэрэглэгч алга. Доорх формоор мэйл хаяг нэмнэ үү.</div>`;
  summary.textContent = `Admin мэйл: ${state.access.adminEmail}. Нөөц admin: ${defaultAdminEmail}. Бүртгэлтэй хэрэглэгч: ${users.length}. Бүртгэлгүй мэйлээр орсон хэрэглэгч зөвхөн viewer default эрхтэй байна.`;
}

function saveAccessSettings(event) {
  event.preventDefault();
  state.access = normalizeAccess(state.access);
  const wasAdmin = isAdminRole();
  const adminEmail = normalizeEmail($("#admin-email-input").value);
  if (!isValidEmail(adminEmail)) {
    showToast("Admin мэйл хаяг буруу байна");
    return;
  }
  state.access.adminEmail = adminEmail;
  state.access.users = state.access.users
    .filter((user) => !isAdminEmail(user.email, { adminEmail }))
    .map((user) => ({
      ...user,
      views: $$(`input[data-user-view="${user.email}"]:checked`).map((input) => input.value),
      programs: $$(`input[data-user-program="${user.email}"]:checked`).map((input) => input.value)
    }));
  if (wasAdmin && !isAdminEmail(state.access.currentEmail, { adminEmail })) state.access.currentEmail = adminEmail;
  persist("Мэйл хаягийн эрхийн тохиргоо хадгалагдлаа");
  applyAccessControl();
}

function saveUserAccess(event) {
  event.preventDefault();
  if (!isAdminRole()) return;
  state.access = normalizeAccess(state.access);
  const email = normalizeEmail($("#access-user-email").value);
  const role = $("#access-user-role").value;
  const views = $$('input[name="newUserViews"]:checked').map((input) => input.value);
  const programs = $$('input[name="newUserPrograms"]:checked').map((input) => input.value);
  if (!isValidEmail(email)) {
    showToast("Хэрэглэгчийн мэйл хаяг буруу байна");
    return;
  }
  if (isAdminEmail(email, state.access)) {
    showToast("Admin мэйлд тусдаа хэрэглэгчийн эрх оноох шаардлагагүй");
    return;
  }
  const existingIndex = state.access.users.findIndex((user) => user.email === email);
  const nextUser = { email, role, views, programs };
  if (existingIndex >= 0) state.access.users[existingIndex] = nextUser;
  else state.access.users.push(nextUser);
  persist("Хэрэглэгчийн эрх хадгалагдлаа");
  $("#access-user-form").reset();
  renderUserAccessEditor();
  renderAccessSettings();
}

function handleAccessUserAction(event) {
  const loadButton = event.target.closest("[data-load-user]");
  const deleteButton = event.target.closest("[data-delete-user]");
  if (loadButton) {
    const user = state.access.users.find((item) => item.email === loadButton.dataset.loadUser);
    if (user) renderUserAccessEditor(user);
  }
  if (deleteButton) {
    const email = deleteButton.dataset.deleteUser;
    if (!confirm(`${email} хэрэглэгчийн эрхийг устгах уу?`)) return;
    state.access.users = state.access.users.filter((user) => user.email !== email);
    persist("Хэрэглэгчийн эрх устгагдлаа");
    applyAccessControl();
  }
}

function loginWithEmail(event) {
  event.preventDefault();
  const email = normalizeEmail($("#current-email-input").value);
  if (!isValidEmail(email)) {
    showToast("Мэйл хаяг буруу байна");
    return;
  }
  state.access = normalizeAccess(state.access);
  state.access.currentEmail = email;
  persist(`Нэвтэрсэн мэйл: ${email}`);
  applyAccessControl();
}

function applyRoleDefaultToUserEditor() {
  const role = $("#access-user-role")?.value || "viewer";
  const email = $("#access-user-email")?.value || "";
  const selectedPrograms = $$('input[name="newUserPrograms"]:checked').map((input) => input.value);
  renderUserAccessEditor({ email, role, views: defaultRoleAccess[role] || [], programs: selectedPrograms.length ? selectedPrograms : programDefinitions.map((program) => program.id) });
}

function setUserAccessPreset(preset) {
  if (preset === "all") {
    renderUserAccessEditor({
      email: $("#access-user-email")?.value || "",
      role: $("#access-user-role")?.value || "researcher",
      views: managedViewDefinitions.map((view) => view.id),
      programs: programDefinitions.map((program) => program.id)
    });
  }
  if (preset === "default") applyRoleDefaultToUserEditor();
}

function setAccessPreset(preset) {
  state.access = normalizeAccess(state.access);
  if (preset === "all") {
    state.access.users = state.access.users.map((user) => ({ ...user, views: managedViewDefinitions.map((view) => view.id), programs: programDefinitions.map((program) => program.id) }));
  }
  if (preset === "default") {
    state.access.users = state.access.users.map((user) => ({ ...user, views: [...(defaultRoleAccess[user.role] || defaultRoleAccess.viewer)], programs: programDefinitions.map((program) => program.id) }));
  }
  persist(preset === "all" ? "Бүртгэлтэй бүх хэрэглэгчид бүх хэсгийг харахаар тохирууллаа" : "Хэрэглэгчдийн эрхийг role-ийн үндсэн төлөвт орууллаа");
  applyAccessControl();
}

function setRole(roleId) {
  const email = state.access.currentEmail || state.access.adminEmail;
  const existing = state.access.users.find((user) => user.email === email);
  if (!existing || !roleDefinitions.some((role) => role.id === roleId && role.id !== "admin")) return;
  existing.role = roleId;
  existing.views = defaultRoleAccess[roleId] || existing.views;
  persist("Хэрэглэгчийн role шинэчлэгдлээ");
  applyAccessControl();
}

function setView(viewId) {
  if (!isViewAllowed(viewId)) {
    showToast("Тухайн хэсэгт хандах эрхгүй байна");
    viewId = firstAllowedView();
  }
  $$(".view").forEach((view) => view.classList.toggle("active", view.id === viewId));
  $$(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.viewTarget === viewId));
  $("#sidebar").classList.remove("open");
  $("#menu-button").setAttribute("aria-expanded", "false");
  if (viewId === "dashboard") renderDashboard();
  if (viewId === "plan") renderPlan();
  if (viewId === "tools") renderEvidence();
  if (viewId === "survey") buildCompetencyTable();
  if (viewId === "analysis") renderAnalysis();
  if (viewId === "program-comparison") renderProgramComparisonDetail();
  if (viewId === "reports") renderReports();
  if (viewId === "settings") renderAccessSettings();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function selectedPlanProgram() {
  const filter = $("#program-filter");
  const value = filter?.value || "all";
  if (value === "all") return "all";
  return isProgramAllowed(value) ? value : "all";
}

function programLabel(programId) {
  if (programId === "all") return currentRole() === "admin" ? "Бүх хөтөлбөр" : "Зөвшөөрсөн хөтөлбөрүүд";
  return programDefinitions.find((program) => program.id === programId)?.name || "Хөтөлбөр";
}

function getProgramTaskMap(programId) {
  if (!state.programTasks) state.programTasks = {};
  if (!state.programTasks[programId]) state.programTasks[programId] = createTaskMap(state.tasks);
  return state.programTasks[programId];
}

function aggregateTaskState(code) {
  const programs = accessibleProgramDefinitions();
  const states = programs.map((program) => getProgramTaskMap(program.id)[code]).filter(Boolean);
  const statusValues = states.map((item) => item.status);
  const evidenceCount = states.filter((item) => item.evidence).length;
  const assignees = [...new Set(states.map((item) => item.assignee).filter(Boolean))];
  const notes = states.filter((item) => item.note).length;
  let status = "not-started";
  if (statusValues.length && statusValues.every((value) => value === "done")) status = "done";
  else if (statusValues.includes("review")) status = "review";
  else if (statusValues.includes("in-progress")) status = "in-progress";
  return {
    status,
    assignee: assignees.length === 1 ? assignees[0] : "Хөтөлбөр тус бүрээр",
    evidence: evidenceCount ? `${evidenceCount}/${programs.length} хөтөлбөрт нотолгоо` : "",
    note: notes ? `${notes} хөтөлбөрт тайлбар оруулсан` : ""
  };
}

function getTaskState(code, programId = selectedPlanProgram()) {
  if (programId === "all") return aggregateTaskState(code);
  return getProgramTaskMap(programId)[code];
}

function taskProgress(taskCodes = taskDefinitions.map((task) => task.code), programId = selectedPlanProgram()) {
  if (!taskCodes.length) return 0;
  const weights = { "not-started": 0, "in-progress": .5, "review": .8, "done": 1 };
  const states = programId === "all"
    ? accessibleProgramDefinitions().flatMap((program) => taskCodes.map((code) => getProgramTaskMap(program.id)[code]))
    : taskCodes.map((code) => getProgramTaskMap(programId)[code]);
  if (!states.length) return 0;
  const sum = states.reduce((total, taskState) => total + (weights[taskState?.status] || 0), 0);
  return Math.round(sum / states.length * 100);
}

function taskCountByStatus(status, programId = selectedPlanProgram()) {
  const states = programId === "all"
    ? accessibleProgramDefinitions().flatMap((program) => taskDefinitions.map((task) => getProgramTaskMap(program.id)[task.code]))
    : taskDefinitions.map((task) => getProgramTaskMap(programId)[task.code]);
  return states.filter((taskState) => taskState?.status === status).length;
}

function totalPlanTaskCount(programId = selectedPlanProgram()) {
  return taskDefinitions.length * (programId === "all" ? accessibleProgramDefinitions().length : 1);
}

function renderDashboard() {
  const progress = taskProgress(taskDefinitions.map((task) => task.code), "all");
  const evidenceCount = visibleDocuments().length + state.focusGroups.filter((item) => isAgencyAllowed(item.agency)).length + state.comparisons.length;
  $("#metric-progress").textContent = `${progress}%`;
  $("#metric-progress-bar").style.width = `${progress}%`;
  $("#metric-evidence").textContent = evidenceCount;
  $("#metric-responses").textContent = state.surveys.length;

  $("#phase-grid").innerHTML = phases.map((phase) => {
    const codes = taskDefinitions.filter((task) => task.phase === phase.id).map((task) => task.code);
    const phaseProgress = taskProgress(codes, "all");
    return `
      <article class="phase-card" data-open-phase="${phase.id}" tabindex="0">
        <span>0${phase.id} · ${phase.level}</span>
        <h3>${phase.name}</h3>
        <p>${phase.description}</p>
        <footer><small>${phase.period}</small><strong>${phaseProgress}%</strong></footer>
      </article>`;
  }).join("");

  const next = taskDefinitions.filter((task) => getTaskState(task.code, "all").status !== "done").slice(0, 4);
  $("#next-tasks").innerHTML = next.length ? next.map((task) => `
    <div class="next-task"><span>${task.code}</span><div><strong>${task.title}</strong><small>${task.output}</small></div></div>
  `).join("") : `<div class="empty-state">Бүх ажил дууссан байна.</div>`;
}

function renderPlan() {
  renderProgramFilterOptions();
  const programFilter = selectedPlanProgram();
  const phaseFilter = $("#phase-filter").value;
  const statusFilter = $("#status-filter").value;
  const programs = accessibleProgramDefinitions();
  if (!programs.length) {
    $("#done-count").textContent = 0;
    $("#active-count").textContent = 0;
    $(".plan-summary > div:first-child strong").textContent = 0;
    $("#plan-progress").textContent = "0%";
    $("#plan-progress-bar").style.width = "0%";
    $("#program-progress-grid").innerHTML = `<div class="empty-state">Танд харах хөтөлбөрийн эрх оноогоогүй байна.</div>`;
    $("#task-list").innerHTML = `<div class="empty-filter">Admin хэрэглэгчээс хөтөлбөрийн эрх авсны дараа төлөвлөгөө харагдана.</div>`;
    return;
  }
  const done = taskCountByStatus("done", programFilter);
  const active = taskCountByStatus("in-progress", programFilter);
  const progress = taskProgress(taskDefinitions.map((task) => task.code), programFilter);
  $("#done-count").textContent = done;
  $("#active-count").textContent = active;
  $(".plan-summary > div:first-child strong").textContent = totalPlanTaskCount(programFilter);
  $("#plan-progress").textContent = `${progress}%`;
  $("#plan-progress-bar").style.width = `${progress}%`;
  $("#program-progress-grid").innerHTML = programs.map((program) => {
    const programProgress = taskProgress(taskDefinitions.map((task) => task.code), program.id);
    const programDone = taskCountByStatus("done", program.id);
    const programActive = taskCountByStatus("in-progress", program.id);
    return `<button class="program-progress-card ${programFilter === program.id ? "active" : ""}" type="button" data-select-program="${program.id}">
      <strong>${escapeHtml(program.name)}</strong>
      <small>${escapeHtml(program.agency)} · ${programDone}/${taskDefinitions.length} дууссан · ${programActive} хийгдэж буй</small>
      <div class="mini-progress"><i style="width:${programProgress}%"></i></div>
      <span>${programProgress}%</span>
    </button>`;
  }).join("");

  const sections = phases.map((phase) => {
    if (phaseFilter !== "all" && Number(phaseFilter) !== phase.id) return "";
    const tasks = taskDefinitions.filter((task) => task.phase === phase.id && (statusFilter === "all" || getTaskState(task.code, programFilter).status === statusFilter));
    if (!tasks.length) return "";
    return `
      <section class="phase-section">
        <header class="phase-section-head">
          <div><span>0${phase.id}</span><h2>${phase.name}</h2></div>
          <small>${programLabel(programFilter)} · ${phase.period} · ${taskProgress(tasks.map((task) => task.code), programFilter)}%</small>
        </header>
        <div class="task-table-head"><span>№</span><span>Хугацаа</span><span>Гүйцэтгэх ажил</span><span>Үр дүн</span><span>Төлөв</span><span></span></div>
        ${tasks.map((task) => taskRow(task, programFilter)).join("")}
      </section>`;
  }).filter(Boolean);
  $("#task-list").innerHTML = sections.length ? sections.join("") : `<div class="empty-filter">Сонгосон шүүлтүүрт тохирох ажил алга.</div>`;
}

function renderProgramFilterOptions() {
  const filter = $("#program-filter");
  if (!filter) return;
  const previousValue = filter.value || "all";
  const programs = accessibleProgramDefinitions();
  filter.innerHTML = [
    `<option value="all">${currentRole() === "admin" ? "Бүх хөтөлбөр" : "Зөвшөөрсөн хөтөлбөрүүд"}</option>`,
    ...programs.map((program) => `<option value="${program.id}">${escapeHtml(program.name)}</option>`)
  ].join("");
  filter.value = previousValue === "all" || programs.some((program) => program.id === previousValue) ? previousValue : "all";
}

function taskRow(task, programId = selectedPlanProgram()) {
  const taskState = getTaskState(task.code, programId);
  const canEdit = programId !== "all";
  return `
    <article class="task-row">
      <strong class="task-code">${task.code}</strong>
      <span class="task-period">${task.period}<br><small>${escapeHtml(programLabel(programId))}</small></span>
      <div class="task-main"><strong>${task.title}</strong><small>Хариуцагч: ${escapeHtml(taskState.assignee || "Томилоогүй")}${taskState.evidence ? ` · Нотолгоо: ${escapeHtml(taskState.evidence)}` : ""}</small></div>
      <span class="task-output">${task.output}</span>
      <div class="task-status"><span class="status-pill status-${taskState.status}">${statusLabels[taskState.status]}</span></div>
      <button class="task-edit" type="button" data-edit-task="${task.code}" ${canEdit ? "" : "disabled"} aria-label="${task.code} ажлыг засах">${canEdit ? "•••" : "↗"}</button>
    </article>`;
}

function openTaskDialog(code) {
  const programId = selectedPlanProgram();
  if (programId === "all") {
    showToast("Гүйцэтгэл оруулахын тулд эхлээд нэг хөтөлбөр сонгоно уу");
    $("#program-filter").focus();
    return;
  }
  const definition = taskDefinitions.find((task) => task.code === code);
  const taskState = getTaskState(code, programId);
  if (!definition || !taskState) return;
  $("#dialog-task-code").textContent = `${programLabel(programId)} · АЖИЛ ${code} · 2026 ${definition.period}`;
  $("#dialog-task-title").textContent = definition.title;
  $("#dialog-output").textContent = definition.output;
  const form = $("#task-form");
  form.elements.taskCode.value = code;
  form.elements.programId.value = programId;
  form.elements.status.value = taskState.status;
  form.elements.assignee.value = taskState.assignee;
  form.elements.evidence.value = taskState.evidence;
  form.elements.note.value = taskState.note;
  $("#task-dialog").showModal();
}

function handleTaskDialog(event) {
  const submitter = event.submitter;
  if (!submitter || submitter.value === "cancel") return;
  event.preventDefault();
  const form = event.currentTarget;
  const code = form.elements.taskCode.value;
  const programId = form.elements.programId.value || selectedPlanProgram();
  const taskMap = getProgramTaskMap(programId);
  taskMap[code] = {
    status: form.elements.status.value,
    assignee: form.elements.assignee.value.trim(),
    evidence: form.elements.evidence.value.trim(),
    note: form.elements.note.value.trim()
  };
  state.tasks[code] = aggregateTaskState(code);
  persist(`${programLabel(programId)} · ажил ${code} шинэчлэгдлээ`);
  $("#task-dialog").close();
  renderPlan();
  renderDashboard();
}

function cleanCompetencyName(value) {
  return String(value || "")
    .replace(/^\s*(?:[\d০-৯]+[\).\-\s]*)+/u, "")
    .replace(/^\s*[-–—•*,;:]+/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function surveyCompetencyKey(value) {
  return normalizeKey(cleanCompetencyName(value));
}

function sourceFrequencyLabel(type, count) {
  const labels = {
    document: "Баримт бичиг",
    focus: "Фокус бүлэг",
    comparison: "Олон улсын харьцуулалт"
  };
  return `${labels[type] || type} ${count}×`;
}

function normalizeSurveyProgramIds(value) {
  const ids = Array.isArray(value) ? value : value ? [value] : [];
  return [...new Set(ids.filter((programId) => programDefinitions.some((program) => program.id === programId)))];
}

function mergeSurveyCompetency(merged, candidate) {
  const name = cleanCompetencyName(candidate.name);
  const key = surveyCompetencyKey(name || candidate.id);
  if (!key) return;
  const id = candidate.coreId || candidate.id || key;
  const existing = merged.get(key) || {
    id,
    name,
    detail: "",
    source: candidate.source || "core",
    sourceTypes: [],
    sourceCounts: {},
    sourceDetails: [],
    programIds: [],
    frequency: 0
  };
  existing.id = existing.id || id;
  existing.name = existing.name || name;
  existing.detail = existing.detail || candidate.detail || candidate.description || "";
  const programIds = normalizeSurveyProgramIds(candidate.programIds || candidate.programId);
  programIds.forEach((programId) => {
    if (!existing.programIds.includes(programId)) existing.programIds.push(programId);
  });
  if (candidate.source && candidate.source !== "core" && !existing.sourceTypes.includes(candidate.source)) {
    existing.sourceTypes.push(candidate.source);
  }
  if (candidate.source && candidate.source !== "core") {
    const count = Number(candidate.count ?? candidate.documentCount ?? candidate.recordCount ?? 1) || 1;
    existing.sourceCounts[candidate.source] = (existing.sourceCounts[candidate.source] || 0) + count;
    existing.frequency += count;
    if (candidate.detail) existing.sourceDetails.push(candidate.detail);
  }
  if (existing.sourceTypes.length) {
    existing.source = existing.sourceTypes.includes("document") ? "document" : existing.sourceTypes[0];
    existing.sourceLabel = existing.sourceTypes.map((type) => sourceFrequencyLabel(type, existing.sourceCounts[type] || 1)).join(" · ");
    const sourceNames = existing.sourceTypes.map((type) => sourceFrequencyLabel(type, existing.sourceCounts[type] || 1)).join(" · ");
    const detailParts = [
      `Давтамж: ${existing.frequency}`,
      `Эх үүсвэр: ${sourceNames}`,
      ...existing.sourceDetails
    ].filter(Boolean);
    existing.detail = [...new Set(detailParts)].join(" · ");
  }
  merged.set(key, existing);
}

function aggregateFocusGapCompetencies() {
  const aggregated = new Map();
  state.focusGroups
    .filter((item) => isProgramAllowed(focusProgramId(item)) && isAgencyAllowed(item.agency))
    .forEach((item) => {
      const programId = focusProgramId(item) || "other";
      splitFocusGapItems(item.gaps).forEach((gap) => {
        const name = cleanCompetencyName(gap);
        const key = surveyCompetencyKey(name);
        if (!key) return;
        const id = `focus-${key}`;
        if (!aggregated.has(id)) {
          aggregated.set(id, {
            id,
            name,
            description: "",
            records: new Set(),
            programs: new Set(),
            programIds: new Set(),
            agencies: new Set(),
            count: 0
          });
        }
        const summary = aggregated.get(id);
        summary.count += 1;
        summary.records.add(item.id);
        if (programId) summary.programs.add(programLabel(programId) || programId);
        if (programId && programId !== "other") summary.programIds.add(programId);
        if (item.agency) summary.agencies.add(item.agency);
      });
    });

  return [...aggregated.values()]
    .map((item) => ({
      ...item,
      recordCount: item.records.size,
      programNames: [...item.programs],
      programIds: [...item.programIds],
      agencies: [...item.agencies]
    }))
    .sort((left, right) => right.count - left.count || right.recordCount - left.recordCount || left.name.localeCompare(right.name, "mn"));
}

function aggregateComparisonCompetencies() {
  const aggregated = new Map();
  state.comparisons.forEach((item) => {
    const programId = comparisonProgramId(item);
    if (!programDefinitions.some((program) => program.id === programId)) return;
    splitFocusGapItems(item.competencies).forEach((competency) => {
      const name = cleanCompetencyName(competency);
      const key = surveyCompetencyKey(name);
      if (!key) return;
      const id = `comparison-${key}`;
      if (!aggregated.has(id)) {
        aggregated.set(id, {
          id,
          name,
          count: 0,
          records: new Set(),
          institutions: new Set(),
          countries: new Set(),
          programs: new Set(),
          programIds: new Set()
        });
      }
      const summary = aggregated.get(id);
      summary.count += 1;
      summary.records.add(item.id);
      if (item.institution) summary.institutions.add(item.institution);
      if (item.country) summary.countries.add(item.country);
      summary.programIds.add(programId);
      summary.programs.add(programLabel(programId));
    });
  });
  return [...aggregated.values()]
    .map((item) => ({
      ...item,
      recordCount: item.records.size,
      institutions: [...item.institutions],
      countries: [...item.countries],
      programNames: [...item.programs],
      programIds: [...item.programIds]
    }))
    .sort((left, right) => right.count - left.count || right.recordCount - left.recordCount || left.name.localeCompare(right.name, "mn"));
}

function surveyCompetencies() {
  const merged = new Map();
  competencies.forEach((item) => {
    mergeSurveyCompetency(merged, { ...item, coreId: item.id, source: "core", sourceLabel: "Үндсэн жагсаалт" });
  });

  aggregateDocumentCompetencies().forEach((item) => {
    const detail = item.description || `${item.documentCount} баримт · ${item.agencyCount} байгууллагын нотолгоо`;
    mergeSurveyCompetency(merged, {
      id: item.id || `document-${surveyCompetencyKey(item.name)}`,
      name: item.name,
      detail,
      source: "document",
      count: item.documentCount,
      documentCount: item.documentCount,
      agencyCount: item.agencyCount,
      programIds: item.programIds
    });
  });

  aggregateFocusGapCompetencies().forEach((item) => {
    const programText = item.programNames.join(", ") || "Хөтөлбөр тодорхойгүй";
    const agencyText = item.agencies.join(", ") || "Байгууллага тодорхойгүй";
    const detail = `${item.count} удаа дурдсан · ${item.recordCount} фокус бүлэг · ${programText} · ${agencyText}`;
    mergeSurveyCompetency(merged, {
      id: item.id,
      name: item.name,
      detail,
      source: "focus",
      count: item.count,
      focusCount: item.count,
      focusRecordCount: item.recordCount,
      programIds: item.programIds
    });
  });

  aggregateComparisonCompetencies().forEach((item) => {
    const countryText = item.countries.join(", ") || "Улс тодорхойгүй";
    const institutionText = item.institutions.join(", ") || "Байгууллага тодорхойгүй";
    const programText = item.programNames.join(", ") || "Хөтөлбөр тодорхойгүй";
    const detail = `${item.count} удаа дурдсан · ${item.recordCount} харьцуулсан хөтөлбөр · ${programText} · ${countryText} · ${institutionText}`;
    mergeSurveyCompetency(merged, {
      id: item.id,
      name: item.name,
      detail,
      source: "comparison",
      count: item.count,
      comparisonCount: item.count,
      comparisonRecordCount: item.recordCount,
      programIds: item.programIds
    });
  });

  return [...merged.values()].sort((left, right) => {
    const leftDerived = left.sourceTypes?.length ? 1 : 0;
    const rightDerived = right.sourceTypes?.length ? 1 : 0;
    return rightDerived - leftDerived || (right.frequency || 0) - (left.frequency || 0) || left.name.localeCompare(right.name, "mn");
  });
}

function renderSurveySourceFilters(items) {
  const buttons = $$("[data-survey-source]");
  if (!buttons.length) return;
  const counts = {
    all: items.length,
    document: items.filter((item) => item.sourceTypes?.includes("document")).length,
    focus: items.filter((item) => item.sourceTypes?.includes("focus")).length,
    comparison: items.filter((item) => item.sourceTypes?.includes("comparison")).length
  };
  const labels = {
    all: "Бүгд",
    document: "Баримт бичгийн шинжилгээ",
    focus: "Фокус бүлэг",
    comparison: "Олон улсын харьцуулалт"
  };
  buttons.forEach((button) => {
    const source = button.dataset.surveySource || "all";
    button.classList.toggle("active", source === selectedSurveySourceFilter);
    button.disabled = source !== "all" && !counts[source];
    button.innerHTML = `${labels[source] || source} <span>${counts[source] || 0}</span>`;
  });
}

function itemMatchesSurveySource(item) {
  return selectedSurveySourceFilter === "all" || item.sourceTypes?.includes(selectedSurveySourceFilter);
}

function itemMatchesSurveyProgram(item, programId = selectedSurveyProgramFilter) {
  if (programId === "all") return true;
  if (!isProgramAllowed(programId)) return false;
  const ids = normalizeSurveyProgramIds(item.programIds);
  return ids.length === 0 || ids.includes(programId);
}

function renderSurveyProgramFilters(items) {
  const buttons = $$("[data-survey-program]");
  if (!buttons.length) return;
  const sourceFilteredItems = items.filter(itemMatchesSurveySource);
  const allowedPrograms = new Set(allowedProgramIds());
  buttons.forEach((button) => {
    const programId = button.dataset.surveyProgram || "all";
    const allowed = programId === "all" || allowedPrograms.has(programId);
    const count = programId === "all"
      ? sourceFilteredItems.length
      : sourceFilteredItems.filter((item) => itemMatchesSurveyProgram(item, programId)).length;
    button.hidden = !allowed;
    button.disabled = allowed && programId !== "all" && count === 0;
    button.classList.toggle("active", programId === selectedSurveyProgramFilter);
    const label = programId === "all" ? "Бүх хөтөлбөр" : programLabel(programId);
    button.innerHTML = `${label} <span>${count}</span>`;
  });
}

function captureSurveyDraftRatings() {
  $$("#competency-table input[type='radio']:checked").forEach((input) => {
    surveyDraftRatings[input.name] = input.value;
  });
}

function restoreSurveyDraftRatings() {
  Object.entries(surveyDraftRatings).forEach(([name, value]) => {
    const input = $(`#competency-table input[name="${CSS.escape(name)}"][value="${CSS.escape(value)}"]`);
    if (input) input.checked = true;
  });
}

function appendCompetencyRow(table, item) {
  const row = document.createElement("div");
  row.className = `competency-row ${item.source !== "core" ? "document-derived" : ""}`;
  row.innerHTML = `
    <div class="competency-name">
      <strong>${escapeHtml(item.name)}</strong>
      <small>${escapeHtml(item.detail || "")}</small>
      ${item.source !== "core" ? `<em>${escapeHtml(item.sourceLabel)}</em>` : ""}
    </div>
    ${ratingGroup(`${item.id}_current`, "current")}
    ${ratingGroup(`${item.id}_importance`, "importance")}`;
  table.appendChild(row);
}

function appendCompetencyGroup(table, title, items) {
  if (!items.length) return;
  const group = document.createElement("div");
  group.className = "competency-group-row";
  group.innerHTML = `<strong>${escapeHtml(title)}</strong><span>${items.length} чадамж</span>`;
  table.appendChild(group);
  items.forEach((item) => appendCompetencyRow(table, item));
}

function buildCompetencyTable() {
  captureSurveyDraftRatings();
  const table = $("#competency-table");
  table.innerHTML = `<div class="competency-head"><span>Чадамж</span><span>Одоогийн түвшин</span><span>Ирээдүйн чухалчлал</span></div>`;
  const allItems = surveyCompetencies();
  renderSurveySourceFilters(allItems);
  renderSurveyProgramFilters(allItems);
  const items = allItems
    .filter(itemMatchesSurveySource)
    .filter((item) => itemMatchesSurveyProgram(item));
  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "competency-empty";
    empty.textContent = "Энэ шүүлтүүрээр харуулах чадамж хараахан алга.";
    table.appendChild(empty);
    return;
  }
  if (selectedSurveyProgramFilter === "all") {
    appendCompetencyGroup(table, "Нийтлэг чадамж", items.filter((item) => !normalizeSurveyProgramIds(item.programIds).length));
    accessibleProgramDefinitions().forEach((program) => {
      appendCompetencyGroup(table, program.name, items.filter((item) => normalizeSurveyProgramIds(item.programIds).includes(program.id)));
    });
  } else {
    appendCompetencyGroup(table, programLabel(selectedSurveyProgramFilter), items);
  }
  restoreSurveyDraftRatings();
}

function ratingGroup(name, className) {
  return `<div class="rating-group ${className}" role="radiogroup" aria-label="${name}">
    ${[1, 2, 3, 4, 5, "NA"].map((value) => `
      <label title="${value === "NA" ? "Мэдэхгүй / хамаарахгүй" : value}">
        <input type="radio" name="${name}" value="${value}" required><span>${value === "NA" ? "—" : value}</span>
      </label>`).join("")}
  </div>`;
}

function handleSurvey(event) {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.checkValidity()) {
    $("#survey-error").textContent = "Шаардлагатай бүх талбарыг бөглөнө үү.";
    form.reportValidity();
    return;
  }
  const data = new FormData(form);
  const response = {
    id: uid(), submittedAt: new Date().toISOString(), stakeholder: data.get("stakeholder"),
    agency: data.get("agency"), experience: data.get("experience"), comment: String(data.get("comment") || "").trim(), ratings: {}
  };
  surveyCompetencies().forEach((item) => {
    response.ratings[item.id] = {
      current: parseRating(data.get(`${item.id}_current`) ?? surveyDraftRatings[`${item.id}_current`]),
      importance: parseRating(data.get(`${item.id}_importance`) ?? surveyDraftRatings[`${item.id}_importance`])
    };
  });
  state.surveys.push(response);
  persist("Асуулгын хариулт бүртгэгдлээ");
  form.reset();
  surveyDraftRatings = {};
  $("#survey-error").textContent = "";
  $("#survey-success").hidden = false;
  renderDashboard();
}

function parseRating(value) { return value === "NA" || value === null ? null : Number(value); }

async function handlePolicyFile(event) {
  const file = event.target.files?.[0];
  selectedDocumentFileName = file?.name || "";
  $("#file-label").textContent = file ? file.name : "PDF эсвэл TXT баримт сонгох";
  if (!file) return;

  const form = $("#document-form");
  const status = $("#extraction-status");
  status.hidden = false;
  status.classList.remove("error", "autofill");
  status.textContent = `${file.name} файлын текстийг уншиж байна…`;
  clearAutoFilledMetadata(form);

  try {
    const text = await extractDocumentText(file, (message) => {
      status.textContent = message;
    });
    if (text.trim().length < 40) {
      status.classList.add("error");
      status.textContent = "Уншигдах текст илэрсэнгүй. Скан PDF бол OCR хийсэн хувилбар ашиглах эсвэл холбогдох заалтыг гараар хуулна уу.";
      return;
    }
    $("#source-text").value = text.slice(0, 120000);
    updateSourceCount();
    const { inferDocumentMetadata } = await import("./metadata-inference.mjs?v=20260706-autofill");
    const inferred = inferDocumentMetadata({ text, fileName: file.name });
    const autoFilledLabels = applyInferredMetadata(form, inferred);
    status.classList.toggle("autofill", autoFilledLabels.length > 0);
    status.textContent = autoFilledLabels.length
      ? `${file.name}: ${text.length.toLocaleString()} тэмдэгт задаллаа. Автоматаар нөхөв: ${autoFilledLabels.join(", ")}. Эх баримттай тулган шалгана уу.`
      : `${file.name}: ${text.length.toLocaleString()} тэмдэгт амжилттай задаллаа. Мета мэдээлэл тодорхой илрээгүй тул талбаруудыг гараар нөхнө үү.`;
  } catch (error) {
    status.classList.add("error");
    status.textContent = `Файлын текстийг задлах боломжгүй: ${error.message}. Холбогдох заалтыг гараар хуулна уу.`;
  }
}

function clearAutoFilledMetadata(form) {
  $$("[data-auto-filled='true']", form).forEach((field) => {
    field.value = "";
    field.classList.remove("auto-filled");
    delete field.dataset.autoFilled;
    delete field.dataset.sourceSnippet;
    delete field.dataset.sourcePage;
    delete field.title;
  });
}

function applyInferredMetadata(form, metadata) {
  const fields = [
    { name: "title", value: metadata.title, label: "баримт бичгийн нэр" },
    { name: "organization", value: metadata.organization, label: "гаргасан байгууллага" },
    { name: "year", value: metadata.year, label: "батлагдсан он" },
    { name: "quality", value: metadata.quality, label: "эх сурвалжийн төрөл" },
    { name: "agency", value: metadata.agency, label: "хамаарах байгууллага" },
    { name: "url", value: metadata.url, label: "албан ёсны холбоос" },
    { name: "version", value: metadata.version, label: "хувилбар / дугаар" },
    { name: "programName", value: metadata.programName, label: "хөтөлбөрийн нэр" },
    { name: "programLevel", value: metadata.programLevel, label: "хөтөлбөрийн түвшин" },
    { name: "targetGroup", value: metadata.targetGroup, label: "зорилтот бүлэг" }
  ];
  const applied = [];
  fields.forEach(({ name, value, label }) => {
    const field = form.elements[name];
    if (!field || !value || String(field.value).trim()) return;
    if (field.tagName === "SELECT" && ![...field.options].some((option) => option.value === String(value))) return;
    field.value = value;
    field.classList.add("auto-filled");
    field.dataset.autoFilled = "true";
    field.title = "Файлын текстээс автоматаар нөхсөн — эх баримттай тулган шалгана.";
    applied.push(label);
  });
  return applied;
}

function firstMatch(text, patterns) {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match?.[1] || match?.[0]) return (match[1] || match[0]).replace(/\s+/g, " ").trim();
  }
  return "";
}

function firstMatchWithPattern(text, patterns) {
  for (const item of patterns) {
    const pattern = item.pattern || item;
    const match = text.match(pattern);
    if (match?.[1] || match?.[0]) {
      return {
        value: (match[1] || match[0]).replace(/\s+/g, " ").trim(),
        label: item.label || "pattern",
        strict: item.strict !== false
      };
    }
  }
  return { value: "", label: "", strict: false };
}

function cleanComparisonValue(value, maxLength = 140) {
  const clean = String(value || "").replace(/\s+/g, " ").replace(/^[\s:;,.–—-]+|[\s:;,.–—-]+$/g, "").trim();
  if (clean.length <= maxLength) return clean;
  const clipped = clean.slice(0, maxLength + 1);
  const wordSafe = clipped.replace(/\s+\S*$/, "").trim();
  return (wordSafe || clean.slice(0, maxLength)).replace(/[,:;–—-]+$/, "").trim();
}

function firstCompleteClause(value, maxLength = 120) {
  const clean = String(value || "")
    .replace(/\[\[PAGE\s+\d+\]\]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!clean) return "";
  const stopMatch = clean.match(/\b(?:This is|It is|These are|The programme is|The program is|Admission|Applicants|Prerequisite)\b/i);
  const firstPart = stopMatch ? clean.slice(0, stopMatch.index).trim() : clean;
  const clauses = firstPart
    .split(/\s*(?:[.;!?]| — | – | \| )\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
  const selected = clauses.find((part) => part.length >= 3) || firstPart;
  return cleanComparisonValue(selected, maxLength);
}

function normalizeComparisonProgramTitle(value, fileBase = "") {
  const raw = firstCompleteClause(value, 170)
    .replace(/\btraining and serving\b.*$/i, "training")
    .replace(/\bserving\b.*$/i, "")
    .replace(/\b\d+(?:[–-]\d+)?\s*(?:years?|semesters?|months?|weeks?|жил|семестр|сар|долоо хоног)\b.*$/i, "")
    .replace(/\b(?:in this level|at this level|for this level)\b.*$/i, "")
    .trim();
  let title = translateProgramName(raw)
    .replace(/\btraining\b/gi, "сургалт")
    .replace(/Удирдлага\s+сургалт/gi, "Удирдлагын сургалт")
    .replace(/Манлайлал\s+сургалт/gi, "Манлайллын сургалт")
    .replace(/\s+/g, " ")
    .trim();
  const fallback = cleanComparisonValue(fileBase.replace(/\b(pdf|docx?|txt)\b/gi, ""), 140);
  if ((!title || /^\d+$/.test(title)) && fallback && !/^\d+$/.test(fallback)) title = fallback;
  return cleanComparisonValue(title, 120);
}

function normalizeDurationPhrase(value) {
  const clean = String(value || "").replace(/\s+/g, " ").trim();
  if (!clean) return "";
  const numberWords = {
    one: "1", two: "2", three: "3", four: "4", five: "5", six: "6", seven: "7", eight: "8", nine: "9", ten: "10",
    eleven: "11", twelve: "12"
  };
  const match = clean.match(/\b(\d+(?:\.\d+)?(?:\s*[–-]\s*\d+(?:\.\d+)?)?|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\s*(years?|semesters?|months?|weeks?|жил|семестр|сар|долоо хоног)\b/i);
  if (match) {
    const number = numberWords[match[1].toLowerCase()] || match[1].replace(/\s*[–-]\s*/g, "–");
    const unit = match[2].toLowerCase();
    const translatedUnit = /year|жил/.test(unit) ? "жил"
      : /semester|семестр/.test(unit) ? "семестр"
      : /month|сар/.test(unit) ? "сар"
      : "долоо хоног";
    return `${number} ${translatedUnit}`;
  }
  return firstCompleteClause(clean, 80)
    .replace(/\byears?\b/gi, "жил")
    .replace(/\bsemesters?\b/gi, "семестр")
    .replace(/\bmonths?\b/gi, "сар")
    .replace(/\bweeks?\b/gi, "долоо хоног");
}

function snippetAround(text, queryOrPattern, fallbackPatterns = []) {
  const source = String(text || "");
  const patterns = [
    queryOrPattern instanceof RegExp ? queryOrPattern : null,
    ...fallbackPatterns
  ].filter(Boolean);
  let index = -1;
  let value = "";
  for (const pattern of patterns) {
    const match = source.match(pattern);
    if (match) {
      index = match.index ?? -1;
      value = (match[1] || match[0] || "").replace(/\s+/g, " ").trim();
      break;
    }
  }
  if (index < 0 && queryOrPattern && !(queryOrPattern instanceof RegExp)) {
    index = source.toLowerCase().indexOf(String(queryOrPattern).toLowerCase().slice(0, 60));
    value = String(queryOrPattern);
  }
  if (index < 0) return null;
  const start = Math.max(0, index - 160);
  const end = Math.min(source.length, index + Math.max(220, value.length + 160));
  const before = source.slice(0, index);
  const pageMatches = [...before.matchAll(/\[\[PAGE\s+(\d+)\]\]/g)];
  const page = pageMatches.length ? pageMatches.at(-1)[1] : "";
  return {
    page,
    text: source.slice(start, end).replace(/\[\[PAGE\s+\d+\]\]/g, "").replace(/\s+/g, " ").trim()
  };
}

function sourceEvidenceLabel(evidence) {
  if (!evidence?.text) return "";
  return `${evidence.page ? `Хуудас ${evidence.page} · ` : ""}${evidence.text}`;
}

function comparisonFieldEvidence(normalized, match, fallbackPatterns = []) {
  if (!match?.value) return null;
  const evidence = snippetAround(normalized, match.value, fallbackPatterns);
  return evidence ? { ...evidence, strict: Boolean(match.strict), label: match.label || "" } : null;
}

function looksLikeMixedProgramTitle(value = "") {
  const text = String(value || "").toLowerCase();
  if (!text.trim()) return true;
  return text.length > 130
    || /main subjects?|admission|applicants?|this is accepted|semester\s*;|\bpage\b|professional development|training and serving/i.test(text);
}

function comparisonExtractionQuality(metadata) {
  const evidence = metadata.sourceEvidence || {};
  const strictFields = ["country", "institution", "program", "credits", "format", "duration", "teacherRequirements"]
    .filter((field) => metadata[field] && evidence[field]?.strict);
  const presentFields = ["country", "institution", "program", "credits", "format", "duration"]
    .filter((field) => metadata[field]);
  const hasCore = Boolean(metadata.program && (metadata.country || metadata.institution));
  const hasStudyData = Boolean(metadata.credits || metadata.duration || metadata.format);
  const mixedTitle = looksLikeMixedProgramTitle(metadata.program);
  const score = strictFields.length + (hasCore ? 1 : 0) + (hasStudyData ? 1 : 0) - (mixedTitle ? 2 : 0);
  return {
    score,
    strictFields,
    presentFields,
    mixedTitle,
    trusted: score >= 4 && hasCore && hasStudyData && !mixedTitle
  };
}

function inferInternationalProgramMetadata({ text, fileName = "" } = {}) {
  const normalized = String(text || "").replace(/\r/g, "\n").replace(/[ \t]+/g, " ");
  const fileBase = fileName.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim();
  const countryMatch = firstMatchWithPattern(normalized, [
    { pattern: /\b(?:Country|Location|Campus)\s*[:\-]\s*([A-Z][A-Za-z .,&-]{2,80})/i, label: "country-label" },
    { pattern: /\b(United States|United Kingdom|Australia|Canada|Singapore|Germany|Finland|Netherlands|New Zealand|Japan|Korea|Norway|Sweden|Estonia|Germany|Austria|Croatia)\b/i, label: "known-country", strict: false }
  ]);
  const institutionMatch = firstMatchWithPattern(normalized, [
    { pattern: /\b(?:Institution|University|School|College|Institute|Academy|Agency|Provider)\s*[:\-]\s*([^\n]{4,110})/i, label: "institution-label" },
    { pattern: /\b([A-Z][A-Za-z .,&-]{2,90}\s+(?:University|School|College|Institute|Academy|Agency))\b/, label: "institution-name", strict: false }
  ]);
  const programMatch = firstMatchWithPattern(normalized, [
    { pattern: /\b(?:Program(?:me)? title|Program(?:me)? name|Degree|Course title|Qualification)\s*[:\-]\s*([^\n]{6,120})/i, label: "program-label" },
    { pattern: /\b((?:Master|MSc|MA|MPA|MBA|Graduate Certificate|Postgraduate Diploma)\s+(?:of|in)?[^\n.;]{6,110})/i, label: "degree-title", strict: false }
  ]);
  const creditsMatch = firstMatchWithPattern(normalized, [
    { pattern: /\b(?:Credits|Credit points|ECTS)\s*[:\-]\s*(\d{2,3}[^\n]{0,20})/i, label: "credits-label" },
    { pattern: /\b(\d{2,3}\s*(?:ECTS|credits|credit points|units))\b/i, label: "credits-value" }
  ]);
  const formatMatch = firstMatchWithPattern(normalized, [
    { pattern: /\b(?:Mode of study|Study mode|Delivery|Format)\s*[:\-]\s*([^\n]{4,80})/i, label: "format-label" },
    { pattern: /\b(full-time|part-time|online|on campus|blended|hybrid|distance learning)\b/i, label: "format-value", strict: false }
  ]);
  const durationMatch = firstMatchWithPattern(normalized, [
    { pattern: /\b(?:Duration|Length|Programme duration|Program duration|Study duration)\s*[:\-]\s*([^\n]{3,80})/i, label: "duration-label" },
    { pattern: /\b(\d+(?:\.\d+)?(?:\s*[–-]\s*\d+(?:\.\d+)?)?\s*(?:year|years|semester|semesters|month|months|week|weeks))\b/i, label: "duration-value", strict: false },
    { pattern: /\b((?:one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\s*(?:year|years|semester|semesters|month|months|week|weeks))\b/i, label: "duration-word", strict: false }
  ]);
  const teacherRequirementsMatch = firstMatchWithPattern(normalized, [
    { pattern: /\b(?:Faculty|Teaching staff|Instructors|Lecturers|Teacher requirements|Staff requirements)\s*[:\-]\s*([^\n]{8,180})/i, label: "teacher-label" }
  ]);
  const country = countryMatch.value;
  const institution = institutionMatch.value;
  const program = programMatch.value;
  const credits = creditsMatch.value;
  const format = formatMatch.value;
  const duration = durationMatch.value;
  const teacherRequirements = teacherRequirementsMatch.value;
  const sourceEvidence = {
    country: comparisonFieldEvidence(normalized, countryMatch, [/\b(?:Country|Location|Campus)\s*[:\-]\s*([^\n]{2,100})/i]),
    institution: comparisonFieldEvidence(normalized, institutionMatch, [/\b(?:Institution|University|School|College|Institute|Academy|Agency|Provider)\s*[:\-]\s*([^\n]{4,140})/i]),
    program: comparisonFieldEvidence(normalized, programMatch, [/\b(?:Program(?:me)? title|Program(?:me)? name|Degree|Course title|Qualification)\s*[:\-]\s*([^\n]{6,140})/i]),
    credits: comparisonFieldEvidence(normalized, creditsMatch, [/\b(?:Credits|Credit points|ECTS)\s*[:\-]\s*(\d{2,3}[^\n]{0,20})/i]),
    format: comparisonFieldEvidence(normalized, formatMatch, [/\b(?:Mode of study|Study mode|Delivery|Format)\s*[:\-]\s*([^\n]{4,100})/i]),
    duration: comparisonFieldEvidence(normalized, durationMatch, [/\b(?:Duration|Length|Programme duration|Program duration|Study duration)\s*[:\-]\s*([^\n]{3,100})/i]),
    teacherRequirements: comparisonFieldEvidence(normalized, teacherRequirementsMatch, [/\b(?:Faculty|Teaching staff|Instructors|Lecturers|Teacher requirements|Staff requirements)\s*[:\-]\s*([^\n]{8,220})/i]),
    competencies: snippetAround(normalized, /(?:learning outcomes|competenc(?:y|ies)|graduate attributes|graduates? will|students? will)[^\n]{20,260}/i)
  };
  const metadata = {
    programId: inferComparisonProgramId(normalized),
    country: translateCountry(country),
    institution: cleanComparisonValue(institution),
    program: normalizeComparisonProgramTitle(program, ""),
    credits: cleanComparisonValue(credits, 60),
    format: translateFormat(format),
    duration: normalizeDurationPhrase(duration),
    teacherRequirements: translateTeacherRequirements(teacherRequirements),
    competencies: inferComparisonCompetencies(normalized),
    sourceEvidence
  };
  metadata.extractionQuality = comparisonExtractionQuality(metadata);
  return metadata;
}

function inferComparisonProgramId(text = "") {
  const lower = String(text || "").toLocaleLowerCase("mn");
  if (/(цагдаа|хууль сахиулах|нийтийн аюулгүй|police|law enforcement|criminal justice|public safety|calea|cepol)/i.test(lower)) return "police";
  if (/(хил|гааль|цагаачлал|border|customs|immigration|frontier)/i.test(lower)) return "border";
  if (/(шүүх|шийдвэр гүйцэтгэх|хорих|засан хүмүүжүүлэх|correction|prison|probation|penitentiary|court enforcement)/i.test(lower)) return "corrections";
  if (/(онцгой|гамшиг|хямрал|гал түймэр|emergency|disaster|resilience|crisis|fire service|civil protection)/i.test(lower)) return "emergency";
  return "all";
}

function splitInternationalProgramBlocks(text = "", fileName = "") {
  const normalized = String(text || "").replace(/\r/g, "\n").replace(/[ \t]+/g, " ");
  const compact = normalized.replace(/\n{3,}/g, "\n\n");
  const creditMatches = [...compact.matchAll(/\b\d{2,3}\s*(?:ECTS|credits|credit points|units)\b/gi)];
  const blocks = [];
  creditMatches.forEach((match) => {
    const start = Math.max(0, match.index - 1300);
    const end = Math.min(compact.length, match.index + 1900);
    blocks.push(compact.slice(start, end));
  });
  if (!blocks.length) {
    const sections = compact
      .split(/\n\s*\n|(?=\b(?:Program(?:me)?|Master|MSc|MA|Course|Degree|Qualification)\b)/i)
      .map((part) => part.trim())
      .filter((part) => part.length > 180);
    blocks.push(...sections.slice(0, 12));
  }
  if (!blocks.length) blocks.push(compact.slice(0, 5000));
  const seen = new Set();
  const inferred = blocks
    .map((block) => inferInternationalProgramMetadata({ text: block, fileName }))
    .filter((item) => item.extractionQuality?.trusted)
    .filter((item) => {
      const key = normalizeKey(`${item.country}-${item.institution}-${item.program}-${item.credits}`);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 20);
  comparisonRejectedSuggestions = Math.max(0, blocks.length - inferred.length);
  return inferred;
}

function translateCountry(value) {
  const country = cleanComparisonValue(value);
  const map = {
    "United States": "АНУ",
    "United Kingdom": "Их Британи",
    Australia: "Австрали",
    Canada: "Канад",
    Singapore: "Сингапур",
    Germany: "Герман",
    Finland: "Финланд",
    Netherlands: "Нидерланд",
    "New Zealand": "Шинэ Зеланд",
    Japan: "Япон",
    Korea: "БНСУ",
    Norway: "Норвеги",
    Sweden: "Швед",
    Estonia: "Эстони"
  };
  return map[country] || country;
}

function translateProgramName(value) {
  return cleanComparisonValue(value, 140)
    .replace(/\bMaster of\b/gi, "Магистрын хөтөлбөр:")
    .replace(/\bMSc in\b/gi, "Шинжлэх ухааны магистрын хөтөлбөр:")
    .replace(/\bMA in\b/gi, "Магистрын хөтөлбөр:")
    .replace(/\bPublic Administration\b/gi, "Төрийн удирдлага")
    .replace(/\bStrategic Leadership\b/gi, "Стратегийн манлайлал")
    .replace(/\bLeadership\b/gi, "Манлайлал")
    .replace(/\bSecurity\b/gi, "Аюулгүй байдал")
    .replace(/\bCriminal Justice\b/gi, "Эрүүгийн эрх зүй, хууль сахиулах")
    .replace(/\bManagement\b/gi, "Удирдлага");
}

function translateFormat(value) {
  const format = cleanComparisonValue(value);
  const lower = format.toLowerCase();
  const parts = [];
  if (lower.includes("full-time")) parts.push("Бүтэн цагийн");
  if (lower.includes("part-time")) parts.push("Хагас цагийн");
  if (lower.includes("online")) parts.push("Цахим");
  if (lower.includes("campus")) parts.push("Танхим");
  if (lower.includes("blend") || lower.includes("hybrid")) parts.push("Хосолсон");
  if (lower.includes("distance")) parts.push("Зайны");
  return parts.length ? [...new Set(parts)].join(", ") : format;
}

function translateDuration(value) {
  return normalizeDurationPhrase(value)
    .replace(/\byears?\b/gi, "жил")
    .replace(/\bsemesters?\b/gi, "семестр")
    .replace(/\bmonths?\b/gi, "сар")
    .replace(/\bweeks?\b/gi, "долоо хоног")
    .replace(/\bfull-time\b/gi, "бүтэн цагийн")
    .replace(/\bpart-time\b/gi, "хагас цагийн");
}

function translateTeacherRequirements(value) {
  const clean = firstCompleteClause(value, 135)
    .replace(/\band\s+/gi, ", ")
    .replace(/\s*,\s*,\s*/g, ", ")
    .replace(/\(\s*/g, "(")
    .replace(/\s*\)/g, ")")
    .replace(/\bPhD\b/gi, "PhD")
    .replace(/\bdoctorate|doctoral degree\b/gi, "докторын зэрэг")
    .replace(/\bprofessor\b/gi, "профессор")
    .replace(/\blecturers?\b/gi, "багш/лектор")
    .replace(/\binstructors?\b/gi, "сургагч багш")
    .replace(/\bnon-staff\b/gi, "орон тооны бус")
    .replace(/\bfrom the police department\b/gi, "цагдаагийн байгууллагаас")
    .replace(/\bsupport specialists?\b/gi, "дэмжих мэргэжилтэн")
    .replace(/\bprofessional experience\b/gi, "мэргэжлийн туршлага")
    .replace(/\bpractitioners?\b/gi, "салбарын практик туршлагатай мэргэжилтэн")
    .replace(/\s+/g, " ")
    .trim();
  return cleanComparisonValue(clean, 125);
}

function inferComparisonCompetencies(text) {
  const lower = String(text || "").toLowerCase();
  const patterns = [
    { name: "Стратегийн сэтгэлгээ ба орчны шинжилгээ", terms: ["strategic thinking", "strategy", "strategic analysis", "systems thinking", "environmental scanning"] },
    { name: "Нотолгоонд суурилсан шийдвэр гаргалт", terms: ["evidence-based", "data analysis", "analytics", "research methods", "decision making"] },
    { name: "Бодлогын шинжилгээ ба эрх зүйн нийцэл", terms: ["policy analysis", "public policy", "legal", "regulation", "governance"] },
    { name: "Эрсдэл, хямрал ба аюулгүй байдлын удирдлага", terms: ["risk management", "crisis", "emergency", "security management", "resilience"] },
    { name: "Ёс зүй, хариуцлага ба олон нийтийн итгэл", terms: ["ethics", "accountability", "integrity", "public trust", "transparency"] },
    { name: "Хүмүүс ба байгууллагын өөрчлөлтийг удирдах", terms: ["change management", "people management", "organizational development", "human resource", "talent"] },
    { name: "Харилцаа, хэлэлцээ ба оролцогч талын хамтын ажиллагаа", terms: ["communication", "negotiation", "stakeholder", "collaboration", "partnership"] },
    { name: "Дижитал шилжилт ба технологийн удирдлага", terms: ["digital", "technology", "cyber", "artificial intelligence", "information systems"] },
    { name: "Гүйцэтгэл, төсөл ба нөөцийн удирдлага", terms: ["performance management", "project management", "budget", "resource management", "evaluation"] }
  ];
  const found = patterns
    .map((item) => ({ ...item, count: item.terms.reduce((sum, term) => sum + (lower.includes(term) ? 1 : 0), 0) }))
    .filter((item) => item.count > 0)
    .sort((left, right) => right.count - left.count)
    .map((item) => item.name);
  return [...new Set(found)].slice(0, 12).join("\n");
}

function applyComparisonMetadata(form, metadata) {
  const fields = [
    { name: "programId", value: metadata.programId, label: "хамааруулах хөтөлбөр" },
    { name: "country", value: metadata.country, label: "улс" },
    { name: "institution", value: metadata.institution, label: "сургууль / агентлаг" },
    { name: "program", value: metadata.program, label: "хөтөлбөрийн нэр" },
    { name: "credits", value: metadata.credits, label: "нийт кредит" },
    { name: "format", value: metadata.format, label: "сургалтын хэлбэр" },
    { name: "duration", value: metadata.duration, label: "суралцах хугацаа" },
    { name: "teacherRequirements", value: metadata.teacherRequirements, label: "багшийн шаардлага" },
    { name: "competencies", value: metadata.competencies, label: "төгсөгчийн гол чадамж" }
  ];
  const applied = [];
  fields.forEach(({ name, value, label }) => {
    const field = form.elements[name];
    if (!field || !value || String(field.value).trim()) return;
    field.value = value;
    field.classList.add("auto-filled");
    field.dataset.autoFilled = "true";
    field.title = "Эх файлаас автоматаар санал болгосон. Эх лавлагаагүй бол ашиглахгүй; заавал тулган баталгаажуулна.";
    const evidence = metadata.sourceEvidence?.[name];
    if (evidence?.text) {
      field.dataset.sourceSnippet = evidence.text;
      field.dataset.sourcePage = evidence.page || "";
    }
    applied.push(label);
  });
  comparisonFormEvidence = metadata.sourceEvidence || {};
  return applied;
}

function comparisonContextFromForm(form = $("#comparison-form")) {
  if (!form) {
    return { localProgramName: "", localProgramLevel: "", localProgramLevelLabel: "", localProgramTargetGroup: "" };
  }
  const levelField = form.elements.localProgramLevel;
  return {
    localProgramName: cleanComparisonValue(form.elements.localProgramName?.value, 300),
    localProgramLevel: cleanComparisonValue(levelField?.value, 60),
    localProgramLevelLabel: levelField?.selectedOptions?.[0]?.textContent?.trim() || "",
    localProgramTargetGroup: cleanComparisonValue(form.elements.localProgramTargetGroup?.value, 500)
  };
}

function inferLocalComparisonProgramId(context = comparisonContextFromForm()) {
  return inferComparisonProgramId(`${context.localProgramName || ""} ${context.localProgramTargetGroup || ""}`);
}

function syncComparisonProgramFromContext() {
  const form = $("#comparison-form");
  const field = form?.elements.programId;
  if (!field) return;
  const inferred = inferLocalComparisonProgramId();
  if (inferred === "all") return;
  if (field.value === "all" || field.dataset.autoContextProgram === "true") {
    field.value = inferred;
    field.dataset.autoContextProgram = "true";
  }
}

function validateComparisonContext() {
  const form = $("#comparison-form");
  const fields = [
    { field: form?.elements.localProgramName, message: "Эхлээд сургалтын хөтөлбөрийн нэрийг оруулна уу." },
    { field: form?.elements.localProgramLevel, message: "Эхлээд сургалтын хөтөлбөрийн түвшинг сонгоно уу." },
    { field: form?.elements.localProgramTargetGroup, message: "Эхлээд сургалтын хөтөлбөрийн зорилтот бүлгийг оруулна уу." }
  ];
  const missing = fields.find((item) => !String(item.field?.value || "").trim());
  if (!missing) return true;
  missing.field?.focus();
  showToast(missing.message);
  return false;
}

function comparisonMetadataPayload(metadata) {
  const context = comparisonContextFromForm();
  const selectedProgramId = $("#comparison-form")?.elements.programId?.value || "";
  return {
    programId: selectedProgramId && selectedProgramId !== "all" ? selectedProgramId : metadata.programId || inferLocalComparisonProgramId(context) || "all",
    localProgramName: cleanComparisonValue(metadata.localProgramName || context.localProgramName, 300),
    localProgramLevel: cleanComparisonValue(metadata.localProgramLevel || context.localProgramLevel, 60),
    localProgramLevelLabel: cleanComparisonValue(metadata.localProgramLevelLabel || context.localProgramLevelLabel, 120),
    localProgramTargetGroup: cleanComparisonValue(metadata.localProgramTargetGroup || context.localProgramTargetGroup, 500),
    country: cleanComparisonValue(metadata.country),
    institution: cleanComparisonValue(metadata.institution),
    program: cleanComparisonValue(metadata.program, 180),
    credits: cleanComparisonValue(metadata.credits, 80),
    format: cleanComparisonValue(metadata.format, 100),
    duration: cleanComparisonValue(metadata.duration, 100),
    teacherRequirements: cleanComparisonValue(metadata.teacherRequirements, 180),
    url: cleanComparisonValue(metadata.url, 240),
    competencies: String(metadata.competencies || "").trim(),
    sourceEvidence: metadata.sourceEvidence || comparisonFormEvidence || {}
  };
}

function fillComparisonForm(metadata) {
  const form = $("#comparison-form");
  const payload = comparisonMetadataPayload(metadata);
  Object.entries(payload).forEach(([name, value]) => {
    const field = form.elements[name];
    if (field && name !== "sourceEvidence") field.value = value || (name === "programId" ? "all" : "");
  });
  comparisonFormEvidence = metadata.sourceEvidence || {};
  applyComparisonFieldEvidence(form, comparisonFormEvidence);
}

function applyComparisonFieldEvidence(form, evidenceMap = {}) {
  Object.entries(evidenceMap).forEach(([name, evidence]) => {
    const field = form.elements[name];
    if (!field || !evidence?.text) return;
    field.dataset.sourceSnippet = evidence.text;
    field.dataset.sourcePage = evidence.page || "";
    field.dataset.autoFilled = "true";
    field.classList.add("auto-filled");
  });
}

function showComparisonFieldEvidence(field) {
  const status = $("#comparison-file-status");
  if (!status || !field?.dataset?.sourceSnippet) return;
  status.hidden = false;
  status.classList.add("autofill");
  status.classList.remove("error");
  status.textContent = `Эх лавлагаа — ${field.dataset.sourcePage ? `хуудас ${field.dataset.sourcePage}: ` : ""}${field.dataset.sourceSnippet} · Санамж: лавлагаагүй, баталгаажаагүй мэдээллийг ашиглахгүй.`;
}

function registerComparisonSuggestion(metadata, silent = false) {
  if (!validateComparisonContext()) return false;
  const payload = comparisonMetadataPayload(metadata);
  if (!payload.country && !payload.institution && !payload.program) return false;
  state.comparisons.push({ id: uid(), createdAt: new Date().toISOString(), ...payload });
  if (!silent) {
    persist("Харьцуулах хөтөлбөр бүртгэгдлээ");
    renderEvidence();
    renderProgramComparisonDetail();
    renderDashboard();
  }
  return true;
}

function renderComparisonSuggestions() {
  const container = $("#comparison-suggestions");
  if (!container) return;
  if (!comparisonImportSuggestions.length) {
    container.hidden = true;
    container.innerHTML = "";
    return;
  }
  container.hidden = false;
  container.innerHTML = `
    <div class="comparison-suggestions-head">
      <div><strong>Файлаас илэрсэн баталгаатай хөтөлбөрүүд</strong><small>${comparisonImportSuggestions.length} санал · ${comparisonRejectedSuggestions} эргэлзээтэй block шүүгдсэн · эх лавлагаатай тулган баталгаажуулна</small></div>
      <button class="button secondary" type="button" data-register-all-comparisons>Бүгдийг бүртгэх</button>
    </div>
    <div class="comparison-suggestion-list">
      ${comparisonImportSuggestions.map((item, index) => `
        <article class="comparison-suggestion">
          <strong>${escapeHtml(item.program || "Хөтөлбөрийн нэр тодорхойгүй")}</strong>
          <small>${escapeHtml(item.country || "Улс тодорхойгүй")} · ${escapeHtml(item.institution || "Сургууль/агентлаг тодорхойгүй")} · ${escapeHtml(item.credits || "кредит тодорхойгүй")} · ${escapeHtml(item.format || "хэлбэр тодорхойгүй")} · ${escapeHtml(item.duration || "хугацаа тодорхойгүй")}</small>
          <p><b>Итгэлцүүр:</b> ${item.extractionQuality?.score || 0} · Баттай талбар: ${(item.extractionQuality?.strictFields || []).join(", ") || "байхгүй"}</p>
          ${item.teacherRequirements ? `<p><b>Багш:</b> ${escapeHtml(item.teacherRequirements)}</p>` : ""}
          <p>${escapeHtml(String(item.competencies || "").split(/\n/).slice(0, 3).join(" · ") || "Чадамжийн санал илрээгүй")}</p>
          <div>
            <button class="text-button" type="button" data-fill-comparison="${index}">Талбарт оруулах</button>
            <button class="text-button" type="button" data-register-comparison="${index}">Матрицад бүртгэх</button>
          </div>
        </article>`).join("")}
    </div>`;
}

async function handleComparisonFile(event) {
  const file = event.target.files?.[0];
  const label = $("#comparison-file-label");
  const status = $("#comparison-file-status");
  const form = $("#comparison-form");
  if (label) label.textContent = file ? file.name : "Англи хэл дээрх PDF/TXT хөтөлбөр сонгох";
  if (!file) return;
  status.hidden = false;
  status.classList.remove("error", "autofill");
  status.textContent = `${file.name} файлын англи текстийг уншиж байна…`;
  comparisonFormEvidence = {};
  clearAutoFilledMetadata(form);
  try {
    const text = await extractComparisonDocumentText(file, (message) => {
      status.textContent = message;
    });
    if (text.trim().length < 40) {
      status.classList.add("error");
      status.textContent = "Уншигдах текст илэрсэнгүй. OCR хийсэн PDF эсвэл TXT хувилбар ашиглана уу.";
      return;
    }
    comparisonRejectedSuggestions = 0;
    comparisonImportSuggestions = splitInternationalProgramBlocks(text, file.name);
    const wholeDocumentInferred = comparisonImportSuggestions.length ? null : inferInternationalProgramMetadata({ text, fileName: file.name });
    const inferred = comparisonImportSuggestions[0] || (wholeDocumentInferred?.extractionQuality?.trusted ? wholeDocumentInferred : {});
    const applied = applyComparisonMetadata(form, inferred);
    renderComparisonSuggestions();
    status.classList.toggle("autofill", applied.length > 0);
    status.textContent = applied.length
      ? `${file.name}: ${text.length.toLocaleString()} тэмдэгт уншлаа. ${comparisonImportSuggestions.length} баталгаатай санал илэрлээ, ${comparisonRejectedSuggestions} эргэлзээтэй block шүүгдсэн. Эхний саналаар бөглөв: ${applied.join(", ")}.`
      : `${file.name}: ${text.length.toLocaleString()} тэмдэгт уншлаа. Баталгаатай хөтөлбөрийн санал илэрсэнгүй; ${comparisonRejectedSuggestions} эргэлзээтэй block-ийг худал/холимог мэдээлэл үүсгэхээс сэргийлж бөглөөгүй. Зөвхөн эх файл/албан ёсны холбоосоос баталгаажуулсан мэдээллийг гараар оруулна уу.`;
  } catch (error) {
    status.classList.add("error");
    status.textContent = `Олон улсын хөтөлбөрийн файлыг унших боломжгүй: ${error.message}. TXT/PDF текст хувилбарыг ашиглана уу.`;
  }
}

async function extractComparisonDocumentText(file, onProgress) {
  const extension = file.name.split(".").pop().toLowerCase();
  if (extension === "txt" || extension === "md") return `[[PAGE 1]]\n${await file.text()}`;
  if (extension !== "pdf") throw new Error("энэ төрлийн файлыг шууд уншихгүй");

  const pdfjs = await import(resolveAppAsset("vendor/pdf.min.mjs"));
  pdfjs.GlobalWorkerOptions.workerSrc = resolveAppAsset("vendor/pdf.worker.min.mjs");
  const pdf = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const pages = [];
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    onProgress(`PDF текст задлаж байна: ${pageNumber}/${pdf.numPages} хуудас`);
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    pages.push(`[[PAGE ${pageNumber}]]\n${content.items.map((item) => item.str).join(" ")}`);
  }
  return pages.join("\n");
}

async function extractDocumentText(file, onProgress) {
  const extension = file.name.split(".").pop().toLowerCase();
  if (extension === "txt" || extension === "md") return file.text();
  if (extension !== "pdf") throw new Error("энэ төрлийн файлыг шууд уншихгүй");

  const pdfjs = await import(resolveAppAsset("vendor/pdf.min.mjs"));
  pdfjs.GlobalWorkerOptions.workerSrc = resolveAppAsset("vendor/pdf.worker.min.mjs");
  const pdf = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const pages = [];
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    onProgress(`PDF текст задлаж байна: ${pageNumber}/${pdf.numPages} хуудас`);
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    pages.push(content.items.map((item) => item.str).join(" "));
  }
  return pages.join("\n");
}

function updateSourceCount() {
  $("#source-char-count").textContent = $("#source-text").value.length.toLocaleString();
}

function selectedAnalysisMode() {
  return $('input[name="analysisMode"]:checked')?.value || "local";
}

function updateAnalysisModeUi() {
  const mode = selectedAnalysisMode();
  const isLocal = mode === "local";
  $("#analysis-mode-description").innerHTML = isLocal
    ? "<strong>Энгийн шинжилгээ:</strong> нэг өгүүлбэр дэх ойлголт, хийх үйлдэл, зорилго, үр дүн, үгүйсгэлийг хамтад нь үнэлнэ. Судлаач заавал хянан батална."
    : "<strong>Нарийвчилсан шинжилгээ:</strong> зөвхөн оруулсан эх текстэд тулгуурлан чадамж, үндэслэл, шууд ишлэл гаргана. API кредит шаардлагатай.";
  $(".button-label", $("#analyze-document")).textContent = isLocal ? "Энгийн шинжилгээ" : "Нарийвчилсан шинжилгээ";
  $("#candidate-method-label").textContent = isLocal
    ? "ӨГҮҮЛБЭРИЙН КОНТЕКСТ · СУДЛААЧИЙН ХЯНАЛТ ШААРДЛАГАТАЙ"
    : "AI САНАЛ · СУДЛААЧИЙН ХЯНАЛТ ШААРДЛАГАТАЙ";
}

function getProgramContext(form = $("#document-form")) {
  return {
    name: form.elements.programName.value.trim(),
    level: form.elements.programLevel.value,
    levelLabel: form.elements.programLevel.selectedOptions[0]?.textContent.trim() || "",
    targetGroup: form.elements.targetGroup.value.trim()
  };
}

function validateProgramContext(form = $("#document-form")) {
  const context = getProgramContext(form);
  const requiredFields = [
    { value: context.name, element: form.elements.programName, message: "Сургалтын хөтөлбөрийн нэрийг оруулна уу" },
    { value: context.level, element: form.elements.programLevel, message: "Сургалтын хөтөлбөрийн түвшинг сонгоно уу" },
    { value: context.targetGroup, element: form.elements.targetGroup, message: "Сургалтын хөтөлбөрийн зорилтот бүлгийг оруулна уу" }
  ];
  const missing = requiredFields.find((field) => !field.value);
  if (!missing) return context;
  showToast(missing.message);
  missing.element.focus();
  return null;
}

function learningOutcomeAction(level) {
  const actions = {
    certificate: "үндсэн арга, зарчмыг тайлбарлаж хэрэглэх",
    bachelor: "мэдлэг, ур чадварыг мэргэжлийн нөхцөлд хэрэглэх",
    master: "нарийн төвөгтэй нөхцөлд шинжлэн үнэлж, удирдлагын шийдвэрт хэрэглэх",
    doctorate: "шинэ мэдлэг бүтээж, бодлого ба практикийг хөгжүүлэх",
    professional: "ажлын бодит нөхцөлд үр дүнтэй хэрэгжүүлэх",
    other: "мэдлэг, ур чадварыг тохирох нөхцөлд хэрэглэх"
  };
  return actions[level] || actions.other;
}

async function analyzeDocumentLocally(text, programContext) {
  const { analyzeSentenceSemantics } = await import("./sentence-semantics.mjs?v=20260706-sentence2");
  const contextText = `${programContext.name} ${programContext.levelLabel} ${programContext.targetGroup}`;
  const scored = documentCompetencyCatalog.map((competency) => {
    const semantics = analyzeSentenceSemantics({ text, keywords: competency.keywords, competencyName: competency.name });
    const best = semantics.best;
    const contextHits = competency.keywords.reduce((sum, keyword) => sum + countOccurrences(contextText, keyword), 0);
    const hasActionOrOutcome = Boolean(best && (best.actionTerms.length || best.outcomeCues.length));
    const qualifies = Boolean(best && hasActionOrOutcome && (best.exactNameMatch || best.matchedKeywords.length >= 2));
    return { competency, semantics, best, contextHits, qualifies };
  }).filter((result) => result.qualifies)
    .sort((left, right) => right.contextHits - left.contextHits || right.best.semanticScore - left.best.semanticScore || left.competency.name.localeCompare(right.competency.name, "mn"));

  pendingDocumentCompetencies = scored.map(({ competency, best, contextHits }) => {
    const strongSentence = best.matchedKeywords.length >= 2 && (best.actionTerms.length > 0 || best.outcomeCues.length > 0);
    const score = strongSentence || best.exactNameMatch ? 3 : 2;
    const confidence = strongSentence && contextHits > 0
      ? "Өгүүлбэр · Өндөр хамаарал"
      : strongSentence
        ? "Өгүүлбэр · Дунд хамаарал"
        : "Өгүүлбэр · Хянан батлах";
    const keywordNames = best.matchedKeywords;
    const actions = [...best.actionTerms, ...best.outcomeCues];
    return {
      id: competency.id,
      category: competency.id,
      name: competency.name,
      description: competency.description,
      score,
      confidence,
      keywords: keywordNames,
      evidence: best.sentence,
      evidenceType: "explicit",
      rationale: `Нэг бүтэн өгүүлбэрт ${keywordNames.length} хамаарах ойлголт${actions.length ? ` болон “${actions.join(", ")}” үйлдэл/үр дүн` : ""} хамт илэрсэн. Үгүйсгэл илрээгүй. Хөтөлбөрийн мэдээлэлтэй ${contextHits} ойлголтын давхцалтай.`,
      programRelevance: `${programContext.name} — ${programContext.levelLabel} түвшин, “${programContext.targetGroup}” зорилтот бүлэгт ${competency.description.toLocaleLowerCase("mn")} хэрэгцээг үнэлэх санал.`,
      suggestedOutcome: `Суралцагч ${competency.name.toLocaleLowerCase("mn")}-ийн хүрээнд ${learningOutcomeAction(programContext.level)} чадвартай болно.`,
      manual: false,
      source: "sentence-context-rules"
    };
  });

  pendingAiAnalysis = {
    document_summary: pendingDocumentCompetencies.length
      ? `Өгүүлбэрийн контекстийн шинжилгээгээр ${pendingDocumentCompetencies.length} чадамжийн утгын дохио илэрлээ. Үр дүнг бүтэн эх өгүүлбэртэй тулган баталгаажуулна.`
      : "Ойлголт, хийх үйлдэл, үр дүн хамт илэрсэн хангалттай бүтэн өгүүлбэр олдсонгүй.",
    analysis_limitations: [
      "Энэ нь локал, ил тод өгүүлбэрийн контекстийн дүрэмт үнэлгээ бөгөөд ерөнхий зориулалтын AI утга зүйн загвар биш.",
      "Ойлголт, үйлдэл, суралцах үр дүн, үгүйсгэлийг нэг өгүүлбэрийн хүрээнд хамтатган үнэлдэг.",
      "Нарийн нөхцөлт болон далд утгыг бүрэн ялгахгүй тул судлаач бүтэн эх заалттай заавал тулган батална."
    ],
    method: "sentence-context-rules"
  };

  $("#candidate-method-label").textContent = "ӨГҮҮЛБЭРИЙН КОНТЕКСТ · СУДЛААЧИЙН ХЯНАЛТ ШААРДЛАГАТАЙ";
  $("#ai-analysis-error").hidden = true;
  renderAiSummary(pendingAiAnalysis);
  renderCandidates();
  $("#candidate-panel").hidden = false;
  $("#coding-confirmed").checked = false;
  $("#candidate-panel").scrollIntoView({ behavior: "smooth", block: "start" });
  showToast(pendingDocumentCompetencies.length
    ? `${pendingDocumentCompetencies.length} чадамжийн локал санал гарлаа`
    : "Локал толь бичигтэй тохирох чадамж илэрсэнгүй");
}

async function analyzeDocumentText() {
  const text = $("#source-text").value.trim();
  const programContext = validateProgramContext();
  if (!programContext) return;
  if (text.length < 40) {
    showToast("Шинжилгээнд дор хаяж 40 тэмдэгттэй эх текст оруулна уу");
    $("#source-text").focus();
    return;
  }

  const button = $("#analyze-document");
  const buttonLabel = $(".button-label", button);
  const mode = selectedAnalysisMode();
  if (mode === "local") {
    button.disabled = true;
    button.classList.add("loading");
    buttonLabel.textContent = "Локал шинжилж байна…";
    $("#candidate-panel").hidden = true;
    $("#ai-analysis-error").hidden = true;
    showToast("Энгийн шинжилгээ хийж байна");
    try {
      await analyzeDocumentLocally(text, programContext);
    } finally {
      button.disabled = false;
      button.classList.remove("loading");
      buttonLabel.textContent = "Энгийн шинжилгээ";
    }
    return;
  }

  button.disabled = true;
  button.classList.add("loading");
  buttonLabel.textContent = "AI гүн шинжилж байна…";
  $("#candidate-panel").hidden = true;
  $("#ai-analysis-error").hidden = true;
  showToast("AI баримтын заалтыг шинжилж байна");

  const form = $("#document-form");
  try {
    const response = await fetch("/api/analyze-competencies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.elements.title.value.trim(),
        organization: form.elements.organization.value.trim(),
        year: form.elements.year.value,
        agency: form.elements.agency.value,
        version: form.elements.version.value.trim(),
        programName: programContext.name,
        programLevel: programContext.levelLabel,
        targetGroup: programContext.targetGroup,
        sourceText: text
      })
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || "AI шинжилгээ амжилтгүй боллоо.");

    pendingAiAnalysis = result.analysis;
    $("#candidate-method-label").textContent = "AI САНАЛ · СУДЛААЧИЙН ХЯНАЛТ ШААРДЛАГАТАЙ";
    $("#ai-analysis-error").hidden = true;
    const confidenceScore = { high: 3, medium: 2, low: 1 };
    const confidenceLabel = { high: "AI · Өндөр", medium: "AI · Дунд", low: "AI · Бага" };
    pendingDocumentCompetencies = (result.analysis.competencies || []).map((competency) => ({
      id: `${competency.category}-${normalizeKey(competency.name)}`,
      category: competency.category,
      name: competency.name,
      description: competency.description,
      score: confidenceScore[competency.confidence] || 1,
      confidence: confidenceLabel[competency.confidence] || "AI санал",
      keywords: competency.keywords || [],
      evidence: competency.evidence_quote,
      evidenceType: competency.evidence_type,
      rationale: competency.rationale,
      programRelevance: competency.program_relevance,
      suggestedOutcome: competency.suggested_learning_outcome,
      manual: false,
      source: "openai"
    }));

    renderAiSummary(result.analysis);
    renderCandidates();
    $("#candidate-panel").hidden = false;
    $("#coding-confirmed").checked = false;
    $("#candidate-panel").scrollIntoView({ behavior: "smooth", block: "start" });
    showToast(`${pendingDocumentCompetencies.length} чадамжийн AI санал гарлаа`);
  } catch (error) {
    pendingAiAnalysis = null;
    pendingDocumentCompetencies = [];
    $("#candidate-panel").hidden = false;
    $("#ai-result-summary").hidden = true;
    $("#ai-analysis-error").textContent = error.message || "AI шинжилгээний алдаа гарлаа";
    $("#ai-analysis-error").hidden = false;
    renderCandidates();
    showToast(error.message || "AI шинжилгээний алдаа гарлаа");
  } finally {
    button.disabled = false;
    button.classList.remove("loading");
    buttonLabel.textContent = "Нарийвчилсан шинжилгээ";
  }
}

function renderAiSummary(analysis) {
  const summary = $("#ai-result-summary");
  $("#ai-document-summary").textContent = analysis.document_summary || "Товч утга ирсэнгүй.";
  const limitations = Array.isArray(analysis.analysis_limitations) ? analysis.analysis_limitations : [];
  $("#ai-limitations").innerHTML = limitations.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  $("#ai-limitations-wrap").hidden = limitations.length === 0;
  summary.hidden = false;
}

function countOccurrences(text, phrase) {
  const normalized = text.toLocaleLowerCase("mn");
  const needle = phrase.toLocaleLowerCase("mn");
  let count = 0;
  let position = 0;
  while ((position = normalized.indexOf(needle, position)) !== -1) {
    count += 1;
    position += needle.length;
  }
  return count;
}

function findEvidenceSentence(text, keywords) {
  const clauses = text.match(/[^.!?\n]+(?:[.!?]+|$)/g)?.map((clause) => clause.trim()).filter(Boolean) || [];
  const ranked = clauses.map((clause) => ({
    clause,
    hits: keywords.reduce((sum, keyword) => sum + countOccurrences(clause, keyword), 0)
  })).filter((item) => item.hits > 0)
    .sort((left, right) => right.hits - left.hits || left.clause.length - right.clause.length);
  const evidence = ranked[0]?.clause;
  return evidence ? `${evidence.slice(0, 300)}${evidence.length > 300 ? "…" : ""}` : "Эх текстээс шууд нотлох заалт олдсонгүй — судлаач нөхөж шалгана.";
}

function renderCandidates() {
  $("#candidate-count").textContent = pendingDocumentCompetencies.length;
  const list = $("#candidate-list");
  if (!pendingDocumentCompetencies.length) {
    list.innerHTML = `<div class="empty-state">Ойлголт ба хийх үйлдэл хамт илэрсэн хангалттай бүтэн өгүүлбэр олдсонгүй. Эх заалтыг дахин шалгах эсвэл чадамжийг гараар нэмнэ үү.</div>`;
    return;
  }
  list.innerHTML = pendingDocumentCompetencies.map((item, index) => `
    <label class="candidate-item">
      <input type="checkbox" data-candidate-index="${index}" checked>
      <div>
        <strong>${escapeHtml(item.name)}</strong>
        <small>${escapeHtml(item.description)} · Түлхүүр үг: ${escapeHtml(item.keywords.join(", ") || "гараар нэмсэн")}</small>
        ${item.rationale ? `<p class="candidate-rationale"><b>Үндэслэл:</b> ${escapeHtml(item.rationale)}</p>` : ""}
        ${item.programRelevance ? `<p class="candidate-program-relevance"><b>Хөтөлбөрт хамаарах байдал:</b> ${escapeHtml(item.programRelevance)}</p>` : ""}
        <div class="candidate-evidence"><span>БАРИМТ БИЧГИЙН ЗААЛТ</span><blockquote>“${escapeHtml(item.evidence)}”</blockquote></div>
        ${item.suggestedOutcome ? `<p class="candidate-outcome"><b>Суралцахуйн үр дүн:</b> ${escapeHtml(item.suggestedOutcome)}</p>` : ""}
      </div>
      <span class="confidence-badge">${escapeHtml(item.confidence)}${item.evidenceType ? ` · ${item.evidenceType === "explicit" ? "шууд" : "дам"}` : ""}</span>
    </label>`).join("");
}

function addManualCompetency() {
  const input = $("#manual-competency-name");
  const name = input.value.trim();
  if (!name) return;
  pendingDocumentCompetencies.push({
    id: `manual-${normalizeKey(name)}`,
    name,
    description: "Судлаачийн гараар нэмсэн чадамж",
    score: 1,
    confidence: "Гараар нэмсэн",
    keywords: [],
    evidence: findEvidenceSentence($("#source-text").value, name.split(/\s+/).filter((part) => part.length > 3)),
    manual: true
  });
  input.value = "";
  renderCandidates();
}

function handleDocumentAnalysis(event) {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  if ($("#candidate-panel").hidden || !pendingDocumentCompetencies.length) {
    showToast("Эхлээд баримтын текстээс чадамж илрүүлнэ үү");
    return;
  }
  const selected = $$("[data-candidate-index]:checked", $("#candidate-list")).map((checkbox) => pendingDocumentCompetencies[Number(checkbox.dataset.candidateIndex)]).filter(Boolean);
  if (!selected.length) {
    showToast("Дор хаяж нэг чадамж сонгож баталгаажуулна уу");
    return;
  }
  if (!$("#coding-confirmed").checked) {
    showToast("Судлаачийн баталгаажуулалтыг тэмдэглэнэ үү");
    $("#coding-confirmed").focus();
    return;
  }

  const data = new FormData(form);
  state.documents.push({
    id: uid(),
    createdAt: new Date().toISOString(),
    title: data.get("title"),
    organization: data.get("organization"),
    year: data.get("year"),
    programName: data.get("programName"),
    programLevel: data.get("programLevel"),
    targetGroup: data.get("targetGroup"),
    quality: data.get("quality"),
    agency: data.get("agency"),
    url: data.get("url"),
    analyst: data.get("analyst"),
    version: data.get("version"),
    fileName: selectedDocumentFileName || "URL / хуулсан эх текст",
    sourceText: String(data.get("sourceText") || "").slice(0, 120000),
    aiSummary: pendingAiAnalysis?.document_summary || "",
    aiLimitations: pendingAiAnalysis?.analysis_limitations || [],
    competencies: selected.map((item) => ({
      id: item.id,
      category: item.category || "other",
      name: item.name,
      description: item.description,
      score: item.score,
      confidence: item.confidence,
      evidence: item.evidence,
      evidenceType: item.evidenceType || "implicit",
      rationale: item.rationale || "",
      keywords: item.keywords || [],
      programRelevance: item.programRelevance || "",
      suggestedOutcome: item.suggestedOutcome || "",
      source: item.source || "manual",
      manual: item.manual
    }))
  });

  persist("Баримтын шинжилгээ хадгалагдаж, чадамжийн асуулгад нэмэгдлээ");
  form.reset();
  selectedDocumentFileName = "";
  pendingDocumentCompetencies = [];
  pendingAiAnalysis = null;
  $("#file-label").textContent = "PDF эсвэл TXT баримт сонгох";
  $("#extraction-status").hidden = true;
  $("#candidate-panel").hidden = true;
  $("#ai-result-summary").hidden = true;
  $("#ai-analysis-error").hidden = true;
  updateSourceCount();
  updateAnalysisModeUi();
  renderEvidence();
  buildCompetencyTable();
  renderDashboard();
}

function handleDataForm(event, collection, mapper, message) {
  event.preventDefault();
  if (!event.currentTarget.checkValidity()) {
    event.currentTarget.reportValidity();
    return;
  }
  const data = new FormData(event.currentTarget);
  const preservedComparisonContext = collection === "comparisons" ? comparisonContextFromForm(event.currentTarget) : null;
  state[collection].push({ id: uid(), createdAt: new Date().toISOString(), ...mapper(data) });
  persist(message);
  event.currentTarget.reset();
  if (preservedComparisonContext) {
    event.currentTarget.elements.localProgramName.value = preservedComparisonContext.localProgramName;
    event.currentTarget.elements.localProgramLevel.value = preservedComparisonContext.localProgramLevel;
    event.currentTarget.elements.localProgramTargetGroup.value = preservedComparisonContext.localProgramTargetGroup;
  }
  if (collection === "comparisons") comparisonFormEvidence = {};
  renderEvidence();
  renderProgramComparisonDetail();
  renderDashboard();
}

function renderEvidence() {
  renderDocumentEvidence();
  renderAggregatedCompetencies();
  renderFocusGapSummary();
  buildCompetencyTable();
  renderEvidenceList("focus", state.focusGroups, (item) => ({
    title: item.agency,
    detail: `${item.date} · ${item.participants} оролцогч · ${item.facilitator}`,
    tags: ["Фокус бүлэг", programLabel(focusProgramId(item)) || "Мезо"]
  }));
  renderComparisonMatrix();
}

function comparisonProgramId(item) {
  if (item?.programId && (item.programId === "all" || programDefinitions.some((program) => program.id === item.programId))) return item.programId;
  return inferComparisonProgramId(`${item?.program || ""} ${item?.institution || ""} ${item?.competencies || ""}`);
}

function visibleComparisons() {
  return state.comparisons.filter((item) => {
    const programId = comparisonProgramId(item);
    return selectedComparisonProgramFilter === "all" || programId === "all" || programId === selectedComparisonProgramFilter;
  });
}

function renderComparisonProgramFilters() {
  const buttons = $$("[data-comparison-program]");
  if (!buttons.length) return;
  buttons.forEach((button) => {
    const programId = button.dataset.comparisonProgram || "all";
    const count = programId === "all"
      ? state.comparisons.length
      : state.comparisons.filter((item) => {
          const itemProgram = comparisonProgramId(item);
          return itemProgram === "all" || itemProgram === programId;
        }).length;
    button.classList.toggle("active", programId === selectedComparisonProgramFilter);
    button.disabled = programId !== "all" && count === 0;
    button.innerHTML = `${programId === "all" ? "Бүгд" : programLabel(programId)} <span>${count}</span>`;
  });
}

function comparisonLocalContextLabel(item) {
  const name = item?.localProgramName || "";
  const level = item?.localProgramLevelLabel || programLevelLabel(item?.localProgramLevel || "");
  const target = item?.localProgramTargetGroup || "";
  if (!name && !target && !item?.localProgramLevel) return "";
  return `${name || "Хөтөлбөрийн нэр оруулаагүй"} · ${level || "Түвшин оруулаагүй"} · ${target || "Зорилтот бүлэг оруулаагүй"}`;
}

function renderComparisonContextSummary(items = visibleComparisons()) {
  const container = $("#comparison-context-summary");
  if (!container) return;
  const context = comparisonContextFromForm();
  const contextReady = context.localProgramName || context.localProgramLevel || context.localProgramTargetGroup;
  if (!items.length && !contextReady) {
    container.innerHTML = "";
    return;
  }
  const contextKey = normalizeKey(`${context.localProgramName}-${context.localProgramLevel}-${context.localProgramTargetGroup}`);
  const matchedByCurrentContext = contextKey
    ? items.filter((item) => normalizeKey(`${item.localProgramName || ""}-${item.localProgramLevel || ""}-${item.localProgramTargetGroup || ""}`) === contextKey).length
    : 0;
  const storedContexts = new Set(items.map((item) => comparisonLocalContextLabel(item)).filter(Boolean));
  container.innerHTML = `
    <article class="comparison-context-card">
      <p class="eyebrow">ХАРЬЦУУЛАЛТЫН КОНТЕКСТ</p>
      <h3>${escapeHtml(context.localProgramName || "Сургалтын хөтөлбөрийн мэдээлэл оруулаагүй")}</h3>
      <p><b>Түвшин:</b> ${escapeHtml(context.localProgramLevelLabel || "Сонгоогүй")} · <b>Зорилтот бүлэг:</b> ${escapeHtml(context.localProgramTargetGroup || "Оруулаагүй")}</p>
      <p>Матриц дахь олон улсын хөтөлбөрүүдийг энэ самбарын мэдээлэлтэй холбон хадгалж, тухайн хөтөлбөрт хамаарах харьцуулалтын нотолгоо болгон ангилна.</p>
      <div class="comparison-context-stats">
        <span>${items.length} харьцуулах хөтөлбөр</span>
        <span>${storedContexts.size || 0} хөтөлбөрийн контекст</span>
        ${contextKey ? `<span>${matchedByCurrentContext} нь одоогийн самбартай таарч байна</span>` : ""}
      </div>
    </article>`;
}

function comparisonCompetencies(item) {
  return splitFocusGapItems(item.competencies).map(cleanCompetencyName).filter(Boolean);
}

function renderComparisonMatrix() {
  $("#comparison-count").textContent = state.comparisons.length;
  renderComparisonProgramFilters();
  const list = $("#comparison-list");
  const items = visibleComparisons();
  renderComparisonContextSummary(items);
  if (!items.length) {
    list.innerHTML = `<div class="empty-state">Бүртгэл хараахан үүсээгүй.</div>`;
    return;
  }
  const allCompetencies = [...new Set(items.flatMap(comparisonCompetencies))].slice(0, 14);
  list.innerHTML = `
    <div class="comparison-matrix">
      <div class="comparison-matrix-head">
        <span>Хөтөлбөр</span><span>Кредит</span><span>Хэлбэр</span><span>Хугацаа</span><span>Багшийн шаардлага</span><span>Чадамжийн харьцуулалт</span><span></span>
      </div>
      ${items.slice().reverse().map((item) => {
        const competencies = comparisonCompetencies(item);
        const competencySet = new Set(competencies.map((value) => surveyCompetencyKey(value)));
        return `<article class="comparison-matrix-row">
          <div>
            <strong>${escapeHtml(item.program || "Хөтөлбөрийн нэргүй")}</strong>
            <small>${escapeHtml(item.institution || "—")} · ${escapeHtml(item.country || "—")} · ${escapeHtml(programLabel(comparisonProgramId(item)) || "Нийтлэг")}</small>
            ${comparisonLocalContextLabel(item) ? `<p class="document-program-context"><b>Хамааруулах хөтөлбөр:</b> ${escapeHtml(comparisonLocalContextLabel(item))}</p>` : `<p class="document-program-context"><b>Хамааруулах хөтөлбөр:</b> Контекстгүй хуучин бүртгэл</p>`}
          </div>
          <span title="${escapeHtml(sourceEvidenceLabel(item.sourceEvidence?.credits) || "")}">${escapeHtml(item.credits || "—")}</span>
          <span title="${escapeHtml(sourceEvidenceLabel(item.sourceEvidence?.format) || "")}">${escapeHtml(item.format || "—")}</span>
          <span title="${escapeHtml(sourceEvidenceLabel(item.sourceEvidence?.duration) || "")}">${escapeHtml(item.duration || "—")}</span>
          <span title="${escapeHtml(sourceEvidenceLabel(item.sourceEvidence?.teacherRequirements) || "")}">${escapeHtml(item.teacherRequirements || "—")}</span>
          <div class="comparison-competency-grid">
            ${allCompetencies.map((competency) => {
              const key = surveyCompetencyKey(competency);
              return `<span class="${competencySet.has(key) ? "matched" : ""}">${competencySet.has(key) ? "✓" : "—"} ${escapeHtml(competency)}</span>`;
            }).join("")}
          </div>
          <button class="delete-item" type="button" data-delete="comparison" data-id="${item.id}">Устгах</button>
        </article>`;
      }).join("")}
    </div>`;
}

function focusProgramId(item) {
  if (item?.programId && programDefinitions.some((program) => program.id === item.programId)) return item.programId;
  const agency = String(item?.agency || "").toLocaleLowerCase("mn");
  if (agency.includes("цагдаа")) return "police";
  if (agency.includes("хил")) return "border";
  if (agency.includes("шүүх") || agency.includes("шийдвэр")) return "corrections";
  if (agency.includes("онцгой")) return "emergency";
  return "";
}

function renderFocusGapSummary() {
  const container = $("#focus-gap-summary");
  if (!container) return;
  const visibleFocusGroups = state.focusGroups.filter((item) => isProgramAllowed(focusProgramId(item)) && isAgencyAllowed(item.agency));
  if (!visibleFocusGroups.length) {
    container.innerHTML = `<div class="empty-state">Фокус бүлгийн ярилцлагын дутагдалтай чадамж бүртгэгдээгүй байна.</div>`;
    return;
  }
  const grouped = new Map();
  visibleFocusGroups.forEach((item) => {
    const programId = focusProgramId(item) || "other";
    if (!grouped.has(programId)) {
      grouped.set(programId, {
        programId,
        programName: programLabel(programId) || "Тодорхойгүй хөтөлбөр",
        records: 0,
        gaps: new Map()
      });
    }
    const group = grouped.get(programId);
    group.records += 1;
    splitFocusGapItems(item.gaps).forEach((gap) => {
      const key = normalizeKey(gap);
      if (!key) return;
      if (!group.gaps.has(key)) {
        group.gaps.set(key, { name: gap, count: 0, agencies: new Set(), evidence: [] });
      }
      const summary = group.gaps.get(key);
      summary.count += 1;
      if (item.agency) summary.agencies.add(item.agency);
      if (item.evidence) summary.evidence.push(item.evidence);
    });
  });
  const groups = [...grouped.values()].sort((left, right) => left.programName.localeCompare(right.programName, "mn"));
  container.innerHTML = `
    <div class="focus-summary-head">
      <div>
        <p class="eyebrow">ХӨТӨЛБӨРӨӨР НЭГТГЭСЭН</p>
        <h3>Дутагдалтай чадамжийн жагсаалт</h3>
      </div>
      <span>${visibleFocusGroups.length} ярилцлага</span>
    </div>
    <div class="focus-program-gaps">
      ${groups.map((group) => renderFocusGapProgram(group)).join("")}
    </div>`;
}

function renderFocusGapProgram(group) {
  const gaps = [...group.gaps.values()]
    .sort((left, right) => right.count - left.count || left.name.localeCompare(right.name, "mn"))
    .slice(0, 10);
  return `<article class="focus-program-card">
    <header>
      <div>
        <strong>${escapeHtml(group.programName)}</strong>
        <small>${group.records} фокус бүлгийн тэмдэглэл</small>
      </div>
      <span>${gaps.length}</span>
    </header>
    ${gaps.length ? `<ol class="focus-gap-list">
      ${gaps.map((gap) => `<li>
        <b>${escapeHtml(gap.name)}</b>
        <small>${gap.count} удаа дурдсан · ${escapeHtml([...gap.agencies].join(", ") || "байгууллага тодорхойгүй")}</small>
      </li>`).join("")}
    </ol>` : `<div class="empty-state">Дутагдалтай чадамжийн кодчилол ороогүй байна.</div>`}
  </article>`;
}

function splitFocusGapItems(text) {
  return String(text || "")
    .split(/\r?\n|;|•|·|\d+\.\s+/)
    .map((item) => item.replace(/^[-–—*,\s]+/, "").replace(/\s+/g, " ").trim())
    .filter((item) => item.length >= 3);
}

function renderDocumentEvidence() {
  const documents = visibleDocuments();
  $("#document-count").textContent = documents.length;
  const list = $("#document-list");
  if (!documents.length) {
    list.innerHTML = `<div class="empty-state">Танд харах эрхтэй хөтөлбөрт хамаарах шинжилсэн баримт хараахан алга.</div>`;
    return;
  }
  list.innerHTML = documents.slice().reverse().map((item) => `
    <article class="evidence-item">
      <header>
        <h3>${escapeHtml(item.title)}</h3>
        <button class="delete-item" type="button" data-delete="document" data-id="${item.id}">Устгах</button>
      </header>
      <p>${escapeHtml(item.organization)} · ${escapeHtml(item.year)} · Судлаач: ${escapeHtml(item.analyst || "—")}</p>
      ${item.programName ? `<p class="document-program-context"><b>${escapeHtml(item.programName)}</b> · ${escapeHtml(programLevelLabel(item.programLevel))} · ${escapeHtml(item.targetGroup || "Зорилтот бүлэг оруулаагүй")}</p>` : ""}
      <div class="evidence-meta">
        <span>${escapeHtml(qualityLabel(item.quality))}</span><span>${escapeHtml(item.agency)}</span><span>${escapeHtml(item.fileName || "Эх текст")}</span>
      </div>
      <div class="competency-chips">
        ${(item.competencies || []).map((competency) => `<span class="competency-chip">${escapeHtml(competency.name)}</span>`).join("") || `<span class="competency-chip">Чадамж кодлоогүй хуучин бүртгэл</span>`}
      </div>
    </article>`).join("");
}

function availableDocumentAgencies() {
  return [...new Set(visibleDocuments().map((item) => item.agency).filter(Boolean))].sort((left, right) => left.localeCompare(right, "mn"));
}

function renderCompetencyAgencyFilter() {
  const filter = $("#competency-agency-filter");
  const previousValue = filter.value;
  const agencies = availableDocumentAgencies();
  filter.innerHTML = [
    `<option value="">Бүх байгууллага</option>`,
    ...agencies.map((agency) => `<option value="${escapeHtml(agency)}">${escapeHtml(agency)}</option>`)
  ].join("");
  filter.value = agencies.includes(previousValue) ? previousValue : "";
  return filter.value;
}

function aggregateDocumentCompetencies(agency = "") {
  const aggregated = new Map();
  visibleDocuments().filter((documentItem) => !agency || documentItem.agency === agency).forEach((documentItem) => {
    (documentItem.competencies || []).forEach((competency) => {
      const key = competency.id || normalizeKey(competency.name);
      if (!aggregated.has(key)) {
        aggregated.set(key, {
          id: key,
          name: competency.name,
          description: competency.description || "",
          documents: new Set(),
          agencies: new Set(),
          programs: new Set(),
          evidence: [],
          keywords: new Set(),
          signalScore: 0
        });
      }
      const item = aggregated.get(key);
      item.documents.add(documentItem.id);
      item.agencies.add(documentItem.agency);
      const documentProgramId = documentItem.programId || programByAgency(documentItem.agency)?.id || "";
      if (documentProgramId) item.programs.add(documentProgramId);
      item.signalScore += Number(competency.score) || 1;
      coverageKeywordsForCompetency(competency).forEach((keyword) => item.keywords.add(keyword));
      if (competency.evidence) item.evidence.push({ document: documentItem.title, quote: competency.evidence });
    });
  });
  return [...aggregated.values()].map((item) => ({
    ...item,
    documentCount: item.documents.size,
    agencyCount: item.agencies.size,
    agencies: [...item.agencies],
    programIds: [...item.programs],
    keywords: [...item.keywords]
  })).sort((a, b) => b.documentCount - a.documentCount || b.agencyCount - a.agencyCount || b.signalScore - a.signalScore || a.name.localeCompare(b.name, "mn"));
}

function coverageKeywordsForCompetency(competency) {
  const categoryToCatalog = {
    strategic_thinking: "systems",
    policy_legal: "policy",
    decision_making: "decision",
    risk_crisis: "crisis",
    collaboration: "coordination",
    data_evidence: "evidence",
    digital_technology: "digital",
    change_innovation: "change",
    ethics_accountability: "ethics",
    people_leadership: "people",
    communication: "communication",
    performance_management: "performance"
  };
  const catalogId = categoryToCatalog[competency.category] || competency.id;
  const catalog = documentCompetencyCatalog.find((item) => item.id === catalogId || item.name === competency.name);
  return [...new Set([...(competency.keywords || []), ...(catalog?.keywords || [])])];
}

function competencyProgramMatch(programIds, programId = selectedSurveyProgramFilter) {
  if (programId === "all") return true;
  const ids = normalizeSurveyProgramIds(programIds);
  return ids.length === 0 || ids.includes(programId);
}

function competenciesForCoverageComparison(agency = "", programId = selectedSurveyProgramFilter) {
  const merged = new Map();
  aggregateDocumentCompetencies(agency).forEach((item) => {
    merged.set(item.id || surveyCompetencyKey(item.name), {
      id: item.id || surveyCompetencyKey(item.name),
      name: item.name,
      description: item.description || `${item.documentCount} баримтын нотолгоотой чадамж`,
      keywords: item.keywords || [],
      programIds: item.programIds || []
    });
  });
  surveyCompetencies().forEach((item) => {
    const key = item.id || surveyCompetencyKey(item.name);
    if (!key || merged.has(key)) return;
    const catalog = documentCompetencyCatalog.find((catalogItem) => catalogItem.id === item.id || catalogItem.name === item.name);
    merged.set(key, {
      id: key,
      name: item.name,
      description: item.detail || item.description || "",
      keywords: [...new Set([...(item.keywords || []), ...(catalog?.keywords || [])])],
      programIds: item.programIds || []
    });
  });
  return [...merged.values()]
    .filter((item) => competencyProgramMatch(item.programIds, programId))
    .sort((left, right) => left.name.localeCompare(right.name, "mn"));
}

function renderAggregatedCompetencies() {
  const selectedAgency = renderCompetencyAgencyFilter();
  const aggregated = aggregateDocumentCompetencies(selectedAgency);
  $("#competency-count").textContent = aggregated.length;
  $("#aggregation-rule-text").textContent = selectedAgency
    ? `${selectedAgency} байгууллагад хамаарах баримтуудын чадамжийг давтамж, нотолгооны хүчээр эрэмбэлэв.`
    : "Олон баримтад давтагдсан, олон байгууллагад хамаарсан чадамжийг эхэнд эрэмбэлнэ.";
  const list = $("#aggregated-competency-list");
  if (!aggregated.length) {
    list.innerHTML = `<div class="empty-state">${selectedAgency ? `${escapeHtml(selectedAgency)} байгууллагын` : "Баримтуудаас"} баталгаажуулсан чадамж хараахан алга.</div>`;
    if (curriculumCoverageText) void analyzeCurriculumCoverage(true);
    if (learningOutcomeCoverageText) void analyzeLearningOutcomeCoverage(true);
    return;
  }
  const maxDocuments = Math.max(...aggregated.map((item) => item.documentCount), 1);
  list.innerHTML = aggregated.map((item, index) => `
    <article class="aggregate-item">
      <div class="aggregate-rank">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <div>
          <strong>${escapeHtml(item.name)}</strong>
          <small>${item.documentCount} баримт · ${item.agencyCount} байгууллагын чиглэл · ${escapeHtml(item.agencies.join(", "))}</small>
        </div>
      </div>
      <div class="aggregate-score">
        <i style="--score:${item.documentCount / maxDocuments * 100}%"></i>
        <span>${item.documentCount}×</span>
      </div>
    </article>`).join("");
  if (curriculumCoverageText) void analyzeCurriculumCoverage(true);
  if (learningOutcomeCoverageText) void analyzeLearningOutcomeCoverage(true);
}

async function handleCurriculumCoverageFile(event) {
  const file = event.target.files?.[0];
  curriculumCoverageFileName = file?.name || "";
  $("#curriculum-coverage-file-label").textContent = file ? file.name : "PDF эсвэл TXT хөтөлбөр сонгох";
  if (!file) return;

  const status = $("#curriculum-coverage-status");
  status.hidden = false;
  status.classList.remove("error");
  status.textContent = `${file.name} файлын текстийг уншиж байна…`;
  try {
    const text = await extractDocumentText(file, (message) => {
      status.textContent = message;
    });
    if (text.trim().length < 40) {
      status.classList.add("error");
      status.textContent = "Уншигдах хөтөлбөрийн текст илэрсэнгүй. OCR хийсэн файл ашиглах эсвэл текстийг доорх талбарт хуулна уу.";
      return;
    }
    $("#curriculum-coverage-text").value = text.slice(0, 120000);
    updateCurriculumCoverageCount();
    status.textContent = `${file.name}: ${text.length.toLocaleString()} тэмдэгт задаллаа. Чадамжийн хамрах байдлыг тооцож байна.`;
    await analyzeCurriculumCoverage();
    status.textContent = `${file.name}: ${text.length.toLocaleString()} тэмдэгт задалж, ${curriculumCoverageResults.length} чадамжийн хамрах байдлыг шалгалаа.`;
  } catch (error) {
    status.classList.add("error");
    status.textContent = `Хөтөлбөрийн файлыг унших боломжгүй: ${error.message}. Текстийг гараар хуулна уу.`;
  }
}

function updateCurriculumCoverageCount() {
  $("#curriculum-coverage-char-count").textContent = $("#curriculum-coverage-text").value.length.toLocaleString();
}

async function analyzeCurriculumCoverage(silent = false) {
  const text = $("#curriculum-coverage-text").value.trim();
  const agency = $("#competency-agency-filter").value;
  const aggregated = aggregateDocumentCompetencies(agency);
  if (text.length < 40) {
    if (!silent) {
      showToast("Хөтөлбөрийн текстийг дор хаяж 40 тэмдэгтээр оруулна уу");
      $("#curriculum-coverage-text").focus();
    }
    return;
  }
  if (!aggregated.length) {
    curriculumCoverageText = text;
    curriculumCoverageResults = [];
    renderCurriculumCoverageResults([]);
    if (!silent) showToast("Харьцуулах баталгаажсан чадамж алга");
    return;
  }

  const runId = ++curriculumCoverageRunId;
  const button = $("#analyze-curriculum-coverage");
  if (!silent) {
    button.disabled = true;
    button.textContent = "Харьцуулж байна…";
  }
  try {
    const { analyzeCompetencyCoverage } = await import("./coverage-analysis.mjs?v=20260706-sentence2");
    const results = analyzeCompetencyCoverage({ competencies: aggregated, text });
    if (runId !== curriculumCoverageRunId) return;
    curriculumCoverageText = text;
    curriculumCoverageResults = results;
    renderCurriculumCoverageResults(results);
    if (!silent) showToast(`${results.length} чадамжийн хамрах байдлыг шалгалаа`);
  } catch (error) {
    if (!silent) showToast(error.message || "Хөтөлбөрийн хамрах байдлыг шинжилж чадсангүй");
  } finally {
    if (!silent) {
      button.disabled = false;
      button.textContent = "Хамрах байдлыг шалгах";
    }
  }
}

function renderCurriculumCoverageResults(results) {
  const summary = $("#coverage-summary");
  const caution = $("#coverage-caution");
  const exportButton = $("#export-curriculum-coverage");
  const list = $("#coverage-results");
  const counts = {
    covered: results.filter((item) => item.status === "covered").length,
    partial: results.filter((item) => item.status === "partial").length,
    missing: results.filter((item) => item.status === "missing").length
  };
  $("#coverage-covered-count").textContent = counts.covered;
  $("#coverage-partial-count").textContent = counts.partial;
  $("#coverage-missing-count").textContent = counts.missing;
  summary.hidden = results.length === 0;
  caution.hidden = results.length === 0;
  exportButton.hidden = results.length === 0;
  if (!results.length) {
    list.innerHTML = curriculumCoverageText
      ? `<div class="empty-state">Сонгосон байгууллагад харьцуулах баталгаажсан чадамж алга.</div>`
      : "";
    return;
  }

  const labels = { covered: "Тусгасан", partial: "Хэсэгчлэн", missing: "Илрээгүй" };
  const order = { missing: 0, partial: 1, covered: 2 };
  list.innerHTML = results.slice().sort((left, right) => order[left.status] - order[right.status] || left.name.localeCompare(right.name, "mn")).map((item) => `
    <article class="coverage-result ${item.status}">
      <div class="coverage-result-head">
        <strong>${escapeHtml(item.name)}</strong>
        <span class="coverage-status">${labels[item.status]}</span>
      </div>
      <p>${escapeHtml(item.rationale)}${item.matchedTerms.length ? ` · Таарсан үг: ${escapeHtml(item.matchedTerms.join(", "))}` : ""}</p>
      ${item.evidence ? `<div class="coverage-evidence"><b>ХӨТӨЛБӨРИЙН ЗААЛТ</b>“${escapeHtml(item.evidence)}”</div>` : ""}
    </article>`).join("");
}

function updateLearningOutcomeCount() {
  const text = $("#learning-outcome-text").value;
  $("#learning-outcome-char-count").textContent = text.length.toLocaleString();
  if (text !== learningOutcomeCoverageText) {
    learningOutcomeCoverageText = text;
    learningOutcomeCoverageResults = [];
    state.learningOutcomeCoverage = {
      ...(state.learningOutcomeCoverage || {}),
      text,
      results: [],
      programFilter: selectedSurveyProgramFilter,
      sourceFilter: selectedSurveySourceFilter,
      agencyFilter: $("#competency-agency-filter")?.value || "",
      updatedAt: new Date().toISOString()
    };
    saveLocalState();
    queueSharedStateSave();
    renderLearningOutcomeCoverageResults([]);
    updateLearningOutcomeSaveStatus();
  }
}

function updateLearningOutcomeSaveStatus() {
  const status = $("#learning-outcome-save-status");
  if (!status) return;
  const saved = state.learningOutcomeCoverage || {};
  if (!saved.text && !saved.results?.length) {
    status.textContent = "Оруулсан өгөгдөл болон үр дүн хадгалагдаагүй байна.";
    return;
  }
  const resultText = saved.results?.length ? `${saved.results.length} үр дүн хадгалагдсан` : "үр дүн хараахан үүсээгүй";
  const programText = saved.programFilter === "all" ? "Бүх хөтөлбөр" : programLabel(saved.programFilter);
  const dateText = saved.updatedAt ? new Date(saved.updatedAt).toLocaleString("mn-MN") : "огноо тодорхойгүй";
  status.textContent = `Хадгалсан: ${dateText} · ${programText} · ${resultText}`;
}

function saveLearningOutcomeCoverage(results = learningOutcomeCoverageResults, text = learningOutcomeCoverageText, silent = false) {
  state.learningOutcomeCoverage = {
    text,
    results,
    programFilter: selectedSurveyProgramFilter,
    sourceFilter: selectedSurveySourceFilter,
    agencyFilter: $("#competency-agency-filter")?.value || "",
    updatedAt: new Date().toISOString()
  };
  learningOutcomeCoverageText = text;
  learningOutcomeCoverageResults = results;
  updateLearningOutcomeSaveStatus();
  if (silent) {
    saveLocalState();
    queueSharedStateSave();
  } else {
    persist("Суралцахуйн үр дүнгийн харьцуулалт хадгалагдлаа");
  }
}

function restoreLearningOutcomeCoverage() {
  const saved = state.learningOutcomeCoverage || {};
  const text = String(saved.text || "");
  const results = Array.isArray(saved.results) ? saved.results : [];
  learningOutcomeCoverageText = text;
  learningOutcomeCoverageResults = results;
  if (saved.programFilter && (saved.programFilter === "all" || programDefinitions.some((program) => program.id === saved.programFilter))) {
    selectedSurveyProgramFilter = saved.programFilter;
  }
  if (saved.sourceFilter) selectedSurveySourceFilter = saved.sourceFilter;
  const textarea = $("#learning-outcome-text");
  if (textarea) textarea.value = text;
  const agencyFilter = $("#competency-agency-filter");
  if (agencyFilter && saved.agencyFilter) agencyFilter.value = saved.agencyFilter;
  updateLearningOutcomeCount();
  renderLearningOutcomeCoverageResults(results);
  updateLearningOutcomeSaveStatus();
}

async function analyzeLearningOutcomeCoverage(silent = false) {
  const text = $("#learning-outcome-text").value.trim();
  const agency = $("#competency-agency-filter").value;
  const competencies = competenciesForCoverageComparison(agency, selectedSurveyProgramFilter);
  if (text.length < 20) {
    if (!silent) {
      showToast("Суралцахуйн үр дүнг дор хаяж 20 тэмдэгтээр оруулна уу");
      $("#learning-outcome-text").focus();
    }
    return;
  }
  if (!competencies.length) {
    learningOutcomeCoverageText = text;
    learningOutcomeCoverageResults = [];
    saveLearningOutcomeCoverage([], text, silent);
    renderLearningOutcomeCoverageResults([]);
    if (!silent) showToast("Харьцуулах чадамжийн жагсаалт хараахан алга");
    return;
  }

  const runId = ++learningOutcomeCoverageRunId;
  const button = $("#analyze-learning-outcomes");
  if (!silent) {
    button.disabled = true;
    button.textContent = "Харьцуулж байна…";
  }
  try {
    const { analyzeCompetencyCoverage } = await import("./coverage-analysis.mjs?v=20260706-sentence2");
    const results = analyzeCompetencyCoverage({ competencies, text });
    if (runId !== learningOutcomeCoverageRunId) return;
    learningOutcomeCoverageText = text;
    learningOutcomeCoverageResults = results;
    saveLearningOutcomeCoverage(results, text, silent);
    renderLearningOutcomeCoverageResults(results);
    if (!silent) showToast(`${results.length} чадамжийг суралцахуйн үр дүнтэй харьцууллаа`);
  } catch (error) {
    if (!silent) showToast(error.message || "Суралцахуйн үр дүнг харьцуулж чадсангүй");
  } finally {
    if (!silent) {
      button.disabled = false;
      button.textContent = "Суралцахуйн үр дүнг харьцуулах";
    }
  }
}

function renderLearningOutcomeCoverageResults(results) {
  const summary = $("#learning-outcome-summary");
  const caution = $("#learning-outcome-caution");
  const exportButton = $("#export-learning-outcome-coverage");
  const list = $("#learning-outcome-results");
  const counts = {
    covered: results.filter((item) => item.status === "covered").length,
    partial: results.filter((item) => item.status === "partial").length,
    missing: results.filter((item) => item.status === "missing").length
  };
  $("#learning-outcome-covered-count").textContent = counts.covered;
  $("#learning-outcome-partial-count").textContent = counts.partial;
  $("#learning-outcome-missing-count").textContent = counts.missing;
  summary.hidden = results.length === 0;
  caution.hidden = results.length === 0;
  exportButton.hidden = results.length === 0;
  if (!results.length) {
    list.innerHTML = learningOutcomeCoverageText
      ? `<div class="empty-state">Сонгосон шүүлтүүрт харьцуулах чадамжийн жагсаалт алга.</div>`
      : "";
    return;
  }

  const labels = { covered: "Тусгасан", partial: "Хэсэгчлэн", missing: "Илрээгүй" };
  const order = { missing: 0, partial: 1, covered: 2 };
  list.innerHTML = results.slice().sort((left, right) => order[left.status] - order[right.status] || left.name.localeCompare(right.name, "mn")).map((item) => `
    <article class="coverage-result ${item.status}">
      <div class="coverage-result-head">
        <strong>${escapeHtml(item.name)}</strong>
        <span class="coverage-status">${labels[item.status]}</span>
      </div>
      <p>${escapeHtml(item.rationale)}${item.matchedTerms.length ? ` · Таарсан ойлголт: ${escapeHtml(item.matchedTerms.join(", "))}` : ""}</p>
      ${item.evidence ? `<div class="coverage-evidence"><b>СУРАЛЦАХУЙН ҮР ДҮНГИЙН ӨГҮҮЛБЭР</b>“${escapeHtml(item.evidence)}”</div>` : ""}
    </article>`).join("");
}

function exportCurriculumCoverageCsv() {
  if (!curriculumCoverageResults.length) {
    showToast("Экспортлох хамрах байдлын үр дүн алга");
    return;
  }
  const agency = $("#competency-agency-filter").value || "Бүх байгууллага";
  const labels = { covered: "Тусгасан", partial: "Хэсэгчлэн", missing: "Илрээгүй" };
  const rows = curriculumCoverageResults.map((item) => [
    curriculumCoverageFileName || "Хуулсан текст",
    agency,
    item.name,
    labels[item.status],
    item.matchedTerms.join("; "),
    item.rationale,
    item.evidence
  ]);
  const headers = ["curriculum", "agency_filter", "competency", "coverage_status", "matched_terms", "rationale", "curriculum_evidence"];
  const csv = "\uFEFF" + [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n");
  downloadBlob(csv, "text/csv;charset=utf-8", `curriculum-coverage-${dateStamp()}.csv`);
}

function exportLearningOutcomeCoverageCsv() {
  if (!learningOutcomeCoverageResults.length) {
    showToast("Экспортлох суралцахуйн үр дүнгийн харьцуулалт алга");
    return;
  }
  const program = selectedSurveyProgramFilter === "all" ? "Бүх хөтөлбөр" : programLabel(selectedSurveyProgramFilter);
  const labels = { covered: "Тусгасан", partial: "Хэсэгчлэн", missing: "Илрээгүй" };
  const rows = learningOutcomeCoverageResults.map((item) => [
    program,
    item.name,
    labels[item.status],
    item.matchedTerms.join("; "),
    item.rationale,
    item.evidence
  ]);
  const headers = ["program_filter", "competency", "learning_outcome_coverage_status", "matched_terms", "rationale", "learning_outcome_evidence"];
  const csv = "\uFEFF" + [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n");
  downloadBlob(csv, "text/csv;charset=utf-8", `learning-outcome-coverage-${dateStamp()}.csv`);
}

function renderEvidenceList(prefix, items, projector) {
  $(`#${prefix}-count`).textContent = items.length;
  const list = $(`#${prefix}-list`);
  if (!items.length) {
    list.innerHTML = `<div class="empty-state">Бүртгэл хараахан үүсээгүй.</div>`;
    return;
  }
  list.innerHTML = items.slice().reverse().map((item) => {
    const view = projector(item);
    return `<article class="evidence-item">
      <header><h3>${escapeHtml(view.title)}</h3><button class="delete-item" type="button" data-delete="${prefix}" data-id="${item.id}">Устгах</button></header>
      <p>${escapeHtml(view.detail)}</p>
      <div class="evidence-meta">${view.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
    </article>`;
  }).join("");
}

function qualityLabel(value) { return value === "official" ? "Албан ёсны" : "Хянан магадалсан"; }
function programLevelLabel(value) {
  const labels = {
    certificate: "Богино хугацааны / сертификат",
    bachelor: "Бакалавр",
    master: "Магистр",
    doctorate: "Доктор",
    professional: "Мэргэжил дээшлүүлэх",
    other: "Бусад"
  };
  return labels[value] || value || "Түвшин оруулаагүй";
}

function deleteEvidence(prefix, id) {
  const map = { document: "documents", focus: "focusGroups", comparison: "comparisons", localProgram: "localPrograms" };
  const collection = map[prefix];
  if (!collection) return;
  state[collection] = state[collection].filter((item) => item.id !== id);
  persist("Бүртгэл устгагдлаа");
  renderEvidence();
  renderProgramComparisonDetail();
  buildCompetencyTable();
  renderDashboard();
}

function selectedComparisonDetailProgram() {
  const value = $("#comparison-detail-program-filter")?.value || "all";
  if (value === "all") return "all";
  return isProgramAllowed(value) ? value : "all";
}

function visibleLocalPrograms() {
  const selected = selectedComparisonDetailProgram();
  return (state.localPrograms || []).filter((item) => {
    const programId = item.programId || "";
    return isProgramAllowed(programId) && (selected === "all" || programId === selected);
  });
}

function visibleComparisonDetailItems() {
  const selected = selectedComparisonDetailProgram();
  return state.comparisons.filter((item) => {
    const programId = comparisonProgramId(item);
    return programDefinitions.some((program) => program.id === programId)
      && isProgramAllowed(programId)
      && (selected === "all" || programId === selected);
  });
}

function programComparisonMetrics(localProgram, comparisons) {
  const localCompetencies = splitFocusGapItems(localProgram?.competencies || "").map(cleanCompetencyName).filter(Boolean);
  const localKeys = new Set(localCompetencies.map(surveyCompetencyKey));
  const internationalCompetencies = [...new Set(comparisons.flatMap(comparisonCompetencies))];
  const internationalKeys = new Set(internationalCompetencies.map(surveyCompetencyKey));
  const matched = internationalCompetencies.filter((item) => localKeys.has(surveyCompetencyKey(item)));
  const missing = internationalCompetencies.filter((item) => !localKeys.has(surveyCompetencyKey(item)));
  const localOnly = localCompetencies.filter((item) => !internationalKeys.has(surveyCompetencyKey(item)));
  return {
    localCompetencies,
    internationalCompetencies,
    matched,
    missing,
    localOnly,
    matchRate: internationalCompetencies.length ? Math.round(matched.length / internationalCompetencies.length * 100) : 0
  };
}

function renderLocalProgramList(items = visibleLocalPrograms()) {
  const count = $("#local-program-count");
  const list = $("#local-program-list");
  if (count) count.textContent = items.length;
  if (!list) return;
  if (!items.length) {
    list.innerHTML = `<div class="empty-state">Монголын хөтөлбөр хараахан бүртгээгүй байна.</div>`;
    return;
  }
  list.innerHTML = items.slice().reverse().map((item) => `
    <article class="evidence-item">
      <header>
        <h3>${escapeHtml(item.name || "Нэргүй хөтөлбөр")}</h3>
        <button class="delete-item" type="button" data-delete="localProgram" data-id="${item.id}">Устгах</button>
      </header>
      <p>${escapeHtml(programLabel(item.programId))} · ${escapeHtml(programLevelLabel(item.level))} · ${escapeHtml(item.credits || "кредит оруулаагүй")}</p>
      <div class="evidence-meta">
        <span>${escapeHtml(item.format || "хэлбэр оруулаагүй")}</span>
        <span>${escapeHtml(item.duration || "хугацаа оруулаагүй")}</span>
        <span>${splitFocusGapItems(item.competencies).length} чадамж</span>
      </div>
    </article>`).join("");
}

function renderProgramComparisonDetail() {
  const summary = $("#comparison-detail-summary");
  const groups = $("#program-comparison-groups");
  if (!summary || !groups) return;
  const selected = selectedComparisonDetailProgram();
  const localPrograms = visibleLocalPrograms();
  const comparisons = visibleComparisonDetailItems();
  renderLocalProgramList(localPrograms);
  const grouped = accessibleProgramDefinitions()
    .filter((program) => selected === "all" || program.id === selected)
    .map((program) => {
      const local = localPrograms.filter((item) => item.programId === program.id);
      const international = comparisons.filter((item) => comparisonProgramId(item) === program.id);
      return { program, local, international };
    })
    .filter((group) => group.local.length || group.international.length);

  summary.innerHTML = `
    <div class="comparison-detail-cards">
      <article><span>Монгол хөтөлбөр</span><strong>${localPrograms.length}</strong><p>гар аргаар баталгаажуулсан бүртгэл</p></article>
      <article><span>Олон улсын хөтөлбөр</span><strong>${comparisons.length}</strong><p>судалгааны хэрэгслээс татсан дата</p></article>
      <article><span>Ангилсан бүлэг</span><strong>${grouped.length}</strong><p>хөтөлбөрөөр харьцуулсан үр дүн</p></article>
    </div>`;

  if (!grouped.length) {
    groups.innerHTML = `<div class="empty-state">Харьцуулах дата хараахан алга. Эхлээд Монголын хөтөлбөр болон олон улсын харьцуулалтын бүртгэл нэмнэ үү.</div>`;
    return;
  }

  groups.innerHTML = grouped.map((group) => {
    const primaryLocal = group.local[0] || {};
    const metrics = programComparisonMetrics(primaryLocal, group.international);
    const uniqueCountries = [...new Set(group.international.map((item) => item.country).filter(Boolean))];
    return `
      <section class="program-comparison-group">
        <header>
          <div>
            <p class="eyebrow">ХӨТӨЛБӨРӨӨР АНГИЛСАН ХАРЬЦУУЛАЛТ</p>
            <h2>${escapeHtml(group.program.name)}</h2>
            <p>${group.local.length} Монгол бүртгэл · ${group.international.length} олон улсын хөтөлбөр · ${uniqueCountries.length} улс</p>
          </div>
          <span>${metrics.matchRate}% давхцал</span>
        </header>
        <div class="program-comparison-two-col">
          <article class="comparison-detail-panel">
            <h3>Монголын хөтөлбөр</h3>
            ${group.local.length ? group.local.map((item) => `
              <div class="comparison-program-card local">
                <strong>${escapeHtml(item.name || "Нэргүй хөтөлбөр")}</strong>
                <small>${escapeHtml(programLevelLabel(item.level))} · ${escapeHtml(item.credits || "кредит —")} · ${escapeHtml(item.duration || "хугацаа —")} · ${escapeHtml(item.format || "хэлбэр —")}</small>
                <p><b>Зорилтот бүлэг:</b> ${escapeHtml(item.targetGroup || "Оруулаагүй")}</p>
                <p><b>Багш:</b> ${escapeHtml(item.teacherRequirements || "Оруулаагүй")}</p>
              </div>`).join("") : `<div class="empty-state compact">Монголын хөтөлбөр бүртгээгүй.</div>`}
          </article>
          <article class="comparison-detail-panel">
            <h3>Олон улсын хөтөлбөрүүд</h3>
            ${group.international.length ? group.international.map((item) => `
              <div class="comparison-program-card">
                <strong>${escapeHtml(item.program || "Хөтөлбөрийн нэргүй")}</strong>
                <small>${escapeHtml(item.country || "улс —")} · ${escapeHtml(item.institution || "байгууллага —")} · ${escapeHtml(item.credits || "кредит —")} · ${escapeHtml(item.duration || "хугацаа —")} · ${escapeHtml(item.format || "хэлбэр —")}</small>
                <p><b>Багш:</b> ${escapeHtml(item.teacherRequirements || "Оруулаагүй")}</p>
              </div>`).join("") : `<div class="empty-state compact">Энэ хөтөлбөрт олон улсын харьцуулалт бүртгээгүй.</div>`}
          </article>
        </div>
        <div class="comparison-detail-panel">
          <h3>Чадамжийн харьцуулалт</h3>
          <div class="comparison-chip-board">
            <div><b>Давхцсан</b>${metrics.matched.map((item) => `<span class="matched">✓ ${escapeHtml(item)}</span>`).join("") || `<small>Давхцал илрээгүй</small>`}</div>
            <div><b>Олон улсад байгаа, Монгол хөтөлбөрт дутуу</b>${metrics.missing.map((item) => `<span class="missing">+ ${escapeHtml(item)}</span>`).join("") || `<small>Дутуу чадамж илрээгүй</small>`}</div>
            <div><b>Монгол хөтөлбөрт байгаа онцлог</b>${metrics.localOnly.map((item) => `<span>${escapeHtml(item)}</span>`).join("") || `<small>Онцлог чадамж оруулаагүй</small>`}</div>
          </div>
        </div>
      </section>`;
  }).join("");
}

function mean(values) {
  const valid = values.filter(Number.isFinite);
  return valid.length ? valid.reduce((sum, value) => sum + value, 0) / valid.length : null;
}

function competencySummary() {
  return surveyCompetencies().map((item) => {
    const current = mean(state.surveys.map((response) => response.ratings?.[item.id]?.current));
    const importance = mean(state.surveys.map((response) => response.ratings?.[item.id]?.importance));
    return { ...item, current, importance, gap: current !== null && importance !== null ? importance - current : null };
  }).sort((a, b) => (b.gap ?? -Infinity) - (a.gap ?? -Infinity));
}

function renderAnalysis() {
  $("#analysis-docs").textContent = state.documents.length;
  $("#analysis-focus").textContent = state.focusGroups.length;
  $("#analysis-surveys").textContent = state.surveys.length;
  $("#analysis-comparisons").textContent = state.comparisons.length;
  $("#quality-rate").textContent = state.documents.length ? "100%" : "—";

  const chart = $("#needs-chart");
  if (!state.surveys.length) {
    chart.innerHTML = `<div class="empty-state">Асуулгын хариулт бүртгэгдсэний дараа чадамжийн зөрүү харагдана.</div>`;
  } else {
    chart.innerHTML = competencySummary().map((item) => `
      <div class="chart-row">
        <strong>${item.name}</strong>
        <div class="bar-pair">
          <div class="bar-track" title="Одоогийн түвшин ${formatValue(item.current)}"><span class="bar-current" style="width:${percent(item.current)}%"></span></div>
          <div class="bar-track" title="Чухалчлал ${formatValue(item.importance)}"><span class="bar-importance" style="width:${percent(item.importance)}%"></span></div>
        </div>
        <span class="gap-value">${formatSigned(item.gap)}</span>
      </div>`).join("");
  }

  const counts = countBy(state.surveys.map((item) => item.stakeholder));
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  $("#stakeholder-distribution").innerHTML = entries.length ? entries.map(([label, count]) => `
    <div class="distribution-item"><strong>${escapeHtml(label)}</strong><span>${count}</span>
      <div class="distribution-track"><i style="width:${count / state.surveys.length * 100}%"></i></div>
    </div>`).join("") : `<div class="empty-state">Оролцогчийн мэдээлэл алга.</div>`;
}

function deliverableReady(item) {
  const tasksReady = item.tasks.every((code) => programDefinitions.every((program) => getProgramTaskMap(program.id)[code]?.status === "done"));
  const evidenceReady = {
    macro: state.documents.length > 0 && state.comparisons.length > 0,
    focus: state.focusGroups.length > 0,
    survey: state.surveys.length > 0,
    comparison: state.comparisons.length > 0,
    all: state.documents.length > 0 && state.focusGroups.length > 0 && state.surveys.length > 0 && state.comparisons.length > 0
  }[item.evidence];
  return tasksReady && evidenceReady;
}

function renderReports() {
  const readyCount = deliverables.filter(deliverableReady).length;
  const readiness = Math.round(readyCount / deliverables.length * 100);
  $("#report-readiness").textContent = `${readiness}%`;
  $("#readiness-ring").style.background = `conic-gradient(var(--lime) ${readiness}%, rgba(255,255,255,.12) ${readiness}%)`;
  $("#deliverable-list").innerHTML = deliverables.map((item) => {
    const ready = deliverableReady(item);
    return `<article class="deliverable">
      <span class="deliverable-code">${item.code}</span>
      <div><h2>${item.title}</h2><p>${item.detail} · Холбогдох ажил: ${item.tasks.join(", ")}</p></div>
      <span class="status-pill status-${ready ? "done" : "not-started"}">${ready ? "Бэлэн" : "Нотолгоо дутуу"}</span>
    </article>`;
  }).join("");
}

function exportJson() {
  downloadBlob(JSON.stringify({ exportedAt: new Date().toISOString(), guidelineSchedule: "2026.07.03–2026.09.30", approvedWorkPlanSchedule: "2026.07.03–2026.09.29", ...state }, null, 2), "application/json", `strategic-curriculum-project-${dateStamp()}.json`);
}

function exportSurveyCsv() {
  if (!state.surveys.length) {
    showToast("Экспортлох асуулгын хариулт алга");
    return;
  }
  const surveyItems = surveyCompetencies();
  const headers = ["id", "submittedAt", "stakeholder", "agency", "experience", "comment", ...surveyItems.flatMap((item) => [`${item.id}_current`, `${item.id}_importance`])];
  const rows = state.surveys.map((response) => [
    response.id, response.submittedAt, response.stakeholder, response.agency, response.experience, response.comment,
    ...surveyItems.flatMap((item) => [response.ratings?.[item.id]?.current ?? "", response.ratings?.[item.id]?.importance ?? ""])
  ]);
  const csv = "\uFEFF" + [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n");
  downloadBlob(csv, "text/csv;charset=utf-8", `competency-survey-${dateStamp()}.csv`);
}

function exportDocumentCompetenciesCsv() {
  const selectedAgency = $("#competency-agency-filter").value;
  const aggregated = aggregateDocumentCompetencies(selectedAgency);
  if (!aggregated.length) {
    showToast("Экспортлох баталгаажсан чадамж алга");
    return;
  }
  const rows = aggregated.map((item, index) => [
    index + 1,
    item.name,
    item.description,
    item.documentCount,
    item.agencyCount,
    item.agencies.join("; "),
    item.signalScore,
    item.evidence.map((evidence) => `${evidence.document}: ${evidence.quote}`).join(" | ")
  ]);
  const headers = ["rank", "competency", "description", "document_count", "agency_count", "agencies", "signal_score", "evidence_quotes"];
  const csv = "\uFEFF" + [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n");
  const agencySuffix = selectedAgency ? `-${normalizeKey(selectedAgency)}` : "";
  downloadBlob(csv, "text/csv;charset=utf-8", `document-derived-competencies${agencySuffix}-${dateStamp()}.csv`);
}

function downloadBlob(content, type, filename) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const anchor = document.createElement("a");
  anchor.href = url; anchor.download = filename; anchor.click();
  URL.revokeObjectURL(url);
}

function setupEvents() {
  $("#landing-login-form")?.addEventListener("submit", loginWithEmail);
  $$("[data-view-target]").forEach((button) => button.addEventListener("click", (event) => {
    event.preventDefault();
    setView(button.dataset.viewTarget);
  }));
  $("#menu-button").addEventListener("click", () => {
    const open = $("#sidebar").classList.toggle("open");
    $("#menu-button").setAttribute("aria-expanded", String(open));
  });
  $("#email-login-form")?.addEventListener("submit", loginWithEmail);
  $("#manual-save-data")?.addEventListener("click", manualSaveData);
  $("#logout-button")?.addEventListener("click", logoutCurrentUser);
  $("#current-email-input")?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") loginWithEmail(event);
  });
  $("#access-settings-form")?.addEventListener("submit", saveAccessSettings);
  $("#access-user-form")?.addEventListener("submit", saveUserAccess);
  $("#access-user-role")?.addEventListener("change", applyRoleDefaultToUserEditor);
  $("#access-user-panels")?.addEventListener("click", handleAccessUserAction);
  $("#access-grant-all")?.addEventListener("click", () => setAccessPreset("all"));
  $("#access-reset-default")?.addEventListener("click", () => setAccessPreset("default"));
  $("#access-user-all")?.addEventListener("click", () => setUserAccessPreset("all"));
  $("#access-user-default")?.addEventListener("click", () => setUserAccessPreset("default"));
  $("#program-filter").addEventListener("change", renderPlan);
  $("#phase-filter").addEventListener("change", renderPlan);
  $("#status-filter").addEventListener("change", renderPlan);
  $("#task-list").addEventListener("click", (event) => {
    const button = event.target.closest("[data-edit-task]");
    if (button) openTaskDialog(button.dataset.editTask);
  });
  $("#program-progress-grid").addEventListener("click", (event) => {
    const button = event.target.closest("[data-select-program]");
    if (!button) return;
    $("#program-filter").value = button.dataset.selectProgram;
    renderPlan();
  });
  $("#task-form").addEventListener("submit", handleTaskDialog);
  $("#phase-grid").addEventListener("click", (event) => {
    const card = event.target.closest("[data-open-phase]");
    if (!card) return;
    $("#phase-filter").value = card.dataset.openPhase;
    setView("plan");
  });
  $("#phase-grid").addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") event.target.click();
  });
  $$(".tool-tab").forEach((button) => button.addEventListener("click", () => {
    $$(".tool-tab").forEach((tab) => tab.classList.toggle("active", tab === button));
    $$(".tool-pane").forEach((pane) => pane.classList.toggle("active", pane.id === `tool-${button.dataset.toolTab}`));
  }));
  $$(".output-tab").forEach((button) => button.addEventListener("click", () => {
    $$(".output-tab").forEach((tab) => tab.classList.toggle("active", tab === button));
    $$(".output-pane").forEach((pane) => pane.classList.toggle("active", pane.id === `output-${button.dataset.outputTab}`));
  }));
  $("#policy-file").addEventListener("change", handlePolicyFile);
  $("#document-form").addEventListener("input", (event) => {
    if (!(event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLSelectElement)) return;
    if (event.target.dataset.autoFilled !== "true") return;
    event.target.classList.remove("auto-filled");
    delete event.target.dataset.autoFilled;
    delete event.target.title;
  });
  $("#document-form").addEventListener("change", (event) => {
    if (event.target.dataset?.autoFilled !== "true") return;
    event.target.classList.remove("auto-filled");
    delete event.target.dataset.autoFilled;
    delete event.target.title;
  });
  $("#source-text").addEventListener("input", updateSourceCount);
  $$('input[name="analysisMode"]').forEach((input) => input.addEventListener("change", updateAnalysisModeUi));
  $("#analyze-document").addEventListener("click", analyzeDocumentText);
  $("#add-manual-competency").addEventListener("click", addManualCompetency);
  $("#manual-competency-name").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addManualCompetency();
    }
  });
  $("#document-form").addEventListener("submit", handleDocumentAnalysis);
  $("#competency-agency-filter").addEventListener("change", renderAggregatedCompetencies);
  $("#export-document-competencies").addEventListener("click", exportDocumentCompetenciesCsv);
  $("#curriculum-coverage-file").addEventListener("change", handleCurriculumCoverageFile);
  $("#curriculum-coverage-text").addEventListener("input", updateCurriculumCoverageCount);
  $("#analyze-curriculum-coverage").addEventListener("click", () => analyzeCurriculumCoverage());
  $("#export-curriculum-coverage").addEventListener("click", exportCurriculumCoverageCsv);
  $("#learning-outcome-text").addEventListener("input", updateLearningOutcomeCount);
  $("#analyze-learning-outcomes").addEventListener("click", () => analyzeLearningOutcomeCoverage());
  $("#export-learning-outcome-coverage").addEventListener("click", exportLearningOutcomeCoverageCsv);
  $("#focus-form").addEventListener("submit", (event) => handleDataForm(event, "focusGroups", (data) => ({
    programId: data.get("programId"), agency: data.get("agency"), date: data.get("date"), participants: Number(data.get("participants")),
    facilitator: data.get("facilitator"), gaps: data.get("gaps"), evidence: data.get("evidence")
  }), "Фокус бүлэг бүртгэгдлээ"));
  $("#comparison-file").addEventListener("change", handleComparisonFile);
  $("#comparison-form").addEventListener("focusin", (event) => showComparisonFieldEvidence(event.target));
  $("#comparison-form").addEventListener("click", (event) => showComparisonFieldEvidence(event.target));
  $("#comparison-form").addEventListener("submit", (event) => handleDataForm(event, "comparisons", (data) => ({
    programId: data.get("programId") || "all",
    localProgramName: data.get("localProgramName"),
    localProgramLevel: data.get("localProgramLevel"),
    localProgramLevelLabel: programLevelLabel(data.get("localProgramLevel")),
    localProgramTargetGroup: data.get("localProgramTargetGroup"),
    country: data.get("country"), institution: data.get("institution"), program: data.get("program"),
    credits: data.get("credits"), format: data.get("format"), duration: data.get("duration"), teacherRequirements: data.get("teacherRequirements"),
    url: data.get("url"), competencies: data.get("competencies"), sourceEvidence: comparisonFormEvidence
  }), "Харьцуулах хөтөлбөр бүртгэгдлээ"));
  ["localProgramName", "localProgramLevel", "localProgramTargetGroup"].forEach((name) => {
    const field = $("#comparison-form")?.elements[name];
    field?.addEventListener("input", () => {
      syncComparisonProgramFromContext();
      renderComparisonMatrix();
    });
    field?.addEventListener("change", () => {
      syncComparisonProgramFromContext();
      renderComparisonMatrix();
    });
  });
  $("#comparison-form")?.elements.programId?.addEventListener("change", (event) => {
    delete event.currentTarget.dataset.autoContextProgram;
  });
  $("#local-program-form")?.addEventListener("submit", (event) => handleDataForm(event, "localPrograms", (data) => ({
    programId: data.get("programId"),
    name: data.get("name"),
    level: data.get("level"),
    targetGroup: data.get("targetGroup"),
    credits: data.get("credits"),
    format: data.get("format"),
    duration: data.get("duration"),
    teacherRequirements: data.get("teacherRequirements"),
    competencies: data.get("competencies"),
    learningOutcomes: data.get("learningOutcomes"),
    url: data.get("url")
  }), "Монголын хөтөлбөр бүртгэгдлээ"));
  $("#comparison-detail-program-filter")?.addEventListener("change", renderProgramComparisonDetail);
  $("#program-comparison")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete]");
    if (button && confirm("Энэ бүртгэлийг устгах уу?")) deleteEvidence(button.dataset.delete, button.dataset.id);
  });
  $("#tools").addEventListener("click", (event) => {
    const fillButton = event.target.closest("[data-fill-comparison]");
    const registerButton = event.target.closest("[data-register-comparison]");
    const registerAllButton = event.target.closest("[data-register-all-comparisons]");
    const comparisonProgramButton = event.target.closest("[data-comparison-program]");
    if (fillButton) {
      fillComparisonForm(comparisonImportSuggestions[Number(fillButton.dataset.fillComparison)] || {});
      return;
    }
    if (registerButton) {
      const ok = registerComparisonSuggestion(comparisonImportSuggestions[Number(registerButton.dataset.registerComparison)] || {});
      if (ok) showToast("Харьцуулах хөтөлбөр матрицад нэмэгдлээ");
      return;
    }
    if (registerAllButton) {
      if (!validateComparisonContext()) return;
      let added = 0;
      comparisonImportSuggestions.forEach((item) => {
        if (registerComparisonSuggestion(item, true)) added += 1;
      });
      if (added) {
        persist(`${added} харьцуулах хөтөлбөр бүртгэгдлээ`);
        renderComparisonMatrix();
        renderProgramComparisonDetail();
        renderDashboard();
        showToast(`${added} хөтөлбөр матрицад нэмэгдлээ`);
      }
      return;
    }
    if (comparisonProgramButton) {
      selectedComparisonProgramFilter = comparisonProgramButton.dataset.comparisonProgram || "all";
      renderComparisonMatrix();
      return;
    }
    const button = event.target.closest("[data-delete]");
    if (button && confirm("Энэ бүртгэлийг устгах уу?")) deleteEvidence(button.dataset.delete, button.dataset.id);
  });
  $("#survey-form").addEventListener("submit", handleSurvey);
  $("#competency-table").addEventListener("change", captureSurveyDraftRatings);
  $$(".source-filter").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.surveySource) selectedSurveySourceFilter = button.dataset.surveySource || "all";
      if (button.dataset.surveyProgram) selectedSurveyProgramFilter = button.dataset.surveyProgram || "all";
      buildCompetencyTable();
      if (learningOutcomeCoverageText) void analyzeLearningOutcomeCoverage(true);
    });
  });
  $("#export-project").addEventListener("click", exportJson);
  $("#export-survey").addEventListener("click", exportSurveyCsv);
  $("#print-report").addEventListener("click", () => window.print());
  window.addEventListener("beforeunload", flushSharedStateBeforeUnload);
}

function flushSharedStateBeforeUnload() {
  try {
    saveLocalState();
    const payload = JSON.stringify({ state });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(sharedStateApiPath, new Blob([payload], { type: "application/json" }));
    }
  } catch {
  }
}

function uid() { return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`; }
function countBy(values) { return values.reduce((acc, value) => { if (value) acc[value] = (acc[value] || 0) + 1; return acc; }, {}); }
function percent(value) { return value === null ? 0 : Math.max(0, Math.min(100, value / 5 * 100)); }
function formatValue(value) { return value === null ? "—" : value.toFixed(2); }
function formatSigned(value) { return Number.isFinite(value) ? `${value >= 0 ? "+" : ""}${value.toFixed(2)}` : "—"; }
function dateStamp() { return new Date().toISOString().slice(0, 10); }
function csvCell(value) { return `"${String(value ?? "").replaceAll('"', '""')}"`; }
function normalizeKey(value) { return String(value ?? "").trim().toLocaleLowerCase("mn").replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, ""); }
function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[character]));
}

function renderAnalysis() {
  const documents = visibleDocuments();
  const focusGroups = state.focusGroups.filter((item) => isAgencyAllowed(item.agency));
  $("#analysis-docs").textContent = documents.length;
  $("#analysis-focus").textContent = focusGroups.length;
  $("#analysis-surveys").textContent = state.surveys.length;
  $("#analysis-comparisons").textContent = state.comparisons.length;
  $("#quality-rate").textContent = documents.length ? "100%" : "—";

  const chart = $("#needs-chart");
  if (!state.surveys.length) {
    chart.innerHTML = `<div class="empty-state">Асуулгын хариулт бүртгэгдсэний дараа чадамжийн зөрүү харагдана.</div>`;
  } else {
    chart.innerHTML = competencySummary().map((item) => `
      <div class="chart-row">
        <strong>${escapeHtml(item.name)}</strong>
        <div class="bar-pair">
          <div class="bar-track" title="Одоогийн түвшин ${formatValue(item.current)}"><span class="bar-current" style="width:${percent(item.current)}%"></span></div>
          <div class="bar-track" title="Чухалчлал ${formatValue(item.importance)}"><span class="bar-importance" style="width:${percent(item.importance)}%"></span></div>
        </div>
        <span class="gap-value">${formatSigned(item.gap)}</span>
      </div>`).join("");
  }

  const counts = countBy(state.surveys.map((item) => item.stakeholder));
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  $("#stakeholder-distribution").innerHTML = entries.length ? entries.map(([label, count]) => `
    <div class="distribution-item"><strong>${escapeHtml(label)}</strong><span>${count}</span>
      <div class="distribution-track"><i style="width:${count / state.surveys.length * 100}%"></i></div>
    </div>`).join("") : `<div class="empty-state">Оролцогчийн мэдээлэл алга.</div>`;
}

function deliverableReady(item) {
  const programs = accessibleProgramDefinitions();
  const documents = visibleDocuments();
  const focusGroups = state.focusGroups.filter((focus) => isAgencyAllowed(focus.agency));
  const tasksReady = programs.length > 0 && item.tasks.every((code) => programs.every((program) => getProgramTaskMap(program.id)[code]?.status === "done"));
  const evidenceReady = {
    macro: documents.length > 0 && state.comparisons.length > 0,
    focus: focusGroups.length > 0,
    survey: state.surveys.length > 0,
    comparison: state.comparisons.length > 0,
    all: documents.length > 0 && focusGroups.length > 0 && state.surveys.length > 0 && state.comparisons.length > 0
  }[item.evidence];
  return tasksReady && evidenceReady;
}

async function passwordDigest(email, password) {
  const value = `${normalizeEmail(email)}::${password}`;
  if (typeof crypto !== "undefined" && crypto.subtle && typeof TextEncoder !== "undefined") {
    const buffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
    return [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  }
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) hash = Math.imul(31, hash) + value.charCodeAt(index) | 0;
  return `fallback-${Math.abs(hash)}`;
}

function loginCredentialsFromEvent(event) {
  const form = event.currentTarget;
  if (form?.id === "landing-login-form") {
    return {
      email: normalizeEmail($("#landing-email-input")?.value),
      password: String($("#landing-password-input")?.value || "")
    };
  }
  return {
    email: normalizeEmail($("#current-email-input")?.value),
    password: String($("#current-password-input")?.value || "")
  };
}

function applyAccessControl() {
  state.access = normalizeAccess(state.access);
  const user = currentUser();
  const signedIn = Boolean(user.email);
  document.body.dataset.role = user.role;
  document.body.dataset.email = user.email || "";
  const landing = $("#access-landing");
  const shell = $(".app-shell");
  if (landing) landing.hidden = signedIn;
  if (shell) shell.hidden = !signedIn;
  const landingInput = $("#landing-email-input");
  if (landingInput && !landingInput.value) landingInput.value = user.email || "";
  if (!signedIn) {
    const roleBadge = $("#current-role-badge");
    if (roleBadge) roleBadge.textContent = "Нэвтрээгүй";
    return;
  }
  $$("[data-view-target]").forEach((button) => {
    const target = button.dataset.viewTarget;
    const allowed = isViewAllowed(target, user.role);
    button.hidden = !allowed;
    button.disabled = !allowed;
    button.setAttribute("aria-hidden", String(!allowed));
  });
  $$(".view").forEach((view) => {
    const allowed = isViewAllowed(view.id, user.role);
    view.hidden = !allowed;
    view.setAttribute("aria-hidden", String(!allowed));
  });
  const emailInput = $("#current-email-input");
  if (emailInput) emailInput.value = user.email;
  const roleBadge = $("#current-role-badge");
  if (roleBadge) roleBadge.textContent = user.label;
  renderAccessSettings();
  const activeView = $(".view.active")?.id || "dashboard";
  if (!isViewAllowed(activeView, user.role)) setView(firstAllowedView(user.role));
}

async function loginWithEmail(event) {
  event.preventDefault();
  const { email, password } = loginCredentialsFromEvent(event);
  if (!isValidEmail(email)) {
    showToast("Мэйл хаяг буруу байна");
    return;
  }
  if (password.length < 4) {
    showToast("Password хамгийн багадаа 4 тэмдэгт байна");
    return;
  }
  sessionStorage.setItem(sessionEmailKey, email);
  await refreshSharedStateForLogin();
  state.access = normalizeAccess(state.access);
  const digest = await passwordDigest(email, password);
  const savedDigest = state.access.passwords?.[email];
  if (savedDigest && savedDigest !== digest) {
    sessionStorage.removeItem(sessionEmailKey);
    showToast("Password буруу байна");
    return;
  }
  if (!savedDigest) {
    state.access.passwords[email] = digest;
    saveLocalState();
    showToast("Password хадгалагдлаа. Дараагийн удаа энэ password-оор нэвтэрнэ.");
  }
  state.access.currentEmail = email;
  persist(`Нэвтэрсэн мэйл: ${email}`);
  const landingPassword = $("#landing-password-input");
  const currentPassword = $("#current-password-input");
  if (landingPassword) landingPassword.value = "";
  if (currentPassword) currentPassword.value = "";
  applyAccessControl();
  restoreLearningOutcomeCoverage();
  buildCompetencyTable();
  renderDashboard();
  renderPlan();
  renderEvidence();
  renderAnalysis();
  renderProgramComparisonDetail();
  renderReports();
}

function logoutCurrentUser() {
  sessionStorage.removeItem(sessionEmailKey);
  state.access = normalizeAccess({
    ...state.access,
    currentEmail: ""
  });
  state.access.currentEmail = "";
  const currentEmail = $("#current-email-input");
  const currentPassword = $("#current-password-input");
  const landingPassword = $("#landing-password-input");
  if (currentEmail) currentEmail.value = "";
  if (currentPassword) currentPassword.value = "";
  if (landingPassword) landingPassword.value = "";
  saveLocalState();
  applyAccessControl();
  showToast("Системээс гарлаа");
}

initializeApp();

async function initializeApp() {
  setupEvents();
  await hydrateSharedState();
  restoreLearningOutcomeCoverage();
  buildCompetencyTable();
  renderRoleSwitcher();
  updateAnalysisModeUi();
  renderDashboard();
  renderPlan();
  renderEvidence();
  renderAnalysis();
  renderProgramComparisonDetail();
  renderReports();
  applyAccessControl();
}

