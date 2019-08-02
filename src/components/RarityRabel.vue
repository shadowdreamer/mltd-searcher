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
        margin: 0 6px 0 0
   } 
   .rarity-label-SSR{
       background: linear-gradient(135deg,
         rgb(255, 224, 157),rgb(243, 94, 243),rgb(74, 152, 216),rgb(219, 247, 61));
   }
   .rarity-label-SR{
       background: linear-gradient(135deg,
         rgb(249, 255, 200),rgb(76, 137, 243),rgb(253, 255, 108));
   }
</style>
