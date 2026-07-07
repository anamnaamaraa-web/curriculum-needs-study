# Сайтыг сүлжээ харгалзахгүй public ажиллуулах заавар

Энэ сайт одоо public hosting дээр ажиллахад бэлэн болсон. Гэхдээ `127.0.0.1` болон `192.168.x.x` / `10.x.x.x` төрлийн LAN хаягууд нь интернэтэд нээлттэй хаяг биш. Бүх төхөөрөмж, бүх сүлжээнээс оруулахын тулд сайтыг hosting үйлчилгээ, VPS, байгууллагын сервер, VPN/reverse proxy эсвэл secure tunnel дээр байршуулна.

## 1. Public deployment-д шаардагдах орчны хувьсагч

Hosting дээр дараах environment variables тохируулна.

```text
HOST=0.0.0.0
PORT=4173
PUBLIC_BASE_URL=https://your-domain.mn
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-5.5
```

Тайлбар:

- `PUBLIC_BASE_URL` нь хайлтын системийн `sitemap.xml` дотор гарах үндсэн домэйн.
- `OPENAI_API_KEY` байхгүй бол нарийвчилсан AI шинжилгээ ажиллахгүй, харин энгийн/local шинжилгээ ажиллана.
- `PORT`-ийг зарим hosting платформ автоматаар өгдөг. Тийм бол тухайн платформын өгсөн `PORT`-ийг ашиглуулна.

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

## 4. Хайлтын системд нээлттэй болгох

Сайт public домэйн дээр ажилласны дараа дараах хаягууд нээгдэж байгаа эсэхийг шалгана.

```text
https://your-domain.mn/robots.txt
https://your-domain.mn/sitemap.xml
```

Дараа нь Google Search Console, Bing Webmaster Tools зэрэг албан хэрэгслээр `sitemap.xml`-ийг бүртгүүлнэ.

## 5. Мэдээллийн аюулгүй байдлын анхааруулга

Одоогийн хувилбар нь судалгааны prototype шинжтэй:

- хэрэглэгчийн эрхийн тохиргоо browser-ийн localStorage дээр хадгалагдана;
- password нь тухайн browser-ийн localStorage/sessionStorage урсгалд тулгуурласан;
- олон хэрэглэгчийн төвлөрсөн өгөгдлийн сан, audit log, сервер талын authorization хараахан бүрэн backend биш.

Иймээс байгууллагын бодит, мэдрэмтгий судалгааны өгөгдөлтэй public ашиглахын өмнө:

1. сервер талын хэрэглэгчийн бүртгэл ба password hashing;
2. төвлөрсөн өгөгдлийн сан;
3. role-based authorization;
4. HTTPS domain;
5. backup ба audit log;
6. мэдээлэл хадгалах/устгах журам;
7. firewall болон rate limit

заавал нэмэх шаардлагатай.
