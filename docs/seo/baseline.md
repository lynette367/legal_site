# SEO 监控基线与收录对账总览 (SEO Monitoring Baseline)

> **版本**：v1.0 (基线建立完成)  
> **归档日期**：2026-11-05  
> **数据对账周期**：2026-07-22 ~ 2026-10-10 (GSC 导出版) 至 2026-11-05 (代码改造完成)  
> **关联数据源**：
> - 已收录基线表：`docs/seo/gsc-indexed-2026-11-04.csv` (59 条)
> - 未收录基线表：`docs/seo/gsc-unindexed-2026-11-04.csv` (65 条)
> - 三方对账明细：`docs/seo/p0-1-three-way-reconciliation.csv` (80 条)
> - 重定向映射表：`docs/seo/redirect-map.csv` (55 条已配置)
> - 监控词库台账：`docs/seo/keyword-monitoring.md`

---

## 一、基线建立背景与治理原则

IndieLegalTerms 经历了前期自动化模板批量页面上线，导致 Google Search Console (GSC) 中积压大量“已发现 - 尚未编入索引”爬取信号（共 65 个未收录 URL），且站内存在 80 个高度同质化的“职业×痛点×城市”组合页，严重稀释网站权重并消耗搜索引擎爬取配额。

为建立健康的 SEO 资产负债表，本次专项行动严格遵循以下治理原则：
1. **收录健康优先**：优先消除未收录存量垃圾信号，非高质量页面严禁加入 Sitemap；
2. **保护高价值种子资产**：绝对保护 20 个高意图手工种子页、现金牛页及核心合规工具页；
3. **真实性与合规门禁**：剥离虚假 AI 宣传，客观定位为合规清单自测，防范 Helpful Content 算法惩罚；
4. **规范化元数据**：全站所有核心工具页与落地页 Title 严格控制在 50~60 字符，Description 严格在 140~155 字符。

---

## 二、收录资产对账基线 (59 已收录 vs 65 未收录)

### 1. 59 个已收录资产基线 (`gsc-indexed-2026-11-04.csv`)
* **首页与核心枢纽** (2 条)：`/`, `/compliance`
* **职业指南页** (4 条)：`/guides/copywriters`, `/guides/graphic-designers`, `/guides/photographers`, `/guides/web-developers`
* **种子手工合同页与合规文章** (20 条种子核心资产)：
  - 核心现金牛：`/contracts/ca-1099-contractor-30-day-payment-rule` (排名 6.1)
  - 核心现金牛：`/contracts/how-to-sue-client-nonpayment-independent-contractor-ca` (排名 11.2, CTR 4.8%)
  - 重点杠杆页：`/contracts/penalty-for-not-paying-independent-contractor-ca` (排名 11.4，PR-02 重点推前 10)
  - 核心模板页：`/contracts/california-independent-contractor-agreement-template` 等
* **已收录的组合页** (33 条)：历史已被 Google 索引的组合页，已全部评估：
  - 25 条具备特定搜索意图的页面保留在 Sitemap 优先观察期（Priority 0.6）；
  - 其余已收录但薄内容页面已通过 301 重定向收敛权重至行业主模板页。

### 2. 65 个未收录存量对账基线 (`gsc-unindexed-2026-11-04.csv`)
* **同质化组合页垃圾信号** (47 条)：
  - 主要是由于拼接城市（`los-angeles`, `san-francisco`, `bay-area` 等）生成的重复薄页面；
  - 处置：全部移出 Sitemap，配置 301 重定向收敛或 404 彻底注销，阻断爬取浪费。
* **高优需修复页面** (P1-2 已修复)：
  - `/login`：加入 `noindex, nofollow` 与 `robots.txt` Disallow，杜绝无意义抓取；
  - `/pricing`：补齐 Canonical、服务端注入 H1 与 4 项 FAQ，解决骨架空白问题；
  - `/contracts/graphic-designer-freelance-contract-late-payment-ca`：补足全站内链直出；
  - `/contracts/bay-area-consulting-agreement-independent-contractor`：补足全站内链直出。
* **遗漏的真实合规工具/地区页** (P1-1 已修复)：
  - `/tools/irs-20-point-checklist`：补入 Sitemap，加入 WebApplication + FAQPage Schema；
  - `/tools/demand-letter-generator`：补入 Sitemap，加入 HowTo Schema；
  - `/compliance/washington`, `/compliance/oregon` 等 5 个州合规页：已通过 Sitemap 与互链打通。

---

## 三、80 个同质化组合页治理处置结果

| 处置方式 | 页面数量 | 典型代表 URL | 目标落地页 | HTTP 状态码 | Sitemap 状态 |
| :--- | :---: | :--- | :--- | :---: | :---: |
| **301 语义收敛** | 33 条 | `/contracts/tech-contractor-contract-template-los-angeles` | `/contracts/california-tech-contractor-agreement-template` | 301 Moved Permanently | 已移除 |
| **301 精准收敛** | 6 条 | `/contracts/photographer-contract-template-california` | `/guides/photographers` | 301 Moved Permanently | 已移除 |
| **404 彻底注销** | 22 条 | 极端长尾、无语义价值废弃页 | 返回标准 404 Not Found | 404 Not Found | 已移除 |
| **保留观察期** | 25 条 | 特定职业核心痛点组合（如 `graphic-designer-...` 等） | 保持原 URL 服务端直出 | 200 OK | 保留 (pri 0.6) |

---

## 四、最新 Sitemap 架构全景 (68 个有效 URL)

经 PR-01 与 PR-04 治理后，线上 `https://indielegalterms.com/sitemap.xml` 达到精准的 **68** 个 URL：

1. **核心静态与工具页 (12 个)**：
   - `/` (pri 1.0)
   - `/tools/late-payment-calculator` (pri 0.9)
   - `/tools/ca-late-payment-calculator` (pri 0.9)
   - `/contracts/generator` (pri 0.9)
   - `/contracts/california-independent-contractor-agreement-template` (pri 0.9)
   - `/tools/freelancer-contract-review` (pri 0.9)
   - `/privacy-policy` (pri 0.3)
   - `/tools/ca-contractor-laws` (pri 0.9)
   - `/tools/ca-demand-letter-template` (pri 0.9)
   - `/tools/demand-letter-generator` (pri 0.9 - PR-04 补齐)
   - `/tools/irs-20-point-checklist` (pri 0.9 - PR-04 补齐)
   - `/pricing` (pri 0.8)
2. **职业合规指南页 (4 个)**：
   - `/guides/copywriters` (pri 0.8)
   - `/guides/graphic-designers` (pri 0.8)
   - `/guides/web-developers` (pri 0.8)
   - `/guides/photographers` (pri 0.8)
3. **合同中心枢纽与内容页 (46 个)**：
   - `/contracts` (pri 0.85, 聚合 Hub)
   - 20 个手工种子合同页 (pri 0.75, 包括 P0-2 杠杆页与现金牛页)
   - 25 个保留观察期组合页 (pri 0.6)
4. **多州合规中心枢纽与内容页 (6 个)**：
   - `/compliance` (pri 0.8, 聚合 Hub)
   - 5 个州合规详细页 (`/compliance/washington`, `/compliance/oregon`, `/compliance/washington-caregiver`, `/compliance/washington-tech-consulting`, `/compliance/california-general`) (pri 0.7)

**合计**：`12 + 4 + 46 + 6 = 68 个有效 URL`。

---

## 五、TDK 规范与字符长度硬约束基线 (7 个工具页)

全站通过 `app/layout.tsx` 统一部署 `title.template: "%s | Indie Legal"`（占 14 字符），严禁页面内硬编码品牌名。所有 7 个工具页已全部达标：

| 工具页 URL | 页面 Title (chars) | 最终渲染 Title (chars) | 最终渲染 Description (chars) | 部署 Schema 类型 |
| :--- | :---: | :---: | :---: | :--- |
| `/tools/ca-contractor-laws` | 42 | **56** | **154** | `WebApplication`, `FAQPage` |
| `/tools/ca-demand-letter-template` | 42 | **56** | **149** | `HowTo` |
| `/tools/ca-late-payment-calculator` | 41 | **55** | **155** | `WebApplication` |
| `/tools/demand-letter-generator` | 42 | **56** | **152** | `HowTo` |
| `/tools/freelancer-contract-review` | 41 | **55** | **150** | `WebApplication` |
| `/tools/irs-20-point-checklist` | 42 | **56** | **150** | `WebApplication`, `FAQPage` |
| `/tools/late-payment-calculator` | 42 | **56** | **154** | `WebApplication` |

---

## 六、PR-06 门禁审查与去虚假宣传改造记录

针对 `/tools/freelancer-contract-review` 开展全量门禁审查，全面剥离未经技术实现的虚假“AI”承诺：
1. **文案去虚假化**：移除 “AI Legal Tool” 标签，改为客观的 “Contract Compliance Checklist”；
2. **交互客观化**：加载动画移除 “AI Analyzing Contract Clauses...”，改为 “Evaluating Contract Risk Factors...”；
3. **标题与定位重构**：从 “Freelancer Contract Review” 升级为 “Freelance Contract Checklist & Risk Guide”；
4. **坏链修复**：将原有指向不存在页面的虚假链接（如 `/tools/ai-copyright-filing`）替换为真实有效的内链（`/contracts/generator` 与 `/tools/ca-contractor-laws`）；
5. **免责严谨化**：明确声明本工具为自助合规自测清单，不构成正式法律建议。

---

## 七、复盘与验收检查清单 (Checklist)

- [x] GSC 65 个未收录 URL 清理对账入库 (`docs/seo/gsc-unindexed-2026-11-04.csv`)
- [x] GSC 59 个已收录 URL 资产明细建档 (`docs/seo/gsc-indexed-2026-11-04.csv`)
- [x] 80 个组合页三方处置对账表完整 (`docs/seo/p0-1-three-way-reconciliation.csv`)
- [x] 301 重定向映射表在线生效 (`docs/seo/redirect-map.csv`)
- [x] 不追词与重点监控词台账完成 (`docs/seo/keyword-monitoring.md`)
- [x] 工具页 TDK 规范化，消除品牌重复，长度 50~60 / 140~155
- [x] /tools/freelancer-contract-review 完成去 AI 虚假宣传改造
- [x] 本地全量构建与线上实测通过
