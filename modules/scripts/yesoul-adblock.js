// Filter Yesoul (野小兽) splash ads and popup ads from /v4/sys/getBanners
const BLOCK_TYPES = new Set([4, 5, 13, 17, 18, 100, 301]);

let body = $response.body;
if (body) {
  try {
    const obj = JSON.parse(body);
    if (Array.isArray(obj.data)) {
      obj.data = obj.data.filter((item) => {
        if (!item || typeof item !== "object") return true;
        if (BLOCK_TYPES.has(item.type)) return false;
        const ec = item.expandConfig || {};
        if (ec.countdown > 0 || ec.popSetting > 0 || ec.popNumber > 0) return false;
        if (typeof item.name === "string" && item.name.includes("弹窗")) return false;
        return true;
      });
      body = JSON.stringify(obj);
    }
  } catch (e) {}
}
$done({ body });
