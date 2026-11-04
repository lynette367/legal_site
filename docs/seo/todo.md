# IndieLegalTerms SEO 执行清单 (Docs/SEO/Todo.md)

> 基于 GSC 核心收录数据（2026-07-22 ~ 2026-10-10）、代码全量映射与 gefei SEO 数据验证输出。
> **核心原则**：严守收录健康硬约束，先清理 65 个未编入索引存量，强化重点杠杆页与现金牛页，再谨慎扩充高价值页面。

---

## 阶段规划与 PR 拆分总览

| PR 编号 | 核心目标 | 涉及模块 | 风险级别 | 依赖条件 |
| :--- | :--- | :--- | :--- | :--- |
| **PR-01 (P0-1)** | 清理 65 个同质化组合页，配置 301 重定向与 sitemap 下架 | `data/seoPages.ts`, `app/sitemap.ts`, `next.config.js`, `app/contracts/page.tsx` | 中（URL状态变更） | 无（首要执行） |
| **PR-02 (P0-2)** | 强化 `penalty-for-not-paying...` 核心页并打通内链（推前10） | `data/seoPages.ts`, `app/contracts/[slug]/page.tsx`, `app/tools/ca-contractor-laws/page.tsx` | 低（内容与内链增强） | PR-01 完成 |
| **PR-03 (P0-3)** | 增强 `/tools/ca-contractor-laws` 内容纵深与全站枢纽地位 | `app/tools/ca-contractor-laws/page.tsx`, `components/tools/*` | 低（页面优化） | PR-02 完成 |
| **PR-04 (P1-1)** | 规范化 `/tools/*` 真实工具页的索引、Sitemap 与 Schema 策略 | `app/sitemap.ts`, `app/tools/*/page.tsx` | 低（元数据规范） | PR-01 完成 |
| **PR-05 (P1-2)** | 补齐数据监控缺口与 GSC 90 天监控归档 | `docs/seo/data-archive.md`, `data/seoKeywords.ts` | 无代码风险 | 持续跟进 |
| **PR-06 (P2)** | AI 真实功能门禁治理：明确产品承接边界，防误导降权 | `app/tools/freelancer-contract-review/*`, `docs/seo/` | 低（产品定位修正） | 业务产品功能排期 |

---

## 任务详情清单

### P0-1: 清理 65 个未收录存量同质化组合页

- **优先级**：P0（阻塞性硬约束，必须在任何新页面上线前执行完毕）
- **核心动作**：
  1. **锁定清理范围**：
     - 清理对象为 `data/seoPages.ts` 中由 `formulaCombinations` 生成的 80 个“职业×痛点×城市”组合页（在 GSC 中产生 65 个“已发现-尚未编入索引”爬取信号堆积，正文重复率极高，H2/H3 骨架完全一致，无独立搜索曝光）。
     - **严格排除保护名单**：
       - 10 个 `/tools/*` 真实工具入口与功能页（绝对保留）；
       - 20 个种子手工页（`pipe1Seeds` ~ `pipe4Seeds`），包括现金牛页 `/contracts/ca-1099-contractor-30-day-payment-rule`（排名 6.1）、`/contracts/how-to-sue-client-nonpayment-independent-contractor-ca`（排名 11.2, CTR 4.8%）及杠杆页 `/contracts/penalty-for-not-paying-independent-contractor-ca`（排名 11.4）。
  2. **收敛维度与重定向映射 (`redirect-map.csv`)**：
     - 将 80 个组合页砍掉城市维度（消灭 `los-angeles`, `san-francisco`, `bay-area`, `san-diego`, `sacramento`, `orange-county`, `silicon-valley`），收敛到对应的 8 个核心行业主页/模板页；
     - 规则映射：
       - `tech-contractor-*` ➔ `301` 到 `/contracts/california-tech-contractor-agreement-template`；
       - `graphic-designer-*` ➔ `301` 到 `/contracts/graphic-designer-freelance-contract-late-payment-ca`；
       - `copywriter-*` ➔ `301` 到 `/contracts/freelance-copywriter-contract-template`；
       - `photographer-*` ➔ `301` 到 `/guides/photographers`；
       - `video-editor-*` ➔ `301` 到 `/contracts/la-video-editor-freelance-contract-template`；
       - `consultant-*` ➔ `301` 到 `/contracts/bay-area-consulting-agreement-independent-contractor`；
       - `ux-designer-*` ➔ `301` 到 `/contracts/graphic-designer-freelance-contract-late-payment-ca`（或收敛至设计主页）；
       - `marketing-freelancer-*` ➔ `301` 到 `/contracts/freelance-copywriter-contract-template`；
       - 无精准对应语义的极端废弃 URL 统一 `404` 或引导至 `/contracts` 目录页。
  3. **下架 Sitemap**：
     - 修改 `app/sitemap.ts`，彻底移除 `formulaPages` 的 URL 生成，仅保留 20 个高质量种子页及合规页。
  4. **更新目录页展示**：
     - 更新 `app/contracts/page.tsx`，移除对 80 个已下线页面的内链列表渲染，保持目录聚合页清爽。
- **涉及文件路径**：
  - [data/seoPages.ts](file:///Users/lynnyee/Downloads/indielegalterms.com/data/seoPages.ts#L458-L638)：注销或下线 `formulaCombinations` 与 `formulaPages`，仅导出 20 个种子页面到 `allSeoPages`；
  - [app/sitemap.ts](file:///Users/lynnyee/Downloads/indielegalterms.com/app/sitemap.ts#L45-L52)：移除批量生成的 priority 0.6 路由；
  - [next.config.js](file:///Users/lynnyee/Downloads/indielegalterms.com/next.config.js#L7-L57)：在 `redirects()` 中注入收敛后的 301 映射规则；
  - [app/contracts/page.tsx](file:///Users/lynnyee/Downloads/indielegalterms.com/app/contracts/page.tsx#L100-L295)：更新聚合列表，避免出现死链。
- **前置依赖**：无。
- **验收标准**：
  - 本地生成与线上 Sitemap URL 总数由 121 个下降至约 41 个（10 个 static + 4 个 guides + 1 个 hub + 20 个 seeds + 1 个 compliance hub + 5 个 compliance slugs）；
  - 访问被清理的城市变体 URL（例如 `/contracts/tech-contractor-contract-template-los-angeles`）返回 HTTP 301 并准确跳转至对应行业模板页；
  - 重点现金牛页与工具页的 HTTP 状态码 200，Canonical 保持原样不变；
  - 在 GSC 中提交更新后的 `sitemap.xml`，观察抓取预算向优质页集中。
- **预计 PR 拆分**：**PR-01: Clean up thin programmatic SEO pages and add 301 redirects**。

---

### P0-2: penalty-for-not-paying-independent-contractor-ca 推前 10

- **优先级**：P0（全站第一优先发力词：曝光 189、排名 11.4、KD 3.9，距离前 10 仅一步之遥）
- **核心动作**：
  1. **内容大幅扩充与深度专业化**：
     - 目前该页仅渲染通用模版片段，缺乏针对性的加州罚则实务指导；
     - 深度补充以下 4 个模块：
       1. **California SB 988 具体双倍赔偿救济条款**：引用加州民法典具体条文，解读 $250 门槛及 120 天累计计算标准；
       2. **逾期利息具体计算规则**：依据加州法律明确未约定利率时的法定年化 10% 利息起算点与复利限制；
       3. **三步维权追讨实务步骤**：
          - Step 1: 发送具备法律效力的 10 天通牒 Demand Letter（链接至站内工具）；
          - Step 2: 向加州劳工专员办公室（DLSE / Labor Commissioner）提交违规报备；
          - Step 3: 加州小额索赔法庭（Small Claims Court）起诉流程（最高限额 $12,500，无需律师，凭催款函主张双倍赔偿）；
       4. **常见雇主抗辩拆解 FAQ**：如“客户声称成果不满意可否拒付”、“口头约定是否免责”、“合同约定了放弃诉权是否有效”。
  2. **高权重内链精准打通**：
     - 在站内流量最大、排名最强的 `/tools/ca-contractor-laws`（曝光 333，排 15.5）的“Payment compliance”与“Related tools”模块中，植入直接定向锚文本内链：
       - 锚文本示例：`California Contractor Late Payment Penalties & Double Damages`；
     - 确保该内链位于服务端直出 HTML 中，具有高上下文相关性。
- **涉及文件路径**：
  - [data/seoPages.ts](file:///Users/lynnyee/Downloads/indielegalterms.com/data/seoPages.ts#L74-L88)：扩展该 slug 的元数据、FAQ 列表与结构化数据；
  - [app/contracts/[slug]/page.tsx](file:///Users/lynnyee/Downloads/indielegalterms.com/app/contracts/[slug]/page.tsx#L233-L409)：针对该核心页面支持丰富的实务指引和法条引用区块渲染；
  - [app/tools/ca-contractor-laws/page.tsx](file:///Users/lynnyee/Downloads/indielegalterms.com/app/tools/ca-contractor-laws/page.tsx#L358-L476)：在支付合规章节与相关工具区新增指向 `/contracts/penalty-for-not-paying-independent-contractor-ca` 的精准内链。
- **前置依赖**：PR-01（清理存量低质页，集中全站权重）。
- **验收标准**：
  - 页面正文字符数与专业度显著提升，完整包含利息计算、双倍赔偿及小额法庭三步追讨指南；
  - `/tools/ca-contractor-laws` 页面源码中包含指向该 URL 的 DoFollow 内链；
  - FAQPage Schema 校验无语法错误；
  - **GSC 监控指标**：上线后 14 ~ 28 天内，核心词 `penalty for not paying independent contractor california` 平均排名稳步进入前 10（目标 1~7 位），CTR 提升至 5% 以上。
- **预计 PR 拆分**：**PR-02: Enhance contractor penalty page content and build high-authority internal links**。

---

### P0-3: /tools/ca-contractor-laws 内容纵深增强

- **优先级**：P0（全站最大杠杆页：曝光 333、排名 15.5，定位为全站合规流量中枢）
- **核心动作**：
  1. **页面诊断定位**：
     - 目前该页首屏聚焦与交互工具（`ContractorAuditTool`、`MisclassificationCostCalculator`）体验良好，TDK 设定精准；
     - 当前瓶颈在于**下半部分法律文本的内容纵深不足**，对加州 2026 最新判例及细分职业豁免规则展开不够充分，且未能充分将权重分流至重点转化页。
  2. **内容纵深扩展**：
     - 扩充加州劳工法 § 2778（Labor Code § 2778）关于“专业服务豁免（Professional Services Exemption）”的实务判定细则；
     - 详细对比分析 **ABC Test vs. Borello Test** 在软件开发、文案、设计等具体岗位上的执法差异；
     - 补充 2026 年加州 EDD 劳工审计高频红线问答与真实案例拆解；
     - 增加 `SoftwareApplication` 结构化数据，向 Google 显式声明该页面为交互式合规检测应用。
  3. **增强枢纽内链网络**：
     - 保持首屏工具体验清爽的同时，在结果区域与法条解读区建立对下述页面的结构化互链：
       - `→ /contracts/penalty-for-not-paying-independent-contractor-ca`（违约与双倍赔偿）；
       - `→ /contracts/ca-1099-contractor-30-day-payment-rule`（现金牛页：30天付款红线）；
       - `→ /contracts/generator`（合规合同生成器入口）。
- **涉及文件路径**：
  - [app/tools/ca-contractor-laws/page.tsx](file:///Users/lynnyee/Downloads/indielegalterms.com/app/tools/ca-contractor-laws/page.tsx#L6-L19)：补全 `SoftwareApplication` JSON-LD，精细化 Title/Description；
  - [app/tools/ca-contractor-laws/page.tsx](file:///Users/lynnyee/Downloads/indielegalterms.com/app/tools/ca-contractor-laws/page.tsx#L239-L490)：丰富 ABC/Borello 法律纵深内容、实务指南及枢纽内链。
- **前置依赖**：PR-02。
- **验收标准**：
  - 页面服务端直出 HTML 包含更扎实的法条解析与案例；
  - Rich Results Test 验证 `SoftwareApplication` 与 `FAQPage` 结构化标记无告警；
  - 工具操作区与法律文本区层级清晰，不影响首屏转化；
  - **GSC 监控指标**：`california independent contractor law` 相关大词曝光持续放大，排名提升进入首页（前 10）。
- **预计 PR 拆分**：**PR-03: Deepen CA contractor laws content and enrich schema markup**。

---

### P1-1: /tools/* 页面索引与收录策略规范化

- **优先级**：P1
- **核心动作**：
  1. **分级管理 `/tools/*` 索引策略**：
     - **核心工具入口页（保留并强收录）**：
       - `/tools/ca-contractor-laws`
       - `/tools/irs-20-point-checklist`（此前遗漏在 sitemap 外，需补回）
       - `/tools/ca-late-payment-calculator`
       - `/tools/late-payment-calculator`
       - `/tools/ca-demand-letter-template`
       - `/tools/demand-letter-generator`
     - **带参数/状态变体页**：
       - 严格确保带 `?scenario=...` 或 `?mode=...` 参数的请求在 `<head>` 中统一声明标准的 self-referencing canonical（指向不带参数的标准根路径），防止参数分裂权重。
     - **SaaS 运行态与动态生成页**：
       - 对于未来可能产生的单次生成结果页、临时计算报告页，统一添加 `noindex, nofollow` 标记，避免索引碎片。
  2. **Schema 补全**：
     - 为所有计算器与检测器入口页配置 `SoftwareApplication` 或 `WebApplication` 结构化数据，声明 `operatingSystem: "All"`, `applicationCategory: "BusinessApplication"`, `offers: { price: "0" }`。
  3. **工具页与 `/contracts/*` 双向互链**：
     - 确保每一个工具计算结果卡片下方，都有对应场景的 `/contracts/*` 合同或催款函模板链接；
     - 形成“查合规风险 ➔ 算赔偿金额 ➔ 生成合规合同/发催款函”的闭环网状内链。
- **涉及文件路径**：
  - [app/sitemap.ts](file:///Users/lynnyee/Downloads/indielegalterms.com/app/sitemap.ts#L18-L29)：补充遗漏的 `/tools/irs-20-point-checklist` 与 `/tools/demand-letter-generator`；
  - [app/tools/irs-20-point-checklist/page.tsx](file:///Users/lynnyee/Downloads/indielegalterms.com/app/tools/irs-20-point-checklist/page.tsx#L6-L20)：规范化 Canonical 与 Schema；
  - [app/tools/ca-late-payment-calculator/page.tsx](file:///Users/lynnyee/Downloads/indielegalterms.com/app/tools/ca-late-payment-calculator/page.tsx#L8-L15)：严格校验 Canonical 规范化；
  - [components/tools/*](file:///Users/lynnyee/Downloads/indielegalterms.com/components/tools/)：强化工具完成后的下一步转化内链锚点。
- **前置依赖**：PR-01。
- **验收标准**：
  - 所有真实工具页均在 Sitemap 中正确登记；
  - 带有 URL 参数的访问均正确收敛至无参数 Canonical；
  - Google 富媒体搜索结果测试通过。
- **预计 PR 拆分**：**PR-04: Standardize tools indexing, sitemap inclusion, and schema markup**。

---

### P1-2: 补齐数据监控缺口与词表归档

- **优先级**：P1
- **核心动作**：
  1. **建立 65 个未收录 URL 监测对照表**：
     - 将本次由 `formulaPages` 生成的 80 个组合页完整清单与 GSC 导出的 65 个未收录 URL 进行对账建档；
     - 建立上线前后状态追踪（旧 URL ➔ 301 状态 ➔ 目标 URL ➔ GSC 索引移除进度）。
  2. **核实并锁定“不追词”清单**：
     - 基于 Google Ads 规划师与 Google Trends 数据，正式在文档中锁定放弃词，避免团队浪费资源：
       - `california late fee calculator` / `late fee calculator`：月搜索量极低（仅约 170~210/月），趋势呈明确回落期（当前热度仅为峰值 27%），无商业转化价值，**不追**；
       - `independent contractor vs employee california`：大词热度跌幅超 47%，属于宽泛资讯词，跳失率高，**不追**。
  3. **监控关键现金牛与潜力词（建立 90 天监控看板）**：
     - 重点词跟踪：
       - `penalty for not paying independent contractor california`（重点推前 10）
       - `1099 contractor 30 day payment rule`（稳固前 6）
       - `how to sue client for nonpayment california`（稳固前 10）
- **涉及文件路径**：
  - `docs/seo/redirect-map.csv`：旧 URL 与 301 目标映射全表；
  - `docs/seo/keyword-monitoring.md`：核心词、观察词、放弃词基线台账。
- **前置依赖**：PR-01。
- **验收标准**：
  - 数据文件入库，形成可持续复盘的监控基线。
- **预计 PR 拆分**：**PR-05: Archive SEO monitoring baseline and redirect registry**。

---

### P2: Free Legal AI 门禁审查与策略定调

- **优先级**：P2（严格防误导门禁）
- **代码审查实际结论**：
  - 经对代码全量审查：
    - `app/tools/freelancer-contract-review/ClientComponent.tsx` 为纯前端 3 步点击模拟器，等待 1.5 秒后输出固定写死的 3 条通用提示（"Misclassification risks under AB5" 等），点击按钮直接要求跳 `/pricing` 付费。**完全不存在文本解析、文件上传或调用大模型审查条款的功能**；
    - 后端 `/api/ai/contract` 与 `/api/ai/demand-letter` 虽接入 DeepSeek，但属于强认证（NextAuth Session）与严格计费门禁（`remainingContracts >= 1`，单次扣费或 $4.99 额度），**不存在真实可用的免费 AI 入口**。
- **门禁判决与执行策略**：
  - 严格执行准入规则：**本阶段坚决暂不上线 `/free-legal-ai` 聚焦页**，严禁使用“Free AI Contract Review / Free Legal AI”等虚假承诺的 TDK 误导用户；
  - 避免被 Google 算法判定为“点击欺诈/诱导付费的低质工具页”（Helpful Content 惩罚风险）；
  - **现有页面承接定位**：
    - 将 `/tools/freelancer-contract-review` 定位为“Freelance Contract Checklist & Risk Guide”，客观说明为合规清单自测，而非宣称自身为“实时免费 AI 深度审查系统”；
  - **未来 3 页扩展的前提条件（待产品开发真实功能后再启动）**：
    - 仅在技术端真正上线“免费支持单次粘贴 500 字以内条款、调 API 输出风险与修改建议”的功能后，方可上线以下 3 页：
      1. `/free-legal-ai`：承接“free legal ai”宽泛意图（月搜索 6,600，KD 20），作为免费轻量工具集合入口；
      2. `/tools/contract-review`：承接“ai contract review”意图（月搜索 880，高商业价值 CPC $97.49，KD 19）；
      3. `/ai-contract-review-software`：承接“ai contract review software”商业采购意图（深度对比评测页）。
- **涉及文件路径**：
  - [app/tools/freelancer-contract-review/ClientComponent.tsx](file:///Users/lynnyee/Downloads/indielegalterms.com/app/tools/freelancer-contract-review/ClientComponent.tsx#L48-L60)：文案客观化，剥离虚假 AI 宣传，与实际功能相符。
- **前置依赖**：需技术产品端实现真正的端到端免费 AI 文本分析功能。
- **验收标准**：
  - 站内不存在未实现功能却承诺“Free AI Review”的误导性页面与 TDK。
- **预计 PR 拆分**：**PR-06: Align contract review copy with actual capabilities and hold AI landing pages behind functional gate**。

---

## 阶段验收与观测窗口

1. **第 1 周（PR-01 & PR-02 上线）**：
   - 验证 301 重定向与 Sitemap 收缩生效；
   - GSC 抓取预算释放，未编入索引存量曲线开始掉头向下。
2. **第 2~4 周（PR-03 & PR-04 上线）**：
   - `/contracts/penalty-for-not-paying-independent-contractor-ca` 排名突破 10 名关口；
   - `/tools/ca-contractor-laws` 曝光持续扩张；
   - 现金牛页面核心词排名波动稳定在 ±1 位以内。
