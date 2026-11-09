/* Shared local-image upload presentation. Submission and photo requirements stay in mobile.js. */
(() => {
 const camera='<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none"><path d="M5 9h4l2-3h8l2 3h4v14H5V9Z" fill="#CDD0D5"/><circle cx="15" cy="15" r="5" fill="#fff"/><circle cx="15" cy="15" r="3.4" fill="#CDD0D5"/><path d="M25 21v7m-3.5-3.5h7" stroke="#B9BEC7" stroke-width="1.8" stroke-linecap="round"/></svg>';
 const close='<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path d="m3 3 6 6m0-6-6 6" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>';
 const doc='<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M14 3H5v18h14V8l-5-5ZM14 3v6h5M8 13h8m-8 4h6" stroke="#9099a8" stroke-width="1.5"/></svg>';
 const urls=new Map();let receiptUrl='';
 const urlFor=file=>{if(!urls.has(file))urls.set(file,URL.createObjectURL(file));return urls.get(file);};
 function hydrateProgress(){document.querySelectorAll('.photo-requirement-group').forEach(group=>{
  const inputs=[...group.querySelectorAll('[data-photo-slot]')];const preview=group.querySelector('[data-selected-photo-previews]');if(!preview)return;
  preview.innerHTML=inputs.flatMap((input,index)=>input.files?.[0]?[`<div class="image-upload-preview"><img src="${urlFor(input.files[0])}" alt="已选择照片"/><button type="button" class="image-upload-remove" data-remove-progress-photo="${index}" aria-label="删除已选择照片">${close}</button></div>`]:[]).join('');
  const selected=inputs.filter(i=>i.files?.length).length;const picker=group.querySelector('.progress-single-picker');if(picker)picker.hidden=selected>=inputs.length;
  const count=group.querySelector('.photo-requirement-group-heading > span');if(count)count.textContent=`${Number(group.dataset.existingCount||0)+selected}/${group.dataset.required} 张`;
  group.querySelectorAll('[data-existing-progress-photo]').forEach(async tile=>{if(tile.dataset.loaded)return;tile.dataset.loaded='true';const blob=await window.DispatchStore.getPhoto(tile.dataset.existingProgressPhoto).catch(()=>null);if(blob&&tile.isConnected){const src=urlFor(blob);tile.innerHTML=`<img src="${src}" alt="已上传照片"/>`;}});
 });}
 document.addEventListener('change',event=>{
  const picker=event.target.closest('[data-progress-photo-picker]');if(picker){const group=picker.closest('.photo-requirement-group');const free=[...group.querySelectorAll('[data-photo-slot]')].filter(i=>!i.files?.length);const files=[...picker.files||[]];files.slice(0,free.length).forEach((file,j)=>{const transfer=new DataTransfer();transfer.items.add(file);free[j].files=transfer.files;});if(files.length>free.length)window.showToast?.(`本项还可上传 ${free.length} 张照片`);picker.value='';window.updateProgressPhotoCount?.();hydrateProgress();return;}
  const receipt=event.target.closest('#expenseForm input[name="receipt"]');if(receipt){const upload=receipt.closest('.expense-upload');const file=receipt.files?.[0];const preview=upload.querySelector('.expense-file-previews');const label=upload.querySelector('.image-upload-tile');const filename=upload.querySelector('.expense-upload-filename');if(receiptUrl){URL.revokeObjectURL(receiptUrl);receiptUrl='';}preview.replaceChildren();label.hidden=Boolean(file);filename.hidden=!file;if(file){receiptUrl=URL.createObjectURL(file);const visual=file.type.startsWith('image/')?`<img src="${receiptUrl}" alt="费用凭证预览"/>`:doc;preview.innerHTML=`<div class="image-upload-preview">${visual}<button type="button" class="image-upload-remove" data-remove-expense-proof aria-label="删除凭证">${close}</button></div>`;filename.textContent=file.name;upload.querySelector('small').textContent='支持图片、PDF，单个文件不超过 10MB';}}
 });
 document.addEventListener('click',event=>{
  const remove=event.target.closest('[data-remove-progress-photo]');if(remove){event.preventDefault();const group=remove.closest('.photo-requirement-group');const input=[...group.querySelectorAll('[data-photo-slot]')][Number(remove.dataset.removeProgressPhoto)];const file=input.files?.[0];if(file&&urls.has(file)){URL.revokeObjectURL(urls.get(file));urls.delete(file);}input.value='';window.updateProgressPhotoCount?.();hydrateProgress();return;}
  const proof=event.target.closest('[data-remove-expense-proof]');if(proof){event.preventDefault();const input=proof.closest('.expense-upload').querySelector('input[name="receipt"]');input.value='';input.dispatchEvent(new Event('change',{bubbles:true}));}
 });
 const dialog=document.querySelector('#progressDialog');dialog?.addEventListener('close',()=>{for(const url of urls.values())URL.revokeObjectURL(url);urls.clear();});
 window.DriverUploadUI={camera,hydrateProgress};
})();
