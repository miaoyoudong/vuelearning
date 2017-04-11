<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUser">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="users" highlight-current-row v-loading="loading" style="width: 100%;">
			<el-table-column type="expand">
			      <template scope="props">
			        <el-form label-position="left" inline class="table-expand">
			          <el-form-item label="姓名">
			            <span>{{ props.row.name }}</span>
			          </el-form-item>
			          <el-form-item label="性别">
			            <span>{{ props.row.sex }}</span>
			          </el-form-item>
			          <el-form-item label="年龄">
			            <span>{{ props.row.age }}</span>
			          </el-form-item>
			          <el-form-item label="生日">
			            <span>{{ props.row.birth }}</span>
			          </el-form-item>
			          <el-form-item label="地址">
			            <span>{{ props.row.addr }}</span>
			          </el-form-item>
			        </el-form>
			      </template>
			    </el-table-column>
				<el-table-column type="index" width="60">
				</el-table-column>
				<el-table-column prop="name" label="姓名" width="120" sortable>
				</el-table-column>
				<el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>
				</el-table-column>
				<el-table-column prop="age" label="年龄" width="100" sortable>
				</el-table-column>
				<el-table-column prop="birth" label="生日" width="120" sortable>
				</el-table-column>
				<el-table-column prop="addr" label="地址" min-width="180" sortable>
				</el-table-column>
			</el-table>
		</template>

	</section>
</template>
<script>
	import { getUserList } from '../../api/api';
	import NProgress from 'nprogress'
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				loading: false,
				users: [
				]
			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			//获取用户列表
			getUser: function () {
				let para = {
					name: this.filters.name
				};
				this.loading = true;
				NProgress.start();
				getUserList(para).then((res) => {
					this.users = res.data.users;
					this.loading = false;
					NProgress.done();
				});
			},
			handleCurrentChange:function(){
				this.$router.push({ path: '/chooseChannel'});
			}
		},
		mounted() {
			this.getUser();
		}
	};

</script>

<style scoped>
  .table-expand {
    font-size: 0;
  }
  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>