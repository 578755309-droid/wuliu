const DEFAULT_TASK_TYPE = window.DispatchTaskNodes.defaultType;
const TASK_NODE_SEQUENCES = window.DispatchTaskNodes.sequences;
const dispatchSeed = [
  { id: "PD-1001", waybillNo: "WB20260916001", orderDate: "2026-09-16", routeId: "XL-001", routeName: "北仑港至江北仓", origin: "宁波北仑港区二期", destination: "宁波江北物流园", dispatchTime: "2026-09-16 08:35", driverId: "SJ-1001", driverName: "王海", phone: "13800008881", vehicleId: "浙B·K7812", status: "运输中", currentNode: "在途", boxes: "TCLU8374621 / 40HQ", estimatedRevenue: 2860, commission: 420, note: "上午装柜", pushed: true, timeline: [{ node: "已派单", time: "2026-09-16 08:35", desc: "派单已推送至司机微信小程序", photos: [] }, { node: "已提货", time: "2026-09-16 10:12", desc: "司机已完成提货，上传装柜现场照片", photos: ["装柜现场-001.jpg"] }, { node: "在途", time: "2026-09-16 11:05", desc: "车辆驶离装货地，运输中", photos: ["运输途中-001.jpg"] }] },
  { id: "PD-1002", waybillNo: "WB20260916002", orderDate: "2026-09-16", routeId: "XL-002", routeName: "洋山港至昆山保税区", origin: "上海洋山港", destination: "昆山综合保税区", dispatchTime: "2026-09-16 09:10", driverId: "SJ-1002", driverName: "赵亮", phone: "13900006662", vehicleId: "沪D·A9021", status: "已派单", currentNode: "待提货", boxes: "MSKU4920183 / MSKU4920184", estimatedRevenue: 3520, commission: 563.2, note: "双拖作业，按现场指引进港", pushed: true, timeline: [{ node: "已派单", time: "2026-09-16 09:10", desc: "派单已推送至司机微信小程序", photos: [] }] },
  { id: "PD-1003", waybillNo: "WB20260916003", orderDate: "2026-09-15", routeId: "XL-003", routeName: "萧山仓至梅山码头", origin: "杭州萧山仓", destination: "宁波梅山码头", dispatchTime: "2026-09-15 16:40", driverId: "SJ-1004", driverName: "陈涛", phone: "13600002228", vehicleId: "浙A·F2190", status: "已完成", currentNode: "已送达", boxes: "CMAU6502739 / 40GP", estimatedRevenue: 2550, commission: 350, note: "夜间进港", pushed: true, timeline: [{ node: "已派单", time: "2026-09-15 16:40", desc: "派单已推送至司机微信小程序", photos: [] }, { node: "已提货", time: "2026-09-15 18:22", desc: "完成提货", photos: ["提货现场-003.jpg"] }, { node: "已送达", time: "2026-09-16 06:55", desc: "货柜已送达梅山码头", photos: ["送达凭证-003.jpg"] }] },
  { id: "PD-1004", waybillNo: "WB20260916004", orderDate: "2026-09-14", routeId: "XL-004", routeName: "苏州园区至外高桥", origin: "苏州工业园区", destination: "上海外高桥五期", dispatchTime: "2026-09-14 14:20", driverId: "SJ-1003", driverName: "刘军", phone: "13700003335", vehicleId: "苏E·T5568", status: "取消", currentNode: "待派单", boxes: "OOLU3087642 / 20GP", estimatedRevenue: 1980, commission: 297, note: "线路价格调整，原派单取消", pushed: true, timeline: [{ node: "已派单", time: "2026-09-14 14:20", desc: "派单已推送至司机微信小程序", photos: [] }, { node: "取消", time: "2026-09-14 15:05", desc: "未开始提货，后台撤销派单", photos: [] }] },
  { id: "PD-1005", waybillNo: "WB20260916005", orderDate: "2026-09-16", routeId: "XL-001", routeName: "北仑港至江北仓", origin: "宁波北仑港区二期", destination: "宁波江北物流园", dispatchTime: "", driverId: "", driverName: "待分配", phone: "-", vehicleId: "", status: "待派单", currentNode: "待派单", boxes: "待装箱", estimatedRevenue: 2860, commission: 420, note: "等待调度", pushed: false, timeline: [] },
  { id: "PD-1006", waybillNo: "WB20260921006", orderDate: "2026-09-21", routeId: "XL-005", routeName: "外高桥至太仓港", origin: "上海外高桥港区六期", destination: "太仓港综合保税区", dispatchTime: "2026-09-21 07:45", driverId: "SJ-1002", driverName: "赵亮", phone: "13900006662", vehicleId: "沪D·A9021", status: "已派单", currentNode: "待提货", boxes: "TEMU7631058 / 40HQ", estimatedRevenue: 3180, commission: 480, note: "10:30 前完成提箱，进港需提前预约", pushed: true, timeline: [{ node: "已派单", time: "2026-09-21 07:45", desc: "派单已推送至司机微信小程序", photos: [] }] },
  { id: "PD-1007", waybillNo: "WB20260921007", orderDate: "2026-09-21", routeId: "XL-006", routeName: "临港新片区至洋山港", origin: "上海临港新片区物流园", destination: "洋山深水港四期码头", dispatchTime: "2026-09-21 08:20", driverId: "SJ-1002", driverName: "赵亮", phone: "13900006662", vehicleId: "沪D·A9021", status: "已派单", currentNode: "待提货", boxes: "FSCU9214670 / 20GP", estimatedRevenue: 2260, commission: 360, note: "重箱进港，请核对封号后发车", pushed: true, timeline: [{ node: "已派单", time: "2026-09-21 08:20", desc: "派单已推送至司机微信小程序", photos: [] }] },
  { id: "PD-1008", waybillNo: "WB20260920008", orderDate: "2026-09-20", routeId: "XL-007", routeName: "芦潮港至嘉兴综保区", origin: "上海芦潮港集装箱中心", destination: "嘉兴综合保税区", dispatchTime: "2026-09-20 13:30", driverId: "SJ-1002", driverName: "赵亮", phone: "13900006662", vehicleId: "沪D·A9021", status: "运输中", currentNode: "在途", boxes: "CAIU8172054 / 40HQ", estimatedRevenue: 2980, commission: 450, note: "预计 17:30 前送达", pushed: true, acceptedAt: "2026-09-20 13:42", timeline: [{ node: "已派单", time: "2026-09-20 13:30", desc: "派单已推送至司机微信小程序", photos: [] }, { node: "已接单", time: "2026-09-20 13:42", desc: "司机已确认接单", photos: [] }, { node: "已提货", time: "2026-09-20 14:25", desc: "已完成提货并核对箱封", photos: ["提货现场-008.jpg"] }, { node: "在途", time: "2026-09-20 14:48", desc: "车辆已发车，运输途中", photos: [] }] },
  { id: "PD-1009", waybillNo: "WB20260919009", orderDate: "2026-09-19", routeId: "XL-008", routeName: "洋山港至松江仓", origin: "洋山深水港三期码头", destination: "上海松江出口加工区", dispatchTime: "2026-09-19 08:10", driverId: "SJ-1002", driverName: "赵亮", phone: "13900006662", vehicleId: "沪D·A9021", status: "已完成", currentNode: "已送达", boxes: "TRHU6721843 / 20GP", estimatedRevenue: 2450, commission: 380, note: "凭预约号入仓", pushed: true, acceptedAt: "2026-09-19 08:16", timeline: [{ node: "已派单", time: "2026-09-19 08:10", desc: "派单已推送至司机微信小程序", photos: [] }, { node: "已接单", time: "2026-09-19 08:16", desc: "司机已确认接单", photos: [] }, { node: "已提货", time: "2026-09-19 09:02", desc: "已完成提货", photos: ["提货现场-009.jpg"] }, { node: "已送达", time: "2026-09-19 11:46", desc: "货物已安全送达目的地", photos: ["送达凭证-009.jpg"] }] },
  { id: "PD-1010", waybillNo: "WB20260918010", orderDate: "2026-09-18", routeId: "XL-009", routeName: "外高桥至昆山陆家仓", origin: "上海外高桥港区五期", destination: "昆山陆家物流园", dispatchTime: "2026-09-18 15:20", driverId: "SJ-1002", driverName: "赵亮", phone: "13900006662", vehicleId: "沪D·A9021", status: "取消", currentNode: "取消", boxes: "GESU5091872 / 40GP", estimatedRevenue: 2760, commission: 410, note: "客户调整装货计划，调度取消", pushed: true, acceptedAt: "2026-09-18 15:28", timeline: [{ node: "已派单", time: "2026-09-18 15:20", desc: "派单已推送至司机微信小程序", photos: [] }, { node: "已接单", time: "2026-09-18 15:28", desc: "司机已确认接单", photos: [] }, { node: "取消", time: "2026-09-18 15:50", desc: "客户调整计划，调度取消运单", photos: [] }] },
  { id: "PD-1011", waybillNo: "WB20261012011", taskType: "提空装货", orderDate: "2026-10-12", routeId: "XL-010", routeName: "外高桥港至嘉定仓", origin: "上海外高桥港区", destination: "上海嘉定物流园", dispatchTime: "2026-10-12 08:10", driverId: "SJ-1002", driverName: "赵亮", phone: "13900006662", vehicleId: "沪D·A9021", status: "运输中", currentNode: "完成装货", boxes: "TGHU8317205 / 40HQ", estimatedRevenue: 3120, commission: 468, note: "装货照片已齐，准备重箱进站", pushed: true, acceptedAt: "2026-10-12 08:16", timeline: [{ node: "已派单", time: "2026-10-12 08:10", desc: "派单已推送至司机微信小程序", photos: [] }, { node: "已接单", time: "2026-10-12 08:16", desc: "司机已确认接单", photos: [] }, { node: "已提空", time: "2026-10-12 09:02", desc: "已提取空箱", photos: [] }, { node: "空箱在途", time: "2026-10-12 09:35", desc: "空箱运往客户仓库", photos: [] }, { node: "到达仓库", time: "2026-10-12 10:12", desc: "车辆到达客户仓库", photos: [] }, { node: "完成装货", time: "2026-10-12 11:20", desc: "仓库装货完成", photos: [] }] },
  { id: "PD-1012", waybillNo: "WB20261012012", taskType: "排空箱（A→B）", orderDate: "2026-10-12", routeId: "XL-011", routeName: "洋山港至临港堆场", origin: "上海洋山港", destination: "上海临港堆场", dispatchTime: "2026-10-12 09:05", driverId: "SJ-1002", driverName: "赵亮", phone: "13900006662", vehicleId: "沪D·A9021", status: "运输中", currentNode: "已提空", boxes: "UACU4126801 / 20GP", estimatedRevenue: 2180, commission: 327, note: "空箱已提取，直接送往 B 地", pushed: true, acceptedAt: "2026-10-12 09:11", timeline: [{ node: "已派单", time: "2026-10-12 09:05", desc: "派单已推送至司机微信小程序", photos: [] }, { node: "已接单", time: "2026-10-12 09:11", desc: "司机已确认接单", photos: [] }, { node: "已提空", time: "2026-10-12 10:02", desc: "空箱已提取，箱体照片已上传", photos: [] }] },
  { id: "PD-1013", waybillNo: "WB20261012013", taskType: "排重箱（A→B）", orderDate: "2026-10-12", routeId: "XL-012", routeName: "宁波北仑港至梅山码头", origin: "宁波北仑港区", destination: "宁波梅山码头", dispatchTime: "2026-10-12 07:40", driverId: "SJ-1002", driverName: "赵亮", phone: "13900006662", vehicleId: "沪D·A9021", status: "运输中", currentNode: "重箱在途", boxes: "FCIU7350192 / 40HQ", estimatedRevenue: 2680, commission: 402, note: "重箱在途，进站时需上传铁路临封照片", pushed: true, acceptedAt: "2026-10-12 07:48", timeline: [{ node: "已派单", time: "2026-10-12 07:40", desc: "派单已推送至司机微信小程序", photos: [] }, { node: "已接单", time: "2026-10-12 07:48", desc: "司机已确认接单", photos: [] }, { node: "已提重", time: "2026-10-12 08:26", desc: "重箱已提取，关门照与封号照已上传", photos: [] }, { node: "重箱在途", time: "2026-10-12 08:50", desc: "重箱驶往铁路中心", photos: [] }] },
  { id: "PD-1014", waybillNo: "WB20261012014", taskType: "提重送货", orderDate: "2026-10-12", routeId: "XL-013", routeName: "洋山港至松江仓", origin: "上海洋山深水港", destination: "上海松江出口加工区", dispatchTime: "2026-10-12 06:50", driverId: "SJ-1002", driverName: "赵亮", phone: "13900006662", vehicleId: "沪D·A9021", status: "运输中", currentNode: "空箱在途", boxes: "TCLU6019237 / 20GP", estimatedRevenue: 2540, commission: 381, note: "空箱已返程，进站需上传 5 张空箱照片", pushed: true, acceptedAt: "2026-10-12 06:56", timeline: [{ node: "已派单", time: "2026-10-12 06:50", desc: "派单已推送至司机微信小程序", photos: [] }, { node: "已接单", time: "2026-10-12 06:56", desc: "司机已确认接单", photos: [] }, { node: "已提重", time: "2026-10-12 07:32", desc: "已提取重箱，关门照和封号照已上传", photos: [] }, { node: "重箱在途", time: "2026-10-12 08:05", desc: "重箱运往客户仓库", photos: [] }, { node: "到达仓库", time: "2026-10-12 08:46", desc: "车辆到达仓库", photos: [] }, { node: "完成卸货", time: "2026-10-12 10:14", desc: "卸货完成，过程照片已上传", photos: [] }, { node: "空箱在途", time: "2026-10-12 10:35", desc: "空箱驶往铁路中心", photos: [] }] },
];

const drivers = {
  "SJ-1001": { id: "SJ-1001", name: "王海", phone: "13800008881", idCard: "330206198805182418", licenseNo: "330206198805182418", qualificationNo: "330206002891", type: "自有司机", fleet: "宁波一队", licenseClass: "A2", licenseExpiry: "2028-03-12", qualificationExpiry: "2027-08-20" },
  "SJ-1002": { id: "SJ-1002", name: "赵亮", phone: "13900006662", idCard: "310115198912093617", licenseNo: "310115198912093617", qualificationNo: "310115006720", type: "自有司机", fleet: "临港车队", licenseClass: "A2", licenseExpiry: "2027-11-06", qualificationExpiry: "2027-05-18" },
  "SJ-1003": { id: "SJ-1003", name: "刘军", phone: "13700003335", idCard: "320500198706263011", licenseNo: "320500198706263011", qualificationNo: "320500003109", type: "自有司机", fleet: "苏州二队", licenseClass: "A2", licenseExpiry: "2026-10-06", qualificationExpiry: "2026-09-28" },
  "SJ-1004": { id: "SJ-1004", name: "陈涛", phone: "13600002228", idCard: "330109199003154812", licenseNo: "330109199003154812", qualificationNo: "330109007721", type: "自有司机", fleet: "杭州车队", licenseClass: "A2", licenseExpiry: "2029-02-15", qualificationExpiry: "2028-01-22" },
};

const vehicles = {
  "浙B·K7812": { type: "集装箱牵引车", fleet: "宁波港区集卡车队", state: "在用", permitNo: "浙交运管字 330206-7812", inspectionDue: "2027-03-18" },
  "沪D·A9021": { type: "重型半挂牵引车", fleet: "临港外协集卡车队", state: "在用", permitNo: "沪交运管字 330206-889", inspectionDue: "2027-03-18" },
  "苏E·T5568": { type: "集装箱骨架车", fleet: "苏州园区集卡车队", state: "停用", permitNo: "苏交运管字 320500-5568", inspectionDue: "2026-12-06" },
  "浙A·F2190": { type: "危险品牵引车", fleet: "杭州危险品运输车队", state: "在用", permitNo: "浙交运管字 330109-2190", inspectionDue: "2027-06-22" },
};

Object.values(drivers).forEach((driver) => {
  driver.capacityOwnership = window.CapacityOwnership.normalizeType(driver.capacityOwnership || driver.type);
  driver.organizationName = driver.capacityOwnership === "自营" ? "本公司" : driver.supplierName || driver.fleet;
});

function syncDriverArchive() {
  const snapshot = window.AdminDataBridge?.read();
  if (!Array.isArray(snapshot?.drivers)) return;
  snapshot.drivers.forEach((record) => {
    if (!record?.id || !drivers[record.id]) return;
    const normalized = window.CapacityOwnership.normalizeResource({ ...record }, "driver");
    Object.assign(drivers[record.id], normalized, { type: normalized.driverType });
  });
}

function syncVehicleArchive() {
  const snapshot = window.AdminDataBridge?.read();
  if (!Array.isArray(snapshot?.vehicles)) return;
  const next = {};
  snapshot.vehicles.forEach((vehicle) => {
    if (!vehicle?.plateNo) return;
    const assignedName = String(vehicle.driver || "").split("/")[0].trim();
    const driver = Object.values(drivers).find((item) => item.name === assignedName);
    next[vehicle.plateNo] = {
      ...vehicles[vehicle.plateNo],
      type: vehicle.vehicleType || vehicles[vehicle.plateNo]?.type || "车辆",
      fleet: vehicle.fleetName || vehicle.fleet || "",
      state: vehicle.vehicleState || "在用",
      driverId: driver?.id || "",
      capacityOwnership: window.CapacityOwnership.normalizeType(vehicle.capacityOwnership || vehicle.ownership),
      supplierName: vehicle.supplierName || "",
      organizationName: window.CapacityOwnership.organizationName(vehicle),
      permitNo: vehicle.permitNo || vehicles[vehicle.plateNo]?.permitNo || "",
      inspectionDue: vehicle.inspectionDue || vehicle.annualInspectionDue || vehicles[vehicle.plateNo]?.inspectionDue || "",
      insuranceNo: vehicle.mandatoryInsuranceNo || vehicle.insuranceNo || "",
      insuranceDue: vehicle.mandatoryInsuranceExpiry || vehicle.insuranceDue || "",
      mandatoryInsuranceCompany: vehicle.mandatoryInsuranceCompany || "",
      mandatoryInsuranceNo: vehicle.mandatoryInsuranceNo || vehicle.insuranceNo || "",
      mandatoryInsuranceExpiry: vehicle.mandatoryInsuranceExpiry || vehicle.insuranceDue || "",
      commercialInsuranceCompany: vehicle.commercialInsuranceCompany || "",
      commercialInsuranceNo: vehicle.commercialInsuranceNo || "",
      commercialInsuranceExpiry: vehicle.commercialInsuranceExpiry || "",
      cargoInsuranceNo: vehicle.cargoInsuranceNo || "",
      cargoInsuranceExpiry: vehicle.cargoInsuranceExpiry || "",
    };
  });
  Object.keys(vehicles).forEach((plate) => delete vehicles[plate]);
  Object.assign(vehicles, next);
}

syncVehicleArchive();
syncDriverArchive();

const waybillMeta = {
  WB20260916001: { taskType: "提空装货", customer: "宁波海拓供应链有限公司", billNo: "BL-NB-26091601", containerType: "40HQ", sealNo: "SEAL831942", loadAddress: "宁波市北仑区港兴路 88 号" },
  WB20260916002: { taskType: "提重送货", customer: "上海临港国际物流有限公司", billNo: "BL-SH-26091622", containerType: "双拖", sealNo: "SEAL440182 / SEAL440183", loadAddress: "上海洋山深水港四期码头" },
  WB20260916003: { taskType: "排空箱（A→B）", customer: "杭州华远进出口有限公司", billNo: "BL-HZ-26091508", containerType: "40GP", sealNo: "SEAL650273", loadAddress: "杭州市萧山区临浦物流园 6 号库" },
  WB20260916004: { taskType: "排重箱（A→B）", customer: "苏州园区保税物流中心", billNo: "BL-SZ-26091411", containerType: "20GP", sealNo: "SEAL308764", loadAddress: "苏州工业园区现代大道 168 号" },
  WB20260921006: { taskType: "提空装货", customer: "上海盛达国际货运有限公司", billNo: "BL-SH-26092106", containerType: "40HQ", sealNo: "SEAL763105", loadAddress: "上海市浦东新区外高桥港区海通路 88 号" },
  WB20260921007: { taskType: "排重箱（A→B）", customer: "临港海运供应链有限公司", billNo: "BL-SH-26092107", containerType: "20GP", sealNo: "SEAL921467", loadAddress: "上海市浦东新区临港大道 1555 号" },
  WB20260920008: { taskType: "提重送货", customer: "嘉兴联运供应链有限公司", billNo: "BL-SH-26092008", containerType: "40HQ", sealNo: "SEAL817205", loadAddress: "上海市浦东新区芦潮港路 1588 号" },
  WB20260919009: { taskType: "提重送货", customer: "上海松江国际物流有限公司", billNo: "BL-SH-26091909", containerType: "20GP", sealNo: "SEAL672184", loadAddress: "上海市浦东新区洋山港同汇路 66 号" },
  WB20260918010: { taskType: "提重送货", customer: "昆山陆港供应链有限公司", billNo: "BL-SH-26091810", containerType: "40GP", sealNo: "SEAL509187", loadAddress: "上海市浦东新区外高桥港区洲海路 999 号" },
  WB20261012011: { taskType: "提空装货", customer: "上海嘉定供应链有限公司", billNo: "BL-SH-26101211", containerType: "40HQ", sealNo: "SEAL831720", loadAddress: "上海市嘉定区物流园 18 号库" },
  WB20261012012: { taskType: "排空箱（A→B）", customer: "上海临港堆场服务有限公司", billNo: "BL-SH-26101212", containerType: "20GP", sealNo: "SEAL412680", loadAddress: "上海市临港新区堆场 3 区" },
  WB20261012013: { taskType: "排重箱（A→B）", customer: "宁波梅山港务有限公司", billNo: "BL-NB-26101213", containerType: "40HQ", sealNo: "SEAL735019", loadAddress: "宁波市北仑区港兴路 188 号" },
  WB20261012014: { taskType: "提重送货", customer: "上海松江国际物流有限公司", billNo: "BL-SH-26101214", containerType: "20GP", sealNo: "SEAL601923", loadAddress: "上海市松江出口加工区申港路 51 号" },
};

const DEFAULT_DRIVER_ID = "SJ-1002";
const DEFAULT_PENDING_IDS = ["PD-1002", "PD-1006", "PD-1007"];
const DEFAULT_ORDER_IDS = ["PD-1008", "PD-1009", "PD-1010"];
const DEFAULT_DEMO_IDS = new Set([...DEFAULT_PENDING_IDS, ...DEFAULT_ORDER_IDS]);
const CERTIFICATION_STORAGE_KEY = "container-logistics-driver-certifications-v1";
const EXPENSE_STORAGE_KEY = "container-logistics-driver-expenses-v1";
const ANNOUNCEMENT_STORAGE_KEY = "container-logistics-announcements-v1";
const DRIVER_MESSAGE_READ_STORAGE_KEY = "container-logistics-driver-message-read-v1";
const NODE_NOTIFICATION_STORAGE_KEY = "container-logistics-transport-node-notifications-v1";
const FONT_SIZE_STORAGE_KEY = "container-logistics-driver-font-size-v1";
const DRIVER_PROFILE_STORAGE_KEY = "container-logistics-driver-profile-v1";
const DRIVER_VEHICLE_STORAGE_KEY = "container-logistics-driver-vehicle-profile-v1";
const CERTIFICATION_DOCUMENT_GROUPS = Object.freeze([
  { key: "idCardFront", label: "身份证人像面", icon: "contact", accept: "image/*,.pdf" },
  { key: "idCardBack", label: "身份证国徽面", icon: "contact", accept: "image/*,.pdf" },
  { key: "licenseAttachment", label: "机动车驾驶证", icon: "badge-check", accept: "image/*,.pdf" },
  { key: "qualificationAttachment", label: "道路运输从业资格证", icon: "file-check-2", accept: "image/*,.pdf" },
]);
const FONT_SIZE_OPTIONS = Object.freeze({
  small: { label: "小号", scale: "0.92" },
  medium: { label: "中号", scale: "1" },
  large: { label: "大号", scale: "1.08" },
});
const DEMO_DRIVER_ANNOUNCEMENT = {
  id: "driver-demo-announcement-20261014",
  title: "关于规范运输途中安全作业的公告",
  content: "请各位司机运输途中遵守交通法规，装卸作业前确认现场安全。遇到异常情况请及时联系调度。",
  type: "公告",
  publishedAt: "2026-10-14 09:15",
};
const EXPENSE_TYPES = Object.freeze([
  { key: "fuel", label: "加油", hint: "柴油、汽油等燃油支出" },
  { key: "electricity", label: "充电", hint: "充电及换电支出" },
  { key: "gas", label: "燃气费", hint: "天然气等燃气支出" },
  { key: "toll", label: "路桥费", hint: "高速、桥隧通行支出" },
  { key: "parking", label: "停车费", hint: "停车及场站服务支出" },
  { key: "repair", label: "维修", hint: "车辆维修及配件支出" },
  { key: "container", label: "提箱费", hint: "提箱及箱务相关支出" },
  { key: "other", label: "其他", hint: "手动录入其他费用名称" },
]);
const certificationDefaults = {
  "SJ-1001": { status: "verified", submittedAt: "2026-08-12 09:20", reviewedAt: "2026-08-12 11:05" },
  "SJ-1002": { status: "verified", submittedAt: "2026-08-12 09:20", reviewedAt: "2026-08-12 11:05" },
  "SJ-1003": { status: "pending", submittedAt: "2026-09-20 15:36", reviewedAt: "" },
  "SJ-1004": { status: "verified", submittedAt: "2026-08-12 09:20", reviewedAt: "2026-08-12 11:05" },
};
const certificationMigrations = {
  "SJ-1002": { from: "unverified", to: "verified" },
  "SJ-1004": { from: "rejected", to: "verified", legacyReason: "身份证背面照片模糊，请重新上传" },
};

function loadCertifications() {
  try {
    const stored = JSON.parse(localStorage.getItem(CERTIFICATION_STORAGE_KEY) || "{}");
    const merged = { ...certificationDefaults, ...stored };
    localStorage.setItem(CERTIFICATION_STORAGE_KEY, JSON.stringify(merged));
    return merged;
  } catch {
    return { ...certificationDefaults };
  }
}

function loadFontSize() {
  try {
    const saved = localStorage.getItem(FONT_SIZE_STORAGE_KEY);
    return FONT_SIZE_OPTIONS[saved] ? saved : "medium";
  } catch {
    return "medium";
  }
}

function applyFontSize(size = state.fontSize, persist = true) {
  const normalized = FONT_SIZE_OPTIONS[size] ? size : "medium";
  state.fontSize = normalized;
  document.documentElement.dataset.mobileFontSize = normalized;
  const shell = document.querySelector(".phone-shell");
  if (shell) shell.dataset.fontSize = normalized;
  document.querySelectorAll(".font-size-options button[data-font-size]").forEach((button) => {
    const active = button.dataset.fontSize === normalized;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  if (persist) {
    try { localStorage.setItem(FONT_SIZE_STORAGE_KEY, normalized); } catch { /* storage may be unavailable in private mode */ }
  }
}

function saveCertifications(certifications) {
  localStorage.setItem(CERTIFICATION_STORAGE_KEY, JSON.stringify(certifications));
}

function loadDriverProfiles() {
  try {
    const stored = JSON.parse(localStorage.getItem(DRIVER_PROFILE_STORAGE_KEY) || "{}");
    Object.entries(stored).forEach(([driverId, profile]) => {
      if (drivers[driverId] && profile && typeof profile === "object") Object.assign(drivers[driverId], profile);
    });
  } catch { /* retain demo profile defaults */ }
}

function saveDriverProfiles() {
  const editableFields = ["name", "phone", "fleet", "address", "emergencyContact", "licenseNo", "licenseClass", "licenseExpiry", "qualificationNo", "qualificationExpiry"];
  const profiles = Object.fromEntries(Object.entries(drivers).map(([driverId, driver]) => [
    driverId,
    Object.fromEntries(editableFields.map((field) => [field, driver[field] || ""])),
  ]));
  localStorage.setItem(DRIVER_PROFILE_STORAGE_KEY, JSON.stringify(profiles));
}

loadDriverProfiles();

function loadDriverVehicleProfiles() {
  try {
    const stored = JSON.parse(localStorage.getItem(DRIVER_VEHICLE_STORAGE_KEY) || "{}");
    Object.entries(stored).forEach(([plateNo, profile]) => {
      if (vehicles[plateNo] && profile && typeof profile === "object") Object.assign(vehicles[plateNo], profile);
    });
  } catch { /* retain synchronized vehicle data */ }
}

function saveDriverVehicleProfile(plateNo) {
  const vehicle = vehicles[plateNo];
  if (!vehicle) return;
  let stored = {};
  try { stored = JSON.parse(localStorage.getItem(DRIVER_VEHICLE_STORAGE_KEY) || "{}"); } catch { stored = {}; }
  stored[plateNo] = {
    type: vehicle.type || "",
    fleet: vehicle.fleet || "",
    permitNo: vehicle.permitNo || "",
    inspectionDue: vehicle.inspectionDue || "",
  };
  localStorage.setItem(DRIVER_VEHICLE_STORAGE_KEY, JSON.stringify(stored));

  const snapshot = window.AdminDataBridge.read() || {};
  const vehicleRows = Array.isArray(snapshot.vehicles) ? snapshot.vehicles.slice() : [];
  const index = vehicleRows.findIndex((item) => item.plateNo === plateNo);
  const current = index >= 0 ? vehicleRows[index] : { plateNo };
  const next = {
    ...current,
    plateNo,
    vehicleType: vehicle.type,
    fleetName: vehicle.fleet,
    vehicleState: vehicle.state,
    capacityOwnership: vehicle.capacityOwnership || current.capacityOwnership || "",
    supplierName: vehicle.supplierName || current.supplierName || "",
    permitNo: vehicle.permitNo,
    inspectionDue: vehicle.inspectionDue,
  };
  if (index >= 0) vehicleRows[index] = next;
  else vehicleRows.push(next);
  window.AdminDataBridge.write({ ...snapshot, vehicles: vehicleRows });
}

loadDriverVehicleProfiles();

function credentialAttachmentMap(certification = {}) {
  const stored = certification.attachments && typeof certification.attachments === "object" ? certification.attachments : {};
  return Object.fromEntries(CERTIFICATION_DOCUMENT_GROUPS.map((group) => {
    const current = Array.isArray(stored[group.key]) ? stored[group.key].filter(Boolean) : [];
    if (current.length) return [group.key, current];
    const legacyNames = typeof certification[group.key] === "string"
      ? certification[group.key].split("、").map((name) => name.trim()).filter(Boolean)
      : [];
    return [group.key, legacyNames.map((name, index) => ({ id: "", name, type: "", uploadedAt: certification.submittedAt || "", legacy: true, index }))];
  }));
}

function syncCredentialAttachmentNames(certification) {
  const attachments = credentialAttachmentMap(certification);
  certification.attachments = attachments;
  CERTIFICATION_DOCUMENT_GROUPS.forEach((group) => {
    certification[group.key] = attachments[group.key].map((item) => item.name).join("、");
  });
  return certification;
}

async function replaceCredentialAttachmentsFromForm(form, certification, requireAll = false) {
  const current = credentialAttachmentMap(certification);
  const next = { ...current };
  const pendingBlobs = [];
  const replacedIds = [];
  let changed = false;

  for (const group of CERTIFICATION_DOCUMENT_GROUPS) {
    const input = form.elements[group.key];
    const files = Array.from(input?.files || []);
    const card = input?.closest("[data-credential-upload-card]");
    const removeExisting = card?.dataset.removeExisting === "true";
    if (files.length > 6) return { error: `${group.label}最多上传 6 个文件` };
    const invalid = files.find((file) => !(file.type.startsWith("image/") || file.type === "application/pdf" || /\.(?:jpe?g|png|webp|heic|pdf)$/i.test(file.name)));
    if (invalid) return { error: `${group.label}仅支持图片或 PDF` };
    const oversized = files.find((file) => file.size > 10 * 1024 * 1024);
    if (oversized) return { error: `${group.label}单个文件不能超过 10 MB` };
    if (files.length) {
      changed = true;
      replacedIds.push(...current[group.key].map((item) => item.id).filter(Boolean));
      next[group.key] = files.map((file, index) => {
        const attachment = {
          id: `credential-${state.currentDriverId}-${group.key}-${Date.now()}-${index}-${Math.random().toString(36).slice(2)}`,
          name: file.name,
          type: file.type || "application/octet-stream",
          uploadedAt: window.DispatchStore.nowText(),
        };
        pendingBlobs.push({ id: attachment.id, blob: file });
        return attachment;
      });
    } else if (removeExisting) {
      changed = true;
      replacedIds.push(...current[group.key].map((item) => item.id).filter(Boolean));
      next[group.key] = [];
    }
    if (requireAll && !next[group.key].length) return { error: `请上传${group.label}` };
  }

  if (pendingBlobs.length) await window.DispatchStore.savePhotos(pendingBlobs);
  if (replacedIds.length) await window.DispatchStore.deletePhotos(replacedIds).catch(() => {});
  certification.attachments = next;
  syncCredentialAttachmentNames(certification);
  return { changed };
}

function loadExpenses() {
  try {
    const stored = JSON.parse(localStorage.getItem(EXPENSE_STORAGE_KEY) || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

function saveExpenses(expenses) {
  localStorage.setItem(EXPENSE_STORAGE_KEY, JSON.stringify(expenses));
}

function loadAnnouncements() {
  try {
    const stored = JSON.parse(localStorage.getItem(ANNOUNCEMENT_STORAGE_KEY) || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

function currentDriverAnnouncements() {
  const driverId = state.currentDriverId;
  return loadAnnouncements()
    .filter((item) => item?.status === "已发布" && (item.scope === "全部司机" || item.targetDriverIds?.includes(driverId)))
    .sort((left, right) => String(right.publishedAt || "").localeCompare(String(left.publishedAt || "")));
}

function loadReadDriverMessageIds() {
  try {
    const stored = JSON.parse(localStorage.getItem(DRIVER_MESSAGE_READ_STORAGE_KEY) || "{}");
    return stored && typeof stored === "object" && !Array.isArray(stored) ? stored : {};
  } catch {
    return {};
  }
}

function driverMessages() {
  const readByDriver = loadReadDriverMessageIds();
  const readIds = new Set(readByDriver[state.currentDriverId] || []);
  const messages = [];
  const dispatches = driverDispatches();
  const pendingDispatches = dispatches
    .filter((item) => item.status === "已派单")
    .sort((left, right) => String(right.dispatchTime || "").localeCompare(String(left.dispatchTime || "")));
  const activeDispatches = dispatches
    .filter((item) => item.status === "运输中" && item.currentNode)
    .sort((left, right) => String(right.dispatchTime || "").localeCompare(String(left.dispatchTime || "")));

  pendingDispatches.slice(0, 2).forEach((item) => messages.push({
    id: `task-${item.id}`,
    type: "task",
    title: "收到新的运输任务",
    desc: `${item.waybillNo} · ${item.routeName}，请及时查看任务并确认接单。`,
    time: String(item.dispatchTime || "今天").replace("T", " ").slice(0, 16),
    dispatchId: item.id,
    icon: "clipboard-list",
  }));

  activeDispatches.slice(0, 2).forEach((item) => messages.push({
    id: `node-${item.id}-${item.currentNode}`,
    type: "task",
    title: "运输节点已同步",
    desc: `${item.waybillNo} 当前节点：${item.currentNode}。`,
    time: String(item.updateTime || item.dispatchTime || "今天").replace("T", " ").slice(0, 16),
    dispatchId: item.id,
    icon: "map-pinned",
  }));

  try {
    const nodeNotifications = JSON.parse(localStorage.getItem(NODE_NOTIFICATION_STORAGE_KEY) || "[]");
    (Array.isArray(nodeNotifications) ? nodeNotifications : [])
      .filter((item) => (item.channels || []).includes("司机移动端")
        && (item.recipients || []).includes("司机")
        && (!item.driverId || item.driverId === state.currentDriverId))
      .forEach((item) => messages.push({
        id: `node-${item.id}`,
        type: "task",
        title: item.title || "运输节点提醒",
        desc: item.content || `${item.waybillNo} · ${item.nodeName}`,
        time: item.createdAt ? new Date(item.createdAt).toLocaleString("zh-CN", { hour12: false }) : "刚刚",
        dispatchId: item.dispatchId,
        icon: "map-pinned",
      }));
  } catch (_error) { /* Keep the rest of the driver message center available. */ }

  const driver = currentDriver();
  [
    { label: "驾驶证", date: driver.licenseExpiry },
    { label: "道路运输从业资格证", date: driver.qualificationExpiry },
  ].forEach((document) => {
    const remaining = daysUntil(document.date);
    if (remaining > 30) return;
    messages.push({
      id: `warning-${state.currentDriverId}-${document.label}`,
      type: "warning",
      title: remaining < 0 ? `${document.label}已过期` : `${document.label}即将到期`,
      desc: remaining < 0 ? `证件有效期至 ${document.date}，请尽快办理更新。` : `证件将在 ${remaining} 天后到期，请及时办理更新。`,
      time: "证件提醒",
      icon: "triangle-alert",
    });
  });

  const announcements = [DEMO_DRIVER_ANNOUNCEMENT, ...currentDriverAnnouncements()];
  announcements.forEach((item, index) => messages.push({
    id: item.id || `announcement-${state.currentDriverId}-${index}`,
    type: "announcement",
    title: item.title || "司机公告",
    desc: item.content || "有一条新公告，请查看。",
    time: item.publishedAt || "刚刚",
    attachment: item.attachment,
    icon: "megaphone",
  }));

  return messages.map((item) => ({ ...item, unread: !readIds.has(item.id) }));
}

function saveDriverMessageReadIds(readIds) {
  const stored = loadReadDriverMessageIds();
  stored[state.currentDriverId] = [...new Set(readIds)];
  localStorage.setItem(DRIVER_MESSAGE_READ_STORAGE_KEY, JSON.stringify(stored));
}

function renderDriverMessages() {
  const messages = driverMessages();
  const unreadCount = messages.filter((item) => item.unread).length;
  const filter = state.driverMessageFilter;
  const filteredMessages = messages.filter((item) => filter === "all" || item.type === filter);
  const badge = document.querySelector("#navMessageBadge");
  const profileBadge = document.querySelector("#messageBadge");
  document.querySelector("#driverUnreadSummary").textContent = `${unreadCount} 条未读消息`;
  badge.textContent = String(unreadCount);
  badge.hidden = unreadCount === 0;
  if (profileBadge) {
    profileBadge.textContent = String(unreadCount);
    profileBadge.hidden = unreadCount === 0;
  }
  document.querySelector("#driverMessageList").innerHTML = filteredMessages.length
    ? filteredMessages.map((item) => `
      <button class="driver-message-item ${item.unread ? "unread" : ""} message-${item.type}" data-driver-message-id="${h(item.id)}" ${item.dispatchId ? `data-message-dispatch-id="${h(item.dispatchId)}"` : ""} type="button">
        <span class="driver-message-icon ${item.type}"><i data-lucide="${item.icon}"></i></span>
        <span class="driver-message-copy"><strong>${h(item.title)}</strong><p>${h(item.desc)}</p>${item.attachment ? `<small>附件：${h(item.attachment)}</small>` : ""}<time>${h(item.time)}</time></span>
        ${item.unread ? '<i class="driver-message-unread-dot" aria-label="未读"></i>' : ""}
      </button>`).join("")
    : `${window.JikaEmptyStates.render("empty-messages")}`;
  window.lucide?.createIcons();
}

function markDriverMessageRead(id) {
  const stored = loadReadDriverMessageIds();
  const readIds = new Set(stored[state.currentDriverId] || []);
  readIds.add(id);
  saveDriverMessageReadIds([...readIds]);
  renderDriverMessages();
}

function normalizeDemoDispatches(dispatches) {
  const result = dispatches.map((item) => ({ ...item, taskType: dispatchTaskType(item) }));
  const seedById = new Map(dispatchSeed.map((item) => [item.id, item]));
  const existingIds = new Set(result.map((item) => item.id));

  dispatchSeed.forEach((item) => {
    if (!existingIds.has(item.id)) result.push({ ...item });
  });

  const restoreSeed = (id) => {
    const seed = seedById.get(id);
    const index = result.findIndex((item) => item.id === id);
    if (!seed) return;
    if (index === -1) result.push({ ...seed });
    else result[index] = { ...seed };
  };

  let pendingCount = result.filter((item) => item.driverId === DEFAULT_DRIVER_ID && item.status === "已派单").length;
  for (const id of DEFAULT_PENDING_IDS) {
    if (pendingCount >= 3) break;
    const current = result.find((item) => item.id === id);
    if (current?.status === "已派单") continue;
    restoreSeed(id);
    pendingCount += 1;
  }

  let orderCount = result.filter((item) => item.driverId === DEFAULT_DRIVER_ID && item.status !== "已派单" && item.currentNode !== "已拒绝").length;
  for (const id of DEFAULT_ORDER_IDS) {
    if (orderCount >= 3) break;
    const current = result.find((item) => item.id === id);
    if (current?.status !== "已派单" && current?.currentNode !== "已拒绝") continue;
    restoreSeed(id);
    orderCount += 1;
  }

  return result;
}

function loadDispatches() {
  const stored = window.DispatchStore.load(dispatchSeed);
  const normalized = normalizeDemoDispatches(stored);
  if (JSON.stringify(stored) !== JSON.stringify(normalized)) window.DispatchStore.save(normalized);
  return normalized;
}

function mergeDefaultExamples(incoming, current) {
  const incomingIds = new Set(incoming.map((item) => item.id));
  const missingExamples = current.filter((item) => DEFAULT_DEMO_IDS.has(item.id) && !incomingIds.has(item.id));
  return [...incoming, ...missingExamples].map((item) => ({ ...item, taskType: dispatchTaskType(item) }));
}

const state = {
  dispatches: loadDispatches(),
  currentDriverId: DEFAULT_DRIVER_ID,
  driverMessageFilter: "all",
  workStage: "active",
  orderFilter: "all",
  orderStage: "all",
  orderSearch: "",
  activeDispatchId: "",
  activeProfilePage: "",
  activeExpenseType: "",
  expenseRecordFilter: "all",
  activeFeedbackTab: "submit",
  fontSize: loadFontSize(),
  expenses: loadExpenses(),
  repairs: window.VehicleRepair.load(),
  certifications: loadCertifications(),
};

const elements = {
  header: document.querySelector("#mobileHeader"),
  title: document.querySelector("#mobileTitle"),
  tasksView: document.querySelector("#tasksView"),
  messagesView: document.querySelector("#messagesView"),
  profileView: document.querySelector("#profileView"),
  bottomNav: document.querySelector("#bottomNav"),
  taskList: document.querySelector("#taskList"),
  detailView: document.querySelector("#detailView"),
  detailContent: document.querySelector("#detailContent"),
  detailActionBar: document.querySelector("#detailActionBar"),
  rejectDialog: document.querySelector("#rejectDialog"),
  progressDialog: document.querySelector("#progressDialog"),
  profileSubpage: document.querySelector("#profileSubpage"),
  subpageTitle: document.querySelector("#subpageTitle"),
  subpageContent: document.querySelector("#subpageContent"),
  toast: document.querySelector("#toast"),
};

function h(value) {
  return String(value ?? "").replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
}

function todayInputValue() {
  const date = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function maskPhone(phone) {
  return String(phone).replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
}

function maskIdCard(idCard) {
  return String(idCard || "").replace(/^(\d{6})\d+(\w{4})$/, "$1********$2");
}

function maskCredential(value) {
  const text = String(value || "");
  return text.length > 7 ? `${text.slice(0, 3)}********${text.slice(-4)}` : text;
}

function dispatchTimeText(value) {
  return String(value || "-").replace("T", " ").slice(0, 16);
}

function currentDriver() {
  return drivers[state.currentDriverId] || drivers["SJ-1002"];
}

function currentCertification() {
  return state.certifications[state.currentDriverId] || { status: "unverified" };
}

function certificationMeta(status) {
  return {
    unverified: { label: "未认证", className: "unverified" },
    pending: { label: "审核中", className: "pending" },
    verified: { label: "已认证", className: "verified" },
    rejected: { label: "已驳回", className: "rejected" },
  }[status] || { label: "未认证", className: "unverified" };
}

const EXPENSE_RECORD_STATUSES = Object.freeze([{ key: "all", label: "全部费用" }, { key: "pending", label: "待审核" }, { key: "approved", label: "已通过" }, { key: "rejected", label: "已驳回" }]);
const EXPENSE_STAT_ICONS = {'all': '<path d="M17 4h3v15h-3"/><rect x="4" y="3" width="13" height="18" rx="2"/><path d="M8 8h5M8 12h5M8 16h3" stroke="#0065FF"/>', 'pending': '<path d="M14 3H5a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8M14 3v5h5"/><path d="m14 3 5 5"/><circle cx="17" cy="16" r="5" fill="white"/><path d="M17 13v3l2 1" stroke="#0065FF" />', 'approved': '<path d="M14 3H5a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9l-6-6ZM14 3v6h6"/><path d="m8 14 3 3 5-5" stroke="#0065FF"/>', 'rejected': '<path d="M14 3H5a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9l-6-6ZM14 3v6h6"/><path d="m9 13 6 6m0-6-6 6" stroke="#0065FF"/>'};

function driverExpenseRecords(status = "all") {
  return state.expenses.filter((item) => item.driverId === state.currentDriverId && (status === "all" || item.status === status)).slice().sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
}

function renderExpenseStats() {
  const host = document.querySelector("#profileExpenseStats");
  if (!host) return;
  host.innerHTML = EXPENSE_RECORD_STATUSES.map(({ key, label }) => {
    const count = driverExpenseRecords(key).length;
    return `<button data-expense-status="${key}" type="button"><i class="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#17191d" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${EXPENSE_STAT_ICONS[key]}</svg><strong class="stat-count${count < 10 ? " is-single" : ""}">${count}</strong></i><span>${label}</span></button>`;
  }).join("");
}

function renderExpenseRecords() {
  const selected = EXPENSE_RECORD_STATUSES.some((item) => item.key === state.expenseRecordFilter) ? state.expenseRecordFilter : "all";
  const records = driverExpenseRecords(selected);
  elements.subpageContent.innerHTML = `<div class="expense-record-tabs" role="tablist" aria-label="审核状态">${EXPENSE_RECORD_STATUSES.map(({ key, label }) => `<button type="button" data-expense-status="${key}" role="tab" aria-selected="${key === selected}" class="${key === selected ? "active" : ""}">${key === "all" ? "全部" : label}</button>`).join("")}</div><div class="expense-list-summary"><span>当前结果</span><strong>${records.length} 条</strong></div>${records.length ? `<section class="info-section expense-history expense-full-history">${records.map((item) => { const status = expenseStatusMeta(item.status); return `<article class="expense-record"><div class="expense-record-top"><small>${h([item.waybillNo, item.vehicleId].filter(Boolean).join(" · "))}</small><em class="${status.className}">${status.label}</em></div><div class="expense-record-heading"><strong>${h(item.typeLabel)}</strong><b>¥ ${h(item.amount)}</b></div><span class="expense-record-date">${h(item.date)}</span>${item.remark ? `<small class="expense-record-remark">备注：${h(item.remark)}</small>` : ""}${item.status === "rejected" && item.rejectionReason ? `<small class="expense-rejection-reason">驳回原因：${h(item.rejectionReason)}</small>` : ""}</article>`; }).join("")}</section>` : `<div class="expense-empty">暂无${selected === "all" ? "费用上报" : EXPENSE_RECORD_STATUSES.find((item) => item.key === selected).label}记录</div>`}`;
}

function expenseStatusMeta(status) {
  return {
    pending: { label: "待审核", className: "pending" },
    approved: { label: "已通过", className: "approved" },
    rejected: { label: "已驳回", className: "rejected" },
  }[status] || { label: "待审核", className: "pending" };
}

function driverDispatches() {
  return state.dispatches.filter((item) => item.driverId === state.currentDriverId);
}

function acceptedOrders() {
  return driverDispatches().filter((item) => item.status !== "已派单" && item.currentNode !== "已拒绝");
}

function dispatchCategory(dispatch) {
  if (dispatch.status === "已派单") return "pending";
  if (dispatch.status === "已完成") return "completed";
  if (dispatch.currentNode === "已拒绝" || ["取消", "已取消", "待派单"].includes(dispatch.status)) return "cancelled";
  if (dispatch.status === "运输中" || isTaskAwaitingStart(dispatch) || isTaskInProgress(dispatch)) return "active";
  return "cancelled";
}

function statusLabel(dispatch) {
  if (dispatch.status === "运输中") return dispatch.currentNode || "运输中";
  if (dispatch.status === "取消" && dispatch.currentNode === "已拒绝") return "已拒绝";
  return dispatch.status;
}

function statusDescription(dispatch) {
  const descriptions = {
    已派单: "调度已派单，请及时确认任务",
    已接单: "已确认接单，请前往提货地点",
    待提货: "请前往提货地点并按要求装柜",
    已提货: "货物已提取，请确认发车",
    在途: "运输进行中，请注意行车安全",
    已送达: "本次运输任务已顺利完成",
    已拒绝: "已将拒单原因同步给调度员",
    待派单: "派单已被取消",
  };
  return descriptions[dispatch.currentNode] || descriptions[dispatch.status] || "任务状态已同步";
}

function dispatchTaskType(dispatch) {
  if (dispatch?.taskConfigSnapshot?.name) return dispatch.taskConfigSnapshot.name;
  const taskType = dispatch?.taskType || waybillMeta[dispatch?.waybillNo]?.taskType;
  return window.DispatchTaskNodes.resolve(taskType);
}

function dispatchJobLocations(dispatch) {
  const profileLocations = window.DispatchTaskNodes?.profile?.(dispatchTaskType(dispatch))?.jobLocations || [];
  const snapshotLocations = Array.isArray(dispatch.taskConfigSnapshot?.jobLocations) ? dispatch.taskConfigSnapshot.jobLocations : [];
  const configured = profileLocations.length ? profileLocations : snapshotLocations;
  const supplied = Array.isArray(dispatch.jobLocations) ? dispatch.jobLocations : [];
  if (supplied.length) return supplied.map((location, index) => ({
    name: location.name || configured.find((item) => item.id === location.id)?.name || `作业地点${index + 1}`,
    address: location.address || "",
  }));
  return configured.map((location, index) => {
    const name = location.name || `作业地点${index + 1}`;
    const normalizedName = name.replace(/\s/g, "");
    let address = "";
    if (/提空|提重|提箱/.test(normalizedName)) address = dispatch.pickupPoint || dispatch.origin || "";
    else if (/装货/.test(normalizedName)) address = dispatch.loadingPoint || dispatch.destination || "";
    else if (/卸货/.test(normalizedName)) address = dispatch.unloadingPoint || dispatch.destination || "";
    else if (/落重|还空|还重|还箱|落箱/.test(normalizedName)) address = dispatch.dropoffPoint || dispatch.returnPoint || dispatch.loadAddress || dispatch.destination || "";
    else if (index === 0) address = dispatch.origin || "";
    else if (index === configured.length - 1) address = dispatch.loadAddress || dispatch.destination || "";
    else address = dispatch.destination || "";
    return { name, address };
  });
}

function renderDispatchJobLocations(dispatch, className = "") {
  const locations = dispatchJobLocations(dispatch);
  if (className !== "detail-job-locations") {
    return window.MobileRouteDisplay.render(locations, {
      mileage: dispatch.routeMileageSnapshot ?? dispatch.mileage,
      segmentMileages: dispatch.segmentMileages,
    });
  }
  return `<section class="driver-job-locations ${className}" aria-label="作业地点"><div class="driver-job-location-heading"><strong>作业地点</strong><span>${locations.length} 个地点</span></div>${locations.map((location, index) => `<div class="driver-job-location-row"><span><i>${h(String(index + 1).padStart(2, "0"))}</i>${h(location.name)}</span><div class="driver-job-location-value"><strong>${h(location.address || "待补充")}</strong><button class="copy-location-icon" data-detail-action="navigate" data-copy-address="${h(location.address || "")}" aria-label="复制${h(location.name)}地址" type="button"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="8" y="8" width="12" height="13" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg></button></div></div>`).join("")}</section>`;
}

function taskNodes(dispatch) {
  const snapshotNodes = dispatch?.taskConfigSnapshot?.nodes;
  return Array.isArray(snapshotNodes) && snapshotNodes.length
    ? snapshotNodes.map((node) => node.name)
    : window.DispatchTaskNodes.get(dispatchTaskType(dispatch));
}

function taskNodeIndex(dispatch, nodes = taskNodes(dispatch)) {
  const currentNode = String(dispatch.currentNode || "").trim();
  if (dispatch.status === "已完成" || ["已送达", "完成", "完成落重", "完成落空"].includes(currentNode)) return nodes.length - 1;
  const exactIndex = nodes.indexOf(currentNode);
  if (exactIndex >= 0) return exactIndex;

  const latestExactIndex = [...(dispatch.timeline || [])].reverse()
    .map((item) => nodes.indexOf(String(item.node || "").trim()))
    .find((index) => index >= 0);
  if (latestExactIndex !== undefined) return latestExactIndex;

  const taskType = dispatchTaskType(dispatch);
  const legacyNodeIndex = {
    已提货: 0,
    已提箱: 0,
    在途: Math.min(1, nodes.length - 1),
    装卸: taskType === "提空装货" || taskType === "提重送货" ? 3 : Math.min(1, nodes.length - 1),
    进站: taskType === "提空装货" || taskType === "提重送货" ? 5 : taskType === "排重箱（A→B）" ? 2 : Math.min(1, nodes.length - 1),
    落箱: nodes.length - 1,
  };
  return Object.prototype.hasOwnProperty.call(legacyNodeIndex, currentNode) ? legacyNodeIndex[currentNode] : -1;
}

function getTaskProgress(dispatch) {
  const nodes = taskNodes(dispatch);
  const currentIndex = taskNodeIndex(dispatch, nodes);
  const completedCount = dispatch.status === "已完成" ? nodes.length : Math.max(0, currentIndex + 1);
  const currentNode = dispatchCategory(dispatch) === "cancelled"
    ? "已取消"
    : currentIndex >= 0
      ? nodes[currentIndex]
      : dispatchCategory(dispatch) === "active" ? nodes[0] : "待执行";
  return {
    taskType: dispatchTaskType(dispatch),
    nodes,
    currentIndex,
    currentNode,
    completedCount,
    progress: Math.round(completedCount / nodes.length * 100),
  };
}

function renderTaskNodeOverview(dispatch) {
  const progress = getTaskProgress(dispatch);
  const position = `${progress.completedCount}/${progress.nodes.length}`;
  return `<section class="task-node-overview" aria-label="${h(`${progress.taskType}任务进度`)}"><div class="task-node-heading"><span>任务进度</span><strong>${progress.progress}%</strong><b class="task-progress-count" aria-label="进度 ${h(position)}">${h(position)}</b></div><div class="task-progress-track" role="progressbar" aria-label="任务进度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress.progress}"><i style="width:${progress.progress}%"></i></div></section>`;
}

function taskNodeActionState(dispatch, index) {
  const category = dispatchCategory(dispatch);
  if (category === "cancelled") return "cancelled";
  if (category === "pending") return "pending";
  if (category === "completed") return "completed";
  const currentIndex = getTaskProgress(dispatch).currentIndex;
  if (index <= currentIndex) return "completed";
  if (index === currentIndex + 1) return "actionable";
  return "upcoming";
}

function nodePhotoAttachments(dispatch, node) {
  return (dispatch.timeline || [])
    .filter((item) => item.node === node)
    .flatMap((item) => item.photoAttachments || []);
}

function renderTimelinePhotoTags(item) {
  const attachments = item.photoAttachments || [];
  if (attachments.length) {
    return attachments.map((photo) => `<button class="timeline-photo" data-view-photo data-photo-id="${h(photo.id)}" data-photo-node="${h(item.node)}" data-timeline-photo type="button"><span class="timeline-photo-frame"><span class="timeline-photo-placeholder" aria-hidden="true">照片</span></span><span class="timeline-photo-label">${h(photo.label || photo.name)}</span></button>`).join("");
  }
  return (item.photos || []).map((photo) => `<button class="timeline-photo" data-view-photo data-photo-node="${h(item.node)}" data-photo-name="${h(photo)}" type="button"><span class="timeline-photo-frame"><span class="timeline-photo-placeholder" aria-hidden="true">照片</span></span><span class="timeline-photo-label">${h(photo)}</span></button>`).join("");
}

function nextNode(dispatch) {
  const progress = getTaskProgress(dispatch);
  return progress.nodes[Math.min(progress.currentIndex + 1, progress.nodes.length - 1)];
}

function renderDetailActionBar(dispatch, category = dispatchCategory(dispatch)) {
  if (category === "pending") {
    return `<button data-detail-action="contact" type="button">联系调度</button><button class="danger" data-detail-action="reject" type="button">拒绝</button><button class="primary" data-detail-action="accept" type="button">确认接单</button>`;
  }
  if (category === "active") {
    const node = nextNode(dispatch);
    return `<button data-detail-action="contact" type="button">联系调度</button><button class="primary" data-detail-action="progress" data-node="${h(node)}" type="button">提交 ${h(node)}</button>`;
  }
  return `<button data-detail-action="contact" type="button">联系调度</button><button data-detail-action="copy" type="button">复制运单号</button><button class="primary" data-detail-action="back" type="button">返回运单列表</button>`;
}

function photoRequirementsForDispatch(dispatch, nodeName = "") {
  if (Array.isArray(dispatch?.taskConfigSnapshot?.nodes)) {
    const snapshotNode = dispatch.taskConfigSnapshot.nodes.find((node) => node.name === nodeName);
    return snapshotNode?.photoRequirements || [];
  }
  return Array.isArray(dispatch.photoRequirements)
    ? dispatch.photoRequirements
    : window.PhotoRequirementConfig.forTaskType(dispatchTaskType(dispatch));
}

function uploadedPhotosForRequirement(dispatch, requirement) {
  return (dispatch.timeline || []).flatMap((item) => item.photoAttachments || []).filter((photo) =>
    photo.requirementId === requirement.id
      || (!photo.requirementId && (photo.requirementName || photo.label) === requirement.name));
}

function requirementPhotoProgress(dispatch) {
  const requirements = dispatch?.taskConfigSnapshot?.nodes?.length
    ? dispatch.taskConfigSnapshot.nodes.flatMap((node) => node.photoRequirements || [])
    : photoRequirementsForDispatch(dispatch);
  return requirements.reduce((progress, requirement) => {
    const required = Number(requirement.quantity) || 0;
    const uploaded = Math.min(required, uploadedPhotosForRequirement(dispatch, requirement).length);
    progress.required += required;
    progress.uploaded += uploaded;
    return progress;
  }, { required: 0, uploaded: 0 });
}

function missingPhotoCount(photoInputs) {
  return photoInputs.filter((input) => !input.files?.length).length;
}

let photoViewerUrls = [];
let timelinePhotoUrls = [];
let timelinePhotoRenderId = 0;
let credentialInlineUrls = [];
let credentialInlineRenderId = 0;

function clearPhotoViewerUrls() {
  photoViewerUrls.forEach((url) => URL.revokeObjectURL(url));
  photoViewerUrls = [];
}

function clearCredentialInlineUrls() {
  credentialInlineUrls.forEach((url) => URL.revokeObjectURL(url));
  credentialInlineUrls = [];
  credentialInlineRenderId += 1;
}

function clearTimelinePhotoUrls() {
  timelinePhotoRenderId += 1;
  timelinePhotoUrls.forEach((url) => URL.revokeObjectURL(url));
  timelinePhotoUrls = [];
}

async function renderTimelinePhotoImages() {
  clearTimelinePhotoUrls();
  const renderId = timelinePhotoRenderId;
  const buttons = [...elements.detailContent.querySelectorAll("[data-timeline-photo]")];
  const loadedPhotos = await Promise.all(buttons.map(async (button) => ({
    button,
    blob: await window.DispatchStore.getPhoto(button.dataset.photoId).catch(() => null),
  })));
  if (renderId !== timelinePhotoRenderId) return;
  loadedPhotos.forEach(({ button, blob }) => {
    if (!blob || !button.isConnected) return;
    const imageUrl = URL.createObjectURL(blob);
    timelinePhotoUrls.push(imageUrl);
    const frame = button.querySelector(".timeline-photo-frame");
    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = button.querySelector(".timeline-photo-label").textContent;
    frame.replaceChildren(image);
  });
}

function positionPhotoViewer() {
  const shell = document.querySelector(".phone-shell");
  const dialog = document.querySelector("#photoViewerDialog");
  if (!shell || !dialog) return;
  const bounds = shell.getBoundingClientRect();
  dialog.style.setProperty("--viewer-left", `${bounds.left}px`);
  dialog.style.setProperty("--viewer-bottom", `${Math.max(0, window.innerHeight - bounds.bottom)}px`);
  dialog.style.setProperty("--viewer-width", `${bounds.width}px`);
  dialog.style.setProperty("--viewer-height", `${bounds.height}px`);
}

function renderPhotoPlaceholder(photo) {
  const label = photo.label || photo.name || "节点照片";
  return `<figure class="photo-viewer-item photo-viewer-placeholder"><div class="photo-placeholder-mark" aria-hidden="true">▧</div><strong>演示占位照片</strong><span>${h(label)}</span></figure>`;
}

async function openPhotoViewer(dispatchId, node, selectedPhotoId = "", selectedPhotoName = "") {
  const dispatch = state.dispatches.find((item) => item.id === dispatchId);
  if (!dispatch) return;
  let attachments = nodePhotoAttachments(dispatch, node)
    .filter((photo) => !selectedPhotoId || photo.id === selectedPhotoId);
  if (!attachments.length) {
    const legacyPhotos = (dispatch.timeline || [])
      .filter((item) => item.node === node)
      .flatMap((item) => item.photos || [])
      .filter((name) => !selectedPhotoName || name === selectedPhotoName);
    const configuredLabels = photoRequirementsForDispatch(dispatch, node).flatMap((requirement) =>
      Array.from({ length: Number(requirement.quantity) || 0 }, (_, index) => `${requirement.name} ${index + 1}/${requirement.quantity}`));
    const photoLabels = legacyPhotos.length ? legacyPhotos : configuredLabels.length ? configuredLabels : [`${node}照片 1`, `${node}照片 2`, `${node}照片 3`];
    attachments = photoLabels.map((label, index) => ({ id: `placeholder-${index}`, label, placeholder: true }));
  }

  const dialog = document.querySelector("#photoViewerDialog");
  const content = document.querySelector("#photoViewerGrid");
  document.querySelector("#photoViewerTitle").textContent = `${node} · ${attachments.length} 张照片`;
  content.innerHTML = `<p class="photo-viewer-loading">正在加载图片</p>`;
  clearPhotoViewerUrls();
  positionPhotoViewer();
  dialog.showModal();

  const loadedPhotos = await Promise.all(attachments.map(async (photo) => ({
    ...photo,
    blob: photo.placeholder ? null : await window.DispatchStore.getPhoto(photo.id).catch(() => null),
  })));
  if (!dialog.open) return;
  content.innerHTML = loadedPhotos.map((photo) => {
    if (!photo.blob) return renderPhotoPlaceholder(photo);
    const url = URL.createObjectURL(photo.blob);
    photoViewerUrls.push(url);
    return `<figure class="photo-viewer-item"><img src="${url}" alt="${h(photo.label || photo.name)}" /><figcaption><strong>${h(photo.label || photo.name)}</strong><span>${h(photo.name)}</span></figcaption></figure>`;
  }).join("");
}

async function openCredentialPreview(button) {
  const id = button.dataset.credentialId;
  const name = button.dataset.credentialName || "证件附件";
  if (!id) {
    showToast("该历史附件仅保留文件名，请重新上传后预览");
    return;
  }
  const dialog = document.querySelector("#photoViewerDialog");
  const content = document.querySelector("#photoViewerGrid");
  document.querySelector("#photoViewerTitle").textContent = name;
  content.innerHTML = `<p class="photo-viewer-loading">正在加载附件</p>`;
  clearPhotoViewerUrls();
  positionPhotoViewer();
  dialog.showModal();
  const blob = await window.DispatchStore.getPhoto(id).catch(() => null);
  if (!dialog.open) return;
  if (!blob) {
    content.innerHTML = `<div class="credential-preview-empty"><strong>附件无法读取</strong><span>请关闭后重新上传该证件</span></div>`;
    return;
  }
  const url = URL.createObjectURL(blob);
  photoViewerUrls.push(url);
  const type = button.dataset.credentialType || blob.type || "";
  content.innerHTML = type === "application/pdf" || name.toLowerCase().endsWith(".pdf")
    ? `<iframe class="credential-pdf-preview" src="${url}" title="${h(name)}"></iframe>`
    : `<figure class="photo-viewer-item credential-image-preview"><img src="${url}" alt="${h(name)}" /></figure>`;
}

function openSelectedCredentialPreview(input) {
  const files = Array.from(input?.files || []);
  if (!files.length) return;
  const file = files[0];
  const dialog = document.querySelector("#photoViewerDialog");
  const content = document.querySelector("#photoViewerGrid");
  document.querySelector("#photoViewerTitle").textContent = files.length > 1 ? `${file.name} 等 ${files.length} 份` : file.name;
  clearPhotoViewerUrls();
  positionPhotoViewer();
  dialog.showModal();
  const url = URL.createObjectURL(file);
  photoViewerUrls.push(url);
  content.innerHTML = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
    ? `<iframe class="credential-pdf-preview" src="${url}" title="${h(file.name)}"></iframe>`
    : `<figure class="photo-viewer-item credential-image-preview"><img src="${url}" alt="${h(file.name)}" /></figure>`;
}

function renderProgressPhotoRequirements(dispatch, node) {
  const requirements = photoRequirementsForDispatch(dispatch, node);
  const section = document.querySelector("#photoRequirements");
  const list = document.querySelector("#photoSlotList");
  const hint = document.querySelector("#photoRequirementsHint");
  const count = document.querySelector("#photoRequirementsCount");
  section.hidden = requirements.length === 0;
  if (!requirements.length) {
    list.innerHTML = "";
    return;
  }
  const progress = requirements.reduce((result, requirement) => {
    result.required += Number(requirement.quantity) || 0;
    result.uploaded += Math.min(Number(requirement.quantity) || 0, uploadedPhotosForRequirement(dispatch, requirement).length);
    return result;
  }, { required: 0, uploaded: 0 });
  section.dataset.finalNode = "true";
  hint.textContent = "完成当前节点前请补齐本节点的拍照要求。";
  list.innerHTML = requirements.map((requirement) => {
    const required = Number(requirement.quantity) || 0;
    const existingCount = uploadedPhotosForRequirement(dispatch, requirement).length;
    const uploadedCount = Math.min(required, existingCount);
    const remaining = Math.max(0, required - uploadedCount);
    const slots = Array.from({ length: remaining }, (_, index) => {
      const slotNumber = uploadedCount + index + 1;
      return `<label class="photo-slot photo-slot-upload"><input data-photo-slot data-photo-requirement-id="${h(requirement.id)}" data-photo-requirement-name="${h(requirement.name)}" data-photo-requirement-description="${h(requirement.description || "")}" data-photo-slot-number="${slotNumber}" data-photo-label="${h(requirement.name)}" type="file" accept="image/*" capture="environment" /><span class="photo-slot-upload-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg></span><span class="photo-slot-upload-text">上传</span><span class="photo-slot-state" hidden>待拍</span><span class="photo-slot-copy" hidden><small></small></span></label>`;
    }).join("");
    return `<section class="photo-requirement-group" data-existing-count="${uploadedCount}" data-required="${required}"><div class="photo-requirement-group-heading"><div><strong>${h(requirement.name)}</strong></div><span>${uploadedCount}/${required} 张</span></div><div class="image-upload-row">${uploadedPhotosForRequirement(dispatch, requirement).map(photo => `<div class="image-upload-preview" data-existing-progress-photo="${h(photo.id)}"><span>图片</span></div>`).join("")}<div class="selected-photo-previews" data-selected-photo-previews></div>${remaining ? `<label class="image-upload-tile progress-single-picker"><input type="file" accept="image/*" multiple data-progress-photo-picker />${window.DriverUploadUI.camera}<span>图片</span></label>` : ""}</div><p class="image-upload-hint">${h(requirement.description || "")}</p><div class="photo-slot-backing" hidden>${slots}</div></section>`;
  }).join("");
  window.DriverUploadUI.hydrateProgress();
}

function updateProgressPhotoCount() {
  const inputs = [...document.querySelectorAll("#photoSlotList [data-photo-slot]")];
  const dispatch = state.dispatches.find((item) => item.id === state.activeDispatchId);
  const requirements = dispatch ? photoRequirementsForDispatch(dispatch, nextNode(dispatch)) : [];
  const existing = requirements.reduce((result, requirement) => {
    result.required += Number(requirement.quantity) || 0;
    result.uploaded += Math.min(Number(requirement.quantity) || 0, uploadedPhotosForRequirement(dispatch, requirement).length);
    return result;
  }, { uploaded: 0, required: 0 });
  const selectedCount = inputs.length - missingPhotoCount(inputs);
  const count = document.querySelector("#photoRequirementsCount");
  if (count) count.textContent = `${existing.uploaded + selectedCount}/${existing.required}`;
  const title = document.querySelector("#photoRequirementsTitle");
  if (title) title.textContent = `任务拍照要求 · ${existing.uploaded + selectedCount}/${existing.required} 张已上传`;
  inputs.forEach((input) => {
    const slot = input.closest(".photo-slot");
    const state = slot.querySelector(".photo-slot-state");
    const uploadText = slot.querySelector(".photo-slot-upload-text");
    const file = input.files?.[0];
    slot.classList.toggle("selected", Boolean(file));
    if (state) state.textContent = file ? "已选择" : "待拍";
    if (uploadText) uploadText.textContent = file ? (file.name.length > 10 ? "已选择" : file.name) : "上传";
  });
}

function isTaskAwaitingStart(dispatch) {
  return dispatch.status === "运输中" && getTaskProgress(dispatch).currentIndex < 0;
}

function isTaskInProgress(dispatch) {
  return dispatch.status === "运输中" && getTaskProgress(dispatch).currentIndex >= 0;
}

function taskCard(dispatch) {
  const category = dispatchCategory(dispatch);
  const eta = /^预计.+送达[。！!]?$/.test(dispatch.note?.trim() || "") ? dispatch.note.trim() : "";
  const statusText = h(statusLabel(dispatch));
  const typeText = h(dispatchTaskType(dispatch));
  const consignee = h(dispatch.consignee || "-");
  const arrivalTime = h(String(dispatch.arrivalTime || "-").replace("T", " ").slice(0, 16));
  const dispatchTime = h(dispatch.dispatchTime || "-");
  return `
    <article class="task-card" data-dispatch-card="${h(dispatch.id)}">
      <div class="task-card-header">
        <div class="task-title-group">
          <strong class="task-route-name">${h(dispatch.routeName)}</strong>
          <span class="task-number">运单号 ${h(dispatch.waybillNo)}</span>
        </div>
        <div class="task-card-badges">
          <span class="dual-badge dual-badge-${category}"><span>${statusText}</span><i aria-hidden="true"></i><span>${typeText}</span></span>
        </div>
      </div>
      ${renderTaskNodeOverviewV2(dispatch)}
      ${renderDispatchJobLocations(dispatch, "task-card-locations")}
      <div class="task-meta task-equipment">
        <span>车 ${h(dispatch.vehicleId || "待分配")}</span>
        <span class="task-meta-divider" aria-hidden="true"></span>
        <span>箱 ${h(dispatch.boxes)}</span>
      </div>
      <div class="task-card-info-grid">
        <div class="info-cell"><span class="info-label">收货人</span><span class="info-value">${consignee}</span></div>
        <div class="info-cell"><span class="info-label">到达时间</span><span class="info-value">${arrivalTime}</span></div>
        <div class="info-cell"><span class="info-label">派单时间</span><span class="info-value">${dispatchTime}</span></div>
      </div>
      ${dispatch.note && !eta ? `<p class="task-note"><span>备注：${h(dispatch.note)}</span></p>` : ""}
      ${eta ? `<p class="task-note"><span>${h(eta)}</span></p>` : ""}
      <div class="task-card-actions">
        <button class="card-button" data-action="detail" data-id="${h(dispatch.id)}" type="button">查看详情</button>
        ${category === "pending" ? `<button class="card-button primary" data-action="accept" data-id="${h(dispatch.id)}" type="button">立即接单</button>` : ""}
        ${category === "active" ? `<button class="card-button soft" data-action="progress" data-id="${h(dispatch.id)}" type="button">更新进度</button>` : ""}
      </div>
    </article>`;
}

function renderTaskNodeOverviewV2(dispatch) {
  const progress = getTaskProgress(dispatch);
  const nodes = progress.nodes;
  const currentIdx = progress.currentIndex;
  const blocks = nodes.map((name, i) => {
    let state;
    if (i < currentIdx) state = "done";
    else if (i === currentIdx) state = "current";
    else state = "pending";
    return `<i class="tp-block tp-block-${state}" data-idx="${i}" title="${h(name)}"></i>`;
  }).join("");
  return `<section class="task-progress-bar" aria-label="任务进度" aria-valuenow="${progress.progress}" aria-valuemin="0" aria-valuemax="100">
    <div class="task-progress-bar-header"><span>任务进度</span><b>${progress.progress}%</b><em>${progress.completedCount}/${nodes.length}</em></div>
    <div class="task-progress-blocks">${blocks}</div>
  </section>`;
}

function emptyState(title, description) {
 const filtered=/找到|筛选/.test(title)&&driverDispatches().length>0;
 return window.JikaEmptyStates.render(filtered?'empty-search':'empty-waybills',{title,description});
}

function renderTasks() {
  const dispatches = driverDispatches();
  const pending = dispatches.filter((item) => dispatchCategory(item) === "pending");
  const active = dispatches.filter((item) => dispatchCategory(item) === "active" || (dispatchCategory(item) !== "completed" && dispatchCategory(item) !== "cancelled" && (isTaskAwaitingStart(item) || isTaskInProgress(item))));
  document.querySelector("#activeOrderCount").textContent = active.length;
  document.querySelector("#pendingOrderCount").textContent = pending.length;
  document.querySelectorAll("#workStageTabs button").forEach((button) => {
    const selected = button.dataset.workStage === state.workStage;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-selected", String(selected));
  });
  const rows = state.workStage === "pending" ? pending : active;
  elements.taskList.innerHTML = rows.length
    ? rows.map(taskCard).join("")
    : emptyState(state.workStage === "pending" ? "暂无待接订单" : "暂无进行中的运单", state.workStage === "pending" ? "新派单到达后会在这里显示" : "接单后尚未完成的运单会显示在这里");
}

function orderCard(dispatch) {
  const category = dispatchCategory(dispatch);
  const eta = /^预计.+送达[。！!]?$/.test(dispatch.note?.trim() || "") ? dispatch.note.trim() : "";
  const statusText = h(statusLabel(dispatch));
  const typeText = h(dispatchTaskType(dispatch));
  const consignee = h(dispatch.consignee || "-");
  const arrivalTime = h(String(dispatch.arrivalTime || "-").replace("T", " ").slice(0, 16));
  const dispatchTime = h(String(dispatch.dispatchTime || "-").replace("T", " ").slice(0, 16));
  const actions = [];
  actions.push(`<button class="card-button" data-action="contact" data-id="${h(dispatch.id)}" type="button">联系调度</button>`);
  actions.push(`<button class="card-button" data-action="detail" data-id="${h(dispatch.id)}" type="button">查看详情</button>`);
  if (category === "pending") {
    actions.push(`<button class="card-button primary" data-action="accept" data-id="${h(dispatch.id)}" type="button">立即接单</button>`);
  }
  if (category === "active") {
    actions.push(`<button class="card-button soft" data-action="progress" data-id="${h(dispatch.id)}" type="button">更新进度</button>`);
  }
  return `
    <article class="task-card" data-dispatch-card="${h(dispatch.id)}">
      <div class="task-card-header">
        <div class="task-title-group">
          <strong class="task-route-name">${h(dispatch.routeName)}</strong>
          <span class="task-number">运单号 ${h(dispatch.waybillNo)}</span>
        </div>
        <div class="task-card-badges">
          <span class="dual-badge dual-badge-${category}"><span>${statusText}</span><i aria-hidden="true"></i><span>${typeText}</span></span>
        </div>
      </div>
      ${renderTaskNodeOverviewV2(dispatch)}
      ${renderDispatchJobLocations(dispatch, "task-card-locations")}
      <div class="task-meta task-equipment">
        <span>车 ${h(dispatch.vehicleId || "待分配")}</span>
        <span class="task-meta-divider" aria-hidden="true"></span>
        <span>箱 ${h(dispatch.boxes)}</span>
      </div>
      <div class="task-card-info-grid">
        <div class="info-cell"><span class="info-label">收货人</span><span class="info-value">${consignee}</span></div>
        <div class="info-cell"><span class="info-label">到达时间</span><span class="info-value">${arrivalTime}</span></div>
        <div class="info-cell"><span class="info-label">派单时间</span><span class="info-value">${dispatchTime}</span></div>
      </div>
      ${dispatch.note && !eta ? `<p class="task-note"><span>备注：${h(dispatch.note)}</span></p>` : ""}
      ${eta ? `<p class="task-note"><span>${h(eta)}</span></p>` : ""}
      <div class="task-card-actions">
        ${actions.join("")}
      </div>
    </article>`;
}

function orderFilterRecord(item) {
  return { ...item, customerName: item.customerName || waybillMeta[item.waybillNo]?.customer || "", taskType: dispatchTaskType(item), progress: getTaskProgress(item).progress };
}

function renderOrders() {
  const keyword = state.orderSearch.toLowerCase();
  const orderList = document.querySelector("#orderList");
  if (!orderList) return;
  const rows = driverDispatches().filter((item) => {
    const matchedStatus = state.orderFilter === "all" || dispatchCategory(item) === state.orderFilter;
    const matchedStage = state.orderStage === "all"
      || (state.orderStage === "pickup" && isTaskAwaitingStart(item))
      || (state.orderStage === "transit" && isTaskInProgress(item))
      || (state.orderStage === "completed" && item.status === "已完成");
    const locationText = typeof dispatchJobLocations === "function" ? dispatchJobLocations(item).map((location) => `${location.name} ${location.address}`).join(" ") : "";
    const searchText = `${item.waybillNo} ${item.routeName} ${item.boxes} ${item.origin} ${item.destination} ${dispatchTaskType(item)} ${locationText}`.toLowerCase();
    return matchedStatus && matchedStage && searchText.includes(keyword) && window.DriverOrderFilters.matches(orderFilterRecord(item));
  });
  window.DriverOrderFilters.update();
  orderList.innerHTML = rows.length ? rows.map(orderCard).join("") : emptyState("没有找到运单", "请调整状态筛选或搜索关键词");
}

function daysUntil(dateText) {
  const today = new Date();
  const date = new Date(`${dateText}T00:00:00`);
  return Math.ceil((date - today) / 86400000);
}

function renderProfile() {
  const driver = currentDriver();
  const certification = currentCertification();
  const certificationView = certificationMeta(certification.status);
  const orders = driverDispatches();
  const pickup = orders.filter((item) => item.status !== "已派单" && item.status !== "已完成" && dispatchCategory(item) !== "cancelled" && isTaskAwaitingStart(item)).length;
  const transit = orders.filter((item) => item.status !== "已完成" && dispatchCategory(item) !== "cancelled" && isTaskInProgress(item)).length;
  const completed = orders.filter((item) => item.status === "已完成").length;
  const cancelled = orders.filter((item) => dispatchCategory(item) === "cancelled").length;
  const currentVehicleDispatch = driverDispatches().find((item) => item.vehicleId && item.status === "运输中")
    || driverDispatches().find((item) => item.vehicleId);
  const plateNo = currentVehicleDispatch?.vehicleId || "";
  const vehicle = vehicles[plateNo];
  document.querySelector("#profileAvatar").textContent = driver.name.slice(0, 1);
  document.querySelector("#profileName").textContent = driver.name;
  document.querySelector("#profileMeta").textContent = `${driver.capacityOwnership || "自营"} · ${driver.organizationName || "本公司"} · ${driver.fleet}`;
  document.querySelector("#profilePhone").textContent = maskPhone(driver.phone);
  const profileBadge = document.querySelector("#profileCertificationBadge");
  profileBadge.textContent = certificationView.label;
  profileBadge.className = certificationView.className;
  document.querySelector("#profileVehiclePlate").textContent = plateNo || "暂未分配";
  document.querySelector("#profileVehicleDescription").textContent = vehicle
    ? `${vehicle.type || "车辆"} · ${vehicle.state || "状态待同步"}`
    : "暂无车辆信息";
  renderDriverMessages();
  renderExpenseStats();
  const iconSvg = (paths) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#17191d" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" aria-hidden="true">${paths}</svg>`;
  const icons = {
    all: iconSvg('<path d="M17 4h3v15h-3"/><rect x="4" y="3" width="13" height="18" rx="2"/><path stroke="#0065ff" d="M8 8h5M8 12h5M8 16h3"/>'),
    pickup: iconSvg('<path d="M3 8h16v13H3zM3 8l3-5h10l3 5M11 3v5"/><path fill="#0065ff" stroke="none" d="M9 8h4v6H9z"/><circle cx="18" cy="17" r="4" fill="white"/><path stroke="#0065ff" d="M18 15v2l1.5 1"/>'),
    transit: iconSvg('<path d="M2 5h12v12H2zM14 9h4l4 5v3h-8"/><path fill="#0065ff" stroke="none" d="M16 10h2l2.4 3H16z"/><path stroke="#0065ff" d="M2 9h5M2 12h3"/><circle cx="6" cy="18" r="2.2" fill="white"/><circle cx="18" cy="18" r="2.2" fill="white"/>'),
    completed: iconSvg('<path d="m3 7 9-4 9 4-9 4-9-4ZM3 7v11l9 4 9-4V7M12 11v11"/><path stroke="#0065ff" stroke-width="1.4" d="m6 14 2 2 4-4"/>'),
    cancelled: iconSvg('<path d="M14 3H5a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9l-6-6ZM14 3v6h6"/><path stroke="#0065ff" stroke-width="1.4" d="m9 12 6 6m0-6-6 6"/>')
  };
  document.querySelector("#profileOrderStats").innerHTML = `
    <button data-order-stage="all" type="button"><i class="stat-icon">${icons.all}<strong class="stat-count${orders.length < 10 ? " is-single" : ""}">${orders.length}</strong></i><span>全部运单</span></button>
    <button data-order-stage="pickup" type="button"><i class="stat-icon">${icons.pickup}<strong class="stat-count${pickup < 10 ? " is-single" : ""}">${pickup}</strong></i><span>待执行</span></button>
    <button data-order-stage="transit" type="button"><i class="stat-icon">${icons.transit}<strong class="stat-count${transit < 10 ? " is-single" : ""}">${transit}</strong></i><span>运输中</span></button>
    <button data-order-stage="completed" type="button"><i class="stat-icon">${icons.completed}<strong class="stat-count${completed < 10 ? " is-single" : ""}">${completed}</strong></i><span>已完成</span></button>
    <button data-order-stage="cancelled" type="button"><i class="stat-icon">${icons.cancelled}<strong class="stat-count${cancelled < 10 ? " is-single" : ""}">${cancelled}</strong></i><span>已取消</span></button>`;
}

function infoRows(rows) {
  return rows.map((row) => `
    <div class="info-row ${row.action ? "action-row" : ""}" ${row.action ? `data-subpage-action="${h(row.action)}"` : ""}>
      <span>${h(row.label)}</span><strong>${h(row.value)}</strong>${row.status ? `<em class="status-pill ${row.warning ? "warning" : ""}">${h(row.status)}</em>` : ""}${row.action ? "<b>›</b>" : ""}
    </div>`).join("");
}

function documentStatus(date) {
  const remaining = daysUntil(date);
  if (remaining < 0) return { text: "已过期", warning: true };
  if (remaining <= 30) return { text: `${remaining}天到期`, warning: true };
  return { text: "有效", warning: false };
}

function driverRepairRecords() {
  return state.repairs.filter((item) => item.reporterId === state.currentDriverId)
    .sort((left, right) => String(right.reportedAt).localeCompare(String(left.reportedAt)));
}

function repairStatusClass(status) {
  return status === "已完成" ? "done" : status === "已取消" ? "cancelled" : status === "维修中" ? "working" : "pending";
}

function renderDriverRepairHistory() {
  const records = driverRepairRecords();
  if (!records.length) return `<section class="info-section repair-history"><h2>我的报修</h2>${window.JikaEmptyStates.render("empty-records", {description:"提交报修后可在这里查看处理进度"})}</section>`;
  return `<div class="repair-list-summary">我的报修 <span>${records.length} 条</span></div>${records.map((item) => `<article class="info-section driver-repair-card"><header><strong>${h(item.plateNo)} · ${h(item.category)}</strong><em class="repair-history-status ${repairStatusClass(item.status)}">${h(item.status)}</em></header><small>${h(item.repairNo || item.id)}</small><p>${h(item.description)}</p><div class="repair-card-meta"><span>${h(String(item.reportedAt || "").replace("T", " ").slice(0, 16))}</span><span>${h(item.repairLocation || "地点待补充")}</span></div><div class="repair-card-actions"><button class="card-button" data-subpage-action="repair-detail" data-repair-id="${h(item.id)}" type="button">查看详情</button></div></article>`).join("")}`;
}

function renderDriverRepairDetail() {
  const item = driverRepairRecords().find((record) => record.id === state.activeRepairId);
  if (!item) { openProfileSubpage("vehicleRepairs"); return; }
  const fmt = (date) => String(date || "-").replace("T", " ").slice(0, 16);
  const fields = [{ label: "报修单号", value: item.repairNo || item.id }, { label: "维修车辆", value: item.plateNo }, { label: "车辆类型", value: item.vehicleType || "-" }, { label: "故障类别", value: item.category }, { label: "报修时间", value: fmt(item.reportedAt) }, { label: "报修人", value: item.reporterName || "-" }, { label: "维修地点", value: item.repairLocation || "-" }, { label: "当前状态", value: item.status }];
  const evidence = (item.evidence || []).map((file) => { const attachment = typeof file === "string" ? { name: file } : file; return `<button class="repair-attachment" data-preview-credential data-credential-id="${h(attachment.id || "")}" data-credential-name="${h(attachment.name || "附件")}" data-credential-type="${h(attachment.type || "")}" type="button">${h(attachment.name || "附件")}</button>`; }).join("");
  const progressFields = [{ label: "开始维修", value: fmt(item.startedAt) }, { label: "完成时间", value: fmt(item.completedAt) }, { label: "维修单位", value: item.repairVendor || "-" }];
  elements.subpageContent.innerHTML = `<div class="vehicle-page-body"><section class="info-section"><h2>报修详情 <em class="repair-history-status ${repairStatusClass(item.status)}">${h(item.status)}</em></h2>${infoRows(fields)}</section><section class="info-section repair-detail-copy"><h2>故障描述</h2><p>${h(item.description)}</p>${item.remark ? `<h2>补充说明</h2><p>${h(item.remark)}</p>` : ""}</section><section class="info-section repair-detail-copy"><h2>现场凭证</h2>${evidence || '<p class="repair-empty-copy">暂无现场凭证</p>'}</section><section class="info-section repair-detail-copy"><h2>维修进度</h2>${infoRows(progressFields)}${item.result ? `<p>维修结果：${h(item.result)}</p>` : ""}${item.cancelReason ? `<p>取消原因：${h(item.cancelReason)}</p>` : ""}</section></div><div class="vehicle-fixed-actions"><button data-subpage-action="back-repair-list" type="button">返回报修列表</button></div>`;
}

function credentialGroupDetails(group, driver) {
  if (group.key === "idCardFront" || group.key === "idCardBack") return `身份证号：${maskIdCard(driver.idCard)}`;
  if (group.key === "licenseAttachment") return `证号：${maskCredential(driver.licenseNo)} · ${driver.licenseClass || "-"} · 有效期至 ${driver.licenseExpiry || "-"}`;
  return `证号：${maskCredential(driver.qualificationNo)} · 有效期至 ${driver.qualificationExpiry || "-"}`;
}

const CREDENTIAL_CAMERA_SVG = '<svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><circle cx="20" cy="20" r="20" fill="#0065FF"/><path d="M13 14.5h3l1.5-2h5l1.5 2h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H13a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2Z" stroke="white" stroke-width="1.5"/><circle cx="20" cy="21" r="4.5" stroke="white" stroke-width="1.5"/><circle cx="26" cy="17.5" r="1" fill="white"/></svg>';
function credentialArtworkMarkup(group, readonly = false) {
 return `<img class="credential-svg-art" src="assets/credentials/${h(group.key)}.svg" alt="" aria-hidden="true">${readonly?'<strong>未上传</strong>':`<span class="credential-camera-mark">${CREDENTIAL_CAMERA_SVG}</span><strong>点击上传${h(group.label)}</strong>`}`;
}

function credentialFileMarkup(file) {
  const attrs = `data-credential-id="${h(file.id || '')}" data-credential-name="${h(file.name || '附件')}" data-credential-type="${h(file.type || '')}"`;
  const pdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name || '');
  return pdf ? `<div class="credential-pdf-file"><span class="credential-pdf-tag">PDF</span><strong>${h(file.name || '附件.pdf')}</strong><button type="button" data-preview-credential ${attrs}>查看</button><button type="button" data-download-credential ${attrs}>下载</button></div>` : `<button class="credential-photo-file" type="button" data-preview-credential ${attrs} aria-label="查看证件照片"><span data-credential-inline-asset ${attrs}><i data-lucide="image"></i></span></button>`;
}
function credentialDocumentsMarkup(certification, driver, {compact=false}={}) {
 const attachments=credentialAttachmentMap(certification);
 return `<div class="credential-document-list ${compact?'compact':''}">${CERTIFICATION_DOCUMENT_GROUPS.map(group=>{const files=attachments[group.key];return `<article class="credential-document-card"><header><div><strong>${h(group.label)}</strong>${files.length?`<span>${h(credentialGroupDetails(group,driver))}</span>`:''}</div>${files.length?'':'<em>待上传</em>'}</header><div class="credential-attachment-list">${files.length?files.map(credentialFileMarkup).join(''):`<div class="credential-illustrated-stage readonly">${credentialArtworkMarkup(group,true)}</div>`}</div></article>`;}).join('')}</div>`;
}

function credentialEmptyStageMarkup(group, inputId) {
  return `<label class="credential-card-empty credential-illustrated-stage" for="${h(inputId)}">${credentialArtworkMarkup(group)}</label>`;
}

function credentialCardActionsMarkup(inputId, hasFiles) {
  return hasFiles
    ? `<label for="${h(inputId)}"><i data-lucide="refresh-cw"></i>重新上传</label><button data-remove-credential-group type="button"><i data-lucide="trash-2"></i>删除</button>`
    : `<span>支持图片或 PDF，单个文件不超过 10 MB</span>`;
}

function credentialUploadCardsMarkup(certification) {
  const attachments = credentialAttachmentMap(certification);
  return `<div class="credential-upload-grid credential-upload-card-grid">${CERTIFICATION_DOCUMENT_GROUPS.map((group) => {
    const files = attachments[group.key];
    const first = files[0];
    const inputId = `credential-upload-${group.key}`;
    return `<article class="credential-upload-card ${files.length ? "has-files" : ""}" data-credential-upload-card data-credential-group="${h(group.key)}" data-remove-existing="false">
      <header><strong>${h(group.label)}</strong></header>${credentialRecognitionFields(group, files.length>0)}
      <input id="${h(inputId)}" name="${h(group.key)}" type="file" accept="${h(group.accept)}" multiple ${files.length ? "" : "required"} />
      <div class="credential-card-stage" data-credential-stage>${first ? files.map(credentialFileMarkup).join('') : credentialEmptyStageMarkup(group, inputId)}</div>
      <footer data-credential-actions>${credentialCardActionsMarkup(inputId, files.length > 0)}</footer>
    </article>`;
  }).join("")}</div>`;
}

function credentialPreviewCardsMarkup(certification) {
  const attachments = credentialAttachmentMap(certification);
  return `<div class="credential-upload-grid credential-upload-card-grid credential-readonly-grid">${CERTIFICATION_DOCUMENT_GROUPS.map((group) => {
    const files = attachments[group.key];
    const first = files[0];
    return `<article class="credential-upload-card ${files.length ? "has-files" : ""}">
      <header><strong>${h(group.label)}</strong>${files.length?"":"<em>待上传</em>"}</header>
      <div class="credential-card-stage">${first ? files.map(credentialFileMarkup).join('') : `<div class="credential-illustrated-stage readonly">${credentialArtworkMarkup(group, true)}</div>`}</div>
    </article>`;
  }).join("")}</div>`;
}

async function hydrateCredentialInlinePreviews() {
  const renderId = ++credentialInlineRenderId;
  const assets = Array.from(elements.subpageContent.querySelectorAll("[data-credential-inline-asset][data-credential-id]"));
  await Promise.all(assets.map(async (asset) => {
    const id = asset.dataset.credentialId;
    const name = asset.dataset.credentialName || "证件附件";
    const type = asset.dataset.credentialType || "";
    if (!id || type === "application/pdf" || name.toLowerCase().endsWith(".pdf")) return;
    const blob = await window.DispatchStore.getPhoto(id).catch(() => null);
    if (!blob || renderId !== credentialInlineRenderId || !asset.isConnected) return;
    const url = URL.createObjectURL(blob);
    credentialInlineUrls.push(url);
    asset.innerHTML = `<img src="${url}" alt="${h(name)}" />`;
  }));
}

function renderSelectedCredentialCard(input) {
  const card = input.closest("[data-credential-upload-card]");
  const group = CERTIFICATION_DOCUMENT_GROUPS.find((item) => item.key === input.name);
  if (!card || !group) return;
  card.dataset.recognitionRequest = String(Date.now()) + Math.random();
  const files = Array.from(input.files || []);
  const stage = card.querySelector("[data-credential-stage]");
  const actions = card.querySelector("[data-credential-actions]");
  if (!files.length) {
    card.classList.remove("has-files");
    card.querySelectorAll("[data-recognized-field]").forEach(input=>input.value="");
    stage.innerHTML = credentialEmptyStageMarkup(group, input.id);
    actions.innerHTML = credentialCardActionsMarkup(input.id, false);
    window.lucide?.createIcons();
    return;
  }
  const first = files[0];
  const isPdf = first.type === "application/pdf" || first.name.toLowerCase().endsWith(".pdf");
  let assetMarkup = `<i data-lucide="file-text"></i>`;
  if (!isPdf) {
    const url = URL.createObjectURL(first);
    credentialInlineUrls.push(url);
    assetMarkup = `<img src="${url}" alt="${h(first.name)}" />`;
  }
  card.dataset.removeExisting = "false";
  card.classList.add("has-files");
  input.required = false;
  recognizeCredentialSelection(input, group, first);
  stage.innerHTML = `<button class="credential-card-preview" data-preview-selected-credential type="button"><span class="credential-card-asset">${assetMarkup}</span><span class="credential-card-preview-copy"><strong>${isPdf ? h(first.name) : "证件照片"}</strong><small>点击预览${files.length > 1 ? ` · 共 ${files.length} 份` : ""}</small></span></button>`;
  actions.innerHTML = credentialCardActionsMarkup(input.id, true);
  window.lucide?.createIcons();
}

const RECOGNITION_FIELDS={idCardFront:[['idCard','身份证号码']],idCardBack:[['idCardValidFrom','有效期起'],['idCardValidTo','有效期止']],licenseAttachment:[['licenseNo','驾驶证号'],['licenseClass','准驾车型'],['licenseExpiry','有效期至']],qualificationAttachment:[['qualificationNo','资格证号'],['qualificationExpiry','有效期至']]};
function credentialRecognitionFields(group,hasFiles){const driver=currentDriver();return `<div class="credential-recognition-fields">${(RECOGNITION_FIELDS[group.key]||[]).map(([key,label])=>`<label><span>${label}</span><input name="${key}" data-recognized-field="${key}" value="${h(hasFiles?driver[key]||'':'')}" readonly aria-readonly="true" placeholder="上传后自动识别"></label>`).join('')}</div>`;}
async function recognizeCredentialSelection(input,group,file){
 const card=input.closest('[data-credential-upload-card]');if(!card)return;
 const request=String(Date.now())+Math.random();card.dataset.recognitionRequest=request;
 card.querySelectorAll('[data-recognized-field]').forEach(field=>{field.value='';field.placeholder='上传后自动识别';});
 // An actual OCR service is an integration dependency. Never invent a number from a filename or demo identity.
 if(typeof window.CredentialRecognizer?.recognize!=='function'){card.dataset.recognitionState='awaiting-service';return;}
 card.dataset.recognitionState='recognizing';
 try{const result=await window.CredentialRecognizer.recognize(file,group.key);if(!card.isConnected||card.dataset.recognitionRequest!==request)return;
 for(const field of card.querySelectorAll('[data-recognized-field]'))field.value=String(result?.[field.name]||'');
 card.dataset.recognitionState='recognized';
 }catch(error){if(card.isConnected&&card.dataset.recognitionRequest===request){card.dataset.recognitionState='failed';showToast('证件已选择，自动识别失败，请重新上传或稍后重试');}}
}
function certificationHero(certification){
 const key=certification.status||'unverified';const copy={unverified:['请完善资料，提交司机认证','上传清晰完整的证件，完成身份认证。'],pending:['认证资料审核中','资料已提交，请耐心等待。审核期间资料仅可查看。'],rejected:['认证未通过','请根据驳回原因完善资料后重新提交。'],verified:['司机认证已通过','身份资料已核验，可查看已提交资料。']}[key]||['请完成司机认证','完善个人资料并上传证件。'];
 return `<section class="identity-hero ${h(key)}"><div><strong>${copy[0]}</strong><p>${h(key==='rejected'&&certification.reason?certification.reason:copy[1])}</p><span class="identity-status">${h(certificationMeta(key).label)}</span></div><img src="assets/authentication/auth-${h(key)}.png" alt="" width="130" height="112"></section>`;
}
function identityBasic(driver){return `<section class="info-section"><h2>基础资料</h2>${infoRows([{label:'司机编号',value:driver.id},{label:'姓名',value:driver.name},{label:'联系电话',value:maskPhone(driver.phone)},{label:'运力归属',value:driver.capacityOwnership||'三方'},{label:'所属单位',value:driver.organizationName||'本公司'},{label:'所属车队',value:driver.fleet},{label:'司机状态',value:driver.driverState||'在职'}])}</section><section class="info-section"><h2>联系信息</h2>${infoRows([{label:'住址',value:driver.address||'未填写'},{label:'紧急联系人',value:driver.emergencyContact||'未填写'}])}</section>`;}
function renderDriverIdentityPage(certification){
 const driver=currentDriver();elements.subpageContent.innerHTML=certificationHero(certification)+identityBasic(driver)+`<section class="info-section profile-credential-section"><h2>相关证件</h2>${credentialDocumentsMarkup(certification,driver)}</section>`+(certification.status==='pending'?'':`<div class="vehicle-fixed-actions"><button class="subpage-primary" type="button" data-subpage-action="edit-certification">${certification.status==='rejected'?'完善资料并重新提交':'编辑个人信息'}</button></div>`);hydrateCredentialInlinePreviews();
}

function renderCertificationForm(certification) {
 if(certification.status==='pending'){renderDriverIdentityPage(certification);return;}
 clearCredentialInlineUrls();const driver=currentDriver();const hasIdentity=credentialAttachmentMap(certification).idCardFront.length>0;
 const input=(label,key,readonly=false)=>`<label class="expense-field"><span>${label}</span><input ${readonly?'readonly aria-readonly="true"':''} name="${key}" value="${h(driver[key]||'')}" ${['name','phone'].includes(key)?'required':''} ${key==='phone'?'inputmode="tel" maxlength="11"':''}></label>`;
 elements.subpageContent.innerHTML=`${certificationHero(certification)}<form class="certification-form profile-edit-form" id="certificationForm"><section class="info-section"><h2>基础资料</h2>${input('司机编号','id',true)}${input('姓名','name')}${input('联系电话','phone')}${input('运力归属','capacityOwnership',true)}${input('所属单位','organizationName',true)}${input('所属车队','fleet',true)}</section><section class="info-section"><h2>联系信息</h2>${input('住址','address')}${input('紧急联系人','emergencyContact')}</section><section class="info-section credential-upload-section"><h2>相关证件</h2>${credentialUploadCardsMarkup(certification)}</section><p class="certification-change-notice">证件信息由系统识别回显。提交后进入审核中，审核期间资料仅可查看。</p><button class="subpage-primary" type="submit">提交认证审核</button><button class="subpage-secondary" data-subpage-action="cancel-certification-edit" type="button">取消</button></form>`;
 pinDriverFormActions();hydrateCredentialInlinePreviews();
}

function pinDriverFormActions() {
  const content = elements.subpageContent;
  const form = content.querySelector("form");
  if (!form?.id || content.querySelector(":scope > .driver-form-actions")) return;
  const primary = form.querySelector(":scope > .subpage-primary, :scope > .expense-fixed-actions > .subpage-primary");
  const secondary = form.querySelector(":scope > .subpage-secondary, :scope > .expense-fixed-actions > .subpage-secondary");
  if (!primary || !secondary) return;
  const scroll = document.createElement("div");
  scroll.className = "driver-form-scroll";
  const actions = document.createElement("div");
  actions.className = "driver-form-actions";
  primary.setAttribute("form", form.id);
  actions.append(secondary, primary);
  form.querySelector(":scope > .expense-fixed-actions")?.remove();
  scroll.append(...Array.from(content.childNodes));
  content.append(scroll, actions);
}

function renderVehicleEditForm(plateNo, vehicle) {
  if (!vehicle) {
    showToast("当前没有可编辑的车辆");
    return;
  }
  elements.subpageContent.innerHTML = `
    <div class="subpage-summary"><span class="subpage-summary-icon"><img src="assets/vehicle-truck.svg" alt="" width="40" height="40"></span><div><strong>编辑车辆信息</strong><span>车辆归属及使用状态由后台统一维护</span></div></div>
    <form class="expense-form profile-edit-form" id="vehicleEditForm">
      <section class="info-section"><h2>车辆档案</h2>
        <label class="expense-field">车牌号码<input name="plateNo" value="${h(plateNo)}" readonly /></label>
        <label class="expense-field">车辆类型<input name="vehicleType" value="${h(vehicle.type || "")}" maxlength="40" required /></label>
        <label class="expense-field">所属车队<input name="fleet" value="${h(vehicle.fleet || "")}" maxlength="60" required /></label>
        <label class="expense-field">营运证号<input name="permitNo" value="${h(vehicle.permitNo || "")}" maxlength="50" required /></label>
        <label class="expense-field">下次审验<input name="inspectionDue" type="date" value="${h(vehicle.inspectionDue || "")}" required /></label>
        <label class="expense-field">运力归属<input value="${h(vehicle.capacityOwnership || "待确定")}" readonly /></label>
        <label class="expense-field">所属单位<input value="${h(vehicle.organizationName || "待确定")}" readonly /></label>
        <label class="expense-field">车辆状态<input value="${h(vehicle.state || "待分配")}" readonly /></label>
      </section>
      <button class="subpage-primary" type="submit">保存车辆信息</button>
      <button class="subpage-secondary" data-subpage-action="cancel-vehicle-edit" type="button">取消编辑</button>
    </form>`;
  pinDriverFormActions();
}

function renderPersonalEditForm(){renderCertificationForm(currentCertification());}

function renderDriverFeedback() {
 const driver=currentDriver(),records=window.FeedbackManager.bySubmitter("driver",driver.id),categories=window.FeedbackManager.categories("driver");
 elements.subpageTitle.textContent=state.activeFeedbackTab==='history'?'反馈记录':'意见反馈';
 const tabs=state.activeFeedbackTab==='history'?'<button class="feedback-records-entry" type="button" data-feedback-tab="submit">提交反馈</button>':'<button class="feedback-records-entry" type="button" data-feedback-tab="history">反馈记录</button>';
 elements.subpageContent.innerHTML=`<div class="feedback-mobile-page">${tabs}${state.activeFeedbackTab==='history'?window.MobileFeedbackUI.list(records,'driver',driver.id):window.MobileFeedbackUI.form({source:'driver',phone:driver.phone,categories,related:driverDispatches()})}</div>`;
 window.lucide?.createIcons();
}

function renderSubpage(page) {
  clearCredentialInlineUrls();
  const driver = currentDriver();
  const certification = currentCertification();
  const certificationView = certificationMeta(certification.status);
  const current = driverDispatches().find((item) => item.status === "运输中" && item.vehicleId)
    || driverDispatches().find((item) => item.vehicleId);
  const plateNo = current?.vehicleId || "暂未分配";
  const vehicle = vehicles[plateNo];
  const titles = {
    myOrders: "我的运单",
    certification: "司机认证",
    personal: "个人信息",
    security: "账户安全",
    vehicle: "车辆信息",
    insurance: "车辆保险",
    messages: "消息通知",
    expenses: "费用上报",
    expenseRecords: "费用上报记录",
    feedback: "意见反馈",
    service: "客服电话",
    settings: "系统设置",
    vehicleRepair: "新增车辆报修",
    vehicleRepairs: "车辆报修",
    vehicleRepairDetail: "报修详情",
  };
  elements.subpageTitle.textContent = titles[page] || "个人中心";
  setTimeout(() => window.lucide?.createIcons(), 0);

  if (page === "myOrders") {
    const filters = [
      ["all", "全部"], ["pending", "待接单"], ["active", "进行中"], ["completed", "已完成"], ["cancelled", "已取消"],
    ];
    elements.subpageContent.innerHTML = `
      <div class="my-orders-page">
        <div class="search-box"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg><input id="orderSearch" type="search" value="${h(state.orderSearch)}" placeholder="搜索运单号、线路或箱号" /></div>
        <div class="order-status-tabs" id="orderStatusTabs" role="group" aria-label="运单状态筛选">${filters.map(([status, label]) => `<button class="filter-chip ${state.orderFilter === status ? "active" : ""}" data-status="${status}" aria-pressed="${state.orderFilter === status}" type="button">${label}</button>`).join("")}</div>
        ${window.DriverOrderFilters.toolbar(driverDispatches().map(orderFilterRecord), renderOrders)}
        <div class="order-list" id="orderList"></div>
      </div>`;
    renderOrders();
    return;
  }

  if (page === "feedback") {
    renderDriverFeedback();
    return;
  }

  if (page === "certification" || page === "personal") {
    if(certification.status==='unverified'&&page==='certification')renderCertificationForm(certification);
    else renderDriverIdentityPage(certification);
    return;
  }

  if (page === "security") {
    elements.subpageContent.innerHTML = `
      <div class="subpage-summary"><span class="subpage-summary-icon">安</span><div><strong>账户安全正常</strong><span>最近登录：今天 08:32 · 上海</span></div></div>
      <section class="info-section"><h2>安全设置</h2>${infoRows([
        { label: "绑定手机", value: maskPhone(driver.phone), action: "change-phone" },
        { label: "登录密码", value: "已设置", action: "change-password" },
        { label: "实名认证", value: certification.status === "verified" ? "身份资料已核验" : "认证流程未完成", status: certificationView.label, warning: certification.status !== "verified" },
        { label: "登录设备", value: "1 台设备", action: "devices" },
      ])}</section>`;
    return;
  }

  if (page === "vehicle") {
    elements.subpageContent.innerHTML = `
      <div class="vehicle-page-body"><div class="subpage-summary vehicle-summary"><span class="subpage-summary-icon"><img src="assets/vehicle-truck.svg" alt="" width="40" height="40"></span><div><strong>${h(plateNo)}</strong><span>${h(vehicle?.type || "暂无车辆信息")}</span></div></div>
      <section class="info-section"><h2>车辆档案</h2>${infoRows([
        { label: "车牌号码", value: plateNo }, { label: "车辆类型", value: vehicle?.type || "-" },
        { label: "运力归属", value: vehicle?.capacityOwnership || "待确定" }, { label: "所属单位", value: vehicle?.organizationName || "待确定" }, { label: "所属车队", value: vehicle?.fleet || driver.fleet }, { label: "车辆状态", value: vehicle?.state || "待分配", status: vehicle?.state || "待分配", warning: vehicle?.state !== "在用" },
        { label: "营运证号", value: vehicle?.permitNo || "待补充" }, { label: "下次审验", value: vehicle?.inspectionDue || "待补充" },
      ])}</section>
      <button class="subpage-secondary subpage-link-button" data-subpage-action="open-insurance" type="button">查看车辆保险 <b>›</b></button>
      </div><div class="vehicle-fixed-actions">
        <button class="primary" data-subpage-action="edit-vehicle" type="button" ${vehicle ? "" : "disabled"}>编辑</button>
      </div>`;
    return;
  }

  if (page === "vehicleRepairs") {
    elements.subpageContent.innerHTML = `<div class="vehicle-page-body">${renderDriverRepairHistory()}</div><div class="vehicle-fixed-actions"><button class="primary" data-subpage-action="report-vehicle-repair" type="button">新增报修</button></div>`;
    return;
  }
  if (page === "vehicleRepairDetail") {
    renderDriverRepairDetail();
    return;
  }

  if (page === "vehicleRepair") {
    const preferredCandidate = current?.vehicleId || Object.keys(vehicles).find((plate) => vehicles[plate].driverId === driver.id) || "";
    const preferredPlate = window.VehicleRepair.hasOpenRepair(state.repairs, preferredCandidate) ? "" : preferredCandidate;
    const options = Object.entries(vehicles).map(([plate, item]) => {
      const active = window.VehicleRepair.hasOpenRepair(state.repairs, plate);
      return `<option value="${h(plate)}" ${plate === preferredPlate ? "selected" : ""} ${active ? "disabled" : ""}>${h(plate)} · ${h(item.type || "车辆")}${active ? " · 维修中" : ""}</option>`;
    }).join("");
    elements.subpageContent.innerHTML = `
      <div class="subpage-summary"><span class="subpage-summary-icon">修</span><div><strong>车辆报修</strong><span>提交后车辆将暂停派单，后台会跟进处理</span></div></div>
      <form class="repair-report-form" id="driverVehicleRepairForm">
        <section class="info-section"><h2>故障信息</h2>
          <label class="expense-field">维修车辆<select name="plateNo" required><option value="">请选择车辆</option>${options}</select></label>
          <label class="expense-field">故障类别<select name="category" required><option value="">请选择故障类别</option><option>发动机</option><option>轮胎</option><option>制动系统</option><option>电气系统</option><option>底盘与悬挂</option><option>其他</option></select></label>
          <label class="expense-field">故障描述<textarea name="description" rows="4" maxlength="500" placeholder="请描述故障现象和发生经过" required></textarea></label>
          <label class="expense-field">维修地点<input name="repairLocation" type="text" maxlength="120" placeholder="故障地点或当前停车地点" /></label>
          <label class="expense-field">现场凭证<span class="expense-upload"><input name="evidenceFiles" type="file" accept="image/*,.pdf" multiple /><strong>上传现场照片或凭证</strong><small>支持图片、PDF，单个文件不超过 10 MB</small></span></label>
          <label class="expense-field">补充说明<textarea name="remark" rows="2" maxlength="300" placeholder="选填"></textarea></label>
        </section>
        <button class="subpage-primary" type="submit">提交报修</button>
        <button class="subpage-secondary" data-subpage-action="back-repair-list" type="button">返回报修列表</button>
      </form>`;
    pinDriverFormActions();
    return;
  }

  if (page === "insurance") {
    const mandatory = vehicle?.mandatoryInsuranceNo || vehicle?.insuranceNo || "待补充";
    const commercial = vehicle?.commercialInsuranceNo || "待补充";
    elements.subpageContent.innerHTML = `
      <div class="subpage-summary"><span class="subpage-summary-icon"><img src="assets/vehicle-insurance.svg" alt="" width="40" height="40"></span><div><strong>${h(plateNo)} 保险档案</strong><span>保险资料来自管理端车辆档案</span></div></div>
      <section class="info-section"><h2>有效保单</h2>
        <div class="document-record"><header><strong>机动车交通事故责任强制保险</strong></header><p>承保公司：${h(vehicle?.mandatoryInsuranceCompany || "待补充")}<br>保单号：${h(mandatory)}<br>有效期至：${h(vehicle?.mandatoryInsuranceExpiry || vehicle?.insuranceDue || "待补充")}</p></div>
        <div class="document-record"><header><strong>商业车辆保险</strong></header><p>承保公司：${h(vehicle?.commercialInsuranceCompany || "待补充")}<br>保单号：${h(commercial)}<br>有效期至：${h(vehicle?.commercialInsuranceExpiry || "待补充")}</p></div>
        <div class="document-record"><header><strong>货物运输保险</strong></header><p>保单号：${h(vehicle?.cargoInsuranceNo || "待补充")}<br>有效期至：${h(vehicle?.cargoInsuranceExpiry || "待补充")}</p></div>
      </section>`;
    return;
  }

  if (page === "messages") {
    const announcements = currentDriverAnnouncements();
    elements.subpageContent.innerHTML = `
      <section class="info-section"><h2>最新消息</h2>
        ${announcements.map((item) => `<div class="message-record announcement-message-record"><header><strong>${h(item.title)}</strong><em>${h(item.type || "公告")}</em></header><p>${h(item.content)}</p>${item.attachment ? `<small>附件：${h(item.attachment)}</small>` : ""}<time>${h(item.publishedAt || "刚刚")}</time></div>`).join("")}
        <div class="message-record"><strong>新派单提醒</strong><p>您有新的运输任务，请进入接单页面及时处理。</p><time>今天 08:20</time></div>
        <div class="message-record"><strong>证件到期提醒</strong><p>系统将持续监控驾驶证和从业资格证有效期。</p><time>昨天 16:40</time></div>
        <div class="message-record"><strong>运输节点同步成功</strong><p>运单 WB20260920008 的在途节点已同步至调度后台。</p><time>09月20日 14:48</time></div>
      </section>`;
    return;
  }

  if (page === "expenseRecords") {
    renderExpenseRecords();
    return;
  }

  if (page === "expenses") {
    const selectedType = EXPENSE_TYPES.find((item) => item.key === state.activeExpenseType);
    const selectableDispatches = window.ExpenseReport.getSelectableDispatches(state.dispatches, state.currentDriverId);
    const defaultDispatch = window.ExpenseReport.getDefaultDispatch(state.dispatches, state.currentDriverId);
    const defaultVehicleId = defaultDispatch?.vehicleId || "";
    const driverExpenses = state.expenses
      .filter((item) => item.driverId === state.currentDriverId)
      .slice()
      .sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
    if (!selectedType) {
      elements.subpageContent.innerHTML = `
        <div class="subpage-summary expense-summary"><span class="subpage-summary-icon">${window.DriverExpenseVisuals.icon("other")}</span><div><strong>费用上报</strong><span>选择费用类型，提交运输相关支出</span></div></div>
        <section class="info-section expense-type-section"><h2>选择费用类型</h2><div class="expense-type-grid">
          ${EXPENSE_TYPES.map((item) => `<button class="expense-type-option expense-${h(item.key)}" data-expense-type="${h(item.key)}" type="button"><span class="expense-type-copy"><strong>${h(item.label)}<svg class="expense-type-chevron" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><circle cx="6" cy="6" r="6" fill="currentColor" opacity=".14"/><path d="m5 3.5 2.5 2.5L5 8.5" fill="none" stroke="currentColor" stroke-width="1.2"/></svg></strong><small>${h(item.hint)}</small></span><span class="expense-type-icon">${window.DriverExpenseVisuals.icon(item.key)}</span></button>`).join("")}
        </div></section>
        ${driverExpenses.length ? `<section class="info-section expense-history"><h2>最近上报</h2>${driverExpenses.slice(0, 3).map((item) => { const status = expenseStatusMeta(item.status); return `<article class="expense-record"><div class="expense-record-top"><small>${h([item.waybillNo, item.vehicleId].filter(Boolean).join(" · "))}</small><em class="${status.className}">${status.label}</em></div><div class="expense-record-heading"><strong>${h(item.typeLabel)}</strong><b>¥ ${h(item.amount)}</b></div><span class="expense-record-date">${h(item.date)}</span>${item.status === "rejected" && item.rejectionReason ? `<small class="expense-rejection-reason">${h(item.rejectionReason)}</small>` : ""}</article>`; }).join("")}</section>` : `<div class="expense-empty">提交后的费用上报会显示在这里</div>`}`;
      return;
    }
    elements.subpageContent.innerHTML = `
      <div class="subpage-summary expense-summary"><span class="subpage-summary-icon">${window.DriverExpenseVisuals.icon(selectedType.key)}</span><div><strong>${h(selectedType.label)}</strong><span>填写本次费用明细并提交审核</span></div></div>
      <form class="expense-form" id="expenseForm">
        <section class="info-section"><h2>费用明细</h2>
          ${selectedType.key === "other" ? `<label class="expense-field">费用名称<input name="customType" type="text" maxlength="20" placeholder="请输入费用名称" required /></label>` : ""}
          <label class="expense-field">关联运单<select name="dispatchId" data-expense-waybill required ${selectableDispatches.length ? "" : "disabled"}>
            ${selectableDispatches.length ? selectableDispatches.map((item) => `<option value="${h(item.id)}" data-vehicle-id="${h(item.vehicleId || "")}" ${item.id === defaultDispatch?.id ? "selected" : ""}>${h(item.waybillNo)} · ${h(item.routeName)} · ${h(item.status)}</option>`).join("") : `<option value="">暂无进行中或已完成运单</option>`}
          </select></label>
          <label class="expense-field">车辆<select name="vehicleId" required>
            <option value="">请选择车辆</option>
            ${Object.entries(vehicles).map(([plateNo, vehicle]) => `<option value="${h(plateNo)}" ${plateNo === defaultVehicleId ? "selected" : ""}>${h(plateNo)} · ${h(vehicle.type)}</option>`).join("")}
          </select></label>
          <label class="expense-field">费用金额（元）<input name="amount" type="number" min="0.01" step="0.01" inputmode="decimal" placeholder="请输入费用金额" required /></label>
          <label class="expense-field">发生日期<input name="date" type="date" value="${todayInputValue()}" required /></label>
          <div class="expense-field expense-proof-field"><span>费用凭证</span><div class="expense-upload"><label class="image-upload-tile"><input name="receipt" type="file" accept="image/*,.pdf" />${window.DriverUploadUI.camera}<span>图片</span></label><div class="expense-file-previews"></div><strong class="expense-upload-filename" hidden>上传发票或支付凭证</strong><small>支持图片、PDF，单个文件不超过 10MB</small></div></div>
          <label class="expense-field expense-remark-field"><span>备注说明</span><textarea name="remark" rows="3" maxlength="120" placeholder="请输入费用用途或补充说明（选填）"></textarea></label>
        </section>
        <div class="expense-fixed-actions"><button class="subpage-secondary" data-subpage-action="back-expense-types" type="button">返回费用类型</button><button class="subpage-primary" type="submit" ${selectableDispatches.length ? "" : "disabled"}>提交费用上报</button></div>
      </form>`;
    pinDriverFormActions();
    return;
  }

  if (page === "service") {
    elements.subpageContent.innerHTML = `
      <div class="subpage-summary"><span class="subpage-summary-icon">客</span><div><strong>客服中心</strong><span>工作时间 07:00 - 22:00</span></div></div>
      <section class="info-section"><h2>联系信息</h2>${infoRows([{ label: "客服热线", value: "400-800-6688" }, { label: "值班客服", value: "周客服" }, { label: "服务车队", value: driver.fleet }])}</section>
      <a class="subpage-primary" href="tel:4008006688">拨打客服热线</a>`;
    return;
  }

  elements.subpageContent.innerHTML = `
    <section class="info-section settings-section"><h2>系统设置</h2>
      <div class="settings-row"><div><strong>界面字体</strong><span>调整司机端所有页面的显示字号</span></div><div class="font-size-options" role="radiogroup" aria-label="界面字体大小">
        ${Object.entries(FONT_SIZE_OPTIONS).map(([key, option]) => `<button data-font-size="${key}" type="button" aria-pressed="${state.fontSize === key}">${option.label}</button>`).join("")}
      </div></div>
      ${infoRows([
        { label: "消息提醒", value: "已开启", action: "notifications" }, { label: "清理缓存", value: "12.6 MB", action: "clear-cache" },
        { label: "隐私政策", value: "", action: "privacy" }, { label: "当前版本", value: "1.0.0" },
      ])}
    </section>
    <button class="subpage-primary" data-subpage-action="logout" type="button">退出当前账号</button>`;
}

function openProfileSubpage(page) {
  state.activeProfilePage = page;
  if (page !== "expenses") state.activeExpenseType = "";
  renderSubpage(page);
  elements.profileSubpage.classList.add("open");
  elements.profileSubpage.setAttribute("aria-hidden", "false");
  elements.bottomNav.hidden = true;
  elements.bottomNav.setAttribute("aria-hidden", "true");
  document.querySelector(".phone-shell").classList.add("subpage-open");
  elements.subpageContent.scrollTop = 0;
}

function closeProfileSubpage() {
  window.DriverOrderFilters.close();
  window.closeMobileSelect();
  elements.profileSubpage.classList.remove("open");
  elements.profileSubpage.setAttribute("aria-hidden", "true");
  elements.bottomNav.hidden = false;
  elements.bottomNav.setAttribute("aria-hidden", "false");
  document.querySelector(".phone-shell").classList.remove("subpage-open");
  state.activeProfilePage = "";
  state.activeExpenseType = "";
}

function renderDetail() {
  const dispatch = state.dispatches.find((item) => item.id === state.activeDispatchId);
  if (!dispatch) return closeDetail();
  const meta = waybillMeta[dispatch.waybillNo] || {};
  const category = dispatchCategory(dispatch);
  const taskProgress = getTaskProgress(dispatch);
  const taskPosition = `${taskProgress.completedCount}/${taskProgress.nodes.length}`;
  const timeline = [...(dispatch.timeline || [])].reverse().map((item, index) => `
    <div class="timeline-row ${index === 0 ? "is-current" : "is-recorded"}" ${index === 0 ? 'aria-current="step"' : ""}><span class="timeline-step-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${index === 0 ? '<circle cx="12" cy="12" r="8"/><path d="M8 12h8m-3-3 3 3-3 3"/>' : '<path d="m6 12 4 4 8-8"/>'}</svg></span><div class="timeline-copy"><div class="timeline-node-heading"><strong class="timeline-node">${h(item.node)}</strong></div><time class="timeline-time">${h(item.time.split(" ")[1] || item.time)} ${h(item.time.split(" ")[0] || "")}</time><p class="timeline-desc">${h(item.desc)}</p>${item.photos?.length || item.photoAttachments?.length ? `<div class="photo-tags">${renderTimelinePhotoTags(item)}</div>` : ""}</div></div>`).join("");
  elements.detailContent.innerHTML = `
    <section class="detail-status-card"><div class="detail-status-top"><span>${h(dispatch.waybillNo)}</span><strong>${h(statusLabel(dispatch))}</strong></div><h2>${h(statusDescription(dispatch))}</h2><p>派单时间 ${h(String(dispatch.dispatchTime || "-").replace("T", " ").slice(0, 16))}</p></section>
    <section class="detail-route-card"><div class="detail-route-title"><strong>${h(dispatch.routeName)}</strong><span>${h(dispatch.vehicleId || "待分配")}</span></div>${renderDispatchJobLocations(dispatch, "detail-job-locations")}</section>
    <section class="detail-card"><div class="detail-card-heading"><strong class="detail-card-title">任务进度</strong><span class="dual-badge dual-badge-${category}"><span>${h(statusLabel(dispatch))}</span><i aria-hidden="true"></i><span>${h(taskProgress.taskType)}</span></span></div><div class="detail-progress-meta"><span>当前节点 <strong>${h(taskProgress.currentNode)}</strong></span><b>${taskPosition}</b></div>${renderTaskNodeOverviewV2(dispatch)}</section>
    <section class="detail-card"><strong class="detail-card-title">节点记录</strong><div class="timeline-list">${timeline || `<div class="empty-state"><p>暂无节点记录</p></div>`}</div></section>
    <section class="detail-card"><strong class="detail-card-title">运单信息</strong><div class="detail-grid"><div class="detail-field"><span>客户名称</span><strong>${h(meta.customer || "待补充")}</strong></div><div class="detail-field"><span>提单号</span><strong>${h(meta.billNo || "-")}</strong></div><div class="detail-field"><span>箱信息</span><strong>${h(dispatch.boxes)}</strong></div><div class="detail-field"><span>封号</span><strong>${h(meta.sealNo || "-")}</strong></div><div class="detail-field"><span>车辆</span><strong>${h(dispatch.vehicleId || "待分配")}</strong></div><div class="detail-field"><span>收货人</span><strong>${h(dispatch.consignee || "-")}</strong></div><div class="detail-field"><span>到达时间</span><strong>${h(String(dispatch.arrivalTime || "-").replace("T", " ").slice(0, 16))}</strong></div><div class="detail-field"><span>到达地点</span><strong>${h(dispatch.arrivalLocation || "-")}</strong></div><div class="detail-field full"><span>还箱地</span><strong>${h(dispatch.loadAddress || "-")}</strong></div><div class="detail-field full"><span>备注</span><strong>${h(dispatch.note || "无")}</strong></div>${dispatch.rejectionReason ? `<div class="detail-field full"><span>拒单原因</span><strong>${h(dispatch.rejectionReason)}</strong></div>` : ""}</div></section>
    `;

  renderTimelinePhotoImages();
  elements.detailActionBar.innerHTML = renderDetailActionBar(dispatch, category);
}

function renderAll() {
  renderTasks();
  renderOrders();
  renderProfile();
  if (elements.detailView.classList.contains("open")) renderDetail();
  if (elements.profileSubpage.classList.contains("open") && state.activeProfilePage) renderSubpage(state.activeProfilePage);
}

function switchView(viewName) {
  const target = document.querySelector(`#${viewName}View`);
  if (!target) return;
  document.querySelectorAll(".mobile-view").forEach((view) => view.classList.toggle("active", view === target));
  elements.bottomNav.querySelectorAll("button").forEach((button) => button.classList.toggle("active", button.dataset.view === viewName));
  elements.title.textContent = target.dataset.title;
  document.querySelector("#headerEyebrow").textContent = viewName === "messages" ? "任务与预警通知" : "集卡司机端";
  target.scrollTo({ top: 0, behavior: "smooth" });
  if (viewName === "profile") renderProfile();
  if (viewName === "tasks") renderTasks();
  if (viewName === "messages") renderDriverMessages();
}

function openDetail(dispatchId) {
  state.activeDispatchId = dispatchId;
  renderDetail();
  elements.detailView.classList.add("open");
  elements.bottomNav.hidden = true;
  elements.bottomNav.setAttribute("aria-hidden", "true");
  document.querySelector(".phone-shell").classList.add("detail-open");
  elements.detailView.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeDetail() {
  clearTimelinePhotoUrls();
  elements.detailView.classList.remove("open");
  const subpageOpen = elements.profileSubpage?.classList.contains("open") || false;
  elements.bottomNav.hidden = subpageOpen;
  elements.bottomNav.setAttribute("aria-hidden", String(subpageOpen));
  document.querySelector(".phone-shell").classList.remove("detail-open");
  elements.detailView.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  state.activeDispatchId = "";
}

let toastTimer;
function showToast(message) {
  clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  toastTimer = setTimeout(() => elements.toast.classList.remove("show"), 2500);
}

function persist(message) {
  window.DispatchStore.save(state.dispatches);
  if (window.opener && !window.opener.closed) {
    window.opener.postMessage({ type: "dispatch-update", dispatches: state.dispatches }, "*");
  }
  renderAll();
  if (message) showToast(message);
}

function acceptDispatch(dispatchId) {
  const dispatch = state.dispatches.find((item) => item.id === dispatchId);
  if (!dispatch || dispatch.status !== "已派单") return false;
  dispatch.taskType = dispatchTaskType(dispatch);
  if (!dispatch.taskConfigSnapshot) {
    const snapshot = window.DispatchTaskNodes.snapshot(dispatch.taskType);
    if (snapshot && Array.isArray(dispatch.photoRequirements) && dispatch.photoRequirements.length) {
      snapshot.nodes = window.DispatchTaskNodes.distributeLegacyPhotoRequirements(dispatch.taskType, dispatch.photoRequirements, snapshot.nodes);
    }
    dispatch.taskConfigSnapshot = snapshot;
  }
  dispatch.status = "运输中";
  dispatch.currentNode = "已接单";
  dispatch.acceptedAt = window.DispatchStore.nowText();
  dispatch.timeline = dispatch.timeline || [];
  dispatch.timeline.push({ node: "已接单", time: dispatch.acceptedAt, desc: "司机已确认接单，任务开始执行", photos: [] });
  const firstNode = taskNodes(dispatch)[0];
  if (firstNode) window.DispatchTaskNodes.notify?.(dispatch, firstNode, "start");
  persist("接单成功，已同步至调度后台");
  return true;
}

function acceptAndOpenOrders(dispatchId) {
  const certification = currentCertification();
  if (certification.status !== "verified") {
    if (elements.detailView.classList.contains("open")) closeDetail();
    openProfileSubpage("certification");
    const message = certification.status === "pending" ? "认证资料正在审核，通过后即可接单" : "请先完成司机认证后再接单";
    showToast(message);
    return;
  }
  if (!acceptDispatch(dispatchId)) return;
  closeDetail();
  if (elements.profileSubpage.classList.contains("open")) closeProfileSubpage();
  state.workStage = "active";
  switchView("tasks");
}

function openReject(dispatchId) {
  state.activeDispatchId = dispatchId;
  document.querySelector("#rejectForm").reset();
  elements.rejectDialog.showModal();
}

function openProgress(dispatchId, requestedNode) {
  const dispatch = state.dispatches.find((item) => item.id === dispatchId);
  if (!dispatch || dispatch.status !== "运输中") return;
  const node = nextNode(dispatch);
  if (requestedNode && requestedNode !== node) return;
  state.activeDispatchId = dispatchId;
  document.querySelector("#progressForm").reset();
  document.querySelector("#nextNodeText").textContent = node;
  renderProgressPhotoRequirements(dispatch, node);
  elements.progressDialog.showModal();
}

function syncFromStore() {
  state.dispatches = mergeDefaultExamples(window.DispatchStore.load(dispatchSeed), state.dispatches);
  renderAll();
}

elements.bottomNav.addEventListener("click", (event) => {
  const button = event.target.closest("[data-view]");
  if (button) switchView(button.dataset.view);
});

document.querySelector("#driverMessageTabs").addEventListener("click", (event) => {
  const button = event.target.closest("[data-message-filter]");
  if (!button) return;
  state.driverMessageFilter = button.dataset.messageFilter;
  document.querySelectorAll("#driverMessageTabs button").forEach((item) => {
    const active = item === button;
    item.classList.toggle("active", active);
    item.setAttribute("aria-pressed", String(active));
  });
  renderDriverMessages();
});

document.querySelector("#driverReadAllButton").addEventListener("click", () => {
  saveDriverMessageReadIds(driverMessages().map((item) => item.id));
  renderDriverMessages();
  showToast("消息已全部标记为已读");
});

document.querySelector("#driverMessageList").addEventListener("click", (event) => {
  const button = event.target.closest("[data-driver-message-id]");
  if (!button) return;
  markDriverMessageRead(button.dataset.driverMessageId);
  const dispatchId = button.dataset.messageDispatchId;
  if (dispatchId) openDetail(dispatchId);
});

function handleDispatchAction(event) {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const { action, id } = button.dataset;
  if (action === "detail") openDetail(id);
  if (action === "accept") acceptAndOpenOrders(id);
  if (action === "progress") openProgress(id, button.dataset.node);
  if (action === "contact") showToast("调度中心电话：400-800-6688");
}

elements.taskList.addEventListener("click", handleDispatchAction);

function openOrdersForStage(stage) {
  const filterByStage = { all: "all", pickup: "active", transit: "active", completed: "completed", cancelled: "cancelled" };
  state.orderStage = stage;
  state.orderFilter = filterByStage[stage] || "all";
  state.orderSearch = "";
  openProfileSubpage("myOrders");
}

elements.profileView.addEventListener("click", (event) => {
  const callButton = event.target.closest("[data-call-service]");
  if (callButton) {
    window.location.href = "tel:4008006688";
    return;
  }
  const expenseStatButton = event.target.closest("[data-expense-status]");
  if (expenseStatButton) {
    state.expenseRecordFilter = expenseStatButton.dataset.expenseStatus;
    openProfileSubpage("expenseRecords");
    return;
  }
  const stageButton = event.target.closest("[data-order-stage]");
  if (stageButton) {
    openOrdersForStage(stageButton.dataset.orderStage);
    return;
  }
  const pageButton = event.target.closest("[data-profile-page]");
  if (pageButton) openProfileSubpage(pageButton.dataset.profilePage);
});

document.querySelector("#workStageTabs").addEventListener("click", (event) => {
  const button = event.target.closest("[data-work-stage]");
  if (!button) return;
  state.workStage = button.dataset.workStage;
  renderTasks();
});

elements.subpageContent.addEventListener("click", (event) => {
  const expenseFilter = event.target.closest("[data-expense-status]");
  if (expenseFilter) {
    state.expenseRecordFilter = expenseFilter.dataset.expenseStatus;
    renderExpenseRecords();
    return;
  }

  const button = event.target.closest("[data-status]");
  if (button) {
    state.orderFilter = button.dataset.status;
    state.orderStage = "all";
    document.querySelectorAll("#orderStatusTabs button").forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    renderOrders();
    return;
  }
  if (event.target.closest("#orderList")) handleDispatchAction(event);
});

elements.subpageContent.addEventListener("input", (event) => {
  if (event.target.id !== "orderSearch") return;
  state.orderSearch = event.target.value.trim();
  renderOrders();
});

document.querySelector("#backFromDetail").addEventListener("click", closeDetail);
document.querySelector("#detailMoreButton").addEventListener("click", () => showToast("运单信息已是最新状态"));
document.querySelector("#backFromSubpage").addEventListener("click", () => {
 if(state.activeProfilePage==='feedback'&&document.querySelector('[data-feedback-back]')){document.querySelector('[data-feedback-back]').click();return;}
 if(state.activeProfilePage==='feedback'&&state.activeFeedbackTab==='history'){state.activeFeedbackTab='submit';renderDriverFeedback();return;}
  if (["vehicleRepair", "vehicleRepairDetail"].includes(state.activeProfilePage)) openProfileSubpage("vehicleRepairs");
  else closeProfileSubpage();
});

elements.subpageContent.addEventListener("submit", async (event) => {
  if (event.target.id === "driverFeedbackForm") {
    event.preventDefault();
    const form = event.target;
    const values = new FormData(form);
    const description = String(values.get("description") || "").trim();
    const contactPhone = String(values.get("contactPhone") || "").trim();
    if (description.length < 10) { showToast("问题描述至少填写 10 个字"); form.elements.description.focus(); return; }
    if (contactPhone && !/^1[3-9]\d{9}$/.test(contactPhone)) { showToast("请输入正确的 11 位联系电话"); form.elements.contactPhone.focus(); return; }
    const validation = window.FeedbackManager.validateFiles(form.elements.attachments.files);
    if (validation.error) { showToast(validation.error); return; }
    const submitButton = form.querySelector("[type='submit']");
    submitButton.disabled = true;
    submitButton.textContent = validation.files.length ? "正在上传附件…" : "正在提交…";
    const driver = currentDriver();
    const current = driverDispatches().find((item) => item.status === "运输中" && item.vehicleId) || driverDispatches().find((item) => item.vehicleId);
    const relatedOption = form.elements.relatedId.selectedOptions[0];
    const feedbackId = window.FeedbackManager.makeId();
    try {
      const attachments = await window.FeedbackManager.saveAttachments(feedbackId, validation.files);
      window.FeedbackManager.create({
        id: feedbackId,
        source: "driver",
        submitterId: driver.id,
        submitterName: driver.name,
        submitterPhone: driver.phone,
        organizationName: driver.organizationName || "本公司",
        fleetName: driver.fleet,
        capacityOwnership: driver.capacityOwnership || "自营",
        vehicleId: current?.vehicleId || "",
        businessId: String(values.get("businessId") || "").trim(),
        moduleId: String(values.get("moduleId") || ""),
        moduleLabel: form.elements.moduleId.selectedOptions[0]?.value ? form.elements.moduleId.selectedOptions[0].textContent : "",
        categoryCode: String(values.get("categoryCode") || ""),
        description,
        contactPhone,
        relatedType: values.get("relatedId") ? "dispatch" : "",
        relatedId: String(values.get("relatedId") || ""),
        relatedLabel: relatedOption?.dataset.relatedLabel || "",
        attachments,
        clientVersion: "司机端 1.0",
        deviceInfo: String(navigator.userAgent || "移动设备").slice(0, 120),
      });
      state.activeFeedbackTab = "history";
      renderDriverFeedback();
      elements.subpageContent.scrollTop = 0;
      showToast(`反馈已提交：${feedbackId}`);
    } catch (error) {
      console.error("意见反馈提交失败。", error);
      showToast(error.message || "反馈提交失败，请重试");
      submitButton.disabled = false;
      submitButton.textContent = "提交意见反馈";
    }
    return;
  }
  if (event.target.id === "personalEditForm") {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());
    const phone = String(data.phone || "").trim();
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      showToast("请输入正确的 11 位手机号码");
      return;
    }
    const driver = currentDriver();
    Object.assign(driver, {
      name: String(data.name || "").trim(),
      phone,
      fleet: String(data.fleet || "").trim(),
      address: String(data.address || "").trim(),
      emergencyContact: String(data.emergencyContact || "").trim(),
    });
    state.dispatches.forEach((dispatch) => {
      if (dispatch.driverId !== driver.id) return;
      dispatch.driverName = driver.name;
      dispatch.phone = driver.phone;
    });
    saveDriverProfiles();
    window.DispatchStore.save(state.dispatches);
    renderProfile();
    renderSubpage("personal");
    elements.subpageContent.scrollTop = 0;
    showToast("个人信息已保存");
    return;
  }
  if (event.target.id === "vehicleEditForm") {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());
    const plateNo = String(data.plateNo || "").trim();
    const vehicle = vehicles[plateNo];
    if (!vehicle) { showToast("未找到车辆档案"); return; }
    Object.assign(vehicle, {
      type: String(data.vehicleType || "").trim(),
      fleet: String(data.fleet || "").trim(),
      permitNo: String(data.permitNo || "").trim(),
      inspectionDue: String(data.inspectionDue || "").trim(),
    });
    saveDriverVehicleProfile(plateNo);
    renderProfile();
    renderSubpage("vehicle");
    elements.subpageContent.scrollTop = 0;
    showToast("车辆信息已保存并同步后台");
    return;
  }
  if (event.target.id === "driverVehicleRepairForm") {
    event.preventDefault();
    const form = event.target;
    const data = Object.fromEntries(new FormData(form).entries());
    const plateNo = String(data.plateNo || "").trim();
    const vehicle = vehicles[plateNo];
    if (!vehicle) { showToast("请选择有效车辆"); return; }
    const evidenceFiles = Array.from(form.elements.evidenceFiles.files || []);
    if (evidenceFiles.some((file) => file.size > 10 * 1024 * 1024)) { showToast("单个凭证不能超过 10 MB"); return; }
    const driver = currentDriver();
    const result = window.VehicleRepair.createRecord(state.repairs, {
      ...data,
      plateNo,
      vehicleType: vehicle.type,
      fleet: vehicle.fleet,
      source: "司机报修",
      reporterId: driver.id,
      reporterName: driver.name,
      createdBy: driver.name,
      reportedAt: new Date().toISOString(),
      evidence: [],
      status: "待维修",
      capacityOwnershipSnapshot: vehicle.capacityOwnership || "待确定",
      vehicleOrganizationSnapshot: vehicle.organizationName || "待确定",
    }, { vehicleState: vehicle.state });
    if (result.error) { showToast(result.error); return; }
    const uploadedAt = window.DispatchStore.nowText();
    const attachments = evidenceFiles.map((file, index) => ({
      id: `repair-${result.record.id}-${Date.now()}-${index}`,
      name: file.name,
      type: file.type || "application/octet-stream",
      uploadedAt,
    }));
    try {
      if (attachments.length) await window.DispatchStore.savePhotos(attachments.map((item, index) => ({ id: item.id, blob: evidenceFiles[index] })));
    } catch (error) {
      showToast("凭证保存失败，请重试");
      return;
    }
    result.record.evidence = attachments;
    state.repairs.unshift(result.record);
    vehicle.state = "维修中";
    state.repairs = window.VehicleRepair.save(state.repairs);
    const snapshot = window.AdminDataBridge.read() || {};
    const nextSnapshot = { ...snapshot, vehicleRepairs: state.repairs };
    if (Array.isArray(snapshot.vehicles)) {
      nextSnapshot.vehicles = snapshot.vehicles.map((item) => item.plateNo === plateNo ? { ...item, vehicleState: "维修中" } : item);
    }
    window.AdminDataBridge.write(nextSnapshot);
    renderProfile();
    openProfileSubpage("vehicleRepairs");
    showToast("报修已提交，车辆已暂停派单");
    return;
  }
  if (event.target.id === "expenseForm") {
    event.preventDefault();
    const formData = new FormData(event.target);
    const amount = Number(formData.get("amount"));
    const selectedType = EXPENSE_TYPES.find((item) => item.key === state.activeExpenseType);
    const dispatch = window.ExpenseReport.getSelectableDispatches(state.dispatches, state.currentDriverId)
      .find((item) => item.id === formData.get("dispatchId"));
    const vehicleId = String(formData.get("vehicleId") || "").trim();
    const customType = String(formData.get("customType") || "").trim();
    if (!selectedType || !Number.isFinite(amount) || amount <= 0) {
      showToast("请输入有效的费用金额");
      return;
    }
    if (!dispatch) {
      showToast("请选择有效的关联运单");
      return;
    }
    if (!vehicleId || !vehicles[vehicleId]) {
      showToast("请选择车辆");
      return;
    }
    if (selectedType.key === "other" && !customType) {
      showToast("请输入费用名称");
      return;
    }
    state.expenses.unshift({
      id: `EXP-${Date.now()}`,
      driverId: state.currentDriverId,
      type: selectedType.key,
      typeLabel: selectedType.key === "other" ? customType : selectedType.label,
      customType,
      dispatchId: dispatch.id,
      waybillNo: dispatch.waybillNo,
      vehicleId,
      amount: amount.toFixed(2),
      date: String(formData.get("date") || ""),
      receiptName: formData.get("receipt")?.name || "",
      remark: String(formData.get("remark") || "").trim(),
      status: "pending",
      createdAt: new Date().toISOString(),
      capacityOwnershipSnapshot: dispatch.capacityOwnershipSnapshot || window.CapacityOwnership.groupSnapshot([{ ...currentDriver(), role: "司机", name: currentDriver().name }, { ...vehicles[vehicleId], role: "车辆", name: vehicleId }]).type,
      capacityOwnershipTooltipSnapshot: dispatch.capacityOwnershipTooltipSnapshot || "",
      driverOrganizationSnapshot: dispatch.driverOrganizationSnapshot || currentDriver().organizationName || "本公司",
      vehicleOrganizationSnapshot: dispatch.vehicleOrganizationSnapshot || vehicles[vehicleId].organizationName || "待确定",
    });
    saveExpenses(state.expenses);
    if (window.opener && !window.opener.closed) {
      window.opener.postMessage({ type: "driver-expense-update", expenses: state.expenses }, "*");
    }
    state.activeExpenseType = "";
    renderExpenseStats();
    renderSubpage("expenses");
    showToast("费用上报已提交，等待审核");
    return;
  }
  if (event.target.id !== "certificationForm") return;
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const driver = currentDriver();
  const phone = String(formData.get("phone") || "").trim();
  if (!/^1[3-9]\d{9}$/.test(phone)) { showToast("请输入正确的 11 位手机号码"); return; }
  const identityChanges = {};
  for(const key of ["name","address","emergencyContact","idCard","idCardValidFrom","idCardValidTo","licenseNo","licenseClass","licenseExpiry","qualificationNo","qualificationExpiry"]){if(formData.has(key))identityChanges[key]=String(formData.get(key)||"").trim();}
  identityChanges.phone = phone;
  const nextCertification = {
    ...(state.certifications[state.currentDriverId] || {}),
    status: "pending",
    submittedAt: window.DispatchStore.nowText(),
    reviewedAt: "",
    reason: "",
  };
  try {
    const attachmentResult = await replaceCredentialAttachmentsFromForm(form, nextCertification, true);
    if (attachmentResult.error) { showToast(attachmentResult.error); return; }
  } catch (error) {
    console.error("认证附件保存失败。", error);
    showToast("认证附件保存失败，请重试");
    return;
  }
  Object.assign(driver,identityChanges);
  state.certifications[state.currentDriverId] = nextCertification;
  saveDriverProfiles();
  saveCertifications(state.certifications);
  renderProfile();
  renderSubpage("certification");
  showToast("认证资料已提交，请等待后台审核");
});

elements.subpageContent.addEventListener("change", (event) => {
  const feedbackFiles = event.target.closest("#driverFeedbackForm input[name='attachments']");
  if (feedbackFiles) {
    const validation = window.FeedbackManager.validateFiles(feedbackFiles.files);
    const summary = feedbackFiles.closest(".feedback-field").querySelector("[data-feedback-files]");
    if (validation.error) {
      feedbackFiles.value = "";
      summary.textContent = validation.error;
      showToast(validation.error);
      return;
    }
    summary.textContent = validation.files.length ? `已选择 ${validation.files.length} 个附件：${validation.files.map((file) => file.name).join("、")}` : "尚未选择附件";
    return;
  }
  const waybillSelect = event.target.closest("#expenseForm [data-expense-waybill]");
  if (waybillSelect) {
    const selectedOption = waybillSelect.selectedOptions[0];
    const vehicleSelect = waybillSelect.form.elements.vehicleId;
    if (selectedOption?.dataset.vehicleId && vehicles[selectedOption.dataset.vehicleId]) {
      vehicleSelect.value = selectedOption.dataset.vehicleId;
    }
    return;
  }
  const receiptInput = event.target.closest("#expenseForm input[name='receipt']");
  if (receiptInput) {
    const file = receiptInput.files?.[0];
    const upload = receiptInput.closest(".expense-upload");
    const label = upload.querySelector("strong");
    const hint = upload.querySelector("small");
    if (file && file.size > 10 * 1024 * 1024) {
      receiptInput.value = "";
      label.textContent = "上传发票或支付凭证";
      hint.textContent = "文件超过 10MB，请重新选择";
      upload.classList.add("error");
      showToast("凭证文件不能超过 10MB");
      return;
    }
    label.textContent = file?.name || "上传发票或支付凭证";
    hint.textContent = file ? "已选择凭证" : "支持图片、PDF，单个文件不超过 10MB";
    upload.classList.toggle("selected", Boolean(file));
    upload.classList.remove("error");
    return;
  }
  const repairEvidenceInput = event.target.closest("#driverVehicleRepairForm input[name='evidenceFiles']");
  if (repairEvidenceInput) {
    const files = Array.from(repairEvidenceInput.files || []);
    const oversized = files.find((file) => file.size > 10 * 1024 * 1024);
    const upload = repairEvidenceInput.closest(".expense-upload");
    if (oversized) {
      repairEvidenceInput.value = "";
      upload.querySelector("strong").textContent = "文件超过 10 MB";
      upload.querySelector("small").textContent = "请重新选择较小的凭证文件";
      upload.classList.add("error");
      showToast("单个凭证不能超过 10 MB");
      return;
    }
    upload.querySelector("strong").textContent = files.length ? files.map((file) => file.name).join("、") : "上传现场照片或凭证";
    upload.querySelector("small").textContent = files.length ? `已选择 ${files.length} 个文件` : "支持图片、PDF，单个文件不超过 10 MB";
    upload.classList.toggle("selected", files.length > 0);
    upload.classList.remove("error");
    return;
  }
  const input = event.target.closest("[data-credential-upload-card] input[type='file']");
  if (!input) return;
  const files = Array.from(input.files || []);
  const group = CERTIFICATION_DOCUMENT_GROUPS.find((item) => item.key === input.name);
  if (files.length > 6) {
    input.value = "";
    showToast(`${group?.label || "证件"}最多上传 6 个文件`);
    return;
  }
  if (files.some((file) => !(file.type.startsWith("image/") || file.type === "application/pdf" || /\.(?:jpe?g|png|webp|heic|pdf)$/i.test(file.name)))) {
    input.value = "";
    showToast(`${group?.label || "证件"}仅支持图片或 PDF`);
    return;
  }
  if (files.some((file) => file.size > 10 * 1024 * 1024)) {
    input.value = "";
    showToast(`${group?.label || "证件"}单个文件不能超过 10 MB`);
    return;
  }
  renderSelectedCredentialCard(input);
});

elements.subpageContent.addEventListener("input", (event) => {
  const description = event.target.closest("#driverFeedbackForm textarea[name='description']");
  if (!description) return;
  const counter = description.closest(".feedback-field").querySelector("[data-feedback-count]");
  if (counter) counter.textContent = `${description.value.length}/1000`;
});

elements.subpageContent.addEventListener("click", async (event) => {
  const selectedCredentialPreview = event.target.closest("[data-preview-selected-credential]");
  if (selectedCredentialPreview) {
    openSelectedCredentialPreview(selectedCredentialPreview.closest("[data-credential-upload-card]")?.querySelector("input[type='file']"));
    return;
  }
  const removeCredentialButton = event.target.closest("[data-remove-credential-group]");
  if (removeCredentialButton) {
    const card = removeCredentialButton.closest("[data-credential-upload-card]");
    const input = card?.querySelector("input[type='file']");
    if (!card || !input) return;
    input.value = "";
    input.required = true;
    card.dataset.removeExisting = "true";
    renderSelectedCredentialCard(input);
    showToast("已移除，请重新上传该证件");
    return;
  }
  const feedbackTab = event.target.closest("[data-feedback-tab]");
  if (feedbackTab) {
    state.activeFeedbackTab = feedbackTab.dataset.feedbackTab;
    renderDriverFeedback();
    elements.subpageContent.scrollTop = 0;
    window.lucide?.createIcons();
    return;
  }
  const credentialPreviewButton = event.target.closest("[data-preview-credential]");
  if (credentialPreviewButton) {
    await openCredentialPreview(credentialPreviewButton);
    return;
  }
  const fontButton = event.target.closest(".font-size-options button[data-font-size]");
  if (fontButton) {
    applyFontSize(fontButton.dataset.fontSize);
    return;
  }
  const expenseTypeTarget = event.target.closest("[data-expense-type]");
  if (expenseTypeTarget) {
    state.activeExpenseType = expenseTypeTarget.dataset.expenseType;
    renderSubpage("expenses");
    elements.subpageContent.scrollTop = 0;
    return;
  }
  const actionTarget = event.target.closest("[data-subpage-action]");
  if (!actionTarget) return;
  if (actionTarget.dataset.subpageAction === "repair-detail") {
    state.activeRepairId = actionTarget.dataset.repairId;
    openProfileSubpage("vehicleRepairDetail");
    return;
  }
  if (actionTarget.dataset.subpageAction === "back-repair-list") {
    openProfileSubpage("vehicleRepairs");
    return;
  }

  if (actionTarget.dataset.subpageAction === "edit-personal") {
    renderPersonalEditForm();
    elements.subpageContent.scrollTop = 0;
    return;
  }
  if (actionTarget.dataset.subpageAction === "cancel-personal-edit") {
    renderSubpage("personal");
    elements.subpageContent.scrollTop = 0;
    return;
  }
  if (actionTarget.dataset.subpageAction === "edit-certification") {
    renderCertificationForm(currentCertification());
    elements.subpageContent.scrollTop = 0;
    setTimeout(() => window.lucide?.createIcons(), 0);
    return;
  }
  if (actionTarget.dataset.subpageAction === "cancel-certification-edit") {
    renderSubpage("certification");
    elements.subpageContent.scrollTop = 0;
    return;
  }
  if (actionTarget.dataset.subpageAction === "open-insurance") {
    openProfileSubpage("insurance");
    return;
  }
  if (actionTarget.dataset.subpageAction === "edit-vehicle") {
    const driver = currentDriver();
    const current = driverDispatches().find((item) => item.status === "运输中" && item.vehicleId)
      || driverDispatches().find((item) => item.vehicleId);
    const plateNo = current?.vehicleId || Object.keys(vehicles).find((plate) => vehicles[plate].driverId === driver.id) || "";
    renderVehicleEditForm(plateNo, vehicles[plateNo]);
    elements.subpageContent.scrollTop = 0;
    return;
  }
  if (actionTarget.dataset.subpageAction === "cancel-vehicle-edit") {
    renderSubpage("vehicle");
    elements.subpageContent.scrollTop = 0;
    return;
  }
  if (actionTarget.dataset.subpageAction === "report-vehicle-repair") {
    openProfileSubpage("vehicleRepair");
    return;
  }
  if (actionTarget.dataset.subpageAction === "back-to-vehicle") {
    renderSubpage("vehicle");
    elements.subpageContent.scrollTop = 0;
    return;
  }
  if (actionTarget.dataset.subpageAction === "back-expense-types") {
    state.activeExpenseType = "";
    renderSubpage("expenses");
    elements.subpageContent.scrollTop = 0;
    return;
  }
  const messages = {
    "change-phone": "更换手机号功能将在正式版开放",
    "change-password": "密码修改验证已启动",
    devices: "当前仅有本机登录",
    notifications: "消息提醒设置已更新",
    "clear-cache": "缓存已清理",
    privacy: "隐私政策已是最新版本",
    logout: "当前为演示账号，暂不支持退出",
  };
  showToast(messages[actionTarget.dataset.subpageAction] || "操作已记录");
});

elements.detailActionBar.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-detail-action]");
  if (!button) return;
  const action = button.dataset.detailAction;
  const id = state.activeDispatchId;
  const dispatch = state.dispatches.find((item) => item.id === id);
  if (action === "accept") acceptAndOpenOrders(id);
  if (action === "reject") openReject(id);
  if (action === "progress") openProgress(id);
  if (action === "contact") showToast("调度中心电话：400-800-6688");
  if (action === "back") closeDetail();
  if (action === "copy" && dispatch) {
    try { await navigator.clipboard.writeText(dispatch.waybillNo); showToast("运单号已复制"); }
    catch { showToast(`运单号：${dispatch.waybillNo}`); }
  }
});

elements.detailContent.addEventListener("click", async (event) => {
  const photoButton = event.target.closest("[data-view-photo]");
  if (photoButton) {
    openPhotoViewer(state.activeDispatchId, photoButton.dataset.photoNode, photoButton.dataset.photoId, photoButton.dataset.photoName);
    return;
  }
  const button = event.target.closest("[data-detail-action='navigate']");
  if (!button) return;
  const dispatch = state.dispatches.find((item) => item.id === state.activeDispatchId);
  if (!dispatch) return;
  const address = button.dataset.copyAddress || dispatch.destination;
  try { await navigator.clipboard.writeText(address); showToast("地址已复制，可粘贴到导航软件"); }
  catch { showToast(`地址：${address}`); }
});

document.querySelector("#rejectForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const dispatch = state.dispatches.find((item) => item.id === state.activeDispatchId);
  if (!dispatch) return;
  const formData = new FormData(event.currentTarget);
  const reason = formData.get("reason");
  if (!reason) return;
  const remark = String(formData.get("remark") || "").trim();
  dispatch.status = "取消";
  dispatch.currentNode = "已拒绝";
  dispatch.rejectionReason = remark ? `${reason}：${remark}` : reason;
  dispatch.timeline = dispatch.timeline || [];
  dispatch.timeline.push({ node: "已拒绝", time: window.DispatchStore.nowText(), desc: `司机拒绝派单，原因：${dispatch.rejectionReason}`, photos: [] });
  elements.rejectDialog.close();
  persist("已将拒单原因同步给调度员");
  renderDetail();
});

document.querySelector("#progressForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const dispatch = state.dispatches.find((item) => item.id === state.activeDispatchId);
  if (!dispatch) return;
  const formData = new FormData(event.currentTarget);
  const node = nextNode(dispatch);
  const remark = String(formData.get("remark") || "").trim();
  const photoInputs = [...event.currentTarget.querySelectorAll("[data-photo-slot]")];
  const requirements = photoRequirementsForDispatch(dispatch, node);
  const selectedByRequirement = new Map();
  photoInputs.filter((input) => input.files?.length).forEach((input) => {
    selectedByRequirement.set(input.dataset.photoRequirementId, (selectedByRequirement.get(input.dataset.photoRequirementId) || 0) + 1);
  });
  const missingCount = requirements.reduce((missing, requirement) => {
    const uploaded = uploadedPhotosForRequirement(dispatch, requirement).length;
    return missing + Math.max(0, Number(requirement.quantity || 0) - uploaded - (selectedByRequirement.get(requirement.id) || 0));
  }, 0);
  const nodes = taskNodes(dispatch);
  const isComplete = node === nodes[nodes.length - 1];
  if (isComplete && missingCount) {
    if (!dispatch.taskConfigSnapshot?.nodes) {
      showToast(`完成任务前还需上传 ${missingCount} 张照片以满足拍照要求`);
      return;
    }
  }
  if (dispatch.taskConfigSnapshot?.nodes && missingCount) {
    showToast(`完成“${node}”前还需上传 ${missingCount} 张照片以满足拍照要求`);
    return;
  }
  const capturedPhotos = photoInputs.filter((input) => input.files?.length).map((input, index) => ({
    id: `${dispatch.id}-${Date.now()}-${index}-${Math.random().toString(36).slice(2)}`,
    label: input.dataset.photoLabel,
    requirementId: input.dataset.photoRequirementId,
    requirementName: input.dataset.photoRequirementName,
    requirementDescription: input.dataset.photoRequirementDescription,
    requirementSlot: Number(input.dataset.photoSlotNumber),
    uploadedAt: window.DispatchStore.nowText(),
    name: input.files[0].name,
    type: input.files[0].type,
  }));
  try {
    await window.DispatchStore.savePhotos(capturedPhotos.map((photo) => {
      const input = photoInputs.find((item) => item.dataset.photoRequirementId === photo.requirementId && Number(item.dataset.photoSlotNumber) === photo.requirementSlot);
      return { id: photo.id, blob: input.files[0] };
    }));
  } catch (error) {
    console.error("节点照片保存失败。", error);
    showToast("照片未能保存，节点暂未提交");
    return;
  }
  const files = capturedPhotos.map((photo) => `${photo.requirementName}：${photo.name}`);
  dispatch.currentNode = node;
  if (isComplete) dispatch.status = "已完成";
  dispatch.timeline = dispatch.timeline || [];
  dispatch.timeline.push({ node, time: window.DispatchStore.nowText(), desc: remark || `司机已完成“${node}”节点`, photos: files, photoAttachments: capturedPhotos });
  const next = taskNodes(dispatch)[taskNodes(dispatch).indexOf(node) + 1];
  if (next) window.DispatchTaskNodes.notify?.(dispatch, next, "start");
  window.DispatchTaskNodes.notify?.(dispatch, node, "completion");
  elements.progressDialog.close();
  persist(isComplete ? "任务已完成，状态已同步" : `已提交“${node}”节点`);
  renderDetail();
});

document.querySelector("#progressForm").addEventListener("change", (event) => {
  if (event.target.matches("[data-photo-slot]")) updateProgressPhotoCount();
});

document.querySelector("#photoViewerClose").addEventListener("click", () => document.querySelector("#photoViewerDialog").close());
document.querySelector("#photoViewerDialog").addEventListener("close", clearPhotoViewerUrls);
window.addEventListener("resize", () => {
  if (document.querySelector("#photoViewerDialog").open) positionPhotoViewer();
});

document.querySelectorAll(".bottom-sheet .sheet-close").forEach((button) => {
  button.addEventListener("click", () => button.closest("dialog").close());
});

window.addEventListener("storage", (event) => {
  if (event.key === NODE_NOTIFICATION_STORAGE_KEY) {
    if (document.querySelector("#messagesView").classList.contains("active")) renderDriverMessages();
    renderProfile();
    return;
  }
  if (event.key === window.FeedbackManager.STORAGE_KEY) {
    if (state.activeProfilePage === "feedback") renderDriverFeedback();
    return;
  }
  if (event.key === ANNOUNCEMENT_STORAGE_KEY) {
    renderProfile();
    if (document.querySelector("#messagesView").classList.contains("active")) renderDriverMessages();
    return;
  }
  if (event.key === DRIVER_MESSAGE_READ_STORAGE_KEY) {
    renderProfile();
    return;
  }
  if (event.key === window.VehicleRepair.STORAGE_KEY) {
    state.repairs = window.VehicleRepair.load();
    if (["vehicle", "vehicleRepair", "vehicleRepairs", "vehicleRepairDetail"].includes(state.activeProfilePage)) renderSubpage(state.activeProfilePage);
    return;
  }
  if (event.key === window.AdminDataBridge.STORAGE_KEY) {
    syncVehicleArchive();
    if (Array.isArray(window.AdminDataBridge.read()?.vehicleRepairs)) state.repairs = window.VehicleRepair.load();
    renderProfile();
    if (["vehicle", "vehicleRepair", "vehicleRepairs", "vehicleRepairDetail"].includes(state.activeProfilePage)) renderSubpage(state.activeProfilePage);
    return;
  }
  if (event.key === EXPENSE_STORAGE_KEY) {
    state.expenses = loadExpenses();
    renderExpenseStats();
    if (["expenses", "expenseRecords"].includes(state.activeProfilePage)) renderSubpage(state.activeProfilePage);
    return;
  }
  if (event.key === CERTIFICATION_STORAGE_KEY) {
    state.certifications = loadCertifications();
    renderProfile();
    if (state.activeProfilePage === "certification") renderSubpage("certification");
    return;
  }
  if (event.key === window.DispatchStore.STORAGE_KEY) syncFromStore();
});

window.addEventListener("message", (event) => {
  const message = event.data;
  if (!message || !["dispatch-sync-data", "driver-expense-sync-data"].includes(message.type)) return;
  let changed = false;
  if (Array.isArray(message.dispatches)) {
    state.dispatches = mergeDefaultExamples(message.dispatches, state.dispatches);
    window.DispatchStore.save(state.dispatches);
    changed = true;
  }
  if (Array.isArray(message.expenses)) {
    state.expenses = message.expenses;
    saveExpenses(state.expenses);
    changed = true;
  }
  if (changed) renderAll();
});

window.addEventListener("transport-node-notification-created", () => {
  if (document.querySelector("#messagesView").classList.contains("active")) renderDriverMessages();
  renderProfile();
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") syncFromStore();
});

applyFontSize(state.fontSize, false);
renderAll();
switchView("tasks");
if (window.opener && !window.opener.closed) {
  window.opener.postMessage({ type: "dispatch-sync-request", expenses: state.expenses }, "*");
}

// PDF download keeps the original filename and uses the persisted source file.
document.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-download-credential]');
  if (!button) return;
  event.preventDefault();
  const blob = await window.DispatchStore.getPhoto(button.dataset.credentialId).catch(() => null);
  if (!blob) { showToast('附件无法读取，请重新上传'); return; }
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = button.dataset.credentialName || '证件附件.pdf';
  document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60000);
});

document.addEventListener("click",event=>{if(event.target.closest("[data-feedback-cancel]"))closeProfileSubpage();});
document.addEventListener("jika-empty-action",()=>{renderTasks();renderOrders();});

document.addEventListener("jika-feedback-view",e=>{elements.subpageTitle.textContent=e.detail.view==="detail"?"反馈详情":"反馈记录";});
