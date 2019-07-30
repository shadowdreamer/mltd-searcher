<template>
  <div>
    <ve-pie  
    height="160px"
    width="130px"
    :judge-width="true" 
    :data="{
        columns: ['type', 'val'],
        rows
      }" 
    :colors="colors" 
    :settings="chartSettings"
    :tooltip-visible="false"
    :legend-visible="false"
    ></ve-pie>
  </div>
  <!-- <ve-pie :data="chartData"></ve-pie> -->
</template>

<script>
import VePie from 'v-charts/lib/pie.common'
export default {
  components: { VePie },
  props:{
    rows:Array
  },
  data: () => ({
      colors:['#8fd9fd','#ff7266','#ff9933'],
      chartSettings:{
        hoverAnimation:false,
        labelLine:{
          show:false,
        },
        label:{
          show:false
        },
        radius: 65,
        offsetY: 90,
        offserX:50
      }
    })
}
</script>