<template>
  <el-main>
    <el-form class="main-search" :model="ruleForm">
        <el-input placeholder="章节名称" v-model="ruleForm.name"></el-input>
        <el-select v-model="ruleForm.state" placeholder="上架状态">
          <el-option
            v-for="item in states"
            :key="item.state"
            :label="item.label"
            :value="item.state">
          </el-option>
        </el-select>
        <el-select v-model="ruleForm.readPermission" placeholder="阅读权限">
          <el-option
            v-for="item in readPermissions"
            :key="item.readPermission"
            :label="item.label"
            :value="item.readPermission">
          </el-option>
        </el-select>
        <el-select v-model="ruleForm.sort" placeholder="排序方式">
          <el-option
            v-for="item in sorts"
            :key="item.sort"
            :label="item.label"
            :value="item.sort">
          </el-option>
        </el-select>
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button type="primary" @click="handleAddJump">添加</el-button>
      </el-form>
    <div class="main-table">
      <template>
        <el-table
          :data="chapterList"
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
            width="120"
            label="漫画封面">
            <template slot-scope="scope">
              <img :src="scope.row.coverImagePath" width="100" alt="">
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            width="140">
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
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
            prop="createTimeStr"
            label="创建时间"
            width="200">
          </el-table-column>
          <el-table-column
            prop="readPermission"
            width="220"
            label="阅读权限">
          </el-table-column>
          <el-table-column
            prop="readingCoin"
            label="所需阅读币">
          </el-table-column>
          <el-table-column
            label="操作"
            width="280">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.row.bookId,scope.row.id)">编辑</el-button>
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
        :total="chapterCount">
      </el-pagination>
    </div>
  </el-main>
</template>

<script>
    import {mapState} from 'vuex'
    import {reqDelChapter} from '../../api/index'
    export default {
        data() {
            return {
                currentPage: 1,    //当前页码
                pageSize: 10,      //每页数据条数
                ruleForm: {
                  name: '',          //章节名称
                  title: '',         //章节标题
                  sort: 1,           //排序方式 1 倒序 0 升序
                  state: '',         //上架状态 空全部 0存稿 1发布
                  readPermission: 0, //阅读权限 0免费 1付费
                },
                states: [
                    {label: '全部', state: ''},
                    {label: '存稿', state: 0},
                    {label: '发布', state: 1}
                ],
                readPermissions: [
                    {label: '免费阅读', readPermission: 0},
                    {label: '购买阅读', readPermission: 1}
                ],
                sorts: [
                    {label: '正序', sort: 0},
                    {label: '倒序', sort: 1}
                ]
            }
        },
        created(){
            this.bookId = this.$route.query.Bookid
            let param = {"Bookid": this.bookId,"sorttype": this.ruleForm.sort,"page": this.currentPage,"pagesize": this.pageSize}
            this.getChapterList(param)
        },
        methods: {
            getChapterList(param){
              this.$store.dispatch('getChapterList',param)
            },
            handleEdit(comicId,chapterId) {
                this.$router.replace(`/updateChapter?Bookid=${comicId}&Id=${chapterId}`)
            },
            // 处理删除
            async handleDelete(chapterId) {
              let result = await reqDelChapter(chapterId)
              if (result.state === 'ok'){
                alert("删除成功")
              }
            },
            handleQuery(){
              let param = {"Bookid": this.bookId,"Namekeyword": this.ruleForm.name,
                "Title": this.ruleForm.title,"State": this.ruleForm.state,"Readpermission": this.ruleForm.readPermission,
                "sorttype": this.ruleForm.sort, "page": this.currentPage, "pagesize": this.pageSize}
              console.log(param)
              this.getChapterList(param)
            },
            handlePaging(num){
              let param = {"Bookid": this.bookId,"Namekeyword": this.ruleForm.name,
                "Title": this.ruleForm.title,"State": this.ruleForm.state,"Readpermission": this.ruleForm.readPermission,
                "sorttype": this.ruleForm.sort, "page": num, "pagesize": this.pageSize}
              this.getChapterList(param)
            },
            handleAddJump(){
                this.$router.replace('/addChapter')
            }
        },
        computed: {
            ...mapState(['chapterList']),
            ...mapState(['chapterCount'])
        }
    }
</script>
