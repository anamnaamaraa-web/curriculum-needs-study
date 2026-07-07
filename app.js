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
let sharedStateSaveTimer = 0;
let sharedStateSaveInFlight = Promise.resolve();

function defaultState() {
  const tasks = createTaskMap();
  const programTasks = Object.fromEntries(programDefinitions.map((program) => [program.id, createTaskMap()]));
  return {
    tasks,
    programTasks,
    documents: [],
    focusGroups: [],
    comparisons: [],
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
        .filter((user) => user.email && user.email !== adminEmail)
    : base.users;
  const currentRole = currentEmail === adminEmail ? "admin" : (users.find((user) => user.email === currentEmail)?.role || "viewer");
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
        if (saveState) saveState.textContent = "Серверт хадгалах үед алдаа гарлаа · local хадгалалт үлдсэн";
        console.warn("Shared state save failed:", error);
      });
  }, 350);
}

async function saveSharedStateNow() {
  const response = await fetch(sharedStateApiPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ state })
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const payload = await response.json();
  const saveState = $("#save-state");
  if (saveState && payload.savedAt) saveState.textContent = "Серверт хадгалагдсан";
  return payload;
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
    showToast("Өгөгдөл хадгалах үед алдаа гарлаа");
    const saveState = $("#save-state");
    if (saveState) saveState.textContent = "Хадгалалтын алдаа";
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

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(value));
}

function currentUser() {
  state.access = normalizeAccess(state.access);
  const email = state.access.currentEmail;
  if (!email) return { email: "", role: "guest", views: [], programs: [], label: "Нэвтрээгүй" };
  if (email === state.access.adminEmail) {
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
  summary.textContent = `Admin мэйл: ${state.access.adminEmail}. Бүртгэлтэй хэрэглэгч: ${users.length}. Бүртгэлгүй мэйлээр орсон хэрэглэгч зөвхөн viewer default эрхтэй байна.`;
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
    .filter((user) => user.email !== adminEmail)
    .map((user) => ({
      ...user,
      views: $$(`input[data-user-view="${user.email}"]:checked`).map((input) => input.value),
      programs: $$(`input[data-user-program="${user.email}"]:checked`).map((input) => input.value)
    }));
  if (wasAdmin) state.access.currentEmail = adminEmail;
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
  if (email === state.access.adminEmail) {
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

function surveyCompetencies() {
  const merged = new Map();
  competencies.forEach((item) => {
    merged.set(item.id, { ...item, source: "core", sourceLabel: "Үндсэн жагсаалт" });
  });

  aggregateDocumentCompetencies().forEach((item) => {
    const id = item.id || normalizeKey(item.name);
    const existing = merged.get(id);
    const detail = item.description || `${item.documentCount} баримт · ${item.agencyCount} байгууллагын нотолгоо`;
    if (existing) {
      merged.set(id, {
        ...existing,
        detail: existing.detail || detail,
        source: "core-document",
        sourceLabel: `Баримтаар баталгаажсан · ${item.documentCount}×`,
        documentCount: item.documentCount,
        agencyCount: item.agencyCount
      });
      return;
    }
    merged.set(id, {
      id,
      name: item.name,
      detail,
      source: "document",
      sourceLabel: `Баримтаас автоматаар нэмсэн · ${item.documentCount}×`,
      documentCount: item.documentCount,
      agencyCount: item.agencyCount
    });
  });

  return [...merged.values()];
}

function buildCompetencyTable() {
  const table = $("#competency-table");
  table.innerHTML = `<div class="competency-head"><span>Чадамж</span><span>Одоогийн түвшин</span><span>Ирээдүйн чухалчлал</span></div>`;
  const items = surveyCompetencies();
  items.forEach((item) => {
    const row = document.createElement("div");
    row.className = `competency-row ${item.source === "document" ? "document-derived" : ""}`;
    row.innerHTML = `
      <div class="competency-name">
        <strong>${escapeHtml(item.name)}</strong>
        <small>${escapeHtml(item.detail || "")}</small>
        ${item.source !== "core" ? `<em>${escapeHtml(item.sourceLabel)}</em>` : ""}
      </div>
      ${ratingGroup(`${item.id}_current`, "current")}
      ${ratingGroup(`${item.id}_importance`, "importance")}`;
    table.appendChild(row);
  });
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
      current: parseRating(data.get(`${item.id}_current`)),
      importance: parseRating(data.get(`${item.id}_importance`))
    };
  });
  state.surveys.push(response);
  persist("Асуулгын хариулт бүртгэгдлээ");
  form.reset();
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
  state[collection].push({ id: uid(), createdAt: new Date().toISOString(), ...mapper(data) });
  persist(message);
  event.currentTarget.reset();
  renderEvidence();
  renderDashboard();
}

function renderEvidence() {
  renderDocumentEvidence();
  renderAggregatedCompetencies();
  renderEvidenceList("focus", state.focusGroups, (item) => ({
    title: item.agency, detail: `${item.date} · ${item.participants} оролцогч · ${item.facilitator}`, tags: ["Фокус бүлэг", "Мезо"]
  }));
  renderEvidenceList("comparison", state.comparisons, (item) => ({
    title: `${item.institution} — ${item.program}`, detail: `${item.country} · ${item.credits} · ${item.format}`, tags: ["Албан ёсны", "Харьцуулалт"]
  }));
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
          evidence: [],
          keywords: new Set(),
          signalScore: 0
        });
      }
      const item = aggregated.get(key);
      item.documents.add(documentItem.id);
      item.agencies.add(documentItem.agency);
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
  const map = { document: "documents", focus: "focusGroups", comparison: "comparisons" };
  const collection = map[prefix];
  if (!collection) return;
  state[collection] = state[collection].filter((item) => item.id !== id);
  persist("Бүртгэл устгагдлаа");
  renderEvidence();
  buildCompetencyTable();
  renderDashboard();
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
  $("#focus-form").addEventListener("submit", (event) => handleDataForm(event, "focusGroups", (data) => ({
    agency: data.get("agency"), date: data.get("date"), participants: Number(data.get("participants")),
    facilitator: data.get("facilitator"), gaps: data.get("gaps"), evidence: data.get("evidence")
  }), "Фокус бүлэг бүртгэгдлээ"));
  $("#comparison-form").addEventListener("submit", (event) => handleDataForm(event, "comparisons", (data) => ({
    country: data.get("country"), institution: data.get("institution"), program: data.get("program"),
    credits: data.get("credits"), format: data.get("format"), url: data.get("url"), competencies: data.get("competencies")
  }), "Харьцуулах хөтөлбөр бүртгэгдлээ"));
  $("#tools").addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete]");
    if (button && confirm("Энэ бүртгэлийг устгах уу?")) deleteEvidence(button.dataset.delete, button.dataset.id);
  });
  $("#survey-form").addEventListener("submit", handleSurvey);
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
  renderDashboard();
  renderPlan();
  renderEvidence();
  renderAnalysis();
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
  buildCompetencyTable();
  renderRoleSwitcher();
  updateAnalysisModeUi();
  renderDashboard();
  renderPlan();
  renderEvidence();
  renderAnalysis();
  renderReports();
  applyAccessControl();
}
