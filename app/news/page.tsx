const newsList = [
  {
    id: "labor-trend",
    category: "劳动",
    date: "2024-07-08",
    title: "人社部发布新规：用人单位需提前说明试用期评估标准",
    summary: "新规要求企业在入职阶段就告知员工试用期考核方式与指标，并保留书面记录。",
  },
  {
    id: "civil-code",
    category: "民法典",
    date: "2024-06-24",
    title: "民法典婚姻家庭编补充解释征求意见",
    summary: "最高法拟在夫妻共同债务认定、探望权执行方面增加更细的操作指引。",
  },
  {
    id: "ipo",
    category: "公司治理",
    date: "2024-06-18",
    title: "北交所发文聚焦中小企业信息披露",
    summary: "文件强调创业阶段的公司也需完善股东协议、董监高责任与重大事项披露。",
  },
  {
    id: "rent",
    category: "住房",
    date: "2024-05-29",
    title: "多地推出租赁合同网签模板，强化公平条款",
    summary: "北京、成都等地上线新版网签模板，明确押金、维修、租金调价等敏感条款。",
  },
];

export default function NewsPage() {
  return (
    <div>
      <div className="text-center">
        <p className="text-sm text-text-secondary">每日关注</p>
        <h1 className="text-4xl font-semibold text-text-primary">法律资讯</h1>
        <p className="text-text-secondary">挑选值得关注的政策更新，一起做温柔的法律观察者。</p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {newsList.map((item) => (
          <article key={item.id} className="rounded-3xl bg-bg-card p-6 shadow-soft border border-primary-mint/10 transition-all hover:-translate-y-1 hover:shadow-soft-lg">
            <div className="flex items-center justify-between text-sm text-text-secondary">
              <span className="rounded-full bg-accent-pink/25 px-3 py-1 text-xs text-[#C7537B] font-medium">{item.category}</span>
              <time className="text-text-tertiary">{item.date}</time>
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-text-primary">{item.title}</h2>
            <p className="mt-3 text-text-secondary">{item.summary}</p>
            <a href="#" className="mt-4 inline-flex text-sm font-medium text-primary-mint hover:text-primary-mint-dark underline-offset-4 hover:underline transition-colors">
              阅读全文
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
