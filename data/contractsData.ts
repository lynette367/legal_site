export type ContractTemplate = {
  id: string;
  name: string;
  category: string;
  tags: string[];
  level: "基础" | "进阶";
  briefDescription: string;
  scene: string;
  outline: string[];
};

export const contractTemplates: ContractTemplate[] = [
  {
    id: "labor-basic",
    name: "劳动合同（简版）",
    category: "劳动合同",
    tags: ["劳动", "公司"],
    level: "基础",
    briefDescription: "适合中小企业与员工签订，涵盖岗位、薪资与试用期约定。",
    scene: "适合中小企业与新员工签订",
    outline: [
      "合同主体与岗位说明",
      "合同期限与试用条款",
      "薪酬福利与支付方式",
      "保密义务与竞业限制",
      "违约责任与解除条件",
    ],
  },
  {
    id: "lease-home",
    name: "住宅租赁合同",
    category: "租赁协议",
    tags: ["租赁", "个人"],
    level: "基础",
    briefDescription: "帮助房东与租客明确租期、押金、维修责任与违约条款。",
    scene: "适合个人住宅租赁",
    outline: [
      "租赁标的与交付",
      "租金、押金及支付方式",
      "维修责任与验收",
      "转租限制与使用规范",
      "违约责任与提前终止",
    ],
  },
  {
    id: "cooperation-startup",
    name: "合伙合作框架协议",
    category: "合作协议",
    tags: ["合作", "投资"],
    level: "进阶",
    briefDescription: "适合创业伙伴或公司之间的合作框架协议，明确权责与退出机制。",
    scene: "适合初创团队或项目合作",
    outline: [
      "合作范围与目标",
      "投资金额与出资方式",
      "收益分配与成本承担",
      "管理架构与决策机制",
      "退出机制与争议解决",
    ],
  },
  {
    id: "nda-standard",
    name: "保密协议（双向）",
    category: "保密协议",
    tags: ["保密", "公司"],
    level: "基础",
    briefDescription: "双向约束的保密协议，适合项目合作、商务洽谈阶段签署。",
    scene: "适合商务合作初期的交流",
    outline: [
      "保密信息范围与例外",
      "双方保密义务",
      "信息使用与存储安全",
      "违约责任与损害赔偿",
      "协议期限与适用法律",
    ],
  },
  {
    id: "ip-license",
    name: "知识产权许可协议",
    category: "知识产权",
    tags: ["知识产权", "公司"],
    level: "进阶",
    briefDescription: "约定商标/著作权许可方式、区域、费用以及违约责任。",
    scene: "适合品牌合作或IP授权",
    outline: [
      "许可标的与权利范围",
      "许可方式与期限",
      "费用、结算与税费",
      "质量控制与监督",
      "违约责任与争议解决",
    ],
  },
];
