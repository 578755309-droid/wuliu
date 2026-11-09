/* Feedback form/list/detail shared by driver and dispatch clients. */
(() => {
 const esc=window.JikaEmptyStates.escape, urls=new Set();
 function status(item){return item.publicReply?{label:"已回复",className:"resolved"}:(window.FeedbackManager.STATUS_META[item.status]||window.FeedbackManager.STATUS_META.pending);}
 function listItems(records){return records.length?records.map(item=>{const s=status(item);return '<article class="feedback-history-card" data-feedback-status="'+(item.publicReply?"replied":esc(item.status))+'"><header><span><strong>'+esc(item.categoryLabel)+'</strong></span><em class="feedback-status '+esc(s.className)+'">'+s.label+'</em></header><p>'+esc(item.description)+'</p><div class="feedback-history-meta"><span>'+esc(item.moduleLabel||item.relatedLabel||"未关联模块")+'</span><span>'+esc(item.businessId||"")+'</span></div><small>'+esc(item.id)+' · '+esc(item.createdAt)+'</small>'+(item.publicReply?'<div class="feedback-history-reply"><strong>平台回复</strong><span>'+esc(item.publicReply)+'</span></div>':'')+'<button class="feedback-detail-link" type="button" data-feedback-detail="'+esc(item.id)+'">查看详情</button></article>';}).join(""):window.JikaEmptyStates.render("empty-feedback");}
 function list(records,source,id){return '<section class="feedback-history-panel" data-feedback-source="'+esc(source)+'" data-feedback-user="'+esc(id)+'"><div class="feedback-list-filters">'+[["all","全部"],["pending","待处理"],["processing","处理中"],["replied","已回复"]].map(([k,v])=>'<button type="button" data-feedback-status-filter="'+k+'" aria-pressed="'+(k==="all")+'">'+v+'</button>').join("")+'</div><div class="feedback-history-list">'+listItems(records)+'</div></section>';}
 function field(label,control){return '<label class="feedback-field"><span>'+label+'</span>'+control+'</label>';}
 function form({source,phone,categories,related=[]}){
 const manager=source==="manager",count=manager?"data-manager-feedback-count":"data-feedback-count",files=manager?"data-manager-feedback-files":"data-feedback-files";
 const modules=[["workbench","工作台"],["dispatch","任务派单"],["vehicle","车辆信息"],["driver","司机档案"],["route","固定线路"],["customer","客户管理"],["reports","报表与消息"],["profile","个人信息"]];
 return '<form id="'+(manager?"managerFeedbackForm":"driverFeedbackForm")+'" class="feedback-form-card"><section class="profile-page-intro"><span><img src="icons/profile/feedback.svg" alt=""></span><div><strong>意见反馈</strong><small>请描述问题或建议，我们将持续跟进处理</small></div></section><section class="feedback-section"><h3>反馈内容</h3>'+
 field('问题类型 <b class="required-star">*</b>','<select name="categoryCode" required><option value="">请选择问题类型</option>'+categories.map(c=>'<option value="'+esc(c.code)+'">'+esc(c.label)+'</option>').join("")+'</select>')+
 field('相关功能模块 <em>选填</em>','<select name="'+(manager?"relatedId":"moduleId")+'"><option value="">不关联模块</option>'+modules.map(([k,v])=>'<option value="'+k+'">'+v+'</option>').join("")+'</select>')+
 field('业务编号 <em>选填</em>','<input name="businessId" maxlength="60" placeholder="例如运单号、派单号或车辆编号">')+
 (!manager?field('关联运单 <em>选填</em>','<select name="relatedId"><option value="">不关联运单</option>'+related.map(d=>'<option value="'+esc(d.id)+'" data-related-label="'+esc(d.waybillNo+' · '+d.routeName)+'">'+esc(d.waybillNo+' · '+d.routeName)+'</option>').join("")+'</select>'):"")+
 field('问题描述 <b class="required-star">*</b><em '+count+'>0/1000</em>','<textarea name="description" minlength="10" maxlength="1000" rows="5" required placeholder="请描述发生了什么、期望如何改进，至少填写10个字"></textarea>')+'</section><section class="feedback-section"><h3>添加附件（选填）</h3><div class="feedback-field"><label class="feedback-upload"><input name="attachments" type="file" accept="image/*,video/mp4,video/quicktime,application/pdf" multiple><span class="feedback-upload-icon"><i data-lucide="image-plus"></i></span><span><strong>上传截图、视频或PDF</strong><small>最多9个附件；图片/PDF≤10MB，视频≤100MB</small></span></label><small '+files+'>尚未选择附件</small></div></section><section class="feedback-section"><h3>联系方式</h3>'+field('联系电话 <em>选填</em>','<input name="contactPhone" inputmode="tel" maxlength="11" value="'+esc(phone)+'" placeholder="请输入手机号（选填）">')+'</section><footer class="feedback-form-actions"><button class="subpage-secondary" type="button" data-feedback-cancel>取消</button><button class="feedback-submit-button" type="submit">提交反馈</button></footer></form>';
 }
 function detail(item){
 const s=status(item), row=(label,value)=>'<div class="feedback-detail-row"><span>'+label+'</span><strong>'+esc(value||"未填写")+'</strong></div>';
 return '<section class="feedback-section"><h3>反馈信息 <em class="feedback-status '+s.className+'">'+s.label+'</em></h3>'+row("反馈编号",item.id)+row("问题类型",item.categoryLabel)+row("相关功能模块",item.moduleLabel||item.relatedLabel)+row("业务编号",item.businessId||(item.relatedType==="business"?item.relatedId:""))+row("提交时间",item.createdAt)+row("联系电话",item.contactPhone)+'</section><section class="feedback-section"><h3>问题描述</h3><p class="feedback-detail-description">'+esc(item.description)+'</p></section><section class="feedback-section"><h3>附件</h3><div class="feedback-detail-media">'+(item.attachments.length?'正在加载附件…':window.JikaEmptyStates.render("empty-attachments",{layout:"compact"}))+'</div></section>'+(item.publicReply?'<section class="feedback-section"><h3>平台回复</h3><p class="feedback-detail-description">'+esc(item.publicReply)+'</p><small>'+esc([...item.history].reverse().find(h=>h.action==="reply")?.createdAt||item.updatedAt)+'</small></section>':'')+'<button class="subpage-secondary" type="button" data-feedback-back>返回反馈记录</button>';
 }
 function records(panel){return window.FeedbackManager.bySubmitter(panel.dataset.feedbackSource,panel.dataset.feedbackUser);}
 function revoke(){for(const url of urls)URL.revokeObjectURL(url);urls.clear();}
 document.addEventListener("click",async event=>{
  const panel=event.target.closest(".feedback-history-panel"),button=event.target.closest("[data-feedback-detail],[data-feedback-back],[data-feedback-status-filter]");
  if(!panel||!button)return;
  if(button.hasAttribute("data-feedback-back")){revoke();panel.outerHTML=list(records(panel),panel.dataset.feedbackSource,panel.dataset.feedbackUser);document.dispatchEvent(new CustomEvent("jika-feedback-view",{detail:{view:"history"}}));return;}
  if(button.hasAttribute("data-feedback-status-filter")){
   panel.querySelectorAll("[data-feedback-status-filter]").forEach(b=>b.setAttribute("aria-pressed",String(b===button)));
   const key=button.dataset.feedbackStatusFilter,items=records(panel).filter(i=>key==="all"||(key==="replied"?!!i.publicReply:!i.publicReply&&i.status===key));
   panel.querySelector(".feedback-history-list").innerHTML=listItems(items);return;
  }
  const item=records(panel).find(i=>i.id===button.dataset.feedbackDetail);if(!item)return;
  revoke();panel.innerHTML=detail(item);document.dispatchEvent(new CustomEvent("jika-feedback-view",{detail:{view:"detail"}}));const media=panel.querySelector(".feedback-detail-media");
  if(!item.attachments.length)return;
  const parts=await Promise.all(item.attachments.map(async file=>{
   const blob=await window.FeedbackManager.getAttachment(file.id).catch(()=>null);if(!blob)return '<p>附件暂不可用：'+esc(file.name)+'</p>';
   const url=URL.createObjectURL(blob);urls.add(url);
   return file.type.startsWith("image/")?'<a href="'+url+'" target="_blank" rel="noopener"><img src="'+url+'" alt="'+esc(file.name)+'"></a>':file.type.startsWith("video/")?'<video src="'+url+'" controls playsinline></video>':'<a href="'+url+'" target="_blank" rel="noopener">'+esc(file.name)+'</a>';
  }));
  if(media.isConnected)media.innerHTML=parts.join("");
 });
 window.addEventListener("beforeunload",revoke);
 window.MobileFeedbackUI={status,list,form,detail};
})();

