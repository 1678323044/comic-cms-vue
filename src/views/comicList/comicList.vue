<template>
  <el-main>
    <div class="main-search">
      <el-input placeholder="漫画名称"></el-input>
      <el-select v-model="value" placeholder="上架状态">
        <el-option
          v-for="item in state"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="value" placeholder="完结状态">
        <el-option
          v-for="item in endState"
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
      <el-button type="primary" @click="handleAdd">添加</el-button>
    </div>
    <div class="main-table">
      <template>
        <el-table
          :data="comicList"
          border
          style="width: 100%">
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
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                @click="handleLook(scope.row.id)">查看</el-button>
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
        :total="count">
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
                state: [
                    {label: '全部', value: ''},
                    {label: '存稿', value: ''},
                    {label: '发布', value: ''}
                ],
                endState: [
                    {label: '全部', value: ''},
                    {label: '连载', value: ''},
                    {label: '完结', value: ''}
                ],
                sorts: [
                    {label: '正序', value: ''},
                    {label: '倒序', value: ''}
                ]
            }
        },
        created(){
          let param = {"sorttype": this.sortType,"page": this.currentPage,"pagesize": this.pageSize}
          this.$store.dispatch('getComicList',param)
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            handleQuery(){

            },
            handleLook(id){
              this.$router.replace(`/chapterList?Bookid=${id}`)
            },
            handleAdd(){
              this.$router.replace('/addComic')
            }
        },
        computed: {
            ...mapState(['comicList']),
            ...mapState(['count'])
        }
    }
</script>
