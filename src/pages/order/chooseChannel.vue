<template>
<div class="root">
	<div id="example03" @dragenter="handleDragEnter" @dragover="handleDragOver">
		<el-row v-for="(value, x) in rect">
			<el-col :span="2" class="timeCol">{{value.time}}:</el-col>
			<el-col :span="2" class= "rectCol" v-for="(val, y) in value.data">
				<div  :class="'cell '+styleclass[val]" :x="x" :y="y"></div>
			</el-col>
		</el-row>
	</div>
	<div class="cadidateArea">
		<div class="cadidatetext">待选带宽</div>
		<div @dragstart.stop="handleDragStart" @dragend.stop="handleDragEnd" draggable="true" class="candidateBlock" :style="'height:'+rect.length*20+'px;width:'+postSize*80+'px'">
		</div>
	</div>
	<div class="cadidateSelectionPosition" :style="'pointer-events:none;width:'+candidateLayout.width+'px;height:'+candidateLayout.height+'px;top:'+candidateLayout.top+'px;left:'+candidateLayout.left+'px;display:'+candidateLayout.display">{{getOrderInfo}}</div>
</div>
</template>

<script>
  	import { mapGetters } from 'vuex'
  	import { mapActions } from 'vuex'
	export default {
		data() {
			return {
				rect:[
					{"time":"15:00","data":[0,1,0,0,0,0,0,0,0,0,1,0]},
					{"time":"15:05","data":[0,1,0,0,0,0,0,0,0,0,1,0]},
					{"time":"15:10","data":[0,1,0,0,1,0,0,0,0,0,1,0]},
					{"time":"15:15","data":[0,1,0,0,0,0,0,0,0,0,1,0]},
					{"time":"15:20","data":[0,1,0,0,0,1,0,0,0,0,1,0]},
					{"time":"15:25","data":[0,1,0,0,0,0,0,0,0,0,1,0]},
					{"time":"15:30","data":[0,1,0,0,1,0,0,0,0,0,1,0]},
					{"time":"15:35","data":[0,1,0,0,0,0,0,0,0,0,1,0]},
					{"time":"15:40","data":[0,1,0,0,0,0,0,0,0,0,1,0]},
					{"time":"15:45","data":[0,1,0,0,0,0,0,0,0,0,1,0]},
					{"time":"15:50","data":[0,1,0,1,0,0,0,0,0,0,1,0]},
					{"time":"15:55","data":[0,1,0,0,0,0,0,0,0,0,1,0]},
					{"time":"16:00","data":[0,1,0,0,0,0,0,0,0,0,1,0]}
				],
				postSize:2,
				selectedPosition:{
					startIndex:-1
				},
				startIndex:{
					x:-1,
					y:-1,
				},
				styleclass:["empty", "full", "ef"],
				width:80,
				height:20,
				candidateLayout:{
					top:0,
					left:0,
					width:0,
					height:0,
					display:"none"
				},
				canUpdatePosition:true
			}
		},
		methods: {
			__canPut(target){
				let x = parseInt(target.getAttribute("x"));
				let y = parseInt(target.getAttribute("y"));
				if(this.startIndex.x>-1 && this.startIndex.y>-1 && x>-1 && y>-1){
					let startX = x - this.startIndex.x;
					let startY = y - this.startIndex.y;
					var can = true;
					for(let i = 0;i<this.rect.length;i++){
						if(!can){
							break;
						}
						for(let j = startY;j<startY+this.postSize;j++){
							if(!this.rect[i] || this.rect[i].data[j]===undefined ||this.rect[i].data[j]===1){
								can = false;
								break;
							}
						}
					}
					if(can){
						return true;
					}
				}
				return false;
			},
			__putCandidateOnRect(y,target){
				this.canUpdatePosition = false;
				this.candidateLayout = {
					top:0,
					left:target.offsetLeft-this.startIndex.y*this.width,
					width:this.width*this.postSize-4,
					height:this.height*this.rect.length-4,
					display:"block"
				}
				
				// for(let i = 0;i<this.rect.length;i++){
				// 	let data= this.rect[i].data.slice(0, this.rect[i].data.length);
				// 	for(let j = y;j<y+this.postSize;j++){
				// 		data[j] = 2;
				// 	}
				// 	this.rect[i].data = data;
				// }
			},
			__resetRect(){
				this.canUpdatePosition = false;
				this.candidateLayout.display = "none";
				// for(let i = 0;i<this.rect.length;i++){
				// 	let data= this.rect[i].data.slice(0, this.rect[i].data.length);
				// 	for(let j = 0;j<data.length;j++){
				// 		if(this.rect[i].data[j] ===2){
				// 			data[j]=0;
				// 		}
				// 	}
				// 	this.rect[i].data = data;
				// }
			},
			__calculateStartIndex(e){
				let offsetXIndex = Math.floor(e.offsetY/this.height);
				let offsetYIndex = Math.floor(e.offsetX/this.width);
				this.startIndex.x = offsetXIndex;
				this.startIndex.y = offsetYIndex;
			},
			__highlightArea(y){
				this.$el;
			},
			handleDragStart(e){
				 this.vm = this;
				 this.startIndex.x = -1;
				 this.startIndex.y = -1;
				 this.__calculateStartIndex(e);
			},
			handleDragOver(e){
				if(this.selectedPosition.startIndex>0){
					e.preventDefault();
				}
			},
			handleDragEnter(e){
				if(!this.canUpdatePosition){
					return true;
				}
				e.preventDefault();
				let target = e.target;
				let x = parseInt(target.getAttribute("x"));
				let y = parseInt(target.getAttribute("y"));
				if(this.__canPut(target) && this.selectedPosition.startIndex!==y){
					this.selectedPosition.startIndex = y;
					console.log(this.selectedPosition.startIndex);
					this.__resetRect();
					this.__putCandidateOnRect(y,target);
					return true;
				}else if(!this.__canPut(target) && this.selectedPosition.startIndex !==-1){
					this.selectedPosition.startIndex = -1;
					this.__resetRect();
					console.log("x:"+x+",y:"+y+" x:"+this.startIndex.x+" ,y:"+this.startIndex.y);
					return false;
				}
			},
			handleDragEnd(e){
				if(this.selectedPosition.startIndex>0){
					console.log("successfully at: "+this.selectedPosition.startIndex );
				}
				//delete document.body.style.cursor;
			},

		},
		watch:{
		      
		},
        computed: {
		    ...mapGetters([
		      'getOrderInfo'
		    ])
        },
        ready() { 
            console.log("一切准备好了");
        },
		updated(){
			this.canUpdatePosition = true;

		},
		mounted(){

			console.log("mounted");
			//console.log(mapGetters("getOrderInfo"));
		},
		created(){
			console.log("created");
			//console.log(mapGetters("getOrderInfo"));
		}

	}

</script>


<style scoped>
  .root{
  	position: relative;
  }
  .el-row {
  	margin-bottom: 0px;
  }

  .cell{
  	height:20px;
  }
  .el-col{
  	width:80px;
  }
  .full{
  	background: orange;
  }
  .ef{
  	background: green;
  }
  .empty{
  	background: grey;
  }
  .candidateBlock{
  	display: inline-block;
  	background: rgba(255,165,0,0.5);
  	cursor: move;
  }
  .timeCol{
  	text-align: center;
  }
  .cadidatetext{
  	width:80px;
  	vertical-align: top;
  	display: inline-block;
  }
  .cadidateSelectionPosition{
  	position: absolute;
  	width:100px;
  	height:100px;
  	top:0px;
  	left:0px;
  	background: rgba(255,165,0,0.5);
  	border:2px dashed rgba(85,138,187,1);
  }
  .dragRow{
  	display: inline;
  }
  .cadidateArea{
  	display: table;
  	margin-top: 5px;
  	border-top: 2px solid grey;
  	padding-top: 5px;
  }

</style>