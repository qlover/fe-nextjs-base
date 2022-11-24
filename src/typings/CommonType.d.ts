declare namespace CommonType {
  type IpInfoType = {
    ipv4: string;
    ipv6: string;
    // os: string;
    // browser: string;

    isp: string;
    /**
     * 国家
     */
    country: string;
    /**
     * 区域
     */
    region: string;
    /**
     * 城市
     */
    city: string;

    /** 纬度 */
    lat: number;
    /** 经度 */
    lng: number;

    overseas: boolean;
  };
  type MethodType = {
    id: number;
    price: number;
    prefixUnit: string;
    unit: string;
    name: string | number;
    /**
     * 顶部类型，比如 1Month,2 Years
     */
    time: any;
    /**
     * 计费方法
     */
    // billingMethod: number;
    type: number; // 类型：1 日，2 月，3 季，4 年

    duration: number;
    nameI18nKey: string;

    /**
     * 描述
     */
    description: string;

    /**
     * 推荐
     */
    isRecommend: number;

    /**
     * 百分比
     */
    percent: number;
    /**
     * 折扣金额
     */
    percentMoney: number;

    /**
     * 支付折扣钱的金额
     */
    payMoney: number;

    /**
     * 支付折扣后的金额
     */
    payMoneyDiscount: number;
    sort: number;
  };
}
