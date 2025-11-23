import Hero from "../components/Hero";
import ServiceMenu from "../components/ServiceMenu";
import ContractSearchSection from "../components/ContractSearchSection";
import KnowledgeList from "../components/KnowledgeList";
import ContactForm from "../components/ContactForm";

const homeArticles = [
  {
    id: "marriage",
    title: "离婚协议里必须写明的 5 个关键",
    summary: "不知道怎么开口？先列清财产、子女安排与违约条款，写完再平静地沟通。",
    category: "婚姻家庭",
    image: "https://picsum.photos/seed/law1/600/400",
  },
  {
    id: "labor",
    title: "加班费怎么算？一张表看懂",
    summary: "节假日 vs 工作日加班的算法不同，收好这张速查表，维权更有底气。",
    category: "劳动权益",
    image: "https://picsum.photos/seed/law2/600/400",
  },
  {
    id: "ip",
    title: "合作前先签 NDA 的 3 个理由",
    summary: "即便是朋友合作，也要写好保密范围与责任，友情与项目双双稳固。",
    category: "知识产权",
    image: "https://picsum.photos/seed/law3/600/400",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-10 pb-10">
      <Hero />
      <ServiceMenu />
      <ContractSearchSection />
      <KnowledgeList title="法律知识" description="每天一点点，法律其实很实用。" articles={homeArticles} />
      <ContactForm />
    </div>
  );
}
