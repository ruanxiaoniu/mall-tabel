<template>
<div>
    <div id="order_operate">
        <el-select v-model="val3" placeholder="请选择搜索条件" >
            <el-option v-for="item in options" :label="item.value" :value="item.key" :key="item.key"></el-option>
        </el-select>
        <el-input
        placeholder="请输入关键字"
        v-model="input"
        clearable>
        </el-input>
        <!-- <el-button type="primary" icon="el-icon-search">查询</el-button> -->
        <!-- <el-button type="danger" icon="el-icon-delete" style="margin-left:10%" @click="deleteSelection">删除</el-button> -->
    </div >
    <el-table
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      :row-class-name="tableRowClassName"
      @selection-change="handleSelectionChange"
      stripe
      style="width:100%,fit:true"
      height="600"
      border
      >
      <el-table-column
      type="selection"
      width="40">
    </el-table-column>
    <el-table-column
      prop="id"
      label="订单号"
      width="70" >
      <!-- <template slot-scope="{row,$index}">
          <el-input v-if="showEdit[$index]" v-model="row.id" style="margin-left:0px;width:50px !important;"></el-input>
          <span v-if="!showEdit[$index]">{{row.id}}</span>
      </template> -->
    </el-table-column>
    <el-table-column
      prop="address.user"
      label="用户名"
      width="70" >
      <!-- <template slot-scope="{row,$index}">
        <el-input v-if="showEdit[$index]" v-model="row.address.user" style="margin-left:0px;width:50px !important;"></el-input>
        <span v-if="!showEdit[$index]">{{row.address.user}}</span>
      </template> -->
    </el-table-column>
          
    <el-table-column
      prop="address.receiveName"
      label="收货人"
      width="80" >
      <template slot-scope="{row,$index}">
        <el-input v-if="showEdit[$index]" v-model="row.address.receiveName" style="margin-left:0px;width:80px !important;"></el-input>
        <span v-if="!showEdit[$index]">{{row.address.receiveName}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="address.name"
      label="收货地址"
      width="200" >
      <template slot-scope="{row,$index}">
        <el-input v-if="showEdit[$index]" v-model="row.address.name" style="margin-left:0px;width:250px !important;"></el-input>
        <span v-if="!showEdit[$index]">{{row.address.name}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="time"
      label="交易时间"
      width="130">
      <!-- <template slot-scope="{row,$index}">
        <el-input v-if="showEdit[$index]" v-model="row.time" style="margin-left:0px;width:150px !important;"></el-input>
        <span v-if="!showEdit[$index]">{{row.time}}</span>
      </template> -->
    </el-table-column>
    <el-table-column
      prop="total"
      label="总额"
      width="60" >
    </el-table-column>
    <el-table-column
      prop="state"
      label="订单状态"
      width="80"
      >
      <template slot-scope="{row,$index}">
        <!-- <el-input v-if="showEdit[$index]" v-model="row.state" style="margin-left:0px;width:60px !important;"></el-input> -->
        <el-select v-if="showEdit[$index]" v-model="row.state" style="margin-left:-50px !important;width:60px !important;">
          <el-option v-if="row.state==='未支付'" label="已支付" value="已支付">已支付</el-option>
          <el-option v-if="row.state==='已支付'" label="未发货" value="未发货">未发货</el-option>
          <el-option v-if="row.state==='未发货'||row.state==='已支付'" label="已发货" value="已发货">已发货</el-option>
        </el-select>

        <span v-if="!showEdit[$index]">{{row.state}}</span>
      </template>
    </el-table-column>
     <el-table-column
					label="操作"
					width="120">
					<template slot-scope="scope">
							<el-popover  placement="left" width="800" trigger="click">
								<el-table :data="tableData[scope.$index].collocations">
                <!-- <el-table-column width="500" label="id">
                  {{scope.$index}}
                </el-table-column> -->
									<el-table-column width="500" prop="name" label="商品名"></el-table-column>
									<el-table-column width="100" prop="price" label="单价"></el-table-column>
									<el-table-column width="100" prop="count" label="数量"></el-table-column>
									<el-table-column width="100" prop="subTotal" label="价格小计"></el-table-column>
								</el-table>
                <el-button slot="reference">订单详情</el-button>
							</el-popover>
							
					</template>
				</el-table-column>
    <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button  type="text" size="small" @click.native.prevent="Save(scope.$index, tableData)" v-if="showBtn[scope.$index]">保存</el-button>
        <el-button type="text" size="small" @click.native.prevent="Cancel(scope.$index)" v-if="showBtn[scope.$index]">取消</el-button>
        <el-button  type="text" size="small" @click.native.prevent="Edit(scope.$index, tableData)" v-if="!showBtn[scope.$index]">编辑</el-button>
        <!-- <el-button type="text" size="small" @click.native.prevent="deleteOrder(scope.$index, tableData)" v-if="!showBtn[scope.$index]">删除</el-button> -->
      </template>
    </el-table-column>
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
        showEdit:[],
        showBtn:[],
      tableData: [],
       otableData:[],
     options: [
     {key: "选项一", value: "订单号"},
     {key: "选项二", value: "订单状态"},
     {key: "选项三", value: "交易时间"},
    ],
     total:0,//默认数据总数
    pagesize:9,//每页数据的条数
    currentPage:1,//默认开始的页数
      val3: "订单号",
      name: '',
      price: '',
      input:'',
      multipleSelection: [],
      // baseUrl:'http://localhost:3000'
    }
    },
    created() {
      let _this = this;
      _this.axios.get("/dataOrder")
      .then(res => {
          _this.tableData = res.data.list;
          _this.otableData=_this.tableData
           var l=_this.tableData.length
            if(l<_this.pagesize){
         _this.total=10
        }
        else if((l%_this.pagesize)!=0){
            _this.total=(parseInt(l/_this.pagesize))*10+10
          }
          else{
            _this.total=(l/_this.pagesize)*10
          }
          console.log(res.log)
      })
    },
     watch:{
    "input":function(val,OldVal){
      console.log("watch")
        console.log(this.val3)
         console.log(val)
          // if(this.val3==="商品名"||this.val3==="选项一"){
              if(this.val3==="订单号"||this.val3==="选项一"){
                this.tableData=this.otableData.filter(item=>(~((item.id).toString()).indexOf(val)))
                var L=this.tableData.length
                if(L<this.pagesize){
                    this.total=10
                }
                else if((L%this.pagesize)!=0){
                    this.total=L+10
                  }else{
                    this.total=L
                  }
                }else if(this.val3==="选项二"){
                      this.tableData=this.otableData.filter(item=>(~item.state.indexOf(val)))
                      var L=this.tableData.length
                      if(L<this.pagesize){
                          this.total=10
                      }
                      else if((L%this.pagesize)!=0){
                          this.total=L+10
                        }else{
                          this.total=L
                        }
                }else if(this.val3==="选项三"){
                        this.tableData=this.otableData.filter(item=>(~((item.time).toString()).indexOf(val)))
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
        // }
    }
  },
    methods: {
      //删除订单
     deleteOrder(index, rows){
        let _this = this;
        _this.axios.delete(this.baseUrl+"/order/"+rows[index].id)
    .then(res => {
        _this.tableData.splice(index,1)
        console.log(res.data)
    })
    .catch(function (error) {
        console.log(error);
    });
   },
   //批量删除
    deleteSelection(){
        let l=this.multipleSelection.length
        let _this=this
        console.log(l)
          for(var i=0;i<l;i++){
            let index=_this.multipleSelection[i].index
              //  console.log("id="+_this.multipleSelection[i].id)
            _this.axios.delete(this.baseUrl+"/order/"+_this.multipleSelection[i].id)
            .then(res=>{
                 _this.tableData.splice(index,l)
                console.log(res.data)
            })
          }
     },
   //存储行索引
   tableRowClassName({row,rowIndex}){
     row.index=rowIndex
   },
   //存储已选择项
    handleSelectionChange(val){
      this.multipleSelection=val
    },
    currentChange(currentPage){
      this.currentPage=currentPage
    },
    //点击编辑
    Edit(index,row){
        this.showEdit[index]=true
        this.showBtn[index] = true;
        this.$set(this.showEdit,row,true)
        this.$set(this.showBtn,row,true)
    },
    //取消编辑
    Cancel(index){
      this.showEdit[index] = false;
      this.showBtn[index] = false;
    },
    //保存编辑
    Save(index,rows){
      let _this=this
       _this.axios.put("/dataOrder/",{
            "id":rows[index].id,
            "state":rows[index].state
       })
       .then(res=>{
          _this.showEdit[index] = false;
          _this.showBtn[index] = false;
         console.log(res.data)
       })
       .catch(err=>{

       })
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
#order_operate{
    width:900px;
    padding-bottom: 20px;
}

.el-input{
  width: 150px !important;
  margin-left: 50px;
}

.el-button--primary{
  margin-left: 10px;
}
</style>