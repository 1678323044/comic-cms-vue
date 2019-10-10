<template>
  <el-main>
    <crumbs>
      <el-breadcrumb-item slot="one">漫画列表</el-breadcrumb-item>
    </crumbs>
    <el-form class="main-search" :model="ruleForm">
      <el-input placeholder="漫画名称" v-model="ruleForm.name"></el-input>
      <el-select v-model="ruleForm.state">
        <el-option
          v-for="item in states"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="ruleForm.endState" placeholder="完结状态">
        <el-option
          v-for="item in endStates"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="ruleForm.sort" placeholder="排序方式">
        <el-option
          v-for="item in sorts"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" @click="handleQuery">查询</el-button>
      <el-button type="primary" @click="handleAddJump">添加</el-button>
    </el-form>
    <div class="main-table">
      <template>
        <el-table
          :data="comicList"
          border
          style="width: 100%">
          <el-table-column
            width="80"
            label="序号">
            <template slot-scope="scope">
              {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column
            width="110"
            label="漫画封面">
            <template slot-scope="scope">
              <img :src="scope.row.coverImagePath" width="40" alt="">
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="漫画书名"
            width="200">
          </el-table-column>
          <el-table-column
            label="上架状态"
            width="120">
            <template slot-scope="scope">
              {{scope.row.state | filterState}}
            </template>
          </el-table-column>
          <el-table-column
            width="120"
            label="完结状态">
            <template slot-scope="scope">
              {{scope.row.endState | filterEndState}}
            </template>
          </el-table-column>
          <el-table-column
            prop="level"
            width="120"
            label="级别">
          </el-table-column>
          <el-table-column
            prop="category"
            width="220"
            label="漫画种类">
          </el-table-column>
          <el-table-column
            prop="lastUpdateTime"
            label="最后更新时间">
          </el-table-column>
          <el-table-column
            label="操作"
            width="280">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.row.id)">编辑</el-button>
              <el-button
                size="mini"
                @click="handleLook(scope.row.id)">查看</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        @current-change="handlePaging"
        :current-page="currentPage"
        :total="count">
      </el-pagination>
    </div>
  </el-main>

</template>

<script>
    import {mapState} from 'vuex'
    import {reqDelComic} from '../../api/index'
    import crumbs from '../../components/crumbs/crumbs'
    export default {
        data() {
            return {
                currentPage: 1,  //当前页码
                pageSize: 10,    //每页数据条数
                ruleForm: {
                  sort: 0,         //排序方式 1 倒序 0 升序
                  name: '',        //漫画名称
                  state: '',       //漫画上架状态
                  endState: '',    //漫画连载状态
                },
                states: [        //设置漫画上架状态
                    {label: '上架状态', value: ''},
                    {label: '存稿', value: 1},
                    {label: '发布', value: 2}
                ],
                endStates: [     //设置漫画连载状态
                    {label: '连载状态', value: ''},
                    {label: '连载', value: 0},
                    {label: '完结', value: 1}
                ],               //设置漫画排序方式
                sorts: [
                    {label: '正序', value: 0},
                    {label: '倒序', value: 1}
                ]
            }
        },
        components: {
            crumbs
        },
        created(){
          let param = {"sorttype": this.ruleForm.sort,"page": this.currentPage,"pagesize": this.pageSize}
          this.getComicList(param)
        },
        methods: {
            //发送获取漫画数据请求
            getComicList(param){
              this.$store.dispatch('getComicList',param)
            },
            handleEdit(comicId) {
                this.$router.replace(`/updateComic?Bookid=${comicId}`)
            },
            async handleDelete(comicId) {
              let result = await reqDelComic({"Bookid": comicId})
              if (result.state === 'ok'){
                  alert('删除成功')
                  this.$router.go(0)
              }else {
                  alert('删除失败')
              }
            },
            //处理查询功能
            handleQuery(){
              let param = {"name": this.ruleForm.name,"state": this.ruleForm.state,
                "endState": this.ruleForm.endState,"sorttype": this.ruleForm.sort,
                "page": this.currentPage,"pagesize": this.pageSize}
              this.getComicList(param)
            },
            handleLook(id){
              this.$router.replace(`/chapterList?Bookid=${id}`)
            },
            //处理分页功能
            handlePaging(num){
              let param = {"name": this.ruleForm.name,"state": this.ruleForm.state,
                "endState": this.ruleForm.endState,"sorttype": this.ruleForm.sort,
                "page": num,"pagesize": this.pageSize}
              this.getComicList(param)
            },
            handleAddJump(){
              this.$router.replace('/addComic')
            }
        },
        computed: {
            ...mapState(['comicList']),
            ...mapState(['count'])
        }
    }
</script>
