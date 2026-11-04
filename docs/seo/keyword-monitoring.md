# 核心关键词监控台账与不追词清单 (Keyword Monitoring Baseline)

> 创建日期：2026-11-05
> 数据来源：Google Search Console、Google Ads 关键词规划师、Google Trends、Ahrefs/gefei 数据验证
> 适用周期：上线后 90 天持续监控与复盘

---

## 一、重点监控词清单 (Core Focus Keywords)

重点词聚焦在高商业价值、强转化意图以及具备明确排名突破机会的页面。目标在上线 30~90 天内推动第一梯队词稳固前 6，第二梯队杠杆词突破进入首页（Top 10）。

| 监控关键词 | 关键词类型 | 当前排名 / 曝光 | 目标排名 (90天) | 承接落地页 URL | 优化动作与状态 |
| :--- | :--- | :---: | :---: | :--- | :--- |
| **penalty for not paying independent contractor ca** | P0-2 杠杆词 | 11.4 (曝光 189) | **Top 6~8** | `/contracts/penalty-for-not-paying-independent-contractor-ca` | PR-02 注入 SB 988 双倍赔偿深度法条、10% 利息与 6 项诉讼抗辩 FAQ，建立双向内链 |
| **1099 contractor 30 day payment rule** | 现金牛词 | 6.1 | **Top 3~5** | `/contracts/ca-1099-contractor-30-day-payment-rule` | 保留核心地位，PR-04 补充来自通用逾期计算器的双向精准回链 |
| **how to sue client for nonpayment independent contractor ca** | 现金牛词 | 11.2 (CTR 4.8%) | **Top 8** | `/contracts/how-to-sue-client-nonpayment-independent-contractor-ca` | 保持高 CTR 转化，作为小额法庭与催款流程核心落地页 |
| **california abc test compliance checker** | P0-3 枢纽词 | 新建核心 | **Top 10** | `/tools/ca-contractor-laws` | PR-03 注入 ABC vs Borello 对比矩阵、§2778 六项豁免、EDD 罚金条文与 WebApplication Schema |
| **california freelance contract requirements 2026** | 合规模板词 | 新建核心 | **Top 10** | `/contracts/california-freelance-contract-requirements-2026` | SB 988 生效基石合规指引页，作为各工具页的核心合规流入页 |
| **irs 20 point checklist independent contractor** | 分类合规工具词 | 基础监控 | **Top 10** | `/tools/irs-20-point-checklist` | PR-04 补入 Sitemap，加入 WebApplication + FAQPage Schema，规范化 50~60 字符 TDK |
| **california independent contractor agreement template** | 商业转化主词 | 核心模板 | **Top 5** | `/contracts/california-independent-contractor-agreement-template` | 核心现金流转化页，承接全站合同生成引导 |

---

## 二、“不追词”清单与放弃决策依据 (Dropped / Abandoned Keywords)

基于数据驱动与投入产出比（ROI）原则，以下关键词正式列入**放弃追踪清单**，严禁为其单独创建薄内容页或过度堆砌锚文本，避免分散爬虫预算与稀释权重：

### 1. `california late fee calculator` / `late fee calculator`
* **放弃理由**：
  - **搜索量极低**：全网月均搜索量仅约 170~210，属于极长尾低频词；
  - **热度显著衰退**：Google Trends 数据显示该词热度已跌入低谷（当前搜索热度仅为历史峰值的 27%）；
  - **无直接商业价值**：搜索意图多为租金房租逾期计算，与企业/独立承包人 B2B 法律催讨场景严重错位。
* **处置策略**：不为其单独建页，通过 `/tools/late-payment-calculator` 和 `/tools/ca-late-payment-calculator` 现有工具自然承接，不再主动追词。

### 2. `independent contractor vs employee california`
* **放弃理由**：
  - **意图过于宽泛**：属于高跳失率的通用泛资讯词，用户多为宽泛浏览而非寻求具体法律解决方案；
  - **热度大幅下滑**：较历史峰值跌幅超 47%；
  - **竞争环境恶劣**：排名前列均为加州劳工局官网（DIR/EDD）、Nolo、Investopedia 等极高权重域名，独立站获客成本高、ROI 极低。
* **处置策略**：将流量意图收敛到精准的 `/tools/ca-contractor-laws`（ABC Test & Borello 检测器）与 `/tools/irs-20-point-checklist`，不围绕宽泛词做外链或页面扩充。

### 3. `free legal ai` / `ai contract review free`
* **放弃理由**：
  - **门禁合规硬约束**：虽然该词月搜索量达 6,600，商业 CPC 极高，但当前系统前端为固定规则清单自测，未接入对未登录用户开放的实时端到端大模型条款解析接口（后台仅为付费 Session 服务）；
  - **防范 Google Helpful Content 算法惩罚**：若上线宣称“Free AI Review”却无法在不付费情况下提供真实 AI 解析的页面，极易被判定为“点击欺诈/诱导付费的低质工具页”。
* **处置策略**：PR-06 彻底完成去虚假宣传改造，将 `/tools/freelancer-contract-review` 客观定调为“合规清单自测与风险指引”，在真实免费大模型解析功能上线前，坚决不追该词、不上线聚焦页。

---

## 三、90 天周期监控指标与追踪周期 (Monitoring KPIs)

### 1. 核心看板指标
1. **GSC 索引健康度**：
   - 有效已索引 URL 数量（目标稳定在 65~70 之间）；
   - 移除 65 个薄内容组合页后的“已发现-尚未编入索引”排队量清零进程。
2. **曝光量 (Impressions)**：
   - 重点监控词周环比增长 > 15%；
   - 重点页 `/contracts/penalty-for-not-paying-independent-contractor-ca` 月曝光突破 500+。
3. **点击量 (Clicks) 与 CTR**：
   - 重点页平均点击率维持在 3.5%~6.0% 之间；
   - 现金牛页稳定获取自然商业线索。
4. **平均排名 (Average Position)**：
   - 30 天：`penalty-for-not-paying...` 稳定在 9~10 名；
   - 60 天：推动进入 7~8 名；
   - 90 天：第一梯队 3 个核心词稳居 Top 5。

### 2. 复盘检查节点
* **Day 7 (2026-11-12)**：检查 GSC Sitemap 抓取更新状态，确认 33 条 301 重定向已被 Googlebot 识别。
* **Day 30 (2026-12-05)**：第一轮排名与收录对账，确认 65 个未编入索引旧 URL 的清理进展。
* **Day 60 (2027-01-05)**：核心词流量转化复盘，评估是否针对高转化长尾词进行第二次定向增强。
* **Day 90 (2027-02-05)**：季度整体 SEO ROI 复盘，确定下一阶段产品功能演进与词库扩充。
