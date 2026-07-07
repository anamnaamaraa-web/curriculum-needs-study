# Сайтыг сүлжээ харгалзахгүй public ажиллуулах заавар

Энэ сайт одоо public hosting дээр ажиллахад бэлэн болсон. Гэхдээ `127.0.0.1` болон `192.168.x.x` / `10.x.x.x` төрлийн LAN хаягууд нь интернэтэд нээлттэй хаяг биш. Бүх төхөөрөмж, бүх сүлжээнээс оруулахын тулд сайтыг hosting үйлчилгээ, VPS, байгууллагын сервер, VPN/reverse proxy эсвэл secure tunnel дээр байршуулна.

## 1. Public deployment-д шаардагдах орчны хувьсагч

Hosting дээр дараах environment variables тохируулна.

```text
HOST=0.0.0.0
PORT=4173
DATA_DIR=/app/data
PUBLIC_BASE_URL=https://your-domain.mn
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-5.5
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SECRET_KEY=sb_secret_...
SUPABASE_STATE_TABLE=app_state
```

Тайлбар:

- `PUBLIC_BASE_URL` нь хайлтын системийн `sitemap.xml` дотор гарах үндсэн домэйн.
- `DATA_DIR` нь бүх хэрэглэгчийн shared дата хадгалах persistent folder.
- `SUPABASE_URL` болон `SUPABASE_SECRET_KEY` байвал shared дата Supabase PostgreSQL-д хадгалагдана.
- `SUPABASE_SECRET_KEY`-г зөвхөн server/hosting environment дээр хадгална. GitHub эсвэл browser код руу оруулахгүй.
- `OPENAI_API_KEY` байхгүй бол нарийвчилсан AI шинжилгээ ажиллахгүй, харин энгийн/local шинжилгээ ажиллана.
- `PORT`-ийг зарим hosting платформ автоматаар өгдөг. Тийм бол тухайн платформын өгсөн `PORT`-ийг ашиглуулна.

## 1.1. Supabase database ашиглах

Supabase ашиглавал Render persistent disk заавал шаардлагагүй. Дата PostgreSQL database-д хадгалагдана.

1. Supabase dashboard дээр шинэ project үүсгэнэ.
2. `SQL Editor` хэсэгт `supabase-schema.sql` файлын SQL-г ажиллуулна.
3. Render Environment Variables дээр дараахыг нэмнэ:

```text
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SECRET_KEY=sb_secret_...
SUPABASE_STATE_TABLE=app_state
```

Supabase-ийн Data REST API нь database schema-аас `/rest/v1/` endpoint автоматаар үүсгэдэг. API URL болон keys-г Supabase Dashboard-ийн Data API / API Keys хэсгээс авна.

Deploy-ийн дараа шалгах URL:

```text
https://your-site.onrender.com/api/health
```

Зөв бол хариунд дараах хэлбэрээр гарна:

```json
"storage": {
  "mode": "supabase",
  "table": "app_state",
  "configured": true,
  "writable": true
}
```

## 1.2. Render Blueprint ашиглах

Repo root дээр `render.yaml` файл байвал Render тохиргооны ихэнх хэсгийг автоматаар уншина.

Тус файлд:

```text
runtime: docker
disk.mountPath: /app/data
DATA_DIR=/app/data
healthCheckPath=/api/health
```

гэсэн тохиргоо орсон. Render дээр Blueprint sync хийх эсвэл repo-г дахин deploy хийх үед service нь `/app/data` persistent disk ашиглах ёстой.

Storage зөв холбогдсон эсэхийг deploy-ийн дараа шалгах URL:

```text
https://your-site.onrender.com/api/health
```

Хариунд дараах хэсэг харагдана:

```json
"storage": {
  "mode": "server-file",
  "dataDir": "/app/data",
  "statePath": "/app/data/shared-state.json",
  "writable": true
}
```

Хэрэв `dataDir` нь `/app/data` биш байвал Render дээр `DATA_DIR=/app/data` тохируулаагүй байна.

## 2. Node hosting дээр ажиллуулах

Build command шаардлагагүй.

```powershell
npm start
```

Эсвэл:

```powershell
node server.mjs
```

## 3. Docker ашиглах

```powershell
docker build -t curriculum-needs-study .
docker run -p 4173:4173 --env-file .env.local curriculum-needs-study
```

Public сервер дээр reverse proxy эсвэл hosting provider нь HTTPS домэйнтэй холбож өгнө.

Shared дата хадгалах path нь deploy хийх runtime-аас хамаарна.

Docker runtime ашиглаж байвал:

```text
Mount path: /app/data
DATA_DIR: /app/data
Saved file: /app/data/shared-state.json
```

Native Node runtime ашиглаж байвал:

```text
Mount path: /opt/render/project/src/data
DATA_DIR: /opt/render/project/src/data
Saved file: /opt/render/project/src/data/shared-state.json
```

Docker/hosting дээр дата алдагдуулахгүй байхын тулд дээрх mount path-д volume эсвэл persistent disk mount хийнэ.

## 4. Хайлтын системд нээлттэй болгох

Сайт public домэйн дээр ажилласны дараа дараах хаягууд нээгдэж байгаа эсэхийг шалгана.

```text
https://your-domain.mn/robots.txt
https://your-domain.mn/sitemap.xml
```

Дараа нь Google Search Console, Bing Webmaster Tools зэрэг албан хэрэгслээр `sitemap.xml`-ийг бүртгүүлнэ.

## 5. Мэдээллийн аюулгүй байдлын анхааруулга

Одоогийн хувилбар нь судалгааны prototype шинжтэй:

- үндсэн дата серверийн `data/shared-state.json` файлд хадгалагдана;
- browser-ийн `localStorage` нь түр fallback cache байдлаар ашиглагдана;
- public hosting дээр дата алдагдуулахгүй байхын тулд persistent disk, mounted volume эсвэл database заавал тохируулна;
- password болон эрхийн тохиргоо prototype түвшний shared state-д хадгалагдаж байгаа тул байгууллагын production түвшний authentication хараахан биш;
- олон хэрэглэгчийн audit log, permission conflict control, сервер талын бүрэн authorization хараахан бүрэн backend биш.

Иймээс байгууллагын бодит, мэдрэмтгий судалгааны өгөгдөлтэй public ашиглахын өмнө:

1. сервер талын хэрэглэгчийн бүртгэл ба password hashing;
2. төвлөрсөн өгөгдлийн сан эсвэл persistent storage;
3. role-based authorization;
4. HTTPS domain;
5. backup ба audit log;
6. мэдээлэл хадгалах/устгах журам;
7. firewall болон rate limit

заавал нэмэх шаардлагатай.
