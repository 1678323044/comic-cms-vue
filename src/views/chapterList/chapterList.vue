<template>
  <el-main>
    <div class="main-search">
      <el-input placeholder="章节名称"></el-input>
      <el-select v-model="value" placeholder="上架状态">
        <el-option
          v-for="item in state"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="value" placeholder="阅读权限">
        <el-option
          v-for="item in jurisdiction"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="value" placeholder="排序方式">
        <el-option
          v-for="item in sorts"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" @click="handleQuery">查询</el-button>
    </div>
    <div class="main-table">
      <template>
        <el-table
          :data="chapterList"
          border
          style="width: 100%">
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
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    export default {
        data() {
            return {
                currentPage: 1,  //当前页码
                pageSize: 10,    //每页数据条数
                sortType: 0,     //排序方式 1 倒序 0 升序
                bookId: 0,       //漫画ID
                state: [
                    {label: '全部', value: ''},
                    {label: '存稿', value: ''},
                    {label: '发布', value: ''}
                ],
                jurisdiction: [
                    {label: '全部', value: ''},
                    {label: '免费阅读', value: ''},
                    {label: '购买阅读', value: ''}
                ],
                sorts: [
                    {label: '正序', value: ''},
                    {label: '倒序', value: ''}
                ]
            }
        },
        created(){
            this.bookId = this.$route.query.Bookid
            let param = {"Bookid": this.bookId,"sorttype": this.sortType,"page": this.currentPage,"pagesize": this.pageSize}
            this.$store.dispatch('getChapterList',param)
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            handleQuery(){

            }
        },
        computed: {
            ...mapState(['chapterList']),
            ...mapState(['chapterCount'])
        }
    }
</script>
