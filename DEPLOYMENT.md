# 배포 가이드

## 방법 1: Vercel 사용 (추천) ⭐

### 1단계: GitHub에 코드 푸시

```bash
# Git 초기화 (아직 안 했다면)
git init

# GitHub에 새 저장소 생성 후
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/사용자명/저장소명.git
git push -u origin main
```

### 2단계: Vercel에 배포

1. [Vercel](https://vercel.com)에 가입/로그인
2. "Add New Project" 클릭
3. GitHub 저장소 선택
4. 프로젝트 설정:
   - Framework Preset: Next.js (자동 감지)
   - Root Directory: `./` (기본값)
   - Build Command: `npm run build` (자동)
   - Output Directory: `.next` (자동)
5. "Deploy" 클릭

**완료!** 자동으로 배포되고, 이후 push할 때마다 자동 배포됩니다.

---

## 방법 2: GitHub Pages (정적 사이트)

### 1단계: next.config.mjs 수정

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  output: 'export', // 정적 export 활성화
  images: {
    unoptimized: true, // 이미지 최적화 비활성화 (GitHub Pages용)
  },
};

export default nextConfig;
```

### 2단계: package.json에 스크립트 추가

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "export": "next build"
  }
}
```

### 3단계: GitHub Actions 설정

`.github/workflows/deploy.yml` 파일 생성:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './out'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 4단계: GitHub 저장소 설정

1. GitHub 저장소 → Settings → Pages
2. Source: "GitHub Actions" 선택
3. 저장

### 5단계: 코드 푸시

```bash
git add .
git commit -m "Add GitHub Pages deployment"
git push origin main
```

---

## 방법 3: Netlify

1. [Netlify](https://www.netlify.com)에 가입/로그인
2. "Add new site" → "Import an existing project"
3. GitHub 저장소 선택
4. 빌드 설정:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. "Deploy site" 클릭

---

## 환경 변수 설정 (필요한 경우)

Vercel/Netlify 대시보드에서 환경 변수를 추가할 수 있습니다:
- Settings → Environment Variables

---

## 추천

**Vercel을 강력 추천합니다:**
- ✅ Next.js 제작사가 만든 플랫폼
- ✅ 완전 무료
- ✅ 자동 HTTPS
- ✅ 자동 배포 (Git push 시)
- ✅ 빠른 CDN
- ✅ 쉬운 설정



