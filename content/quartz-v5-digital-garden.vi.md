---
title: "Quartz v5 và Obsidian: Xây Digital Garden từ ghi chú Markdown"
date: 2026-09-23
description: "Chia sẻ về Quartz v5, cách kết hợp với Obsidian, lợi ích khi dùng và kinh nghiệm mình đúc kết thành kb-template-quartz để dựng site ghi chú nhanh."
tags:
  - Quartz
  - Obsidian
  - Digital Garden
lang: vi
publish: false
---

Mình ghi chép bằng Markdown trong **Obsidian** và luôn muốn đưa một phần ghi chú đó lên web mà không phải chuyển sang một nền tảng khác. **Quartz v5** giải quyết đúng bài toán này, và sau một thời gian dùng, mình đã đóng gói cách làm của mình thành một template riêng là `kb-template-quartz`. Bài này chia sẻ về Quartz, mối liên hệ với Obsidian, lý do mình chọn v5 và những gì mình rút ra khi triển khai thực tế.

---

## Quartz và Obsidian là gì?

- **Obsidian** là ứng dụng ghi chú dựa trên các file Markdown nằm ngay trên máy bạn. Điểm mạnh là Wikilinks (`[[Note Name]]`), backlinks và graph view giúp các ghi chú liên kết với nhau như một mạng lưới tri thức.
- **Quartz** là Static Site Generator (SSG) mã nguồn mở, biến thư mục Markdown thành một website tĩnh. Nó hiểu sẵn cú pháp của Obsidian nên bạn gần như không phải sửa ghi chú trước khi đăng.
- **Digital Garden** là cách gọi cho kiểu website mà ghi chú được nuôi dưỡng dần theo thời gian và liên kết chéo, thay vì các bài blog đăng một lần rồi để đó.

Hai công cụ này bổ trợ nhau: **Obsidian để viết, Quartz để xuất bản**.

**Nguồn gốc của Quartz:**

- Repo gốc: [github.com/jackyzha0/quartz](https://github.com/jackyzha0/quartz)
- Site và tài liệu chính thức: [quartz.jzhao.xyz](https://quartz.jzhao.xyz)

---

## Quartz v5 có gì đáng chú ý?

Ở v5, Quartz được tái cấu trúc quanh ba hướng chính:

1. **Hệ sinh thái plugin:** lõi nhẹ hơn, các tính năng mở rộng tách thành plugin độc lập và thêm bằng lệnh `npx quartz plugin add`.
2. **Cấu hình bằng YAML:** các thiết lập cơ bản như theme, font hay danh sách plugin nằm trong `quartz.config.yaml`, không bắt buộc sửa TypeScript như các phiên bản trước.
3. **Tương thích Obsidian tốt:** hỗ trợ Wikilinks, Callouts, Highlight (`==text==`), Comments (`%%comment%%`), Block references (`^block-id`), Mermaid, Canvas và tag.

---

## Lợi ích khi dùng Quartz v5

### Ưu điểm

- **Nhanh và nhẹ:** output là HTML tĩnh với lượng JS tối thiểu, chuyển trang mượt như một SPA.
- **Viết ở đâu cũng được:** nội dung chỉ là file Markdown chuẩn, không bị khóa vào nền tảng nào (**Data Ownership**).
- **Đủ tính năng cho một knowledge base:** Full-text search, Graph View, Popover Preview, Backlinks, LaTeX.
- **Miễn phí:** host được trên GitHub Pages, Cloudflare, Netlify hoặc Vercel mà không tốn phí.
- **Giao diện responsive:** có Dark/Light mode và dùng tốt trên cả điện thoại.

### Nhược điểm cần cân nhắc

- **Cần quen Git và CLI:** phải cài Node.js (v22+) và dùng vài lệnh cơ bản như `git clone` hay `npx quartz build`.
- **Tùy biến sâu vẫn cần code:** muốn giao diện hoàn toàn riêng hoặc viết plugin thì cần HTML/CSS/TypeScript.
- **Không có CMS:** không có trang `/admin`, bạn soạn bài bằng Obsidian hoặc VS Code rồi push lên Git.

---

## Từ Quartz gốc đến `kb-template-quartz`

Sau khi dựng thử Quartz v5, mình nhận ra mỗi lần tạo một site ghi chú mới đều lặp lại cùng một chuỗi việc: clone, chỉnh `quartz.config.yaml`, thiết lập deploy, đặt quy ước thư mục. Vì vậy mình gom lại thành một **template repo** là `kb-template-quartz` để tạo site mới chỉ bằng thao tác "Use this template".

**Một số quyết định mình đã chốt trong template:**

- **Cấu hình tập trung ở `quartz.config.yaml`:** thay đổi tên site, theme hay plugin mà không đụng vào code.
- **Xuất bản có chủ đích (explicit publish):** chỉ ghi chú nào có `publish: true` trong frontmatter mới được đưa lên site. Cách này giúp tránh lỡ tay public ghi chú nháp hoặc riêng tư. Bài học thực tế là mình từng quên thêm dòng này nên bài viết không hiện lên, và đó cũng là lý do chính để ghi rõ quy ước này.
- **Quy ước đặt tên repo:** `web-<name>` cho site và `kb-<name>` cho knowledge base. Tên Cloudflare Worker thì để ngắn gọn hơn (ví dụ `notes`).
- **Chia thư mục theo chủ đề:** ví dụ nhánh lifestyle và study, sau này thêm finance, nên cấu trúc dễ mở rộng mà không phải sắp xếp lại.
- **Tách vai trò giữa các site:** nội dung kỹ thuật nằm ở site profile (mục Posts), còn site notes thiên về ghi chú đời sống và học tập. Hai bên lẫn vào nhau một chút cũng không sao.

Từ template này mình tạo ra `kb-my-notes`, site ghi chú chạy trên Cloudflare Workers.

**Repo template của mình:** [github.com/thaonbt/kb-template-quartz](https://github.com/thaonbt/kb-template-quartz)

---

## Kinh nghiệm khi dùng

- **Viết trước, tinh chỉnh sau:** hãy để Obsidian lo phần viết và liên kết, còn Quartz chỉ là bước xuất bản. Đừng ép mình sửa giao diện quá sớm.
- **Kiểm tra frontmatter đầu tiên khi bài không hiện:** nếu dùng explicit publish thì thiếu `publish: true` là nguyên nhân phổ biến nhất.
- **Dùng plugin vừa đủ:** mỗi plugin thêm vào là một thứ phải bảo trì, nên chỉ bật những gì thật sự cần.
- **Ghim phiên bản và test local trước khi deploy:** chạy `npx quartz build` để bắt lỗi sớm, nhất là khi đổi cấu hình hoặc cập nhật plugin.
- **Tách template khỏi nội dung:** giữ template sạch, không có ghi chú cá nhân, để mỗi site mới bắt đầu từ một trạng thái gọn.

---

## Quartz v5 phù hợp với ai?

- **Người dùng Obsidian** muốn chia sẻ Digital Garden mà không trả phí cho Obsidian Publish.
- **Lập trình viên, sinh viên và nhà nghiên cứu** cần nơi lưu cheat-sheet, ghi chú học tập và công thức.
- **Người viết thích sự tối giản**, chỉ muốn tập trung vào Markdown mà không phải vận hành database hay server.

---

## Bắt đầu nhanh

1. Muốn tìm hiểu Quartz thuần: đọc tài liệu tại [quartz.jzhao.xyz](https://quartz.jzhao.xyz) và clone repo gốc `git clone https://github.com/jackyzha0/quartz.git` (cần Node.js v22+).
2. Muốn đi đường tắt theo cách của mình: dùng `kb-template-quartz` làm điểm xuất phát rồi chỉnh `quartz.config.yaml` theo nhu cầu.
3. Đặt `publish: true` vào frontmatter của những bài muốn đăng, rồi push lên Git để deploy.

---

## Lời kết

Quartz v5 cho mình một con đường gọn từ Obsidian vault đến website công khai, với chi phí gần như bằng không và toàn quyền kiểm soát dữ liệu. Template `kb-template-quartz` là cách mình biến những gì đã học thành một quy trình lặp lại được. Nếu bạn cũng đang cân nhắc đưa ghi chú lên web, hãy thử Quartz một buổi chiều, kết quả có thể làm bạn bất ngờ.
