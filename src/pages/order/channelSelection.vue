<template>
    <el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
        <el-form-item label="宽带型号">
            <el-select v-model="form.region" placeholder="请选择宽带">
                <el-option label="移动" value="移动"></el-option>
                <el-option label="联通" value="联通"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="宽带波段">
            <el-select v-model="form.date1" placeholder="请选择宽带波段">
                <el-option label="ss" value="ss"></el-option>
                <el-option label="is" value="is"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="带宽" placeholder="请选择带宽">
            <el-input-number v-model="form.contentSize" :step="1" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="传输内容">
            <el-select v-model="form.date2" placeholder="请选择传输内容">
                <el-option label="体育" value="体育"></el-option>
                <el-option label="新闻" value="新闻"></el-option>
            </el-select>        
        </el-form-item>
        <el-form-item label="活动时间">
            <el-row>
            <el-col :span="4">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;" :picker-options="pickerOptions0"></el-date-picker>
            </el-col>
            <el-col class="line" :span="1">&nbsp;-</el-col>
            <el-col :span="4">
                  <el-time-select v-model="form.time1" :picker-options="{start: '00:00',
                    step: '00:05',
                    end: '23:59'
                      }"  placeholder="选择起始时间" ></el-time-select>
            </el-col>
            </el-row>
            <el-row>
            <el-col :span="4">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;" :picker-options="pickerOptions1" @change="changeEvent"></el-date-picker>
            </el-col>
            <el-col class="line" :span="1">&nbsp;-</el-col>
            <el-col :span="4">
                  <el-time-select v-model="form.time2" :picker-options="{start: form.time1,
                    step: '00:05',
                    end: '23:59'
                      }"  placeholder="选择终止时间" ></el-time-select>
            </el-col>
            </el-row>
            <el-row>
                <el-button type="primary" native-type="submit"  @click.native="onSubmit" >提交</el-button>
            </el-row>
        </el-form-item>
    </el-form>
</template>

<script>

  	import { mapGetters } from 'vuex'
  	import { mapActions } from 'vuex'
    // import {
    //   increment,
    //   decrement,
    //   orderInfo
    // } from '../../vuex/actions';
    //console.log(orderInfo);
    //import * as getters from '../../vuex/getters';
    export default {
        data() {
            return {
                form: {
                    canSubmit: false,
                    value1: '',
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    time1: '',
                    time2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                    value1:'',
                    value2:'',
                    contentSize:5
                },
                pickerOptions0: {
                  disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                  }
                },
                pickerOptions1: {
                  disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                  }
                }
            }
        },
        methods: {
            onSubmit() {
            	this.orderInfo("this.form");
                this.$router.push({ path: '/chooseChannel'});
            },
            changeEvent(a){
              if(this.form.date1 && this.form.time1){
                if(this.form.date1.getTime() > this.form.date2.getTime()){
                    this.$message.error('开始日期大于结束日期');
                }else if(this.form.date1.getTime() == this.form.date2.getTime() && this.form.time1>this.form.time2){
                    this.$message.error('开始时间大于结束时间');
                }
              }else{
                  this.$message.error('请先选择起始时间');
                  this.$emit('pick', this.form.date1);
              }
              

            },
            ...mapActions([
      			'orderInfo','increment'
    		])
        },
        watch:{
              form: {
                handler: function (val,oldVal) {
                    console.log(JSON.stringify(val));
                },
                deep: true // 深度监控，可以观察到ruleForm内任意属性的变化
              }
        }
    }

</script>


<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>