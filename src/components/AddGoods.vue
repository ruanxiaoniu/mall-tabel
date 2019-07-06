<template>
<div>
    <el-form ref="form" :model="form" label-width="200px" :rules="rules">
       <el-form-item label="商品的名称" prop="goods_name">
         <el-input v-model="form.name"></el-input>
       </el-form-item>
       <el-form-item label="商品种类名称" prop="goods_type">
         <el-select v-model="form.cid">
           <el-option label="零食" value="1">零食</el-option>
           <el-option label="书籍" value="2">书籍</el-option>
           <el-option label="游戏" value="3">游戏</el-option>
           <el-option label="其他" value="4">其他</el-option>
         </el-select>
         <!-- <el-input v-model="form.goods_type"></el-input> -->
       </el-form-item>
       <!-- <el-form-item label="商品介绍信息">
         <el-input v-model="form.goods_descript"></el-input>
       </el-form-item> -->
       <el-form-item label="商品价格" prop="sell_price">
         <el-input v-model="form.price"></el-input>
       </el-form-item>
       <!-- <el-form-item label="购买数量" prop="nums">
         <el-input v-model="form.nums"></el-input>
       </el-form-item> -->
       <el-form-item label="商品剩余库存" prop="goods_stock">
         <el-input v-model="form.stock"></el-input>
       </el-form-item>
   
       <el-form-item >
        <el-button type="primary" @click="addProduct">立即添加</el-button>
        <el-button type="danger">取消</el-button>
       </el-form-item>
  </el-form>
</div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          cid: '',
          price: '',
          stock: '',
        },
        //表单验证规则
        rules:{
          name:[
            {required:true,message:"请输入商品名称"}
          ],
           cid:[
            {required:true,message:"请输入商品类型"}
          ],
          price:[
            {required:true,message:"请输入商品价格"}
          ],
           stock:[
            {required:true,message:"请输入商品库存"}
          ],
         
        }
      }
    },
    methods: {
      handleChange(file, fileList) {
        console.log(this.file);
      },

      //添加商品
      addProduct(){

      console.log("add")
      console.log(this.form)
      this.axios.post("/dataGoods",{
          name: this.form.name,
          cid: parseInt(this.form.cid),
          price: this.form.price,
          stock: this.form.stock,
      })
      .then(res => {
            this.$message({
            message:'添加成功！',
            type:'success'
          })
          this.form= {
          name: '',
          cid: '',
          price: '',
          stock: '',
        }
      })
      .catch(function (error) {
         this.$message.error("添加失败")
      })
      },
    }
  }
</script>
<style scope>

.el-input{
   width: 202px !important;
}
.el-form{
  width: 100%;
  margin-top: 20%;
  margin-left: 50%;
}
</style>
