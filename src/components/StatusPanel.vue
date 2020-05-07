<template>
  <div>
    <div style="height:140px" ref="myChart"></div>
  </div>
</template>

<script> 
const echarts = require('echarts/lib/echarts');
require("echarts/lib/component/legend");
require("echarts/lib/chart/pie");
export default { 
  props:{
    data:Array
  },
  data: () => ({
      colors:['#8fd9fd','#ff9933','#ff7266'],
  }),
  mounted(){
    const chart = echarts.init(this.$refs.myChart)
    chart.setOption({
      color:['#8fd9fd','#ff9933','#ff7266'],
      legend: {
					orient: 'vertical',
					x: '50%',
					y: '15%',
					itemWidth: 15,
					itemHeight: 15,
          formatter:name=>{
            let v = this.data.filter(el=>el.name === name)[0]
            return `${name}:${v && v.value}`
          }
			},
      series: [
					{
						type: 'pie',
						radius: ['50%', '75%'],
						center: ['25%', '45%'],
						label: {
							normal: {
								show: false, 
							}, 
						}, 
            data:this.data
					}
				]
    });
  }
  
}
</script>