type ServiceCard = {
  title: string;
  description: string;
  highlight: string;
};

const services: ServiceCard[] = [
  {
    title: "劳动权益",
    description: "入职离职、加班工资、合规解约，找到适合的策略。",
    highlight: "了解劳动法",
  },
  {
    title: "家庭与婚姻",
    description: "婚前协议、抚养权、继承安排，用温柔保护家人。",
    highlight: "家庭法律师",
  },
  {
    title: "公司治理",
    description: "股权结构、合作协议、商业条款，让生意更稳妥。",
    highlight: "企业顾问",
  },
];

export default function ServiceMenu() {
  return (
    <section className="mt-16 rounded-3xl bg-bg-card p-8 shadow-soft border border-primary-mint/10">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-semibold text-text-primary">小站的法律菜单</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.title}
            className="group rounded-3xl bg-bg-alt p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg border border-primary-mint/10"
          >
            <div className="mb-4 inline-flex rounded-full bg-primary-mint/20 px-4 py-1 text-xs uppercase tracking-[0.2em] text-text-mint font-medium">
              {service.highlight}
            </div>
            <h3 className="mb-2 text-2xl font-semibold text-text-primary">{service.title}</h3>
            <p className="text-text-secondary">{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
