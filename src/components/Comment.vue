<template>
    <div id="comment">
     <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size:20px;font-weight:bolder">用户评价</span>
        <!-- <el-button type="danger" icon="el-icon-delete" style="float: right; " circle @click="deleteSelection"></el-button> -->
      </div>
      <div class="text item">
        <el-table
        :row-class-name="tableRowClassName"
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        @selection-change="handleSelectionChange"
        style="width: 100%"
        >
          <el-table-column
          type="selection"
          width="55">
          </el-table-column>
          <el-table-column
          prop="user"
          label="用户"
          width="180">
          </el-table-column>
          <el-table-column
          prop="goods"
          label="商品"
          width="180">
          </el-table-column>
          <el-table-column
          prop="content"
          label="评论内容">
          </el-table-column>
          <el-table-column
          label="评论星级"
          prop="remark_star"
          >
            <template slot-scope="scope">
              <el-rate show-text v-model="value[scope.$index]"></el-rate>
            </template>
          </el-table-column>
          <!-- <el-table-column
          label="操作"
          width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click.native.prevent="deleteComment(scope.$index, tableData)">删除</el-button>
              </template>
          </el-table-column> -->
        </el-table>
        <el-pagination
          layout="prev, pager, next"
          @current-change="currentChange"
          :total="total">
        </el-pagination>
    </div>
   </el-card>
  </div>
</template>

<script>
export default {
  
  data() {
    return {
      tableData:[],
      value:[
        
      ],
      total:0,//默认数据总数
      pagesize:9,//每页数据的条数
      currentPage:1,//默认开始的页数
      count:0,
      multipleSelection: [],
      baseUrl:'http://localhost:3000'
    }
    
  },
  created() {
    let _this=this;
     _this.axios.get("/dataComments")
    .then(res => {
      _this.tableData = res.data.list;
      for(var i=0;i<_this.tableData.length;i++){
        _this.value[i]=parseInt(_this.tableData[i].star) 
      } 
       var l=_this.tableData.length
       console.log(l)
        if(l<_this.pagesize){
         _this.total=10
        }
        else if((l%_this.pagesize)!=0){
            _this.total=(parseInt(l/_this.pagesize))*10+10
          }
          else{
            _this.total=(l/_this.pagesize)*10
          }
      console.log(res.data);
      console.log(_this.total);
    })
  },
  methods: {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
     //删除评论
     deleteComment(index, rows){
     let _this = this;
    _this.axios.delete(this.baseUrl+"/remark/"+rows[index].id)
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
          for(var i=0;i<l;i++){
            let index=_this.multipleSelection[i].index
              console.log("id="+_this.multipleSelection[i].id)
            _this.axios.delete(this.baseUrl+"/remark/"+_this.multipleSelection[i].id)
            .then(res=>{
                 _this.tableData.splice(index,l)
                console.log(res.data)
            })
          }
     },
     //存储已选择项
     handleSelectionChange(val){
       this.multipleSelection=val
     },
     //存储行索引
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
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 1000px;
  }
  .el-button--mini, .el-button--small{
  font-size: 14px;
  font-weight: bold
}
</style>