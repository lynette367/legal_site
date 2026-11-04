# PR-01 (P0-1) 预检报告：三方对账与精准清理规划 (最终执行版)

> **更新时间**：2026-11-04  
> **重大决策确认**：对 22 个目标页未收录条目采纳【方案 B 修正版】——**404 彻底下架，不作 301 重定向，不挂起**。  
> **核心对账文件**：
> - GSC 原始未收录：[docs/seo/gsc-unindexed-2026-11-04.csv](file:///Users/lynnyee/Downloads/indielegalterms.com/docs/seo/gsc-unindexed-2026-11-04.csv) (65 条)
> - GSC 原始已收录：[docs/seo/gsc-indexed-2026-11-04.csv](file:///Users/lynnyee/Downloads/indielegalterms.com/docs/seo/gsc-indexed-2026-11-04.csv) (59 条)
> - 三方对账总表：[docs/seo/p0-1-three-way-reconciliation.csv](file:///Users/lynnyee/Downloads/indielegalterms.com/docs/seo/p0-1-three-way-reconciliation.csv) (126 条)
> - 全量重定向台账：[docs/seo/redirect-map.csv](file:///Users/lynnyee/Downloads/indielegalterms.com/docs/seo/redirect-map.csv) (126 条)
> - 非组合页修复方案：[docs/seo/p1-2-unindexed-fix.md](file:///Users/lynnyee/Downloads/indielegalterms.com/docs/seo/p1-2-unindexed-fix.md) (11 项)

---

## 1. 最终执行策略与 33 / 22 / 25 统计

| 分组分类 | 数量 | Action | Next.js 运行态行为 | 是否在 Sitemap | 是否写 Redirects | 判定依据与处置策略 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **健康承接清理组** | **33** | `301` | 返回 HTTP 301 跳转 | **从 Sitemap 撤下** | **写 301 redirects** | 组合页 ∩ 未收录 ∩ 目标页已收录健康。收敛至行业主页。 |
| **未收录下架清理组** | **22** | `404` | 返回 HTTP 404 (notFound) | **从 Sitemap 撤下** | **严禁写 redirects** | 组合页 ∩ 未收录 ∩ 目标页自身未收录。无反链与内链，直接 404 丢弃。 |
| **已收录保留组** | **23** | `skip` | 返回 HTTP 200 (正常访问) | **保留在 Sitemap** | **严禁写 redirects** | 组合页 ∩ 已收录。Google 已稳定编入索引，严禁下线误伤。 |
| **灰色观察保留组** | **2** | `skip` | 返回 HTTP 200 (正常访问) | **保留在 Sitemap** | **严禁写 redirects** | 组合页 ∉ 未收录 且 ∉ 已收录。标记观察，PR-01 暂不动。 |
| **非组合页保护组** | **46** | `keep-for-p1-2` | 返回 HTTP 200 (正常访问) | **保留在 Sitemap** | **严禁写 redirects** | 10 个未收录页转入 P1-2 修复，36 个已收录核心资产绝对保护。 |
| **全量对账总计** | **126** | - | - | - | - | 80 个组合页 + 46 个非组合页全量受控 |

> **特别声明**：25 条 skip 为观察期保留，下次 GSC 页面报告后重新评估。

---

## 2. 22 条 404 下架项专项排查（内链与反链检查）

对确认执行 404 的 22 条组合页（`consultant-*` 6 条、`graphic-designer-*` 7 条、`ux-designer-*` 9 条）进行了全量工程代码与抓取记录排查：

1. **站内硬编码内链排查**：
   - 全局搜索 `app/`、`components/`、`public/` 中的所有文件；
   - **排查结果**：**22 条 URL 在工程内硬编码内链数为 0（零内链）**！仅存在于动态遍历数组中，下架后不会在站内产生任何死链。
2. **外部反链与索引表现排查**：
   - GSC 报告中此类页面曝光为 0、点击为 0、状态全部为未编入索引；
   - 外部反链检测为 0；
3. **最终处置结论**：
   - **22 条 URL 100% 确认无外部反链、无站内重要静态内链**；
   - 严格按指示执行 **404 下线处理**（不写 301 重定向，从 `allSeoPages` 彻底剔除，访问直接命中 `notFound()` 返回 404）。

---

## 3. Sitemap URL 数量精准对账说明

- **全站基准固定路由（21 条）**：
  - 10 个 staticRoutes（首页、计算器、定价等）
  - 4 个 guideRoutes（文案、设计、开发、摄影）
  - 1 个 contracts 目录页（`/contracts`）
  - 1 个 compliance 目录页（`/compliance`）
  - 5 个 multi-state compliance 路由
- **contracts 动态 Slug 路由变动**：
  - 原数量：100 条（20 个手工种子页 + 80 个组合页）
  - 本次下架：**55 条**（33 条 301 + 22 条 404）
  - 本次保留：**45 条**（20 个手工种子页 + 25 个 skip 组合页）
- **最终 Sitemap URL 总数**：
  - **当前线上**：121 条
  - **PR-01 下架 55 条后**：**66 条**（21 固定 + 45 保留动态 slug）
  - *(注：若未来将 25 个 skip 组合页全部下架，Sitemap 将降至最初设想的 41 条；本阶段严格执行用户指示“25 条 skip 保留 sitemap”，因此产出为精确的 66 条)*。

---

## 4. PR-01 完整 Diff 计划

### 4.1 涉及文件清单
1. `data/seoPages.ts`
2. `next.config.js`
3. `app/sitemap.ts`
4. `app/contracts/page.tsx`

### 4.2 具体修改内容
- **`data/seoPages.ts`**：
  - 在 `formulaCombinations` 定义处，通过 slug 过滤或注销方式**仅剔除 55 个清理项**（33 个 301 + 22 个 404）；
  - 保留 25 个 skip 组合页配置；
  - `allSeoPages` 自动收缩为 45 条（20 种子 + 25 skip）。
- **`next.config.js`**：
  - 在 `redirects()` 中**仅写入 33 条确认 301 的规则**，指向各自健康的行业主页；
  - 22 条 404 项严禁写入 redirects。
- **`app/sitemap.ts`**：
  - 依赖 `allSeoSlugs` 自动同步下架 55 条，保留 45 条；
  - 调整优先级逻辑，20 个种子页优先级 0.75，25 个保留组合页优先级 0.6。
- **`app/contracts/page.tsx`**：
  - 动态卡片列表随 `allSeoPages` 自动剔除 55 条死链卡片；
  - 描述文案从 `{totalPages}+` 调整为 `20+ curated guides`，文案更聚焦权威。

### 4.3 测试验证命令
```bash
# 1. 生产环境构建检查（确保无静态导出错误）
npm run build

# 2. 验证 Sitemap 条目总数（必须精准等于 66）
curl -s http://localhost:3000/sitemap.xml | grep -c "<url>"

# 3. 抽样测试 33 条 301 正常跳转（返回 301 且 Location 正确）
curl -I http://localhost:3000/contracts/tech-contractor-contract-template-california
curl -I http://localhost:3000/contracts/freelance-copywriter-contract-template-los-angeles
curl -I http://localhost:3000/contracts/photographer-contract-template-california

# 4. 抽样测试 22 条 404 正常拦截（返回 404 Not Found）
curl -I http://localhost:3000/contracts/consultant-late-payment-protection-san-francisco
curl -I http://localhost:3000/contracts/graphic-designer-demand-letter-san-francisco
curl -I http://localhost:3000/contracts/ux-designer-contract-template-san-francisco

# 5. 抽样测试 25 条保留组合页正常 200（绝不误杀）
curl -I http://localhost:3000/contracts/graphic-designer-contract-template-california
curl -I http://localhost:3000/contracts/graphic-designer-double-damages-bay-area
curl -I http://localhost:3000/contracts/graphic-designer-late-payment-protection-los-angeles

# 6. 验证核心资产、现金牛与工具页正常 200
curl -I http://localhost:3000/contracts/ca-1099-contractor-30-day-payment-rule
curl -I http://localhost:3000/contracts/penalty-for-not-paying-independent-contractor-ca
curl -I http://localhost:3000/tools/ca-contractor-laws
```

### 4.4 回滚方案
```bash
git checkout data/seoPages.ts next.config.js app/sitemap.ts app/contracts/page.tsx
```
