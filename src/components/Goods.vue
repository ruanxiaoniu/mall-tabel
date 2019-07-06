<template>
  
  <div class="hello">
    <div id="operate">
      <el-select v-model="val3" placeholder="请选择搜索条件" >
        <el-option v-for="item in options" :label="item.value" :value="item.key" :key="item.key">
        </el-option>
      </el-select>
      <el-input
      placeholder="请输入关键字"
      v-model="input"
      clearable>
      </el-input>
      <!-- <el-button type="primary" icon="el-icon-search">查询</el-button> -->
      <router-link to="/goods/addGoods" class="add" style="color:black;margin-left:50px;font-size:20px !important">添加商品</router-link>
      <!-- <el-button type="danger" icon="el-icon-delete" @click="batchDelete">删除</el-button> -->
      </div >
        <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        :row-class-name="tableRowClassName"
        @selection-change="handleSelectionChange"
        stripe
        height="600"
        style="width:100%,fit:true"
        border>
        <el-table-column
          type="selection"
          width="40">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名"
          width="400" >
           <template slot-scope="{row,$index}">
              <el-input v-if="showEdit[$index]" v-model="row.name" style="margin-left:0px;width:420px !important;"></el-input>
              <span v-if="!showEdit[$index]">{{row.name}}</span>
            </template>
        </el-table-column>
           
        <el-table-column
          prop="type"
          label="商品总类名称"
          width="110" >
          <!-- <template slot-scope="{row,$index}">
              <el-input v-if="showEdit[$index]" v-model="row.type" style="margin-left:0px;width:80px !important;"></el-input>
              <span v-if="!showEdit[$index]">{{row.type}}</span>
            </template> -->
        </el-table-column>
           
        <!-- <el-table-column
          prop="descript"
          label="商品介绍信息"
          width="200">
           <template slot-scope="{row,$index}">
              <el-input v-if="showEdit[$index]" v-model="row.descript" style="margin-left:0px;width:100px !important;"></el-input>
              <span v-if="!showEdit[$index]">{{row.descript}}</span>
            </template>
        </el-table-column> -->
           
        <el-table-column
          prop="price"
          label="价格"
          width="80">
          <template slot-scope="{row,$index}">
              <el-input v-if="showEdit[$index]" v-model="row.price" style="margin-left:0px;width:75px !important;"></el-input>
              <span v-if="!showEdit[$index]">{{row.price}}</span>
            </template>
        </el-table-column>
            
        <el-table-column
          prop="stock"
          label="商品剩余库存"
          width="120" >
            <template slot-scope="{row,$index}">
              <el-input v-if="showEdit[$index]" v-model="row.stock" style="margin-left:0px;width:90px !important;"></el-input>
              <span v-if="!showEdit[$index]">{{row.stock}}</span>
            </template>
        </el-table-column>
          
        <el-table-column
          prop="sold"
          label="销售数量"
          width="100" >
          <!-- <template slot-scope="{row,$index}">
              <el-input v-if="showEdit[$index]" v-model="row.sold" style="margin-left:0px;width:70px !important;"></el-input>
              <span v-if="!showEdit[$index]">{{row.sold}}</span>
            </template> -->
        </el-table-column>

        <!-- <el-table-column
          prop="img"
          label="商品图片存放路径"
          width="200" >
          <template slot-scope="{row,$index}">
              <el-input v-if="showEdit[$index]" v-model="row.img" style="margin-left:0px;width:50px !important;"></el-input>
              <span v-if="!showEdit[$index]">{{row.img}}</span>
            </template>
        </el-table-column> -->
        
        <el-table-column
          label="操作"
          width="150">
          <template slot-scope="scope">
            <!-- <el-button  type="text" size="small" @click.native.prevent="view(scope.$index)" >查看图片</el-button> -->
            <el-button  type="text" size="small" @click.native.prevent="Save(scope.$index, tableData)" v-if="showBtn[scope.$index]">保存</el-button>
            <el-button type="text" size="small" @click.native.prevent="Cancel(scope.$index)" v-if="showBtn[scope.$index]">取消</el-button>
            <el-button  type="text" size="small" @click.native.prevent="Edit(scope.$index, tableData)" v-if="!showBtn[scope.$index]">编辑</el-button>
            <!-- <el-button type="text" size="small" @click.native.prevent="deleteProduct(scope.$index, tableData)">删除</el-button> -->
          </template>
          <!-- <el-dialog style="z-index:2;" title="评价" :visible.sync="dialogVisible">
						
					</el-dialog> -->
          <!-- <el-dialog title="图片" :visible.sync="dialogVisible" width="30%">
            <div class="demo-image__placeholder">
              <div  v-for="item in img" :key="item" class="block">
                <img style="width:50px;height:50px" :src="item" />
              </div>
            </div>
          </el-dialog> -->
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
  name: 'HelloWorld',
  data () {
    return {
      img:[],
      dialogVisible:false,
      tableData: [],
     options: [
     {key: "选项一", value: "商品名"},
      {key: "选项二", value: "商品总类名称"},
    ],
     total:0,//默认数据总数
    pagesize:9,//每页数据的条数
    currentPage:1,//默认开始的页数
    val3: "商品名",
    name: '',
    price: '',
    input:'',
    multipleSelection:[],
    // baseUrl:'http://localhost:3000',
     showEdit:[],
     showBtn:[],
     otableData:[],
   } 
  },
  created(){
    let _this = this;
    // _this.axios.get(this.baseUrl+'/goods')
    _this.axios.get('/dataGoods')
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
      //console.log(res.log)
    })
  },
  watch:{
    "input":function(val,OldVal){
      console.log("watch")
        console.log(this.val3)
        // console.log(val)
          // if(this.val3==="商品名"||this.val3==="选项一"){
              if(this.val3==="商品名"||this.val3==="选项一"){
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
                }else if(this.val3==="商品总类名称"||this.val3==="选项二"){
                  console.log(val)
                  // if(this.input==="零食"){
                  //   val="1"
                  // }else if(this.input==="书籍"){
                  //   val="2"
                  // }else if(this.input==="游戏"){
                  //   val="3"
                  // }
                  console.log(val)
                      this.tableData=this.otableData.filter(item=>(~item.type.indexOf(val)))
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
  methods:{
    //查看出片
    view(index){
       this.img=this.tableData[index].img
       this.dialogVisible=true
       console.log("img")
       console.log(this.img)
    },
    //删除商品
    deleteProduct(index, rows){
      let _this = this;
      _this.axios.delete(this.baseUrl+'/goods/'+rows[index].gid)
      .then(res => {
        _this.tableData.splice(index,1)
        console.log(res.data)
      })
      .catch(function (error) {
      console.log(error);
    });
  },
  //存储选择项
  handleSelectionChange(val){
    this.multipleSelection=val
    console.log("rrr"+this.multipleSelection)
  },
  //存储行索引
  tableRowClassName({row,rowIndex}){
    row.index=rowIndex
  },
  batchDelete(){
    let l=this.multipleSelection.length
        let _this=this
          for(var i=0;i<l;i++){
            let index=_this.multipleSelection[i].index
              console.log("id="+_this.multipleSelection[i].id)
            _this.axios.delete(this.baseUrl+"/goods/"+_this.multipleSelection[i].id)
            .then(res=>{
                 _this.tableData.splice(index,l)
                console.log(res.data)
            })
          }
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
      _this.axios.put("/dataGoods/",{
          name:rows[index].name,
          price:rows[index].price,
          stock:rows[index].stock,
          id:rows[index].id,
      })
      .then(res=>{
        _this.showEdit[index] = false;
        _this.showBtn[index] = false;
        // console.log(res.data)
        this.$message.success("修改成功！")
      })
      .catch(err=>{
         this.$message.error("修改失败！")
      })
   }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scope>

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
  width: 150px !important;
  margin-left: 50px;
}
.el-button--danger{
     margin-left: 20%
}
.el-button--primary{
  margin-left: 10px;
}

</style>
