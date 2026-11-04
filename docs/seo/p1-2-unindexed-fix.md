# P1-2 非组合页未收录诊断与修复方案 (Draft)

> **生成时间**：2026-11-04  
> **数据来源**：GSC 2026-11-04 未收录清单（[docs/seo/gsc-unindexed-2026-11-04.csv](file:///Users/lynnyee/Downloads/indielegalterms.com/docs/seo/gsc-unindexed-2026-11-04.csv)）  
> **处理策略**：从 PR-01 清理清单中剥离，转入 P1-2 作为核心收录修复对象，**绝不清理、不作 301 下线**。

---

## 1. 非组合页未收录诊断总览表

经对 10 个进入未收录名单的非组合页（含 3 个合规页、5 个种子合同页、1 个指南页、1 个定价页）进行全量工程代码排查（Sitemap、Meta Robots、Canonical、内链分布、正文深度），检查结果如下：

| URL 路径 | 页面性质 | 是否在 Sitemap | 是否 Noindex | Canonical 状态 | 站内静态直链数 | 核心未收录主因诊断 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/compliance/oregon` | 多州合规页 | 是（近期补入） | 否 | 自引用 | 稀疏（仅 compliance 枢纽） | 历史长期遗漏在 Sitemap，发布周期短，爬虫预算不足 |
| `/compliance/washington-caregiver` | 行业合规页 | 是（近期补入） | 否 | 自引用 | 稀疏 | 历史遗漏在 Sitemap，外部与站内信号弱 |
| `/compliance/washington-tech-consulting` | 行业合规页 | 是（近期补入） | 否 | 自引用 | 稀疏 | 历史遗漏在 Sitemap，缺乏核心内链推荐 |
| `/contracts/california-freelance-contract-requirements-2026` | 手工种子页 (Pipe 1) | 是 | 否 | 自引用 | 3 处 | 全站 80 个同质化低质页拉低全站质量分，爬虫预算耗尽导致的无辜波及 |
| `/contracts/client-late-on-invoice-freelance-worker-protection-act` | 手工种子页 (Pipe 3) | 是 | 否 | 自引用 | **0 处（孤立页）** | **孤岛页面（Orphan Page）**，缺乏物理内链，PageRank 无法传导 |
| `/contracts/is-email-valid-contract-freelance-work-california` | 手工种子页 (Pipe 4) | 是 | 否 | 自引用 | 1 处 | 内链匮乏，且 FAQ 篇幅偏薄，缺乏真实案例对比 |
| `/guides/graphic-designers` | 职业指南页 | 是 | 否 | 自引用 | 1 处 | **与 `/contracts/graphic-designer-...` 存在严重的站内关键词自相残杀（Cannibalization）** |
| `/pricing` | 商业定价页 | 是 | 否 | **缺失 Canonical** | 全站顶通/底通 | **缺少 Canonical 标签** + 服务端直出为纯 Suspense 空骨架（内容极度过薄） |
| `/contracts/bay-area-consulting-agreement-independent-contractor` | 种子页 (目标页) | 是 | 否 | 自引用 | **0 处（孤立页）** | 孤立页面，湾区高价值场景未在首页或高权重页设立直达内链 |
| `/contracts/graphic-designer-freelance-contract-late-payment-ca` | 种子页 (目标页) | 是 | 否 | 自引用 | 1 处 | 权重不足 + 与 `/guides/graphic-designers` 关键词竞争，被 Googlebot 降权等待 |

---

## 2. 逐条深度原因分析与修复计划 (Action Items)

### 2.1 修复定价页规范化：`/pricing`
- **问题定位**：
  1. `app/pricing/page.tsx` 中仅声明了 `title` 和 `description`，**未声明 `alternates: { canonical: "https://indielegalterms.com/pricing" }`**；
  2. 页面主体直接包裹在 `<Suspense>` 中的客户端组件，服务端直出 HTML 几乎无实质性文本，极易被判定为 Thin Content。
- **修复措施**：
  1. 补齐 `alternates.canonical`；
  2. 在定价卡片下方新增服务端渲染（SSR）的 **SB 988 合规工具计费问答（FAQPage Schema + 4 条高频问题）**，提供合法性与退款保障文字，充实页面正文字数。

### 2.2 治理关键词自相残杀：`/guides/graphic-designers` 与 `/contracts/graphic-designer-...`
- **问题定位**：
  两个页面同时争夺加州平面设计师（Graphic Designer California Freelance Contract）搜索词。Google 算法无法辨析两者定位差异，导致两个页面双双落入未编入索引。
- **修复措施**：
  1. **明确差异化定位**：
     - `/guides/graphic-designers`：定位为“加州设计师执业维权与版权全景指南”（知识性、实务指引、全流程法条）；
     - `/contracts/graphic-designer-freelance-contract-late-payment-ca`：定位为“加州 SB 988 迟付双倍赔偿条款专用合同生成与模板”（工具性、条款直达）；
  2. 在 `/guides/graphic-designers` 首屏显著位置植入单向精准内链指向合同模板页，完成权威度收敛。

### 2.3 消除孤岛页面：打通 2 个 0 内链核心页
- **涉及页面**：
  - `/contracts/client-late-on-invoice-freelance-worker-protection-act`
  - `/contracts/bay-area-consulting-agreement-independent-contractor`
- **问题定位**：
  全站无任何非动态循环的静态 `Link` 锚点指向这两个页面，仅在 `/contracts` 的大列表里被遍历渲染，Googlebot 在抓取树状结构时极难赋予权重。
- **修复措施**：
  - 在 `/tools/ca-demand-letter-template` 中增加对 `client-late-on-invoice-...` 的维权实务链接；
  - 在 `/contracts/california-independent-contractor-agreement-template` 的行业模板区增加对湾区咨询合同的静态锚文本。

### 2.4 多州合规页面注水与抓取提权：`/compliance/*`
- **问题定位**：
  之前遗漏在 Sitemap 之外，近期才完成 sitemap 修复，但外部链接与站内权重传导仍处于断层状态。
- **修复措施**：
  - 在全站页脚（`SiteFooter.tsx`）和首页核心导航模块中，保证 `/compliance` 及俄勒冈、华盛顿重点子页有明确锚文本支持；
  - 待 PR-01 清理 55 个低质组合页后，在 GSC 后台对 `/compliance` 进行一次手动 URL 检查与索引编入请求（URL Inspection Request）。

---

## 3. P1-2 执行与验证里程碑

1. **第 1 阶段（代码修复）**：
   - 补齐 `/pricing` 的 Canonical 与 SSR 文本；
   - 补充 4 处核心定向静态内链（消除孤岛页）；
   - 调整设计师指南与设计师合同页的 TDK 及相互链接指向。
2. **第 2 阶段（抓取验证）**：
   - 本地构建与渲染测试，确保 Rich Results 正常；
   - 提交更新后的 `sitemap.xml`，并在 GSC 对上述 10 个 URL 发起复检验证。


### 2.5 登录页索引屏蔽治理：`/login`
- **问题定位**：
  GSC 记录显示 `/login` 于 2026/9/30 被 Google 正式编入索引。
  代码排查显示 `app/login/page.tsx` 缺失 `robots: { index: false, follow: false }`，且 `app/robots.ts` 属于全局放行，导致无业务价值的认证登录页被公开收录，浪费宝贵的抓取预算。
- **修复措施（P1-2 执行）**：
  在 `app/login/page.tsx` 的 `metadata` 中添加：
  ```ts
  robots: {
    index: false,
    follow: false,
  }
  ```
  并在 `app/robots.ts` 中针对 `/login` 和 `/dashboard` 增加安全屏蔽规则。
