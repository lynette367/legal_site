"use client";

import { FormEvent, useState } from "react";

type ContactFormProps = {
  title?: string;
  description?: string;
};

export default function ContactForm({ title = "需要帮助吗？", description = "留下联系方式，我们会与你约定咨询时间。" }: ContactFormProps) {
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSending(true);
    const formData = new FormData(event.currentTarget);
    console.log("form data", Object.fromEntries(formData));
    setTimeout(() => setIsSending(false), 600);
  };

  return (
    <section className="mt-16 rounded-3xl bg-bg-card p-8 shadow-soft border border-primary-mint/10">
      <div className="mb-8 text-center">
        <p className="text-sm text-text-secondary">咨询表单</p>
        <h2 className="text-3xl font-semibold text-text-primary">{title}</h2>
        <p className="text-text-secondary">{description}</p>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-text-primary">
          姓名
          <input
            name="name"
            required
            className="rounded-lg border-2 border-gray-200 bg-bg-card px-4 py-3 shadow-inner focus:border-primary-mint focus:ring-2 focus:ring-primary-mint/20 text-text-primary placeholder-text-tertiary transition-all outline-none"
            placeholder="怎么称呼你"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-text-primary">
          联系电话
          <input
            name="phone"
            required
            className="rounded-lg border-2 border-gray-200 bg-bg-card px-4 py-3 shadow-inner focus:border-primary-mint focus:ring-2 focus:ring-primary-mint/20 text-text-primary placeholder-text-tertiary transition-all outline-none"
            placeholder="方便联系的号码"
          />
        </label>
        <label className="md:col-span-2 text-text-primary">
          <span className="mb-2 block text-sm">想咨询的问题</span>
          <textarea
            name="question"
            rows={4}
            className="w-full rounded-lg border-2 border-gray-200 bg-bg-card px-4 py-3 shadow-inner focus:border-primary-mint focus:ring-2 focus:ring-primary-mint/20 text-text-primary placeholder-text-tertiary transition-all outline-none resize-none"
            placeholder="分享你遇到的情况，我们会保密"
          ></textarea>
        </label>
        <button
          type="submit"
          disabled={isSending}
          className="md:col-span-2 rounded-lg bg-primary-mint hover:bg-primary-mint-dark text-white px-6 py-3 text-lg shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSending ? "发送中..." : "发送咨询"}
        </button>
      </form>
    </section>
  );
}
