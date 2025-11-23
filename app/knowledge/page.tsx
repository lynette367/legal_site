const knowledgeByCategory = {
  "婚姻家庭": [
    {
      id: "marriage-property",
      title: "婚前财产怎么列清单",
      summary: "先列资产与负债，再写入协议并由双方签字确认，必要时到公证处备案。",
    },
    {
      id: "child-care",
      title: "抚养权争议里，法院关注什么",
      summary: "照顾能力、居住环境、稳定性以及孩子意愿，缺一不可。",
    },
  ],
  "劳动纠纷": [
    {
      id: "probation",
      title: "试用期被劝退，怎么算补偿",
      summary: "确认劳动关系、计算薪资基数、留存沟通证据，是争取补偿的关键。",
    },
    {
      id: "overtime",
      title: "加班时长如何举证",
      summary: "保留考勤截图、HR 回复、项目节点邮件，可以作为间接证据。",
    },
  ],
  "知识产权": [
    {
      id: "copyright",
      title: "委托设计作品的著作权归谁",
      summary: "合同里没写默认归创作者所有，记得约定权利转让与署名方式。",
    },
    {
      id: "trademark",
      title: "共有人商标如何使用",
      summary: "需要书面约定谁可以授权、收益如何分配，避免被动侵权。",
    },
  ],
};

export default function KnowledgePage() {
  return (
    <div>
      <div className="text-center">
        <p className="text-sm text-text-secondary">法律知识柜台</p>
        <h1 className="text-4xl font-semibold text-text-primary">法律知识</h1>
        <p className="text-text-secondary">用可爱的方式解释复杂条文。</p>
      </div>
      <div className="mt-12 space-y-12">
        {Object.entries(knowledgeByCategory).map(([category, articles]) => (
          <section key={category} className="rounded-3xl bg-bg-card p-8 shadow-soft border border-primary-mint/10">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-text-tertiary">{category}</p>
                <h2 className="text-2xl font-semibold text-text-primary">{category}精选</h2>
              </div>
              <a href="#" className="text-sm text-primary-mint hover:text-primary-mint-dark underline-offset-4 hover:underline transition-colors">
                查看全部
              </a>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {articles.map((article) => (
                <article key={article.id} className="rounded-2xl bg-bg-alt p-6 shadow-soft border border-primary-mint/10">
                  <h3 className="text-xl font-semibold text-text-primary">{article.title}</h3>
                  <p className="mt-3 text-text-secondary">{article.summary}</p>
                  <a href="#" className="mt-4 inline-flex text-sm text-primary-mint hover:text-primary-mint-dark underline-offset-4 hover:underline transition-colors">
                    阅读全文
                  </a>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
