import{A as b,B as d,_ as x,C as _,E as w,G as g,O as y,J as k,o as u,c as h,K as p,n as z,d as v,t as S,q as B,M as $,I as A,L as M,w as l,Z as O,aa as N,b as o,a,F as U,e as V,h as D,j as I}from"./Cu8u9gU9.js";const E={wrapper:"relative inline-flex items-center justify-center flex-shrink-0",base:"absolute rounded-full ring-1 ring-white dark:ring-gray-900 flex items-center justify-center text-white dark:text-gray-900 font-medium whitespace-nowrap",background:"bg-{color}-500 dark:bg-{color}-400",position:{"top-right":"top-0 right-0","bottom-right":"bottom-0 right-0","top-left":"top-0 left-0","bottom-left":"bottom-0 left-0"},translate:{"top-right":"-translate-y-1/2 translate-x-1/2 transform","bottom-right":"translate-y-1/2 translate-x-1/2 transform","top-left":"-translate-y-1/2 -translate-x-1/2 transform","bottom-left":"translate-y-1/2 -translate-x-1/2 transform"},size:{"3xs":"h-[4px] min-w-[4px] text-[4px] p-px","2xs":"h-[5px] min-w-[5px] text-[5px] p-px",xs:"h-1.5 min-w-[0.375rem] text-[6px] p-px",sm:"h-2 min-w-[0.5rem] text-[7px] p-0.5",md:"h-2.5 min-w-[0.625rem] text-[8px] p-0.5",lg:"h-3 min-w-[0.75rem] text-[10px] p-0.5",xl:"h-3.5 min-w-[0.875rem] text-[11px] p-1","2xl":"h-4 min-w-[1rem] text-[12px] p-1","3xl":"h-5 min-w-[1.25rem] text-[14px] p-1"},default:{size:"sm",color:"primary",position:"top-right",inset:!1}},F={base:"mx-auto",padding:"px-4 sm:px-6 lg:px-8",constrained:"max-w-7xl"},n=b(d.ui.strategy,d.ui.chip,E),J=_({inheritAttrs:!1,props:{size:{type:String,default:()=>n.default.size,validator(t){return Object.keys(n.size).includes(t)}},color:{type:String,default:()=>n.default.color,validator(t){return["gray",...d.ui.colors].includes(t)}},position:{type:String,default:()=>n.default.position,validator(t){return Object.keys(n.position).includes(t)}},text:{type:[String,Number],default:null},inset:{type:Boolean,default:()=>n.default.inset},show:{type:Boolean,default:!0},class:{type:[String,Object,Array],default:()=>""},ui:{type:Object,default:()=>({})}},setup(t){const{ui:e,attrs:r}=w("chip",g(t,"ui"),n,g(t,"class")),s=y(()=>k(e.value.base,e.value.size[t.size],e.value.position[t.position],t.inset?null:e.value.translate[t.position],e.value.background.replaceAll("{color}",t.color)));return{ui:e,attrs:r,chipClass:s}}});function L(t,e,r,s,i,m){return u(),h("div",$({class:t.ui.wrapper},t.attrs),[p(t.$slots,"default"),t.show?(u(),h("span",{key:0,class:z(t.chipClass)},[p(t.$slots,"content",{},()=>[v(S(t.text),1)])],2)):B("",!0)],16)}const P=x(J,[["render",L]]),q=b(d.ui.strategy,d.ui.container,F),G=_({inheritAttrs:!1,props:{as:{type:String,default:"div"},class:{type:[String,Object,Array],default:()=>""},ui:{type:Object,default:()=>({})}},setup(t){const{ui:e,attrs:r}=w("container",g(t,"ui"),q),s=y(()=>A(k(e.value.base,e.value.padding,e.value.constrained),t.class));return{ui:e,attrs:r,containerClass:s}}});function K(t,e,r,s,i,m){return u(),M(O(t.as),$({class:t.containerClass},t.attrs),{default:l(()=>[p(t.$slots,"default")]),_:3},16,["class"])}const R=x(G,[["render",K]]),T=()=>N("color-mode").value,Z={class:"dark:bg-black/70 bg-white/50 border border-gray-100 dark:border-gray-900 hover:dark:border-gray-600 hover:border-gray-300 transition ease-in-out duration-500 m-4 rounded-lg backdrop-blur-lg awesome-shadow dark:shadow-lg h-fit"},H={class:"flex justify-between p-4"},Q={class:"text-3xl font-bold"},W={class:"righteous dark:text-white text-black/70 ml-2 mt-1"},X={class:"text-3xl"},Y={class:"fixed bottom-0 w-fit m-1 z-10 dark:bg-black/70 bg-white/50 border border-gray-100 dark:border-gray-900 hover:dark:border-gray-600 hover:border-gray-300 transition ease-in-out duration-500 rounded-full flex justify-center content-center p-1"},tt={class:"w-full h-full pt-1"},ot={__name:"default",setup(t){const e=T();function r(){e.preference=e.preference==="dark"?"light":"dark"}return(s,i)=>{const m=P,c=V,C=D,j=R,f=I;return u(),h(U,null,[o(j,{as:"div",class:"min-h-screen overflow-hidden"},{default:l(()=>[i[1]||(i[1]=a("div",{class:"relative lg:block"},[a("div",{class:"blur-blob absolute top-20 left-20 md:top-20 md:left-16 lg:top-20 lg:left-16 bg-teal-200 dark:bg-teal-500 w-60 h-60 md:w-40 md:h-40 sm:w-40 sm:h-40 lg:w-96 lg:h-96"}),a("div",{class:"blur-blob absolute top-96 left-16 md:top-20 md:left-2/3 lg:top-20 lg:left-2/3 bg-rose-200 dark:bg-rose-800 w-60 h-60 md:w-40 md:h-40 sm:w-40 sm:h-40 lg:w-96 lg:h-96"})],-1)),a("header",Z,[a("div",H,[a("div",Q,[o(c,{to:"/"},{default:l(()=>[a("h1",W,[o(m,{text:"beta",size:"2xl"},{default:l(()=>i[0]||(i[0]=[v("MagicPing")])),_:1})])]),_:1})]),a("div",X,[o(C,{icon:s.$colorMode.value==="dark"?"i-heroicons-moon":"i-heroicons-sun",size:"xl",color:"white",variant:"link",onClick:r},null,8,["icon"])])])]),p(s.$slots,"default")]),_:3}),a("footer",Y,[a("div",tt,[o(c,{to:"https://github.com/floki1250",target:"_blank"},{default:l(()=>[o(f,{name:"i-line-md-github-loop",class:"w-5 h-5 m-1"})]),_:1}),o(c,{to:"https://twitter.com/Adem1250_Dr",target:"_blank"},{default:l(()=>[o(f,{name:"i-line-md-twitter-x-alt",class:"w-5 h-5 m-1"})]),_:1}),o(c,{to:"https://adamdar.vercel.app/",target:"_blank"},{default:l(()=>[o(f,{name:"i-line-md-star",class:"w-5 h-5 m-1"})]),_:1})])])],64)}}};export{ot as default};
