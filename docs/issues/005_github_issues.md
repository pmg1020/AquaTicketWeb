C:\aquaticket>git commit -m "Fix: Re-add front-end as regular
[main 5891692] Fix: Re-add front-end as regular
 55 files changed, 7762 insertions(+), 1 deletion(-)
 delete mode 160000 aquaticket-front
 create mode 100644 aquaticket-front/aquaticket-front-vite/.gitignore
 create mode 100644 aquaticket-front/aquaticket-front-vite/GEMINI.md
 create mode 100644 aquaticket-front/aquaticket-front-vite/README.md
 create mode 100644 aquaticket-front/aquaticket-front-vite/eslint.config.js
 create mode 100644 aquaticket-front/aquaticket-front-vite/index.html
 create mode 100644 aquaticket-front/aquaticket-front-vite/package-lock.json
 create mode 100644 aquaticket-front/aquaticket-front-vite/package.json
 create mode 100644 aquaticket-front/aquaticket-front-vite/postcss.config.js
 create mode 100644 aquaticket-front/aquaticket-front-vite/public/kakao_login_large_wide.png
 create mode 100644 aquaticket-front/aquaticket-front-vite/public/vite.svg
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/App.css
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/App.tsx
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/api/auth.ts
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/api/axiosInstance.ts
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/api/booking.ts
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/api/http.ts
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/api/kopis.normalizers.ts
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/api/kopis.ts
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/api/kopis.types.ts
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/api/showtime.ts
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/assets/react.svg
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/components/GenreNav.tsx
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/components/Header.tsx
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/components/mypage/BookingItem.tsx
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/components/mypage/BookingList.tsx
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/components/mypage/EventStatus.tsx
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/components/mypage/InquiryHistory.tsx
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/components/mypage/UserInfo.tsx
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/css/Header.css
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/css/book.css
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/css/genre-nav.css
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/css/login.css
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/css/performance-detail.css
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/css/performance-list.css
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/css/register.css
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/index.css
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/main.tsx
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/pages/BookGate.tsx
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/pages/BookPage.tsx
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/pages/CaptchaPopup.tsx
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/pages/CategoryList.tsx
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/pages/LoginCallback.tsx
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/pages/LoginPage.tsx
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/pages/MyPage.tsx
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/pages/PerformanceDetail.tsx
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/pages/PerformanceList.tsx
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/pages/RegisterPage.tsx
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/routes/RequireAuth.tsx
 create mode 100644 aquaticket-front/aquaticket-front-vite/src/vite-env.d.ts
 create mode 100644 aquaticket-front/aquaticket-front-vite/tailwind.config.js
 create mode 100644 aquaticket-front/aquaticket-front-vite/tsconfig.app.json
 create mode 100644 aquaticket-front/aquaticket-front-vite/tsconfig.json
 create mode 100644 aquaticket-front/aquaticket-front-vite/tsconfig.node.json
 create mode 100644 aquaticket-front/aquaticket-front-vite/vite.config.ts

C:\aquaticket>git commit -m "Fix: Re-add front-end as regular files"
On branch main
Your branch is ahead of 'origin/main' by 1 commit.
  (use "git push" to publish your local commits)

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        docs/issues/003_github_issues.md
        docs/issues/004_github_issues.md

nothing added to commit but untracked files present (use "git add" to track)

C:\aquaticket>git push
Enumerating objects: 68, done.
Counting objects: 100% (68/68), done.
Delta compression using up to 8 threads
Compressing objects: 100% (63/63), done.
Writing objects: 100% (67/67), 84.26 KiB | 5.27 MiB/s, done.
Total 67 (delta 4), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Resolving deltas: 100% (4/4), completed with 1 local object.
To https://github.com/pmg1020/AquaTicketWeb.git
   d53e930..5891692  main -> main
