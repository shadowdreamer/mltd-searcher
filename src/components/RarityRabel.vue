<template>
    <span :class="['rarity-label',`rarity-label-${_rarity}`]">{{_rarity}}</span>
</template>
<script>
export default {
    computed:{
        _rarity(){
            return ['','N','R','SR','SSR'][this.rarity]
        }
    },
    props:{
        rarity:{
            type:Number,
            default:1
        },
    }
}
</script>
<style>
   .rarity-label{
       display: inline-block;
       height: 14px;
       font-size: 12px;
        border-radius: 2px;
        color: #fff;
        width: 36px;
        text-align: center;
        margin: 0 6px 0 0;
        text-shadow:.5px 0.5px 1px #000
   } 
   .rarity-label-SSR{
       background: linear-gradient(135deg,
         rgb(255, 224, 157),rgb(243, 94, 243),rgb(0, 140, 255),rgb(219, 247, 61));
   }
   .rarity-label-SR{
       background: linear-gradient(135deg,
         rgb(245, 242, 50),rgb(231, 211, 54),rgb(240, 240, 35),rgb(253, 239, 37));
   }
   .rarity-label-R{
       background: linear-gradient(135deg,
         rgb(107, 107, 107),rgb(68, 68, 68));
   }
   .rarity-label-N{
       background: linear-gradient(135deg,
         rgb(170, 170, 170),rgb(121, 120, 120));
   }
</style>
