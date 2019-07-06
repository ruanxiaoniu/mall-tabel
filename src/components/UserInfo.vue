<template>
<div>
    <div id="operate">
        <el-select v-model="val3" placeholder="请选择搜索条件" >
            <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
        </el-select>
        <el-input
        placeholder="查询关键字"
        v-model="input"
        clearable>
        </el-input>
        <!-- <el-button type="primary" icon="el-icon-search">查询</el-button> -->
        <!-- <el-button type="danger" icon="el-icon-delete" style="margin-left:20%" @click="deleteSelection">删除</el-button> -->
    </div >
    <el-table
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      :row-class-name="tableRowClassName"
      stripe
      style="width:100%,fit:true"
      border
      height="600"
      @selection-change="handleSelectionChange"
      >
    <el-table-column
    type="selection"
    width="100">
    </el-table-column>
    <el-table-column
      prop="id"
      label="id"
      width="100" >
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="100" >
    </el-table-column>
    <el-table-column
      prop="nick"
      label="账号名"
      width="150">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="250" >
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="250" >
      	<template slot-scope="scope">
							<el-popover  placement="left" width="800" trigger="click">
								<el-table :data="tableData[scope.$index].addresses">
									<el-table-column width="400" prop="name" label="地址"></el-table-column>
									<el-table-column width="80" prop="receiveName" label="收货人"></el-table-column>
									<el-table-column width="150" prop="receivePhone" label="收货人号码"></el-table-column>
									<!-- <el-table-column width="80" prop="user" label="用户名"></el-table-column> -->
								</el-table>
								<el-button  slot="reference">查看</el-button>
							</el-popover>
							
					</template>
    </el-table-column>
    <!-- <el-table-column
    label="操作"
    width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.native.prevent="deleteUserInfo(scope.$index, tableData)">删除</el-button>
        </template>
    </el-table-column> -->
  </el-table>
  <!-- <el-pagination
    layout="prev, pager, next"
    @current-change="currentChange"
    :total="total">
  </el-pagination> -->
</div>
</template>
<script>
  export default {
    data() {
      return {
      tableData: [],
     options: [
     {value: "name", label: "姓名"},
     {value: "id", label: "id"},
     {value: "nick", label: "账号名"},
    ],
    total:0,//默认数据总数
    pagesize:9,//每页数据的条数
    currentPage:1,//默认开始的页数
    val3: "姓名",
    name: '',
    price: '',
    input:'',
    otableData:[],
    multipleSelection: [],
    // baseUrl:'http://localhost:3000'
    }
    },
    created() {
      let _this = this;
      
      _this.axios.get("/dataUser")
      .then(res => {
          _this.tableData = res.data.list;
          _this.otableData=_this.tableData
          var l=_this.tableData.length
          console.log(l)
          console.log(l%_this.pagesize)
          if(l<_this.pagesize){
         _this.total=10
        }
        else if((l%_this.pagesize)!=0){
            _this.total=(parseInt(l/_this.pagesize))*10+10
          }
          else{
            _this.total=(l/_this.pagesize)*10
          }
          // _this.total=_this.tableData.length
          console.log(res.log)
          console.log(_this.total)
      })
    },
    watch: {
      input:function(val,oldVal){
        console.log("val3")
        console.log(this.val3)
         if(this.val3==="name"||this.val3==="姓名"){
            this.tableData=this.otableData.filter(item=>(~item.name.indexOf(val)))
            var L=this.tableData.length
            if(L<this.pagesize){
                this.total=10
            }
            else if((L%this.pagesize)!=0){
                this.total=L+10
              }else{
                this.total=L
              }
          }else if(this.val3==="id"){
              var s=val.toString()
              this.tableData=this.otableData.filter(item=>(~((item.id).toString()).indexOf(s)))
              var L=this.tableData.length
              if(L<this.pagesize){
                  this.total=10
              }
              else if((L%this.pagesize)!=0){
                  this.total=L+10
                }else{
                  this.total=L
                }
            }else if(this.val3==="nick"){
                this.tableData=this.otableData.filter(item=>(~item.nick.indexOf(val)))
                var L=this.tableData.length
                if(L<this.pagesize){
                    this.total=10
                }
                else if((L%this.pagesize)!=0){
                    this.total=L+10
                  }else{
                    this.total=L
                  }
            }
      }
    },
    methods: {
        //删除用户信息
        deleteUserInfo(index, rows){
          let _this = this;
            _this.axios.delete(this.baseUrl+"/user_info/"+rows[index].id)
        .then(res => {
          // console.log("index="+index)
          //   _this.tableData.splice(index,1)
          //   _this.otableData.splice(index,1)
          //   _this.tableData=_this.otableData
          //   // _this.otableData=_this.tableData
          //   console.log("删除后"+_this.tableData.length)
          //   _this.otableData=_this.tableData
          //   this.input=""

          //   console.log(res.data)
          _this.axios.get(this.baseUrl+"/user_info")
      .then(res => {
          _this.tableData = res.data;
          _this.otableData=_this.tableData
          var l=_this.tableData.length
          console.log(l)
          console.log(l%_this.pagesize)
          if(l<_this.pagesize){
         _this.total=10
        }
        else if((l%_this.pagesize)!=0){
            _this.total=(parseInt(l/_this.pagesize))*10+10
          }
          else{
            _this.total=(l/_this.pagesize)*10
          }
          // _this.total=_this.tableData.length
          console.log(res.log)
          console.log(_this.total)
      })
        })
       
        .catch(function (error) {
            console.log(error);
        });
        
      },
      //批量删除
      deleteSelection(row){
        let l=this.multipleSelection.length
        let _this=this
          for(var i=0;i<l;i++){
            let index=_this.multipleSelection[i].index
              console.log("id="+_this.multipleSelection[i].id)
            _this.axios.delete(this.baseUrl+"/user_info/"+_this.multipleSelection[i].id)
            .then(res=>{
                 _this.tableData.splice(index,l)
                console.log(res.data)
            })
          }
      },
      //存储已选择所有象
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      //储存行所所引，供批量删除使用
      tableRowClassName({row,rowIndex}){
           row.index=rowIndex
      },
      currentChange(currentPage){
        this.currentPage=currentPage
      }
  },
}
</script>
<style scope>
.el-table{
  position: unset;
  font-size: 14px;
}

.el-button--mini, .el-button--small{
  font-size: 14px;
  font-weight: bold
}
#operate{
  padding-bottom: 20px;
}

.el-input{
  width: 200px !important;
  margin-left: 50px;
}
.add{
  margin-left: 5%;
  text-decoration: none;
  color: blue;
  font-size: 18px !important;
}
.el-button--danger{
     margin-left: 30%;
}
.el-button+.el-button {
    margin-left: px;
}
.el-button--primary{
  margin-left: 10px;
}
</style>

