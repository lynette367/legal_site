import ContactForm from "../../components/ContactForm";

const faqs = [
  {
    question: "什么样的问题适合在线咨询？",
    answer: "日常劳动纠纷、合同草稿、婚姻家事安排、公司治理初步建议都可以，请尽量提供背景。",
  },
  {
    question: "我的隐私会如何被保护？",
    answer: "我们遵循最小可读原则，所有信息仅限指定律师查看，并使用加密方式存储。",
  },
  {
    question: "多久能得到回复？",
    answer: "工作日 2 小时内会与您联系，紧急情况可在备注中说明，我们会优先安排。",
  },
];

export default function HelpPage() {
  return (
    <div className="space-y-12">
      <section className="rounded-3xl bg-bg-card p-8 shadow-soft border border-primary-mint/10">
        <p className="text-sm text-text-secondary">Panco 援助台</p>
        <h1 className="text-4xl font-semibold text-text-primary">需要帮助</h1>
        <p className="mt-2 text-text-secondary">
          填写表单告诉我们你正在经历什么，我们会一起梳理可行的方案。
        </p>
      </section>
      <ContactForm title="写下你的问题" description="我们的律师助理会在 2 小时内回电确认时间。" />
      <section className="rounded-3xl bg-bg-card p-8 shadow-soft border border-primary-mint/10">
        <h2 className="text-2xl font-semibold text-text-primary">常见问题</h2>
        <div className="mt-6 space-y-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="rounded-2xl bg-bg-alt p-4 shadow-soft border border-primary-mint/10">
              <summary className="cursor-pointer text-lg font-medium text-text-primary">
                {faq.question}
              </summary>
              <p className="mt-2 text-sm text-text-secondary">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
