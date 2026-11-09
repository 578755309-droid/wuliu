/* Shared empty-state renderer; controls remain accessible real UI. */
(function (root) {
"use strict";
const catalog=[{"key":"empty-tasks","title":"暂无任务","description":"当前暂无相关任务，稍后再来看看"},{"key":"empty-search","title":"未找到相关结果","description":"试试调整关键词或筛选条件"},{"key":"empty-messages","title":"暂无消息","description":"任务动态与通知会在这里展示"},{"key":"empty-records","title":"暂无记录","description":"新增后可在这里查看"},{"key":"empty-archives","title":"暂无档案","description":"添加档案后即可在这里查看和管理"},{"key":"empty-reports","title":"暂无数据","description":"当前统计范围内暂无数据"},{"key":"empty-attachments","title":"暂无附件","description":"当前记录尚未添加附件"},{"key":"empty-feedback","title":"暂无反馈记录","description":"提交问题或建议后，可在这里查看回复"},{"key":"error-network","title":"网络连接异常","description":"请检查网络连接后重试"},{"key":"error-loading","title":"加载失败","description":"内容暂时未能加载，请重试"},{"key":"error-permission","title":"暂无访问权限","description":"请联系系统管理员确认访问权限"},{"key":"error-not-found","title":"页面不存在或已失效","description":"请返回后重新进入"},{"key":"empty-vehicles","title":"暂无车辆","description":"添加车辆后，可在这里查看和管理"},{"key":"empty-waybills","title":"暂无运单","description":"创建运单后，可在这里查看运输进度"},{"key":"empty-fixed-routes","title":"暂无固定线路","description":"添加常用线路，便于后续快速派单"},{"key":"empty-drivers","title":"暂无司机","description":"添加司机后，可在这里查看和管理"},{"key":"empty-customers","title":"暂无客户","description":"添加客户后，可在这里维护客户资料"}];
const states=Object.fromEntries(catalog.map(item=>[item.key,item]));
const base=typeof document!=="undefined"&&document.currentScript?new URL("assets/empty-states/",document.currentScript.src).href:"assets/empty-states/";
const escape=value=>String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function render(key,options={}){
 const state=states[key]||states["empty-records"], layout=["page","table","compact"].includes(options.layout)?options.layout:"page";
 const target=options.target, node=target&&typeof document!=="undefined"?document.querySelector(target):null;
 const allowed=!target||(node&&!node.disabled&&!node.hidden);
 const action=options.action&&allowed?'<button type="button" class="card-button primary jika-empty-action" data-empty-action="'+escape(options.action)+'"'+(target?' data-empty-target="'+escape(target)+'"':'')+'>'+escape(options.actionLabel||"重新加载")+'</button>':"";
 return '<div class="jika-empty jika-empty--'+layout+'" data-empty-state="'+escape(state.key)+'" role="status"><img class="jika-empty-art" src="'+base+escape(state.key)+'.png" alt="" width="180" height="180" loading="lazy" decoding="async"><strong class="jika-empty-title">'+escape(options.title||state.title)+'</strong><p class="jika-empty-description">'+escape(options.description||state.description)+'</p>'+action+'</div>';
}
function table(key,colspan,options={}){return '<tr><td class="jika-empty-cell" colspan="'+Math.max(1,Math.floor(Number(colspan)||1))+'">'+render(key,{...options,layout:"table"})+'</td></tr>';}
function forList(key,total,options={}){return render(Number(total)>0?"empty-search":key,options);}
root.JikaEmptyStates={catalog,states,render,table,forList,escape};
if(typeof module!=="undefined"&&module.exports)module.exports=root.JikaEmptyStates;
if(typeof document!=="undefined")document.addEventListener("click",event=>{
 const b=event.target.closest?.("[data-empty-action]");if(!b)return;
 const target=b.dataset.emptyTarget&&document.querySelector(b.dataset.emptyTarget);
 if(target&&!target.disabled&&!target.hidden){target.click();return;}
 document.dispatchEvent(new CustomEvent("jika-empty-action",{detail:{action:b.dataset.emptyAction,key:b.closest("[data-empty-state]").dataset.emptyState}}));
});
})(typeof window==="undefined"?globalThis:window);

