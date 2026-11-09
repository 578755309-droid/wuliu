/* Shared mobile list/card route display. Detail pages keep their existing layout. */
(function () {
  const escape = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  function distanceText(value) {
    if (value == null || String(value).trim() === "") return "";
    const match = String(value).trim().match(/^(\d+(?:\.\d+)?)\s*(?:km|公里|千米)?$/i);
    return match ? `${match[1]} 公里` : "";
  }
  function render(locations, options = {}) {
    if (!Array.isArray(locations) || !locations.length) return "";
    const total = distanceText(options.mileage);
    const arrow = '<svg viewBox="0 0 32 12" aria-hidden="true"><circle cx="2" cy="6" r="1.4"/><circle cx="8" cy="6" r="1.4"/><path d="M12 6h10m-4-3 4 3-4 3"/><circle cx="27" cy="6" r="1.4"/><circle cx="31" cy="6" r="1"/></svg>';
    return `<div class="mobile-address-route" data-stops="${locations.length}" aria-label="作业路线">${locations.map((location, index) => {
      const stop = `<div class="mobile-address-stop"><span>${escape(location.name)}</span><strong>${escape(location.address || "待补充")}</strong></div>`;
      if (index === locations.length - 1) return stop;
      const segment = distanceText(options.segmentMileages?.[index]);
      const distance = segment || (index === 0 && total ? `${locations.length > 2 ? "全程 " : ""}${total}` : "");
      return `${stop}<div class="mobile-address-link">${distance ? `<span class="mobile-address-distance">${escape(distance)}</span>` : ""}${arrow}</div>`;
    }).join("")}</div>`;
  }
  window.MobileRouteDisplay = { render, distanceText };
})();
