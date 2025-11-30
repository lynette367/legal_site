import type { OutputBlock } from "../components/ui/ExampleShowcase";

interface ModuleExample {
  input: string;
  output: OutputBlock[];
}

export const moduleExamples: Record<
  "legalQa" | "dispute" | "documents" | "contracts" | "explain",
  ModuleExample
> = {
  legalQa: {
    input: "例如：公司强制我延长试用期，这合法吗？",
    output: [
      { label: "问题类型", value: "劳动合同纠纷" },
      { label: "风险点", items: ["试用期延长需双方协商", "不得重复设定试用期"] },
      {
        label: "建议步骤",
        items: ["要求公司说明理由", "确认是否同意", "保留证据"],
      },
      { label: "注意事项", value: "试用期总长不得超过 6 个月" },
    ],
  },
  dispute: {
    input: "例如：网购手机是翻新机，商家拒绝退款",
    output: [
      { label: "纠纷类型", value: "消费维权" },
      { label: "可能的违法点", items: ["三包责任缺失", "商品与宣传不符"] },
      { label: "行动方案", items: ["联系客服", "提交证据", "不解决→消协/12315"] },
      { label: "注意事项", value: "保留证据链" },
    ],
  },
  documents: {
    input: "例如：购买电动车后发现是翻新机，对方拒绝退款",
    output: [
      { label: "文书类型", value: "起诉状" },
      { label: "主要内容", items: ["当事人信息", "事实与理由", "诉讼请求", "证据清单"] },
    ],
  },
  contracts: {
    input: "例如：租房合同，我是房东，押一付三",
    output: [
      { label: "合同类型", value: "租赁合同" },
      { label: "自动生成条款", items: ["租期", "押金", "支付方式", "违约条款", "争议解决方式"] },
    ],
  },
  explain: {
    input: "例如：乙方应承担由此产生的一切法律责任",
    output: [
      { label: "条款含义", value: "乙方承担全部责任" },
      { label: "风险点", value: "责任范围过大" },
      { label: "建议", value: "要求明确责任界限" },
    ],
  },
};
