<template>
  <div class="home-container">
    <van-nav-bar title="头条" fixed />
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :disabled="finished"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleInfo
          v-for="item in artlist"
          :key="item.art_id"
          :title="item.title"
          :aut_name="item.aut_name"
          :comm_count="item.comm_count"
          :pubdate="item.pubdate"
          :cover="item.cover"
        ></ArticleInfo>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleListAPI } from '@/api/articleAPI.js'
import ArticleInfo from '@/components/Article/ArticleInfo.vue'
import _ from 'lodash'
let fn = null
export default {
  name: 'Home',
  data () {
    return {
      page: 1,
      limit: 10,
      artlist: [],
      loading: true,
      finished: false,
      isLoading: false
    }
  },
  created () {
    this.initArticleList()
  },
  activated () {
    fn = this.recordTopHandler()
    window.addEventListener('scroll', fn)
  },
  deactivated () {
    window.addEventListener('scroll', fn)
  },
  methods: {
    async initArticleList (isRefresh) {
      const { data: res } = await getArticleListAPI(this.page, this.limit)
      if (isRefresh) {
        this.artlist = [...res, ...this.artlist]
        this.loading = false
        if (res.length === 0) {
          this.finished = true
        }
      } else {
        this.artlist = [...this.artlist, ...res]
        this.loading = false
        if (res.length === 0) {
          this.finished = true
        }
      }
    },
    onLoad () {
      this.page++
      this.initArticleList()
    },
    onRefresh () {
      this.page++
      this.initArticleList(true)
      this.isLoading = false
    },
    recordTopHandler () {
      return _.debounce(
        () => {
          this.$route.meta.top = window.scrollY
        },
        50,
        { trailing: true }
      )
    }
  },
  components: {
    ArticleInfo
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding: 46px 0 50px 0;
  // .van-nav-bar {
  //   background-color: #007bff;
  // }
  // /deep/ .van-nav-bar__title {
  //   color: white;
  // }
}
</style>
