// projects
function addProject(){
 let p=JSON.parse(localStorage.getItem('p'))||[];
 p.push({title:title.value,desc:desc.value});
 localStorage.setItem('p',JSON.stringify(p));
}

// render
(function(){
 let el=document.getElementById('projects');
 if(!el)return;
 let p=JSON.parse(localStorage.getItem('p'))||[];
 p.forEach((v,i)=>{
   el.innerHTML+=`<div onclick="go(${i})">${v.title}</div>`;
 });
})();

function go(i){
 location.href='project.html?id='+i;
}

// detail
(function(){
 let el=document.getElementById('detail');
 if(!el)return;
 let id=new URLSearchParams(location.search).get('id');
 let p=JSON.parse(localStorage.getItem('p'))||[];
 if(p[id]) el.innerHTML=`<h1>${p[id].title}</h1><p>${p[id].desc}</p>`;
})();

// photo
function addPhoto(){
 let ph=JSON.parse(localStorage.getItem('ph'))||[];
 let r=new FileReader();
 r.onload=function(){
   ph.push({img:r.result,tag:tag.value});
   localStorage.setItem('ph',JSON.stringify(ph));
 };
 r.readAsDataURL(photoInput.files[0]);
}

function renderPhotos(tag='all'){
 let el=document.getElementById('gallery');
 if(!el)return;
 el.innerHTML='';
 let ph=JSON.parse(localStorage.getItem('ph'))||[];
 ph.forEach(v=>{
   if(tag==='all'||v.tag===tag)
     el.innerHTML+=`<img loading="lazy" src="${v.img}">`;
 });
}

function filterPhotos(){
 renderPhotos(document.getElementById('filter').value);
}

renderPhotos();
